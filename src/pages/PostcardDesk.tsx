import { useScrollReveal } from "../hooks/useScrollReveal";

const DEMO_URL = "https://postcard-desk.vercel.app";
const REPO_URL = "https://github.com/dswain8/postcard-desk";

const layers = [
  {
    label: "Surface",
    title: "A desk, not an app",
    body: "Ten postcards taped to a warm-wood surface — Slack, GitHub, Jira, Calendar, Drive, Confluence, plus a daily intention, a to-do list, an affirmation, and a focus timer. OKLCH color, hand-drawn keyframe animations, an hourglass that actually flows. The visual brief was 'something I'd want on my actual desk', not 'productivity SaaS'.",
  },
  {
    label: "Snapshot",
    title: "JSON files on disk",
    body: "There's no database. Each postcard reads from one JSON file in data/. Tasks read live from ~/TASKS.md so I can edit them in any markdown editor. Backup is cp -r. First-boot demo data lives in data/seed/ and ships with the repo so a fresh clone works immediately.",
  },
  {
    label: "Refresh",
    title: "Claude Code is the backend",
    body: "A cron job runs every minute during work hours and asks a headless Claude Code agent to refresh the desk. The agent calls my MCPs in parallel — Slack, GitHub, Atlassian, Google Calendar, Google Drive — writes the JSON files, exits. The React app polls the files. No webhooks, no OAuth flows, no drift. When something breaks, I fix the prompt instead of someone else's integration.",
  },
  {
    label: "Trust",
    title: "Honest about staleness",
    body: 'The footer literally says "Synced 10:06 PM". You always know how fresh the snapshot is. Every dashboard I\'ve used pretends to be live and lies; this one tells the truth. When a card looks wrong, I check the timestamp first and the prompt second.',
  },
];

const postcards = [
  {
    title: "Intention",
    purpose:
      "One line you write each morning. Anchors the day before Slack pulls you in.",
    source: "data/intention.json",
  },
  {
    title: "To-Do",
    purpose:
      "Editable task list with priority + due bands (today / week / waiting). Reads and writes ~/TASKS.md so any editor works.",
    source: "~/TASKS.md",
  },
  {
    title: "Slack",
    purpose: "Top mentions and DMs from the last 18 hours, urgency-flagged.",
    source: "data/slack.json (Slack MCP)",
  },
  {
    title: "GitHub PRs",
    purpose:
      "Open PRs you authored, age-stamped, with stale flagging at >14 days.",
    source: "data/prs.json (GitHub MCP)",
  },
  {
    title: "Jira",
    purpose:
      "Your open tickets grouped by status (To Do / In Progress / Review / Blocked).",
    source: "data/jira.json (Atlassian MCP)",
  },
  {
    title: "Calendar",
    purpose:
      "Today's events with time, location, and meeting kind (focus / recurring / meeting).",
    source: "data/calendar.json (Google Calendar MCP)",
  },
  {
    title: "Drive",
    purpose:
      "Recently-modified Google Docs, Sheets, and Slides — yours and ones shared with you.",
    source: "data/gdocs.json (Google Drive MCP)",
  },
  {
    title: "Confluence",
    purpose: "Pages you've recently touched or been mentioned in.",
    source: "data/confluence.json (Atlassian MCP)",
  },
  {
    title: "Affirmation",
    purpose:
      "Rotating principles. Mine pull from my PM wiki — yours can pull from anywhere.",
    source: "static (in-app)",
  },
  {
    title: "Focus Timer",
    purpose:
      "45-minute deep-work timer with an animated hourglass. Hand-drawn. Useless. Essential.",
    source: "static (in-app)",
  },
];

const nextMoves = [
  {
    label: "Slack",
    actions: "draft reply · summarize thread · suggest emoji react",
  },
  {
    label: "GitHub PRs",
    actions: "review code · draft summary comment · check CI status",
  },
  {
    label: "Jira",
    actions: "propose next step · rewrite description · suggest assignee",
  },
  {
    label: "Calendar",
    actions: "draft pre-read · pull related Slack context · summarize agenda",
  },
  {
    label: "Drive",
    actions: "summarize for Slack reply · extract action items",
  },
];

const responsiveCSS = `
  .postcard-row {
    display: grid;
    grid-template-columns: 160px 1fr 240px;
    gap: 16px;
    align-items: center;
  }
  @media (max-width: 720px) {
    .postcard-row {
      grid-template-columns: 1fr;
      gap: 6px;
      align-items: start;
    }
    .postcard-row__source { font-size: 12px !important; }
  }
`;

