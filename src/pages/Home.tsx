import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const currently = [
  { label: 'Vibing with', text: 'Claude. Building things I never thought I could build.' },
  { label: 'Currently', text: 'EMI tripping. You know how it is.' },
  { label: 'Practice', text: 'Spirituality, clean eating, staying grounded. Ongoing, lifelong work.' },
]

export default function Home() {
  const sectionRef = useScrollReveal<HTMLDivElement>()

  return (
    <div
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '0 var(--page-px)',
      }}
    >
      {/* Hero */}
      <section
        style={{
          paddingTop: 'clamp(56px, 10vh, 100px)',
          paddingBottom: '80px',
        }}
      >
        <h1
          className="hero-enter"
          style={{
            fontSize: 'clamp(32px, 5.5vw, 52px)',
            letterSpacing: '-0.025em',
            marginBottom: '28px',
            lineHeight: 1.15,
          }}
        >
          Hey, I'm Debjeet.
        </h1>

        <div
          className="hero-enter-delay"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            color: 'var(--text-secondary)',
            fontSize: '17px',
            lineHeight: 1.75,
            maxWidth: '520px',
          }}
        >
          <p>
            I build things with Claude. This site, the tools I use every day at work,
            the trust website — all of it. Claude is my co-pilot and honestly it's changed
            how I think about what's possible.
          </p>
          <p>
            Outside of that: my daughter, our golden retriever, cricket, and trying to
            live a little cleaner every day.
          </p>
        </div>

        <div
          className="hero-enter-delay-2"
          style={{
            display: 'flex',
            gap: '14px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/contact" className="btn-primary">
            Say hello
          </Link>
          <Link to="/build" className="btn-secondary">
            See what I've built
            <span style={{ fontSize: '16px' }}>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Divider */}
      <hr className="divider" />

      {/* Currently */}
      <section
        ref={sectionRef}
        style={{ padding: '64px 0 100px' }}
      >
        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Currently
        </h2>

        <div
          className="reveal-stagger"
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {currently.map(({ label, text }) => (
            <div
              key={label}
              className="reveal"
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '16px',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--accent)',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
