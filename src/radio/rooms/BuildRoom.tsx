import { useEffect, useMemo, useRef, useState } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import { renderMd } from "../markdown";
import {
  CLAUDE_SHAPED,
  SKILL_LINES,
  SKILLS,
  START3,
  TOOLKIT,
  groupColor,
  spineH,
  spineW,
  type Skill,
} from "../data/toolkit";

const cache: Record<string, string> = {};

export default function BuildRoom() {
  const [query, setQuery] = useState("");
  const [forward, setForward] = useState<string | null>(null);
  const [travelsOnly, setTravelsOnly] = useState(false);
  const [current, setCurrent] = useState<string>(START3[0]);
  const [bodyHtml, setBodyHtml] = useState("<p class=\"rd-load\">Loading…</p>");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [rawText, setRawText] = useState("");
  const readerRef = useRef<HTMLElement>(null);
  const bookcaseRef = useRef<HTMLDivElement>(null);

  const skill = SKILLS.find((x) => x.f === current)!;
  const total = SKILLS.length;

  const dimSet = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (!t) return new Set<string>();
    const dim = new Set<string>();
    SKILLS.forEach((s) => {
      const hit = `${s.n} ${s.d} ${s.w} ${s.g} ${s.f}`
        .toLowerCase()
        .includes(t);
      if (!hit) dim.add(s.f);
    });
    return dim;
  }, [query]);

  const filtering = Boolean(query.trim() || forward || travelsOnly);

  const visibleCount = useMemo(() => {
    return SKILLS.filter((s) => {
      if (query.trim() && dimSet.has(s.f)) return false;
      if (travelsOnly && CLAUDE_SHAPED.has(s.f)) return false;
      if (forward && s.g !== forward) return false;
      return true;
    }).length;
  }, [dimSet, forward, query, travelsOnly]);

  useEffect(() => {
    let cancelled = false;
    setBodyHtml('<p class="rd-load">Loading…</p>');
    (async () => {
      try {
        cache[current] ??= await fetch(`/skills-clean/${current}`).then(
          (r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.text();
          },
        );
        if (cancelled) return;
        const txt = cache[current];
        setRawText(txt);
        setBodyHtml(
          current.endsWith(".py")
            ? `<pre><code>${txt
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")}</code></pre>`
            : renderMd(txt),
        );
      } catch {
        if (cancelled) return;
        setBodyHtml(
          `<p>Couldn't load this file. <a class="textlink" href="/skills-clean/${current}">Open it directly</a>.</p>`,
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [current]);

  const open = (f: string, focus = false) => {
    setCurrent(f);
    setCopyLabel("Copy");
    if (focus && matchMedia("(max-width: 860px)").matches) {
      readerRef.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }
  };

  const onBookcaseKey = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key))
      return;
    const books = [
      ...(bookcaseRef.current?.querySelectorAll(".book:not(.back)") ?? []),
    ] as HTMLButtonElement[];
    const i = books.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const n =
      books[
        Math.max(
          0,
          Math.min(
            books.length - 1,
            i + (["ArrowRight", "ArrowDown"].includes(e.key) ? 1 : -1),
          ),
        )
      ];
    n.focus();
    open(n.dataset.f!, true);
  };

  return (
    <>
      <StationStrip stationKey="build" />
      <div className="wrap build3">
        <header className="b3-head">
          <h1 className="reveal">The harness changes. The skills stay.</h1>
          <p className="lede reveal">
            Anything I repeat becomes a skill: a plain file that fires when I
            describe the task. Here are all {total} of mine. A few still assume
            Claude Code. The rest travel. Read any of them before you take it.
          </p>
          <p className="b3-harness reveal" aria-label="Harnesses in rotation">
            <span>Codex</span>
            <i aria-hidden="true" />
            <span>Claude Code</span>
            <i aria-hidden="true" />
            <span>Cursor</span>
          </p>
        </header>

        <section className="pass" aria-labelledby="pass-h">
          <h2 id="pass-h">One pass</h2>
          <div className="pass-body">
            <figure className="pass-draft">
              <figcaption>The draft</figcaption>
              <blockquote>
                <p>
                  Excited to share an update on the launch. We&apos;ve been
                  working hard and think this will be a great unlock for the
                  team. Let me know your thoughts.
                </p>
              </blockquote>
            </figure>
            <div className="pass-score">
              <p>
                <b>Review fires.</b> A different model scores the same seven
                checks.
              </p>
              <ol>
                <li data-fail>
                  <span>Point up front</span>
                  <em>Buried.</em>
                </li>
                <li data-fail>
                  <span>Specific</span>
                  <em>No date, no name.</em>
                </li>
                <li data-fail>
                  <span>Recommendation</span>
                  <em>None.</em>
                </li>
                <li>
                  <span>Matches the reader</span>
                  <em>Could.</em>
                </li>
                <li data-fail>
                  <span>Tradeoffs</span>
                  <em>Unnamed.</em>
                </li>
                <li data-fail>
                  <span>Assumptions</span>
                  <em>Unnamed.</em>
                </li>
                <li data-fail>
                  <span>Closes with an action</span>
                  <em>Thoughts?</em>
                </li>
              </ol>
            </div>
            <figure className="pass-rewrite">
              <figcaption>The rewrite</figcaption>
              <blockquote>
                <p>
                  Ship the shared draft Thursday. Design owns the empty state;
                  I own the note. The cost is slipping Friday&apos;s demo. I
                  need a yes on the date by noon.
                </p>
              </blockquote>
            </figure>
          </div>
          <p className="pass-next">
            If I do that twice, Friday writes it down as the next skill.
          </p>
        </section>

        <section className="lib" id="library" aria-labelledby="lib-h">
          <div className="lib-top">
            <h2 id="lib-h">
              The library{" "}
              <span className="lib-count" id="lib-count">
                {filtering ? `${visibleCount} of ${total}` : `${total} skills`}
              </span>
            </h2>
            <label className="lib-search">
              <span className="sr">Search skills</span>
              <input
                id="lib-q"
                type="search"
                placeholder="Search: meeting, review, Slack…"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="lib-tools">
            <p className="lib-legend">
              Click a plaque to bring that shelf forward. A thicker spine means
              a longer file. A gold band means the file still assumes Claude
              Code.
            </p>
            <button
              type="button"
              className="lib-travels"
              aria-pressed={travelsOnly}
              onClick={() => {
                setTravelsOnly((on) => {
                  const next = !on;
                  if (next && CLAUDE_SHAPED.has(current)) setCurrent(START3[0]);
                  return next;
                });
              }}
            >
              What travels
            </button>
          </div>
          <div className="lib-body">
            <div
              className="bookcase"
              id="bookcase"
              ref={bookcaseRef}
              role="group"
              aria-label="Bookcase of skills"
              onKeyDown={onBookcaseKey}
            >
              <div className="face-out" aria-label="Start here">
                <p className="fo-k">Start here</p>
                {START3.map((f) => {
                  const s = SKILLS.find((x) => x.f === f)!;
                  return (
                    <BookButton
                      key={`cover-${f}`}
                      skill={s}
                      cover
                      stays={CLAUDE_SHAPED.has(f)}
                      pressed={current === f}
                      back={
                        current !== f &&
                        ((travelsOnly && CLAUDE_SHAPED.has(f)) ||
                          (forward !== null && s.g !== forward) ||
                          dimSet.has(f))
                      }
                      onOpen={() => open(f, true)}
                    />
                  );
                })}
              </div>
              {TOOLKIT.map(({ g, items }) => (
                <div
                  key={g}
                  className={`shelf-group${forward === g ? " forward" : ""}`}
                  aria-label={g}
                >
                  <div className="books">
                    {items.map(([n, w, d, f]) => (
                      <BookButton
                        key={f}
                        skill={{ g, n, w, d, f }}
                        stays={CLAUDE_SHAPED.has(f)}
                        pressed={current === f}
                        back={
                          current !== f &&
                          ((travelsOnly && CLAUDE_SHAPED.has(f)) ||
                            (forward !== null && g !== forward) ||
                            dimSet.has(f))
                        }
                        onOpen={() => open(f, true)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="plaque"
                    aria-pressed={forward === g}
                    onClick={(e) => {
                      const next = forward === g ? null : g;
                      setForward(next);
                      if (next) {
                        (
                          e.currentTarget.closest(".shelf-group") as HTMLElement | null
                        )?.scrollIntoView({
                          block: "nearest",
                          behavior: matchMedia("(prefers-reduced-motion: reduce)")
                            .matches
                            ? "auto"
                            : "smooth",
                        });
                      }
                    }}
                  >
                    {g}
                  </button>
                </div>
              ))}
            </div>
            <article
              className="reader"
              id="reader"
              ref={readerRef}
              aria-live="polite"
              tabIndex={-1}
              style={{ ["--book" as string]: groupColor(skill.g) }}
            >
              <header className="rd-head">
                <p className="rd-g">
                  {skill.g} · {skill.w}
                </p>
                <h3>{skill.n}</h3>
                <p className="rd-d">{skill.d}</p>
                {CLAUDE_SHAPED.has(current) && (
                  <p className="rd-stay">This file still assumes Claude Code.</p>
                )}
                <p className="rd-acts">
                  <a className="btn" href={`/skills-clean/${current}`} download>
                    Download {current}
                  </a>
                  <button
                    type="button"
                    className="btn ghost"
                    id="rd-copy"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(rawText);
                        setCopyLabel("Copied");
                      } catch {
                        setCopyLabel("Copy failed");
                      }
                      setTimeout(() => setCopyLabel("Copy"), 1600);
                    }}
                  >
                    {copyLabel}
                  </button>
                  <span className="rd-meta">
                    {SKILL_LINES[current] || "?"} lines
                  </span>
                </p>
              </header>
              <div
                className="rd-body"
                id="rd-body"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </article>
          </div>
        </section>

        <NextSide
          prev={{ key: "", name: "The dial", label: "Back to" }}
          next={{ key: "quiet", name: "Find a little quiet" }}
        />
      </div>
    </>
  );
}

function BookButton({
  skill,
  cover,
  stays,
  pressed,
  back,
  onOpen,
}: {
  skill: Skill;
  cover?: boolean;
  stays?: boolean;
  pressed: boolean;
  back?: boolean;
  onOpen: () => void;
}) {
  const stayNote = stays ? ", still assumes Claude Code" : "";
  const cls = `book${cover ? " cover" : ""}${stays ? " stays" : ""}${back ? " back" : ""}`;
  if (cover) {
    return (
      <button
        type="button"
        className={cls}
        data-f={skill.f}
        aria-pressed={pressed}
        aria-label={`${skill.n}, ${SKILL_LINES[skill.f] || "?"} lines${stayNote}`}
        style={{ ["--c" as string]: groupColor(skill.g) }}
        onClick={onOpen}
      >
        <span className="bk-cloth">
          <span className="cv-panel">
            <span className="cv-t">{skill.n}</span>
            <span className="cv-l">
              {SKILL_LINES[skill.f] || "?"} lines
              {stays ? " · Claude" : ""}
            </span>
          </span>
        </span>
        <span className="bk-pages" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      data-f={skill.f}
      aria-pressed={pressed}
      aria-label={`${skill.n}, ${SKILL_LINES[skill.f] || "?"} lines${stayNote}`}
      title={stays ? `${skill.n} — still assumes Claude Code` : skill.n}
      style={{
        ["--w" as string]: `${spineW(skill.f)}px`,
        ["--h" as string]: `${spineH(skill.f)}px`,
        ["--c" as string]: groupColor(skill.g),
      }}
      onClick={onOpen}
    >
      <span className="bk-cloth">
        <span className="bk-title">{skill.n}</span>
      </span>
      <span className="bk-pages" aria-hidden="true" />
    </button>
  );
}
