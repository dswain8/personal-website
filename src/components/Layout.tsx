import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navLinks = [
  { to: '/build', label: 'Build' },
  { to: '/stack', label: 'Stack' },
  { to: '/living', label: 'Living' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Say hello' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <NavLink
            to="/"
            className="brand-link"
            aria-label="Debjeet Swain home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">Debjeet Swain</span>
          </NavLink>

          <nav className="nav-links desktop-nav" aria-label="Primary navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="mobile-menu-button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`mobile-menu-icon ${mobileOpen ? 'is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <div className="mobile-nav-overlay open" onClick={() => setMobileOpen(false)} />

          <nav id="mobile-navigation" className="mobile-nav-drawer open" aria-label="Mobile navigation">
            <div className="mobile-nav-drawer__links">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      ) : null}

      <main id="main-content" style={{ flex: 1 }} className="page-enter" key={pathname}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="footer-note">
            <span>&copy; {new Date().getFullYear()} Debjeet Swain</span>
            <small>
              Product, systems, and cleaner living from India. Built with a bias to ship.
            </small>
          </div>
          <div className="footer-links">
            <a
              className="footer-link"
              href="https://linkedin.com/in/debjeetswain"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a className="footer-link" href="mailto:debjeet.swain87@gmail.com">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
