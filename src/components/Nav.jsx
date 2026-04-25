import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#calculator', label: 'Calculator' },
    { href: '#testimonials', label: 'Clients' },
    { href: '#news', label: 'News' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="logo">
            <img src="/logo.png" alt="Capital Gateway" className="logo-img" />
          </a>

          <div className="nav-links">
            {links.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <a href="#contact" className="btn btn-primary nav-cta">
            Get Finance
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11 L11 3 M5 3 H11 V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </a>

          <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className={open ? 'open' : ''}></span>
            <span className={open ? 'open' : ''}></span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary" style={{marginTop: 16, alignSelf: 'flex-start'}}>
            Get Finance
          </a>
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
          background: rgba(244, 241, 234, 0.75);
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
          height: 166px;
          width: auto;
          display: block;
        }
        .nav-links {
          display: flex;
          gap: 36px;
          font-size: 20px;
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
          top: 64px;
          left: 0;
          right: 0;
          background: var(--ivory);
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
