import skillLines from "./skill-lines.json";

export type ToolkitItem = [string, string, string, string];
export type ToolkitGroup = { g: string; items: ToolkitItem[] };

/** Exact shelf grouping from the Claude prototype app.js */
export const TOOLKIT: ToolkitGroup[] = [
  {
    g: "Setup",
    items: [
      [
        "CLAUDE.md template",
        "Loaded every session",
        "Tells Claude who you are, how you write, what to prefer.",
        "claude-md-template.md",
      ],
      [
        "Skill keyword matcher",
        "Every prompt",
        "A hook that spots keywords and fires the right skill. No slash commands to remember.",
        "skill-keyword-matcher.py",
      ],
    ],
  },
  {
    g: "Review loop",
    items: [
      [
        "Universal rubric",
        "Read first",
        "Seven checks every review starts from.",
        "universal-rubric.md",
      ],
      [
        "Review",
        "Any draft",
        "Scores the seven checks and rewrites the weakest parts.",
        "review.md",
      ],
      [
        "Spec",
        "PRDs",
        "Writes a PRD, scores it, sends it to Codex, iterates.",
        "spec.md",
      ],
      [
        "Launch draft",
        "Announcements",
        "Drafts a launch post and loops with Codex. Stops at five rounds.",
        "launch-draft.md",
      ],
    ],
  },
  {
    g: "Daily rhythm",
    items: [
      [
        "Slack digest",
        "Every morning",
        "Surfaces signal from the channels that matter.",
        "slack-digest.md",
      ],
      [
        "Daily wrap",
        "End of day",
        "What moved, what's done, what's next.",
        "daily-wrap.md",
      ],
      [
        "Weekly update",
        "Every week",
        "Status update in the right format and tone.",
        "weekly-update.md",
      ],
    ],
  },
  {
    g: "Meetings",
    items: [
      [
        "Prep",
        "Before",
        "Ticket context, stakeholder notes and Slack history in one pre-read.",
        "prep.md",
      ],
      [
        "Grill me",
        "Before a hard one",
        "Asks the hardest version of every question, in private.",
        "grill-me.md",
      ],
      [
        "Debrief",
        "After",
        "Decisions, commitments and misses, captured while fresh.",
        "debrief.md",
      ],
    ],
  },
  {
    g: "Voice",
    items: [
      [
        "Slack reply",
        "As needed",
        "Drafts a reply for approval. Never posts on its own.",
        "slack-reply.md",
      ],
      [
        "Slack style",
        "Every Slack draft",
        "Tight, direct, no preamble.",
        "slack-style.md",
      ],
      [
        "Writing style",
        "Every written output",
        "No em dashes, no banned words, no AI bombast.",
        "writing-style.md",
      ],
      [
        "House style",
        "Every UI build",
        "Aesthetic rules so things stop looking like every AI side project.",
        "house-style.md",
      ],
    ],
  },
  {
    g: "Decisions",
    items: [
      [
        "DACI draft",
        "As needed",
        "Who drives, approves, is consulted, is informed.",
        "daci-draft.md",
      ],
      [
        "Autodecision",
        "When the call is yours",
        "Lays out a decision in small, honest steps.",
        "autodecision.md",
      ],
      [
        "Zoom out",
        "When stuck",
        "Pulls you up two altitudes from the detail.",
        "zoom-out.md",
      ],
      [
        "PRD review",
        "Before review",
        "The questions a sharp reviewer would ask.",
        "prd-review.md",
      ],
    ],
  },
  {
    g: "Data",
    items: [
      [
        "Oncall triage",
        "Daily",
        "Open tickets with severity, owner, next step.",
        "oncall-triage.md",
      ],
      [
        "Data query",
        "As needed",
        "Plain-English question to SQL.",
        "data-query.md",
      ],
    ],
  },
  {
    g: "Keeping it honest",
    items: [
      [
        "Find session",
        "When memory fails",
        "Greps every past session, prints the resume command.",
        "find-session.md",
      ],
      [
        "Skill discovery",
        "Fridays",
        "Finds repeat patterns and proposes new skills, with evidence.",
        "skill-discovery.md",
      ],
      [
        "Ingest",
        "Any source",
        "Diffs a video or article against your setup: adopt, skip, research.",
        "ingest.md",
      ],
      [
        "Handoff",
        "Between agents",
        "Compacts a conversation so the next agent picks up cleanly.",
        "handoff.md",
      ],
      [
        "Write a skill",
        "When a pattern repeats",
        "Turns a workflow into a skill file.",
        "write-a-skill.md",
      ],
    ],
  },
  {
    g: "PM Dojo",
    items: [
      [
        "Install the full Dojo",
        "~15 minutes",
        "Wires the wiki, commands and coaching protocol into Claude Code.",
        "install-dojo.md",
      ],
      [
        "Wiki builder",
        "Once",
        "Turns transcripts and posts into a structured knowledge base.",
        "wiki-builder.md",
      ],
      [
        "Dojo Moment protocol",
        "Ambient",
        "Offers a 3-choice coaching moment when you hedge or bury the lede.",
        "dojo-moment.md",
      ],
      ["/spar", "Practice", "Inbox Fire, Red Pen, First Principles, The Room.", "spar.md"],
      [
        "/review",
        "Any draft",
        "Grades a message or spec against the wiki.",
        "draft-review.md",
      ],
      [
        "/prep",
        "Before",
        "Audience, decision framing, optional role-play.",
        "meeting-prep.md",
      ],
      [
        "/debrief",
        "After",
        "What was decided, committed, missed.",
        "meeting-debrief.md",
      ],
    ],
  },
];

export type Skill = { g: string; n: string; w: string; d: string; f: string };

export const SKILLS: Skill[] = TOOLKIT.flatMap(({ g, items }) =>
  items.map(([n, w, d, f]) => ({ g, n, w, d, f })),
);

export const START3 = [
  "claude-md-template.md",
  "skill-keyword-matcher.py",
  "universal-rubric.md",
];

export const GROUP_COLORS = [
  "#7a3b2e",
  "#2f4a5c",
  "#5d6b3a",
  "#8a5a2b",
  "#4b3a5e",
  "#3f5f58",
  "#6e4a2c",
  "#4a5560",
  "#8f3a26",
];

export const SKILL_LINES = skillLines as Record<string, number>;

export const groupColor = (g: string) =>
  GROUP_COLORS[TOOLKIT.findIndex((x) => x.g === g) % GROUP_COLORS.length];

export const spineW = (f: string) =>
  Math.round(20 + 32 * Math.sqrt(Math.min(450, SKILL_LINES[f] || 40) / 450));

export const spineH = (f: string) =>
  150 + ([...f].reduce((a, c) => a + c.charCodeAt(0), 0) % 5) * 9;
