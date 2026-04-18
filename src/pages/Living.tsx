import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = [
  {
    id: 'drinking',
    label: 'Drinks & Hydration',
    description: 'Clean water, copper vessels, functional drinks, and natural sodas.',
    items: [
      {
        name: 'Isha Life',
        stance: 'Trusted',
        what: "Copper bottles and utensils from Sadhguru's wellness store. The way water should be stored.",
        url: 'https://www.ishalife.com',
      },
      {
        name: 'Plix',
        stance: 'Daily',
        what: 'ACV drink, multivitamin top-ups, and sparkling drinks with consistently clean ingredients.',
        url: 'https://www.plix.life',
      },
      {
        name: 'Fast&Up',
        stance: 'Daily',
        what: 'A straightforward multivitamin top-up with a clean formulation and good absorption.',
        url: 'https://www.fastandup.in',
      },
    ],
  },
  {
    id: 'food',
    label: 'Food & Eating',
    description: 'Clean ingredients, mindful sourcing, less packaging.',
    items: [
      {
        name: 'The Organic World',
        stance: 'Trusted',
        what: 'Organic grocery delivery across Indian cities with a wide enough range to be practical.',
        url: 'https://www.theorganicworld.in',
      },
      {
        name: 'Conscious Food',
        stance: 'Trusted',
        what: 'Organic staples since 1986. Rice, flours, and pulses that feel reliable instead of performative.',
        url: 'https://www.consciousfood.com',
      },
      {
        name: 'Japsons',
        stance: 'Daily',
        what: 'Peanut butter done right. Clean ingredients, no hidden oils, no extra nonsense.',
        url: 'https://www.japsons.com',
      },
      {
        name: "Let's Try",
        stance: 'Exploring',
        what: 'Snackable food with real ingredients and no junk filler as the default.',
        url: 'https://www.letstry.in',
      },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    description: 'Natural fibres, ethical production, slow fashion.',
    items: [
      {
        name: 'Velby',
        stance: 'Trusted',
        what: 'Bamboo cotton basics that are breathable, soft, and not reliant on synthetic shortcuts.',
        url: 'https://www.velby.in',
      },
      {
        name: 'Andaman',
        stance: 'Exploring',
        what: 'Clean Indian menswear with well-made essentials that feel built to last.',
        url: 'https://www.andaman.com',
      },
      {
        name: 'Utkalika',
        stance: 'Trusted',
        what: 'Authentic Odisha handloom cotton: real craft, real fabric, and no synthetic disguise.',
        url: 'https://www.utkalika.in',
      },
      {
        name: 'Amrita',
        stance: 'Exploring',
        what: 'Traditional Indian wear rooted in craft and natural fabric choices.',
        url: 'https://www.amrita.in',
      },
    ],
  },
  {
    id: 'skincare',
    label: 'Skincare',
    description: 'Clean ingredients, no harsh chemicals, minimal packaging.',
    items: [
      {
        name: 'Cetaphil',
        stance: 'Daily',
        what: 'Gentle face wash that does exactly what it says without fragrance or irritation.',
        url: 'https://www.cetaphil.in',
      },
      {
        name: 'Forest Essentials',
        stance: 'Trusted',
        what: 'Luxury Ayurvedic skincare with formulations that still feel grounded in ingredients.',
        url: 'https://www.forestessentialsindia.com',
      },
      {
        name: 'Dot & Key',
        stance: 'Daily',
        what: 'A moisturizer line that works well and still feels ingredient-conscious.',
        url: 'https://www.dotandkey.com',
      },
      {
        name: 'Idam',
        stance: 'Trusted',
        what: 'Lip balm and deodorant from a brand that takes ingredient lists seriously.',
        url: 'https://www.idam.in',
      },
    ],
  },
  {
    id: 'haircare',
    label: 'Haircare',
    description: 'Oil-first, chemical-light, back to basics.',
    items: [
      {
        name: 'Arata',
        stance: 'Daily',
        what: 'Hair wash without sulphates or parabens. Clean scalp, no buildup, everyday use.',
        url: 'https://www.arata.in',
      },
      {
        name: 'Nat Habit',
        stance: 'Trusted',
        what: 'Fresh neem oil and almond oil made close to shipping rather than sitting on shelves forever.',
        url: 'https://www.nathabit.in',
      },
    ],
  },
  {
    id: 'footwear',
    label: 'Footwear',
    description: 'Supportive, natural materials, made to last.',
    items: [
      {
        name: 'Birkenstock',
        stance: 'Daily',
        what: 'Cork-and-leather footbeds with actual arch support. Built around the foot, not fashion cycles.',
        url: 'https://www.birkenstock.com/in',
      },
    ],
  },
  {
    id: 'mindfulness',
    label: 'Mindfulness & Practice',
    description: 'Daily practices for the mind that survive real life.',
    items: [
      {
        name: 'Think Right',
        stance: 'Daily',
        what: 'Simple meditation and yoga guidance with a grounded tone and no spiritual theater.',
        url: 'https://www.thinkright.me',
      },
      {
        name: 'Sambhavi Maha Mudra',
        stance: 'Core practice',
        what: 'Not a product but a real daily practice from Isha. Probably the strongest thing in the entire routine.',
        url: 'https://www.ishafoundation.org/inner-engineering',
      },
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness & Sleep',
    description: 'Tracking recovery, improving sleep, and staying consistent.',
    items: [
      {
        name: 'Whoop',
        stance: 'Daily',
        what: 'Sleep, recovery, and strain tracking without turning the body into another noisy screen.',
        url: 'https://www.whoop.com',
      },
    ],
  },
  {
    id: 'supplements',
    label: 'Supplements',
    description: 'Simple supplementation, nothing exotic.',
    items: [
      {
        name: 'Magnesium Glycinate',
        stance: 'Trusted',
        what: 'High-bioavailability magnesium for sleep quality, recovery, and a calmer nervous system.',
        url: 'https://www.amazon.in/s?k=magnesium+glycinate',
      },
      {
        name: 'Vitamin Gummies',
        stance: 'Daily',
        what: 'A practical multivitamin habit without pill fatigue or friction.',
        url: 'https://www.amazon.in/s?k=multivitamin+gummies',
      },
      {
        name: 'Hair Health Gummies',
        stance: 'Exploring',
        what: 'Biotin and micronutrient support for hair strength and growth as part of the daily stack.',
        url: 'https://www.amazon.in/s?k=hair+health+gummies',
      },
    ],
  },
]

export default function Living() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro page-intro--split reveal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p className="page-label">Clean living</p>
          <h1 className="page-title page-title--compact">A directory for living better</h1>
          <p className="page-support">
            This is a personal field guide to cleaner choices: what I drink, eat, wear,
            and put on my body as I try to make the whole system more intentional.
          </p>
        </div>

        <aside className="surface-panel surface-panel--muted">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="section-kicker" style={{ color: 'var(--accent)' }}>
              Curation logic
            </span>
            <p className="page-copy" style={{ color: 'var(--text)' }}>
              This is not exhaustive and it is not affiliate-driven.
            </p>
            <p className="page-copy">
              The list is made of brands I trust, use regularly, or want to explore
              because they seem aligned with cleaner ingredients and better intent.
            </p>
          </div>
        </aside>
      </header>

      <div className="living-sticky-nav reveal">
        <div className="living-chip-grid">
          {categories.map((cat) => (
            <a key={cat.id} href={`#${cat.id}`} className="pill-link">
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      <section className="section-stack" style={{ marginTop: '28px' }}>
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="reveal" style={{ scrollMarginTop: '108px' }}>
            <div className="section-heading">
              <span className="section-kicker">{cat.label}</span>
              <p className="section-summary">{cat.description}</p>
            </div>

            <div className="living-grid">
              {cat.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="utility-card living-card"
                >
                  <div className="living-card__title">
                    <h3 style={{ fontSize: '20px' }}>{item.name}</h3>
                    <span className="tag">{item.stance}</span>
                  </div>
                  <p className="page-copy" style={{ flex: 1, fontSize: '15px' }}>
                    {item.what}
                  </p>
                  <span className="btn-tertiary" style={{ width: 'fit-content' }}>
                    Visit brand
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  )
}
