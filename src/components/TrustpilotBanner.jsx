const TP_GREEN = '#00B67A'

const StarFilled = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1l2.39 7.26H20l-6.19 4.5L15.82 20 10 15.76 4.18 20l1.99-7.24L0 8.26h7.61z" fill={TP_GREEN}/>
  </svg>
)

const TrustpilotLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <path d="M10 1l2.39 7.26H20l-6.19 4.5L15.82 20 10 15.76 4.18 20l1.99-7.24L0 8.26h7.61z" fill={TP_GREEN}/>
    </svg>
    <span className="tp-wordmark">Trustpilot</span>
  </div>
)

const reviews = [
  {
    name: "James H.",
    date: "April 2026",
    rating: 5,
    title: "Exceptional service from start to finish",
    body: "Capital Gateway secured a commercial mortgage for our office acquisition in under three weeks. Genuinely impressed by the speed and professionalism.",
  },
  {
    name: "Sophie M.",
    date: "March 2026",
    rating: 5,
    title: "Found a deal our bank couldn't match",
    body: "After our bank declined, Capital Gateway came back with two competitive offers within 48 hours. The whole process was smooth and transparent.",
  },
  {
    name: "Tom B.",
    date: "February 2026",
    rating: 5,
    title: "Highly recommended for property finance",
    body: "Used them for a bridging loan on a tight timeline. They kept us updated at every stage and the rate was better than expected.",
  },
]

export default function TrustpilotBanner() {
  return (
    <section className="tp-section">
      <div className="container">
        <div className="tp-header">
          <div className="tp-brand">
            <TrustpilotLogo />
            <div className="tp-rating-block">
              <div className="tp-stars">
                {[1,2,3,4,5].map(n => <StarFilled key={n} />)}
              </div>
              <div className="tp-score-line">
                <span className="tp-label">Excellent</span>
                <span className="tp-score">4.9 <span className="tp-outof">out of 5</span></span>
              </div>
            </div>
          </div>
          <a
            href="https://www.trustpilot.com/review/capitalgatewayltd.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-view-all"
          >
            View all reviews
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="tp-cards">
          {reviews.map((r, i) => (
            <div key={i} className="tp-card">
              <div className="tp-card-stars">
                {Array.from({ length: r.rating }).map((_, j) => <StarFilled key={j} />)}
              </div>
              <p className="tp-card-title">{r.title}</p>
              <p className="tp-card-body">{r.body}</p>
              <div className="tp-card-foot">
                <span className="tp-card-name">{r.name}</span>
                <span className="tp-card-date">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tp-section {
          background: var(--paper);
          border-top: 1px solid var(--line);
          padding: 80px 0;
        }
        .tp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 48px;
          flex-wrap: wrap;
          gap: 24px;
        }
        .tp-brand {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .tp-wordmark {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.02em;
        }
        .tp-rating-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tp-stars {
          display: flex;
          gap: 3px;
        }
        .tp-score-line {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .tp-label {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          color: var(--ink);
        }
        .tp-score {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
        .tp-outof {
          opacity: 0.6;
        }
        .tp-view-all {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
          white-space: nowrap;
        }
        .tp-view-all:hover {
          color: ${TP_GREEN};
          border-color: ${TP_GREEN};
        }
        .tp-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .tp-card {
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: box-shadow 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .tp-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }
        .tp-card-stars {
          display: flex;
          gap: 2px;
        }
        .tp-card-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .tp-card-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.65;
          flex: 1;
        }
        .tp-card-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }
        .tp-card-name {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--ink);
        }
        .tp-card-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
        @media (max-width: 900px) {
          .tp-cards {
            grid-template-columns: 1fr;
          }
          .tp-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
