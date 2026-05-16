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

const statusConfig = {
  live: { label: "Live", className: "badge badge-live" },
  built: { label: "Built", className: "badge badge-built" },
  progress: { label: "In progress", className: "badge badge-progress" },
};

export default function Projects() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro reveal">
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <p className="page-label">Projects</p>
          <h1 className="page-title page-title--compact">
            The projects carrying the clearest point of view.
          </h1>
        </div>
        <p className="page-support" style={{ maxWidth: "46rem" }}>
          These are the projects that best show the overlap between product
          thinking, practical AI use, and a bias toward shipping instead of
          polishing forever. For the toolkit and workflows behind the work, see{" "}
          <Link to="/build">Build</Link>.
        </p>
      </header>

      <section className="section-stack">
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
