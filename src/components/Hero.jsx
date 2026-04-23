export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-top">
          <span className="eyebrow">FCA Authorised · UK Finance Broker</span>
          <span className="status-pill">
            <span className="dot"></span>
            Accepting new clients
          </span>
        </div>

        <h1 className="display hero-title reveal">
          Unlock finance<br/>
          <span className="italic-accent">solutions</span> for your business.
        </h1>

        <div className="hero-bottom">
          <div className="hero-lede">
            <p>
              Capital Gateway connects UK businesses and property owners to a wide
              network of lenders — delivering tailored finance with transparency,
              speed, and genuinely personalised service.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-accent">
                Start an enquiry
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#services" className="btn btn-ghost">View services</a>
            </div>
          </div>

          <div className="hero-chart">
            <svg viewBox="0 0 320 200" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c6ff4a" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#c6ff4a" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* grid */}
              {[0, 1, 2, 3].map(i => (
                <line key={i} x1="0" y1={50 * i + 10} x2="320" y2={50 * i + 10} stroke="#d9d3c4" strokeWidth="0.5" strokeDasharray="2 4"/>
              ))}
              {/* area */}
              <path d="M0,170 L40,150 L80,155 L120,120 L160,130 L200,90 L240,100 L280,55 L320,40 L320,200 L0,200 Z" fill="url(#chartGrad)"/>
              {/* line */}
              <path d="M0,170 L40,150 L80,155 L120,120 L160,130 L200,90 L240,100 L280,55 L320,40" stroke="#1f3a32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* point */}
              <circle cx="320" cy="40" r="6" fill="#c6ff4a" stroke="#0f1412" strokeWidth="2"/>
            </svg>
            <div className="chart-label">
              <span className="chart-num">Fast</span>
              <span className="chart-sub">approvals & decisions</span>
            </div>
          </div>
        </div>

        <div className="stat-strip">
          {[
            { k: 'FCA', v: 'Authorised broker' },
            { k: '50+', v: 'Lender network' },
            { k: '48hrs', v: 'Avg. decision time' },
            { k: '100%', v: 'Transparent fees' },
          ].map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-k">{s.k}</div>
              <div className="stat-v">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero {
          padding-top: 160px;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }
        .hero::after {
          content: '';
          position: absolute;
          top: 10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(31, 58, 50, 0.08), transparent 70%);
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 1;
        }
        .hero-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 64px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid var(--line);
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--font-mono);
          background: var(--paper);
        }
        .dot {
          width: 6px; height: 6px;
          background: var(--accent-2);
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(198, 255, 74, 0.3);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(198, 255, 74, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(198, 255, 74, 0); }
        }

        .hero-title {
          font-size: clamp(56px, 11vw, 168px);
          margin-bottom: 80px;
        }

        .hero-bottom {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 100px;
        }
        .hero-lede p {
          font-size: 19px;
          line-height: 1.55;
          color: var(--ink-2);
          max-width: 480px;
          margin-bottom: 32px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero-chart {
          position: relative;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 28px;
          height: 240px;
        }
        .hero-chart svg {
          width: 100%;
          height: 140px;
        }
        .chart-label {
          display: flex;
          flex-direction: column;
          margin-top: 12px;
        }
        .chart-num {
          font-family: var(--font-display);
          font-size: 36px;
          letter-spacing: -0.02em;
        }
        .chart-sub {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .stat-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 32px 0;
        }
        .stat {
          padding: 0 24px;
          border-left: 1px solid var(--line);
        }
        .stat:first-child { border-left: none; padding-left: 0; }
        .stat-k {
          font-family: var(--font-display);
          font-size: 40px;
          letter-spacing: -0.025em;
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-v {
          font-size: 13px;
          color: var(--muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        @media (max-width: 900px) {
          .hero-bottom {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .stat-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 0;
          }
          .stat:nth-child(3) { border-left: none; padding-left: 0; }
          .stat-k { font-size: 32px; }
        }
      `}</style>
    </section>
  )
}
