import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="top" className="hero">
      {/* Background video */}
      <div className="hero-bg" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark left-to-right gradient overlay so text stays readable */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Floating shapes */}
      <div className="hero-shapes" aria-hidden="true">
        <div className="hero-shape shape-a" />
        <div className="hero-shape shape-b" />
      </div>

      <div className="container hero-inner">
        {/* Content — left half */}
        <div className="hero-content">
          <div className="hero-top-row reveal" style={{ animationDelay: '0s' }}>
            <span className="eyebrow">FCA Authorised · UK Finance Broker</span>
            <span className="status-pill">
              <span className="dot" />
              Accepting new clients
            </span>
          </div>

          <h1 className="display hero-title reveal" style={{ animationDelay: '0.1s' }}>
            Unlock finance<br/>
            <span className="italic-accent">solutions</span><br/>
            for your business.
          </h1>

          <p className="hero-lede reveal" style={{ animationDelay: '0.22s' }}>
            Capital Gateway connects UK businesses and property owners to a wide
            network of lenders — delivering tailored finance with transparency,
            speed, and genuinely personalised service.
          </p>

          <div className="hero-actions reveal" style={{ animationDelay: '0.32s' }}>
            <Link to="/apply" className="btn btn-accent">
              Start an enquiry
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="#services" className="btn btn-ghost">View services</a>
          </div>

          <div className="stat-strip reveal" style={{ animationDelay: '0.45s' }}>
            {[
              { k: '400+', v: 'Lender network' },
              { k: '48hrs', v: 'Avg. decision' },
              { k: '100%', v: 'Transparent fees' },
              { k: 'FCA', v: 'Authorised' },
            ].map((s, i) => (
              <div key={i} className="stat">
                <div className="stat-k">{s.k}</div>
                <div className="stat-v">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards — over the right (building) side */}
        <div className="hero-cards" aria-hidden="true">
          <div className="hero-float-card">
            <div className="float-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 14l4-5 3 3 4-6 3 3" stroke="#00e87a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="float-num">48h</div>
              <div className="float-label">avg. decision time</div>
            </div>
          </div>

          <div className="hero-float-badge">
            <span className="float-badge-dot" />
            <span>£500M+ arranged</span>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Section ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 120px;
          padding-bottom: 80px;
          overflow: hidden;
        }

        /* Full-bleed background video */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: blur(3px) brightness(0.75) contrast(1.1);
          transform: scale(1.06); /* hide blur edges */
          will-change: transform;
        }

        /* Gradient overlay: solid left (text area) → semi-transparent right (video shows) */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to right,
              #090c0b 0%,
              #090c0b 28%,
              rgba(9,12,11,0.78) 48%,
              rgba(9,12,11,0.35) 68%,
              rgba(9,12,11,0.15) 100%
            );
          z-index: 1;
        }

        /* ── Inner grid ── */
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          width: 100%;
          gap: 0;
        }

        /* ── Left content ── */
        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 580px;
        }

        .hero-top-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--font-mono);
          background: rgba(9,12,11,0.6);
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }
        .dot {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(0,232,122,0.25);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(0,232,122,0.25); }
          50%       { box-shadow: 0 0 0 6px rgba(0,232,122,0); }
        }

        .hero-title {
          font-size: clamp(52px, 8vw, 120px);
          line-height: 0.92;
          margin: 0;
        }

        .hero-lede {
          font-size: 17px;
          line-height: 1.65;
          color: var(--muted);
          max-width: 440px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Stat strip */
        .stat-strip {
          display: grid;
          grid-template-columns: repeat(4, auto);
          justify-content: start;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 28px;
          gap: 0;
          margin-top: 4px;
        }
        .stat {
          padding-right: 24px;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: transform 0.3s var(--ease);
        }
        .stat:last-child { border-right: none; padding-right: 0; }
        .stat:first-child { padding-left: 0; }
        .stat + .stat { padding-left: 24px; }
        .stat:hover { transform: perspective(300px) translateZ(8px); }
        .stat-k {
          font-family: var(--font-display);
          font-size: 30px;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 5px;
          color: var(--accent);
        }
        .stat-v {
          font-size: 11px;
          color: var(--muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Right — floating cards ── */
        .hero-cards {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          padding-right: 24px;
          pointer-events: none;
        }

        /* Floating stat card */
        .hero-float-card {
          background: rgba(9,12,11,0.65);
          border: 1px solid rgba(0,232,122,0.2);
          border-radius: 16px;
          padding: 18px 22px;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          backdrop-filter: blur(16px);
          animation: float-card 6s ease-in-out infinite;
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,232,122,0.08);
        }
        @keyframes float-card {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .float-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(0,232,122,0.12);
          border: 1px solid rgba(0,232,122,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .float-num {
          font-family: var(--font-display);
          font-size: 28px;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--accent);
        }
        .float-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-top: 4px;
        }

        /* Floating badge */
        .hero-float-badge {
          background: rgba(9,12,11,0.65);
          border: 1px solid rgba(0,232,122,0.2);
          border-radius: 999px;
          padding: 9px 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--ink-2);
          backdrop-filter: blur(16px);
          animation: float-card 6s ease-in-out infinite 2s;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .float-badge-dot {
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 6px rgba(0,232,122,0.6);
        }

        /* Floating shapes */
        .hero-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .hero-shape {
          position: absolute;
          border: 1px solid rgba(0,232,122,0.07);
          background: transparent;
          will-change: transform;
        }
        .shape-a {
          width: 70px; height: 70px;
          top: 20%; left: 48%;
          border-radius: 12px;
          animation: rot3d-a 22s linear infinite;
        }
        .shape-b {
          width: 36px; height: 36px;
          bottom: 28%; left: 40%;
          border-radius: 50%;
          border-color: rgba(0,232,122,0.12);
          animation: rot3d-b 14s linear infinite reverse;
        }
        @keyframes rot3d-a {
          from { transform: perspective(600px) rotateX(0deg)   rotateY(0deg)   rotateZ(0deg); }
          to   { transform: perspective(600px) rotateX(360deg) rotateY(180deg) rotateZ(45deg); }
        }
        @keyframes rot3d-b {
          from { transform: perspective(600px) rotateY(0deg) rotateZ(0deg); }
          to   { transform: perspective(600px) rotateY(360deg) rotateZ(180deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-shape, .hero-float-card, .hero-float-badge { animation: none; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; }
          .hero-cards {
            display: none; /* hide on mobile — image visible through bg */
          }
          .hero-overlay {
            background: linear-gradient(
              to bottom,
              rgba(9,12,11,0.55) 0%,
              rgba(9,12,11,0.8) 55%,
              #090c0b 88%
            );
          }
          .hero-content { max-width: 100%; }
          .stat-strip {
            grid-template-columns: repeat(2, auto);
            gap: 16px 0;
          }
          .stat:nth-child(2) { border-right: none; }
          .stat:nth-child(3) {
            border-right: 1px solid rgba(255,255,255,0.08);
            padding-left: 0;
            padding-top: 16px;
          }
          .stat:nth-child(4) { padding-top: 16px; }
        }

        @media (max-width: 480px) {
          .hero { padding-top: 100px; padding-bottom: 60px; }
          .hero-title { font-size: clamp(44px, 12vw, 72px); }
          .stat-strip { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}
