import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  isDroneOn,
  setDroneVolume,
  startDrone,
  stopDrone,
} from "../audio";
import { STARS, THOUGHTS, THOUGHT_POS } from "../data/quiet";

export default function QuietRoom() {
  const [state, setState] = useState<"watching" | "carried">("watching");
  const [chain, setChain] = useState<string[]>([]);
  const [showComeBack, setShowComeBack] = useState(false);
  const returnsRef = useRef(0);
  const [meta, setMeta] = useState("");
  const [droneOn, setDroneOn] = useState(false);
  const [vol, setVol] = useState(30);
  const [hintOn, setHintOn] = useState(true);
  const [returned, setReturned] = useState(false);
  const [watchKey, setWatchKey] = useState(0);
  const timers = useRef<number[]>([]);
  const lastBtn = useRef<HTMLButtonElement | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const noted = useRef(false);
  const inView = useRef(false);
  const idleT = useRef<number | null>(null);
  const litT = useRef<number | null>(null);
  const reduceMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)"),
  );

  useEffect(() => () => stopDrone(), []);

  useEffect(() => {
    const t = window.setTimeout(() => setHintOn(false), 7000);
    return () => clearTimeout(t);
  }, []);

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
    setReturned(true);
    setWatchKey((k) => k + 1);
    if (litT.current) clearTimeout(litT.current);
    litT.current = window.setTimeout(() => setReturned(false), 2200);
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
    setHintOn(false);
    const step = reduceMotion.current.matches ? 0 : 1400;
    setChain([links[0]]);
    links.slice(1).forEach((t, idx) => {
      timers.current.push(
        window.setTimeout(() => {
          setChain((c) => [...c, t]);
        }, (idx + 1) * step),
      );
    });
    timers.current.push(
      window.setTimeout(
        () => setShowComeBack(true),
        links.length * step + (step ? 400 : 0),
      ),
    );
  };

  const playTone = () => {
    startDrone(vol / 100);
    setDroneOn(true);
  };

  const silence = () => {
    stopDrone();
    setDroneOn(false);
  };

  const depth = chain.length;
  const currentThought = chain[chain.length - 1] ?? "";

  return (
    <>
      <StationStrip stationKey="quiet" />
      <section
        className="field-wrap"
        id="watch"
        aria-labelledby="watch-h"
      >
        <h2 className="sr" id="watch-h">
          Watching thoughts
        </h2>
        <div
          className={`field${reduceMotion.current.matches ? " still-mode" : ""}`}
          id="field"
          ref={fieldRef}
          data-state={state}
          onKeyDown={(e) => {
            if (e.key === "Escape" && state === "carried") back();
          }}
          onPointerDown={() => {
            setHintOn(false);
            poke();
          }}
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
          <div
            className={`still-point${returned ? " lit" : ""}`}
            aria-hidden="true"
          >
            <span key={watchKey} className="still-ring" />
          </div>
          <h1 className="field-title">You are the observer.</h1>
          <p className={`field-hint${hintOn ? "" : " is-gone"}`}>
            Thoughts drift through. You don&apos;t have to catch them. Click
            one to follow it. Come back when you notice.
          </p>
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
            {currentThought ? (
              <p key={`${depth}-${currentThought}`} data-depth={depth}>
                {currentThought}
              </p>
            ) : null}
            {showComeBack ? (
              <button
                type="button"
                className="come-back"
                autoFocus
                onClick={back}
              >
                Come back
              </button>
            ) : null}
          </div>
          <p
            className={`field-note${meta ? "" : " sr"}`}
            id="returns"
            aria-live="polite"
          >
            {meta}
          </p>
          <div className="field-sound" role="group" aria-label="Sound">
            <button
              type="button"
              aria-pressed={!droneOn}
              onClick={silence}
            >
              Silence
            </button>
            <button
              type="button"
              id="calm-tone"
              aria-pressed={droneOn}
              aria-label="Turn on a little music"
              onClick={() => {
                if (!isDroneOn()) playTone();
              }}
            >
              A little music
            </button>
            {droneOn ? (
              <label htmlFor="vol">
                <span className="sr">Volume</span>
                <input
                  id="vol"
                  type="range"
                  min={0}
                  max={100}
                  value={vol}
                  aria-label="Volume"
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setVol(v);
                    setDroneVolume(v / 100);
                  }}
                />
              </label>
            ) : null}
          </div>
        </div>
      </section>

      <div className="q">
        <p className="q-practice">
          Practice I return to:{" "}
          <a
            className="textlink"
            href="https://www.ishafoundation.org/inner-engineering"
            rel="noreferrer"
          >
            Shambhavi Mahamudra
          </a>
          , from Isha.
        </p>
        <NextSide
          prev={{ key: "build", name: "Build something", label: "Back to" }}
          next={{ key: "try", name: "Try what I've made" }}
        />
      </div>
    </>
  );
}
