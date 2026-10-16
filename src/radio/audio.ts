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
