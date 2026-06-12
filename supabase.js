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

    global.RITWDB = { fetchApprovedProtocols, submitProtocol };
})(window);
