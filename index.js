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

        const meta = protocol.page
            ? `<span class="protocol-page">p.&thinsp;${protocol.page}</span>`
            : (protocol.userContributed ? `<span class="protocol-page contributed">Contributed</span>` : "");

        card.innerHTML = `
            <div class="card-top">
                <span class="protocol-label">Protocol ${escHtml(protocol.id)}</span>
                ${meta}
            </div>
            <h2>${escHtml(protocol.title)}</h2>
            <figure class="card-figure">${imgTag}</figure>
            <p class="card-caption">${escHtml(protocol.description || "")}</p>
            <div class="card-footer">
                ${protocol.userContributed
                    ? `<button class="card-delete" title="Delete this contributed protocol" aria-label="Delete protocol">&#128465; Delete</button>`
                    : `<span></span>`}
                <a class="card-link" href="protocol.html?id=${encodeURIComponent(protocol.id)}">
                    View protocol &nbsp;&#8594;
                </a>
            </div>
        `;

        const img = card.querySelector("img");
        if (img) {
            img.addEventListener("click", e => { e.preventDefault(); window.open(imgSrc, "_blank"); });
            img.addEventListener("error", () => {
                img.replaceWith(Object.assign(document.createElement("div"), {
                    textContent: "Diagram preview unavailable",
                    style: "color:var(--muted);font-style:italic;font-size:0.85rem;padding:1rem 0;"
                }));
            });
        }

        const del = card.querySelector(".card-delete");
        if (del) del.addEventListener("click", () => deleteContributed(protocol));

        return card;
    }

    /* ---------- delete a contributed protocol ---------- */
    function deleteContributed(protocol) {
        const ok = window.confirm(
            `Delete the contributed protocol “${protocol.title}”?\n\nThis removes it from this browser. This cannot be undone.`
        );
        if (!ok) return;

        const i = protocols.findIndex(p => p.id === protocol.id);
        if (i !== -1) protocols.splice(i, 1);

        try {
            const stored = JSON.parse(localStorage.getItem("ritw_protocols") || "[]");
            localStorage.setItem(
                "ritw_protocols",
                JSON.stringify(stored.filter(p => p.id !== protocol.id))
            );
        } catch (_) {}

        buildChapterNav();
        render(protocols.filter(p => matches(p, searchInput.value.trim())));
        showToast(`Deleted “${protocol.title}”.`);
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

    /* ---------- init ---------- */
    sortProtocols();
    buildChapterNav();
    render(protocols);
})();
