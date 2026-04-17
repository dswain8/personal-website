import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    title: "This Site",
    status: "live" as const,
    description:
      "My personal corner of the internet. Built from scratch with Claude Code — Home, About, Build, Stack, Living. Took it live in a few sessions.",
    tags: ["Web", "Personal"],
    link: null,
  },
  {
    title: "Trust Website",
    status: "live" as const,
    description:
      "A full website for a family trust. My first real shipped project; built from scratch with Claude Code and taken live.",
    tags: ["Web", "First ship"],
    link: "https://www.sppmt.org/",
  },
  {
    title: "AI Worksheet Generator",
    status: "built" as const,
    description:
      "A full-featured AI experience for generating school worksheets across subjects and grade levels. Built end-to-end with Claude Code. Not yet live, but it counts.",
    tags: ["AI", "Education"],
    link: null,
  },
  {
    title: "Sustainable Living Directory",
    status: "progress" as const,
    description:
      "A curated directory of brands and products across clean eating, drinking, clothing, skincare, and haircare. Built with Claude Code for people trying to live more intentionally.",
    tags: ["Directory", "Sustainability"],
    link: "/living",
  },
];

const tools = [
  {
    title: "Weekly Update",
    description:
      "Generates my weekly status update from scratch — work items, decisions, blockers, in the right format and tone.",
    download: "/commands/weekly-update.md",
  },
  {
    title: "Slack Digest",
    description:
      "Scans key work channels every morning. Surfaces only what matters. Cuts the noise.",
    download: "/commands/slack-digest.md",
  },
  {
    title: "Slack Reply",
    description:
      "Reads a tagged thread, researches context if needed, and drafts a reply for my approval. Never posts without sign-off.",
    download: "/commands/slack-reply.md",
  },
  {
    title: "Data Query",
    description:
      "Takes a plain-English question about product data and writes the SQL query. No more context-switching to figure out table names.",
    download: "/commands/data-query.md",
  },
  {
    title: "Oncall Triage",
    description:
      "Pulls open tickets from product dashboards and formats a daily briefing. Severity, owner, next step.",
    download: "/commands/oncall-triage.md",
  },
  {
    title: "Spec Writer",
    description:
      "Takes a problem statement and produces a full feature spec — problem, goals, requirements, open questions.",
    download: "/commands/spec-writer.md",
  },
  {
    title: "DACI Generator",
    description:
      "Takes a decision and maps the Driver, Approver, Consulted, and Informed. Forces the right conversation before the wrong one happens.",
    download: "/commands/daci-generator.md",
  },
  {
    title: "Daily Wrap",
    description:
      "End-of-day summary of what got done, what moved, what needs tomorrow. Keeps me honest.",
    download: "/commands/daily-wrap.md",
  },
  {
    title: "Meeting Prep",
    description:
      "Pulls ticket context, stakeholder profiles, and relevant Slack history before any important meeting. Surfaces the right framing before the conversation starts.",
    download: "/commands/meeting-prep.md",
  },
  {
    title: "Draft Review",
    description:
      "Reviews any Slack message, spec, or doc against PM communication principles. Front-loads the point, removes weak words, tightens the signal.",
    download: "/commands/draft-review.md",
  },
  {
    title: "Meeting Debrief",
    description:
      "After any important meeting: what was decided, what I committed to, what I missed. Captures it while fresh and logs decisions automatically.",
    download: "/commands/meeting-debrief.md",
  },
];

const statusConfig = {
  live: { label: "Live", className: "badge badge-live" },
  built: { label: "Built", className: "badge badge-built" },
  progress: { label: "In progress", className: "badge badge-progress" },
};

export default function Build() {
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
          Build
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 4.5vw, 40px)",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          Things I've shipped
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
          }}
        >
          I'm a PM learning to build. These are the projects and tools I've
          made; some live, some in progress, all real.
        </p>
      </header>

      {/* Projects */}
      <section style={{ marginBottom: "64px" }}>
        <SectionLabel className="reveal">Projects</SectionLabel>
        <div
          className="reveal-stagger"
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </section>

      {/* AI tools */}
      <section>
        <SectionLabel className="reveal">AI tools I use daily</SectionLabel>
        <p
          className="reveal"
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            marginBottom: "24px",
            lineHeight: 1.7,
          }}
        >
          A set of Claude workflows that run parts of my work life. Each one
          solves a specific problem and gets used every day.
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
          {tools.map((t, i) => (
            <div
              key={t.title}
              style={{
                padding: "18px 20px",
                display: "grid",
                gridTemplateColumns: "140px 1fr auto",
                gap: "16px",
                borderBottom:
                  i < tools.length - 1 ? "1px solid var(--border)" : "none",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {t.title}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {t.description}
              </span>
              {t.download ? (
                <a
                  href={t.download}
                  download
                  title="Download for Claude Code"
                  style={{
                    fontSize: "12px",
                    color: "var(--accent)",
                    border: "1px solid var(--accent-medium)",
                    borderRadius: "5px",
                    padding: "4px 10px",
                    whiteSpace: "nowrap",
                    transition: "background 0.15s, color 0.15s",
                    textDecoration: "none",
                  }}
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
              ) : (
                <span />
              )}
            </div>
          ))}
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

function ProjectCard({
  title,
  status,
  description,
  tags,
  link,
}: (typeof projects)[0]) {
  const { label, className } = statusConfig[status];

  const card = (
    <div
      className="reveal card-interactive"
      style={{
        padding: "22px 24px",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        cursor: link ? "pointer" : "default",
        background: "var(--bg-elevated)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "18px",
            fontWeight: 500,
          }}
        >
          {title}
        </span>
        <span className={className}>{label}</span>
      </div>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          marginBottom: "14px",
        }}
      >
        {description}
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  if (link?.startsWith("/")) {
    return <a href={link}>{card}</a>;
  }
  if (link) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        {card}
      </a>
    );
  }
  return card;
}
