import { useState } from "react";
import { Link } from "react-router-dom";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  BENCH,
  GADGET_SVG,
  TOOLS,
  TOOL_SHAPES,
  type BenchProject,
} from "../data/bench";

function isInternal(href: string) {
  return href.startsWith("/");
}

function BuildCard({ p }: { p: BenchProject }) {
  return (
    <>
      <header className="bc-head">
        <p className="bc-k">Build card</p>
        <h2>{p.name}</h2>
        <span className="bc-status">{p.status}</span>
      </header>
      <dl className="bc-grid">
        <div>
          <dt>What it is</dt>
          <dd>{p.what}</dd>
        </div>
        <div>
          <dt>Why I made it</dt>
          <dd className="bc-quote">{p.why}</dd>
        </div>
        {p.trick ? (
          <div>
            <dt>The trick</dt>
            <dd>{p.trick}</dd>
          </div>
        ) : null}
        <div>
          <dt>Built with</dt>
          <dd>
            {p.stack.length ? (
              <ul className="bc-stack">
                {p.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : (
              "From scratch."
            )}
          </dd>
        </div>
      </dl>
      <div className="bc-acts">
        {p.links.length ? (
          p.links.map(([label, href], k) =>
            isInternal(href) ? (
              <Link
                key={label}
                className={`bc-btn${k === 0 ? " primary" : ""}`}
                to={href}
              >
                {label}
              </Link>
            ) : (
              <a
                key={label}
                className={`bc-btn${k === 0 ? " primary" : ""}`}
                href={href}
                rel="noreferrer"
              >
                {label}
              </a>
            ),
          )
        ) : (
          <span className="bc-off">Private for now. No button to press.</span>
        )}
      </div>
    </>
  );
}

export default function TryRoom() {
  const [selected, setSelected] = useState(0);
  const p = BENCH[selected];

  const pick = (i: number, focus = false) => {
    setSelected(i);
    if (focus) {
      const btn = document.querySelectorAll<HTMLButtonElement>(".gadget")[i];
      btn?.focus();
    }
    if (matchMedia("(max-width: 860px)").matches) {
      document.getElementById("buildcard")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <StationStrip stationKey="try" />
      <div className="wrap bench-page">
        <header className="bp-head">
          <h1 className="reveal">I tinker.</h1>
          <p className="lede reveal">
            AI is how I explore different ideas and turn the good ones into
            something that runs. These are the things on my bench. Pick one up.
          </p>
        </header>

        <div className="workshop" id="workshop">
          <div className="pegboard" aria-label="Tools I reach for">
            {TOOLS.map((t, i) => (
              <span
                key={t}
                className={`tool${p.stack.includes(t) ? " lit" : ""}`}
                data-tool={t}
              >
                <svg
                  viewBox="0 0 42 48"
                  width={42}
                  height={48}
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{
                    __html: TOOL_SHAPES[i % TOOL_SHAPES.length],
                  }}
                />
                <b>{t}</b>
              </span>
            ))}
          </div>
          <div className="bench" role="group" aria-label="Projects on the bench">
            {BENCH.map((proj, i) => (
              <button
                key={proj.key}
                type="button"
                className={`gadget g-${proj.key}`}
                data-i={i}
                aria-pressed={i === selected}
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    pick((i + 1) % BENCH.length, true);
                  }
                  if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    pick((i - 1 + BENCH.length) % BENCH.length, true);
                  }
                }}
              >
                <svg
                  viewBox="0 0 100 80"
                  width={100}
                  height={80}
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: GADGET_SVG[proj.key] }}
                />
                <span>{proj.name}</span>
              </button>
            ))}
          </div>
        </div>

        <article className="buildcard" id="buildcard" aria-live="polite">
          <BuildCard p={p} />
        </article>

        <NextSide
          prev={{ key: "quiet", name: "Find a little quiet", label: "Back to" }}
          next={{ key: "life", name: "Off the clock" }}
        />
      </div>
    </>
  );
}
