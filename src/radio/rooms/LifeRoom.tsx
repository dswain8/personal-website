import { useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  FAMILY_FRAMES,
  FOOD_GROUPS,
  HOUSE_ROOMS,
  INDIA_PINS,
  INDIA_SKIPPED,
  SPORTS_LOVES,
  WORLD_PINS,
  shelfById,
  type FamilyFrame,
  type FoodGroup,
  type HouseRoom,
  type LifeBrand,
  type LifeShelf,
  type MapPin,
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
  open,
  onToggle,
}: {
  room: HouseRoom;
  open: string | null;
  onToggle: (key: string) => void;
}) {
  const shelf = room.shelfId ? shelfById(room.shelfId) : null;

  return (
    <section className={`room ${room.className}`} aria-label={room.room}>
      <h2>{room.room}</h2>
      {shelf ? (
        <RoomShelf shelf={shelf} open={open} onToggle={onToggle} />
      ) : (
        <div className="living-note">
          <p>{room.note}</p>
          <div className="living-window" aria-hidden="true">
            <span>Sunday light</span>
          </div>
        </div>
      )}
    </section>
  );
}

function FoodSection() {
  return (
    <section className="life-aspect" aria-labelledby="food-heading">
      <header className="life-aspect-head">
        <p className="life-aspect-kicker">Out eating</p>
        <h2 id="food-heading">A foodie in Bangalore.</h2>
        <p>
          Native Karnataka plates, tindi joints, a few Italian and Asian
          obsessions, coffee shops I trust, and Conservatory pop-ups whenever
          they land.
        </p>
      </header>
      <div className="food-groups">
        {FOOD_GROUPS.map((group) => (
          <FoodGroupBlock key={group.id} group={group} />
        ))}
      </div>
    </section>
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

function SportsSection() {
  return (
    <section className="life-aspect" aria-labelledby="sports-heading">
      <header className="life-aspect-head">
        <p className="life-aspect-kicker">On the sidelines</p>
        <h2 id="sports-heading">Sports I follow hard.</h2>
        <p>
          Cricket first, then the other obsessions — cage, track, court, and
          pitch.
        </p>
      </header>
      <ul className="sports-grid">
        {SPORTS_LOVES.map((s) => (
          <SportCard key={s.id} sport={s} />
        ))}
      </ul>
    </section>
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

function TravelSection({
  activePin,
  setActivePin,
}: {
  activePin: string | null;
  setActivePin: (id: string | null) => void;
}) {
  return (
    <section className="life-aspect" aria-labelledby="travel-heading">
      <header className="life-aspect-head">
        <p className="life-aspect-kicker">On the road</p>
        <h2 id="travel-heading">Where I&apos;ve been.</h2>
        <p>
          Most of India — still missing Arunachal, Mizoram, and Nagaland — plus
          a growing set of stamps abroad. Tap a pin.
        </p>
      </header>

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
    </section>
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

export default function LifeRoom() {
  const [openBrand, setOpenBrand] = useState<string | null>(null);
  const [activePin, setActivePin] = useState<string | null>(null);

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
            Start at home. Then the city table, the matches I never miss, and
            the maps of where I&apos;ve been.
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
              open={openBrand}
              onToggle={onToggleBrand}
            />
          ))}

          <div className="floor-slab" aria-hidden="true" />
        </div>

        <p className="l4-small">
          The things in the house are brands I use. Not exhaustive, and not
          affiliate links.
        </p>

        <FoodSection />
        <SportsSection />
        <TravelSection activePin={activePin} setActivePin={setActivePin} />

        <NextSide
          prev={{ key: "try", name: "Try what I've made", label: "Back to" }}
          next={{ key: "", name: "The dial", label: "Back to" }}
        />
      </div>
    </>
  );
}
