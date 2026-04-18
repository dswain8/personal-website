import { useScrollReveal } from '../hooks/useScrollReveal'

const links = [
  {
    label: 'Email',
    href: 'mailto:debjeet.swain87@gmail.com',
    description:
      'Best for meaningful conversations, ideas worth exploring, or notes that deserve more than a quick reply.',
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/debjeetswain',
    description:
      'Where I keep the professional version current and where most work-related context already exists.',
    external: true,
  },
]

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro page-intro--split reveal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p className="page-label">Contact</p>
          <h1 className="page-title page-title--compact">Say hello</h1>
          <p className="page-support">
            I&apos;m always open to a genuine conversation. Product, AI workflows,
            operating systems for work, cleaner living, or something that simply feels
            worth talking through.
          </p>
        </div>

        <aside className="surface-panel surface-panel--muted">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="section-kicker" style={{ color: 'var(--accent)' }}>
              Best for
            </span>
            <div className="tag-row">
              <span className="tag">Product conversations</span>
              <span className="tag">AI workflows</span>
              <span className="tag">Thoughtful collaborations</span>
            </div>
            <p className="page-copy">
              If it&apos;s thoughtful, specific, or just genuinely interesting, it&apos;s
              probably worth sending.
            </p>
          </div>
        </aside>
      </header>

      <div className="contact-grid reveal-stagger">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {links.map(({ label, href, description, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="contact-card reveal"
            >
              <div>
                <h2 className="contact-card__title">{label}</h2>
                <p className="contact-card__body">{description}</p>
              </div>
              <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>&rarr;</span>
            </a>
          ))}
        </div>

        <div className="surface-panel reveal" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="section-kicker">Small note</span>
            <p className="page-copy" style={{ color: 'var(--text)' }}>
              I prefer fewer, better conversations.
            </p>
            <p className="page-copy">
              If you write with context, I&apos;ll almost always have something useful to
              say back.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
