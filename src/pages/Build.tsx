import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    title: "The Postcard Desk",
    status: "live" as const,
    summary:
      "Claude Code as the backend for my personal dashboard — no webhooks, no database, no drift.",
    description:
      "Every AI dashboard tries to be live and ends up stale. This one is honest about it. Ten postcards — Slack, GitHub, Jira, Calendar, Drive, Confluence, plus intention, to-do, affirmation, and focus timer — are served from JSON files on disk. A cron job runs every minute during work hours and tells a headless Claude Code agent to refresh them through my MCPs. The React app just reads the files. When a source drops, I fix the prompt instead of spelunking through someone else's webhook code. Open source with a live demo.",
    tags: ["Open source", "Claude Code", "Agentic backend"],
    link: "/postcard-desk",
    cta: "Open project",
    variant: "lead" as const,
  },
  {
    title: "PM Dojo",
    status: "live" as const,
    summary: "A sparring arena for PM judgment, communication, and reps.",
    description:
      "Built from my own PM knowledge base. Scenarios, rewrites, scorecards, and model answers designed to turn fuzzy advice into practical repetition.",
    tags: ["AI product", "PM skills"],
    link: "/pm-dojo",
    cta: "Open project",
    variant: "lead" as const,
  },
  {
    title: "Trust Website",
    status: "live" as const,
    summary:
      "My first real shipped website, built from scratch and taken live.",
    description:
      "A full site for a family trust. It taught me the difference between finishing something and actually shipping it.",
    tags: ["Web", "First ship"],
    link: "https://www.sppmt.org/",
    cta: "Visit site",
    variant: "support" as const,
  },
  {
    title: "Sustainable Living Directory",
    status: "progress" as const,
    summary:
      "A cleaner-living directory built around products I genuinely use or want to try.",
    description:
      "A curated catalog across food, drink, clothing, skincare, and more. Less “content project,” more personal operating system.",
    tags: ["Directory", "Lifestyle"],
    link: "/living",
    cta: "View directory",
    variant: "default" as const,
  },
  {
    title: "AI Worksheet Generator",
    status: "built" as const,
    summary:
      "An AI experience for generating school worksheets across grades and subjects.",
    description:
      "Built end-to-end with Claude Code. Not public yet, but fully shaped enough to count as real work.",
    tags: ["Education", "AI tooling"],
    link: null,
    cta: "Private build",
    variant: "default" as const,
  },
];

