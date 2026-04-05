import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navLinks = [
  { to: '/build', label: 'Build' },
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
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: scrolled ? 'rgba(246, 248, 251, 0.92)' : 'var(--bg)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          padding: '0 var(--page-px)',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <NavLink
          to="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '20px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: 'var(--text)',
          }}
        >
          Debjeet Swain
        </NavLink>

        {/* Desktop nav */}
        <nav
          className="hidden sm:flex"
          style={{
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                fontSize: '14px',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                transition: 'color 0.2s',
                position: 'relative',
              })}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '1.5px',
                        background: 'var(--accent)',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex sm:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
            zIndex: 60,
          }}
          aria-label="Toggle navigation"
        >
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'var(--text)',
              borderRadius: '1px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translateY(6.5px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'var(--text)',
              borderRadius: '1px',
              transition: 'opacity 0.2s',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '20px',
              height: '1.5px',
              background: 'var(--text)',
              borderRadius: '1px',
              transition: 'transform 0.3s, opacity 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile drawer */}
      <nav className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-heading)',
                fontSize: '24px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--accent)' : 'var(--text)',
                transition: 'color 0.2s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page content */}
      <main style={{ flex: 1 }} className="page-enter" key={pathname}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '28px var(--page-px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          &copy; {new Date().getFullYear()} Debjeet Swain
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a
            href="https://linkedin.com/in/debjeetswain"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            LinkedIn
          </a>
          <a
            href="mailto:debjeet.swain87@gmail.com"
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  )
}
