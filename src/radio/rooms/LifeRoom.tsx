import { useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  FAMILY_FRAMES,
  HOUSE_ROOMS,
  shelfById,
  type FamilyFrame,
  type HouseRoom,
  type LifeBrand,
  type LifeShelf,
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
  open,
  onToggle,
}: {
  room: HouseRoom;
  open: string | null;
  onToggle: (key: string) => void;
}) {
  const shelf = shelfById(room.shelfId);

  return (
    <section className={`room ${room.className}`} aria-label={room.room}>
      <h2>{room.room}</h2>
      <RoomShelf shelf={shelf} open={open} onToggle={onToggle} />
    </section>
  );
}

export default function LifeRoom() {
  const [openBrand, setOpenBrand] = useState<string | null>(null);

  const onToggle = (key: string) => {
    setOpenBrand((cur) => (cur === key ? null : key));
  };

  return (
    <>
      <StationStrip stationKey="life" />
      <div className="wrap life4">
        <header className="l4-head">
          <h1 className="reveal">Off the clock.</h1>
        </header>

        <div className="house" id="house">
          <div className="roof" aria-hidden="true" />

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
              open={openBrand}
              onToggle={onToggle}
            />
          ))}

          <div className="floor-slab" aria-hidden="true" />
        </div>

        <NextSide
          prev={{ key: "try", name: "Try what I've made", label: "Back to" }}
          next={{ key: "", name: "The dial", label: "Back to" }}
        />
      </div>
    </>
  );
}
