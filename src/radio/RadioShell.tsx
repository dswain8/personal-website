import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { stopDrone } from "./audio";
import type { StationKey } from "./data/stations";

const SIDES: { key: StationKey; label: string }[] = [
  { key: "build", label: "Build something" },
  { key: "quiet", label: "Find a little quiet" },
  { key: "try", label: "Try what I've made" },
  { key: "life", label: "Off the clock" },
];

function sideFromPath(pathname: string): string {
  if (pathname === "/") return "radio";
  const seg = pathname.split("/")[1];
  if (["build", "quiet", "try", "life"].includes(seg)) return seg;
  return "home";
}

export default function RadioShell() {
  const { pathname } = useLocation();
  const side = sideFromPath(pathname);

  useEffect(() => {
    document.body.dataset.side = side;
    document.body.dataset.theme = "murphy";
    if (side !== "quiet") stopDrone();
    return () => {
      delete document.body.dataset.side;
      delete document.body.dataset.theme;
      delete document.body.dataset.tuned;
    };
  }, [side]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const titles: Record<string, string> = {
      radio: "Debjeet Swain",
      build: "Build something · Debjeet Swain",
      quiet: "Find a little quiet · Debjeet Swain",
      try: "Try what I've made · Debjeet Swain",
      life: "Off the clock · Debjeet Swain",
      home: "Debjeet Swain",
    };
    document.title = titles[side] ?? "Debjeet Swain";
  }, [side]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="bar" id="bar">
        <Link className="wordmark" to="/">
          Debjeet Swain
        </Link>
        <nav aria-label="Sides of the site">
          <ul className="sides">
            {SIDES.map(({ key, label }) => (
              <li key={key}>
                <NavLink to={`/${key}`} data-key={key}>
                  <i aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="foot">
        <div className="foot-inner">
          <p className="foot-line">Bengaluru</p>
          <ul className="foot-links">
            <li>
              <a href="mailto:debjeet.swain87@gmail.com">Email</a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/debjeetswain"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/dswain8" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
