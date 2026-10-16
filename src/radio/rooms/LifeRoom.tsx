import { useMemo, useState } from "react";
import { NextSide } from "../components/NextSide";
import { StationStrip } from "../components/StationStrip";
import { DOG_SVG, HOME_ITEMS, objSVG } from "../data/home-items";

type Note = { room: string; name: string; stance: string; what: string; url: string } | null;

function Shelf({
  room,
  only,
  selected,
  onPick,
}: {
  room: string;
  only?: number[];
  selected: { room: string; i: number } | null;
  onPick: (room: string, i: number) => void;
}) {
  return (
    <>
      {HOME_ITEMS[room].map(([n, , , , shape, c], i) => {
        if (only && !only.includes(i)) return null;
        return (
          <button
            key={`${room}-${i}`}
            type="button"
            className="obj"
            data-room={room}
            data-i={i}
            aria-label={n}
            aria-pressed={selected?.room === room && selected.i === i}
            onClick={() => onPick(room, i)}
          >
            <svg
              viewBox="0 0 48 60"
              width={48}
              height={60}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: objSVG(shape, c) }}
            />
            <span>{n}</span>
          </button>
        );
      })}
    </>
  );
}

function RoomNote({ note }: { note: Note }) {
  if (!note) return null;
  return (
    <>
      <p className="rn-n">
        <b>{note.name}</b>
        <span className={`rn-s s-${note.stance.toLowerCase()}`}>
          {note.stance}
        </span>
      </p>
      <p>{note.what}</p>
      <a className="textlink" href={note.url} rel="noreferrer">
        Visit {note.name}
      </a>
    </>
  );
}

export default function LifeRoom() {
  const [selected, setSelected] = useState<{ room: string; i: number } | null>(
    null,
  );
  const [dogNote, setDogNote] = useState("");
  const dogSpot = useMemo(
    () => ["kitchen", "bedroom", "door"][Math.floor(Math.random() * 3)],
    [],
  );

  const noteFor = (room: string): Note => {
    if (!selected || selected.room !== room) return null;
    const [n, s, u, d] = HOME_ITEMS[room][selected.i];
    return { room, name: n, stance: s, what: d, url: u };
  };

  const onPick = (room: string, i: number) => {
    if (selected?.room === room && selected.i === i) {
      setSelected(null);
      return;
    }
    setSelected({ room, i });
  };

  return (
    <>
      <StationStrip stationKey="life" />
      <div className="wrap life4">
        <header className="l4-head">
          <h1 className="reveal">Off the clock.</h1>
          <p className="lede reveal">
            Outside of work, I&apos;m a family man first. My daughter is four. We
            have a golden retriever. Most of my best hours are spent with them.
          </p>
          <p className="l4-hint">
            This is a Sunday at home. Tap anything to see what it is.
          </p>
        </header>

        <div className="house" id="house">
          <div className="roof" aria-hidden="true" />
          <section className="room kitchen" aria-label="Kitchen">
            <h2>Kitchen</h2>
            <div className="fridge" aria-label="Fridge door">
              <div className="magnet-note">
                <p>Outside work, family first.</p>
              </div>
              <figure className="polaroid p1">
                <span>photo</span>
                <figcaption>not chosen yet</figcaption>
              </figure>
              <figure className="polaroid p2">
                <span>photo</span>
                <figcaption>no stock families</figcaption>
              </figure>
              <figure className="drawing">
                <span>her drawing goes here, if she approves</span>
              </figure>
              <i className="handle" aria-hidden="true" />
            </div>
            <div className="shelf-wrap">
              <div className="shelf">
                <Shelf
                  room="kitchen"
                  only={[0, 1, 2]}
                  selected={selected}
                  onPick={onPick}
                />
              </div>
              <div className="shelf">
                <Shelf
                  room="kitchen"
                  only={[3, 4, 5, 6]}
                  selected={selected}
                  onPick={onPick}
                />
              </div>
              <div className="room-note" id="note-kitchen" aria-live="polite">
                <RoomNote note={noteFor("kitchen")} />
              </div>
            </div>
            <div className="dog-spot" data-spot="kitchen">
              {dogSpot === "kitchen" ? (
                <Dog note={dogNote} setNote={setDogNote} />
              ) : null}
            </div>
          </section>
          <section className="room bath" aria-label="Bathroom">
            <h2>Bathroom</h2>
            <div className="cabinet">
              <div className="shelf">
                <Shelf
                  room="bath"
                  only={[0, 1, 3]}
                  selected={selected}
                  onPick={onPick}
                />
              </div>
              <div className="shelf">
                <Shelf
                  room="bath"
                  only={[2, 4, 5]}
                  selected={selected}
                  onPick={onPick}
                />
              </div>
              <i className="mirror" aria-hidden="true" />
            </div>
            <div className="room-note" id="note-bath" aria-live="polite">
              <RoomNote note={noteFor("bath")} />
            </div>
          </section>
          <section className="room bedroom" aria-label="Bedroom">
            <h2>Bedroom</h2>
            <div className="wardrobe">
              <div className="shelf folds">
                <Shelf
                  room="bedroom"
                  only={[0, 1, 2, 3]}
                  selected={selected}
                  onPick={onPick}
                />
              </div>
            </div>
            <div className="bedside">
              <div className="shelf">
                <i className="lamp" aria-hidden="true" />
                <Shelf
                  room="bedroom"
                  only={[4]}
                  selected={selected}
                  onPick={onPick}
                />
              </div>
            </div>
            <div className="room-note" id="note-bedroom" aria-live="polite">
              <RoomNote note={noteFor("bedroom")} />
            </div>
            <div className="dog-spot" data-spot="bedroom">
              {dogSpot === "bedroom" ? (
                <Dog note={dogNote} setNote={setDogNote} />
              ) : null}
            </div>
          </section>
          <section className="room door" aria-label="By the door">
            <h2>By the door</h2>
            <div className="window" aria-label="Window">
              <p>Places worth the detour.</p>
              <small>Not written yet</small>
            </div>
            <div className="doorway">
              <i className="lead" aria-hidden="true" />
              <div className="shelf rack">
                <Shelf room="door" selected={selected} onPick={onPick} />
              </div>
            </div>
            <div className="room-note" id="note-door" aria-live="polite">
              <RoomNote note={noteFor("door")} />
            </div>
            <div className="dog-spot" data-spot="door">
              {dogSpot === "door" ? (
                <Dog note={dogNote} setNote={setDogNote} />
              ) : null}
            </div>
          </section>
          <div className="floor-slab" aria-hidden="true" />
        </div>
        <p className="l4-small">
          The things in the house are brands I use or want to try. Not
          exhaustive, and not affiliate links.
        </p>

        <NextSide
          prev={{ key: "try", name: "Try what I've made", label: "Back to" }}
          next={{ key: "", name: "The dial", label: "Back to" }}
        />
      </div>
    </>
  );
}

function Dog({
  note,
  setNote,
}: {
  note: string;
  setNote: (s: string) => void;
}) {
  return (
    <>
      <button
        type="button"
        className="dog"
        aria-label="The golden retriever, asleep"
        onClick={() =>
          setNote(note ? "" : "Asleep. Please don't wake the dog.")
        }
        dangerouslySetInnerHTML={{ __html: DOG_SVG }}
      />
      <span className="dog-note" aria-live="polite">
        {note}
      </span>
    </>
  );
}
