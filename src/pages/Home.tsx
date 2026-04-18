import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const inMotion = [
  {
    label: 'Day job',
    text: 'Product management in billing, subscriptions, and quote-to-cash.',
  },
  {
    label: 'Building',
    text: 'AI workflows, a PM sparring arena, and a living directory that keeps evolving.',
  },
  {
    label: 'Practice',
    text: 'Spirituality, clean eating, family life, and staying grounded while shipping.',
  },
]

const pathways = [
  {
    title: 'Build',
    description:
      'The projects, experiments, and practical AI tools I have actually shipped.',
    to: '/build',
  },
  {
    title: 'Stack',
    description:
      'The operating system behind how I think, write, review, and build with AI.',
    to: '/stack',
  },
  {
    title: 'Living',
    description:
      'A curated guide to the brands and habits helping me build a cleaner life.',
    to: '/living',
  },
]

const proofItems = [
  {
    label: 'Works on',
    text: 'Billing, CPQ, and the infrastructure that makes subscription businesses run.',
  },
  {
    label: 'Builds with',
    text: 'Claude Code, MCP-connected workflows, and a habit of learning by shipping.',
  },
  {
    label: 'Cares about',
    text: 'Clear decisions, useful tools, family, spirituality, and intentional living.',
  },
]

export default function Home() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="shell shell--wide page">
      <section className="home-hero">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          <p className="page-label hero-enter">Debjeet Swain</p>

          <h1 className="page-title hero-enter">
            Product manager.
            <br />
            <span style={{ color: 'var(--text-tertiary)' }}>Builder in progress.</span>
          </h1>

          <p className="page-standfirst hero-enter-delay">
            I work on messy systems, make decisions quickly, and keep learning by building
            real things in public.
          </p>

          <p className="page-support hero-enter-delay">
            By day: billing, subscriptions, and quote-to-cash. Around that: AI workflows,
            PM skill-building, and a slower pursuit of cleaner living and clearer thinking.
          </p>

          <div className="page-cta-row hero-enter-delay-2">
            <Link to="/build" className="btn-primary">
              See what I&apos;ve built
            </Link>
            <Link to="/stack" className="btn-secondary">
              See how I work
            </Link>
          </div>
        </div>

        <aside className="surface-panel surface-panel--muted home-hero__aside hero-enter-delay-2">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p className="section-kicker" style={{ color: 'var(--accent)' }}>
                In motion
              </p>
              <p className="page-copy" style={{ color: 'var(--text)' }}>
                The site is a map of what I&apos;m doing, not a frozen bio.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {inMotion.map(({ label, text }) => (
                <div
                  key={label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '84px 1fr',
                    gap: '14px',
                    alignItems: 'start',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(91, 105, 115, 0.12)',
                  }}
                >
                  <span className="section-kicker" style={{ color: 'var(--accent)' }}>
                    {label}
                  </span>
                  <span className="page-copy" style={{ fontSize: '15px' }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="reveal" style={{ marginBottom: '58px' }}>
        <div className="proof-strip">
          {proofItems.map(({ label, text }) => (
            <div key={label} className="proof-item">
              <span className="proof-item__label">{label}</span>
              <p className="proof-item__text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-heading reveal">
          <span className="section-kicker">Start here</span>
          <h2 className="section-title">The site breaks into three useful paths.</h2>
          <p className="section-summary">
            One shows what I&apos;ve made. One shows the system behind the work. One shows
            the lifestyle shift that is quietly shaping the rest of it.
          </p>
        </div>

        <div className="home-path-grid reveal-stagger">
          {pathways.map(({ title, description, to }) => (
            <Link
              key={title}
              to={to}
              className="editorial-card reveal home-path-card"
              style={{ minHeight: '100%' }}
            >
              <span className="section-kicker" style={{ color: 'var(--accent)' }}>
                {title}
              </span>
              <h3 style={{ fontSize: '26px' }}>{title}</h3>
              <p className="page-copy" style={{ flex: 1 }}>
                {description}
              </p>
              <span className="btn-tertiary" style={{ width: 'fit-content' }}>
                Explore {title}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
