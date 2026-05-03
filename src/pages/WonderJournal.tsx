import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";

const REPO_URL = "https://github.com/dswain8/wonder-journal";
const REPO_DOCS = `${REPO_URL}/tree/main/docs`;
const RAW_SETUP_URL = `${REPO_URL}/blob/main/docs/personal-laptop-setup.md`;

const artifactLinks = [
  {
    title: "GitHub repo",
    label: "Source",
    body: "The public Next.js app with the local Ollama contract, SQLite journal, starter scenes, and evaluation scripts.",
    href: REPO_URL,
  },
  {
    title: "V1 product spec",
    label: "Journey",
    body: "The end-to-end product requirements: parent and kid personas, onboarding, question flow, answer screen, journal, and roadmap.",
    href: `${REPO_URL}/blob/main/docs/v1-product-spec.md`,
  },
  {
    title: "Benchmark question set",
    label: "Quality bar",
    body: "The first repeatable set of kid questions used to test factuality, child comprehension, visual fit, and narration.",
    href: `${REPO_URL}/blob/main/docs/benchmark-question-set.md`,
  },
  {
    title: "Scene library plan",
    label: "Mockups",
    body: "The reusable visual scene plan: moon in car window, rainy peacock field, rooftop stars, butterfly garden, and more.",
    href: `${REPO_URL}/blob/main/docs/scene-library-plan.md`,
  },
  {
    title: "Starter image library",
    label: "Visuals",
    body: "The current lightweight SVG fallback strategy before we invest in generated or commissioned illustrations.",
    href: `${REPO_URL}/blob/main/docs/starter-image-library.md`,
  },
  {
    title: "Ollama contract",
    label: "LLM",
    body: "The structured output agreement: short answer, story answer, narration, scene tags, safety flags, and validation.",
    href: `${REPO_URL}/blob/main/docs/ollama-v1-contract.md`,
  },
  {
    title: "QA report",
    label: "Testing",
    body: "The current checkpoint on what has been tested, what is still dummy-mode only, and where real-model testing matters.",
    href: `${REPO_URL}/blob/main/docs/qa-test-report.md`,
  },
  {
    title: "Local setup guide",
    label: "Run it",
    body: "The detailed laptop setup path for installing dependencies, pulling Ollama, toggling dummy mode, and running evaluations.",
    href: RAW_SETUP_URL,
  },
];

const workflow = [
  {
    step: "Ask",
    body: "A parent types, or the child speaks, a real question from daily life.",
  },
  {
    step: "Answer first",
    body: "The app shows a short factual answer before any story or flourish.",
  },
  {
    step: "Make it visual",
    body: "Scene tags pick a reusable picture clue or lightweight animation.",
  },
  {
    step: "Read slowly",
    body: "The browser reads the answer aloud at a child-friendly pace.",
  },
  {
    step: "Save the wonder",
    body: "Successful answers are stored locally in SQLite as a private family journal.",
  },
];

const experienceShots = [
  {
    title: "Family setup",
    body: "The parent sets up the child profile and chooses the curiosity guide before the child-facing flow begins.",
    image: "/projects/wonder-journal-gallery/01-onboarding.webp",
  },
  {
    title: "Home screen",
    body: "The child sees a playful, voice-first surface with a few starter questions and a quiet text path for the parent.",
    image: "/projects/wonder-journal-gallery/02-home.webp",
  },
  {
    title: "Thinking state",
    body: "The wait is turned into a gentle visual moment while the local model prepares the answer.",
    image: "/projects/wonder-journal-gallery/03-thinking.webp",
  },
  {
    title: "Answer first",
    body: "The answer screen starts with the truth anchor, then adds a visual clue and slow read-aloud narration.",
    image: "/projects/wonder-journal-gallery/04-answer.webp",
  },
  {
    title: "Story answer",
    body: "The story stays optional: it expands only when the family wants a more playful explanation.",
    image: "/projects/wonder-journal-gallery/05-story-answer.webp",
  },
  {
    title: "Journal",
    body: "Successful answers become keepsakes that parents can revisit later.",
    image: "/projects/wonder-journal-gallery/06-journal.webp",
  },
];

