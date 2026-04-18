import { useScrollReveal } from "../hooks/useScrollReveal";

const APP_URL = "https://app-two-omega-syz9qw9qo8.vercel.app";
const REPO_URL = "https://github.com/dswain8/pm-dojo";

const skills = [
  {
    title: "Wiki Builder",
    purpose:
      "Turn raw podcast transcripts, blog posts, and notes into a structured, AI-maintained knowledge base. This is how the wiki behind PM Dojo was built — 258+ sources across Shreyas Doshi, Wes Kao, April Dunford, Lenny's Podcast.",
    download: "/commands/wiki-builder.md",
  },
  {
    title: "Install the Full Dojo",
    purpose:
      "Step-by-step setup guide. Wires the wiki brain, slash commands, and Dojo Moment protocol into your local Claude Code. ~15 minutes end-to-end.",
    download: "/commands/install-dojo.md",
  },
  {
    title: "Dojo Moment Protocol",
    purpose:
      "The ambient layer. Paste into your CLAUDE.md. Your AI silently applies PM principles to every draft, then auto-fires a 3-choice coaching moment when you hedge, bury the lede, or skip the tradeoff.",
    download: "/commands/dojo-moment.md",
  },
  {
    title: "/spar",
    purpose:
      "Enter the sparring arena in any Claude Code session. Inbox Fire, Red Pen, First Principles, The Room — all graded against wiki principles.",
    download: "/commands/spar.md",
  },
  {
    title: "/review",
    purpose:
      "Grade any Slack message, spec, or PRD against the wiki. Front-loads the point, removes weak words, tightens signal-per-word.",
    download: "/commands/draft-review.md",
  },
  {
    title: "/prep",
    purpose:
      "Wiki-informed meeting prep. Audience analysis, decision framing, anti-sell structure, optional role-play. Produces a one-page brief.",
    download: "/commands/meeting-prep.md",
  },
  {
    title: "/debrief",
    purpose:
      "Post-meeting reflection. Captures what was decided, what you committed to, what you missed. Auto-logs decisions and surfaces patterns over time.",
    download: "/commands/meeting-debrief.md",
  },
];

const layers = [
  {
    label: "Brain",
    title: "The wiki",
    body: "Ten topic files synthesized from 258+ PM sources — Shreyas Doshi, Wes Kao, April Dunford, Lenny's Podcast, books, essays. Each file has a one-paragraph summary, core principles, frameworks, examples, and anti-patterns. This is the knowledge base. Every other layer consults it.",
  },
  {
    label: "Muscle memory",
    title: "Slash commands",
    body: "/spar, /review, /prep, /debrief. On-demand reps when you want to deliberately practice — rewrite a bad draft, prep for a leadership review, debrief a meeting. Each command loads the relevant wiki article, runs a scored exercise, and logs the session.",
  },
  {
    label: "Reflex",
    title: "Dojo Moment Protocol",
    body: "The ambient layer — pasted into your CLAUDE.md. Every time you draft a Slack message or spec with AI help, it silently applies wiki principles. When it spots a real teachable pattern in YOUR writing (weak words, buried lede, missing tradeoff), it offers a 3-choice inline mini-game: spar it, show me the fix, or skip.",
  },
  {
    label: "Arcade",
    title: "The web app",
    body: "The gamified practice surface. Timed rounds, scored responses, principle callouts, replayable scenarios. Free with a pattern-based rubric out of the box; paste your own Anthropic key in Settings for AI-level scoring. Optional — the real daily value is the first three layers.",
  },
];

const responsiveCSS = `
  .pm-dojo-skill-row {
    display: grid;
    grid-template-columns: 180px 1fr auto;
    gap: 16px;
    align-items: center;
  }
  @media (max-width: 640px) {
    .pm-dojo-skill-row {
      grid-template-columns: 1fr;
      gap: 8px;
      align-items: start;
    }
    .pm-dojo-skill-title { font-size: 15px !important; }
  }
`;

export default function PmDojo() {
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
      <header className="reveal" style={{ marginBottom: "56px" }}>
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
          Project · PM Dojo
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 4.5vw, 40px)",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          A sparring arena for PM skills
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "720px",
          }}
        >
          Most PM advice lives in podcasts, blog posts, and old Slack threads
          you never re-read. PM Dojo turns that raw material into an active
          system — a wiki brain, a set of Claude Code skills, and an ambient
          protocol that coaches you on your own writing in real time. Plus a web
          app to get scored reps in.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "28px",
          }}
        >
          <a href={APP_URL} target="_blank" rel="noreferrer" style={ctaPrimary}>
            → Try the web app
          </a>
          <a href="/commands/install-dojo.md" download style={ctaSecondary}>
            ↓ Install guide
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            style={ctaSecondary}
          >
            View source
          </a>
        </div>
      </header>

      {/* Concept — the four layers */}
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
          PM Dojo isn't one thing — it's a stack. Each layer is independently
          useful; stacked, they turn any AI conversation into a thought partner
          and sparring coach.
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

      {/* Skills */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel className="reveal">The skills</SectionLabel>
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
          Download these into <code>~/.claude/commands/</code> and they become
          slash commands in any Claude Code session. Start with the install
          guide.
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
          {skills.map((s, i) => (
            <div
              key={s.title}
              className="pm-dojo-skill-row"
              style={{
                padding: "18px 20px",
                borderBottom:
                  i < skills.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                className="pm-dojo-skill-title"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                {s.title}
              </span>
              <span
                className="pm-dojo-skill-purpose"
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {s.purpose}
              </span>
              <a
                href={s.download}
                download
                title="Download for Claude Code"
                style={downloadBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--accent)";
                }}
              >
                ↓ Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
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
            PM knowledge compounds slowly. You read a Wes Kao post, nod, forget
            it, and six months later you bury the lede in an email to your VP.
            The principle was right there; the muscle wasn't.
          </p>
          <p>
            PM Dojo solves that. The wiki keeps the principles. The skills pull
            them into active conversations. The Dojo Moment protocol catches the
            pattern in your own writing before it ships. The web app gives you
            scored reps.
          </p>
          <p>
            It's a second brain that's actually in the room with you when you're
            drafting the thing that matters.
          </p>
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
          Try it
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "24px",
            maxWidth: "520px",
            margin: "0 auto 24px",
          }}
        >
          The web app works immediately with a built-in scoring rubric — no
          account, no key. Or install the full stack locally for ambient
          coaching in every Claude Code session.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <a href={APP_URL} target="_blank" rel="noreferrer" style={ctaPrimary}>
            → Open PM Dojo
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

const downloadBtn: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--accent)",
  border: "1px solid var(--accent-medium)",
  borderRadius: "5px",
  padding: "4px 10px",
  whiteSpace: "nowrap",
  transition: "background 0.15s, color 0.15s",
  textDecoration: "none",
};
