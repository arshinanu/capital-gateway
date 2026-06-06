import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#services', label: 'Services' },
    { href: '/#about', label: 'About' },
    { href: '/#calculator', label: 'Calculator' },
    { href: '/#testimonials', label: 'Clients' },
    { href: '/#news', label: 'News' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <motion.a
            href="/"
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src="/white-01.png" alt="Capital Gateway" className="logo-img" />
          </motion.a>

          <div className="nav-links">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
            <Link to="/apply" className="nav-link nav-link-apply">Apply</Link>
            <Link to="/login" className="nav-link nav-link-login">Login</Link>
          </div>

          <Link to="/apply" className="btn btn-primary nav-cta">
            Get Finance
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11 L11 3 M5 3 H11 V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </Link>

          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={open ? 'open' : ''}></span>
            <span className={open ? 'open' : ''}></span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu" style={{ top: scrolled ? '68px' : '84px' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Link to="/apply" onClick={() => setOpen(false)}>Apply</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/apply" onClick={() => setOpen(false)} className="btn btn-primary" style={{marginTop: 16, alignSelf: 'flex-start'}}>
            Get Finance
          </Link>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.4s var(--ease);
          padding: 20px 0;
        }
        .nav-scrolled {
          backdrop-filter: blur(20px);
          background: rgba(9, 12, 11, 0.85);
          border-bottom: 1px solid var(--line);
          padding: 12px 0;
        }
        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .logo {
          display: inline-flex;
          align-items: center;
        }
        .logo-img {
          height: 44px;
          width: auto;
          display: block;
          transform: scale(4.00);
          transform-origin: left center;
        }
        .nav-links {
          display: flex;
          gap: 36px;
          font-size: 15px;
        }
        .nav-link {
          color: var(--ink-2);
          position: relative;
          padding: 4px 0;
          transition: color 0.3s var(--ease);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--ink);
          transition: width 0.3s var(--ease);
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link-apply {
          color: var(--accent);
          font-weight: 600;
        }
        .nav-link-login {
          color: var(--ink-2);
          font-weight: 500;
          border: 1px solid var(--line);
          padding: 6px 14px;
          border-radius: 999px;
          transition: border-color 0.25s var(--ease), color 0.25s var(--ease);
        }
        .nav-link-login:hover { border-color: var(--ink); color: var(--ink); }
        .nav-link-login::after { display: none; }

        .nav-cta {
          padding: 10px 20px;
          font-size: 14px;
        }

        .nav-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
        }
        .nav-burger span {
          width: 22px;
          height: 1.5px;
          background: var(--ink);
          transition: all 0.3s var(--ease);
        }
        .nav-burger span.open:first-child {
          transform: translateY(3px) rotate(45deg);
        }
        .nav-burger span.open:last-child {
          transform: translateY(-3px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          left: 0;
          right: 0;
          background: rgba(9, 18, 13, 0.97);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid var(--line);
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          z-index: 99;
          font-size: 18px;
          font-family: var(--font-display);
        }

        @media (max-width: 900px) {
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>
    </>
  )
}
