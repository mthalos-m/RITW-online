/* ============================================================
   index.js — gallery, contents nav, search, delete-contributed
   ============================================================ */
(function () {
    "use strict";

    const gallery     = document.getElementById("protocol-gallery");
    const searchInput = document.getElementById("protocol-search");
    const chapterNav  = document.getElementById("chapter-nav");
    const toast       = document.getElementById("toast");

    /* ---------- chapter labels ---------- */
    function chapterLabel(num) {
        if (num === 0) return "Reader-contributed protocols";
        const ch = (typeof chapters !== "undefined") && chapters[num];
        return ch ? `${ch.label} — ${ch.title}` : `Chapter ${num}`;
    }

    function chapterShort(num) {
        if (num === 0) return "Contributed";
        const ch = (typeof chapters !== "undefined") && chapters[num];
        return ch ? ch.label : `Ch. ${num}`;
    }

    /* keep protocols ordered: book chapters first, contributed (0) last */
    function sortProtocols() {
        protocols.sort((a, b) => {
            const ca = a.chapter === 0 ? 99 : a.chapter;
            const cb = b.chapter === 0 ? 99 : b.chapter;
            return ca - cb || String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
        });
    }

    /* ---------- search matching ---------- */
    function matches(p, q) {
        if (!q) return true;
        const haystack = [
            p.id, p.title, p.description || "",
            String(p.page || ""), String(p.chapter),
            (p.tags || []).join(" "),
            chapterLabel(p.chapter)
        ].join(" ").toLowerCase();
        return q.toLowerCase().split(/\s+/).every(token => haystack.includes(token));
    }

    /* ---------- contents / chapter quick-nav ---------- */
    function buildChapterNav() {
        const present = [...new Set(protocols.map(p => p.chapter))].sort((a, b) => {
            const ca = a === 0 ? 99 : a, cb = b === 0 ? 99 : b;
            return ca - cb;
        });

        chapterNav.innerHTML =
            `<span class="nav-label">Jump to:</span>` +
            present.map(num =>
                `<a class="nav-chip" href="#chapter-${num}" data-ch="${num}">${chapterShort(num)}</a>`
            ).join("");
    }

    /* ---------- render ---------- */
    function render(list) {
        gallery.innerHTML = "";

        if (!list.length) {
            gallery.innerHTML = `<p class="no-results">No protocols match that search.</p>`;
            return;
        }

        let currentChapter = null;

        list.forEach(protocol => {
            const ch = protocol.chapter;

            if (ch !== currentChapter) {
                currentChapter = ch;
                const heading = document.createElement("h2");
                heading.className = "chapter-heading";
                heading.id = `chapter-${ch}`;
                heading.textContent = chapterLabel(ch);
                gallery.appendChild(heading);
            }

            gallery.appendChild(buildCard(protocol));
        });
    }

    function buildCard(protocol) {
        const card = document.createElement("article");
        card.className = "protocol-card" + (protocol.featured ? " featured" : "");
        card.dataset.chapter = protocol.chapter;

        const imgSrc = protocol.image || "";
        const imgTag = imgSrc
            ? `<img src="${escHtml(imgSrc)}" alt="${escHtml(protocol.title)}" loading="lazy">`
            : `<div style="height:120px;display:flex;align-items:center;justify-content:center;color:var(--muted);font-style:italic;font-size:0.9rem;">Diagram preview unavailable</div>`;

        const label = protocol.userContributed
            ? "Reader protocol"
            : `Protocol ${escHtml(protocol.id)}`;

        const meta = protocol.page
            ? `<span class="protocol-page">p.&thinsp;${protocol.page}</span>`
            : (protocol.userContributed ? `<span class="protocol-page contributed">Contributed</span>` : "");

        const footerLeft = protocol.userContributed && protocol.contributor
            ? `<span class="card-contributor">${escHtml(protocol.contributor)}</span>`
            : `<span></span>`;

        card.innerHTML = `
            <div class="card-top">
                <span class="protocol-label">${label}</span>
                ${meta}
            </div>
            <h2>${escHtml(protocol.title)}</h2>
            <figure class="card-figure">${imgTag}</figure>
            <p class="card-caption">${escHtml(protocol.description || "")}</p>
            <div class="card-footer">
                ${footerLeft}
                <a class="card-link" href="protocol.html?id=${encodeURIComponent(protocol.id)}">
                    View protocol &nbsp;&#8594;
                </a>
            </div>
        `;

        const img = card.querySelector("img");
        if (img) {
            img.addEventListener("error", () => {
                img.replaceWith(Object.assign(document.createElement("div"), {
                    textContent: "Diagram preview unavailable",
                    style: "color:var(--muted);font-style:italic;font-size:0.85rem;padding:1rem 0;"
                }));
            });
        }

        /* whole card navigates to the protocol detail page */
        const href = `protocol.html?id=${encodeURIComponent(protocol.id)}`;
        card.style.cursor = "pointer";
        card.addEventListener("click", e => {
            if (e.target.closest("a")) return;   // let real links work normally
            window.location.href = href;
        });

        return card;
    }

    /* ---------- search ---------- */
    searchInput.addEventListener("input", () => {
        render(protocols.filter(p => matches(p, searchInput.value.trim())));
    });

    /* smooth-scroll for nav chips (delegated) */
    chapterNav.addEventListener("click", e => {
        const chip = e.target.closest(".nav-chip");
        if (!chip) return;
        e.preventDefault();
        const target = document.getElementById(`chapter-${chip.dataset.ch}`);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    /* ---------- toast ---------- */
    let toastTimer;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
    }

    /* ---------- escape helper ---------- */
    function escHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    /* ---------- load approved contributions from Supabase ---------- */
    async function loadContributions() {
        if (!window.RITWDB || typeof window.RITWDB.fetchApprovedProtocols !== "function") return;
        try {
            const contributed = await window.RITWDB.fetchApprovedProtocols();
            if (!contributed.length) return;

            let added = 0;
            contributed.forEach(p => {
                if (!protocols.find(existing => existing.id === p.id)) {
                    protocols.push(p);
                    added++;
                }
            });

            if (added) {
                sortProtocols();
                buildChapterNav();
                render(protocols.filter(p => matches(p, searchInput.value.trim())));
            }
        } catch (e) {
            /* offline or backend unavailable — book protocols still show */
            console.warn("Could not load contributed protocols:", e.message);
        }
    }

    /* ---------- init ---------- */
    sortProtocols();
    buildChapterNav();
    render(protocols);
    loadContributions();
})();
