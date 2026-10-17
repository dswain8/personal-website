export type LifeBrand = {
  name: string;
  url: string;
  note: string;
  /** Filename under /life/logos/ */
  logo: string;
};

export type LifeShelfId = "fuel" | "care" | "wear" | "play";

export type LifeShelf = {
  id: LifeShelfId;
  /** Locked shelf title shown inside the room */
  title: string;
  brands: LifeBrand[];
};

export type HouseRoom = {
  id: "kitchen" | "bath" | "bedroom" | "living";
  /** Room name on the floorplan */
  room: string;
  className: string;
  /** Brand shelf hosted in this room */
  shelfId: LifeShelfId;
};

export type FamilyFrame = {
  id: string;
  title: string;
  /** Expected drop path under /public/life/family/ */
  src: string;
  /** Slight tilt for the wall collage */
  tilt: number;
};

/** Wall frames for the family portrait room. Files live in /public/life/family/. */
export const FAMILY_FRAMES: FamilyFrame[] = [
  {
    id: "craft",
    title: "Our story",
    src: "/life/family/craft.jpg",
    tilt: 2.2,
  },
  {
    id: "us",
    title: "Us",
    src: "/life/family/us.jpg",
    tilt: -2.4,
  },
  {
    id: "daughter",
    title: "Birthday morning",
    src: "/life/family/daughter.jpg",
    tilt: 1.8,
  },
  {
    id: "dance",
    title: "Richu",
    src: "/life/family/dance.jpg",
    tilt: -1.4,
  },
  {
    id: "tokyo",
    title: "Tokyo",
    src: "/life/family/tokyo.jpg",
    tilt: -0.8,
  },
];

export const LIFE_SHELVES: LifeShelf[] = [
  {
    id: "fuel",
    title: "Fuel",
    brands: [
      {
        name: "Isha Life",
        url: "https://www.ishalife.com",
        note: "Copper bottles and utensils.",
        logo: "ishalife.svg",
      },
      {
        name: "Plix",
        url: "https://www.plix.life",
        note: "ACV and sparkling drinks.",
        logo: "plix.svg",
      },
      {
        name: "Fast&Up",
        url: "https://www.fastandup.in",
        note: "Multivitamin top-up.",
        logo: "fastandup.svg",
      },
    ],
  },
  {
    id: "care",
    title: "Care",
    brands: [
      {
        name: "Idham",
        url: "https://www.instagram.com/idhamnature/",
        note: "Lip balm and deodorant.",
        logo: "idham.svg",
      },
      {
        name: "Dot & Key",
        url: "https://www.dotandkey.com",
        note: "Moisturiser.",
        logo: "dotandkey.svg",
      },
      {
        name: "Forest Essentials",
        url: "https://www.forestessentialsindia.com",
        note: "Ayurvedic skincare.",
        logo: "forestessentials.svg",
      },
      {
        name: "Cetaphil",
        url: "https://www.cetaphil.in",
        note: "Gentle face wash.",
        logo: "cetaphil.png",
      },
      {
        name: "Arata",
        url: "https://www.arata.in",
        note: "Hair wash.",
        logo: "arata.png",
      },
      {
        name: "Nat Habit",
        url: "https://www.nathabit.in",
        note: "Neem and almond oil.",
        logo: "nathabit.svg",
      },
    ],
  },
  {
    id: "wear",
    title: "Wear",
    brands: [
      {
        name: "Andamen",
        url: "https://www.andamen.com",
        note: "Menswear essentials.",
        logo: "andamen.png",
      },
      {
        name: "Uniqlo",
        url: "https://www.uniqlo.com",
        note: "Everyday basics.",
        logo: "uniqlo.png",
      },
      {
        name: "Utkalamrita",
        url: "https://utkalamrita.com",
        note: "Odisha handloom.",
        logo: "utkalamrita.svg",
      },
      {
        name: "Fabindia",
        url: "https://www.fabindia.com",
        note: "Indian textiles.",
        logo: "fabindia.svg",
      },
      {
        name: "Wellbi",
        url: "https://wellbi.in",
        note: "Bamboo cotton basics.",
        logo: "wellbi.svg",
      },
    ],
  },
  {
    id: "play",
    title: "Play",
    brands: [
      {
        name: "Skillmatics",
        url: "https://www.skillmatics.in",
        note: "Games we play together.",
        logo: "skillmatics.svg",
      },
      {
        name: "LEGO",
        url: "https://www.lego.com",
        note: "Builds on the living-room floor.",
        logo: "lego.svg",
      },
      {
        name: "Smartivity",
        url: "https://www.smartivity.in",
        note: "STEM kits we build with her.",
        logo: "smartivity.svg",
      },
      {
        name: "Crayola",
        url: "https://www.crayola.com",
        note: "Colouring and crafts.",
        logo: "crayola.svg",
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
    shelfId: "play",
  },
];

export function shelfById(id: LifeShelfId): LifeShelf {
  const shelf = LIFE_SHELVES.find((s) => s.id === id);
  if (!shelf) throw new Error(`Missing shelf: ${id}`);
  return shelf;
}
