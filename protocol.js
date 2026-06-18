/* ============================================================
   protocol.js — detail page for a single protocol
   Sections: rendered Mermaid diagram · text from the book (or
   contributor's notes) · step-by-step walkthrough (book protocols).
   Contributed protocols are resolved from Supabase by id.
   ============================================================ */
(function () {
    "use strict";

    /* ---------- Mermaid init (matches the workshop palette) ---------- */
    if (window.mermaid) {
        mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            themeVariables: {
                background:          "#fdf9f0",
                primaryColor:        "#fdf9f0",
                primaryTextColor:    "#1c1712",
                primaryBorderColor:  "#c9b48e",
                lineColor:           "#3a3028",
                secondaryColor:      "#f5eed9",
                tertiaryColor:       "#ece0c4",
                edgeLabelBackground: "#fdf9f0",
                clusterBkg:          "#fdf9f0",
                clusterBorder:       "#c9b48e",
                fontFamily:          '"EB Garamond", Garamond, Georgia, serif',
                fontSize:            "16px",
            },
            flowchart: { curve: "basis", padding: 20 },
            securityLevel: "loose",
        });
    }

    const wrap     = document.getElementById("detail-wrap");
    const prevNext = document.getElementById("nav-prev-next");

    const params = new URLSearchParams(window.location.search);
    const id     = params.get("id");

    if (!id) {
        wrap.innerHTML = `<p class="no-results">No protocol ID specified. <a href="index.html">Return to the Collaboratory.</a></p>`;
        return;
    }

    /* ---------- resolve the protocol (book array, then Supabase) ---------- */
    resolveProtocol(id).then(protocol => {
        if (!protocol) {
            wrap.innerHTML = `<p class="no-results">Protocol <strong>${escHtml(id)}</strong> not found. <a href="index.html">Return to the Collaboratory.</a></p>`;
            return;
        }
        renderProtocol(protocol);
    });

    async function resolveProtocol(wantId) {
        let p = protocols.find(x => x.id === wantId);
        if (p) return p;

        /* not a book protocol — try the contributed (Supabase) ones */
        if (window.RITWDB && typeof window.RITWDB.fetchApprovedProtocols === "function") {
            try {
                const contributed = await window.RITWDB.fetchApprovedProtocols();
                contributed.forEach(c => {
                    if (!protocols.find(x => x.id === c.id)) protocols.push(c);
                });
                p = protocols.find(x => x.id === wantId);
            } catch (e) {
                console.warn("Could not load contributed protocols:", e.message);
            }
        }
        return p;
    }

    /* ============================================================
       render
       ============================================================ */
    function renderProtocol(protocol) {
        const idx  = protocols.findIndex(p => p.id === protocol.id);
        const prev = protocols[idx - 1];
        const next = protocols[idx + 1];

        document.title = `${protocol.title} — Reasoning in the Wild`;

        prevNext.innerHTML =
            (prev ? `<a href="protocol.html?id=${encodeURIComponent(prev.id)}">&#8592; ${escHtml(prevLabel(prev))}</a>` : "") +
            (prev && next ? `<span style="color:var(--rule);margin:0 0.5rem">|</span>` : "") +
            (next ? `<a href="protocol.html?id=${encodeURIComponent(next.id)}">${escHtml(prevLabel(next))} &#8594;</a>` : "");

        const ch = (typeof chapters !== "undefined") && chapters[protocol.chapter];
        const chLabel = ch ? `${ch.label} — ${ch.title}`
                           : (protocol.userContributed ? "Reader-contributed protocol" : `Chapter ${protocol.chapter}`);

        const hasMermaid = Array.isArray(protocol.mermaidLines) && protocol.mermaidLines.length;
        const header     = protocol.mermaidHeader || "flowchart TD";
        const fullCode   = hasMermaid
            ? header + "\n    " + protocol.mermaidLines.join("\n    ")
            : (protocol.mermaidCode || "");
        const hasDiagram = hasMermaid || !!fullCode;
        const hasWalk    = hasMermaid && Array.isArray(protocol.walkthrough) && protocol.walkthrough.length;

        const idLabel = protocol.userContributed
            ? "Reader protocol"
            : `Protocol ${escHtml(protocol.id)}`;

        wrap.innerHTML = `
            <header class="detail-header" style="border-left:3.5px solid var(--ch${protocol.chapter}, var(--accent));padding-left:1.2rem;">
                <p class="detail-eyebrow">${escHtml(chLabel)}</p>
                <h1 class="detail-title">${escHtml(protocol.title)}</h1>
                <div class="detail-meta">
                    <span>${idLabel}</span>
                    ${protocol.page ? `<span style="color:var(--rule)">·</span><span>p.&thinsp;${protocol.page}</span>` : ""}
                    ${protocol.contributor ? `<span style="color:var(--rule)">·</span><span>${escHtml(protocol.contributor)}</span>` : ""}
                </div>
                ${ renderTags(protocol) }
            </header>

            <!-- DIAGRAM -->
            ${ hasDiagram ? `
            <section class="detail-section">
                <div class="section-head">
                    <h2 class="section-title">The diagram</h2>
                    ${ (hasMermaid && protocol.image) ? `
                        <div class="view-toggle" role="tablist">
                            <button class="vt-btn active" id="vt-mermaid" role="tab">Rebuilt</button>
                            <button class="vt-btn" id="vt-original" role="tab">Original figure</button>
                        </div>` : "" }
                </div>
                <figure class="detail-figure" id="diagram-figure">
                    <div id="diagram-mermaid"><div class="loading-note">Rendering diagram…</div></div>
                    <div id="diagram-original" class="hidden">
                        ${ protocol.image
                            ? `<img src="${escHtml(protocol.image)}" alt="Original figure for ${escHtml(protocol.title)}">`
                            : `<div class="preview-empty">No original figure available.</div>` }
                    </div>
                    <figcaption>${escHtml(protocol.description || protocol.title)}</figcaption>
                </figure>
            </section>` : "" }

            <!-- BOOK TEXT / NOTES -->
            ${ protocol.bookText ? `
            <section class="detail-section">
                <h2 class="section-title">From the book</h2>
                <blockquote class="book-quote">${escHtml(protocol.bookText)}</blockquote>
            </section>` : (protocol.userContributed && protocol.body ? `
            <section class="detail-section">
                <h2 class="section-title">Notes</h2>
                <blockquote class="book-quote">${escHtml(protocol.body)}</blockquote>
            </section>` : "") }

            <!-- WALKTHROUGH -->
            ${ hasWalk ? `
            <section class="detail-section">
                <h2 class="section-title">How the diagram is built</h2>
                <p class="section-lead">Step through the protocol one move at a time. Each stage reveals another piece of the diagram and the line of code that produces it.</p>
                <div class="walk">
                    <div class="walk-stage" id="walk-diagram"></div>
                    <div class="walk-side">
                        <div class="walk-progress" id="walk-progress"></div>
                        <h3 class="walk-step-title" id="walk-title"></h3>
                        <p class="walk-note" id="walk-note"></p>
                        <pre class="walk-code" id="walk-code"></pre>
                        <div class="walk-controls">
                            <button class="btn-secondary" id="walk-prev">&#8592; Back</button>
                            <span class="walk-counter" id="walk-counter"></span>
                            <button class="btn-primary" id="walk-next">Next &#8594;</button>
                        </div>
                    </div>
                </div>
            </section>` : "" }

            <!-- DISCUSSION -->
            <section class="detail-section" id="discussion-section"></section>

            ${ buildPagination(prev, next) }
        `;

        if (hasDiagram) renderInto("diagram-mermaid", fullCode, "main-diagram");

        initDiscussion(protocol.id);

        const vtM = document.getElementById("vt-mermaid");
        const vtO = document.getElementById("vt-original");
        if (vtM && vtO) {
            const paneM = document.getElementById("diagram-mermaid");
            const paneO = document.getElementById("diagram-original");
            vtM.addEventListener("click", () => {
                vtM.classList.add("active"); vtO.classList.remove("active");
                paneM.classList.remove("hidden"); paneO.classList.add("hidden");
            });
            vtO.addEventListener("click", () => {
                vtO.classList.add("active"); vtM.classList.remove("active");
                paneO.classList.remove("hidden"); paneM.classList.add("hidden");
            });
        }

        if (hasWalk) initWalkthrough(protocol);
    }

    function prevLabel(p) {
        return p.userContributed ? (p.title.length > 22 ? p.title.slice(0, 20) + "…" : p.title) : p.id;
    }

    function renderTags(p) {
        if (!p.userContributed || !Array.isArray(p.tags) || !p.tags.length) return "";
        return `<div class="detail-tags">` +
            p.tags.map(t => `<span class="detail-tag">${escHtml(t)}</span>`).join("") +
            `</div>`;
    }

    /* ============================================================
       helpers
       ============================================================ */
    async function renderInto(elId, code, renderId) {
        const el = document.getElementById(elId);
        if (!el || !window.mermaid) return;
        try {
            const { svg } = await mermaid.render(renderId + "-" + Date.now(), code);
            el.innerHTML = svg;
        } catch (e) {
            el.innerHTML = `<div class="preview-error">${escHtml(String(e.message || e))}</div>`;
        }
    }

    function initWalkthrough(p) {
        const steps    = p.walkthrough;
        const titleEl  = document.getElementById("walk-title");
        const noteEl   = document.getElementById("walk-note");
        const codeEl   = document.getElementById("walk-code");
        const counter  = document.getElementById("walk-counter");
        const progress = document.getElementById("walk-progress");
        const btnPrev  = document.getElementById("walk-prev");
        const btnNext  = document.getElementById("walk-next");

        let i = 0;

        progress.innerHTML = steps.map((_, n) => `<span class="walk-dot" data-n="${n}"></span>`).join("");
        progress.querySelectorAll(".walk-dot").forEach(dot => {
            dot.addEventListener("click", () => { i = +dot.dataset.n; show(); });
        });

        function cumulativeCode(shown) {
            const lines = shown.map(n => p.mermaidLines[n]);
            return p.mermaidHeader + "\n    " + lines.join("\n    ");
        }

        function show() {
            const step = steps[i];
            titleEl.innerHTML = escHtml(step.title || `Step ${i + 1}`);
            noteEl.innerHTML  = step.note || "";
            counter.textContent = `${i + 1} / ${steps.length}`;

            const shownSet = new Set(step.shown);
            const prevSet  = i > 0 ? new Set(steps[i - 1].shown) : new Set();
            codeEl.innerHTML =
                `<span class="code-head">${escHtml(p.mermaidHeader)}</span>\n` +
                p.mermaidLines.map((line, n) => {
                    const isActive = shownSet.has(n);
                    const isNew    = isActive && !prevSet.has(n);
                    const cls = isNew ? "code-line new" : isActive ? "code-line active" : "code-line dim";
                    return `<span class="${cls}">    ${escHtml(line)}</span>`;
                }).join("\n");

            progress.querySelectorAll(".walk-dot").forEach((dot, n) => {
                dot.classList.toggle("done", n <= i);
            });

            btnPrev.disabled = (i === 0);
            btnNext.disabled = (i === steps.length - 1);

            renderInto("walk-diagram", cumulativeCode(step.shown), "walk-render");
        }

        btnPrev.addEventListener("click", () => { if (i > 0) { i--; show(); } });
        btnNext.addEventListener("click", () => { if (i < steps.length - 1) { i++; show(); } });

        show();
    }

    function buildPagination(prev, next) {
        return `
        <nav class="detail-pagination" aria-label="Protocol pagination">
            ${prev
                ? `<a class="pag-btn" href="protocol.html?id=${encodeURIComponent(prev.id)}">
                       <small>&#8592; Previous</small><strong>${escHtml(prev.title)}</strong></a>`
                : `<span></span>`}
            ${next
                ? `<a class="pag-btn next" href="protocol.html?id=${encodeURIComponent(next.id)}">
                       <small>Next &#8594;</small><strong>${escHtml(next.title)}</strong></a>`
                : `<span></span>`}
        </nav>`;
    }

    /* ============================================================
       discussion (comments) — bot defense helpers
       ============================================================ */
    const TURNSTILE_KEY = (window.RITWDB && window.RITWDB.CONFIG && window.RITWDB.CONFIG.TURNSTILE_SITE_KEY) || "";
    let _tsReady = false;
    const _tsQueue = [];

    /* load the Turnstile script once, only when a site key is configured */
    function loadTurnstile() {
        if (!TURNSTILE_KEY || document.getElementById("cf-turnstile-script")) return;
        window.__ritwTurnstileReady = () => {
            _tsReady = true;
            _tsQueue.splice(0).forEach(fn => fn());
        };
        const s = document.createElement("script");
        s.id = "cf-turnstile-script";
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__ritwTurnstileReady&render=explicit";
        s.async = true; s.defer = true;
        document.head.appendChild(s);
    }

    const turnstileFieldHtml = () => TURNSTILE_KEY ? `<div class="cf-turnstile-slot"></div>` : "";

    function renderTurnstile(form) {
        if (!TURNSTILE_KEY) return;
        const slot = form.querySelector(".cf-turnstile-slot");
        if (!slot) return;
        const go = () => {
            if (slot.dataset.widgetId || !window.turnstile) return;
            slot.dataset.widgetId = window.turnstile.render(slot, { sitekey: TURNSTILE_KEY });
        };
        _tsReady ? go() : _tsQueue.push(go);
    }

    function turnstileToken(form) {
        const slot = form.querySelector(".cf-turnstile-slot");
        if (!slot || !window.turnstile || !slot.dataset.widgetId) return "";
        try { return window.turnstile.getResponse(slot.dataset.widgetId) || ""; } catch (_) { return ""; }
    }

    function resetTurnstile(form) {
        const slot = form.querySelector(".cf-turnstile-slot");
        if (slot && window.turnstile && slot.dataset.widgetId) {
            try { window.turnstile.reset(slot.dataset.widgetId); } catch (_) {}
        }
    }

    /* an off-screen field that real users never fill but bots tend to */
    const honeypotHtml = () => `<div class="hp-field" aria-hidden="true">
            <label>Leave this field blank<input type="text" name="hp_website" tabindex="-1" autocomplete="off"></label>
        </div>`;

    function showFormNotice(form, msg) {
        let n = form.parentNode.querySelector(".comment-success");
        if (!n) { n = document.createElement("p"); n.className = "comment-success"; form.after(n); }
        n.textContent = msg;
    }

    /* ============================================================
       discussion (comments)
       ============================================================ */
    function initDiscussion(protocolId) {
        const section = document.getElementById("discussion-section");
        if (!section) return;

        loadTurnstile();

        const canComment = window.RITWDB && typeof window.RITWDB.fetchComments === "function";
        if (!canComment) {
            section.innerHTML = `<h2 class="section-title">Discussion</h2>
                <p class="section-lead">Comments are unavailable right now.</p>`;
            return;
        }

        section.innerHTML = `
            <h2 class="section-title">Discussion <span id="comment-count" class="comment-count"></span></h2>
            <form class="comment-form" id="comment-form">
                <input class="comment-author" id="comment-author" type="text" placeholder="Your name" autocomplete="name" maxlength="80" required>
                <textarea class="comment-body" id="comment-body" rows="3" placeholder="Add to the discussion…" required></textarea>
                ${ honeypotHtml() }
                ${ turnstileFieldHtml() }
                <p class="comment-note">A name is required. Comments containing a link are held for review before they appear.</p>
                <div class="comment-form-actions">
                    <button type="submit" class="btn-primary" id="comment-submit">Post comment</button>
                </div>
            </form>
            <div class="comment-list" id="comment-list">
                <p class="comment-loading">Loading comments…</p>
            </div>
        `;

        const listEl   = section.querySelector("#comment-list");
        const countEl   = section.querySelector("#comment-count");
        const form      = section.querySelector("#comment-form");
        const authorEl  = section.querySelector("#comment-author");
        const bodyEl    = section.querySelector("#comment-body");
        const submitBtn = section.querySelector("#comment-submit");

        renderTurnstile(form);
        load();

        async function load() {
            try {
                const rows = await window.RITWDB.fetchComments(protocolId);
                renderComments(rows);
            } catch (e) {
                listEl.innerHTML = `<p class="comment-loading">Could not load comments.</p>`;
                console.warn(e);
            }
        }

        function renderComments(rows) {
            countEl.textContent = rows.length ? `(${rows.length})` : "";

            const tops    = rows.filter(c => !c.parent_id);
            const repliesOf = id => rows.filter(c => c.parent_id === id);

            if (!tops.length) {
                listEl.innerHTML = `<p class="comment-empty">No comments yet. Start the conversation.</p>`;
                return;
            }

            listEl.innerHTML = tops.map(c => `
                <div class="comment" data-id="${c.id}">
                    ${commentInner(c)}
                    <button class="comment-reply-btn" data-reply="${c.id}">Reply</button>
                    <div class="comment-replies">
                        ${repliesOf(c.id).map(r => `<div class="comment reply">${commentInner(r)}</div>`).join("")}
                    </div>
                    <div class="reply-form-slot" data-slot="${c.id}"></div>
                </div>
            `).join("");

            listEl.querySelectorAll(".comment-reply-btn").forEach(btn => {
                btn.addEventListener("click", () => openReplyForm(btn.dataset.reply));
            });
        }

        function commentInner(c) {
            const who = c.author ? escHtml(c.author) : "Anonymous";
            return `
                <div class="comment-head">
                    <span class="comment-author-name">${who}</span>
                    <span class="comment-time">${timeAgo(c.created_at)}</span>
                </div>
                <div class="comment-text">${escHtml(c.body).replace(/\n/g, "<br>")}</div>
            `;
        }

        function openReplyForm(parentId) {
            const slot = listEl.querySelector(`.reply-form-slot[data-slot="${parentId}"]`);
            if (!slot || slot.querySelector("form")) return;     // already open
            slot.innerHTML = `
                <form class="comment-form reply-form">
                    <input class="comment-author" type="text" placeholder="Your name" maxlength="80" required>
                    <textarea class="comment-body" rows="2" placeholder="Write a reply…" required></textarea>
                    ${ honeypotHtml() }
                    ${ turnstileFieldHtml() }
                    <div class="comment-form-actions">
                        <button type="button" class="btn-secondary reply-cancel">Cancel</button>
                        <button type="submit" class="btn-primary">Post reply</button>
                    </div>
                </form>`;
            const rForm = slot.querySelector("form");
            renderTurnstile(rForm);
            rForm.querySelector(".reply-cancel").addEventListener("click", () => { slot.innerHTML = ""; });
            rForm.addEventListener("submit", async e => {
                e.preventDefault();
                const a = rForm.querySelector(".comment-author").value.trim();
                const b = rForm.querySelector(".comment-body").value.trim();
                if (!a) { rForm.querySelector(".comment-author").focus(); return; }
                if (!b) return;
                const honeypot = (rForm.querySelector('[name="hp_website"]') || {}).value || "";
                const btn = rForm.querySelector('button[type="submit"]');
                btn.disabled = true; btn.textContent = "Posting…";
                try {
                    const res = await window.RITWDB.postComment({
                        protocolId, parentId, author: a, body: b,
                        turnstileToken: turnstileToken(rForm), honeypot
                    });
                    if (res.status === "pending") {
                        slot.innerHTML = `<p class="comment-success">Thanks — replies with links are held for review and will appear once approved.</p>`;
                    } else {
                        slot.innerHTML = "";
                        load();
                    }
                } catch (err) {
                    btn.disabled = false; btn.textContent = "Post reply";
                    alert(err.message || "Could not post your reply. Please try again.");
                }
            });
            rForm.querySelector(".comment-author").focus();
        }

        form.addEventListener("submit", async e => {
            e.preventDefault();
            const author = authorEl.value.trim();
            const body   = bodyEl.value.trim();
            if (!author) { authorEl.focus(); return; }
            if (!body) return;
            const honeypot = (form.querySelector('[name="hp_website"]') || {}).value || "";
            submitBtn.disabled = true;
            submitBtn.textContent = "Posting…";
            try {
                const res = await window.RITWDB.postComment({
                    protocolId, author, body,
                    turnstileToken: turnstileToken(form), honeypot
                });
                bodyEl.value = "";
                resetTurnstile(form);
                if (res.status === "pending") {
                    showFormNotice(form, "Thanks — comments with links are held for review and will appear once approved.");
                } else {
                    await load();
                }
            } catch (err) {
                alert(err.message || "Could not post your comment. Please try again.");
                console.warn(err);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Post comment";
            }
        });
    }

    function timeAgo(iso) {
        if (!iso) return "";
        const then = new Date(iso).getTime();
        const secs = Math.max(1, Math.floor((Date.now() - then) / 1000));
        const units = [["year",31536000],["month",2592000],["week",604800],["day",86400],["hour",3600],["minute",60]];
        for (const [name, s] of units) {
            const v = Math.floor(secs / s);
            if (v >= 1) return v === 1 ? `1 ${name} ago` : `${v} ${name}s ago`;
        }
        return "just now";
    }

    function escHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
})();
