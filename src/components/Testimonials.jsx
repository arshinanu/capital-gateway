import { useState } from 'react'

const quotes = [
  {
    quote: "Capital Gateway found us a working capital facility within days when our bank said no. Their network of lenders is genuinely impressive, and the team kept us informed every step of the way.",
    name: "Mark T.",
    role: "Managing Director",
    company: "UK Manufacturing Business",
    sector: "Business Finance",
    value: "Fast approval",
  },
  {
    quote: "We needed development finance for a complex conversion project and Capital Gateway delivered competitive terms we couldn't find anywhere else. Professional, transparent, and efficient.",
    name: "Rachel S.",
    role: "Property Developer",
    company: "Private Client",
    sector: "Development Finance",
    value: "Competitive rates",
  },
  {
    quote: "As a first-time investor, I was nervous about the process. Capital Gateway explained every option clearly and found me a buy-to-let mortgage that perfectly matched my situation.",
    name: "David W.",
    role: "Property Investor",
    company: "Private Client",
    sector: "Property Finance",
    value: "Tailored advice",
  },
]

export default function Testimonials() {
  const [i, setI] = useState(0)
  const q = quotes[i]

  return (
    <section id="testimonials" className="test">
      <div className="container">
        <div className="test-head">
          <span className="eyebrow">Clients</span>
          <h2 className="display test-title">
            Real clients,<br/>
            <span className="italic-accent">real</span> results.
          </h2>
        </div>

        <div className="test-panel">
          <div className="quote-mark">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
              <path d="M15 30 Q 5 30, 5 20 Q 5 10, 15 5 M15 30 Q 15 50, 5 55" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M45 30 Q 35 30, 35 20 Q 35 10, 45 5 M45 30 Q 45 50, 35 55" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          <blockquote key={i} className="quote reveal">
            {q.quote}
          </blockquote>

          <div className="quote-foot">
            <div>
              <strong>{q.name}</strong>
              <span>{q.role}, {q.company}</span>
            </div>
            <div className="quote-meta">
              <span>{q.sector}</span>
              <strong>{q.value}</strong>
            </div>
          </div>

          <div className="quote-nav">
            <button onClick={() => setI((i - 1 + quotes.length) % quotes.length)} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4 L6 9 L11 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="quote-dots">
              {quotes.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === i ? 'active' : ''}`}
                  onClick={() => setI(idx)}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % quotes.length)} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4 L12 9 L7 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .test {
          background: var(--paper);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .test-head {
          margin-bottom: 64px;
        }
        .test-title {
          font-size: clamp(44px, 6.5vw, 88px);
          margin-top: 24px;
        }
        .test-panel {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }
        .quote-mark {
          color: var(--forest);
          opacity: 0.35;
          margin-bottom: 32px;
        }
        .quote {
          font-family: var(--font-display);
          font-size: clamp(24px, 3.2vw, 38px);
          line-height: 1.25;
          letter-spacing: -0.02em;
          font-weight: 400;
          color: var(--ink);
          margin-bottom: 48px;
        }
        .quote-foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 32px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .quote-foot strong {
          display: block;
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 4px;
        }
        .quote-foot span {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .quote-meta {
          text-align: right;
        }
        .quote-meta strong {
          color: var(--forest);
          font-size: 28px;
          margin-top: 4px;
        }
        .quote-nav {
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: center;
        }
        .quote-nav button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s var(--ease);
        }
        .quote-nav button:hover {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .quote-dots {
          display: flex;
          gap: 8px;
        }
        .quote-dots .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--line);
          border: none;
          padding: 0;
          transition: all 0.3s var(--ease);
        }
        .quote-dots .dot.active {
          background: var(--ink);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  )
}
