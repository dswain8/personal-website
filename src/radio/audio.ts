type StaticSound = {
  level: (x: number) => void;
  click: () => void;
  stop: () => void;
};

type DroneState = {
  ctx: AudioContext;
  master: GainNode;
};

let drone: DroneState | null = null;

export function makeStaticSound(): StaticSound {
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new AudioCtx();
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1800;
  bp.Q.value = 0.6;
  const g = ctx.createGain();
  g.gain.value = 0;
  src.connect(bp).connect(g).connect(ctx.destination);
  src.start();
  return {
    level: (x) => g.gain.setTargetAtTime(x * 0.05, ctx.currentTime, 0.05),
    click: () => {
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.frequency.value = 1200;
      og.gain.setValueAtTime(0.04, ctx.currentTime);
      og.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      o.connect(og).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.07);
    },
    stop: () => {
      g.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      setTimeout(() => void ctx.close(), 300);
    },
  };
}

/**
 * Soft calm pad for Quiet — synthesized in-browser (no audio file, no license).
 * Stacked around 432 Hz with a slow breath-like swell (~0.12 Hz).
 * API name kept as "drone" so RadioShell can still stop it on leave.
 */
export function startDrone(v: number) {
  stopDrone();
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new AudioCtx();
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
