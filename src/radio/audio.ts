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

let drone: DroneState | null = null;

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
      /* gesture may still be required on some browsers */
    }
  }
}

function noiseBuffer(ctx: AudioContext, seconds = 2): AudioBuffer {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function loopNoise(ctx: AudioContext): AudioBufferSourceNode {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx);
  src.loop = true;
  src.start();
  return src;
}

/** Soft rain bed — pinkish noise + sparse drop ticks. */
function startRain(ctx: AudioContext, master: GainNode): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);

  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 400;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1400;
  bp.Q.value = 0.55;

  const src = loopNoise(ctx);
  src.connect(hp);
  hp.connect(bp);
  bp.connect(gain);

  const dropGain = ctx.createGain();
  dropGain.gain.value = 0.035;
  dropGain.connect(gain);
  let dropTimer = 0;
  const scheduleDrops = () => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 2200 + Math.random() * 1800;
    f.Q.value = 4;
    o.type = "triangle";
    o.frequency.value = 600 + Math.random() * 900;
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.04 + Math.random() * 0.03, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08 + Math.random() * 0.1);
    o.connect(f).connect(g).connect(dropGain);
    o.start(t);
    o.stop(t + 0.2);
    dropTimer = window.setTimeout(scheduleDrops, 280 + Math.random() * 900);
  };
  scheduleDrops();

  gain.gain.setTargetAtTime(0.22, ctx.currentTime, 0.8);

  return {
    id: "rain",
    gain,
    stop: () => {
      window.clearTimeout(dropTimer);
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      try {
        src.stop();
      } catch {
        /* already stopped */
      }
    },
  };
}

function startQuietBed(ctx: AudioContext, master: GainNode): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 680;
  lp.connect(gain);
  const oscillators: OscillatorNode[] = [];
  (
    [
      [110, 0.45],
      [164.8, 0.28],
      [220, 0.1],
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
    lg.gain.value = g * 0.35;
    lfo.connect(lg).connect(gn.gain);
    o.connect(gn).connect(lp);
    o.start();
    lfo.start();
    oscillators.push(o, lfo);
  });
  gain.gain.setTargetAtTime(0.2, ctx.currentTime, 1);
  return {
    id: "quiet",
    gain,
    stop: () => {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      oscillators.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* */
        }
      });
    },
  };
}

/** Deep-focus low pulse — muted, no melody hook. */
function startBuildBed(ctx: AudioContext, master: GainNode): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 420;
  lp.connect(gain);

  const o = ctx.createOscillator();
  const og = ctx.createGain();
  o.type = "sine";
  o.frequency.value = 55;
  og.gain.value = 0.55;
  o.connect(og).connect(lp);
  o.start();

  const pulse = ctx.createOscillator();
  const pg = ctx.createGain();
  pulse.type = "sine";
  pulse.frequency.value = 1.15;
  pg.gain.value = 0.35;
  pulse.connect(pg).connect(og.gain);
  pulse.start();

  const hum = ctx.createOscillator();
  const hg = ctx.createGain();
  hum.type = "triangle";
  hum.frequency.value = 110;
  hg.gain.value = 0.12;
  hum.connect(hg).connect(lp);
  hum.start();

  gain.gain.setTargetAtTime(0.18, ctx.currentTime, 0.9);
  return {
    id: "build",
    gain,
    stop: () => {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      [o, pulse, hum].forEach((n) => {
        try {
          n.stop();
        } catch {
          /* */
        }
      });
    },
  };
}

/** Curious workshop energy — soft mallet-ish fifths. */
function startTryBed(ctx: AudioContext, master: GainNode): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);
  const nodes: AudioScheduledSourceNode[] = [];

  const playPluck = (freq: number, when: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1800;
    o.type = "triangle";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(0.09, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 1.4);
    o.connect(f).connect(g).connect(gain);
    o.start(when);
    o.stop(when + 1.5);
    nodes.push(o);
  };

  let step = 0;
  const pattern = [392, 494, 587, 440]; // G B D A — light, curious
  const tick = () => {
    const t = ctx.currentTime;
    playPluck(pattern[step % pattern.length], t);
    playPluck(pattern[(step + 2) % pattern.length] / 2, t + 0.02);
    step++;
  };
  tick();
  const iv = window.setInterval(tick, 1600);

  // soft noise floor
  const floor = ctx.createGain();
  floor.gain.value = 0.04;
  floor.connect(gain);
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 800;
  const src = loopNoise(ctx);
  src.connect(hp);
  hp.connect(floor);

  gain.gain.setTargetAtTime(0.16, ctx.currentTime, 0.8);
  return {
    id: "try",
    gain,
    stop: () => {
      window.clearInterval(iv);
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      try {
        src.stop();
      } catch {
        /* */
      }
      nodes.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* */
        }
      });
    },
  };
}

/** Warm home pad — soft major triad. */
function startLifeBed(ctx: AudioContext, master: GainNode): BedVoice {
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(master);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  lp.connect(gain);
  const oscillators: OscillatorNode[] = [];
  (
    [
      [130.81, 0.35], // C3
      [164.81, 0.28], // E3
      [196.0, 0.22], // G3
      [261.63, 0.1], // C4
    ] as const
  ).forEach(([f, g]) => {
    const o = ctx.createOscillator();
    const gn = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    gn.gain.value = g;
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = 0.04;
    lg.gain.value = g * 0.25;
    lfo.connect(lg).connect(gn.gain);
    o.connect(gn).connect(lp);
    o.start();
    lfo.start();
    oscillators.push(o, lfo);
  });
  // light vinyl-ish noise
  const crackle = ctx.createGain();
  crackle.gain.value = 0.02;
  crackle.connect(gain);
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2500;
  bp.Q.value = 0.4;
  const src = loopNoise(ctx);
  src.connect(bp);
  bp.connect(crackle);

  gain.gain.setTargetAtTime(0.17, ctx.currentTime, 1);
  return {
    id: "life",
    gain,
    stop: () => {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
      try {
        src.stop();
      } catch {
        /* */
      }
      oscillators.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* */
        }
      });
    },
  };
}

function startBed(ctx: AudioContext, master: GainNode, id: BedId): BedVoice {
  switch (id) {
    case "rain":
      return startRain(ctx, master);
    case "quiet":
      return startQuietBed(ctx, master);
    case "build":
      return startBuildBed(ctx, master);
    case "try":
      return startTryBed(ctx, master);
    case "life":
      return startLifeBed(ctx, master);
  }
}

/**
 * Home-radio atmosphere: rain between stations, distinct bed per lock.
 * Must be constructed inside a user gesture (SOUND toggle).
 */
export function createRadioSound(): RadioSound {
  const ctx = audioContext();
  void unlock(ctx);
  const master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);

  let current: BedVoice | null = null;

  const crossfadeTo = (id: BedId) => {
    if (current?.id === id) return;
    const prev = current;
    current = startBed(ctx, master, id);
    if (prev) {
      prev.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.15);
      const dying = prev;
      window.setTimeout(() => dying.stop(), 600);
    }
  };

  crossfadeTo("rain");

  return {
    setBed: (locked) => {
      void unlock(ctx);
      crossfadeTo(locked ?? "rain");
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
      current?.stop();
      current = null;
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      window.setTimeout(() => void ctx.close(), 400);
    },
  };
}

/** @deprecated Prefer createRadioSound — kept for any leftover callers. */
export function makeStaticSound(): StaticSound {
  const radio = createRadioSound();
  return {
    level: (x) => {
      // Legacy: non-zero → rain, zero → keep rain quietly (beds handle lock now)
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
