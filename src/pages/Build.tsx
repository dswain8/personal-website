import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    title: "Wonder Journal",
    status: "built" as const,
    summary:
      "A local-first AI curiosity journal that answers a child’s question with a clear answer, visual clue, and read-aloud story.",
    description:
      "Built with Next.js, SQLite, Web Speech, and Ollama running locally. A parent or child asks a question, the app answers first, shows a playful visual clue, reads it aloud slowly, and saves the moment to a private journal. The thesis is simple: kids do not need another chatbot; they need curiosity answered in a way that feels warm, safe, visual, and memorable.",
    tags: ["Local AI", "Ollama", "Kids UX"],
    link: "/wonder-journal",
    cta: "Open project",
    variant: "lead" as const,
    image: "/projects/wonder-journal-card.png",
  },
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

const loopTools = [
  {
    title: "Review",
    kind: "Editing",
    cadence: "Before sending",
    description:
      "Scores any draft against a universal rubric (front-loaded? specific? recommendation? tradeoffs named?) and rewrites the weakest sections. The same spine reviews a Slack message, a spec, or a launch note.",
    download: "/commands/review.md",
  },
  {
    title: "Spec",
    kind: "Product",
    cadence: "As needed",
    description:
      "Writes a PRD, scores itself against ten spec criteria, hands the draft to Codex for an outside review, scores the feedback back, and iterates until every dimension hits 10/10.",
    download: "/commands/spec.md",
  },
  {
    title: "Launch Draft",
    kind: "Communication",
    cadence: "When shipping",
    description:
      "Drafts a launch announcement, scores it across six dimensions, runs it through Codex, and loops until the score is clean. Caps at five iterations so it never spirals.",
    download: "/commands/launch-draft.md",
  },
  {
    title: "Universal Rubric",
    kind: "Foundation",
    cadence: "Shared by all three",
    description:
      "The seven-criterion spine every review starts from. Lives in one file so all three skills score on the same axes and overlays add only the type-specific extras.",
    download: "/commands/universal-rubric.md",
  },
];

