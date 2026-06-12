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
        body: ""
    },
    {
        id: "1.5",
        title: "Conflict resolution — Plan A",
        chapter: 1,
        page: 67,
        image: "assets/protocols/Figure_1.5_Conflict_resolution_Plan_A.png",
        description: "Conflict resolution schema, part I: Plan A.",
        featured: false,
        body: ""
    },
    {
        id: "1.6",
        title: "Conflict resolution — Plan B",
        chapter: 1,
        page: 68,
        image: "assets/protocols/Figure_1.6_Conflict_resolution_Plan_B.png",
        description: "Conflict resolution schema, part II: Plan B.",
        featured: false,
        body: ""
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
        body: ""
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
        body: ""
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
        body: ""
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
