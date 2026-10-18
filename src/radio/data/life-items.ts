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
  /** One sentence when the room is open. Brands, if any, sit a step further in. */
  line: string;
  /** Closed-state tease */
  tease: string;
  /** Door / window / cabinet label */
  portal: string;
  /** portal kind for styling */
  portalKind: "door" | "cabinet" | "wardrobe" | "window";
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

/** Wall frames for the family portrait room. Files live in /public/life/family/. */
export const FAMILY_FRAMES: FamilyFrame[] = [
  {
    id: "us",
    title: "Us",
    hint: "By the water, with Tokyo",
    src: "/life/family/us.jpg",
    tilt: -2.4,
  },
  {
    id: "daughter",
    title: "Birthday morning",
    hint: "Her day, our room",
    src: "/life/family/daughter.jpg",
    tilt: 1.8,
  },
  {
    id: "dance",
    title: "Richu",
    hint: "Certificate day, Odissi dress",
    src: "/life/family/dance.jpg",
    tilt: -1.4,
  },
  {
    id: "tokyo",
    title: "Tokyo",
    hint: "In a pink bow, somehow",
    src: "/life/family/tokyo.jpg",
    tilt: -0.8,
  },
  {
    id: "craft",
    title: "Our story",
    hint: "Debjeet · Barnali · Richu · Tokyo",
    src: "/life/family/craft.jpg",
    tilt: 2.2,
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

/** Four rooms under the family portrait room. Open the portal to see inside. */
export const HOUSE_ROOMS: HouseRoom[] = [
  {
    id: "kitchen",
    room: "Kitchen",
    className: "kitchen",
    shelfId: "fuel",
    tease: "Breakfast usually happens out.",
    line: "Home stays plain. The queue I actually join is Thindi — that list is in the library.",
    portal: "Open the pantry",
    portalKind: "door",
  },
  {
    id: "bath",
    room: "Bathroom",
    className: "bath",
    shelfId: "care",
    tease: "A short shelf.",
    line: "A few things that don't argue with my skin.",
    portal: "Open the cabinet",
    portalKind: "cabinet",
  },
  {
    id: "bedroom",
    room: "Bedroom",
    className: "bedroom",
    shelfId: "wear",
    tease: "Cloth before logos.",
    line: "Odisha handloom in here — the same thread as Richu's Odissi on the wall, and Puri in the library.",
    portal: "Open the wardrobe",
    portalKind: "wardrobe",
  },
  {
    id: "living",
    room: "Living room",
    className: "living",
    tease: "Tokyo has the sofa.",
    line: "Sunday is a slow cup and Tokyo deciding the seats. The certificate stays up whether anyone is dancing.",
    portal: "Look out the window",
    portalKind: "window",
  },
];

export type SlamPageId = "cover" | "food" | "sports" | "travel";

export const SLAM_PAGES: { id: SlamPageId; tab: string; title: string }[] = [
  { id: "cover", tab: "Cover", title: "Things I love" },
  { id: "food", tab: "Food", title: "A foodie in Bangalore" },
  { id: "sports", tab: "Sports", title: "Sports I follow hard" },
  { id: "travel", tab: "Travel", title: "Where I've been" },
];

export function shelfById(id: LifeShelfId): LifeShelf {
  const shelf = LIFE_SHELVES.find((s) => s.id === id);
  if (!shelf) throw new Error(`Missing shelf: ${id}`);
  return shelf;
}

/* ---------- Outside the house: food, sports, travel ---------- */

export type FoodPlace = {
  name: string;
  note: string;
};

export type FoodGroup = {
  id: string;
  title: string;
  blurb: string;
  places: FoodPlace[];
};

/** Bangalore foodie map — personal list, not a ranking. */
export const FOOD_GROUPS: FoodGroup[] = [
  {
    id: "karnataka",
    title: "Karnataka & Thindi",
    blurb: "Native cuisine and the breakfast joints that keep the city honest.",
    places: [
      {
        name: "Malgudi Mylari Mane",
        note: "Mylari dosa, then quiet.",
      },
      {
        name: "Taaza Thindi",
        note: "Idli, vada, filter coffee — gone before the phone comes out.",
      },
      {
        name: "Bangalore Cafe",
        note: "Neighbourhood Thindi that still feels like this city.",
      },
      {
        name: "CTR",
        note: "Butter dosa. Worth the wait.",
      },
      {
        name: "MTR",
        note: "Rava idli that hasn't flinched in decades.",
      },
    ],
  },
  {
    id: "italian",
    title: "Italian",
    blurb: "Pizza and pasta when the craving is specific.",
    places: [
      {
        name: "Eating Love",
        note: "Brick oven, slow dough.",
      },
      {
        name: "Pizza 4P's",
        note: "House cheese. Book ahead.",
      },
      {
        name: "Bologna",
        note: "Pasta in Indiranagar, without the performance.",
      },
    ],
  },
  {
    id: "asian",
    title: "Asian & Japanese",
    blurb: "Bowls, sushi, and the places I keep going back to.",
    places: [
      {
        name: "Naru",
        note: "Twenty seats. Real ramen.",
      },
      {
        name: "Yuki",
        note: "When the whole table can't agree.",
      },
      {
        name: "Azuki",
        note: "Tempura prawns that ruin the others.",
      },
      {
        name: "Cha",
        note: "Hong Kong flavours I can return to.",
      },
    ],
  },
  {
    id: "veg",
    title: "Pure veg, South Indian soul",
    blurb: "Vegetarian rooms that still feel like a proper meal.",
    places: [
      {
        name: "Phurr",
        note: "Pure veg, no lecture.",
      },
      {
        name: "Kalpaney",
        note: "South Indian, quietly ambitious.",
      },
    ],
  },
  {
    id: "meals",
    title: "Andhra meals",
    blurb: "Banana leaf, spice, and no half measures.",
    places: [
      {
        name: "Nagarjuna",
        note: "Bhojanam, when I want the full ritual.",
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    blurb: "Everyday cups and the shops I point people to.",
    places: [
      {
        name: "Blue Tokai",
        note: "The default cup.",
      },
      {
        name: "Subko",
        note: "When the cup should be considered.",
      },
    ],
  },
  {
    id: "popups",
    title: "Pop-ups",
    blurb: "Chef dinners that aren’t on a permanent menu.",
    places: [
      {
        name: "The Conservatory",
        note: "I clear the calendar.",
      },
    ],
  },
];

export type SportLove = {
  id: string;
  sport: string;
  loves: string[];
  note: string;
};

export const SPORTS_LOVES: SportLove[] = [
  {
    id: "cricket",
    sport: "Cricket",
    loves: ["India", "RCB"],
    note: "Every India series. RCB hope, on subscription.",
  },
  {
    id: "ufc",
    sport: "UFC",
    loves: ["Justin Gaethje"],
    note: "Gaethje fights like the clock is personal.",
  },
  {
    id: "f1",
    sport: "Formula 1",
    loves: ["Max Verstappen"],
    note: "Verstappen. Race Sunday is blocked.",
  },
  {
    id: "tennis",
    sport: "Tennis",
    loves: ["Roger Federer", "Carlos Alcaraz"],
    note: "Federer for the standard. Alcaraz for what's next.",
  },
  {
    id: "football",
    sport: "Football",
    loves: ["Manchester United"],
    note: "United, through every plot twist.",
  },
];

export type MapPin = {
  id: string;
  label: string;
  /** SVG path id(s) that light up for this place */
  regions: string[];
  note?: string;
  /** A place worth a paragraph — shown under the map */
  story?: boolean;
};

/** Visited Indian states — all except Arunachal, Mizoram, Nagaland. */
export const INDIA_PINS: MapPin[] = [
  { id: "JK", label: "Jammu & Kashmir", regions: ["JK"], note: "Mountains first — Srinagar light and the long road up." },
  { id: "HP", label: "Himachal Pradesh", regions: ["HP"], note: "Hills, pine, and cold mornings that reset the week." },
  { id: "PB", label: "Punjab", regions: ["PB"], note: "Warm kitchens and louder laughter than the train ride in." },
  { id: "UK", label: "Uttarakhand", regions: ["UK"], note: "Temple towns and river air — Dehradun stays with me." },
  { id: "HR", label: "Haryana", regions: ["HR"], note: "The highway state — always on the way to somewhere else." },
  { id: "DL", label: "Delhi", regions: ["DL"], note: "Chaos with a spine. Food, monuments, and too many opinions." },
  { id: "RJ", label: "Rajasthan", regions: ["RJ"], note: "Forts, desert heat, and evenings that go gold." },
  { id: "UP", label: "Uttar Pradesh", regions: ["UP"], note: "History layered thick — Varanasi still echoes." },
  { id: "BR", label: "Bihar", regions: ["BR"], note: "Quiet strength. Bodh Gaya slows everything down." },
  { id: "SK", label: "Sikkim", regions: ["SK"], note: "Small state, huge views. Kanchenjunga weather." },
  { id: "AS", label: "Assam", regions: ["AS"], note: "Tea gardens and Brahmaputra light." },
  { id: "ML", label: "Meghalaya", regions: ["ML"], note: "Clouds you can walk through. Shillong rhythm." },
  { id: "TR", label: "Tripura", regions: ["TR"], note: "A quieter Northeast chapter — worth the detour." },
  { id: "MN", label: "Manipur", regions: ["MN"], note: "Imphal valley — green, proud, unforgettable." },
  { id: "WB", label: "West Bengal", regions: ["WB"], note: "Kolkata conversations and mishti after every argument." },
  { id: "JH", label: "Jharkhand", regions: ["JH"], note: "Forest roads and waterfalls between the cities." },
  { id: "OR", label: "Odisha", regions: ["OR"], story: true, note: "Puri, and Richu's Odissi. The same Odisha as the handloom in the wardrobe and the certificate on the wall." },
  { id: "CT", label: "Chhattisgarh", regions: ["CT"], note: "Underrated — forests and frank hospitality." },
  { id: "MP", label: "Madhya Pradesh", regions: ["MP"], note: "The heart of India — Khajuraho, Mandu, long drives." },
  { id: "GJ", label: "Gujarat", regions: ["GJ"], note: "White desert nights and Gujarati thali discipline." },
  { id: "MH", label: "Maharashtra", regions: ["MH"], note: "Mumbai energy, Western Ghats weekends." },
  { id: "TS", label: "Telangana", regions: ["TS"], note: "Hyderabad biryani — argument settled." },
  { id: "AP", label: "Andhra Pradesh", regions: ["AP"], note: "Spice with conviction. Coast and red chili." },
  { id: "KA", label: "Karnataka", regions: ["KA"], story: true, note: "Home. Bangalore is the kitchen I come back to — Thindi first, then the rest of the city." },
  { id: "GA", label: "Goa", regions: ["GA"], note: "Salt air, slow mornings, no agenda." },
  { id: "KL", label: "Kerala", regions: ["KL"], note: "Backwaters, filter coffee, green that doesn't quit." },
  { id: "TN", label: "Tamil Nadu", regions: ["TN"], note: "Temple cities and filter-coffee mornings done right." },
];

export const INDIA_SKIPPED = ["Arunachal Pradesh", "Mizoram", "Nagaland"];
export const INDIA_SKIPPED_IDS = ["AR", "MZ", "NL"] as const;
export const WORLD_SKIPPED_IDS = [] as const;

export const WORLD_PINS: MapPin[] = [
  { id: "US", label: "United States", regions: ["usa"], note: "Work trips that turned into city walks and late dinners." },
  { id: "DE", label: "Germany", regions: ["germany"], note: "Trains on time, bread that means it, museum hours." },
  { id: "AT", label: "Austria", regions: ["austria"], note: "Alpine air and cafés that still feel like cafés." },
  { id: "HU", label: "Hungary", regions: ["hungary"], note: "Budapest baths and ruin-bar nights." },
  { id: "TR", label: "Istanbul", regions: ["turkey"], story: true, note: "Bazaar, Bosphorus, a breakfast that takes the morning." },
  { id: "AE", label: "Dubai (UAE)", regions: ["emirates"], note: "Layover city that became a desert-and-skyline stamp." },
  { id: "KE", label: "Kenya", regions: ["kenya"], story: true, note: "Savanna light. The trip that changed the scale of a day." },
  { id: "IN", label: "India", regions: ["india"], note: "Home — most of the map, still collecting the Northeast." },
  { id: "NP", label: "Nepal", regions: ["nepal"], note: "Kathmandu dust and Himalaya silhouette." },
  { id: "BT", label: "Bhutan", regions: ["bhutan"], story: true, note: "Dzongs, quiet roads, a different measure of a good week." },
  { id: "LK", label: "Sri Lanka", regions: ["sri-lanka"], note: "Tea hills, coast trains, and short-eats between cities." },
  { id: "TH", label: "Thailand", regions: ["thailand"], note: "Street food graduate school." },
  { id: "MY", label: "Malaysia", regions: ["malaysia", "east-malaysia"], note: "KL towers and Borneo green — both count." },
  { id: "ID", label: "Indonesia / Bali", regions: ["bali", "java", "sumatra", "kalimantan"], note: "Bali first — temples, rice terraces, ocean evenings." },
];

