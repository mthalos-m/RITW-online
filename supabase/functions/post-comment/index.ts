// ============================================================
// post-comment — Supabase Edge Function (Deno)
//
// The single, server-trusted entry point for new comments. The static site
// posts here instead of inserting directly, so these checks can't be bypassed:
//
//   • honeypot      — a hidden field humans leave blank; if filled, drop silently
//   • Turnstile     — verify the Cloudflare token server-side
//   • rate limit    — N comments per IP per window (salted-hash, no raw IP stored)
//   • link hold     — comments containing a URL are saved as 'pending' (hidden)
//   • email notify  — OPTIONAL: emails you on each comment (dormant unless the
//                     Resend secrets below are set; see README "turn email on")
//
// Deploy with JWT verification OFF (the site authenticates with the publishable
// key, not a JWT); our own checks are the real gate:
//     supabase functions deploy post-comment --no-verify-jwt
//
// Required secrets:
//   TURNSTILE_SECRET_KEY   Cloudflare Turnstile secret key
//   IP_SALT                any long random string (salts the IP hash)
// Optional secrets (leave unset to keep email off):
//   RESEND_API_KEY, NOTIFY_EMAIL, FROM_EMAIL, SITE_URL
// (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.)
// ============================================================

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const REST         = SUPABASE_URL + "/rest/v1";

const TURNSTILE_SECRET = Deno.env.get("TURNSTILE_SECRET_KEY") ?? "";
const IP_SALT          = Deno.env.get("IP_SALT") ?? "change-me";
const NOTIFY_EMAIL     = Deno.env.get("NOTIFY_EMAIL") ?? "";
const FROM_EMAIL       = Deno.env.get("FROM_EMAIL") ?? "";
const RESEND_API_KEY   = Deno.env.get("RESEND_API_KEY") ?? "";
const SITE_URL         = Deno.env.get("SITE_URL") ?? "";

// rate-limit policy
const RATE_MAX     = 5;            // max accepted comments ...
const RATE_WINDOW  = 10 * 60_000;  // ... per IP per 10 minutes

const MAX_AUTHOR = 80;
const MAX_BODY   = 4000;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });

// a URL / bare-domain detector — generous on purpose
const URL_RE =
  /(https?:\/\/|www\.)|\b[a-z0-9-]+\.(com|org|net|io|edu|gov|co|ai|app|dev|info|biz|xyz|me|us|uk|ca)\b/i;

function svc(headers: Record<string, string> = {}) {
  return { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, ...headers };
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(IP_SALT + "|" + ip);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // not configured → skip (dev only)
  if (!token) return false;
  const form = new FormData();
  form.append("secret", TURNSTILE_SECRET);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const out = await r.json();
    return !!out.success;
  } catch {
    return false;
  }
}

async function underRateLimit(ipHash: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_WINDOW).toISOString();
  const url =
    `${REST}/comment_throttle?ip_hash=eq.${encodeURIComponent(ipHash)}` +
    `&created_at=gte.${encodeURIComponent(since)}&select=id`;
  const r = await fetch(url, { headers: svc({ Prefer: "count=exact" }) });
  if (!r.ok) return true; // fail open rather than block real users on a glitch
  const range = r.headers.get("content-range") || "*/0";
  const total = parseInt(range.split("/")[1] || "0", 10);
  return total < RATE_MAX;
}

async function notify(row: Record<string, unknown>, status: string) {
  if (!RESEND_API_KEY || !NOTIFY_EMAIL || !FROM_EMAIL) return;
  const link = SITE_URL
    ? `${SITE_URL.replace(/\/$/, "")}/protocol.html?id=${encodeURIComponent(String(row.protocol_id))}`
    : "";
  const held = status === "pending";
  const subject = `${held ? "[HELD] " : ""}New comment on ${row.protocol_id}`;
  const esc = (s: unknown) =>
    String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `
    <p><strong>${esc(row.author)}</strong> commented on protocol <strong>${esc(row.protocol_id)}</strong>
    ${held ? "(held for review — contains a link)" : ""}:</p>
    <blockquote style="border-left:3px solid #c9b48e;padding-left:12px;color:#3a3028">${esc(row.body)}</blockquote>
    ${link ? `<p><a href="${link}">View the protocol</a></p>` : ""}`;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM_EMAIL, to: [NOTIFY_EMAIL], subject, html }),
    });
  } catch (e) {
    console.error("notify failed:", e);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload: Record<string, string>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }

  const honeypot = (payload.honeypot ?? "").trim();
  // bot tripped the honeypot — pretend it worked, insert nothing
  if (honeypot) return json({ status: "visible" });

  const author = (payload.author ?? "").trim().slice(0, MAX_AUTHOR);
  const body   = (payload.body ?? "").trim().slice(0, MAX_BODY);
  const protocolId = (payload.protocol_id ?? "").trim();
  const parentId   = payload.parent_id ? String(payload.parent_id) : null;

  if (!author) return json({ error: "A name is required to comment." }, 400);
  if (!body)   return json({ error: "Comment cannot be empty." }, 400);
  if (!protocolId) return json({ error: "Missing protocol." }, 400);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const ipHash = await hashIp(ip || "0.0.0.0");

  if (!(await verifyTurnstile(payload.turnstile_token ?? "", ip))) {
    return json({ error: "Verification failed. Please try again." }, 400);
  }

  if (!(await underRateLimit(ipHash))) {
    return json({ error: "You're commenting a little fast — please try again in a few minutes." }, 429);
  }

  const status = URL_RE.test(body) ? "pending" : "visible";

  const insertRes = await fetch(`${REST}/comments`, {
    method: "POST",
    headers: svc({ "Content-Type": "application/json", Prefer: "return=representation" }),
    body: JSON.stringify({
      protocol_id: protocolId,
      parent_id: parentId,
      author,
      body,
      status,
    }),
  });
  if (!insertRes.ok) {
    console.error("insert failed:", insertRes.status, await insertRes.text());
    return json({ error: "Could not save your comment." }, 500);
  }
  const rows = await insertRes.json();
  const row = rows[0];

  // record the throttle hit (best-effort) and notify (non-blocking on errors)
  await fetch(`${REST}/comment_throttle`, {
    method: "POST",
    headers: svc({ "Content-Type": "application/json", Prefer: "return=minimal" }),
    body: JSON.stringify({ ip_hash: ipHash }),
  }).catch(() => {});

  await notify(row, status);

  // only hand back the row when it's publicly visible
  return json({ status, comment: status === "visible" ? row : null });
});
