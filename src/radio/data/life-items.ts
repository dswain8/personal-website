export type LifeBrand = {
  name: string;
  url: string;
  note: string;
  /** Filename under /life/logos/ */
  logo: string;
};

export type LifeShelfId = "fuel" | "care" | "wear";

export type LifeShelf = {
  id: LifeShelfId;
  /** Locked shelf title shown inside the room */
  title: string;
  blurb: string;
  brands: LifeBrand[];
};

export type HouseRoom = {
  id: "kitchen" | "bath" | "bedroom" | "living";
  /** Room name on the floorplan */
  room: string;
  className: string;
  /** Brand shelf hosted in this room, if any */
  shelfId?: LifeShelfId;
  /** Living-room only: short personal note instead of brands */
  note?: string;
};

export type FamilyFrame = {
  id: string;
  title: string;
  hint: string;
  /** Expected drop path under /public/life/family/ */
  src: string;
  /** Slight tilt for the wall collage */
  tilt: number;
};

/** Wall frames for the family portrait room. Drop real files into /public/life/family/. */
export const FAMILY_FRAMES: FamilyFrame[] = [
  {
    id: "us",
    title: "Us",
    hint: "Family photo",
    src: "/life/family/us.jpg",
    tilt: -2.4,
  },
  {
    id: "daughter",
    title: "Daughter",
    hint: "Photos of her",
    src: "/life/family/daughter.jpg",
    tilt: 1.8,
  },
  {
    id: "drawing",
    title: "Her drawing",
    hint: "If she approves",
    src: "/life/family/drawing.jpg",
    tilt: -1.2,
  },
  {
    id: "caricature",
    title: "Caricature",
    hint: "Of her, somewhere funny",
    src: "/life/family/caricature.jpg",
    tilt: 2.6,
  },
  {
    id: "tokyo",
    title: "Tokyo",
    hint: "Golden retriever",
    src: "/life/family/tokyo.jpg",
    tilt: -0.8,
  },
];

export const LIFE_SHELVES: LifeShelf[] = [
  {
    id: "fuel",
    title: "Fuel",
    blurb: "What I put in — food, drink, supplements.",
    brands: [
      {
        name: "Isha Life",
        url: "https://www.ishalife.com",
        note: "Copper bottles and utensils from Sadhguru's store. The way water should be stored.",
        logo: "ishalife.svg",
      },
      {
        name: "Plix",
        url: "https://www.plix.life",
        note: "ACV drink and sparkling drinks with consistently clean ingredients.",
        logo: "plix.svg",
      },
      {
        name: "Fast&Up",
        url: "https://www.fastandup.in",
        note: "A straightforward multivitamin top-up.",
        logo: "fastandup.png",
      },
    ],
  },
  {
    id: "care",
    title: "Care",
    blurb: "What I put on — skin, hair, body care.",
    brands: [
      {
        name: "Idam",
        url: "https://www.idam.in",
        note: "Lip balm and deodorant from a brand that takes ingredient lists seriously.",
        logo: "idam.svg",
      },
      {
        name: "Dot & Key",
        url: "https://www.dotandkey.com",
        note: "A moisturiser line that works and stays ingredient-conscious.",
        logo: "dotandkey.svg",
      },
      {
        name: "Forest Essentials",
        url: "https://www.forestessentialsindia.com",
        note: "Ayurvedic skincare that still feels grounded in ingredients.",
        logo: "forestessentials.svg",
      },
      {
        name: "Cetaphil",
        url: "https://www.cetaphil.in",
        note: "Gentle face wash that does exactly what it says.",
        logo: "cetaphil.png",
      },
      {
        name: "Arata",
        url: "https://www.arata.in",
        note: "Hair wash without sulphates or parabens.",
        logo: "arata.svg",
      },
      {
        name: "Nat Habit",
        url: "https://www.nathabit.in",
        note: "Fresh neem and almond oil, made close to shipping.",
        logo: "nathabit.svg",
      },
    ],
  },
  {
    id: "wear",
    title: "Wear",
    blurb: "What I wear — natural fibres, everyday pieces, craft where it counts.",
    brands: [
      {
        name: "Andamen",
        url: "https://www.andamen.com",
        note: "Clean Indian menswear with well-made essentials.",
        logo: "andamen.png",
      },
      {
        name: "Uniqlo",
        url: "https://www.uniqlo.com",
        note: "Quiet basics that disappear into the week in a good way.",
        logo: "uniqlo.png",
      },
      {
        name: "Utkalamrita",
        url: "https://utkalamrita.com",
        note: "Odisha handloom and craft — real fabric, no synthetic disguise.",
        logo: "utkalamrita.svg",
      },
      {
        name: "Fabindia",
        url: "https://www.fabindia.com",
        note: "Indian textiles and everyday wear rooted in craft.",
        logo: "fabindia.svg",
      },
      {
        name: "Wellbi",
        url: "https://wellbi.in",
        note: "Bamboo cotton basics that stay breathable and soft.",
        logo: "wellbi.png",
      },
    ],
  },
];

/** Four rooms under the family portrait room. Brands live on shelves inside. */
export const HOUSE_ROOMS: HouseRoom[] = [
  {
    id: "kitchen",
    room: "Kitchen",
    className: "kitchen",
    shelfId: "fuel",
  },
  {
    id: "bath",
    room: "Bathroom",
    className: "bath",
    shelfId: "care",
  },
  {
    id: "bedroom",
    room: "Bedroom",
    className: "bedroom",
    shelfId: "wear",
  },
  {
    id: "living",
    room: "Living room",
    className: "living",
    note: "Where the rest of the Sunday goes — board games, a slow cup of something, Tokyo claiming the sofa. No brands here on purpose.",
  },
];

export function shelfById(id: LifeShelfId): LifeShelf {
  const shelf = LIFE_SHELVES.find((s) => s.id === id);
  if (!shelf) throw new Error(`Missing shelf: ${id}`);
  return shelf;
}
