import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = [
  {
    id: 'water',
    label: 'Water & Drinking',
    description: 'Clean water, glass bottles, copper vessels, and alternatives to plastic.',
    items: [
      { name: 'Borosil', what: 'Glass bottles and cookware. Indian brand, widely available, no leaching.', url: 'https://www.borosil.com' },
      { name: 'Milton (steel range)', what: 'Stainless steel bottles and tiffins. Durable, plastic-free, everyday carry.', url: 'https://www.milton-india.com' },
      { name: 'Soma', what: 'Glass water filters with a plant-based filter. Filtered water without plastic.', url: 'https://www.drinksoma.com' },
    ],
  },
  {
    id: 'food',
    label: 'Food & Eating',
    description: 'Clean ingredients, mindful sourcing, less packaging.',
    items: [
      { name: 'Two Brothers Organic Farms', what: 'Organic grains, cold-pressed oils, jaggery, spices. Indian, direct-to-consumer.', url: 'https://www.twobrothersindiashop.com' },
      { name: 'The Organic World', what: 'Organic grocery delivery across Indian cities. Wide range, clean sourcing.', url: 'https://www.theorganicworld.in' },
      { name: 'Conscious Food', what: 'Organic staples since 1986. Rice, flours, pulses; clean and reliable.', url: 'https://www.consciousfood.com' },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    description: 'Natural fibres, ethical production, slow fashion.',
    items: [
      { name: 'No Nasties', what: 'GOTS-certified organic cotton. Indian brand making everyday clothing without chemicals.', url: 'https://www.nonasties.in' },
      { name: 'Doodlage', what: 'Upcycled and sustainable fashion. Uses fabric waste to make new clothes.', url: 'https://www.doodlage.in' },
      { name: 'Nicobar', what: 'Natural fabrics, clean design, responsibly made. Indian lifestyle brand worth knowing.', url: 'https://www.nicobar.com' },
    ],
  },
  {
    id: 'skincare',
    label: 'Skincare',
    description: 'Clean ingredients, no harsh chemicals, minimal packaging.',
    items: [
      { name: 'Juicy Chemistry', what: 'Certified organic skincare made in India. Transparent about every ingredient.', url: 'https://www.juicychemistry.com' },
      { name: 'Daughter Earth', what: 'Ayurveda-rooted skincare with clean, plant-based formulations.', url: 'https://www.daughterearth.com' },
      { name: 'Forest Essentials', what: 'Luxury Ayurvedic skincare. Traditional formulations, quality ingredients.', url: 'https://www.forestessentialsindia.com' },
    ],
  },
  {
    id: 'haircare',
    label: 'Haircare',
    description: 'Free from sulphates, parabens, and synthetic fragrance.',
    items: [
      { name: 'Svayam', what: 'Herbal hair oils and powders. No silicones, no synthetics. Old-school done right.', url: 'https://www.svayam.in' },
      { name: 'Nat Habit', what: 'Fresh, preservative-free haircare. Ships within days of being made.', url: 'https://www.nathabit.in' },
      { name: 'Biotique', what: 'Ayurvedic haircare that\'s widely accessible, affordable, and clean.', url: 'https://www.biotique.com' },
    ],
  },
]

export default function Living() {
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
      {/* Header */}
      <header className="reveal" style={{ marginBottom: '56px' }}>
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
          Clean Living
        </p>
        <h1
          style={{
            fontSize: 'clamp(28px, 4.5vw, 40px)',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          A directory for living better
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '8px' }}>
          I'm on a slow, deliberate shift toward cleaner choices; what I drink,
          eat, wear, and put on my body. This is a personal list of brands I trust
          or want to explore.
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          Focused on Indian brands where possible. Updated as I discover more.
        </p>
      </header>

      {/* Category nav */}
      <nav
        className="reveal"
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}
      >
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="tag"
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              borderRadius: '6px',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent-light)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            {cat.label}
          </a>
        ))}
      </nav>

      {/* Categories */}
      <div className="reveal-stagger">
        {categories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            className="reveal"
            style={{ marginBottom: '52px', scrollMarginTop: '80px' }}
          >
            <div style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '6px' }}>{cat.label}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{cat.description}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cat.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-interactive"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '140px 1fr',
                    gap: '16px',
                    padding: '16px 20px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {item.what}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
