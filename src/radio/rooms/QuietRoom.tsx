import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  isDroneOn,
  setDroneVolume,
  startDrone,
  stopDrone,
} from "../audio";
import {
  STARS,
  THOUGHTS,
  THOUGHT_POS,
  VOICES,
} from "../data/quiet";

export default function QuietRoom() {
  const [state, setState] = useState<"watching" | "carried">("watching");
  const [chain, setChain] = useState<string[]>([]);
  const [showComeBack, setShowComeBack] = useState(false);
  const returnsRef = useRef(0);
  const [meta, setMeta] = useState(
    "You are the observer. The thoughts are not you.",
  );
  const [droneOn, setDroneOn] = useState(false);
  const [vol, setVol] = useState(30);
  const timers = useRef<number[]>([]);
  const lastBtn = useRef<HTMLButtonElement | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const noted = useRef(false);
  const inView = useRef(false);
  const idleT = useRef<number | null>(null);
  const reduceMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  );

  useEffect(() => () => stopDrone(), []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const poke = () => {
    if (idleT.current) clearTimeout(idleT.current);
    if (!noted.current && inView.current) {
      idleT.current = window.setTimeout(() => {
        if (state !== "watching" || !document.getElementById("field")) return;
        noted.current = true;
        setMeta(
          "A whole minute of watching without following anything. That's the game.",
        );
      }, 60000);
    }
  };

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting;
        poke();
      },
      { threshold: 0.5 },
    );
    io.observe(field);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const back = () => {
    clearTimers();
    setState("watching");
    setChain([]);
    setShowComeBack(false);
    returnsRef.current += 1;
    const n = returnsRef.current;
    setMeta(
      n === 1
        ? "You came back once. That's the whole practice, as far as I can tell."
        : `You came back ${n} times. Still no score.`,
    );
    lastBtn.current?.focus();
    poke();
  };

  const followThought = (i: number, btn: HTMLButtonElement) => {
    lastBtn.current = btn;
    const links = THOUGHTS[i];
    clearTimers();
    setState("carried");
    setChain([]);
    setShowComeBack(false);
    const step = reduceMotion.current.matches ? 0 : 1100;
    links.forEach((t, idx) => {
      timers.current.push(
        window.setTimeout(() => {
          setChain((c) => [...c, t]);
        }, idx * step),
      );
    });
    timers.current.push(
      window.setTimeout(
        () => setShowComeBack(true),
        links.length * step + (step ? 300 : 0),
      ),
    );
  };

  return (
    <>
      <StationStrip stationKey="quiet" />
      <div className="q">
        <section className="q-open">
          <h1 className="reveal">Quiet</h1>
          <p className="lede reveal">
            You are the observer, not the thoughts. They drift through. Watch,
            or follow one — then come back when you notice.
          </p>
          <a className="down reveal" href="#watch">
            Enter the field <span aria-hidden="true">↓</span>
          </a>
        </section>
      </div>

      <section
        className="field-wrap"
        id="watch"
        aria-labelledby="watch-h"
        style={{ scrollMarginTop: 90 }}
      >
        <h2 className="sr" id="watch-h">
          Watching thoughts
        </h2>
        <p className="field-hint">
          Thoughts float past like distant light. You don&apos;t have to catch
          them. If you click one, you&apos;ll follow it. Come back when you
          notice.
        </p>
        <div
          className={`field${reduceMotion.current.matches ? " still-mode" : ""}`}
          id="field"
          ref={fieldRef}
          data-state={state}
          onKeyDown={(e) => {
            if (e.key === "Escape" && state === "carried") back();
          }}
          onPointerDown={poke}
        >
          <div className="cosmos" aria-hidden="true">
            <div className="cosmos-deep" />
            <div className="cosmos-milky" />
            <div className="cosmos-glow" />
            {STARS.map((star, i) => (
              <span
                key={i}
                className="cosmos-star"
                style={
                  {
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    ["--s"]: star.s,
                    ["--d"]: `${star.d}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          {THOUGHTS.map((t, i) => (
            <button
              key={i}
              type="button"
              className="thought"
              data-i={i}
              style={
                {
                  ["--x"]: `${THOUGHT_POS[i][0]}%`,
                  ["--y"]: `${THOUGHT_POS[i][1]}%`,
                  ["--dur"]: `${32 + (i % 4) * 7}s`,
                  ["--delay"]: `-${(i * 13) % 40}s`,
                } as CSSProperties
              }
              onClick={(e) => followThought(i, e.currentTarget)}
            >
              {t[0]}
            </button>
          ))}
          <div className="chain" id="chain" aria-live="polite">
            {chain.map((t, i) => (
              <p key={`${i}-${t}`}>{t}</p>
            ))}
            {showComeBack ? (
              <button
                type="button"
                className="come-back"
                autoFocus
                onClick={back}
              >
                Oh. Come back
              </button>
            ) : null}
          </div>
        </div>
        <div className="field-meta">
          <p id="returns" aria-live="polite">
            {meta}
          </p>
        </div>
      </section>

      <div className="q">
        <section className="q-sec q-sec-tight" aria-labelledby="voices">
          <p className="kicker" id="voices">
            Voices I keep returning to
          </p>
          <p className="small">
            I&apos;m a listener here, not a student of any one of them.
          </p>
          <ul className="voices">
            {VOICES.map((v) => (
              <li key={v.href}>
                <a href={v.href} rel="noreferrer">
                  <span>{v.name}</span>
                  <span>{v.note}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="small" style={{ marginTop: 28 }}>
            Practice I return to:{" "}
            <a
              className="textlink"
              href="https://www.ishafoundation.org/inner-engineering"
              rel="noreferrer"
            >
              Shambhavi Mahamudra
            </a>
            , from Isha. For simpler guided sessions,{" "}
            <a
              className="textlink"
              href="https://www.thinkright.me"
              rel="noreferrer"
            >
              Think Right
            </a>
            .
          </p>
        </section>

        <section
          className="q-sec q-sec-tight"
          aria-labelledby="sound-h"
          style={{ paddingBottom: 40 }}
        >
          <p className="kicker" id="sound-h">
            What&apos;s playing
          </p>
          <p>Silence, most of the time. Optional: a low browser drone.</p>
          <div className="sound">
            <button
              type="button"
              id="drone"
              aria-pressed={droneOn}
              onClick={() => {
                if (isDroneOn()) {
                  stopDrone();
                  setDroneOn(false);
                } else {
                  startDrone(vol / 100);
                  setDroneOn(true);
                }
              }}
            >
              {droneOn ? "Drone on · turn off" : "Turn on drone"}
            </button>
            {droneOn ? (
              <label htmlFor="vol">
                Volume{" "}
                <input
                  id="vol"
                  type="range"
                  min={0}
                  max={100}
                  value={vol}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setVol(v);
                    setDroneVolume(v / 100);
                  }}
                />
              </label>
            ) : null}
            <p>
              Generated in your browser. No recording. Stops when you leave.
            </p>
          </div>
        </section>
        <NextSide
          prev={{ key: "build", name: "Build something", label: "Back to" }}
          next={{ key: "try", name: "Try what I've made" }}
        />
      </div>
    </>
  );
}
