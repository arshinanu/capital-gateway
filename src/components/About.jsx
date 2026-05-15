import { useState } from 'react'
import { motion } from 'framer-motion'

const zoomIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  }
})

export default function About() {
  const [selectedIndex, setSelectedIndex] = useState(1)

  const pillars = [
    {
      n: '01.',
      t: 'Extensive Lender Network',
      d: "We aren't tied to any single lender. Our wide panel of UK lenders means we find the product that genuinely fits your situation — not just what's available.",
    },
    {
      n: '02.',
      t: 'Complete Transparency',
      d: "No hidden fees, no surprises. We're committed to showing you the full picture — rates, costs, and terms — before you commit to anything.",
      featured: true,
    },
    {
      n: '03.',
      t: 'Personalised Service',
      d: "Every client is different. We take time to understand your goals and match you to the right finance solution, not the most convenient one.",
    },
  ]

  return (
    <section id="about" className="about">
      <div className="container">

        <div className="about-header">
          <motion.div
            className="about-header-left"
            variants={zoomIn(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="eyebrow">Why Capital Gateway</span>
            <h2 className="display about-title">
              A Trusted Finance <span className="italic-accent">Partner</span><br/>
              you can rely on.
            </h2>
          </motion.div>
          <motion.div
            className="about-header-right"
            variants={zoomIn(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p>
              From start-ups to seasoned property investors, we offer trusted lender connections
              and transparent finance solutions that help you make calm, informed funding decisions
              without the stress.
            </p>
          </motion.div>
        </div>

        <div className="pillars-row">
          {pillars.map((p, i) => {
            const isSelected = selectedIndex === i
            return (
              <motion.div
                key={i}
                className={`pillar-card${isSelected ? ' pillar-featured' : ''}`}
                onClick={() => setSelectedIndex(i)}
                style={{ cursor: 'pointer' }}
                variants={zoomIn(i * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <span className="pillar-n">{p.n}</span>
                <h3 className="pillar-t">{p.t}</h3>
                <p className="pillar-d">{p.d}</p>
                {isSelected && (
                  <a href="#contact" className="pillar-cta">
                    Learn More
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10H16M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="about-fourth"
          variants={zoomIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="pillar-n" style={{ flexShrink: 0 }}>04.</span>
          <div className="fourth-body">
            <h3>Fast, Reliable Decisions</h3>
            <p>We know time matters in business and property. Our team moves quickly so you're not left waiting when a funding window opens.</p>
          </div>
          <div className="fourth-stat">
            <span className="fourth-num">48hrs</span>
            <span className="fourth-label">Avg. decision time</span>
          </div>
        </motion.div>

      </div>

      <style>{`
        .about {
          border-top: 1px solid var(--line);
        }

        .about-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 80px;
        }

        .about-title {
          font-size: clamp(36px, 5vw, 64px);
          margin: 20px 0 0;
          line-height: 1.05;
        }

        .about-header-right p {
          font-size: 17px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 440px;
        }

        /* Staggered cards — middle card elevated */
        .pillars-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: center;
          margin-bottom: 24px;
        }

        .pillar-card {
          background: var(--ivory);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 280px;
          transition: border-color 0.3s var(--ease), transform 0.3s var(--ease);
        }
        .pillar-card:not(.pillar-featured):hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .pillar-featured {
          background: var(--accent);
          border-color: var(--accent);
          padding: 60px 32px;
          min-height: 380px;
          z-index: 1;
          position: relative;
        }
        .pillar-featured:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 60px -20px rgba(0, 232, 122, 0.4);
        }

        .pillar-n {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--muted);
          letter-spacing: 0.05em;
        }
        .pillar-featured .pillar-n {
          color: rgba(9, 12, 11, 0.55);
        }

        .pillar-t {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--ink);
        }
        .pillar-featured .pillar-t {
          color: var(--paper);
        }

        .pillar-d {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          flex: 1;
        }
        .pillar-featured .pillar-d {
          color: rgba(9, 12, 11, 0.72);
        }

        .pillar-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 500;
          color: var(--paper);
          margin-top: 8px;
          transition: gap 0.2s var(--ease);
        }
        .pillar-cta:hover { gap: 14px; }

        /* Fourth pillar — horizontal bar */
        .about-fourth {
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 32px 40px;
          background: var(--ivory);
          border: 1px solid var(--line);
          border-radius: 16px;
          margin-top: 0;
        }

        .fourth-body h3 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .fourth-body p {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.65;
          max-width: 500px;
        }

        .fourth-stat {
          margin-left: auto;
          text-align: right;
          flex-shrink: 0;
        }
        .fourth-num {
          display: block;
          font-family: var(--font-display);
          font-size: 52px;
          letter-spacing: -0.04em;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 4px;
        }
        .fourth-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }

        @media (max-width: 900px) {
          .about-header {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 48px;
          }
          .pillars-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .pillar-featured {
            padding: 40px 32px;
            min-height: unset;
          }
          .pillar-card { min-height: unset; }
          .about-fourth {
            flex-direction: column;
            align-items: flex-start;
            padding: 28px 24px;
            gap: 20px;
          }
          .fourth-stat { margin-left: 0; text-align: left; }
          .fourth-num { font-size: 40px; }
        }
      `}</style>
    </section>
  )
}