const setupSteps = [
  {
    title: "Clone the project",
    code: "git clone https://github.com/dswain8/wonder-journal.git\ncd wonder-journal",
  },
  {
    title: "Install dependencies",
    code: "npm install",
  },
  {
    title: "Start in dummy mode",
    code: "cp .env.example .env.local\nnpm run dev -- -H 0.0.0.0",
  },
  {
    title: "Add local Ollama",
    code: "ollama pull qwen3:4b\nnpm run check:ollama\nnpm run check:ollama:generate",
  },
  {
    title: "Switch to real model testing",
    code: "USE_DUMMY_STORIES=false\nNEXT_PUBLIC_USE_DUMMY_STORIES=false\nOLLAMA_MODEL=qwen3:4b",
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
              View screenshots
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
            See the working prototype screen by screen.
          </h2>
          <p className="section-summary">
            These are full-length captures from the local app. Scroll sideways
            through the carousel, or open any image to inspect the complete
            flow.
          </p>
        </div>

        <div className="experience-carousel reveal" aria-label="Wonder Journal experience screenshots">
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
              <a href={shot.image} target="_blank" rel="noreferrer" className="btn-tertiary">
                Open full image
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
          <div className="proof-item reveal">
            <span className="proof-item__label">Local first</span>
            <p className="proof-item__text">
              Ollama runs on the laptop, and the journal is saved in local
              SQLite. No cloud AI API is required for the prototype.
            </p>
          </div>
          <div className="proof-item reveal">
            <span className="proof-item__label">Answer first</span>
            <p className="proof-item__text">
              The short answer is the truth anchor. The story and visuals exist
              to make that answer easier to understand.
            </p>
          </div>
          <div className="proof-item reveal">
            <span className="proof-item__label">Built to test</span>
            <p className="proof-item__text">
              Dummy mode keeps UI testing fast, while Ollama mode exercises the
              local model contract on a personal laptop.
            </p>
          </div>
        </div>
      </section>

      <section className="section-stack" style={{ marginBottom: "70px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">Workflow</span>
          <h2 className="section-title">The experience loop we are testing.</h2>
          <p className="section-summary">
            This is the core family journey. Everything else is secondary until
            this loop feels fast, trustworthy, and delightful.
          </p>
        </div>

        <div className="workflow-strip reveal-stagger">
          {workflow.map((item, index) => (
            <div key={item.step} className="workflow-step reveal">
              <span className="workflow-step__index">{index + 1}</span>
              <h3 className="wonder-step-title">{item.step}</h3>
              <p className="wonder-step-body">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-stack" style={{ marginBottom: "70px" }}>
        <div className="section-heading reveal">
          <span className="section-kicker">Mockups and working docs</span>
          <h2 className="section-title">
            The artifacts behind the prototype.
          </h2>
          <p className="section-summary">
            This is the living handoff: source code, UX requirements, visual
            scene plan, benchmark questions, LLM contract, QA notes, and setup
            guide.
          </p>
        </div>

        <div className="artifact-grid reveal-stagger">
          {artifactLinks.map((artifact) => (
            <a
              key={artifact.title}
              href={artifact.href}
              target="_blank"
              rel="noreferrer"
              className="editorial-card artifact-card reveal"
            >
              <span className="section-kicker">{artifact.label}</span>
              <h3 className="artifact-card__title">{artifact.title}</h3>
              <p className="artifact-card__body">{artifact.body}</p>
              <span className="btn-tertiary">Open artifact</span>
            </a>
          ))}
        </div>
      </section>

      <section className="article-grid">
        <article className="article-main">
          <section className="reveal">
            <span className="article-kicker">Local setup narrative</span>
            <h2 className="section-title">
              How to run it on a personal laptop.
            </h2>
            <div className="article-prose">
              <p>
                Start in dummy mode first. That lets you verify onboarding,
                sample questions, answer screens, narration controls, visuals,
                and the journal without waiting for the local model.
              </p>
              <p>
                Once the UI loop feels right, install Ollama, pull `qwen3:4b`,
                flip dummy mode off in `.env.local`, restart the dev server, and
                run the contract checks. That separates product issues from
                model issues, which keeps debugging sane.
              </p>
              <p>
                The first quality bar is not “does the model say something?” It
                is whether benchmark questions produce a short correct answer,
                a useful visual scene, a natural read-aloud answer, and a story
                that helps the child understand the fact.
              </p>
            </div>
          </section>

          <section className="reveal">
            <span className="article-kicker">Commands</span>
            <div className="setup-list">
              {setupSteps.map((step) => (
                <div key={step.title} className="setup-card">
                  <h3>{step.title}</h3>
                  <pre>
                    <code>{step.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="info-rail reveal">
          <div className="fact-item">
            <div className="fact-item__label">Stack</div>
            <div className="fact-item__value">
              Next.js, TypeScript, Tailwind, SQLite, Ollama, Web Speech API
            </div>
          </div>
          <div className="fact-item">
            <div className="fact-item__label">Current model</div>
            <div className="fact-item__value">qwen3:4b through local Ollama</div>
          </div>
          <div className="fact-item">
            <div className="fact-item__label">Current status</div>
            <div className="fact-item__value">
              Prototype validated in dummy mode and initial local Ollama testing
            </div>
          </div>
          <div className="fact-item">
            <div className="fact-item__label">Next question</div>
            <div className="fact-item__value">
              Can the real model answer fast and well enough for a parent-child
              habit?
            </div>
          </div>
          <Link to="/build" className="btn-secondary">
            Back to Build
          </Link>
        </aside>
      </section>
    </div>
  );
}
