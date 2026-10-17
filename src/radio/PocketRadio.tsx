import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { makeStaticSound } from "./audio";
import DeskScene from "./DeskScene";
import {
  BETWEEN,
  DIAL_MAX,
  KEY_ICONS,
  STATIONS,
  freqAt,
  type Station,
} from "./data/stations";
import { SKILLS, groupColor, spineH, spineW } from "./data/toolkit";
import { GADGET_SVG } from "./data/bench";

type SoundApi = ReturnType<typeof makeStaticSound>;

function nearest(x: number) {
  return STATIONS.reduce((a, s) =>
    Math.abs(s.at - x) < Math.abs(a.at - x) ? s : a,
  );
}

function StationPreview({ s }: { s: Station }) {
  const go = (
    <>
      <Link className="go" to={`/${s.key}`}>
        Go in <span aria-hidden="true">↵</span>
      </Link>
      <span className="go-hint">or press the key again</span>
    </>
  );
  let body: ReactNode;
  if (s.key === "build") {
    body = (
      <>
        <div className="mini mini-shelf" aria-hidden="true">
          {SKILLS.slice(0, 22).map((k) => (
            <i
              key={k.f + k.n}
              style={{
                width: Math.round(spineW(k.f) * 0.42),
                height: 46 + (spineH(k.f) - 150) / 3,
                background: groupColor(k.g),
              }}
            />
          ))}
        </div>
        <p className="pv-note">34 skills on the shelf. Pull one and read it.</p>
      </>
    );
  } else if (s.key === "quiet") {
    body = (
      <>
        <p className="pv-note">Nothing to do here. You can read, sit, or leave.</p>
        <p className="pv-drift" aria-hidden="true">
          …did I reply to that thread?
        </p>
      </>
    );
  } else if (s.key === "try") {
    body = (
      <>
        <div
          className="mini mini-bench"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: ["desk", "journal", "dojo", "radio"]
              .map(
                (k) =>
                  `<svg viewBox="0 0 100 80" width="100" height="80" aria-hidden="true">${GADGET_SVG[k]}</svg>`,
              )
              .join(""),
          }}
        />
        <p className="pv-note">Six things on the bench. Pick one up.</p>
      </>
    );
  } else {
    body = (
      <>
        <div className="mini mini-house" aria-hidden="true">
          <b className="mh-roof" />
          <span className="mh-k" />
          <span className="mh-b" />
          <span className="mh-r" />
          <span className="mh-d" />
        </div>
        <p className="pv-note">
          A Sunday at home. Family, food, and the brands I use.
        </p>
      </>
    );
  }
  return (
    <div className={`pv pv-${s.key}`}>
      <p className="pv-name">{s.name}</p>
      {body}
      <div className="pv-act">{go}</div>
    </div>
  );
}

