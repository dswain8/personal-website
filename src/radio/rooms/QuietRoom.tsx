import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  isDroneOn,
  setDroneVolume,
  startDrone,
  stopDrone,
} from "../audio";

const SCENES: [string, string, string][] = [
  ["flight", "Long flight", "Long flight. Nobody can reach me. The best kind of stuck."],
  ["car", "In the car", "In the car. Same road, no notifications."],
  ["bedroom", "Bedroom", "Bedroom. Door closed, lights low."],
];

const THOUGHTS = [
  ["did I reply to that thread?", "I should just check Slack", "one quick look", "…twenty minutes later"],
  ["that side-project bug", "I could fix it tonight", "one more prompt", "it is now 1 a.m."],
  ["dinner?", "that place with the filter coffee", "is it open on Mondays", "now I'm hungry"],
  ["am I doing this right?", "other people are probably better at this", "I should read more about it", "and that's another thought"],
  ["what was that song", "the one from the car", "humming it now", "it's going to be stuck all day"],
  ["one more email before I sit", "okay, two", "this one needs a doc", "the doc needs a meeting"],
  ["boarding in forty minutes", "do I have the charger", "check the bag again", "it was in the bag"],
];

const THOUGHT_POS = [
  [6, 12],
  [54, 22],
  [26, 38],
  [70, 50],
  [40, 64],
  [12, 76],
  [60, 84],
];

export default function QuietRoom() {
  const [scene, setScene] = useState(SCENES[0][0]);
  const [state, setState] = useState<"watching" | "carried">("watching");
  const [chain, setChain] = useState<string[]>([]);
  const [showComeBack, setShowComeBack] = useState(false);
  const returnsRef = useRef(0);
  const [meta, setMeta] = useState(SCENES[0][2]);
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
          <h1 className="reveal">Nothing to do here.</h1>
          <p className="lede reveal">
            You can read, sit for a minute, or leave. All three are fine.
          </p>
          <a className="down reveal" href="#watch">
            Scroll, or skip to the thoughts <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="q-sec" aria-labelledby="isnt">
          <p className="kicker" id="isnt">
            What this is
          </p>
          <p>I&apos;m not a teacher, and I haven&apos;t figured this out.</p>
          <p>
            What I practise is simple to say: watch thoughts without getting
            carried off by them.
          </p>
          <p>
            Most days I get carried off. Then I notice, and come back. That&apos;s
            the practice so far.
          </p>
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
          There&apos;s one thing to do here. Thoughts drift past and you don&apos;t
          have to do anything with them. If you click one, you&apos;ll follow it.
          That&apos;s fine too. Come back when you notice.
        </p>
        <div className="scenes" role="group" aria-label="Scene">
          <span className="scenes-k">Scene</span>
          {SCENES.map(([k, n], i) => (
            <button
              key={k}
              type="button"
              data-scene={k}
              aria-pressed={scene === k}
              onClick={() => {
                setScene(k);
                if (state === "watching") setMeta(SCENES[i][2]);
                poke();
              }}
            >
              {n}
            </button>
          ))}
        </div>
        <div
          className={`field${reduceMotion.current.matches ? " still-mode" : ""}`}
          id="field"
          ref={fieldRef}
          data-state={state}
          data-scene={scene}
          onKeyDown={(e) => {
            if (e.key === "Escape" && state === "carried") back();
          }}
          onPointerDown={poke}
        >
          <div className="scene-art" aria-hidden="true" />
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
          <span className="tag">Sample thoughts, written for this prototype</span>
        </div>
      </section>

      <div className="q">
        <section className="q-sec" aria-labelledby="where">
          <p className="kicker" id="where">
            About the scenes
          </p>
          <p>
            None of them is harder. It gets easier in some places, and it&apos;s
            less about the place than having room to attend to one thing.
          </p>
        </section>

        <section className="q-sec" aria-labelledby="voices">
          <p className="kicker" id="voices">
            Voices I keep returning to
          </p>
          <p className="small">
            I&apos;m a listener here, not a student of any one of them.
          </p>
          <ul className="voices">
            <li>
              <a href="https://www.youtube.com/@sadhguru" rel="noreferrer">
                <span>Sadhguru</span>
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@Dandapani" rel="noreferrer">
                <span>Dandapani</span>
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@VedantaNY" rel="noreferrer">
                <span>Swami Sarvapriyananda</span>
                <span>Vedanta Society of New York, YouTube</span>
              </a>
            </li>
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
            , from Isha. Probably the strongest thing in my routine. For simpler
            guided sessions,{" "}
            <a className="textlink" href="https://www.thinkright.me" rel="noreferrer">
              Think Right
            </a>
            .
          </p>
        </section>

        <section className="q-sec" aria-labelledby="sound-h">
          <p className="kicker" id="sound-h">
            What&apos;s playing
          </p>
          <p>Depends on the mood. I won&apos;t pretend it&apos;s always the first one.</p>
          <div className="moods">
            <div>
              <b>Silence</b>
              <small>Most of the time on this page.</small>
            </div>
            <div>
              <b>Spiritual music</b>
              <small>When I want company.</small>
            </div>
            <div>
              <b>Bollywood chartbusters</b>
              <small>Loud. Also counts.</small>
            </div>
          </div>
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
              {droneOn ? "Sound is on · turn off" : "Sound is off"}
            </button>
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
            <p>
              A low drone your browser generates when you turn it on. No
              recording, no music, nothing licensed. It stops when you leave this
              page.
            </p>
          </div>
        </section>

        <section
          className="q-sec"
          aria-labelledby="notes-h"
          style={{ paddingBottom: 40 }}
        >
          <p className="kicker" id="notes-h">
            Notes
          </p>
          <div className="empty-note">
            <span className="tag">Concept · nothing published</span>
            <p className="small">
              Short notes, when something is worth writing down. I don&apos;t write
              regularly, so this stays empty until I do. Better empty than
              padded.
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
