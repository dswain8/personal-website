import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  FAMILY_FRAMES,
  FOOD_GROUPS,
  HOUSE_ROOMS,
  INDIA_PINS,
  INDIA_SKIPPED,
  INDIA_SKIPPED_IDS,
  SLAM_PAGES,
  SPORTS_LOVES,
  WORLD_PINS,
  WORLD_SKIPPED_IDS,
  shelfById,
  type FamilyFrame,
  type FoodGroup,
  type HouseRoom,
  type LifeBrand,
  type LifeShelf,
  type MapPin,
  type SlamPageId,
  type SportLove,
} from "../data/life-items";

function FamilyPhoto({ frame }: { frame: FamilyFrame }) {
  const [missing, setMissing] = useState(false);
  const style = { "--tilt": `${frame.tilt}deg` } as CSSProperties;

  return (
    <figure
      className={`family-frame family-frame--${frame.id}${missing ? " is-empty" : ""}`}
      style={style}
    >
      {!missing ? (
        <img
          src={frame.src}
          alt=""
          loading="lazy"
          onError={() => setMissing(true)}
        />
      ) : (
        <span className="family-ph" aria-hidden="true">
          {frame.title}
        </span>
      )}
      <figcaption>
        <b>{frame.title}</b>
      </figcaption>
    </figure>
  );
}

function BrandTile({
  brand,
  open,
  onToggle,
}: {
  brand: LifeBrand;
  open: boolean;
  onToggle: () => void;
}) {
  const [logoMissing, setLogoMissing] = useState(false);
  const noteId = `note-${brand.name.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className={`brand-tile${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="brand-hit"
        aria-expanded={open}
        aria-controls={noteId}
        onClick={onToggle}
      >
        <span className="brand-logo">
          {!logoMissing ? (
            <img
              src={`/life/logos/${brand.logo}`}
              alt=""
              loading="lazy"
              onError={() => setLogoMissing(true)}
            />
          ) : (
            <span className="brand-logo-fallback">{brand.name}</span>
          )}
        </span>
        <span className="brand-name">{brand.name}</span>
      </button>
      <div className="brand-note" id={noteId} hidden={!open}>
        <p>{brand.note}</p>
        <a className="textlink" href={brand.url} rel="noreferrer">
          Visit {brand.name}
        </a>
      </div>
    </div>
  );
}

