import { useEffect, useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  FAMILY_FRAMES,
  FOOD_GROUPS,
  HOUSE_ROOMS,
  INDIA_PINS,
  INDIA_SKIPPED,
  SLAM_PAGES,
  SPORTS_LOVES,
  WORLD_PINS,
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
          {frame.hint}
        </span>
      )}
      <figcaption>
        <b>{frame.title}</b>
        <span>{frame.hint}</span>
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
          <img src={`/life/logos/${brand.logo}`} alt="" loading="lazy" />
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
        <p>{shelf.blurb}</p>
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
  const shelf = room.shelfId ? shelfById(room.shelfId) : null;

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
          {shelf ? (
            <RoomShelf
              shelf={shelf}
              open={brandOpen}
              onToggle={onToggleBrand}
            />
          ) : (
            <div className="living-note">
              <p>{room.note}</p>
              <div className="living-window" aria-hidden="true">
                <span>Sunday light</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function FoodPage() {
  return (
    <div className="slam-page-body">
      <p className="slam-lede">
        Native Karnataka plates, tindi joints, Italian and Asian obsessions,
        coffee I trust, and Conservatory pop-ups whenever they land.
      </p>
      <div className="food-groups">
        {FOOD_GROUPS.map((group) => (
          <FoodGroupBlock key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}

function FoodGroupBlock({ group }: { group: FoodGroup }) {
  return (
    <div className="food-group">
      <h3>{group.title}</h3>
      <p className="food-group-blurb">{group.blurb}</p>
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

function SportsPage() {
  return (
    <div className="slam-page-body">
      <p className="slam-lede">
        Cricket first, then the other obsessions — cage, track, court, and
        pitch.
      </p>
      <ul className="sports-grid">
        {SPORTS_LOVES.map((s) => (
          <SportCard key={s.id} sport={s} />
        ))}
      </ul>
    </div>
  );
}

function SportCard({ sport }: { sport: SportLove }) {
  return (
    <li className={`sport-card sport-${sport.id}`}>
      <h3>{sport.sport}</h3>
      <p className="sport-loves">{sport.loves.join(" · ")}</p>
      <p>{sport.note}</p>
    </li>
  );
}

function TravelPage({
  activePin,
  setActivePin,
}: {
  activePin: string | null;
  setActivePin: (id: string | null) => void;
}) {
  return (
    <div className="slam-page-body">
      <p className="slam-lede">
        Most of India — still missing Arunachal, Mizoram, and Nagaland — plus a
        growing set of stamps abroad. Tap a pin.
      </p>
      <div className="travel-maps">
        <PinMap
          title="India"
          subtitle={`Skipped for now: ${INDIA_SKIPPED.join(", ")}.`}
          variant="india"
          pins={INDIA_PINS}
          activePin={activePin}
          setActivePin={setActivePin}
        />
        <PinMap
          title="The world"
          subtitle="Sri Lanka, Bhutan, Nepal, Thailand, Malaysia, Indonesia (Bali), Turkey, Dubai, Kenya, the US, Germany, Austria, Hungary."
          variant="world"
          pins={WORLD_PINS}
          activePin={activePin}
          setActivePin={setActivePin}
        />
      </div>
    </div>
  );
}

function PinMap({
  title,
  subtitle,
  variant,
  pins,
  activePin,
  setActivePin,
}: {
  title: string;
  subtitle: string;
  variant: "india" | "world";
  pins: MapPin[];
  activePin: string | null;
  setActivePin: (id: string | null) => void;
}) {
  const active = pins.find((p) => `${variant}:${p.id}` === activePin);

  return (
    <div className={`pin-map pin-map--${variant}`}>
      <div className="pin-map-head">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className="pin-stage" role="group" aria-label={`${title} travel map`}>
        <div className="pin-land" aria-hidden="true" />
        {pins.map((pin) => {
          const key = `${variant}:${pin.id}`;
          const isOn = activePin === key;
          return (
            <button
              key={pin.id}
              type="button"
              className={`map-pin${isOn ? " is-on" : ""}`}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              aria-label={pin.label}
              aria-pressed={isOn}
              onClick={() => setActivePin(isOn ? null : key)}
            />
          );
        })}
      </div>
      <p className="pin-readout" aria-live="polite">
        {active ? active.label : "Tap a pin"}
      </p>
    </div>
  );
}

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

  useEffect(() => {
    // reset travel pin when leaving travel page
    if (page !== "travel") setActivePin(null);
  }, [page, setActivePin]);

  return (
    <section className="slam" aria-labelledby="slam-heading">
      <header className="slam-head">
        <p className="life-aspect-kicker">Slam book</p>
        <h2 id="slam-heading">Things I love.</h2>
        <p>
          Flip through — food joints, sports I follow, and the maps of where
          I&apos;ve been. One page at a time.
        </p>
      </header>

      <div className="slam-book" data-page={page}>
        <div className="slam-spine" aria-hidden="true" />
        <nav className="slam-tabs" aria-label="Slam book pages">
          {SLAM_PAGES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`slam-tab${page === p.id ? " is-current" : ""}`}
              aria-current={page === p.id ? "page" : undefined}
              onClick={() => setPage(p.id)}
            >
              {p.tab}
            </button>
          ))}
        </nav>

        <article className="slam-spread" key={page}>
          <div className="slam-paper">
            {page === "cover" ? (
              <div className="slam-cover">
                <p className="slam-cover-from">From Debjeet</p>
                <h3>Off the clock, continued.</h3>
                <p>
                  A little book of the things that pull me out of work — tables
                  in Bangalore, matches I never miss, and the stamps I&apos;ve
                  collected so far.
                </p>
                <ol className="slam-toc">
                  {SLAM_PAGES.filter((p) => p.id !== "cover").map((p, i) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => setPage(p.id)}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {p.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <>
                <h3 className="slam-page-title">{meta.title}</h3>
                {page === "food" ? <FoodPage /> : null}
                {page === "sports" ? <SportsPage /> : null}
                {page === "travel" ? (
                  <TravelPage
                    activePin={activePin}
                    setActivePin={setActivePin}
                  />
                ) : null}
              </>
            )}
          </div>
        </article>

        <div className="slam-nav">
          <button
            type="button"
            className="slam-turn slam-turn-prev"
            disabled={!prev}
            onClick={() => prev && setPage(prev.id)}
          >
            {prev ? `← ${prev.tab}` : "·"}
          </button>
          <span className="slam-folio">
            {index + 1} / {SLAM_PAGES.length}
          </span>
          <button
            type="button"
            className="slam-turn slam-turn-next"
            disabled={!next}
            onClick={() => next && setPage(next.id)}
          >
            {next ? `${next.tab} →` : "·"}
          </button>
        </div>
      </div>
    </section>
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
          <p className="lede reveal">
            Outside of work, I&apos;m a family man first — and a foodie,
            sports obsessive, and restless traveller close behind. My daughter
            is four. We have a golden retriever named Tokyo.
          </p>
          <p className="l4-hint">
            Open a door or window in the house for what I use. Then flip the
            slam book for what I love.
          </p>
        </header>

        <div className="house" id="house">
          <div className="roof" aria-hidden="true" />

          <section
            className="room family-room"
            aria-labelledby="family-heading"
          >
            <h2 id="family-heading">Family portrait</h2>
            <p className="family-room-lede">
              My family — Barnali, Richu, Tokyo, and me. Ghibli-flavoured
              portraits, a birthday morning, Richu&apos;s Odissi certificate day,
              and the little jharokha that hangs at home.
            </p>
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

          <div className="floor-slab" aria-hidden="true" />
        </div>

        <p className="l4-small">
          The shelves behind the doors are brands I use. Not exhaustive, and not
          affiliate links.
        </p>

        <SlamBook
          page={slamPage}
          setPage={setSlamPage}
          activePin={activePin}
          setActivePin={setActivePin}
        />

        <NextSide
          prev={{ key: "try", name: "Try what I've made", label: "Back to" }}
          next={{ key: "", name: "The dial", label: "Back to" }}
        />
      </div>
    </>
  );
}