export default function PostcardDesk() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{
        maxWidth: "var(--max-w)",
        margin: "0 auto",
        padding: "64px var(--page-px) 120px",
      }}
    >
      <style>{responsiveCSS}</style>

      {/* Header */}
      <header className="reveal" style={{ marginBottom: "48px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginBottom: "16px",
          }}
        >
          Project · The Postcard Desk
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 4.5vw, 40px)",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          A personal dashboard where Claude Code is the backend
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "720px",
          }}
        >
          Every AI dashboard tries to be live and ends up stale. This one is
          honest about it. A cron job tells a headless Claude Code agent to
          refresh the desk every minute during work hours — Slack, GitHub, Jira,
          Calendar, Drive, Confluence — through my MCPs. The React app just
          reads JSON files from disk. No webhooks, no OAuth, no database.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "28px",
          }}
        >
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            style={ctaPrimary}
          >
            → Try the live demo
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            style={ctaSecondary}
          >
            View on GitHub
          </a>
        </div>
      </header>

      {/* Hero GIF */}
      <section
        className="reveal"
        style={{
          marginBottom: "64px",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "var(--bg-subtle, transparent)",
        }}
      >
        <img
          src="/postcard-desk/demo.png"
          alt="The Postcard Desk — Alex's dashboard with Slack, GitHub, Jira, Calendar, Drive, Confluence postcards plus intention, to-do, affirmation, and focus timer"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
          loading="lazy"
        />
      </section>

      {/* The four layers */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel className="reveal">The four layers</SectionLabel>
        <p
          className="reveal"
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "24px",
            maxWidth: "720px",
          }}
        >
          The whole architecture is four moves. None of them are clever
          individually. The combination is what makes it shippable in a weekend
          and stable for a year.
        </p>
        <div
          className="reveal-stagger"
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {layers.map((l) => (
            <div
              key={l.label}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                {l.label}
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                }}
              >
                {l.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {l.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The ten postcards */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel className="reveal">The ten postcards</SectionLabel>
        <p
          className="reveal"
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "24px",
            maxWidth: "720px",
          }}
        >
          Each card is a dumb React component over a JSON array. Swap a source,
          add your own card, kill one you don&apos;t use — it&apos;s &lt;100
          lines per postcard.
        </p>
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {postcards.map((p, i) => (
            <div
              key={p.title}
              className="postcard-row"
              style={{
                padding: "16px 20px",
                borderBottom:
                  i < postcards.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {p.title}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {p.purpose}
              </span>
              <span
                className="postcard-row__source"
                style={{
                  fontSize: "13px",
                  color: "var(--text-tertiary, var(--text-secondary))",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                {p.source}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why it exists */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel className="reveal">Why it exists</SectionLabel>
        <div
          className="reveal"
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p>
            I tried every AI dashboard on the market. They all rot. Either the
            integration ages out, or a webhook silently breaks, or the product
            quietly stops shipping the connector you depend on. By month three
            you&apos;re looking at stale data and pretending it&apos;s fine.
          </p>
          <p>
            The realization: I already have an agent that can talk to all my
            tools. Claude Code with MCPs reaches Slack, GitHub, Atlassian,
            Google — same as any &ldquo;dashboard product&rdquo;, but I own the
            prompt. So why am I paying someone else to maintain the pipe?
          </p>
          <p>
            The Postcard Desk is the simplest thing that worked. The agent
            writes JSON. The app reads JSON. A cron job pokes the agent on a
            schedule. Total backend code: zero lines. Total infra: a Vercel
            deploy and a crontab entry.
          </p>
          <p>
            It&apos;s a working argument that for personal tools, the agent is
            the integration layer. You don&apos;t need a backend if you have a
            brain that can run errands.
          </p>
        </div>
      </section>

      {/* What's next — v2 vision */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel className="reveal">What&apos;s next</SectionLabel>
        <div
          className="reveal"
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <p>
            Right now the desk is a view. Next move: make it a dispatch surface.
            Click a Slack thread and spawn a sub-agent to draft a reply. Click a
            PR and spawn one to review the diff. Each spawn is a fresh headless
            Claude Code session — same model, just pointed at one item with the
            full context fetched live through MCP.
          </p>
          <p>
            Five spawns run in parallel, write drafts to disk, the desk shows a
            badge when each one is ready. You review, send, or discard. The
            agent never dispatches without an explicit human click — that line
            stays bright.
          </p>
          <p>
            The desk stops being a notification feed and becomes a triage
            cockpit. Every item is a workstream the agent can pick up while you
            stay in flow.
          </p>
        </div>
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {nextMoves.map((m, i) => (
            <div
              key={m.label}
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "16px",
                padding: "14px 20px",
                borderBottom:
                  i < nextMoves.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {m.label}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {m.actions}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="reveal"
        style={{
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "32px",
          textAlign: "center",
          background: "var(--bg-subtle, transparent)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 500,
            marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}
        >
          Build your own
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "24px",
            maxWidth: "560px",
            margin: "0 auto 24px",
          }}
        >
          Clone the repo, run <code>npm install</code> and{" "}
          <code>npm run dev</code>. The seed data renders the demo desk on first
          boot. Wire up your own MCPs, customize the postcards, drop in a cron
          entry, and you&apos;re running.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            style={ctaPrimary}
          >
            → Open the live demo
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            style={ctaSecondary}
          >
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={className}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        fontWeight: 600,
        color: "var(--text-secondary)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "24px",
        paddingBottom: "14px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {children}
    </h2>
  );
}

const ctaPrimary: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#fff",
  background: "var(--accent)",
  border: "1px solid var(--accent)",
  borderRadius: "6px",
  padding: "10px 18px",
  textDecoration: "none",
  transition: "opacity 0.15s",
};

const ctaSecondary: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--accent)",
  background: "transparent",
  border: "1px solid var(--accent-medium)",
  borderRadius: "6px",
  padding: "10px 18px",
  textDecoration: "none",
  transition: "background 0.15s, color 0.15s",
};
