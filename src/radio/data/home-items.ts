export type HomeItem = [string, string, string, string, string, string?];

/** Exact house inventory from prototype app.js */
export const HOME_ITEMS: Record<string, HomeItem[]> = {
  kitchen: [
    [
      "Isha Life",
      "Trusted",
      "https://www.ishalife.com",
      "Copper bottles and utensils from Sadhguru's store. The way water should be stored.",
      "copper",
    ],
    [
      "Plix",
      "Daily",
      "https://www.plix.life",
      "ACV drink and sparkling drinks with consistently clean ingredients.",
      "bottle",
      "#7fb3a6",
    ],
    [
      "Fast&Up",
      "Daily",
      "https://www.fastandup.in",
      "A straightforward multivitamin top-up.",
      "tube",
      "#e7a33e",
    ],
    [
      "The Organic World",
      "Trusted",
      "https://www.theorganicworld.in",
      "Organic grocery delivery with a wide enough range to be practical.",
      "bag",
      "#8aa05a",
    ],
    [
      "Conscious Food",
      "Trusted",
      "https://www.consciousfood.com",
      "Organic staples since 1986. Rice, flours, and pulses that feel reliable instead of performative.",
      "jar",
      "#d8c39a",
    ],
    [
      "Japsons",
      "Daily",
      "https://www.japsons.com",
      "Peanut butter done right. No hidden oils, no extra nonsense.",
      "jar",
      "#b9783d",
    ],
    [
      "Let's Try",
      "Exploring",
      "https://www.letstry.in",
      "Snackable food with real ingredients and no junk filler.",
      "pack",
      "#d65a3a",
    ],
  ],
  bath: [
    [
      "Forest Essentials",
      "Trusted",
      "https://www.forestessentialsindia.com",
      "Ayurvedic skincare that still feels grounded in ingredients.",
      "pot",
      "#c9a24a",
    ],
    [
      "Idam",
      "Trusted",
      "https://www.idam.in",
      "Lip balm and deodorant from a brand that takes ingredient lists seriously.",
      "tube",
      "#9bb7c9",
    ],
    [
      "Cetaphil",
      "Daily",
      "https://www.cetaphil.in",
      "Gentle face wash that does exactly what it says.",
      "pump",
      "#e9eef2",
    ],
    [
      "Dot & Key",
      "Daily",
      "https://www.dotandkey.com",
      "A moisturiser line that works and stays ingredient-conscious.",
      "pot",
      "#f2b8c6",
    ],
    [
      "Arata",
      "Daily",
      "https://www.arata.in",
      "Hair wash without sulphates or parabens.",
      "bottle",
      "#2f6b5a",
    ],
    [
      "Nat Habit",
      "Trusted",
      "https://www.nathabit.in",
      "Fresh neem and almond oil, made close to shipping.",
      "dropper",
      "#6b8e3a",
    ],
  ],
  bedroom: [
    [
      "Utkalika",
      "Trusted",
      "https://www.utkalika.in",
      "Odisha handloom cotton: real craft, real fabric, no synthetic disguise.",
      "fold",
      "#b8432b",
    ],
    [
      "Velby",
      "Trusted",
      "https://www.velby.in",
      "Bamboo cotton basics that are breathable and soft.",
      "fold",
      "#e8e2d6",
    ],
    [
      "Andaman",
      "Exploring",
      "https://www.andaman.com",
      "Clean Indian menswear with well-made essentials.",
      "fold",
      "#3e5a73",
    ],
    [
      "Amrita",
      "Exploring",
      "https://www.amrita.in",
      "Traditional Indian wear rooted in craft and natural fabric.",
      "fold",
      "#c79a3b",
    ],
    [
      "Whoop",
      "Daily",
      "https://www.whoop.com",
      "Sleep and recovery tracking without turning the body into another noisy screen.",
      "band",
      "#2b2b2b",
    ],
  ],
  door: [
    [
      "Birkenstock",
      "Daily",
      "https://www.birkenstock.com/in",
      "Cork-and-leather footbeds with real arch support.",
      "sandal",
      "#7a5a3a",
    ],
  ],
};

