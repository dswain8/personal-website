import { Link } from "react-router-dom";

type Side = { key: string; name: string; label?: string };

export function NextSide({ prev, next }: { prev: Side; next: Side }) {
  const prevTo = prev.key ? `/${prev.key}` : "/";
  const nextTo = next.key ? `/${next.key}` : "/";
  return (
    <nav className="next-side" aria-label="Other sides">
      <Link to={prevTo}>
        <small>← {prev.label || "Back"}</small>
        <span>{prev.name}</span>
      </Link>
      <Link to={nextTo} style={{ textAlign: "right" }}>
        <small>{next.label || "Next"} →</small>
        <span>{next.name}</span>
      </Link>
    </nav>
  );
}
