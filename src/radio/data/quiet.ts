/** Thought chains for the Quiet field — each opens with the floating label. */
export const THOUGHTS: string[][] = [
  ["did I reply to that thread?", "I should just check Slack", "one quick look", "…twenty minutes later"],
  ["that side-project bug", "I could fix it tonight", "one more prompt", "it is now 1 a.m."],
  ["dinner?", "that place with the filter coffee", "is it open on Mondays", "now I'm hungry"],
  ["am I doing this right?", "other people are probably better at this", "I should read more about it", "and that's another thought"],
  ["what was that song", "the one from the car", "humming it now", "it's going to be stuck all day"],
  ["one more email before I sit", "okay, two", "this one needs a doc", "the doc needs a meeting"],
  ["boarding in forty minutes", "do I have the charger", "check the bag again", "it was in the bag"],
];

/** Percent positions for floating thoughts in the field. */
export const THOUGHT_POS: [number, number][] = [
  [6, 12],
  [54, 22],
  [26, 38],
  [70, 50],
  [40, 64],
  [12, 76],
  [60, 84],
];

/** Fixed star field — seeded once so the sky stays stable across renders. */
export const STARS: { x: number; y: number; s: number; d: number }[] = [
  { x: 4, y: 8, s: 1.2, d: 0 },
  { x: 12, y: 18, s: 0.8, d: 1.2 },
  { x: 22, y: 6, s: 1.5, d: 2.4 },
  { x: 31, y: 28, s: 0.7, d: 0.6 },
  { x: 38, y: 12, s: 1.1, d: 3.1 },
  { x: 47, y: 22, s: 0.9, d: 1.8 },
  { x: 55, y: 9, s: 1.4, d: 0.3 },
  { x: 63, y: 31, s: 0.6, d: 2.7 },
  { x: 71, y: 14, s: 1.0, d: 1.1 },
  { x: 78, y: 25, s: 0.8, d: 3.5 },
  { x: 86, y: 7, s: 1.3, d: 0.9 },
  { x: 93, y: 19, s: 0.7, d: 2.0 },
  { x: 8, y: 42, s: 0.9, d: 1.5 },
  { x: 18, y: 55, s: 1.1, d: 2.8 },
  { x: 27, y: 48, s: 0.6, d: 0.4 },
  { x: 36, y: 62, s: 1.2, d: 3.2 },
  { x: 44, y: 41, s: 0.8, d: 1.7 },
  { x: 52, y: 58, s: 1.0, d: 0.2 },
  { x: 61, y: 45, s: 0.7, d: 2.3 },
  { x: 69, y: 68, s: 1.4, d: 1.0 },
  { x: 77, y: 52, s: 0.9, d: 3.8 },
  { x: 85, y: 64, s: 0.6, d: 0.7 },
  { x: 94, y: 48, s: 1.1, d: 2.1 },
  { x: 6, y: 78, s: 0.8, d: 1.4 },
  { x: 15, y: 88, s: 1.0, d: 2.9 },
  { x: 24, y: 72, s: 0.7, d: 0.5 },
  { x: 33, y: 92, s: 1.3, d: 3.4 },
  { x: 42, y: 81, s: 0.9, d: 1.9 },
  { x: 58, y: 90, s: 0.6, d: 0.8 },
  { x: 67, y: 79, s: 1.2, d: 2.6 },
  { x: 82, y: 86, s: 0.8, d: 1.3 },
  { x: 91, y: 74, s: 1.0, d: 3.0 },
  { x: 49, y: 35, s: 0.5, d: 4.1 },
  { x: 14, y: 33, s: 0.5, d: 2.5 },
  { x: 73, y: 40, s: 0.5, d: 1.6 },
  { x: 88, y: 36, s: 0.7, d: 0.1 },
];

export const VOICES = [
  {
    name: "Sadhguru",
    note: "YouTube",
    href: "https://www.youtube.com/@sadhguru",
  },
  {
    name: "Dandapani",
    note: "YouTube",
    href: "https://www.youtube.com/@Dandapani",
  },
  {
    name: "Swami Sarvapriyananda",
    note: "Vedanta Society of New York, YouTube",
    href: "https://www.youtube.com/@VedantaNY",
  },
] as const;
