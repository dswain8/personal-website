import { useState, type CSSProperties } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import {
  FAMILY_FRAMES,
  LIFE_SHELVES,
  type FamilyFrame,
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

function BrandShelf({
  shelf,
  open,
  onToggle,
}: {
  shelf: LifeShelf;
  open: string | null;
  onToggle: (key: string) => void;
}) {
  return (
    <section className="life-shelf" aria-labelledby={`shelf-${shelf.id}`}>
      <header className="life-shelf-head">
        <h2 id={`shelf-${shelf.id}`}>{shelf.title}</h2>
        <p>{shelf.blurb}</p>
      </header>
      <ul className="logo-rail">
        {shelf.brands.map((brand) => {
          const key = `${shelf.id}:${brand.name}`;
          const isOpen = open === key;
          return (
            <li key={brand.name}>
              <BrandTile
                brand={brand}
                open={isOpen}
                onToggle={() => onToggle(key)}
              />
            </li>
          );
        })}
      </ul>
    </section>
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
  return (
    <div className={`brand-tile${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="brand-hit"
        aria-expanded={open}
        aria-controls={`note-${brand.name.replace(/\s+/g, "-").toLowerCase()}`}
        onClick={onToggle}
      >
        <span className="brand-logo">
          <img
            src={`/life/logos/${brand.logo}`}
            alt=""
            loading="lazy"
          />
        </span>
        <span className="brand-name">{brand.name}</span>
      </button>
      <div
        className="brand-note"
        id={`note-${brand.name.replace(/\s+/g, "-").toLowerCase()}`}
        hidden={!open}
      >
        <p>{brand.note}</p>
        <a className="textlink" href={brand.url} rel="noreferrer">
          Visit {brand.name}
        </a>
      </div>
    </div>
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
          <p className="lede reveal">
            Outside of work, I&apos;m a family man first. My daughter is four. We
            have a golden retriever named Tokyo. Most of my best hours are spent
            with them.
          </p>
        </header>

        <section className="family-hero" aria-labelledby="family-heading">
          <div className="family-hero-copy">
            <h2 id="family-heading">My family</h2>
            <p>
              Photos, her drawings and caricatures, and Tokyo — waiting for the
              real frames to land.
            </p>
          </div>
          <div className="family-wall" role="list">
            {FAMILY_FRAMES.map((frame) => (
              <div key={frame.id} role="listitem">
                <FamilyPhoto frame={frame} />
              </div>
            ))}
          </div>
        </section>

        <div className="life-shelves">
          <p className="life-shelves-lede">
            A few brands I keep around the house. Not exhaustive, and not
            affiliate links — just what I put in, put on, and wear.
          </p>
          {LIFE_SHELVES.map((shelf) => (
            <BrandShelf
              key={shelf.id}
              shelf={shelf}
              open={openBrand}
              onToggle={onToggle}
            />
          ))}
        </div>

        <NextSide
          prev={{ key: "try", name: "Try what I've made", label: "Back to" }}
          next={{ key: "", name: "The dial", label: "Back to" }}
        />
      </div>
    </>
  );
}
