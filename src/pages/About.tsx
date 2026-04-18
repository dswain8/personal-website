import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

const facts = [
  { label: 'Based in', value: 'India' },
  { label: 'Works on', value: 'Billing, subscriptions, and CPQ' },
  { label: 'Building now', value: 'AI workflows, PM Dojo, and the living directory' },
  { label: 'Cares about', value: 'Speed, clarity, family, spirituality, and cleaner living' },
]

export default function About() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro reveal" style={{ maxWidth: '48rem' }}>
        <p className="page-label">About</p>
        <h1 className="page-title page-title--compact">The fuller story</h1>
        <p className="page-standfirst">
          I work on infrastructure-heavy product problems, learn by shipping, and keep
          trying to build a life that feels cleaner, calmer, and more deliberate.
        </p>
      </header>

      <div className="article-grid">
        <div className="article-main reveal-stagger">
          <section className="reveal">
            <span className="article-kicker">Work</span>
            <div className="article-prose">
              <p>
                I&apos;m a product manager based in India. Most of my day job lives in
                billing and CPQ; the plumbing that makes subscription businesses run.
                Invoices, payments, pricing, quotes, collections. Not glamorous work,
                but it matters, and I&apos;ve spent years getting good at it.
              </p>
            </div>
          </section>

          <section className="reveal">
            <span className="article-kicker">How I decide</span>
            <div className="article-prose">
              <p>
                My edge isn&apos;t perfect product taste. It&apos;s speed. I take the call,
                move fast, make a decision with imperfect information, and iterate from
                there. A good-enough decision made early is usually worth more than the
                perfect decision made too late.
              </p>
              <p>
                Working out of India shaped that instinct. There&apos;s a comfort here with
                ambiguity, constraints, and figuring things out with what&apos;s available.
                I carry that into how I work.
              </p>
            </div>
          </section>

          <div className="pull-quote reveal">
            Building forces clarity in a way writing a spec never quite does.
          </div>

          <section className="reveal">
            <span className="article-kicker">Why I build</span>
            <div className="article-prose">
              <p>
                I&apos;m learning to build not as a pivot and not because PMs are supposed
                to code now. I build because making something real exposes weak thinking
                quickly. So far that has meant a trust website, an AI worksheet
                generator, this site, a PM sparring arena, and a set of workflows that
                genuinely run parts of my workday.
              </p>
            </div>
          </section>

          <section className="reveal">
            <span className="article-kicker">Outside work</span>
            <div className="article-prose">
              <p>
                Outside of work, I&apos;m a family man first. My daughter is four. We have
                a golden retriever. Most of my best hours are spent with them.
              </p>
              <p>
                I&apos;m deeply into spirituality, not in a performative way, but as an
                actual practice: finding mental peace, staying grounded, and
                understanding what really matters. That work is ongoing. Probably
                lifelong.
              </p>
              <p>
                I&apos;m also slowly building toward a cleaner life through what I eat,
                drink, wear, and put on my body. The{' '}
                <Link to="/living" style={{ color: 'var(--accent)' }}>
                  living directory
                </Link>{' '}
                is part of that process.
              </p>
            </div>
          </section>
        </div>

        <aside className="info-rail reveal">
          {facts.map((fact) => (
            <div key={fact.label} className="fact-item">
              <div className="fact-item__label">{fact.label}</div>
              <div className="fact-item__value">{fact.value}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
