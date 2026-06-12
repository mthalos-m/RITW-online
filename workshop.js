/* ============================================================
   workshop.js — Protocol Workshop logic
   ============================================================ */
(function () {
    "use strict";

    /* ---------- Mermaid init ---------- */
    mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
            background: "#fdf9f0",
            primaryColor: "#fdf9f0",
            primaryTextColor: "#1c1712",
            primaryBorderColor: "#c9b48e",
            lineColor: "#3a3028",
            secondaryColor: "#f5eed9",
            tertiaryColor: "#ece0c4",
            edgeLabelBackground: "#fdf9f0",
            clusterBkg: "#ece0c4",
            fontFamily: '"EB Garamond", Garamond, Georgia, serif',
            fontSize: "15px",
        },
        flowchart: { curve: "basis", padding: 20 },
        securityLevel: "loose",
    });

    /* ---------- templates ---------- */
    const TEMPLATES = [
        {
            id: "blank",
            label: "Blank",
            group: "structural",
            code: `flowchart TD
    A["Node A"] --> B["Node B"]`,
        },
        {
            id: "linear",
            label: "Linear chain",
            group: "structural",
            code: `flowchart LR
    A["Step 1"] --> B["Step 2"] --> C["Step 3"] --> D["Step 4"]`,
        },
        {
            id: "branching",
            label: "Branching decision",
            group: "structural",
            code: `flowchart TD
    A["Start"] --> B{"Decision point"}
    B -->|Yes| C["Path A"]
    B -->|No| D["Path B"]
    C --> E["Outcome"]
    D --> E`,
        },
        {
            id: "feedback",
            label: "Feedback loop",
            group: "structural",
            code: `flowchart TD
    A["Input"] --> B["Process"]
    B --> C{"Satisfactory?"}
    C -->|Yes| D["Output"]
    C -->|No| B`,
        },
        {
            id: "parallel",
            label: "Parallel paths",
            group: "structural",
            code: `flowchart TD
    A["Trigger"] --> B["Process A"]
    A --> C["Process B"]
    A --> D["Process C"]
    B & C & D --> E["Integration"]
    E --> F["Outcome"]`,
        },
        {
            id: "hierarchy",
            label: "Hierarchy",
            group: "structural",
            code: `flowchart TD
    A["Principal claim"]
    A --> B["Sub-claim 1"]
    A --> C["Sub-claim 2"]
    B --> D["Evidence 1a"]
    B --> E["Evidence 1b"]
    C --> F["Evidence 2a"]`,
        },
        /* ---- book protocols ---- */
        {
            id: "book-1.1",
            label: "Practical syllogism",
            group: "book",
            ref: "1.1",
            /* Major Move (norm scroll) → Minor Move (premise) → Gα (action) */
            code: `flowchart TD
    MAJ[/"Major Move:  ∀φ(Fφ → Gφ)"/]
    MIN(["Minor Move:  α  •  Fα"])
    ACT(["Gα"])
    MAJ -->|"the norm for Fs to G"| MIN
    MIN -->|"α is F"| ACT`,
        },
        {
            id: "book-1.4",
            label: "Hypothesis testing",
            group: "book",
            ref: "1.4",
            /* central column: P ⋮ Q∩¬Q ⬇ ¬P, with episodic→semantic memory */
            code: `flowchart TD
    P["P — Hypothesis (judgment withheld)"]
    Q["Q ∩ ¬Q  (derived using Hypothesis)"]
    NP["¬P  (saved to semantic memory)"]
    P -.->|"⋮ judgment withheld"| Q
    Q ==>|"inference move"| NP
    EM(["from episodic memory"]) --> P
    NP --> NEW(["NEW"])`,
        },
        {
            id: "book-1.5",
            label: "Conflict resolution — Plan A",
            group: "book",
            ref: "1.5",
            /* monitoring eye detects P@t1 vs ¬P@t2 → suspend & reprocess → loop back */
            code: `flowchart TD
    EYE(["👁  monitoring / search"])
    P1["P @t₁"]
    P2["¬P @t₂"]
    SR[["SUSPEND and REPROCESS"]]
    EYE --> P1
    EYE --> P2
    P1 -->|"conflict detected"| SR
    P2 -->|"conflict detected"| SR
    SR -.->|"reset to earlier state; activation fades"| EYE`,
        },
        {
            id: "book-1.6",
            label: "Conflict resolution — Plan B",
            group: "book",
            ref: "1.6",
            /* phases of suspend/reprocess with 'unresolved?' checks → make explicit */
            code: `flowchart TD
    P1["P @t₁"]
    P2["¬P @t₂"]
    PH1[["Phase 1: Suspend and reprocess"]]
    P3["¬P @t₂"]
    ME[/"MAKE EXPLICIT"/]
    P1 --> PH1
    P2 --> PH1
    PH1 -->|"Unresolved?"| P3
    P3 -->|"Unresolved?"| ME`,
        },
        {
            id: "book-1.11",
            label: "Dissonance / self-concept",
            group: "book",
            ref: "1.11",
            /* social info → self-concept Fα vs ¬Fα → unresolved? → reaffirm (loop) */
            code: `flowchart TD
    IN["Information absorbed socially"]
    SC(["Self-concept:  Fα"])
    NF["¬Fα"]
    CHK{"Unresolved?"}
    SA["Self-affirmation  Fα!!  /  F-ish behavior"]
    IN --> SC
    SC --> NF
    NF --> CHK
    CHK -->|"dissonance"| SA
    SA -.->|"reclaim F in good conscience"| IN
    SA --> EM(["episodic memory of F-ish action"])`,
        },
        {
            id: "book-2.1",
            label: "Cult dissonance reduction",
            group: "book",
            ref: "2.1",
            /* same shape as 1.11, with cult-instilled identity Gα replacing old self */
            code: `flowchart TD
    IN["Information absorbed socially"]
    CI(["Cult-instilled identity:  Gα"])
    NG["¬Gα"]
    CHK{"Unresolved?"}
    SA["Self-affirmation  Gα!!  /  G-ish behavior"]
    IN --> CI
    CI --> NG
    NG --> CHK
    CHK -->|"dissonance"| SA
    SA -.->|"reclaim G in good conscience"| IN
    SA --> EM(["episodic memory of G-ish action"])`,
        },
        {
            id: "book-6.1",
            label: "Stereotype threat",
            group: "book",
            ref: "6.1",
            /* syllogism preempted: 2nd-party minor move, then 1st-person ¬Gα → norm rejected */
            code: `flowchart TD
    MAJ[/"Major Move (common mind):  ∀φ(Fφ → Gφ)"/]
    MIN(["Minor Move (2nd-party assertion):  α  •  Fα"])
    FP["First-person authoritative<br/>assertion of identity:  ¬Gα"]
    REJ[/"¬∀φ(Fφ → Gφ)"/]
    MAJ -->|"the norm for Fs to G"| MIN
    MIN --> FP
    FP -->|"rejection of the norm"| REJ`,
        },
    ];

    /* ---------- state ---------- */
    let activeTemplate = null;
    let tags = [];
    let renderTimer = null;
    let diagramId = 0;

    /* ---------- DOM refs ---------- */
    const editor = document.getElementById("w-editor");
    const previewEl = document.getElementById("w-preview");
    const refPane = document.getElementById("w-reference-pane");
    const tabPreview = document.getElementById("tab-preview");
    const tabRef = document.getElementById("tab-reference");
    const panePreview = document.getElementById("pane-preview");
    const paneRef = document.getElementById("pane-reference");
    const tagInput = document.getElementById("w-tag-input");
    const tagChips = document.getElementById("tag-chips");
    const relatedSel = document.getElementById("w-related");
    const statusEl = document.getElementById("w-status");
    const toast = document.getElementById("toast");

    /* ---------- populate "Related protocols" select ---------- */
    protocols
        .filter(p => !p.userContributed)
        .forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = `${p.id} — ${p.title}`;
            relatedSel.appendChild(opt);
        });

    /* ---------- build template picker ---------- */
    const scrollStructural = document.getElementById("template-scroll-structural");
    const scrollBook = document.getElementById("template-scroll-book");

    function buildTemplatePicker() {
        scrollStructural.innerHTML = "";
        scrollBook.innerHTML = "";

        TEMPLATES.filter(t => t.group === "structural")
            .forEach(t => scrollStructural.appendChild(makeChip(t)));

        TEMPLATES.filter(t => t.group === "book")
            .forEach(t => scrollBook.appendChild(makeChip(t)));
    }

    /* both containers, for active-state toggling */
    function allChips() {
        return [
            ...scrollStructural.querySelectorAll(".template-chip"),
            ...scrollBook.querySelectorAll(".template-chip"),
        ];
    }

    function makeChip(t) {
        const btn = document.createElement("button");
        btn.className = "template-chip";
        btn.textContent = t.label;
        btn.dataset.id = t.id;
        btn.setAttribute("role", "listitem");
        btn.addEventListener("click", () => selectTemplate(t));
        return btn;
    }

    function selectTemplate(t) {
        activeTemplate = t;

        /* update active chip */
        allChips().forEach(c => {
            c.classList.toggle("active", c.dataset.id === t.id);
        });

        /* load code */
        editor.value = t.code;

        /* load reference image if it's a book protocol */
        if (t.ref) {
            const proto = protocols.find(p => p.id === t.ref);
            if (proto && proto.image) {
                refPane.innerHTML = `
                    <figure style="margin:0;text-align:center;">
                        <img src="${proto.image}" alt="Original diagram for Protocol ${proto.id}">
                        <figcaption style="margin-top:0.7rem;font-style:italic;font-size:0.88rem;color:var(--muted);">
                            Original diagram — Protocol ${proto.id}: ${proto.title}
                        </figcaption>
                    </figure>`;
                tabRef.disabled = false;
                tabRef.title = "";
            }
        } else {
            refPane.innerHTML = `<div class="preview-empty">Select a book protocol template to see its original diagram here.</div>`;
            /* switch back to preview tab if on reference */
            if (paneRef.classList.contains("active") || !panePreview.classList.contains("hidden")) {
                switchTab("preview");
            }
            tabRef.disabled = true;
            tabRef.title = "Only available when starting from a book protocol";
        }

        renderDiagram();
    }

    /* ---------- tabs ---------- */
    function switchTab(which) {
        if (which === "preview") {
            panePreview.classList.remove("hidden");
            paneRef.classList.add("hidden");
            tabPreview.classList.add("active");
            tabPreview.setAttribute("aria-selected", "true");
            tabRef.classList.remove("active");
            tabRef.setAttribute("aria-selected", "false");
        } else {
            paneRef.classList.remove("hidden");
            panePreview.classList.add("hidden");
            tabRef.classList.add("active");
            tabRef.setAttribute("aria-selected", "true");
            tabPreview.classList.remove("active");
            tabPreview.setAttribute("aria-selected", "false");
        }
    }

    tabPreview.addEventListener("click", () => switchTab("preview"));
    tabRef.addEventListener("click", () => switchTab("reference"));

    /* ---------- render diagram ---------- */
    async function renderDiagram() {
        const code = editor.value.trim();
        if (!code) {
            previewEl.innerHTML = `<div class="preview-empty">Your diagram will appear here.</div>`;
            setStatus("");
            return;
        }

        try {
            const id = `mermaid-render-${++diagramId}`;
            const { svg } = await mermaid.render(id, code);
            previewEl.innerHTML = svg;
            setStatus("Diagram OK");
        } catch (err) {
            const msg = String(err.message || err).replace(/^Error:\s*/i, "");
            previewEl.innerHTML = `<div class="preview-error">${escHtml(msg)}</div>`;
            setStatus("Syntax error — see preview");
        }
    }

    editor.addEventListener("input", () => {
        clearTimeout(renderTimer);
        setStatus("Rendering…");
        renderTimer = setTimeout(renderDiagram, 480);
    });

    /* ---------- tag input ---------- */
    function addTag(raw) {
        const val = raw.trim().replace(/,+$/, "").trim();
        if (!val || tags.includes(val)) return;
        tags.push(val);
        renderTags();
    }

    function removeTag(val) {
        tags = tags.filter(t => t !== val);
        renderTags();
    }

    function renderTags() {
        tagChips.innerHTML = "";
        tags.forEach(t => {
            const chip = document.createElement("span");
            chip.className = "tag-chip";
            chip.innerHTML = `${escHtml(t)}<button aria-label="Remove tag ${escHtml(t)}">&times;</button>`;
            chip.querySelector("button").addEventListener("click", () => removeTag(t));
            tagChips.appendChild(chip);
        });
    }

    tagInput.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(tagInput.value);
            tagInput.value = "";
        }
        if (e.key === "Backspace" && tagInput.value === "" && tags.length) {
            removeTag(tags[tags.length - 1]);
        }
    });

    tagInput.addEventListener("blur", () => {
        if (tagInput.value.trim()) {
            addTag(tagInput.value);
            tagInput.value = "";
        }
    });

    /* ---------- save to gallery ---------- */
    document.getElementById("btn-save").addEventListener("click", saveToGallery);

    async function saveToGallery() {
        const title = document.getElementById("w-title").value.trim();
        const code = editor.value.trim();

        if (!title) { showToast("Please add a title before saving."); return; }
        if (!code) { showToast("Please add a diagram before saving."); return; }

        /* ensure latest render */
        await renderDiagram();

        const svg = previewEl.querySelector("svg");
        let imageDataURL = "";

        if (svg) {
            try {
                imageDataURL = svgToDataURL(svg);
            } catch (_) {}
        }

        const related = Array.from(relatedSel.selectedOptions).map(o => o.value);

        const id = "user-" + Date.now();
        const proto = {
            id,
            title,
            chapter: 0, /* user protocols have no chapter */
            page: null,
            image: imageDataURL,
            description: document.getElementById("w-desc").value.trim(),
            featured: false,
            body: document.getElementById("w-notes").value.trim(),
            contributor: document.getElementById("w-contributor").value.trim(),
            tags,
            related,
            mermaidCode: code,
            dateAdded: new Date().toISOString(),
            userContributed: true,
        };

        try {
            const stored = JSON.parse(localStorage.getItem("ritw_protocols") || "[]");
            stored.push(proto);
            localStorage.setItem("ritw_protocols", JSON.stringify(stored));
            showToast("Protocol saved — returning to archive…");
            setTimeout(() => { window.location.href = "index.html"; }, 1600);
        } catch (e) {
            showToast("Could not save: storage may be full.");
        }
    }

    /* ---------- download PNG ---------- */
    document.getElementById("btn-download").addEventListener("click", downloadPNG);

    async function downloadPNG() {
        const code = editor.value.trim();
        if (!code) { showToast("Nothing to download yet."); return; }

        await renderDiagram();
        const svg = previewEl.querySelector("svg");
        if (!svg) { showToast("Diagram has an error — fix it before downloading."); return; }

        setStatus("Preparing download…");

        try {
            const svgStr = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            const img = new Image();
            img.onload = () => {
                const scale = 2;
                const canvas = document.createElement("canvas");
                canvas.width = (img.naturalWidth || svg.viewBox.baseVal.width || 800) * scale;
                canvas.height = (img.naturalHeight || svg.viewBox.baseVal.height || 600) * scale;
                const ctx = canvas.getContext("2d");
                ctx.scale(scale, scale);
                ctx.fillStyle = "#fdf9f0";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);

                const title = document.getElementById("w-title").value.trim()
                    .replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "protocol";
                const a = Object.assign(document.createElement("a"), {
                    download: `${title}.png`,
                    href: canvas.toDataURL("image/png"),
                });
                a.click();
                setStatus("Downloaded.");
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                showToast("PNG export failed — try saving to gallery instead.");
                setStatus("");
            };
            img.src = url;
        } catch (_) {
            showToast("PNG export is not supported in this browser.");
            setStatus("");
        }
    }

    /* ---------- clear ---------- */
    document.getElementById("btn-clear").addEventListener("click", () => {
        if (!editor.value.trim() || confirm("Clear the editor and start over?")) {
            editor.value = "";
            previewEl.innerHTML = `<div class="preview-empty">Your diagram will appear here.</div>`;
            document.getElementById("w-title").value = "";
            document.getElementById("w-contributor").value = "";
            document.getElementById("w-desc").value = "";
            document.getElementById("w-notes").value = "";
            tagInput.value = "";
            tags = [];
            renderTags();
            Array.from(relatedSel.options).forEach(o => { o.selected = false; });
            allChips().forEach(c => c.classList.remove("active"));
            activeTemplate = null;
            setStatus("");
        }
    });

    /* ---------- helpers ---------- */
    function svgToDataURL(svgEl) {
        const str = new XMLSerializer().serializeToString(svgEl);
        return "data:image/svg+xml," + encodeURIComponent(str);
    }

    function setStatus(msg) {
        statusEl.textContent = msg;
    }

    let toastTimer;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
    }

    function escHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;")
            .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    /* ---------- init ---------- */
    tabRef.disabled = true;
    buildTemplatePicker();
    selectTemplate(TEMPLATES[0]); /* start on "Blank" */

})();
