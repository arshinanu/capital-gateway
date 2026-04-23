export default function About() {
  const pillars = [
    { n: '01', t: 'Extensive lender network', d: 'We aren\'t tied to any single lender. Our wide panel of UK lenders means we find the product that genuinely fits your situation — not just what\'s available.' },
    { n: '02', t: 'Complete transparency', d: 'No hidden fees, no surprises. We\'re committed to showing you the full picture — rates, costs, and terms — before you commit to anything.' },
    { n: '03', t: 'Personalised service', d: 'Every client is different. We take time to understand your goals and match you to the right finance solution, not the most convenient one.' },
    { n: '04', t: 'Fast, reliable decisions', d: 'We know time matters in business and property. Our team moves quickly so you\'re not left waiting when a funding window opens.' },
  ]

  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-left">
          <span className="eyebrow">Why Capital Gateway</span>
          <h2 className="display about-title">
            The right<br/>
            funding, at the <span className="italic-accent">right time.</span>
          </h2>
          <p className="about-lede">
            We're committed to transparency, speed, and personalised service — ensuring
            our clients get the right funding when they need it most. FCA authorised and
            backed by a wide network of trusted UK lenders.
          </p>
          <div className="signature">
            <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
              <path d="M5 25 Q 15 5, 25 20 T 45 20 Q 55 35, 65 15 T 90 20 Q 100 10, 115 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            </svg>
            <div>
              <strong>Capital Gateway Limited</strong>
              <span>Appointed Representative of Swoop Finance</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          {pillars.map((p, i) => (
            <div key={i} className="pillar">
              <span className="pillar-n">{p.n}</span>
              <div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 120px;
          align-items: start;
        }
        .about-title {
          font-size: clamp(44px, 6.5vw, 88px);
          margin: 24px 0 32px;
        }
        .about-lede {
          font-size: 18px;
          color: var(--muted);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 64px;
        }
        .signature {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 32px;
          border-top: 1px solid var(--line);
          max-width: 420px;
        }
        .signature svg {
          color: var(--forest);
        }
        .signature strong {
          display: block;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
        }
        .signature span {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        .about-right {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pillar {
          display: flex;
          gap: 28px;
          padding: 32px 0;
          border-bottom: 1px solid var(--line);
        }
        .pillar:first-child { padding-top: 0; }
        .pillar:last-child { border-bottom: none; }
        .pillar-n {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
          padding-top: 4px;
          min-width: 30px;
        }
        .pillar h3 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .pillar p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  )
}
