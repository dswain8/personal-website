export type StationKey = "build" | "quiet" | "try" | "life";

export type Station = {
  key: StationKey;
  at: number;
  short: string;
  name: string;
  freq: string;
};

export const DIAL_MAX = 320;

export const freqAt = (v: number) => (88 + (v / DIAL_MAX) * 20).toFixed(1);

const RAW = [
  { key: "build" as const, at: 40, short: "Build", name: "Build something" },
  { key: "quiet" as const, at: 120, short: "Quiet", name: "Find a little quiet" },
  { key: "try" as const, at: 200, short: "Try", name: "Try what I've made" },
  { key: "life" as const, at: 280, short: "Life", name: "Off the clock" },
];

export const STATIONS: Station[] = RAW.map((s) => ({
  ...s,
  freq: freqAt(s.at),
}));

export const BETWEEN: [number, string][] = [
  [0, "You're early. Nothing on this frequency yet."],
  [40, "Fast on decisions. Slow on small details."],
  [120, "Some days it's Sadhguru. Some days it's a Bollywood chartbuster."],
  [200, "Wonder Journal started as something for my daughter."],
  [280, "End of the dial. Try the other way."],
];

export const KEY_ICONS: Record<StationKey, string> = {
  build:
    '<path d="M3 2h4v12H3zM8 3h3v11H8zM12 4l2 .5-2 9.5-2-.5z" fill="currentColor"/>',
  quiet:
    '<path d="M11 2a6 6 0 1 0 3 10.5A6.5 6.5 0 0 1 11 2z" fill="currentColor"/>',
  try: '<path d="M10 2a3 3 0 0 0-2.6 4.4L2 11.8 4.2 14l5.4-5.4A3 3 0 0 0 14 6l-2 1-1-1 1-2z" fill="currentColor"/>',
  life: '<path d="M8 2 1 8h2v6h4v-4h2v4h4V8h2z" fill="currentColor"/>',
};

export function stationByKey(key: string | undefined): Station | undefined {
  return STATIONS.find((s) => s.key === key);
}

export function neighborStations(key: StationKey): {
  prev: { key: string; name: string; label: string };
  next: { key: string; name: string; label: string };
} {
  const order: StationKey[] = ["build", "quiet", "try", "life"];
  const i = order.indexOf(key);
  const prevKey = order[(i - 1 + 4) % 4];
  const nextKey = order[(i + 1) % 4];
  const prev = STATIONS.find((s) => s.key === prevKey)!;
  const next = STATIONS.find((s) => s.key === nextKey)!;
  return {
    prev: { key: prev.key, name: prev.name, label: "Back to" },
    next: { key: next.key, name: next.name, label: "Next" },
  };
}