const selfImprovementTools = [
  {
    title: "Find Session",
    kind: "Search",
    cadence: "When memory fails",
    description:
      "Greps every past Claude Code session by keyword and prints the resume command. The native search misses too much, so this one does it properly.",
    download: "/commands/find-session.md",
  },
  {
    title: "Skill Discovery",
    kind: "Meta",
    cadence: "Every Friday",
    description:
      "Scans the week of sessions, commits, and memory edits. Surfaces one to three skill candidates with evidence so the system grows from real signal, not vibes.",
    download: "/commands/skill-discovery.md",
  },
  {
    title: "Ingest",
    kind: "Learning",
    cadence: "On any source",
    description:
      "Takes a YouTube link, article, screenshot, or pasted transcript and diffs it against my current setup. Returns a ranked list of what to adopt, skip, or research further.",
    download: "/commands/ingest.md",
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
    title: "DACI Draft",
    kind: "Decision-making",
    cadence: "As needed",
    description:
      "Maps the driver, approver, consulted, and informed so the right people are involved before the wrong debate starts.",
    download: "/commands/daci-draft.md",
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
    title: "Prep",
    kind: "Preparation",
    cadence: "Before key meetings",
    description:
      "Pulls ticket context, stakeholder profiles, and relevant Slack history into one useful pre-read.",
    download: "/commands/prep.md",
  },
  {
    title: "Debrief",
    kind: "Reflection",
    cadence: "After important meetings",
    description:
      "Captures decisions, commitments, and misses immediately so they do not dissolve into memory.",
    download: "/commands/debrief.md",
  },
  {
    title: "Slack Style",
    kind: "Voice",
    cadence: "Every Slack draft",
    description:
      "Polishes a Slack message to my voice before it goes out. Tight, direct, no preamble, no closer fluff.",
    download: "/commands/slack-style.md",
  },
  {
    title: "House Style",
    kind: "Design",
    cadence: "Every UI build",
    description:
      "The aesthetic discipline for everything I ship. Editorial warm defaults, hard nos for AI-tell fonts, gradients, and chips. So things stop looking like every other AI side project.",
    download: "/commands/house-style.md",
  },
  {
    title: "Handoff",
    kind: "Continuity",
    cadence: "Between agents",
    description:
      "Compacts the current conversation into a handoff doc so the next agent (or future me) picks up without losing what already got decided.",
    download: "/commands/handoff.md",
  },
  {
    title: "Write a Skill",
    kind: "Meta",
    cadence: "When a pattern repeats",
    description:
      "Turns a repeated workflow into a proper skill file, with the keyword header that lets the matcher auto-fire it.",
    download: "/commands/write-a-skill.md",
  },
  {
    title: "PRD Review",
    kind: "Product",
    cadence: "Before review meetings",
    description:
      "Reads a PRD and asks the questions a sharp cross-functional reviewer would: missing tradeoffs, fuzzy success criteria, scope creep.",
    download: "/commands/prd-review.md",
  },
  {
    title: "Grill Me",
    kind: "Pressure-test",
    cadence: "Before a hard meeting",
    description:
      "Plays the role of a skeptical exec or partner. Asks the hardest version of every question so the soft answers fall apart in private, not live.",
    download: "/commands/grill-me.md",
  },
  {
    title: "Zoom Out",
    kind: "Strategy",
    cadence: "When stuck",
    description:
      "Pulls the conversation up two altitudes when I am rabbit-holed in a detail. Forces the question of what we are actually optimizing for.",
    download: "/commands/zoom-out.md",
  },
  {
    title: "Autodecision",
    kind: "Decision-making",
    cadence: "When the call is yours",
    description:
      "Lays out a decision in small, honest steps. Subcommands for /plan, /challenge, /compare, /summarize, /revise, /publish, /review, /export, /quick — each downloadable below the main file.",
    download: "/commands/autodecision.md",
  },
  {
    title: "Writing Style",
    kind: "Voice",
    cadence: "Every written output",
    description:
      "Enforces my prose rules. No em dashes, no banned words, no AI bombast. A final scan before anything goes out.",
    download: "/commands/writing-style.md",
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
          The skills I actually run at work, grouped by what they do. A
          rubric-gated iteration loop for serious writing, a self-improving
          system that finds its own gaps, and the daily toolkit underneath it
          all. Wired to fire automatically from plain language. All
          downloadable. Projects below.
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
          <span className="section-kicker">The 10/10 iteration loop</span>
          <h2 className="section-title">
            How do you get one model to review the work of another model?
          </h2>
          <p className="section-summary">
            Claude grading Claude is grade inflation. Same training, same blind
            spots, same defense of a draft it just wrote. A real review needs a
            different model, from cold, with no context on why you made the
            choices you made. The hard part is the plumbing. Two answers,
            depending on where the work lives.
          </p>
          <p className="section-summary">
            <strong>When the work is in Claude:</strong> Claude calls the Codex
            CLI from inside its own session. It writes, pipes the draft to Codex
            with a rubric, reads the critique, scores, edits, calls Codex again.
            The whole loop runs in one terminal.
          </p>
          <p className="section-summary">
            <strong>When the work is in Codex:</strong> both windows stay open.
            Codex uses computer-use to toggle to the Claude window, pastes its
            draft in, reads the review, brings the feedback back, edits,
            repeats. Two windows iterating with each other while you do
            something else.
          </p>
          <p className="section-summary">
            The rubric is the part you cannot skip. <code>/review</code> holds a
            universal seven-criterion spine that works on any draft.{" "}
            <code>/spec</code> and <code>/launch-draft</code> hydrate the same
            engine and add a tighter sub-scale on top because PRDs and launch
            notes need more nuance than a generic rubric can catch. All three
            call the Codex CLI under the hood and loop until every dimension
            hits 10/10.
          </p>
        </div>

        <div className="utility-list reveal-stagger">
          {loopTools.map((tool) => (
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

      <section className="section-stack" style={{ marginBottom: "68px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">A system that improves itself</span>
          <h2 className="section-title">
            Find what you forgot. Spot what is missing. Pull in what works.
          </h2>
          <p className="section-summary">
            Three skills that keep the toolkit honest. One searches every past
            session because the native search misses too much. One scans last
            week for repeat patterns and proposes new skills with evidence. One
            takes any external source (a YouTube video, an article, a
            screenshot) and diffs it against my current setup so adoption is a
            decision, not an accumulation.
          </p>
        </div>

        <div className="utility-list reveal-stagger">
          {selfImprovementTools.map((tool) => (
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
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="feature-card__image"
          loading="lazy"
        />
      ) : null}

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
