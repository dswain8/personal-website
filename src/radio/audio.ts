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

export function startDrone(v: number) {
  stopDrone();
  const ctx = audioContext();
  void unlock(ctx);
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 700;
  lp.connect(master);
  (
    [
      [110, 0.5],
      [164.8, 0.3],
      [220, 0.12],
    ] as const
  ).forEach(([f, g]) => {
    const o = ctx.createOscillator();
    const gn = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = f;
    gn.gain.value = g;
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = 0.05 + f / 4000;
    lg.gain.value = g * 0.4;
    lfo.connect(lg).connect(gn.gain);
    o.connect(gn).connect(lp);
    o.start();
    lfo.start();
  });
  master.gain.setTargetAtTime(v * 0.18, ctx.currentTime, 1.2);
  drone = { ctx, master };
}

export function setDroneVolume(v: number) {
  if (!drone) return;
  drone.master.gain.setTargetAtTime(
    v * 0.18,
    drone.ctx.currentTime,
    0.2,
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
