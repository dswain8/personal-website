import { useScrollReveal } from '../hooks/useScrollReveal'

const links = [
  {
    label: 'Email',
    href: 'mailto:debjeet.swain87@gmail.com',
    description: 'Best way to reach me for anything meaningful.',
    external: false,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/debjeetswain',
    description: 'Where I keep my professional history current.',
    external: true,
  },
]

export default function Contact() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '64px var(--page-px) 120px',
      }}
    >
      <header className="reveal" style={{ marginBottom: '48px' }}>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          Contact
        </p>
        <h1
          style={{
            fontSize: 'clamp(28px, 4.5vw, 40px)',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Say hello
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '480px',
          }}
        >
          I'm always open to a genuine conversation. Whether it's about product
          management, building things, clean living, or something else entirely;
          reach out.
        </p>
      </header>

      <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {links.map(({ label, href, description, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className="reveal card-interactive"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              background: 'var(--bg-elevated)',
              gap: '16px',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px',
                  fontWeight: 500,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {description}
              </span>
            </div>
            <span
              style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                flexShrink: 0,
              }}
            >
              &rarr;
            </span>
          </a>
        ))}
      </div>

    </div>
  )
}
