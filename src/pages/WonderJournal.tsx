import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const REPO_URL = "https://github.com/dswain8/wonder-journal";
const REPO_DOCS = `${REPO_URL}/tree/main/docs`;
const RAW_SETUP_URL = `${REPO_URL}/blob/main/docs/personal-laptop-setup.md`;

const productBeats = [
  {
    title: "Answer first",
    label: "Trust",
    body: "Every response starts with the simple factual answer before the story or visual layer.",
  },
  {
    title: "Make it child-friendly",
    label: "Delight",
    body: "The answer becomes a picture clue, slow read-aloud narration, and an optional story answer.",
  },
  {
    title: "Keep it local",
    label: "Privacy",
    body: "The prototype runs with Ollama and SQLite locally, so the family journal stays on the laptop.",
  },
];

const experienceShots = [
  {
    title: "Home screen",
    body: "A playful child-facing place to ask a question.",
    image: "/projects/wonder-journal-gallery/02-home.webp",
  },
  {
    title: "Thinking state",
    body: "A gentle wait state while the local model works.",
    image: "/projects/wonder-journal-gallery/03-thinking.webp",
  },
  {
    title: "Answer first",
    body: "The core fact, visual clue, and narration controls.",
    image: "/projects/wonder-journal-gallery/04-answer.webp",
  },
  {
    title: "Story answer",
    body: "A richer explanation when the family wants more.",
    image: "/projects/wonder-journal-gallery/05-story-answer.webp",
  },
];

const featuredLinks = [
  {
    title: "GitHub",
    body: "Source code, README, and local-first architecture.",
    href: REPO_URL,
  },
  {
    title: "Setup guide",
    body: "Run the app locally with dummy mode first, then Ollama.",
    href: RAW_SETUP_URL,
  },
  {
    title: "Build docs",
    body: "Product spec, benchmarks, scene plan, QA notes, and LLM contract.",
    href: REPO_DOCS,
  },
];

export default function WonderJournal() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro page-intro--split wonder-hero reveal">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p className="page-label">Project · Wonder Journal</p>
          <h1 className="page-title page-title--compact">
            A local-first AI curiosity journal for kids
          </h1>
          <p className="page-standfirst">
            Wonder Journal turns a child’s question into a clear answer, a
            playful visual clue, a slow read-aloud narration, and a saved family
            journal entry.
          </p>
          <div className="page-cta-row">
            <a href="#current-experience" className="btn-primary">
              See the experience
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              View GitHub
            </a>
            <a href={RAW_SETUP_URL} target="_blank" rel="noreferrer" className="btn-secondary">
              Local setup guide
            </a>
            <a href={REPO_DOCS} target="_blank" rel="noreferrer" className="btn-secondary">
              All docs
            </a>
          </div>
        </div>

        <figure className="project-hero-screenshot">
          <img
            src="/projects/wonder-journal-desktop-experience-linkedin.jpg"
            alt="Wonder Journal desktop answer screen for the question why does the moon follow our car"
          />
        </figure>
      </header>

      <section id="current-experience" className="section-stack" style={{ marginBottom: "70px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">Current experience</span>
          <h2 className="section-title">
            The working loop in four screens.
          </h2>
          <p className="section-summary">
            A child asks, the app thinks, the answer appears first, and the
            story layer is available when the family wants more.
          </p>
        </div>

        <div className="experience-strip reveal" aria-label="Wonder Journal experience screenshots">
          {experienceShots.map((shot, index) => (
            <article key={shot.title} className="experience-slide">
              <div className="experience-slide__meta">
                <span className="workflow-step__index">{index + 1}</span>
                <div>
                  <h3>{shot.title}</h3>
                  <p>{shot.body}</p>
                </div>
              </div>
              <a
                href={shot.image}
                target="_blank"
                rel="noreferrer"
                className="experience-shot"
                aria-label={`Open full-size screenshot: ${shot.title}`}
              >
                <img src={shot.image} alt={`${shot.title} screenshot`} loading="lazy" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-stack" style={{ marginBottom: "70px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">Why I built it</span>
          <h2 className="section-title">
            Kids do not need another chatbot. They need curiosity answered well.
          </h2>
          <p className="section-summary">
            The product bet is simple: when a child asks “why does the moon
            follow our car?”, the answer should be truthful, warm, visual, and
            easy to hear. Not a long generic LLM reply. Not a fake magical
            story. A small moment of understanding that a parent can trust and a
            child wants to revisit.
          </p>
        </div>

        <div className="proof-strip reveal-stagger">
          {productBeats.map((beat) => (
            <div key={beat.title} className="proof-item reveal">
              <span className="proof-item__label">{beat.label}</span>
              <h3 className="wonder-step-title">{beat.title}</h3>
              <p className="proof-item__text">{beat.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-stack" style={{ marginBottom: "70px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">Explore</span>
          <h2 className="section-title">
            Code, setup, and build notes.
          </h2>
          <p className="section-summary">
            The full repo is public, including the local setup guide and the
            product/LLM docs used while iterating.
          </p>
        </div>

        <div className="artifact-grid artifact-grid--compact reveal-stagger">
          {featuredLinks.map((artifact) => (
            <a
              key={artifact.title}
              href={artifact.href}
              target="_blank"
              rel="noreferrer"
              className="editorial-card artifact-card reveal"
            >
              <h3 className="artifact-card__title">{artifact.title}</h3>
              <p className="artifact-card__body">{artifact.body}</p>
              <span className="btn-tertiary">Open</span>
            </a>
          ))}
        </div>
      </section>

      <div className="reveal">
        <Link to="/build" className="btn-secondary">
          Back to Build
        </Link>
      </div>
    </div>
  );
}
