export default function LendersStrip() {
  const lenders = [
    'Barclays', 'HSBC', 'Lloyds', 'NatWest', 'Santander',
    'Shawbrook', 'Aldermore', 'OakNorth', 'Paragon', 'United Trust'
  ]
  return (
    <section className="lenders">
      <div className="container">
        <p className="lenders-label">
          <span className="eyebrow">Panel of 120+ lenders · Including</span>
        </p>
        <div className="lenders-track">
          <div className="lenders-row">
            {[...lenders, ...lenders].map((l, i) => (
              <span key={i} className="lender">{l}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .lenders {
          padding: 60px 0;
          border-top: 1px solid var(--line);
          overflow: hidden;
        }
        .lenders-label {
          text-align: center;
          margin-bottom: 32px;
        }
        .lenders-label .eyebrow::before,
        .lenders-label .eyebrow::after {
          content: '';
          width: 24px;
          height: 1px;
          background: var(--ink);
        }
        .lenders-track {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .lenders-row {
          display: flex;
          gap: 80px;
          animation: scroll 40s linear infinite;
          white-space: nowrap;
          width: max-content;
        }
        .lender {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--muted);
          font-style: italic;
          flex-shrink: 0;
        }
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
