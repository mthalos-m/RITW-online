/* ============================================================
   supabase.js — shared backend for reader-contributed protocols
   Uses the REST (PostgREST) endpoint directly with the public
   "publishable" key. Row-Level Security on the server controls
   what this key may do: submit pending rows, read approved rows.
   ============================================================ */
(function (global) {
    "use strict";

    const SUPABASE_URL = "https://ssukhnqpnlfheutnucgx.supabase.co";
    const SUPABASE_KEY = "sb_publishable_kwoCn-6lM5CZtviXyt3Vgw_Bhp-cFj5";
    const ENDPOINT     = SUPABASE_URL + "/rest/v1/protocols";

    /* ---------- comment-protection config ----------
       Fill TURNSTILE_SITE_KEY with your Cloudflare Turnstile *site* key once the
       `post-comment` Edge Function is deployed (see supabase/README.md). While it
       is blank the site falls back to posting comments directly (today's behavior,
       no bot defense) so the Collaboratory keeps working during the cut-over. Once the key is
       set, every comment is routed through the Edge Function, which verifies the
       Turnstile token, checks the honeypot, rate-limits per IP, holds link-bearing
       comments for review, and emails you. */
    const CONFIG = {
        TURNSTILE_SITE_KEY: "0x4AAAAAADmqKvvoZ68aQgB-",
        COMMENT_FN: SUPABASE_URL + "/functions/v1/post-comment",
        useEdgeFunction() { return !!this.TURNSTILE_SITE_KEY; }
    };

    const BASE_HEADERS = {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json"
    };

    /* map a database row -> the protocol shape the site uses */
    function rowToProtocol(r) {
        return {
            id:          r.id,
            title:       r.title || "Untitled protocol",
            description: r.description || "",
            contributor: r.contributor || "",
            chapter:     0,                 // contributed protocols sit in their own section
            page:        null,
            image:       r.image || "",     // stored SVG data-URL thumbnail, if any
            mermaidCode: r.mermaid_code || "",
            body:        r.notes || "",
            tags:        Array.isArray(r.tags) ? r.tags : [],
            related:     Array.isArray(r.related) ? r.related : [],
            createdAt:   r.created_at || null,
            userContributed: true
        };
    }

    /* fetch all APPROVED contributions (RLS hides pending rows) */
    async function fetchApprovedProtocols() {
        const url = ENDPOINT + "?status=eq.approved&select=*&order=created_at.desc";
        const res = await fetch(url, { headers: BASE_HEADERS });
        if (!res.ok) {
            throw new Error("Supabase read failed: " + res.status + " " + (await res.text()));
        }
        const rows = await res.json();
        return rows.map(rowToProtocol);
    }

    /* submit a new contribution; always lands as 'pending' for review */
    async function submitProtocol(p) {
        const payload = {
            title:        p.title,
            description:  p.description || "",
            contributor:  p.contributor || "",
            tags:         p.tags || [],
            related:      p.related || [],
            mermaid_code: p.mermaidCode || "",
            notes:        p.body || p.notes || "",
            image:        p.image || "",
            status:       "pending"
        };
        const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { ...BASE_HEADERS, "Prefer": "return=minimal" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            throw new Error("Supabase submit failed: " + res.status + " " + (await res.text()));
        }
        return true;
    }

    /* ---------- comments ---------- */
    const COMMENTS = SUPABASE_URL + "/rest/v1/comments";

    /* fetch all visible comments for one protocol, oldest first */
    async function fetchComments(protocolId) {
        const url = COMMENTS
            + "?protocol_id=eq." + encodeURIComponent(protocolId)
            + "&select=*&order=created_at.asc";
        const res = await fetch(url, { headers: BASE_HEADERS });
        if (!res.ok) {
            throw new Error("Supabase comments read failed: " + res.status + " " + (await res.text()));
        }
        return res.json();
    }

    /* Post a comment (or a reply, if parentId is given).
       Returns { status: "visible" | "pending", comment }.
         - "visible": posted and live now.
         - "pending": accepted but held for review (e.g. it contains a link).
       A name is required. When the Edge Function is configured it enforces the
       bot defenses; the direct-insert fallback applies the name check client-side. */
    async function postComment({ protocolId, parentId, author, body, turnstileToken, honeypot }) {
        const name = (author || "").trim();
        if (!name) throw new Error("A name is required to comment.");

        /* ---- protected path: route through the Edge Function ---- */
        if (CONFIG.useEdgeFunction()) {
            const res = await fetch(CONFIG.COMMENT_FN, {
                method: "POST",
                headers: { ...BASE_HEADERS },
                body: JSON.stringify({
                    protocol_id:     protocolId,
                    parent_id:       parentId || null,
                    author:          name,
                    body:            body,
                    turnstile_token: turnstileToken || "",
                    honeypot:        honeypot || ""      // must be empty for a human
                })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data.error || ("Comment post failed: " + res.status));
            }
            return { status: data.status || "visible", comment: data.comment || null };
        }

        /* ---- fallback path: direct insert (no bot defense, pre-deploy) ---- */
        const payload = {
            protocol_id: protocolId,
            parent_id:   parentId || null,
            author:      name,
            body:        body
        };
        const res = await fetch(COMMENTS, {
            method: "POST",
            headers: { ...BASE_HEADERS, "Prefer": "return=representation" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            throw new Error("Supabase comment post failed: " + res.status + " " + (await res.text()));
        }
        const rows = await res.json();
        return { status: "visible", comment: rows[0] };
    }

    global.RITWDB = {
        CONFIG,
        fetchApprovedProtocols, submitProtocol,
        fetchComments, postComment
    };
})(window);