function RoomShelf({
  shelf,
  open,
  onToggle,
}: {
  shelf: LifeShelf;
  open: string | null;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="room-shelf">
      <div className="room-shelf-label">
        <h3>{shelf.title}</h3>
      </div>
      <ul className="logo-rail">
        {shelf.brands.map((brand) => {
          const key = `${shelf.id}:${brand.name}`;
          return (
            <li key={brand.name}>
              <BrandTile
                brand={brand}
                open={open === key}
                onToggle={() => onToggle(key)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BrandRoom({
  room,
  revealed,
  onReveal,
  brandOpen,
  onToggleBrand,
}: {
  room: HouseRoom;
  revealed: boolean;
  onReveal: () => void;
  brandOpen: string | null;
  onToggleBrand: (key: string) => void;
}) {
  const shelf = shelfById(room.shelfId);

  return (
    <section
      className={`room ${room.className}${revealed ? " is-open" : " is-shut"}`}
      aria-label={room.room}
    >
      <h2>{room.room}</h2>
      <p className="room-tease">{room.tease}</p>

      {!revealed ? (
        <button
          type="button"
          className={`room-portal portal-${room.portalKind}`}
          onClick={onReveal}
          aria-expanded={false}
        >
          <span className="portal-face" aria-hidden="true" />
          <span className="portal-label">{room.portal}</span>
        </button>
      ) : (
        <div className="room-reveal">
          <button
            type="button"
            className="room-close"
            onClick={onReveal}
            aria-label={`Close ${room.room}`}
          >
            Close
          </button>
          <p className="room-line">{room.line}</p>
          <RoomShelf
            shelf={shelf}
            open={brandOpen}
            onToggle={onToggleBrand}
          />
        </div>
      )}
    </section>
  );
}

function FoodGroupBlock({ group }: { group: FoodGroup }) {
  return (
    <div className="food-group">
      <h3>{group.title}</h3>
      <ul className="food-list">
        {group.places.map((place) => (
          <li key={place.name}>
            <b className="food-name">{place.name}</b>
            <p className="food-note">{place.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SportCard({ sport }: { sport: SportLove }) {
  return (
    <li className={`sport-card sport-${sport.id}`}>
      <h3>{sport.sport}</h3>
      <p>{sport.note}</p>
    </li>
  );
}

const FOOD_LEFT_IDS = new Set(["karnataka", "italian", "asian"]);
const FOOD_RIGHT_IDS = new Set(["veg", "meals", "coffee", "popups"]);
const SPORTS_LEFT_IDS = new Set(["cricket", "ufc"]);
const SPORTS_RIGHT_IDS = new Set(["f1", "tennis", "football"]);

function SlamLeafIntro({
  tab,
  title,
  whisper,
  titleId,
}: {
  tab: string;
  title: string;
  whisper: string;
  titleId?: string;
}) {
  return (
    <header className="slam-leaf-intro">
      <p className="slam-leaf-kicker">Chapter</p>
      <p className="slam-leaf-chapter">{tab}</p>
      {titleId ? (
        <h3 className="slam-page-title" id={titleId}>
          {title}
        </h3>
      ) : (
        <p className="slam-page-title">{title}</p>
      )}
      <p className="slam-leaf-whisper">{whisper}</p>
    </header>
  );
}

function RegionMap({
  title,
  subtitle,
  variant,
  src,
  pins,
  skippedIds,
  activePin,
  setActivePin,
  compact = false,
  quietTitle,
}: {
  title: string;
  subtitle: string;
  variant: "india" | "world";
  src: string;
  pins: MapPin[];
  skippedIds: readonly string[];
  activePin: string | null;
  setActivePin: (id: string | null) => void;
  compact?: boolean;
  quietTitle: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [hoverName, setHoverName] = useState<string | null>(null);
  const [ghostLabel, setGhostLabel] = useState<string | null>(null);

  const pinByRegion = useMemo(() => {
    const map = new Map<string, MapPin>();
    for (const pin of pins) {
      for (const r of pin.regions) map.set(r, pin);
    }
    return map;
  }, [pins]);
  const skipped = useMemo(() => new Set(skippedIds), [skippedIds]);
  const active = pins.find((p) => `${variant}:${p.id}` === activePin);

  useEffect(() => {
    let cancelled = false;
    const host = hostRef.current;

    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`map ${r.status}`);
        return r.text();
      })
      .then((svg) => {
        if (cancelled || !hostRef.current) return;
        hostRef.current.innerHTML = svg;
        const root = hostRef.current.querySelector("svg");
        if (!root) throw new Error("no svg");
        root.setAttribute("focusable", "false");
        root.setAttribute("preserveAspectRatio", "xMidYMid meet");
        if (variant === "world") {
          root.setAttribute("viewBox", "0 18 950 520");
        } else {
          root.setAttribute("viewBox", "8 60 786 776");
        }
        hostRef.current
          .querySelectorAll<SVGPathElement>("path.region")
          .forEach((path) => {
            const rid = path.id;
            const pin = pinByRegion.get(rid);
            const isSkipped = skipped.has(rid);
            path.classList.toggle("is-visited", Boolean(pin));
            path.classList.toggle("is-skipped", isSkipped);
            path.setAttribute("tabindex", "0");
            path.setAttribute("role", "button");
            const label =
              pin?.label ||
              path.getAttribute("data-name") ||
              rid.replace(/-/g, " ");
            path.setAttribute("aria-label", label);
          });
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
      if (host) host.innerHTML = "";
    };
    // pins/skipped are stable module constants — load once per map src
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, variant]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !ready) return;
    host.querySelectorAll<SVGPathElement>("path.region").forEach((path) => {
      const rid = path.id;
      const pin = pinByRegion.get(rid);
      const key = pin ? `${variant}:${pin.id}` : null;
      const ghostKey = `${variant}:ghost:${rid}`;
      const isActive =
        (key && activePin === key) ||
        activePin === ghostKey ||
        (!!active && active.regions.includes(rid));
      path.classList.toggle("is-active", Boolean(isActive));
      path.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }, [activePin, ready, variant, active, pinByRegion]);

  const onMapClick = (e: MouseEvent | KeyboardEvent) => {
    const target = e.target as Element | null;
    const path = target?.closest?.("path.region") as SVGPathElement | null;
    if (!path) return;
    const rid = path.id;
    const pin = pinByRegion.get(rid);
    if (pin) {
      const key = `${variant}:${pin.id}`;
      setGhostLabel(null);
      setActivePin(activePin === key ? null : key);
      return;
    }
    const name = path.getAttribute("data-name") || rid;
    const ghostKey = `${variant}:ghost:${rid}`;
    if (activePin === ghostKey) {
      setActivePin(null);
      setGhostLabel(null);
    } else {
      setActivePin(ghostKey);
      setGhostLabel(name);
    }
  };

  const onMapKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onMapClick(e);
    }
  };

  const ghostId = activePin?.startsWith(`${variant}:ghost:`)
    ? activePin.slice(`${variant}:ghost:`.length)
    : null;
  const stories = pins.filter((pin) => pin.story);
  const readoutTitle =
    active?.label || ghostLabel || hoverName || quietTitle;
  const readoutNote =
    active?.note || (ghostId && skipped.has(ghostId) ? "Not yet." : null);

  return (
    <div
      className={`pin-map pin-map--${variant}${ready ? " is-ready" : ""}${compact ? " is-compact" : ""}`}
    >
      {subtitle ? (
        <div className="pin-map-head">
          {!compact ? <h3>{title}</h3> : null}
          <p>{subtitle}</p>
        </div>
      ) : null}
      <div
        className="pin-stage"
        role="group"
        aria-label={`${title} travel map`}
        onClick={onMapClick}
        onKeyDown={onMapKey}
        onMouseOver={(e) => {
          const path = (e.target as Element).closest?.(
            "path.region",
          ) as SVGPathElement | null;
          if (path) {
            setHoverName(
              pinByRegion.get(path.id)?.label ||
                path.getAttribute("data-name") ||
                path.id,
            );
          }
        }}
        onMouseOut={() => setHoverName(null)}
      >
        <div className="map-svg-host" ref={hostRef} aria-hidden={!ready} />
        {!ready && !loadError ? (
          <p className="map-loading">Unfolding the map…</p>
        ) : null}
        {loadError ? (
          <p className="map-loading">Couldn’t load the map. Refresh once.</p>
        ) : null}
        <div className="map-legend" aria-hidden="true">
          <span className="leg leg-visited">Visited</span>
          {variant === "india" ? (
            <span className="leg leg-skip">Not yet</span>
          ) : (
            <span className="leg leg-rest">Elsewhere</span>
          )}
        </div>
      </div>
      <div className="pin-readout" aria-live="polite">
        <b>{readoutTitle}</b>
        {readoutNote ? <p>{readoutNote}</p> : null}
      </div>
      {stories.length > 0 ? (
        <ul className="map-stories" aria-label={`${title} stories`}>
          {stories.map((pin) => {
            const key = `${variant}:${pin.id}`;
            const isOn = activePin === key;
            return (
              <li key={pin.id}>
                <button
                  type="button"
                  className={`map-story${isOn ? " is-on" : ""}`}
                  aria-pressed={isOn}
                  onClick={() => setActivePin(isOn ? null : key)}
                >
                  {pin.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

const SLAM_WHISPERS: Record<Exclude<SlamPageId, "cover">, string> = {
  food: "The orders I repeat.",
  sports: "Who gets the Sunday.",
  travel: "The places I still tell.",
};

function SlamBook({
  page,
  setPage,
  activePin,
  setActivePin,
}: {
  page: SlamPageId;
  setPage: (p: SlamPageId) => void;
  activePin: string | null;
  setActivePin: (id: string | null) => void;
}) {
  const index = SLAM_PAGES.findIndex((p) => p.id === page);
  const meta = SLAM_PAGES[index];
  const prev = index > 0 ? SLAM_PAGES[index - 1] : null;
  const next = index < SLAM_PAGES.length - 1 ? SLAM_PAGES[index + 1] : null;
  const bookId = useId();
  const [turnDir, setTurnDir] = useState<"next" | "prev" | "open" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const flipTimer = useRef<number | null>(null);

  useEffect(() => {
    if (page !== "travel") setActivePin(null);
  }, [page, setActivePin]);

  useEffect(() => {
    return () => {
      if (flipTimer.current) window.clearTimeout(flipTimer.current);
    };
  }, []);

  const go = (target: SlamPageId, dir: "next" | "prev" | "open") => {
    if (flipping || target === page) return;
    if (flipTimer.current) window.clearTimeout(flipTimer.current);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setTurnDir(dir);
    if (reduceMotion || dir === "open") {
      setPage(target);
      setTurnDir(null);
      return;
    }

    setFlipping(true);
    flipTimer.current = window.setTimeout(() => {
      setPage(target);
      setFlipping(false);
      setTurnDir(null);
    }, 620);
  };

  const isCover = page === "cover";

  return (
    <div className="slam">
      <div
        className={[
          "slam-book",
          isCover ? "is-closed" : "is-open",
          flipping ? "is-flipping" : "",
          turnDir ? `turn-${turnDir}` : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-page={page}
      >
        <div className="slam-stage">
          {isCover ? (
            <div className="slam-closed-wrap">
              <button
                type="button"
                className="slam-closed"
                onClick={() => go("food", "open")}
                aria-label="Open Debjeet's slam book"
              >
                <span className="slam-closed-shadow" aria-hidden="true" />
                <span className="slam-closed-block" aria-hidden="true">
                  <span className="slam-closed-spine" />
                  <span className="slam-closed-pages" />
                  <span className="slam-closed-front">
                    <span className="slam-closed-grain" />
                    <span className="slam-closed-plate">
                      <span className="slam-cover-from">Property of Debjeet</span>
                      <span className="slam-cover-title" id={`${bookId}-title`}>
                        Slam book
                      </span>
                      <span className="slam-cover-sub">
                        Off the clock · a life in pages
                      </span>
                    </span>
                    <span className="slam-closed-hint">Bangalore</span>
                  </span>
                </span>
              </button>
              <ol className="slam-toc" aria-label="Contents">
                {SLAM_PAGES.filter((p) => p.id !== "cover").map((p, i) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => go(p.id, "open")}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {p.title}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div
              className={`slam-opened slam-opened--${page}`}
              aria-labelledby={`${bookId}-title`}
            >
              <div className="slam-boards" aria-hidden="true">
                <div className="slam-board slam-board-left" />
                <div className="slam-board slam-board-right" />
              </div>

              <nav className="slam-ribbons" aria-label="Chapters">
                {SLAM_PAGES.filter((p) => p.id !== "cover").map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`slam-ribbon slam-ribbon-${p.id}${page === p.id ? " is-current" : ""}`}
                    aria-current={page === p.id ? "page" : undefined}
                    onClick={() =>
                      go(
                        p.id,
                        SLAM_PAGES.indexOf(p) < index ? "prev" : "next",
                      )
                    }
                  >
                    {p.tab}
                  </button>
                ))}
              </nav>

              <div className="slam-stack-edge slam-stack-left" aria-hidden="true" />
              <div className="slam-stack-edge slam-stack-right" aria-hidden="true" />
              <div className="slam-gutter" aria-hidden="true" />

              <div className="slam-leaves">
                <div className="slam-leaf slam-leaf-left">
                  <div className="slam-leaf-paper">
                    {page === "food" ? (
                      <>
                        <SlamLeafIntro
                          tab={meta.tab}
                          title={meta.title}
                          whisper={SLAM_WHISPERS.food}
                          titleId={`${bookId}-title`}
                        />
                        <p className="slam-lede">
                          Thindi, then the tables I cross the city for.
                        </p>
                        <div className="food-groups food-groups--page">
                          {FOOD_GROUPS.filter((g) => FOOD_LEFT_IDS.has(g.id)).map(
                            (group) => (
                              <FoodGroupBlock key={group.id} group={group} />
                            ),
                          )}
                        </div>
                      </>
                    ) : null}

                    {page === "sports" ? (
                      <>
                        <SlamLeafIntro
                          tab={meta.tab}
                          title={meta.title}
                          whisper={SLAM_WHISPERS.sports}
                          titleId={`${bookId}-title`}
                        />
                        <p className="slam-lede">
                          India in whites. Gaethje when the room goes loud.
                        </p>
                        <ul className="sports-grid sports-grid--page">
                          {SPORTS_LOVES.filter((s) =>
                            SPORTS_LEFT_IDS.has(s.id),
                          ).map((s) => (
                            <SportCard key={s.id} sport={s} />
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {page === "travel" ? (
                      <>
                        <header className="slam-leaf-intro slam-leaf-intro--tight">
                          <p className="slam-leaf-kicker">Chapter · Travel</p>
                          <h3
                            className="slam-page-title"
                            id={`${bookId}-title`}
                          >
                            India
                          </h3>
                          <p className="slam-leaf-whisper">
                            Karnataka is home. Odisha is Richu. Still missing{" "}
                            {INDIA_SKIPPED.join(", ")}.
                          </p>
                        </header>
                        <RegionMap
                          key="india-map"
                          title="India"
                          subtitle=""
                          variant="india"
                          src="/life/maps/india.svg"
                          pins={INDIA_PINS}
                          skippedIds={INDIA_SKIPPED_IDS}
                          activePin={activePin}
                          setActivePin={setActivePin}
                          compact
                          quietTitle="Karnataka. Odisha."
                        />
                      </>
                    ) : null}

                    <p className="slam-page-num slam-page-num-left">
                      {index * 2 - 1}
                    </p>
                  </div>
                </div>

                <div className="slam-leaf slam-leaf-right">
                  <div className="slam-leaf-paper">
                    {page === "food" ? (
                      <>
                        <p className="slam-leaf-kicker">Continued</p>
                        <p className="slam-page-title">Coffee, leaf &amp; pop-ups</p>
                        <p className="slam-lede">
                          Leaf meals, coffee, and the nights I clear.
                        </p>
                        <div className="food-groups food-groups--page">
                          {FOOD_GROUPS.filter((g) =>
                            FOOD_RIGHT_IDS.has(g.id),
                          ).map((group) => (
                            <FoodGroupBlock key={group.id} group={group} />
                          ))}
                        </div>
                      </>
                    ) : null}

                    {page === "sports" ? (
                      <>
                        <p className="slam-leaf-kicker">Continued</p>
                        <p className="slam-page-title">Track, court &amp; pitch</p>
                        <p className="slam-lede">
                          Verstappen Sundays. Federer. United anyway.
                        </p>
                        <ul className="sports-grid sports-grid--page">
                          {SPORTS_LOVES.filter((s) =>
                            SPORTS_RIGHT_IDS.has(s.id),
                          ).map((s) => (
                            <SportCard key={s.id} sport={s} />
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {page === "travel" ? (
                      <>
                        <header className="slam-leaf-intro slam-leaf-intro--tight">
                          <p className="slam-leaf-kicker">Abroad</p>
                          <p className="slam-page-title">The world</p>
                          <p className="slam-leaf-whisper">
                            Kenya changed the scale. Bhutan and Istanbul stayed.
                          </p>
                        </header>
                        <RegionMap
                          key="world-map"
                          title="The world"
                          subtitle=""
                          variant="world"
                          src="/life/maps/world.svg"
                          pins={WORLD_PINS}
                          skippedIds={WORLD_SKIPPED_IDS}
                          activePin={activePin}
                          setActivePin={setActivePin}
                          compact
                          quietTitle="Kenya. Bhutan. Istanbul."
                        />
                      </>
                    ) : null}

                    <p className="slam-page-num slam-page-num-right">
                      {index * 2}
                    </p>
                  </div>
                </div>

                <div
                  className={`slam-flip${flipping ? " is-on" : ""}`}
                  aria-hidden="true"
                >
                  <div className="slam-flip-front" />
                  <div className="slam-flip-back" />
                </div>
              </div>

              <button
                type="button"
                className="slam-corner slam-corner-prev"
                disabled={!prev || flipping}
                onClick={() => prev && go(prev.id, "prev")}
                aria-label={prev ? `Turn back to ${prev.tab}` : "No previous page"}
              >
                <span>‹</span>
              </button>
              <button
                type="button"
                className="slam-corner slam-corner-next"
                disabled={!next || flipping}
                onClick={() => next && go(next.id, "next")}
                aria-label={next ? `Turn to ${next.tab}` : "No next page"}
              >
                <span>›</span>
              </button>

              <div className="slam-foot">
                <button
                  type="button"
                  className="slam-close-cover"
                  disabled={flipping}
                  onClick={() => go("cover", "prev")}
                >
                  Close cover
                </button>
                <span className="slam-folio">
                  {meta.tab} · {index} / {SLAM_PAGES.length - 1}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LifeRoom() {
  const [openRoom, setOpenRoom] = useState<string | null>(null);
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  const [slamPage, setSlamPage] = useState<SlamPageId>("cover");
  const [activePin, setActivePin] = useState<string | null>(null);

  const onRevealRoom = (id: string) => {
    setOpenRoom((cur) => {
      if (cur === id) {
        setOpenBrand(null);
        return null;
      }
      setOpenBrand(null);
      return id;
    });
  };

  const onToggleBrand = (key: string) => {
    setOpenBrand((cur) => (cur === key ? null : key));
  };

  return (
    <>
      <StationStrip stationKey="life" />
      <div className="wrap life4">
        <header className="l4-head">
          <h1 className="reveal">Off the clock.</h1>
        </header>

        <div className="house-yard">
        <div className="house" id="house">
          <div className="chimney" aria-hidden="true" />
          <div className="roof" aria-hidden="true" />
          <div className="eave" aria-hidden="true" />

          <section
            className="room family-room"
            aria-labelledby="family-heading"
          >
            <h2 id="family-heading">Family portrait</h2>
            <div className="family-wall" role="list">
              {FAMILY_FRAMES.map((frame) => (
                <div key={frame.id} role="listitem">
                  <FamilyPhoto frame={frame} />
                </div>
              ))}
            </div>
          </section>

          {HOUSE_ROOMS.map((room) => (
            <BrandRoom
              key={room.id}
              room={room}
              revealed={openRoom === room.id}
              onReveal={() => onRevealRoom(room.id)}
              brandOpen={openBrand}
              onToggleBrand={onToggleBrand}
            />
          ))}

          <section
            className="room library-room"
            aria-labelledby="library-heading"
          >
            <h2 id="library-heading">Library</h2>
            <SlamBook
              page={slamPage}
              setPage={setSlamPage}
              activePin={activePin}
              setActivePin={setActivePin}
            />
          </section>

          <div className="floor-slab" aria-hidden="true" />
        </div>
        </div>

        <NextSide
          prev={{ key: "try", name: "Try what I've made", label: "Back to" }}
          next={{ key: "", name: "The dial", label: "Back to" }}
        />
      </div>
    </>
  );
}
