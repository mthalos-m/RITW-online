# Comment protection — deploy guide

This folder holds the **server side** of the comment hardening. The front-end is
already wired to use it — it just needs you to deploy these and flip one switch.

**You can't break the live site doing this.** Until you paste the Turnstile key
into `supabase.js` (the very last step), comments keep posting the old way. And
it's reversible: blank that key and you're back to today's behavior instantly.

> **Email notifications are turned OFF in this trimmed setup** (no Resend / sender
> domain to deal with). Everything else works. To find comments that were held
> for review, run the one-line query under **Moderating held comments** below —
> or add email later via the optional section at the end.

## What you get once deployed
- **Name required** on every comment.
- **Invisible bot defense**: Cloudflare Turnstile + a honeypot field + per-IP
  rate limiting (5 comments / 10 min, stored as a salted hash — no raw IPs).
- **Link hold**: plain-text comments post instantly; any comment containing a
  URL is saved as `pending` and stays hidden until you approve it.

---

## The four steps (all in the browser — no command line needed)

You can do every step from the Supabase dashboard. CLI commands are given too,
in case you prefer them — but the dashboard route avoids Windows shell quirks.

### Step 1 — Get a Cloudflare Turnstile widget (free)
1. https://dash.cloudflare.com → **Turnstile** → **Add widget**.
2. Add your site's domain. Widget mode: **Managed**.
3. Copy the **Site key** and the **Secret key** — you'll use both below.

### Step 2 — Run the SQL migration
**Dashboard:** Supabase → **SQL Editor** → New query → paste all of
`migrations/0001_comment_protection.sql` → **Run**.

*(CLI alternative: `supabase db push`.)*

This adds the moderation status + throttle table and locks down the table so only
the function can insert. **Do this in the same sitting as Step 4** — once it runs,
the old direct-post path stops working, so you want the new path live right after.

### Step 3 — Create the Edge Function
**Dashboard:** Supabase → **Edge Functions** → **Create a function**, name it
`post-comment`, paste the contents of `functions/post-comment/index.ts`, and
**Deploy**. Then open the function's settings and turn **Enforce JWT** *off*
(the site authenticates with the publishable key, not a JWT).

Then set its two secrets — **Edge Functions → Manage secrets → Add new secret**:

| Name | Value |
| --- | --- |
| `TURNSTILE_SECRET_KEY` | the Turnstile **secret** key from Step 1 |
| `IP_SALT` | any long random string (mash the keyboard, or paste a password-generator string) |

*(`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically — don't add them.)*

*(CLI alternative, **PowerShell-safe** — one line, no backslashes:)*
```powershell
supabase functions deploy post-comment --no-verify-jwt
supabase secrets set TURNSTILE_SECRET_KEY="your-secret-key" IP_SALT="any-long-random-string"
```

### Step 4 — Flip the switch
Open `supabase.js`, set `CONFIG.TURNSTILE_SITE_KEY` to the Turnstile **site** key
from Step 1, then publish the site. (Send me the key and I'll paste it in for you.)
From this point every comment flows through the protected function.

---

## Moderating held comments  ← your inbox for now
Comments containing a link land as `pending` and stay hidden. Check for them in
the Supabase **SQL Editor**:
```sql
select id, protocol_id, author, body, created_at
  from public.comments where status = 'pending' order by created_at;
```
Approve or reject one:
```sql
update public.comments set status = 'visible'  where id = '<uuid>';
update public.comments set status = 'rejected' where id = '<uuid>';
```

## Quick test
1. Post a plain comment → it appears immediately.
2. Post one containing `https://example.com` → it does **not** appear; you'll see
   it in the `pending` query above until you approve it.

---

## Optional: turn email notifications back on (later)
The function already contains the email code — it just stays dormant until you add
these secrets. When you're ready:
1. Create a free **Resend** account (https://resend.com) and an API key. For a
   no-domain start, send **from** `onboarding@resend.dev` **to** your own
   Resend account email.
2. Add these secrets (dashboard → Manage secrets, or `supabase secrets set …`):
   `RESEND_API_KEY`, `NOTIFY_EMAIL` (m.thalos@gmail.com), `FROM_EMAIL`
   (`onboarding@resend.dev` to start), and `SITE_URL` (the live archive URL, used
   for the link in the email).
That's it — no code change, no redeploy needed beyond the secrets.