const tools = [
  {
    title: "Weekly Update",
    kind: "Writing",
    cadence: "Every week",
    description:
      "Generates my weekly status update from scratch with the right format, level of detail, and tone.",
    download: "/commands/weekly-update.md",
  },
  {
    title: "Slack Digest",
    kind: "Triage",
    cadence: "Every morning",
    description:
      "Scans the work channels that matter, surfaces signal, and strips out the noise before the day starts.",
    download: "/commands/slack-digest.md",
  },
  {
    title: "Slack Reply",
    kind: "Communication",
    cadence: "As needed",
    description:
      "Reads a tagged thread, pulls in missing context, and drafts a reply for approval without ever posting on its own.",
    download: "/commands/slack-reply.md",
  },
  {
    title: "Data Query",
    kind: "Analysis",
    cadence: "As needed",
    description:
      "Turns a plain-English product question into SQL so I can stay in the problem instead of hunting table names.",
    download: "/commands/data-query.md",
  },
  {
    title: "Oncall Triage",
    kind: "Ops",
    cadence: "Daily",
    description:
      "Pulls open tickets from dashboards and formats a briefing with severity, owner, and next step.",
    download: "/commands/oncall-triage.md",
  },
  {
    title: "Spec Writer",
    kind: "Product",
    cadence: "As needed",
    description:
      "Starts from a problem statement and returns a full feature spec with goals, requirements, and open questions.",
    download: "/commands/spec-writer.md",
  },
  {
    title: "DACI Generator",
    kind: "Decision-making",
    cadence: "As needed",
    description:
      "Maps the driver, approver, consulted, and informed so the right people are involved before the wrong debate starts.",
    download: "/commands/daci-generator.md",
  },
  {
    title: "Daily Wrap",
    kind: "Reflection",
    cadence: "End of day",
    description:
      "Summarizes what moved, what got done, and what needs to happen tomorrow while the day is still fresh.",
    download: "/commands/daily-wrap.md",
  },
  {
    title: "Meeting Prep",
    kind: "Preparation",
    cadence: "Before key meetings",
    description:
      "Pulls ticket context, stakeholder profiles, and relevant Slack history into one useful pre-read.",
    download: "/commands/meeting-prep.md",
  },
  {
    title: "Draft Review",
    kind: "Editing",
    cadence: "Before sending",
    description:
      "Reviews Slack messages, specs, and docs against PM communication principles and tightens the point.",
    download: "/commands/draft-review.md",
  },
  {
    title: "Meeting Debrief",
    kind: "Reflection",
    cadence: "After important meetings",
    description:
      "Captures decisions, commitments, and misses immediately so they do not dissolve into memory.",
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
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro reveal">
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <p className="page-label">Build</p>
          <h1 className="page-title page-title--compact">
            The AI toolkit I actually use at work
          </h1>
        </div>
        <p className="page-support" style={{ maxWidth: "46rem" }}>
          Eleven prompts and routines I run every week — weekly updates, Slack
          triage, specs, debriefs. Wired to fire automatically based on what I
          type, no slash commands to remember. All downloadable. Projects below.
        </p>
      </header>

      <section className="section-stack" style={{ marginBottom: "68px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">How it fires automatically</span>
          <h2 className="section-title">
            One hook + one config file. Skills invoke themselves.
          </h2>
          <p className="section-summary">
            The toolkit below is useful on its own. But I don&apos;t type{" "}
            <code>/weekly-update</code> anymore — I just say &ldquo;write my
            weekly update&rdquo; and the right skill fires. Two files make that
            happen.
          </p>
        </div>

        <div className="utility-list reveal-stagger">
          <div className="utility-card reveal utility-row">
            <div className="utility-row__title">
              <span className="utility-row__name">CLAUDE.md</span>
              <div className="tag-row">
                <span className="tag">Config</span>
                <span className="tag tag--soft">Loaded every session</span>
              </div>
            </div>
            <p className="utility-row__body">
              A template system prompt that tells Claude who I am, how I
              communicate, and what to prefer. Customize it once and every
              session starts on the same page.
            </p>
            <div className="utility-row__cta">
              <a
                href="/commands/claude-md-template.md"
                download
                className="btn-secondary"
              >
                Download
              </a>
            </div>
          </div>

          <div className="utility-card reveal utility-row">
            <div className="utility-row__title">
              <span className="utility-row__name">
                skill-keyword-matcher.py
              </span>
              <div className="tag-row">
                <span className="tag">Hook</span>
                <span className="tag tag--soft">UserPromptSubmit</span>
              </div>
            </div>
            <p className="utility-row__body">
              A Python hook that scans every prompt for keywords declared in
              each skill file and nudges Claude to invoke the matching skill
              automatically. No slash commands to remember.
            </p>
            <div className="utility-row__cta">
              <a
                href="/commands/skill-keyword-matcher.py"
                download
                className="btn-secondary"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-stack" style={{ marginBottom: "68px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">Daily AI toolkit</span>
          <h2 className="section-title">
            The workflows I actually use at work.
          </h2>
          <p className="section-summary">
            These are not “AI ideas.” They are working prompts and repeatable
            routines I use to compress prep, writing, triage, and
            decision-making into something faster and cleaner.
          </p>
        </div>

        <div className="utility-list reveal-stagger">
          {tools.map((tool) => (
            <div key={tool.title} className="utility-card reveal utility-row">
              <div className="utility-row__title">
                <span className="utility-row__name">{tool.title}</span>
                <div className="tag-row">
                  <span className="tag">{tool.kind}</span>
                  <span className="tag tag--soft">{tool.cadence}</span>
                </div>
              </div>

              <p className="utility-row__body">{tool.description}</p>

              <div className="utility-row__cta">
                <a href={tool.download} download className="btn-secondary">
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-heading reveal">
          <span className="section-kicker">Featured work</span>
          <h2 className="section-title">
            The projects carrying the clearest point of view.
          </h2>
          <p className="section-summary">
            These are the projects that best show the overlap between product
            thinking, practical AI use, and a bias toward shipping instead of
            polishing forever.
          </p>
        </div>

        <div className="feature-grid reveal-stagger">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const { label, className } = statusConfig[project.status];

  const content = (
    <article
      className={[
        "editorial-card",
        "feature-card",
        "reveal",
        project.variant === "lead" ? "feature-card--lead" : "",
        project.variant === "support" ? "feature-card--support" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="feature-card__header">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div className="tag-row">
            <span className={className}>{label}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="tag tag--soft">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="feature-card__title">{project.title}</h3>
        </div>
      </div>

      <p className="feature-card__dek">{project.summary}</p>
      <p className="feature-card__body">{project.description}</p>

      <div className="feature-card__footer">
        <span
          className="section-kicker"
          style={{ color: "var(--text-tertiary)" }}
        >
          Built to learn by shipping
        </span>
        <span className="btn-tertiary">{project.cta}</span>
      </div>
    </article>
  );

  if (project.link?.startsWith("/")) {
    return <Link to={project.link}>{content}</Link>;
  }

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
