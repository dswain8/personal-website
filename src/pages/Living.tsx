import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = [
  {
    id: 'drinking',
    label: 'Drinks & Hydration',
    description: 'Clean water, copper vessels, functional drinks, and natural sodas.',
    items: [
      { name: 'Isha Life', what: 'Copper bottles and utensils from Sadhguru\'s wellness store. The way water should be stored.', url: 'https://www.ishalife.com' },
      { name: 'Plix', what: 'ACV drink, multivitamin top-ups, and sparkling drinks. Clean ingredients across the range. Part of the daily routine.', url: 'https://www.plix.life' },
      { name: 'Fast&Up', what: 'Daily multivitamin top-up. Clean formulation, good absorption, part of the morning routine.', url: 'https://www.fastandup.in' },
    ],
  },
  {
    id: 'food',
    label: 'Food & Eating',
    description: 'Clean ingredients, mindful sourcing, less packaging.',
    items: [
      { name: 'The Organic World', what: 'Organic grocery delivery across Indian cities. Wide range, clean sourcing.', url: 'https://www.theorganicworld.in' },
      { name: 'Conscious Food', what: 'Organic staples since 1986. Rice, flours, pulses; clean and reliable.', url: 'https://www.consciousfood.com' },
      { name: 'Japsons', what: 'Peanut butter done right. Clean ingredients, no hidden oils or sugars.', url: 'https://www.japsons.com' },
      { name: "Let's Try", what: 'Mindful munching done right. Clean snacks with real ingredients. No junk fillers.', url: 'https://www.letstry.in' },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    description: 'Natural fibres, ethical production, slow fashion.',
    items: [
      { name: 'Velby', what: 'Bamboo cotton clothing. Soft, breathable, and made without synthetic shortcuts.', url: 'https://www.velby.in' },
      { name: 'Andaman', what: 'Clean Indian menswear. Well-made basics that last.', url: 'https://www.andaman.com' },
      { name: 'Utkalika', what: 'Authentic handloom cotton from Odisha. Traditional craft, real fabric, no synthetics.', url: 'https://www.utkalika.in' },
      { name: 'Amrita', what: 'Natural, traditional Indian wear rooted in craft and clean fabric.', url: 'https://www.amrita.in' },
    ],
  },
  {
    id: 'skincare',
    label: 'Skincare',
    description: 'Clean ingredients, no harsh chemicals, minimal packaging.',
    items: [
      { name: 'Cetaphil', what: 'Face wash that does exactly what it says. Gentle, no fragrance, dermatologist trusted.', url: 'https://www.cetaphil.in' },
      { name: 'Forest Essentials', what: 'Luxury Ayurvedic skincare. Traditional formulations, quality ingredients.', url: 'https://www.forestessentialsindia.com' },
      { name: 'Dot & Key', what: 'Clean moisturiser that actually works. Good ingredients, honest brand.', url: 'https://www.dotandkey.com' },
      { name: 'Idam', what: 'Lip balm and deodorant from a brand that takes ingredients seriously. No toxins.', url: 'https://www.idam.in' },
    ],
  },
  {
    id: 'haircare',
    label: 'Haircare',
    description: 'Oil-first, chemical-free, back to basics.',
    items: [
      { name: 'Arata', what: 'Hair wash without sulphates or parabens. Clean scalp, no buildup, everyday use.', url: 'https://www.arata.in' },
      { name: 'Nat Habit', what: 'Neem oil and almond oil — fresh, preservative-free, made close to when it ships.', url: 'https://www.nathabit.in' },
    ],
  },
  {
    id: 'footwear',
    label: 'Footwear',
    description: 'Supportive, natural materials, made to last.',
    items: [
      { name: 'Birkenstock', what: 'Cork and leather footbed, proper arch support. Footwear that\'s built around the foot, not fashion.', url: 'https://www.birkenstock.com/in' },
    ],
  },
  {
    id: 'mindfulness',
    label: 'Mindfulness & Practice',
    description: 'Daily practices for the mind. Not aspirational — actual daily use.',
    items: [
      { name: 'Think Right', what: 'Daily meditation and yoga nuggets in a simple app. Consistent, grounded, no fluff. Part of the morning.', url: 'https://www.thinkright.me' },
      { name: 'Sambhavi Maha Mudra', what: 'Kriya practice from Isha by Sadhguru. Not a product — a practice. The most powerful thing in the routine.', url: 'https://www.ishafoundation.org/inner-engineering' },
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness & Sleep',
    description: 'Tracking recovery, optimising sleep, staying consistent.',
    items: [
      { name: 'Whoop', what: 'Wearable that tracks sleep, recovery, and strain. No screen, no distractions — just data on how your body is doing.', url: 'https://www.whoop.com' },
    ],
  },
  {
    id: 'supplements',
    label: 'Supplements',
    description: 'Simple, clean supplementation. Nothing exotic.',
    items: [
      { name: 'Magnesium Glycinate', what: 'Most bioavailable form of magnesium. Sleep quality, muscle recovery, calm nervous system. Top-selling brand on Amazon India — that\'s the one.', url: 'https://www.amazon.in/s?k=magnesium+glycinate' },
      { name: 'Vitamin Gummies', what: 'Daily multivitamin in gummy form. Consistent intake without pill fatigue.', url: 'https://www.amazon.in/s?k=multivitamin+gummies' },
      { name: 'Hair Health Gummies', what: 'Biotin, vitamins, and minerals for hair strength and growth. Part of the daily stack.', url: 'https://www.amazon.in/s?k=hair+health+gummies' },
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