export default function PocketRadio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tuneParam = searchParams.get("tune");
  const tuneTo = STATIONS.find((x) => x.key === tuneParam);

  const [v, setV] = useState(() =>
    tuneTo ? tuneTo.at : Number(sessionStorage.getItem("dial") ?? 80),
  );
  const [touched, setTouched] = useState(!!tuneTo);
  const [gliding, setGliding] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const vRef = useRef(v);
  const lockedRef = useRef<Station | null>(null);
  const soundRef = useRef<SoundApi | null>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const knobStart = useRef<{ x: number; y: number; v: number } | null>(null);
  const reduceMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  );

  const locked =
    Math.abs(nearest(v).at - v) <= 6 ? nearest(v) : null;

  useEffect(() => {
    vRef.current = v;
  }, [v]);

  useEffect(() => {
    if (locked?.key !== lockedRef.current?.key) {
      if (locked) soundRef.current?.click();
      lockedRef.current = locked;
    }
    document.body.dataset.tuned = locked ? locked.key : "";
    sessionStorage.setItem("dial", String(v));
    soundRef.current?.level(
      locked ? 0 : Math.min(1, Math.abs(nearest(v).at - v) / 30),
    );
  }, [v, locked]);

  const apply = useCallback((nv: number, { snap = false } = {}) => {
    let next = Math.max(0, Math.min(DIAL_MAX, nv));
    const n = nearest(next);
    if (snap && Math.abs(n.at - next) <= 22) next = n.at;
    setV(next);
  }, []);

  const goIn = useCallback(
    (st: Station) => {
      navigate(`/${st.key}`);
    },
    [navigate],
  );

  // canvas static
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.getContext("2d");
    if (!cx) return;
    let raf = 0;
    const draw = () => {
      if (!lockedRef.current && !reduceMotion.current.matches) {
        const img = cx.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < img.data.length; i += 4) {
          const g = Math.random() * 90;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
          img.data[i + 3] = 255;
        }
        cx.putImageData(img, 0, 0);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // first-visit needle sweep
  useEffect(() => {
    if (tuneTo || sessionStorage.getItem("swept") || reduceMotion.current.matches)
      return;
    sessionStorage.setItem("swept", "1");
    const start = vRef.current;
    setGliding(true);
    apply(start - 16);
    const t = setTimeout(() => {
      apply(start);
      setGliding(false);
    }, 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keyboard 1-4
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement).closest(
          "input, textarea, [contenteditable]",
        ) ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      )
        return;
      const n = Number(e.key);
      if (n >= 1 && n <= STATIONS.length) {
        const st = STATIONS[n - 1];
        e.preventDefault();
        if (lockedRef.current && lockedRef.current.at === st.at) {
          goIn(st);
          return;
        }
        setTouched(true);
        setGliding(true);
        apply(st.at);
        setTimeout(() => setGliding(false), 500);
      } else if (
        e.key === "Enter" &&
        lockedRef.current &&
        e.target === document.body
      ) {
        e.preventDefault();
        goIn(lockedRef.current);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [apply, goIn]);

  useEffect(() => {
    return () => {
      soundRef.current?.stop();
      soundRef.current = null;
      delete document.body.dataset.tuned;
    };
  }, []);

  const fromPointer = (e: React.PointerEvent) => {
    const band = bandRef.current!;
    const r = band.getBoundingClientRect();
    const vertical = r.height > r.width;
    return (
      ((vertical ? e.clientY - r.top : e.clientX - r.left) /
        (vertical ? r.height : r.width)) *
      DIAL_MAX
    );
  };

  const betweenLine =
    !locked && touched
      ? [...BETWEEN].reverse().find(([a]) => v >= a)?.[1] ?? ""
      : "";

  const ticks = Array.from({ length: DIAL_MAX / 4 + 1 }, (_, i) => (
    <i
      key={i}
      style={{ "--p": `${((i * 4) / DIAL_MAX) * 100}%` } as CSSProperties}
      className={i % 10 === 0 ? "maj" : i % 2 === 0 ? "mid" : ""}
    />
  ));

  return (
    <div className="home home-scene">
      <div className="radio-stage">
        <DeskScene />
        <div className="scene-content">
          <header className="scene-narrative">
            <h1 id="who" className="scene-brand">
              Debjeet
            </h1>
            <p className="scene-headline">Tune in.</p>
            <p className="scene-support">
              Product at Rippling · Bengaluru
            </p>
          </header>

          <section
            className={`radio${gliding ? " gliding" : ""}${dragging ? " dragging" : ""}`}
            aria-labelledby="who"
            id="radio"
            data-locked={locked?.key ?? ""}
            data-idle={String(!locked && !touched)}
          >
            <div className="r-top">
              <div className="screen">
                <div className="readout">
                  <span className="led" aria-hidden="true" />
                  <b id="freq">{freqAt(v)}</b>
                  <span>MHz</span>
                  <span className="fm" aria-hidden="true">
                    <i>MW</i>
                    <i>SW</i>
                    <em>FM</em>
                  </span>
                </div>
                <canvas
                  className="static"
                  id="static"
                  ref={canvasRef}
                  width={160}
                  height={100}
                  aria-hidden="true"
                />
                <div className="scan" aria-hidden="true" />
                <div className="idle">
                  <p className="idle-freq" aria-hidden="true">
                    <span id="idle-freq">{freqAt(v)}</span>
                    <small>MHz</small>
                  </p>
                  <p className="idle-list">
                    {STATIONS.map((x) => (
                      <span key={x.key}>
                        {x.freq} {x.short}
                      </span>
                    ))}
                  </p>
                  <p className="idle-hint">Dial · keys 1–4 · go in</p>
                </div>
                <p className="between" id="between" aria-live="polite">
                  {betweenLine}
                </p>
                <div className="preview" id="preview" aria-live="polite">
                  {locked ? <StationPreview s={locked} /> : null}
                </div>
              </div>
              <div className="side-col">
                <div className="badge">
                  <span className="badge-name">DS–1</span>
                  <span>Bengaluru</span>
                </div>
                <div className="grille" aria-hidden="true" />
              </div>
            </div>

          <div
            className="band"
            id="band"
            ref={bandRef}
            role="slider"
            tabIndex={0}
            aria-label="Tuning dial. Arrow keys move, Page Up and Down jump between stations, Enter goes in."
            aria-valuemin={0}
            aria-valuemax={DIAL_MAX}
            aria-valuenow={Math.round(v)}
            aria-valuetext={
              locked
                ? `${locked.name}, ${locked.freq}`
                : `Between stations, ${freqAt(v)}`
            }
            onPointerDown={(e) => {
              setDragging(true);
              setTouched(true);
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              apply(fromPointer(e));
            }}
            onPointerMove={(e) => {
              if (dragging) apply(fromPointer(e));
            }}
            onPointerUp={() => {
              if (!dragging) return;
              setDragging(false);
              apply(vRef.current, { snap: true });
            }}
            onPointerCancel={() => {
              if (!dragging) return;
              setDragging(false);
              apply(vRef.current, { snap: true });
            }}
            onKeyDown={(e) => {
              setTouched(true);
              const order = STATIONS.map((s) => s.at);
              const nextAt = order.find((a) => a > v + 1);
              const prevAt = [...order].reverse().find((a) => a < v - 1);
              const map: Record<string, number> = {
                ArrowRight: v + 8,
                ArrowUp: v + 8,
                ArrowLeft: v - 8,
                ArrowDown: v - 8,
                PageUp: nextAt ?? v,
                PageDown: prevAt ?? v,
                Home: 0,
                End: DIAL_MAX,
              };
              if (e.key in map) {
                e.preventDefault();
                apply(map[e.key]);
              }
              if (e.key === "Enter" && locked) {
                e.preventDefault();
                goIn(locked);
              }
            }}
          >
            <div className="ticks" aria-hidden="true">
              {ticks}
            </div>
            <div className="nums" aria-hidden="true">
              {STATIONS.map((s) => (
                <span
                  key={s.key}
                  style={
                    { "--p": `${(s.at / DIAL_MAX) * 100}%` } as CSSProperties
                  }
                >
                  {s.freq}
                </span>
              ))}
            </div>
            <div className="marks" aria-hidden="true">
              {STATIONS.map((s) => (
                <b
                  key={s.key}
                  style={
                    { "--p": `${(s.at / DIAL_MAX) * 100}%` } as CSSProperties
                  }
                />
              ))}
            </div>
            <div
              className="needle"
              id="needle"
              aria-hidden="true"
              style={{ "--p": `${(v / DIAL_MAX) * 100}%` } as CSSProperties}
            />
          </div>

          <div className="r-bottom">
            <div className="keys" role="group" aria-label="Station presets">
              {STATIONS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  className="key"
                  data-at={s.at}
                  aria-pressed={!!locked && locked.at === s.at}
                  aria-label={`${s.name}, ${s.freq}. Press again to go in.`}
                  onClick={() => {
                    if (locked && locked.at === s.at) {
                      goIn(s);
                      return;
                    }
                    setTouched(true);
                    setGliding(true);
                    apply(s.at);
                    setTimeout(() => setGliding(false), 500);
                  }}
                >
                  <i className="kled" aria-hidden="true" />
                  <small aria-hidden="true">{i + 1}</small>
                  <span className="short" aria-hidden="true">
                    <svg
                      className="kicon"
                      viewBox="0 0 16 16"
                      width={16}
                      height={16}
                      dangerouslySetInnerHTML={{ __html: KEY_ICONS[s.key] }}
                    />
                    {s.short}
                  </span>
                </button>
              ))}
            </div>
            <div className="knob-well">
              <div
                className="knob"
                id="knob"
                aria-hidden="true"
                style={
                  {
                    "--r": `${(v / DIAL_MAX) * 300 - 150}deg`,
                  } as CSSProperties
                }
                onPointerDown={(e) => {
                  knobStart.current = {
                    x: e.clientX,
                    y: e.clientY,
                    v: vRef.current,
                  };
                  setTouched(true);
                  (e.target as HTMLElement).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!knobStart.current) return;
                  apply(
                    knobStart.current.v +
                      (e.clientX - knobStart.current.x) -
                      (e.clientY - knobStart.current.y),
                  );
                }}
                onPointerUp={() => {
                  if (knobStart.current) {
                    knobStart.current = null;
                    apply(vRef.current, { snap: true });
                  }
                }}
                onPointerCancel={() => {
                  if (knobStart.current) {
                    knobStart.current = null;
                    apply(vRef.current, { snap: true });
                  }
                }}
              >
                <span />
              </div>
              <span className="silk" aria-hidden="true">
                Tune
              </span>
            </div>
          </div>

          <div className="plate-row">
            <div className="switch-well">
              <span className="silk">Sound</span>
              <span className="sw-track">
                <span className="silk" aria-hidden="true">
                  Off
                </span>
                <button
                  type="button"
                  className="switch"
                  id="radio-sound"
                  role="switch"
                  aria-checked={soundOn}
                  aria-label="Sound"
                  onClick={() => {
                    if (soundRef.current) {
                      soundRef.current.stop();
                      soundRef.current = null;
                      setSoundOn(false);
                      return;
                    }
                    soundRef.current = makeStaticSound();
                    soundRef.current.level(locked ? 0 : 0.6);
                    setSoundOn(true);
                  }}
                >
                  <span className="thumb" aria-hidden="true" />
                </button>
                <span className="silk" aria-hidden="true">
                  On
                </span>
              </span>
            </div>
            <p className="silk key-hint" id="key-hint">
              Press <kbd>1</kbd>–<kbd>4</kbd> to tune · press again or{" "}
              <kbd>Enter</kbd> to go in
            </p>
          </div>
          </section>

          <p className="scene-blotter">
            <Link to="/contact">Say hello</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
