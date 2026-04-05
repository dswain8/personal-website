import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
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
      <header className="reveal" style={{ marginBottom: '56px' }}>
        <Label>About</Label>
        <h1
          style={{
            fontSize: 'clamp(28px, 4.5vw, 40px)',
            letterSpacing: '-0.02em',
          }}
        >
          The fuller story
        </h1>
      </header>

      <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <Prose className="reveal">
          <p>
            I'm a product manager based in India. I work on billing and
            CPQ; the plumbing that makes subscription businesses run. Invoices,
            payments, pricing, quotes, collections. Not glamorous work, but it
            matters, and I've spent years getting good at it.
          </p>
        </Prose>

        <Prose className="reveal">
          <p>
            My edge isn't a perfect product sense. It's speed. I take calls, move
            fast, make decisions with imperfect information, and ship. A good enough
            decision made quickly is almost always better than the perfect one made
            too late.
          </p>
          <p>
            I work out of India, and that shapes how I approach things. There's a
            different kind of grit here; a comfort with ambiguity, a bias to figure
            things out. I carry that.
          </p>
        </Prose>

        <Prose className="reveal">
          <p>
            I'm also learning to build. Not as a pivot, not because PMs should write
            code. I build because making something forces clarity in a way that writing
            a spec never quite does. So far: a trust website, an AI worksheet generator
            for kids, this site, and a set of AI workflows that genuinely run parts of
            my work day.
          </p>
        </Prose>

        <hr className="divider reveal" />

        <Prose className="reveal">
          <p>
            Outside of work, I'm a family man. My daughter is four. We have a golden
            retriever. Most of my best hours are spent with them.
          </p>
        </Prose>

        <Prose className="reveal">
          <p>
            I'm deeply into spirituality; not in a performative way, but as a serious
            practice. Finding mental peace, staying grounded, understanding what
            actually matters. It's ongoing work. Probably lifelong.
          </p>
        </Prose>

        <Prose className="reveal">
          <p>
            I'm passionate about India in a way that's hard to summarize. The country,
            the culture, the potential of it. I feel it when India wins a cricket match
            and when I read about something built here that shouldn't have been
            possible.
          </p>
        </Prose>

        <Prose className="reveal">
          <p>
            Sports is where my energy goes when the mind needs to stop thinking.
            Cricket mostly. But anything competitive will do.
          </p>
        </Prose>

        <Prose className="reveal">
          <p>
            I'm slowly building toward a cleaner life; what I eat, drink, wear, and
            put on my body. Not as an aesthetic or identity. As a real, deliberate
            practice. The{' '}
            <a
              href="/living"
              style={{
                color: 'var(--accent)',
                borderBottom: '1px solid var(--accent-medium)',
                transition: 'border-color 0.15s',
              }}
            >
              living directory
            </a>{' '}
            is part of that.
          </p>
        </Prose>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </p>
  )
}

function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        fontSize: '16px',
        color: 'var(--text-secondary)',
        lineHeight: 1.8,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {children}
    </div>
  )
}
