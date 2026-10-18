export type BenchLink = [string, string];

export type BenchStatusKind = "live" | "local" | "offline";

export type BenchProject = {
  key: string;
  name: string;
  status: string;
  statusKind: BenchStatusKind;
  /** One-line hook shown under the title on the build card. */
  pitch: string;
  what: string;
  why: string;
  trick: string;
  stack: string[];
  links: BenchLink[];
};

export type BenchTool = {
  name: string;
  /** Inline SVG paths for the pegboard silhouette (viewBox 0 0 42 48). */
  shape: string;
};

/** Tools that light for the five projects, plus ElevenLabs / Higgsfield on the rack. */
export const TOOLS: BenchTool[] = [
  {
    name: "Claude Code",
    shape: `<rect x="18" y="4" width="6" height="34" rx="3" fill="#9aa5ae"/><circle cx="21" cy="40" r="7" fill="none" stroke="#9aa5ae" stroke-width="4"/>`,
  },
  {
    name: "MCP",
    shape: `<rect x="17" y="2" width="8" height="18" rx="3" fill="#d9a514"/><rect x="19.5" y="20" width="3" height="24" fill="#9aa5ae"/>`,
  },
  {
    name: "cron",
    shape: `<circle cx="21" cy="22" r="14" fill="none" stroke="#7d8790" stroke-width="3"/><path d="M21 12v11l7 4" stroke="#a8391f" stroke-width="3" stroke-linecap="round"/>`,
  },
  {
    name: "React",
    shape: `<path d="M14 4l7 22 7-22" stroke="#9aa5ae" stroke-width="4" fill="none"/><rect x="11" y="26" width="6" height="18" rx="3" fill="#3e5a73"/><rect x="25" y="26" width="6" height="18" rx="3" fill="#3e5a73"/>`,
  },
  {
    name: "Vite",
    shape: `<path d="M21 4l14 38H7L21 4z" fill="#d9a514"/><path d="M21 14l7 28H14l7-28z" fill="#2b2620"/>`,
  },
  {
    name: "Next.js",
    shape: `<circle cx="21" cy="24" r="14" fill="#d9a514"/><circle cx="21" cy="24" r="5" fill="#2b2620"/><rect x="21" y="34" width="14" height="6" fill="#d9a514"/>`,
  },
  {
    name: "SQLite",
    shape: `<rect x="10" y="8" width="22" height="32" rx="3" fill="#7d8790"/><rect x="14" y="14" width="14" height="3" fill="#f1ecdf"/><rect x="14" y="22" width="14" height="3" fill="#f1ecdf"/><rect x="14" y="30" width="10" height="3" fill="#f1ecdf"/>`,
  },
  {
    name: "Ollama",
    shape: `<ellipse cx="21" cy="26" rx="14" ry="12" fill="#5d6b3a"/><circle cx="16" cy="24" r="2.5" fill="#f1ecdf"/><circle cx="26" cy="24" r="2.5" fill="#f1ecdf"/><ellipse cx="21" cy="32" rx="5" ry="3" fill="#2b2620"/>`,
  },
  {
    name: "Web Speech",
    shape: `<path d="M12 18h8l8-8v28l-8-8h-8z" fill="#3e5a73"/><path d="M32 18c3 3 3 9 0 12" stroke="#d9a514" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  {
    name: "ElevenLabs",
    shape: `<rect x="8" y="20" width="4" height="12" rx="1" fill="#9aa5ae"/><rect x="14" y="14" width="4" height="24" rx="1" fill="#d9a514"/><rect x="20" y="10" width="4" height="32" rx="1" fill="#9aa5ae"/><rect x="26" y="16" width="4" height="20" rx="1" fill="#d9a514"/><rect x="32" y="22" width="4" height="10" rx="1" fill="#9aa5ae"/>`,
  },
  {
    name: "Higgsfield",
    shape: `<rect x="8" y="14" width="26" height="20" rx="3" fill="#3e5a73"/><circle cx="21" cy="24" r="6" fill="none" stroke="#f1ecdf" stroke-width="2"/><circle cx="21" cy="24" r="2.5" fill="#d9a514"/><rect x="18" y="34" width="6" height="8" fill="#7d8790"/>`,
  },
  {
    name: "Vercel",
    shape: `<path d="M21 8l16 28H5L21 8z" fill="#2b2620"/><path d="M21 14l10 18H11L21 14z" fill="#f1ecdf"/>`,
  },
  {
    name: "Anthropic API",
    shape: `<rect x="10" y="4" width="22" height="9" rx="2" fill="#7d8790"/><rect x="18.5" y="13" width="5" height="28" rx="2" fill="#a8391f"/><circle cx="21" cy="42" r="4" fill="#d9a514"/>`,
  },
];

export const BENCH: BenchProject[] = [
  {
    key: "desk",
    name: "The Postcard Desk",
    status: "Live",
    statusKind: "live",
    pitch: "Claude Code as the backend — cron pokes an agent, the app just reads JSON.",
    what: "A personal dashboard where Claude Code is the backend. A cron job pokes a headless agent; the agent writes JSON; the app reads it.",
    why: "Every AI dashboard tries to be live and ends up stale. This one is honest about it.",
    trick:
      "For personal tools, the agent is the integration layer. Total backend code: zero lines.",
    stack: ["Claude Code", "MCP", "cron", "React", "Vercel"],
    links: [
      ["Open the demo", "https://postcard-desk.vercel.app"],
      ["Source", "https://github.com/dswain8/postcard-desk"],
      ["Write-up", "/postcard-desk"],
    ],
  },
  {
    key: "journal",
    name: "Wonder Journal",
    status: "Runs on your laptop",
    statusKind: "local",
    pitch: "A curiosity journal for kids — answer first, then picture and slow read-aloud.",
    what: "A curiosity journal I built for my daughter. A picture clue, a slow read-aloud, and a journal that stays on the laptop.",
    why: "Kids do not need another chatbot. They need curiosity answered well.",
    trick:
      "Answer first. Every response starts with the simple factual answer before the story or visual layer.",
    stack: ["Next.js", "SQLite", "Ollama", "Web Speech"],
    links: [
      ["Source", "https://github.com/dswain8/wonder-journal"],
      [
        "Setup guide",
        "https://github.com/dswain8/wonder-journal/blob/main/docs/personal-laptop-setup.md",
      ],
      ["Write-up", "/wonder-journal"],
    ],
  },
  {
    key: "dojo",
    name: "PM Dojo",
    status: "Live",
    statusKind: "live",
    pitch: "Timed PM sparring on a wiki of 258+ sources — rounds, rewrites, score.",
    what: "A sparring arena for PM writing and judgment, built on a wiki of 258+ sources. Timed rounds and scored rewrites.",
    why: "PM knowledge compounds slowly. The principle was right there; the muscle wasn't.",
    trick:
      "It's a stack. Each layer is useful on its own; stacked, they turn any AI conversation into a sparring coach.",
    stack: ["React", "Vite", "Vercel", "Anthropic API"],
    links: [
      ["Spar a round", "https://app-two-omega-syz9qw9qo8.vercel.app"],
      ["Source", "https://github.com/dswain8/pm-dojo"],
      ["Its skills", "/build"],
    ],
  },
  {
    key: "boardroom",
    name: "Lenny Boardroom",
    status: "Offline",
    statusKind: "offline",
    pitch: "Lenny Buildathon: three operator lenses pressure-test a decision into a memo.",
    what: "A PM decision-sparring board built for Lenny Rachitsky’s Buildathon. You enter a decision; three operator lenses from Lenny’s archive pressure-test the tradeoff and return a memo — recommendation, risks, kill criteria, next actions.",
    why: "Fun way to spar PM materials against real operator voices, not generic advice.",
    trick:
      "Keep the first version focused. A few decision patterns beat answering every possible question.",
    stack: ["React", "Vite", "Anthropic API"],
    links: [
      [
        "Buildathon write-up",
        "https://www.linkedin.com/posts/debjeetswain_built-lenny-boardroom-for-lenny-rachitsky-activity-7464389300672045056-53q2",
      ],
    ],
  },
  {
    key: "site",
    name: "Trust website",
    status: "Live",
    statusKind: "live",
    pitch: "First real ship — a family trust site taken live from scratch.",
    what: "My first real shipped site, built from scratch for a family trust.",
    why: "It taught me the difference between finishing something and actually shipping it.",
    trick: "Ship beats polish. A live URL taught more than another draft ever could.",
    stack: [],
    links: [["Visit the site", "https://www.sppmt.org/"]],
  },
];

/** Shared silhouettes — also used by the home dial mini-preview. */
export const GADGET_SVG: Record<string, string> = {
  desk: `<ellipse cx="50" cy="72" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="12" y="48" width="76" height="10" rx="2" fill="#8a5f3c"/>
      <rect x="18" y="58" width="5" height="14" fill="#6e4a2c"/><rect x="77" y="58" width="5" height="14" fill="#6e4a2c"/>
      <rect x="22" y="22" width="24" height="18" rx="1.5" fill="#fbf4e4" transform="rotate(-8 34 31)"/>
      <rect x="40" y="16" width="24" height="20" rx="1.5" fill="#fff7a8" transform="rotate(5 52 26)"/>
      <rect x="58" y="24" width="22" height="16" rx="1.5" fill="#f6d8c8" transform="rotate(-4 69 32)"/>
      <circle cx="28" cy="20" r="2.2" fill="#e2501c"/><circle cx="50" cy="14" r="2.2" fill="#e2501c"/><circle cx="70" cy="22" r="2.2" fill="#e2501c"/>`,
  journal: `<ellipse cx="50" cy="74" rx="26" ry="3.5" fill="rgba(0,0,0,.18)"/>
      <rect x="20" y="12" width="58" height="56" rx="5" fill="#4b2f6b"/>
      <rect x="24" y="12" width="7" height="56" fill="#3a2354"/>
      <circle cx="56" cy="36" r="13" fill="#f6eecf"/><circle cx="61" cy="32" r="10" fill="#4b2f6b"/>
      <circle cx="38" cy="24" r="1.8" fill="#f6eecf"/><circle cx="70" cy="54" r="1.8" fill="#f6eecf"/><circle cx="44" cy="58" r="1.3" fill="#f6eecf"/>`,
  dojo: `<ellipse cx="50" cy="76" rx="22" ry="3.5" fill="rgba(0,0,0,.2)"/>
      <path d="M50 6v10" stroke="#5b4a3a" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="33" y="16" width="34" height="54" rx="15" fill="#b8432b"/>
      <rect x="33" y="30" width="34" height="5" fill="#8f2f1c"/>
      <rect x="33" y="50" width="34" height="5" fill="#8f2f1c"/>
      <circle cx="50" cy="22" r="3" fill="#f0c64a"/>`,
  boardroom: `<ellipse cx="50" cy="74" rx="30" ry="4" fill="rgba(0,0,0,.18)"/>
      <ellipse cx="50" cy="56" rx="32" ry="11" fill="#3a2a20"/>
      <ellipse cx="50" cy="52" rx="28" ry="8" fill="#6b4f38"/>
      <rect x="44" y="26" width="12" height="20" rx="2" fill="#f0c64a"/>
      <circle cx="50" cy="20" r="7" fill="#f6eecf"/>
      <circle cx="24" cy="40" r="5.5" fill="#e8dcc8"/><circle cx="76" cy="40" r="5.5" fill="#e8dcc8"/>
      <path d="M18 28h10M72 28h10M45 8h10" stroke="#e2501c" stroke-width="2.5" stroke-linecap="round"/>`,
  radio: `<ellipse cx="50" cy="74" rx="28" ry="3.5" fill="rgba(0,0,0,.15)"/>
      <rect x="14" y="18" width="72" height="48" rx="8" fill="#e8e4db" stroke="#b3ac9e" stroke-width="2"/>
      <rect x="20" y="24" width="40" height="22" rx="3" fill="#15171c"/>
      <text x="24" y="40" font-family="JetBrains Mono, monospace" font-size="11" fill="#ece7da">90.5</text>
      <circle cx="74" cy="35" r="9" fill="#efebe3" stroke="#8f887b"/><path d="M74 28v6" stroke="#e2501c" stroke-width="2"/>
      <rect x="20" y="52" width="14" height="8" rx="2" fill="#f2efe8" stroke="#8f887b"/><rect x="38" y="52" width="14" height="8" rx="2" fill="#f2efe8" stroke="#8f887b"/><rect x="56" y="52" width="14" height="8" rx="2" fill="#dcd6ca" stroke="#8f887b"/>`,
  site: `<ellipse cx="50" cy="74" rx="28" ry="3.5" fill="rgba(0,0,0,.15)"/>
      <rect x="14" y="14" width="72" height="52" rx="5" fill="#fff" stroke="#3a2a20" stroke-width="2.5"/>
      <rect x="14" y="14" width="72" height="12" fill="#5d6b3a"/>
      <circle cx="22" cy="20" r="2" fill="#f0c64a"/><circle cx="30" cy="20" r="2" fill="#f6eecf"/>
      <rect x="22" y="34" width="32" height="5" rx="1" fill="#3a2a20"/>
      <rect x="22" y="44" width="52" height="3" fill="#c9bfae"/><rect x="22" y="52" width="40" height="3" fill="#c9bfae"/>`,
  sheets: `<ellipse cx="50" cy="74" rx="24" ry="3" fill="rgba(0,0,0,.12)"/>
      <rect x="22" y="20" width="52" height="42" fill="#f4f1e8" stroke="#c9bfae" transform="rotate(-4 48 41)"/>
      <rect x="26" y="16" width="52" height="42" fill="#fbf9f2" stroke="#c9bfae"/>
      <rect x="32" y="26" width="28" height="3" fill="#9aa5ae"/><rect x="32" y="34" width="36" height="3" fill="#c9cfd5"/><rect x="32" y="42" width="30" height="3" fill="#c9cfd5"/>`,
};
