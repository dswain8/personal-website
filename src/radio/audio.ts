/** Web Audio for the home radio + Quiet room drone. */

import type { StationKey } from "./data/stations";

export type { StationKey };

export type RadioSound = {
  /** Rain between stations; station bed when locked. */
  setBed: (locked: StationKey | null) => void;
  click: () => void;
  stop: () => void;
};

type StaticSound = {
  level: (x: number) => void;
  click: () => void;
  stop: () => void;
};

type DroneState = {
  ctx: AudioContext;
  master: GainNode;
};

type BedId = "rain" | StationKey;

type BedVoice = {
  id: BedId;
  gain: GainNode;
  stop: () => void;
};

const BED_URLS: Record<BedId, string> = {
  rain: "/audio/rain.mp3",
  quiet: "/audio/quiet.mp3",
  build: "/audio/build.mp3",
  try: "/audio/try.mp3",
  life: "/audio/life.mp3",
};

/** Target levels — Quiet softest; rain gentle; stations sit under UI. */
const BED_LEVEL: Record<BedId, number> = {
  rain: 0.28,
  quiet: 0.22,
  build: 0.26,
  try: 0.24,
  life: 0.25,
};

let drone: DroneState | null = null;
const bufferCache = new Map<string, AudioBuffer>();

function audioContext(): AudioContext {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  return new AudioCtx();
}

async function unlock(ctx: AudioContext) {
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      /* gesture may still be required */
    }
  }
}

async function loadBuffer(
  ctx: AudioContext,
  url: string,
): Promise<AudioBuffer | null> {
  const hit = bufferCache.get(url);
  if (hit) return hit;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const raw = await res.arrayBuffer();
    const buf = await ctx.decodeAudioData(raw.slice(0));
    bufferCache.set(url, buf);
    return buf;
  } catch {
    return null;
  }
}

function noiseBuffer(ctx: AudioContext, seconds = 2): AudioBuffer {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const white = Math.random() * 2 - 1;
    // simple pink-ish
    last = (last + 0.02 * white) / 1.02;
    d[i] = last * 3;
  }
  return buf;
}

/** Fallback rain if the mp3 fails to load. */
function startRainFallback(ctx: AudioContext, master: GainNode): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);

  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, 3);
  src.loop = true;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 500;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1600;
  bp.Q.value = 0.5;
  src.connect(hp).connect(bp).connect(gain);
  src.start();

  gain.gain.setTargetAtTime(BED_LEVEL.rain, ctx.currentTime, 0.8);
  return {
    id: "rain",
    gain,
    stop: () => {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      try {
        src.stop();
      } catch {
        /* */
      }
    },
  };
}

function startFileBed(
  ctx: AudioContext,
  master: GainNode,
  id: BedId,
  buffer: AudioBuffer,
): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  // Slight overlap on loop seams the fades already soften.
  src.loopStart = 0.05;
  src.loopEnd = Math.max(0.5, buffer.duration - 0.05);
  src.connect(gain);
  src.start();
  gain.gain.setTargetAtTime(BED_LEVEL[id], ctx.currentTime, 0.7);
  return {
    id,
    gain,
    stop: () => {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      try {
        src.stop();
      } catch {
        /* */
      }
    },
  };
}

/**
 * Home-radio atmosphere: Mixkit beds (rain + per-station), generative rain fallback.
 * Must be constructed inside a user gesture (SOUND toggle).
 */
export function createRadioSound(): RadioSound {
  const ctx = audioContext();
  void unlock(ctx);
  const master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);

  let current: BedVoice | null = null;
  let generation = 0;

  const crossfadeTo = async (id: BedId) => {
    const gen = ++generation;
    await unlock(ctx);
    const buf = await loadBuffer(ctx, BED_URLS[id]);
    if (gen !== generation) return; // superseded by a newer dial move

    if (current?.id === id) return;

    const prev = current;
    const voice = buf
      ? startFileBed(ctx, master, id, buf)
      : startRainFallback(ctx, master);
    // Keep requested id even when falling back to generative rain.
    current = { ...voice, id };

    if (prev) {
      prev.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.18);
      const dying = prev;
      window.setTimeout(() => dying.stop(), 700);
    }
  };

  void crossfadeTo("rain");
  // Warm the other beds in the background after the gesture.
  (["quiet", "build", "try", "life"] as BedId[]).forEach((id) => {
    void loadBuffer(ctx, BED_URLS[id]);
  });

  return {
    setBed: (locked) => {
      void crossfadeTo(locked ?? "rain");
    },
    click: () => {
      void unlock(ctx);
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.frequency.value = 1200;
      og.gain.setValueAtTime(0.05, ctx.currentTime);
      og.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      o.connect(og).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.07);
    },
    stop: () => {
      generation++;
      current?.stop();
      current = null;
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      window.setTimeout(() => void ctx.close(), 400);
    },
  };
}

<<<<<<< HEAD
/** @deprecated Prefer createRadioSound */
export function makeStaticSound(): StaticSound {
  const radio = createRadioSound();
  return {
    level: (x) => {
      if (x > 0.01) radio.setBed(null);
    },
    click: () => radio.click(),
    stop: () => radio.stop(),
  };
}

=======
/**
 * Soft calm pad for Quiet — synthesized in-browser (no audio file, no license).
 * Stacked around 432 Hz with a slow breath-like swell (~0.12 Hz).
 * API name kept as "drone" so RadioShell can still stop it on leave.
 */
>>>>>>> origin/cursor/quiet-cosmos-382c
export function startDrone(v: number) {
  stopDrone();
  const ctx = audioContext();
  void unlock(ctx);
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Warm low-pass so the tone stays soft, not piercing.
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  lp.Q.value = 0.5;
  lp.connect(master);

  // Breath envelope on the whole pad (~8s cycle, resting inhale/exhale pace).
  const breath = ctx.createGain();
  breath.gain.value = 0.72;
  breath.connect(lp);
  const breathLfo = ctx.createOscillator();
  const breathDepth = ctx.createGain();
  breathLfo.frequency.value = 0.12;
  breathDepth.gain.value = 0.22;
  breathLfo.connect(breathDepth).connect(breath.gain);
  breathLfo.start();

  // Calm stack: 216 / 432 / 648 Hz (octave + fifth around 432).
  (
    [
      [216, 0.38, "sine"],
      [432, 0.28, "sine"],
      [648, 0.08, "sine"],
      [108, 0.22, "triangle"],
    ] as const
  ).forEach(([f, g, type]) => {
    const o = ctx.createOscillator();
    const gn = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    gn.gain.value = g;
    // Tiny slow vibrato — organic, not a ringtone.
    const vib = ctx.createOscillator();
    const vibGain = ctx.createGain();
    vib.frequency.value = 0.04 + f / 12000;
    vibGain.gain.value = f * 0.0012;
    vib.connect(vibGain).connect(o.frequency);
    o.connect(gn).connect(breath);
    o.start();
    vib.start();
  });

  master.gain.setTargetAtTime(v * 0.16, ctx.currentTime, 1.8);
  drone = { ctx, master };
}

export function setDroneVolume(v: number) {
  if (!drone) return;
  drone.master.gain.setTargetAtTime(
    v * 0.16,
    drone.ctx.currentTime,
    0.25,
  );
}

export function stopDrone() {
  if (!drone) return;
  const a = drone;
  drone = null;
  a.master.gain.setTargetAtTime(0, a.ctx.currentTime, 0.25);
  setTimeout(() => void a.ctx.close(), 900);
}

export function isDroneOn() {
  return !!drone;
}
