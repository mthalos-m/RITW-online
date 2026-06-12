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
            'MAJ[/"Major Move:  ∀φ(Fφ → Gφ)"/]',
            'MIN(["Minor Move:  α  •  Fα"])',
            'ACT(["Gα"])',
            'MAJ -->|"the norm for Fs to G"| MIN',
            'MIN -->|"α is F"| ACT'
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
                shown: [0, 1, 3],
                title: "Add the minor move",
                note: "Beneath it comes the <em>minor move</em>, a rounded box: the agent registers that a particular thing <strong>α is F</strong>. The arrow carries the norm down from the general rule (&ldquo;the norm for Fs to G&rdquo;) to this specific case. Asserting the minor move is already tantamount to a judgment to execute the syllogism."
            },
            {
                shown: [0, 1, 2, 3, 4],
                title: "Arrive at the action",
                note: "The solid downward arrow discharges into <strong>Gα</strong> — and this is the crux: Gα is not a <em>proposition</em> that α is G, but the agent's <em>action</em> of G-ing α. The syllogism doesn't end in a belief; it ends in a deed. The whole connected set of operations is what Thalos calls a <em>protocol</em>."
            }
        ]
    },
    {
        id: "1.2",
        title: "Capgras inference (abbreviated schemata)",
        chapter: 1,
        page: 63,
        image: "assets/protocols/Figure_1.2_Capgras_inference_abbreviated_schemata.png",
        description: "Abbreviated schemata for the Capgras inference.",
        featured: true,
        body: ""
    },
    {
        id: "1.3",
        title: "Modus Ponens — explicit schema",
        chapter: 1,
        page: 65,
        image: "assets/protocols/Figure_1.3_Modus_Ponens_explicit_schema.png",
        description: "A schema applying Modus Ponens explicitly within the system.",
        featured: false,
        body: ""
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
        body: ""
    },
    {
        id: "1.8",
        title: "Content extraction / recognition",
        chapter: 1,
        page: 71,
        image: "assets/protocols/Figure_1.8_Content_extraction_recognition.png",
        description: "A schema for content extraction or recognition, from vision for example.",
        featured: false,
        body: ""
    },
    {
        id: "1.9",
        title: "Perception reprocessing (on command)",
        chapter: 1,
        page: 72,
        image: "assets/protocols/Figure_1.9_Perception_reprocessing.png",
        description: "A schema for perception reprocessing on command.",
        featured: false,
        body: ""
    },
    {
        id: "1.10",
        title: "The Self / self-concept in action",
        chapter: 1,
        page: 74,
        image: "assets/protocols/Figure_1.10_Self_self_concept_in_action.png",
        description: "The Self/self-concept in action.",
        featured: false,
        body: ""
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
            'SC(["Self-concept:  Fα"])',
            'NF["¬Fα"]',
            'CHK{"Unresolved?"}',
            'SA["Self-affirmation  Fα!!  /  F-ish behavior"]',
            'IN --> SC',
            'SC --> NF',
            'NF --> CHK',
            'CHK -->|"dissonance"| SA',
            'SA -.->|"reclaim F in good conscience"| IN',
            'SA --> EM(["episodic memory of F-ish action"])'
        ],
        bookText: "When a prized self-conception Fα is imperiled, this creates the physiological condition of cognitive dissonance — a state of discomfort that prompts the subject to take actions which create enough social evidence to reclaim the attribute F in good conscience, by forceful reaffirmation of Fα. The self-concept here is favoured by dissonance reduction (indicated by the bolding around the self-concept in the figure), so evidence that favours concluding Fα will be actively sought, and even manufactured.",
        walkthrough: [
            {
                shown: [0, 1, 5],
                title: "A self-concept is in play",
                note: "Socially absorbed information bears on a <em>prized</em> self-concept, <strong>Fα</strong> — &lsquo;I am F.&rsquo; The bolding in the figure marks that this self-concept is the protected party in what follows."
            },
            {
                shown: [0, 1, 5, 2, 6],
                title: "Counter-evidence arrives",
                note: "Incoming social evidence points the other way: <strong>¬Fα</strong>. The subject is now confronted with material that threatens a self-conception they are invested in holding."
            },
            {
                shown: [0, 1, 5, 2, 6, 3, 7],
                title: "Dissonance, unresolved",
                note: "The clash is <em>Unresolved?</em> — and an unresolved clash around the self-concept is precisely <strong>cognitive dissonance</strong>: a felt, physiological discomfort, not a calm logical puzzle."
            },
            {
                shown: [0, 1, 5, 2, 6, 3, 7, 4, 8],
                title: "Self-affirmation fires",
                note: "Dissonance drives <strong>self-affirmation</strong>: forceful Fα behaviour and reaffirmation (Fα!!). Evidence favouring Fα is now actively sought — and, the figure notes, even <em>manufactured</em>."
            },
            {
                shown: [0, 1, 5, 2, 6, 3, 7, 4, 8, 9, 10],
                title: "The loop closes",
                note: "The affirming action both <em>reclaims F in good conscience</em> (feeding back into the social information) and is laid down as an <strong>episodic memory of F-ish action</strong> — evidence the subject can cite to themselves later."
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
        body: ""
    },
    {
        id: "1.13",
        title: "Person recognition — special cases",
        chapter: 1,
        page: 78,
        image: "assets/protocols/Figure_1.13_Person_recognition_special_cases.png",
        description: "Special cases in person recognition.",
        featured: false,
        body: ""
    },
    {
        id: "1.14",
        title: "Capgras: a surprising case of conflict reduction",
        chapter: 1,
        page: 79,
        image: "assets/protocols/Figure_1.14_Capgras_conflict_reduction.png",
        description: "Capgras as a surprising case of conflict reduction.",
        featured: true,
        body: ""
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
            'CI(["Cult-instilled identity:  Gα"])',
            'NG["¬Gα"]',
            'CHK{"Unresolved?"}',
            'SA["Self-affirmation  Gα!!  /  G-ish behavior"]',
            'IN --> CI',
            'CI --> NG',
            'NG --> CHK',
            'CHK -->|"dissonance"| SA',
            'SA -.->|"reclaim G in good conscience"| IN',
            'SA --> EM(["episodic memory of G-ish action"])'
        ],
        bookText: "When an identity G — ordinary, or instilled as by a cult — is imperiled by information in the social environment (such as someone denying the subject the characteristic G), this creates the physiological condition of cognitive dissonance: a state of discomfort that prompts the subject to take G-ish actions (performing behaviors associated with G) so as to create enough social evidence to reclaim G in good conscience, by forceful reaffirmation of Gα. The cult-instilled self-concept is favoured, so evidence concluding Gα will be actively sought, and manufactured where necessary. The mechanism is exactly that of Figure 1.11 — with a cult-supplied identity standing in for the prized self-concept.",
        walkthrough: [
            {
                shown: [0, 1, 5],
                title: "A cult-instilled identity",
                note: "The very same machinery as the self-concept protocol, with one substitution: the protected party is now <strong>Gα</strong>, an identity <em>instilled by the cult</em> rather than grown by the subject. The cult installs it where the old identity stood."
            },
            {
                shown: [0, 1, 5, 2, 6],
                title: "The world pushes back",
                note: "Social information denies the characteristic: <strong>¬Gα</strong>. Someone or something refuses to treat the subject as G, threatening the installed identity."
            },
            {
                shown: [0, 1, 5, 2, 6, 3, 7],
                title: "Dissonance, unresolved",
                note: "Unresolved, the clash becomes <strong>cognitive dissonance</strong> — the same physiological discomfort, now organised around a manufactured rather than native self-concept."
            },
            {
                shown: [0, 1, 5, 2, 6, 3, 7, 4, 8],
                title: "G-ish behaviour fires",
                note: "Dissonance drives <strong>self-affirmation</strong>: the subject performs G-ish behaviours and reaffirms Gα. Evidence for G is sought and, where it is lacking, <em>manufactured</em>."
            },
            {
                shown: [0, 1, 5, 2, 6, 3, 7, 4, 8, 9, 10],
                title: "The cult identity is reinforced",
                note: "The affirming action reclaims G in good conscience and is stored as an <strong>episodic memory of G-ish action</strong> — so each cycle further entrenches the cult-instilled identity in place of the old one."
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
        body: ""
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
            'MAJ[/"Major Move (common mind):  ∀φ(Fφ → Gφ)"/]',
            'MIN(["Minor Move (2nd-party assertion):  α  •  Fα"])',
            'FP["First-person authoritative<br/>assertion of identity:  ¬Gα"]',
            'REJ[/"¬∀φ(Fφ → Gφ)"/]',
            'MAJ -->|"the norm for Fs to G"| MIN',
            'MIN --> FP',
            'FP -->|"rejection of the norm"| REJ'
        ],
        bookText: "A stereotype threat in the second person cannot be countered simply by a preemption of the entire syllogism. This is because the Minor move is performed by a second party, who asserts both the norm and the application of the norm to the agent. The agent must counter the move by a first-person authoritative assertion of their identity — denying the syllogism's usual upshot and asserting its negation. This allows the agent to reject the norm as a generalization.",
        walkthrough: [
            {
                shown: [0],
                title: "The norm from the common mind",
                note: "As in the fundamental syllogism, we begin with a <strong>Major Move</strong>: the shared norm <strong>∀φ(Fφ → Gφ)</strong>, &lsquo;Fs are to G.&rsquo; But here it comes from the <em>common mind</em> — it is in the air, not asserted by the agent."
            },
            {
                shown: [0, 1, 4],
                title: "A second party makes the minor move",
                note: "The crucial twist: the <strong>Minor Move</strong> — α is F — is asserted by a <em>second party</em>, not the agent. Someone else is running the syllogism <em>on</em> the agent, applying the norm to them."
            },
            {
                shown: [0, 1, 4, 2, 5],
                title: "The first-person counter",
                note: "The agent cannot simply decline to conclude. They must intervene with a <strong>first-person authoritative assertion of identity</strong>: <strong>¬Gα</strong> — explicitly denying the syllogism's expected upshot about themselves."
            },
            {
                shown: [0, 1, 4, 2, 5, 3, 6],
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
        body: ""
    },

];

/* Chapter metadata */
const chapters = {
    1: { label: "Chapter I",   title: "The Architecture of Reason" },
    2: { label: "Chapter II",  title: "Identity and Dissonance" },
4: { label: "Chapter IV",  title: "The Sociological Turn" },
    6: { label: "Chapter VI",  title: "Quorum and Stereotype" }
};

/* Merge any user-added protocols from localStorage */
(function mergeLocalProtocols() {
    try {
        const stored = JSON.parse(localStorage.getItem("ritw_protocols") || "[]");
        stored.forEach(p => {
            if (!protocols.find(existing => existing.id === p.id)) {
                protocols.push(p);
            }
        });
    } catch (_) {}
})();
