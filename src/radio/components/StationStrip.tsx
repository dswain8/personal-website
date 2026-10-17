import { Link } from "react-router-dom";
import { STATIONS, type StationKey } from "../data/stations";

export function StationStrip({ stationKey }: { stationKey: StationKey }) {
  const st = STATIONS.find((x) => x.key === stationKey)!;
  return (
    <div
      className="hud station-strip"
      role="region"
      aria-label={`Now playing: ${st.name}, ${st.freq} FM`}
    >
      <span className="ss-led" aria-hidden="true" />
      <span className="ss-freq">
        {st.freq}
        <small>FM</small>
      </span>
      <span className="hud-name">
        <b>{st.name}</b>
      </span>
      <span className="hud-spacer" />
      <Link
        className="ss-who"
        to="/"
        onClick={() => sessionStorage.setItem("dial", String(st.at))}
      >
        Debjeet Swain
      </Link>
      <Link
        className="hud-menu"
        to="/"
        onClick={() => sessionStorage.setItem("dial", String(st.at))}
      >
        Back to the dial
      </Link>
    </div>
  );
}
