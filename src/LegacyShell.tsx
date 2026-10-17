import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

/** Minimal chrome for project deep-dives that still use the editorial page CSS. */
export default function LegacyShell() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.dataset.side = "home";
    document.body.dataset.theme = "murphy";
    window.scrollTo(0, 0);
    return () => {
      delete document.body.dataset.side;
      delete document.body.dataset.theme;
    };
  }, [pathname]);

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
            <li>
              <Link to="/build" data-key="build">
                <i aria-hidden="true" />
                Build something
              </Link>
            </li>
            <li>
              <Link to="/quiet" data-key="quiet">
                <i aria-hidden="true" />
                Find a little quiet
              </Link>
            </li>
            <li>
              <Link to="/try" data-key="try">
                <i aria-hidden="true" />
                Try what I&apos;ve made
              </Link>
            </li>
            <li>
              <Link to="/life" data-key="life">
                <i aria-hidden="true" />
                Off the clock
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="foot">
        <div className="foot-inner">
          <p className="foot-line">
            Built by me with Claude Code. If something&apos;s broken or too grey,
            tell me.
          </p>
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
            <li>
              <a href="/rss.xml">RSS</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
