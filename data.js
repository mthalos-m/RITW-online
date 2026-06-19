/* Protocol data for Reasoning in the Wild (Mariam Thalos)
   Each entry may carry:
     id          – figure/table identifier (string)
     title       – full title
     chapter     – chapter number (integer)
     page        – book page number (integer)
     image       – relative path to diagram PNG
     description – short caption / description
     body        – optional multi-paragraph HTML for the detail page
     featured    – boolean; spans two columns in the gallery
*/
const protocols = [
    {
        id: "1.1",
        title: "The fundamental practical syllogism",
        chapter: 1,
        page: 47,
        image: "assets/protocols/Figure_1.1_fundamental_practical_syllogism.png",
        description: "The fundamental practical syllogism (Aristotelian in form).",
        featured: true,
        body: "",

        /* --- diagram rebuilt in Mermaid --- */
        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'MAJ[/"<span style=\'font-size:2em\'>∀φ(Fφ → Gφ)</span>"/]',
            'subgraph MIN[" "]',
            'direction TB',
            'AO(["<span aria-hidden=\'true\' style=\'color:transparent\'>wwwwwww</span><span style=\'font-size:2.6em\'>α</span><span aria-hidden=\'true\' style=\'color:transparent\'>wwwwwww</span>"])',
            'FA["<span style=\'font-size:2.6em\'>Fα</span>"]',
            'AO ~~~ FA',
            'end',
            'GA["<span style=\'font-size:2em\'>Gα</span>"]',
            'MAJ ==>|"<span style=\'font-size:1.6em\'>the norm for Fs to G</span>"| MIN',
            'MIN ==>|"<span style=\'font-size:1.6em\'>α is F</span>"| GA',
            'classDef plain fill:transparent,stroke:none;',
            'class FA plain',
            'class GA plain'
        ],

        /* --- helpful text from the book (figure 1.1 caption) --- */
        bookText: "In the fundamental practical syllogism, the scrolls indicate the content of the major move (e.g. assertion or commitment), and separately its specific illocutionary force. The content typically references the norm or practice being put forward as the major premise/move with the indicated force. The all-important minor premise/move, whose assertion is tantamount to a judgment to execute the syllogism, appears below it and is represented by a rounded parallelogram appearing just above a solid downward-pointing arrow. The Gα of the syllogism is an action by the syllogist — not a proposition describing it — upon the same referent of the judgment just above the arrow. The whole business amounts to a protocol — a connected set of operations.",

        /* --- hand-written walkthrough; each stage names the code lines it reveals --- */
        walkthrough: [
            {
                shown: [0],
                title: "Lay down the major move",
                note: "Every practical syllogism opens with a <em>major move</em>: a general norm or commitment, drawn here as a scroll (a parallelogram). The formula <strong>∀φ(Fφ → Gφ)</strong> reads &ldquo;for everything that is F, it is to be G&rdquo; — the norm being put forward, with its illocutionary force."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 8, 10, 11],
                title: "Add the minor move",
                note: "Beneath it comes the <em>minor move</em>: a particular individual <strong>α</strong> — the oval — registered as falling under the predicate, <strong>Fα</strong>. The arrow carries the norm down from the general rule (&ldquo;the norm for Fs to G&rdquo;) to this specific case. Asserting the minor move is already tantamount to a judgment to execute the syllogism."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                title: "Arrive at the action",
                note: "The solid downward arrow discharges into <strong>Gα</strong> — and this is the crux: Gα is not a <em>proposition</em> that α is G, but the agent's <em>action</em> of G-ing α. The syllogism doesn't end in a belief; it ends in a deed. The whole connected set of operations is what Thalos calls a <em>protocol</em>."
            }
        ]
    },
    {
        id: "1.2",
        title: "Capgras inference (compare two abbreviated schemata)",
        chapter: 1,
        page: 63,
        image: "assets/protocols/Figure_1.2_Capgras_inference_abbreviated_schemata.png",
        description: "Abbreviated schemata for the Capgras inference.",
        hideFigCaption: true,
        featured: true,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'subgraph CAP["`***Capgras***`"]',
            'A2["α is A (face lookup)"]',
            'FAM2["familiarity signal inhibited"]',
            'MOM2["α looks exactly like Mom, but isn\'t Mom"]',
            'A2 --> MOM2',
            'FAM2 -.->|"output goes nowhere"| FAM2',
            'end',
            'subgraph ORD["`***Ordinary recognition***`"]',
            'A1["α is A (face lookup)"]',
            'FAM1["`feeling of familiarity **☰** (limbic)`"]',
            'MOM1["`α is **☰** Mom — recognised`"]',
            'A1 --> MOM1',
            'FAM1 --> MOM1',
            'end'
        ],
        bookText: "A side-by-side comparison of abbreviated schemata for person recognition. In ordinary recognition (left), a face is processed in two places in the brain: the lookup that yields \"α is A\" and the limbic system's feeling of familiarity (the I Ching trigram ☰ is a placeholder for that feeling). When the two outputs are joined, the person recognises Mom. In Capgras (right), the limbic output is inhibited — its output curves back onto itself and goes nowhere — so the reasoning platform is missing a signal. The resulting output: \"this person looks exactly like Mom, but isn't Mom.\"",
        walkthrough: [
            {
                shown: [7, 8, 9, 10, 11, 12, 13],
                title: "Ordinary recognition",
                note: "Two independent products are joined: the face-lookup <strong>α is A</strong> and the limbic <em>feeling of familiarity</em> (☰). When both arrive, they combine into recognition — <strong>α is Mom</strong>."
            },
            {
                shown: [0, 1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13],
                title: "Capgras: the lookup still works",
                note: "On the Capgras side the face-lookup is intact: the visual system still computes <strong>α is A</strong>, &lsquo;looks like Mom.&rsquo; Nothing is wrong with recognition of the <em>features</em>."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                title: "But familiarity is inhibited",
                note: "The limbic familiarity signal is suppressed — its output <em>curves back on itself</em> and never reaches the join. Missing that signal, the platform concludes <strong>looks exactly like Mom, but isn't Mom</strong>. A hardware fault, read by the sufferer as a fact about the world."
            }
        ]
    },
    {
        id: "1.3",
        title: "Modus Ponens — explicit schema",
        chapter: 1,
        page: 65,
        image: "assets/protocols/Figure_1.3_Modus_Ponens_explicit_schema.png",
        description: "A schema applying Modus Ponens explicitly within the system.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'PQ["P → Q   (semantic memory · assertion)"]',
            'P["P   (episodic memory · assertion)"]',
            'Q["Q   (NEW · saved to semantic memory)"]',
            'PQ --> Q',
            'P ==>|"inference move"| Q'
        ],
        bookText: "The schema applying Modus Ponens in our system in an explicit (conscious) way. The conditional P → Q is held in semantic memory as a standing assertion; the antecedent P arrives as an assertion from episodic memory. The inference move (the bold downward arrow) discharges them into the conclusion Q, which is then saved back to semantic memory as something new.",
        walkthrough: [
            {
                shown: [0],
                title: "The conditional, already known",
                note: "The rule <strong>P → Q</strong> sits in <em>semantic memory</em> as a standing assertion — general knowledge the system already holds."
            },
            {
                shown: [0, 1],
                title: "The antecedent arrives",
                note: "Now <strong>P</strong> is asserted, freshly, from <em>episodic memory</em> — a particular fact the system has just registered."
            },
            {
                shown: [0, 1, 2, 3, 4],
                title: "The inference move",
                note: "The bold arrow is the explicit <em>inference move</em>: rule plus antecedent yield <strong>Q</strong>, which is promoted to semantic memory as something <strong>NEW</strong>. This is Modus Ponens made conscious and procedural."
            }
        ]
    },
    {
        id: "1.4",
        title: "Hypothesis testing schema",
        chapter: 1,
        page: 67,
        image: "assets/protocols/Figure_1.4_Hypothesis_testing_schema.png",
        description: "A schema for hypothesis testing.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'P["P — Hypothesis (judgment withheld)"]',
            'Q["Q ∩ ¬Q  (derived using Hypothesis)"]',
            'NP["¬P  (saved to semantic memory)"]',
            'P -.->|"⋮ judgment withheld"| Q',
            'Q ==>|"inference move"| NP',
            'EM(["from episodic memory"]) --> P',
            'NP --> NEW(["NEW"])'
        ],
        bookText: "A hypothesis P is entertained with judgment withheld, drawn from episodic memory. Reasoning onward from P eventually derives a contradiction, Q ∩ ¬Q. That contradiction licenses an inference move to ¬P, which is then saved to semantic memory as something new. The schema presents hypothesis testing as a reductio: P is entertained precisely so that it can be discharged when it yields contradiction.",
        walkthrough: [
            {
                shown: [0, 5],
                title: "Entertain the hypothesis",
                note: "A hypothesis <strong>P</strong> is pulled from <em>episodic memory</em> and held with <em>judgment withheld</em> — we are not yet committed to it. This provisional status is what makes it a test rather than a belief."
            },
            {
                shown: [0, 5, 1, 3],
                title: "Reason to a contradiction",
                note: "Working from P (the dotted arrow marks the suppressed intermediate steps, the &lsquo;⋮&rsquo;), the system derives <strong>Q ∩ ¬Q</strong> — a contradiction. Crucially, this was <em>derived using the hypothesis</em>, so the hypothesis is implicated in the trouble."
            },
            {
                shown: [0, 5, 1, 3, 2, 4],
                title: "Make the inference move",
                note: "Because P led to contradiction, the <em>inference move</em> (the thick arrow) discharges it: we conclude <strong>¬P</strong>. This is reductio ad absurdum operating inside the reasoning system."
            },
            {
                shown: [0, 5, 1, 3, 2, 4, 6],
                title: "Save the result",
                note: "The conclusion <strong>¬P</strong> is written to <em>semantic memory</em> as something <strong>NEW</strong> — a durable piece of knowledge, promoted out of the episodic, provisional register where it began."
            }
        ]
    },
    {
        id: "1.5",
        title: "Conflict resolution — Plan A",
        chapter: 1,
        page: 67,
        image: "assets/protocols/Figure_1.5_Conflict_resolution_Plan_A.png",
        description: "Conflict resolution schema, part I: Plan A.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'EYE(["👁  monitoring / search"])',
            'P1["P @t₁"]',
            'P2["¬P @t₂"]',
            'SR[["SUSPEND and REPROCESS"]]',
            'EYE --> P1',
            'EYE --> P2',
            'P1 -->|"conflict detected"| SR',
            'P2 -->|"conflict detected"| SR',
            'SR -.->|"reset to earlier state; activation fades"| EYE'
        ],
        bookText: "Our standard way of representing protocols is a three-column affair. The box containing the eye icon indicates that a search or, more generally, a monitoring process is focused on the process proceeding in the centre. When a conflict is detected — particularly if it is available to consciousness, as marked by the bolded notices P and ¬P — a directive is injected into the process to halt, to suspend activities (including the normal output to other processes), and to reset to an earlier state, higher up in the protocol, for reprocessing. The dark arrow indicates intervention from another process.",
        walkthrough: [
            {
                shown: [0],
                title: "A monitor watches the stream",
                note: "The eye marks a <em>monitoring</em> (or search) process sitting over the main line of reasoning. It is not itself reasoning — it is watching for trouble, especially trouble that reaches consciousness."
            },
            {
                shown: [0, 1, 2, 4, 5],
                title: "A conflict erupts",
                note: "The monitor catches two contents that cannot both stand: <strong>P at t₁</strong> and <strong>¬P at t₂</strong>. The bolding in the original figure marks that the conflict is available to consciousness."
            },
            {
                shown: [0, 1, 2, 4, 5, 3, 6, 7],
                title: "Suspend and reprocess",
                note: "Detecting the conflict injects a directive: <strong>SUSPEND and REPROCESS</strong>. Normal output to downstream processes is halted while the system reworks the conflicting material."
            },
            {
                shown: [0, 1, 2, 4, 5, 3, 6, 7, 8],
                title: "Reset to an earlier state",
                note: "The dashed dark arrow is <em>intervention from another process</em>: it resets the protocol to an earlier point for reprocessing, and the conflicting activation fades on a fixed timescale or once the conflict resolves."
            }
        ]
    },
    {
        id: "1.6",
        title: "Conflict resolution — Plan B",
        chapter: 1,
        page: 68,
        image: "assets/protocols/Figure_1.6_Conflict_resolution_Plan_B.png",
        description: "Conflict resolution schema, part II: Plan B.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'P1["P @t₁"]',
            'P2["¬P @t₂"]',
            'PH1[["Phase 1: Suspend and reprocess"]]',
            'P3["¬P @t₂"]',
            'ME[/"MAKE EXPLICIT"/]',
            'P1 --> PH1',
            'P2 --> PH1',
            'PH1 -->|"Unresolved?"| P3',
            'P3 -->|"Unresolved?"| ME'
        ],
        bookText: "This figure describes the larger context of the conflict-resolution process. When a supervising intent detects a conflict and reprocessing does not yield a resolution, a number of things might happen next. A suite of resolution processes might be invoked. One possibility is depicted here: a default, nonconscious procedure favours the most recent content (in this case ¬P) — a default of perception more generally. Other defaults are possible in other contexts, such as adhering to previously held beliefs or to a favoured ideology. For a subject especially curious or tolerant of ambiguity, defaults may be held in abeyance for extended periods, if not indefinitely.",
        walkthrough: [
            {
                shown: [0, 1],
                title: "The same conflict, in context",
                note: "We begin where Plan A began: two incompatible contents, <strong>P @t₁</strong> and <strong>¬P @t₂</strong>. Plan B asks what happens when first-pass reprocessing does not settle things."
            },
            {
                shown: [0, 1, 2, 5, 6],
                title: "Phase 1: suspend and reprocess",
                note: "Both contents feed into <strong>Phase 1</strong> — the suspend-and-reprocess step inherited from Plan A. The question is what happens if it returns no resolution."
            },
            {
                shown: [0, 1, 2, 5, 6, 3, 7],
                title: "A default takes over",
                note: "If still <em>Unresolved?</em>, a nonconscious default fires. Here perception's default favours the <strong>most recent</strong> content, ¬P @t₂. Other contexts use other defaults — prior belief, ideology, preference."
            },
            {
                shown: [0, 1, 2, 5, 6, 3, 7, 4, 8],
                title: "Make it explicit",
                note: "If even the default leaves the matter <em>Unresolved?</em>, the conflict is escalated and <strong>MADE EXPLICIT</strong> — surfaced for deliberate, conscious treatment rather than silent resolution."
            }
        ]
    },
    {
        id: "1.7",
        title: "Flag planting in perception",
        chapter: 1,
        page: 70,
        image: "assets/protocols/Figure_1.7_Flag_planting_in_perception.png",
        description: "A schema for flag planting in perception.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'PAT["Pattern / image recognition (cf. Fig 1.8)"]',
            'EXP["Expectations / predictions (constrain processing)"]',
            'PER["PERCEPT  [time / place stamp]"]',
            'PAT --> PER',
            'EXP --> PER',
            'PER -->|"FLAG planted"| EM(["episodic memory: new entry, or pointer to existing"])'
        ],
        bookText: "Flag planting in perception (e.g. vision). The dotted diagonal in the original figure represents the porous interplay between what is perceived (bottom-up \"pattern/image\" recognition) and what is expected (top-down expectations that condition or constrain processing of the sensory array). Expectations are known to \"fill in\" what might be missing due to insufficient processing time or attention. When a percept settles, a FLAG is planted: a first stop to episodic memory, creating a new entry or a pointer to an existing one. This is what Ramachandran et al. call \"reverberative processing.\"",
        walkthrough: [
            {
                shown: [0, 1],
                title: "Two streams meet",
                note: "Perception is an interplay of <strong>bottom-up</strong> pattern recognition and <strong>top-down</strong> expectations. The expectations don't just observe — they <em>constrain</em> processing and fill gaps."
            },
            {
                shown: [0, 1, 2, 3, 4],
                title: "A percept settles",
                note: "Where the two streams agree, a <strong>PERCEPT</strong> is fixed and given a <em>time/place stamp</em> — anchoring it to a moment and location."
            },
            {
                shown: [0, 1, 2, 3, 4, 5],
                title: "Plant the flag",
                note: "The percept's first stop is <em>episodic memory</em>: a <strong>FLAG is planted</strong>, either creating a new entry or pointing to an existing one — the seed of a remembered experience."
            }
        ]
    },
    {
        id: "1.8",
        title: "Content extraction / recognition",
        chapter: 1,
        page: 71,
        image: "assets/protocols/Figure_1.8_Content_extraction_recognition.png",
        description: "A schema for content extraction or recognition, from vision for example.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'VIS["Vision"]',
            'subgraph STORE["Data format · instances"]',
            'direction LR',
            'A["α"]',
            'B["β"]',
            'D["……"]',
            'M["further<br/>instances"]',
            'A ~~~ B ~~~ D ~~~ M',
            'end',
            'C["Content C<br/>(an image, a sound, or \'cat nearby\')"]',
            'AW["not routinely flagged up<br/>for explicit awareness"]',
            'VIS ==>|"feeds the module"| STORE',
            'STORE ==>|"extraction"| C',
            'C -.- AW',
            'classDef note fill:transparent,stroke-dasharray:3 3,color:#6b6457;',
            'class AW note'
        ],
        bookText: "Content extraction / recognition (from Vision, for example). This figure depicts a process of learning or training. The trapezoid in the original figure indicates an unspecified data format, possibly proprietary to the module (for example, a sensory processing unit), which extracts — indicated by the pyramidal figure — a content C that might be an image or sound, or could be represented propositionally (\"cat nearby\"). This content is not routinely flagged for explicit awareness.",
        walkthrough: [
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 11],
                title: "Raw input in a proprietary format",
                note: "Vision feeds a module that holds <em>many</em> instances (α, β, …) in its own <em>proprietary data format</em> — not yet anything the rest of the mind can read."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12],
                title: "Extraction",
                note: "An <strong>extraction</strong> (the pyramidal/del operation) distils the stored material over the whole aggregate — the step that turns formatless input into something usable."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                title: "A content emerges",
                note: "The output is a <strong>content C</strong> — an image, a sound, or a proposition like &lsquo;cat nearby.&rsquo; Crucially, this content is produced <em>without</em> being routinely flagged for explicit awareness; recognition mostly runs silently. (The same shape recurs in Fig 6.2, there over frequencies.)"
            }
        ]
    },
    {
        id: "1.9",
        title: "Perception reprocessing (on command)",
        chapter: 1,
        page: 72,
        image: "assets/protocols/Figure_1.9_Perception_reprocessing.png",
        description: "A schema for perception reprocessing on command.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'PAT["Pattern / image processing (cf. Fig 1.8)"]',
            'KF["Known faces (expectations)"]',
            'JESUS["PERCEPT: ⚑ \'Jesus\' (surprising match)"]',
            'PH1["Phase 1: Suspend and reprocess (Plan A)"]',
            'STAMP["⚑ Jesus  [time / place stamp]"]',
            'PAT --> JESUS',
            'KF --> JESUS',
            'JESUS -->|"surprise"| PH1',
            'PH1 -.->|"reprocess"| PAT',
            'PH1 -->|"Unresolved?"| STAMP',
            'STAMP --> EM(["flagged to explicit awareness · episodic memory"])'
        ],
        bookText: "Perception reprocessing (on command, in the double take). Pattern recognition runs in tandem with expectations as the constraining process, including known faces. It is surprised by a match to a face marked \"Jesus.\" The surprise results in a supervisory unit intervening with Plan A: a command to suspend and reprocess. When this does not produce a different result, the percept of Jesus is flagged and sent to explicit processing, and possibly also to episodic memory.",
        walkthrough: [
            {
                shown: [0, 1, 2, 5, 6],
                title: "A surprising percept",
                note: "Pattern processing, constrained by expectations about <em>known faces</em>, returns a startling match: <strong>⚑ &lsquo;Jesus&rsquo;</strong>. The flag marks it as surprising — not an ordinary recognition."
            },
            {
                shown: [0, 1, 2, 5, 6, 3, 7, 8],
                title: "Suspend and reprocess (the double take)",
                note: "Surprise triggers <strong>Plan A</strong> (cf. Fig 1.5): a supervisory unit commands <em>suspend and reprocess</em>, looping back to run the percept again. This is the &lsquo;double take.&rsquo;"
            },
            {
                shown: [0, 1, 2, 5, 6, 3, 7, 8, 4, 9, 10],
                title: "Still Jesus — so flag it",
                note: "If reprocessing returns the same result — <em>Unresolved?</em> — the percept is stamped and <strong>flagged to explicit awareness</strong>, and possibly written to episodic memory. The surprise is escalated rather than silently dismissed."
            }
        ]
    },
    {
        id: "1.10",
        title: "The Self / self-concept in action",
        chapter: 1,
        page: 74,
        image: "assets/protocols/Figure_1.10_Self_self_concept_in_action.png",
        description: "The Self/self-concept in action.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'subgraph SC[" "]',
            'direction TB',
            'AO(["<span aria-hidden=\'true\' style=\'color:transparent\'>wwww</span><span style=\'font-size:1.5em\'>α</span><span aria-hidden=\'true\' style=\'color:transparent\'>wwww</span>"])',
            'FA["<span style=\'font-size:1.5em\'>Fα</span>"]',
            'AO ~~~ FA',
            'end',
            'ACT["Self-attribution in action · body image · behaviour"]',
            'SC ==>|"drives self-attribution"| ACT',
            'ACT -.->|"may distort reality, for better or worse"| SC',
            'classDef plain fill:transparent,stroke:none;',
            'class FA plain'
        ],
        bookText: "The Self/self-concept in action. In the book's illustration, a child self-attributes a particular grown-up dress (perhaps that of a parent); a person depicts a body image grossly out of proportion to their actual body; and another sees herself as a lion. A self-concept can represent all manner of distortions to the reality that is yourself, for better or worse. (This figure is a conceptual illustration rather than a step protocol; the diagram below renders its logical core.)",
        walkthrough: [
            {
                shown: [0, 1, 2, 3, 4, 5, 9, 10],
                title: "The Self forms a self-concept",
                note: "The Self, <strong>α</strong> — the individual in the oval — attributes to itself a self-concept <strong>Fα</strong>, &lsquo;I am F.&rsquo; This is not a neutral readout of facts but a self-attribution, drawn as the same minor-move emblem as the fundamental syllogism."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10],
                title: "The self-concept drives action",
                note: "The self-concept expresses itself in <strong>action, body image, and behaviour</strong> — the child dressing as a parent, the person carrying a distorted body image, the self imagined as a lion."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                title: "And feeds back on reality",
                note: "Crucially, the loop closes: how one acts <em>reshapes</em> the self-concept in turn. A self-concept can represent &lsquo;all manner of distortions to the reality that is yourself, for better or worse.&rsquo;"
            }
        ]
    },
    {
        id: "1.11",
        title: "Dissonance reduction around the self-concept",
        chapter: 1,
        page: 75,
        image: "assets/protocols/Figure_1.11_Dissonance_reduction_self_concept.png",
        description: "A schema for dissonance reduction around the self-concept.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'IN["Information absorbed socially"]',
            'NF["¬Fα"]',
            'SC(["Self-concept: Fα<br/>(expectation)"])',
            'CHK{"Unresolved?"}',
            'BEH["F-ish behavior"]',
            'AFF(["Self-affirmation Fα!!"])',
            'EM(["episodic memory of F-ish action"])',
            'IN -->|"recency"| NF',
            'NF -->|"recent evidence"| CHK',
            'SC -.->|"expectation"| CHK',
            'CHK -->|"dissonance"| BEH',
            'BEH -->|"reclaim F in good conscience"| IN',
            'BEH -->|"licenses, in good conscience"| AFF',
            'SC ==>|"lean harder"| AFF',
            'BEH --> EM'
        ],
        bookText: "When a prized self-conception Fα is imperiled, this creates the physiological condition of cognitive dissonance — a state of discomfort that prompts the subject to take actions which create enough social evidence to reclaim the attribute F in good conscience, by forceful reaffirmation of Fα. The self-concept here is favoured by dissonance reduction (indicated by the bolding around the self-concept in the figure), so evidence that favours concluding Fα will be actively sought, and even manufactured.",
        walkthrough: [
            {
                shown: [0, 1, 7, 2],
                title: "Two sources of information",
                note: "Two things bear on the self-conception <strong>Fα</strong> — &lsquo;I am F.&rsquo; The socially absorbed materials currently carry <em>recent</em> counter-evidence, <strong>¬Fα</strong>; against it stands the self-concept <strong>Fα</strong>, held as a standing <em>expectation</em>."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9],
                title: "Expectation versus recency",
                note: "The expectation would ordinarily win out automatically. But because of <em>recency effects</em> in the socially absorbed information, the recent <strong>¬Fα</strong> stays live and the self-concept does <em>not</em> automatically prevail."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9, 4, 10],
                title: "Genuine dissonance",
                note: "When the expectation fails to win out on its own, the clash is truly <em>Unresolved?</em> — and that is <strong>cognitive dissonance</strong>: a felt, physiological discomfort, not a calm logical puzzle. It drives the subject to act."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9, 4, 10, 11, 6, 14],
                title: "Act to reclaim F",
                note: "Dissonance prompts <strong>F-ish behaviour</strong>: the subject does F-ish things to give themselves <em>even more recent</em> social evidence of Fα — <em>reclaiming F in good conscience</em> by feeding it back into the absorbed materials — and lays down an <strong>episodic memory of the F-ish action</strong> to cite later."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9, 4, 10, 11, 6, 14, 5, 12, 13],
                title: "Lean harder — self-affirmation",
                note: "Only <em>subsequently</em>, now in good conscience, can the subject lean harder on the self-concept side with <strong>self-affirmation (Fα!!)</strong>. That reaffirmation is the <em>resolution</em> of the dissonance — and the self-concept is favoured throughout (the bolding in the figure)."
            }
        ]
    },
    {
        id: "1.12",
        title: "Person recognition (visual) in the fusiform gyrus",
        chapter: 1,
        page: 77,
        image: "assets/protocols/Figure_1.12_Person_recognition_visual_fusiform_gyrus.png",
        description: "A schema for visual person recognition in the fusiform gyrus.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'VIS["Vision"]',
            'KF["Known faces (database in fusiform gyrus)"]',
            'FACE["α  [a face]"]',
            'ID["α is A"]',
            'VIS --> FACE',
            'FACE --> ID',
            'KF -->|"expectations / lookup"| ID',
            'ID -->|"default move"| PTR(["pointer to A in semantic memory"])'
        ],
        bookText: "Person recognition (visual) in the fusiform gyrus. The ordinary case of a known face is similar to every other case of object recognition (cf. Fig 1.7), except that the expectations against which the visual system compares its input are a special database in the fusiform gyrus of the temporal lobe. The default reasoning move is to identify the person or image with the person associated with the known face, and to place a pointer from one to the other.",
        walkthrough: [
            {
                shown: [0, 2, 4],
                title: "A face arrives",
                note: "Vision delivers <strong>α</strong>, a face — input to be recognised, no different in kind from any other object recognition."
            },
            {
                shown: [0, 2, 4, 1, 3, 5, 6],
                title: "Compared against known faces",
                note: "The twist is <em>where</em> the expectations live: a special database of <strong>known faces in the fusiform gyrus</strong>. Matching against it yields <strong>α is A</strong> — this face is person A."
            },
            {
                shown: [0, 2, 4, 1, 3, 5, 6, 7],
                title: "Place a pointer",
                note: "The <em>default move</em> then links the percept to the person: a <strong>pointer to A in semantic memory</strong>, so everything you know about A becomes available."
            }
        ]
    },
    {
        id: "1.13",
        title: "Person recognition — special cases",
        chapter: 1,
        page: 78,
        image: "assets/protocols/Figure_1.13_Person_recognition_special_cases.png",
        description: "Special cases in person recognition.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'VIS["Vision"]',
            'KF["Known faces in fusiform gyrus — best match: Mom"]',
            'ID["α is A"]',
            'FAM["`PLUS **☰** feeling of familiarity (limbic system)`"]',
            'MOM["`α is **☰** Mom`"]',
            'VIS --> ID',
            'KF --> ID',
            'ID --> MOM',
            'FAM -->|"all-clear"| MOM',
            'MOM --> PTR(["pointer to Mom in semantic memory"])'
        ],
        bookText: "Person recognition — special cases (the rich representation of loved ones). Recognition of beloved individuals is high-stakes, and so appropriately attended to with an added step of verification. As in the ordinary case, faces are processed in two places: the temporal lobe (the fusiform-gyrus database of known faces) and the limbic system. When the limbic system gives the all-clear — the feeling of familiarity, the I Ching symbol ☰ attached to the temporal lobe's output — the reasoning platform is licensed to assign the person, identifying α with Mom and placing a pointer in semantic memory.",
        walkthrough: [
            {
                shown: [0, 2, 5],
                title: "The ordinary lookup",
                note: "As before, vision plus the fusiform-gyrus database yield <strong>α is A</strong> — the face is identified by its features. For a loved one, that is not yet enough."
            },
            {
                shown: [0, 2, 5, 1, 3, 6, 8],
                title: "An added check: familiarity",
                note: "Because recognising loved ones is <em>high-stakes</em>, there is a second channel: the limbic system's <strong>feeling of familiarity</strong> (☰). It must give the <em>all-clear</em> before recognition is licensed."
            },
            {
                shown: [0, 2, 5, 1, 3, 6, 8, 4, 7, 9],
                title: "All-clear → recognise Mom",
                note: "With both the lookup <em>and</em> the familiarity signal present, the platform concludes <strong>α is Mom</strong> and places a <strong>pointer to Mom</strong> in semantic memory. Two signals, jointly, unlock the rich recognition of a loved one."
            }
        ]
    },
    {
        id: "1.14",
        title: "Capgras: a surprising case of conflict reduction",
        chapter: 1,
        page: 79,
        image: "assets/protocols/Figure_1.14_Capgras_conflict_reduction.png",
        description: "Capgras as a surprising case of conflict reduction.",
        featured: true,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'VIS["Vision"]',
            'KF["Known faces in fusiform gyrus"]',
            'ID["α is A"]',
            'FAM["`PLUS **☰** familiarity — limbic output inhibited`"]',
            'NOTMOM["α is NOT Mom"]',
            'VIS --> ID',
            'KF --> ID',
            'ID --> NOTMOM',
            'FAM -.->|"output suppressed; all-clear never arrives"| FAM',
            'NOTMOM -->|"absence of evidence read as evidence of absence"| CONC(["no pointer: looks like Mom, but isn\'t"])'
        ],
        bookText: "Capgras: a surprising case of conflict reduction. In contrast with Figure 1.13, the limbic system and/or its communications with other units have been damaged, preventing it from issuing an output (depicted by the arrow curving back on itself). It fails to produce the all-clear warm signal of the I Ching ☰, and this causes explicit processing to pause. When the all-clear never arrives, the sufferer uses this absence of evidence as evidence of absence — concluding that the person, though identical in appearance, is not the beloved object.",
        walkthrough: [
            {
                shown: [0, 2, 5],
                title: "The lookup is intact",
                note: "As in the ordinary case, the face is correctly identified: <strong>α is A</strong>. Capgras is not a failure of feature recognition — the sufferer sees the resemblance perfectly."
            },
            {
                shown: [0, 2, 5, 3, 8],
                title: "But the all-clear never comes",
                note: "The limbic familiarity channel is <strong>damaged</strong>: its output curves back on itself and is suppressed. The warm <em>all-clear</em> signal (☰) that Fig 1.13 relied on simply never arrives."
            },
            {
                shown: [0, 2, 5, 3, 8, 1, 6, 4, 7, 9],
                title: "Absence read as evidence",
                note: "Here is the surprising move: the sufferer treats the <em>missing</em> familiarity as a positive datum — <strong>absence of evidence as evidence of absence</strong> — and concludes <strong>α is NOT Mom</strong>. A hardware deficit is rationalised into a delusional belief: &lsquo;looks exactly like Mom, but isn't.&rsquo;"
            }
        ]
    },
    {
        id: "2.1",
        title: "Dissonance reduction in a cult",
        chapter: 2,
        page: 107,
        image: "assets/protocols/Figure_2.1_Dissonance_reduction_in_a_cult.png",
        description: "Dissonance reduction in a cult: cult-instilled identity replaces old identity.",
        featured: true,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'IN["Information absorbed socially"]',
            'NG["¬Gα"]',
            'CI(["Cult-instilled identity: Gα<br/>(expectation)"])',
            'CHK{"Unresolved?"}',
            'BEH["G-ish behavior"]',
            'AFF(["Self-affirmation Gα!!"])',
            'EM(["episodic memory of G-ish action"])',
            'IN -->|"recency"| NG',
            'NG -->|"recent evidence"| CHK',
            'CI -.->|"instilled expectation"| CHK',
            'CHK -->|"dissonance"| BEH',
            'BEH -->|"reclaim G in good conscience"| IN',
            'BEH -->|"licenses, in good conscience"| AFF',
            'CI ==>|"lean harder"| AFF',
            'BEH --> EM'
        ],
        bookText: "When an identity G — ordinary, or instilled as by a cult — is imperiled by information in the social environment (such as someone denying the subject the characteristic G), this creates the physiological condition of cognitive dissonance: a state of discomfort that prompts the subject to take G-ish actions (performing behaviors associated with G) so as to create enough social evidence to reclaim G in good conscience, by forceful reaffirmation of Gα. The cult-instilled self-concept is favoured, so evidence concluding Gα will be actively sought, and manufactured where necessary. The mechanism is exactly that of Figure 1.11 — with a cult-supplied identity standing in for the prized self-concept.",
        walkthrough: [
            {
                shown: [0, 1, 7, 2],
                title: "Two sources, one instilled",
                note: "The very same machinery as the self-concept protocol, with one substitution. The socially absorbed materials carry <em>recent</em> counter-evidence, <strong>¬Gα</strong>; against it stands <strong>Gα</strong> — an identity <em>instilled by the cult</em> rather than grown by the subject — held as a standing expectation where the old identity once stood."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9],
                title: "Expectation versus recency",
                note: "The instilled identity would ordinarily win out on its own. But <em>recency effects</em> in the social information keep the denial <strong>¬Gα</strong> live — someone refuses to treat the subject as G — so the cult identity does <em>not</em> automatically prevail."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9, 4, 10],
                title: "Genuine dissonance",
                note: "When the instilled expectation fails to win out by itself, the clash is truly <em>Unresolved?</em> — <strong>cognitive dissonance</strong>, the same physiological discomfort, now organised around a manufactured rather than native self-concept."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9, 4, 10, 11, 6, 14],
                title: "Act to reclaim G",
                note: "Dissonance prompts <strong>G-ish behaviour</strong>: the subject performs the cult's behaviours to give themselves <em>even more recent</em> social evidence of Gα — <em>reclaiming G in good conscience</em> back into the absorbed materials — and lays down an <strong>episodic memory of the G-ish action</strong>."
            },
            {
                shown: [0, 1, 7, 2, 3, 8, 9, 4, 10, 11, 6, 14, 5, 12, 13],
                title: "Lean harder — reaffirm Gα!!",
                note: "Only <em>subsequently</em>, now in good conscience, can the subject lean harder on the instilled identity with <strong>self-affirmation (Gα!!)</strong>. That reaffirmation resolves the dissonance — and each cycle further entrenches the cult-instilled identity in place of the old one."
            }
        ]
    },
    {
        id: "4.1",
        title: "The transfiguration of the personal: a sociological protocol",
        chapter: 4,
        page: 164,
        image: "assets/protocols/Figure_4.1_Transfiguration_of_the_personal.png",
        description: "The transfiguration of the personal as a sociological protocol.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'PSI["Ψ — a story injected into the world (by an artist)"]',
            'COMMON["<span style=\'font-family:Arial,Helvetica,sans-serif;font-style:italic;font-weight:700\'>ψ</span> — transfigured, passes into the Common mind<br/>(a cultural object)"]',
            'subgraph MINOR[" "]',
            'direction TB',
            'AO(["<span aria-hidden=\'true\' style=\'color:transparent\'>wwww</span><span style=\'font-size:1.5em\'>α</span><span aria-hidden=\'true\' style=\'color:transparent\'>wwww</span>"])',
            'FA["<span style=\'font-size:1.5em\'>Ψα</span>"]',
            'AO ~~~ FA',
            'end',
            'PSI ==>|"transfigured"| COMMON',
            'COMMON ==>|"available as a Minor Move (Ψ applied to α)"| MINOR',
            'classDef plain fill:transparent,stroke:none;',
            'class FA plain'
        ],
        bookText: "The transfiguration of the personal: a sociological protocol. An artist injects a story (or chirp, if you will) Ψ into the world, whereupon an audience actively engages with it, reverberatively. As a result, the scripts and norms associated with it become transfigured, transcending the specifics of the original story, attaining a new status as a cultural object, and ultimately passing into the common mind — there to become available for applications in individual reasoning as a Minor Move (Ψ applied to α).",
        walkthrough: [
            {
                shown: [0],
                title: "An artist injects a story",
                note: "It begins with a particular, personal act: an artist releases a story — <strong>Ψ</strong> — into the world. At this stage it is still one author's specific creation, in its plain original form."
            },
            {
                shown: [0, 1, 8],
                title: "Transfigured into the common mind",
                note: "An audience engages with it <em>reverberatively</em>; its scripts and norms become <strong>transfigured</strong>, transcending the original specifics. In the <strong>common mind</strong> the story takes on a different guise — <strong>ψ</strong>, set in another typeface, a shared <em>cultural object</em> rather than one author's proper work. That altered form <em>is</em> the transfiguration of the personal."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                title: "Available as a Minor Move",
                note: "Drawn back down into anyone's reasoning, it becomes available as a <strong>Minor Move</strong> — the same oval-in-box emblem as the fundamental syllogism, here with the individual α in the oval and <strong>Ψα</strong> (Ψ applied to α) beneath. The personal has become shared inferential material."
            }
        ]
    },
    {
        id: "6.1",
        title: "Stereotype threat in the 2nd person, preempted by a counter-identity move",
        chapter: 6,
        page: 209,
        image: "assets/protocols/Figure_6.1_Stereotype_threat_second_person.png",
        description: "Stereotype threat in the second person, preempted by a counter-identity move.",
        featured: true,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'MAJ[/"Major Move (common mind):<br/>∀φ(Fφ → Gφ)"/]',
            'SL[" "]',
            'subgraph MIN[" "]',
            'direction TB',
            'AO(["<span aria-hidden=\'true\' style=\'color:transparent\'>wwww</span><span style=\'font-size:1.5em\'>α</span><span aria-hidden=\'true\' style=\'color:transparent\'>wwww</span>"])',
            'FA["<span style=\'font-size:1.5em\'>Fα</span>"]',
            'AO ~~~ FA',
            'end',
            'FP["First-person authoritative<br/>assertion of identity: <b>☰ ¬Gα</b>"]',
            'REJ[/"¬∀φ(Fφ → Gφ)"/]',
            'MAJ ~~~ SL',
            'MAJ ~~~ MIN',
            'MAJ -->|"the syllogism,<br/>mounted on the agent"| FP',
            'MIN --> FP',
            'FP ==>|"rejection of the norm"| REJ',
            'classDef plain fill:transparent,stroke:none;',
            'class FA plain',
            'class SL plain'
        ],
        bookText: "A stereotype threat in the second person cannot be countered simply by a preemption of the entire syllogism. This is because the Minor move is performed by a second party, who asserts both the norm and the application of the norm to the agent. The agent must counter the move by a first-person authoritative assertion of their identity — denying the syllogism's usual upshot and asserting its negation. This allows the agent to reject the norm as a generalization.",
        walkthrough: [
            {
                shown: [0],
                title: "The norm from the common mind",
                note: "As in the fundamental syllogism, we begin with a <strong>Major Move</strong>: the shared norm <strong>∀φ(Fφ → Gφ)</strong>, &lsquo;Fs are to G.&rsquo; But here it comes from the <em>common mind</em> — it is in the air, not asserted by the agent."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 15, 16, 17],
                title: "A second party makes the minor move",
                note: "The crucial twist: the <strong>Minor Move</strong> — the same oval-in-box emblem as the fundamental syllogism (α is F) — is asserted by a <em>second party</em>, not the agent. Someone else is running the syllogism <em>on</em> the agent, applying the norm to them."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17],
                title: "The first-person counter",
                note: "The agent cannot simply decline to conclude. They must intervene with a <strong>first-person authoritative assertion of identity</strong>: <strong>¬Gα</strong> — explicitly denying the syllogism's expected upshot about themselves."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                title: "The norm is rejected",
                note: "That counter-assertion does more than block one inference: it propagates back up to <strong>reject the norm itself</strong>, ¬∀φ(Fφ → Gφ). The agent refuses the generalization, not merely its application to them."
            }
        ]
    },
    {
        id: "6.2",
        title: "Quorum reasoning is a big-data affair",
        chapter: 6,
        page: 213,
        image: "assets/protocols/Figure_6.2_Quorum_reasoning_big_data_affair.png",
        description: "Quorum reasoning as a big-data affair.",
        featured: false,
        body: "",

        mermaidHeader: "flowchart TD",
        mermaidLines: [
            'subgraph STORE["Data format · subconscious tabulation of instances"]',
            'direction LR',
            'A["α"]',
            'B["β"]',
            'D["……"]',
            'M["further<br/>instances"]',
            'A ~~~ B ~~~ D ~~~ M',
            'end',
            'C["Content C:<br/>relative frequency of the feature in the population<br/>(recency effects may apply)"]',
            'AW["not routinely flagged up<br/>for explicit awareness"]',
            'STORE ==>|"statistical query"| C',
            'C -.- AW',
            'classDef note fill:transparent,stroke-dasharray:3 3,color:#6b6457;',
            'class AW note'
        ],
        bookText: "Quorum reasoning is a big-data affair. Quorum reasoning is a recognition process operating semi-autonomously in the background, utilizing statistical algorithms behind the boundaries of attention. As in Figure 1.8, the trapezoid indicates an unspecified data format, possibly proprietary to the module in which the operation proceeds. The operation, when queried, returns a content attesting to the relative frequency of the feature of interest in the relevant population.",
        walkthrough: [
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7],
                title: "Quietly counting many instances",
                note: "Below attention, the mind keeps a running <strong>subconscious tabulation</strong> of <em>many</em> instances — α, β, and countless more, each an independent data point — accumulated together into a module's own data format. The assertions come from many sources, not a single line."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10],
                title: "A single statistical query",
                note: "When something prompts it, one <strong>statistical query</strong> runs over the <em>whole aggregate</em> at once — the same extraction shape as content recognition (Fig 1.8), but operating on frequencies across the population."
            },
            {
                shown: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                title: "Return a frequency, below awareness",
                note: "The output is a <strong>content C</strong> attesting to the <em>relative frequency</em> of the feature across the population — &lsquo;how common is this?&rsquo; — though <em>recency effects may skew the tally</em>, recent instances weighing more heavily. It is <em>not routinely flagged up for explicit awareness</em>, delivered as a felt sense rather than an explicit calculation."
            }
        ]
    },

];

/* Chapter metadata */
const chapters = {
    1: { label: "Chapter 1", title: "The Architecture of Reason" },
    2: { label: "Chapter 2", title: "Identity and Dissonance" },
    4: { label: "Chapter 4", title: "The Sociological Turn" },
    6: { label: "Chapter 6", title: "Quorum and Stereotype" }
};

/* Reader-contributed protocols are loaded asynchronously from Supabase
   (see supabase.js / RITWDB.fetchApprovedProtocols) by the gallery and
   detail pages — they are no longer stored in localStorage. */