export function objSVG(shape: string, c = "#c9a24a"): string {
  const s: Record<string, string> = {
    copper: `<rect x="14" y="10" width="20" height="44" rx="6" fill="#b8733a"/><rect x="17" y="4" width="14" height="8" rx="2" fill="#8f5527"/><rect x="16" y="20" width="4" height="26" rx="2" fill="#e0a06a" opacity=".6"/>`,
    bottle: `<path d="M19 4h10v10l5 8v30a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V22l5-8z" fill="${c}"/><rect x="18" y="28" width="12" height="12" rx="2" fill="#fff" opacity=".55"/>`,
    tube: `<path d="M14 8h20l-3 44H17z" fill="${c}"/><rect x="18" y="52" width="12" height="6" rx="1" fill="#555"/><rect x="18" y="20" width="12" height="14" rx="2" fill="#fff" opacity=".5"/>`,
    jar: `<rect x="10" y="18" width="28" height="38" rx="6" fill="${c}"/><rect x="11" y="10" width="26" height="9" rx="3" fill="#6b4b2f"/><rect x="14" y="28" width="20" height="14" rx="2" fill="#fff" opacity=".55"/>`,
    bag: `<path d="M10 18h28l-2 38H12z" fill="${c}"/><path d="M10 18l4-8h20l4 8" fill="#c8b48a"/><circle cx="24" cy="36" r="6" fill="#fff" opacity=".55"/>`,
    pack: `<path d="M12 10h24l-2 6 2 6v34H12V22l2-6z" fill="${c}"/><rect x="16" y="30" width="16" height="12" rx="2" fill="#fff" opacity=".55"/>`,
    pot: `<rect x="10" y="30" width="28" height="24" rx="5" fill="${c}"/><rect x="9" y="24" width="30" height="8" rx="3" fill="#5b4a3a"/>`,
    pump: `<rect x="14" y="22" width="20" height="34" rx="5" fill="${c}" stroke="#b9c3cb"/><rect x="21" y="10" width="6" height="12" fill="#9aa6b0"/><path d="M21 10h12v4h-8" fill="#9aa6b0"/>`,
    dropper: `<rect x="15" y="24" width="18" height="32" rx="4" fill="${c}"/><rect x="18" y="14" width="12" height="10" fill="#2a2a2a"/><ellipse cx="24" cy="12" rx="5" ry="4" fill="#2a2a2a"/>`,
    fold: `<rect x="4" y="22" width="40" height="12" rx="3" fill="${c}" stroke="rgba(0,0,0,.15)"/><rect x="4" y="34" width="40" height="12" rx="3" fill="${c}" stroke="rgba(0,0,0,.15)" opacity=".9"/><path d="M8 28h32" stroke="rgba(0,0,0,.12)"/>`,
    band: `<rect x="6" y="32" width="36" height="12" rx="6" fill="${c}"/><rect x="18" y="29" width="12" height="18" rx="3" fill="#111"/>`,
    sandal: `<path d="M8 40c0-10 6-16 16-16s16 6 16 16v6H8z" fill="#d9b48a"/><path d="M8 46h32v4H8z" fill="#4a3424"/><rect x="11" y="30" width="26" height="6" rx="3" fill="${c}"/><rect x="15" y="38" width="18" height="5" rx="2.5" fill="${c}"/>`,
  };
  return s[shape] ?? "";
}

export const DOG_SVG = `<svg class="dog-svg" viewBox="0 0 160 80" aria-hidden="true">
    <ellipse cx="86" cy="58" rx="58" ry="20" fill="#d89b4c"/>
    <path d="M140 58c10-4 16-14 12-22" stroke="#c98a3c" stroke-width="9" fill="none" stroke-linecap="round"/>
    <g class="dog-head"><ellipse cx="34" cy="56" rx="24" ry="18" fill="#d89b4c"/>
      <path d="M22 44c-10 2-14 16-6 24 4-8 8-16 6-24z" fill="#b97a30"/>
      <path d="M26 56q5 3 10 0" stroke="#1b1714" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <ellipse cx="12" cy="60" rx="5" ry="4" fill="#1b1714"/></g>
    <text class="zz" x="52" y="30" font-family="Newsreader, serif" font-size="16" fill="#8a6a40">z</text>
    <text class="zz z2" x="62" y="20" font-family="Newsreader, serif" font-size="12" fill="#8a6a40">z</text>
  </svg>`;
