import { TrendingUp, Package, FileText, Landmark, Wrench, Building2 } from 'lucide-react'

const services = [
  {
    num: '01',
    cat: 'Business',
    icon: TrendingUp,
    title: 'Working Capital Funding',
    desc: 'Keep operations running smoothly with flexible working capital. Fund payroll, stock, and day-to-day expenses without disrupting cash flow.',
    range: 'Flexible',
    term: 'Revolving',
  },
  {
    num: '02',
    cat: 'Business',
    icon: Package,
    title: 'Asset Finance',
    desc: 'Purchase or lease the equipment, vehicles, and machinery your business needs to grow — without tying up your working capital.',
    range: 'From £5k',
    term: '1 – 7 years',
  },
  {
    num: '03',
    cat: 'Business',
    icon: FileText,
    title: 'Invoice Finance',
    desc: 'Unlock cash tied up in unpaid invoices immediately. Stop waiting 30–90 days and keep your business moving forward.',
    range: 'Up to 90%',
    term: 'Flexible',
  },
  {
    num: '04',
    cat: 'Property',
    icon: Landmark,
    title: 'Commercial & Residential Mortgages',
    desc: 'Tailored mortgage solutions for both commercial properties and residential investments, with access to competitive rates across our lender panel.',
    range: 'Varies',
    term: '5 – 25 years',
  },
  {
    num: '05',
    cat: 'Property',
    icon: Building2,
    title: 'Development Finance',
    desc: 'Fund large-scale development projects from ground-up builds to major conversions. Structured to match your project milestones and drawdown schedule.',
    range: 'Varies',
    term: '12 – 36 months',
  },
  {
    num: '06',
    cat: 'Property',
    icon: Wrench,
    title: 'Bridging & Mezzanine',
    desc: 'Short-term bridging loans for time-critical transactions, plus mezzanine finance blending the benefits of debt and equity for complex deals.',
    range: 'Varies',
    term: '1 – 24 months',
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-head">
          <span className="eyebrow">What we do</span>
          <h2 className="display services-title">
            Business and property finance.<br/>
            <span className="italic-accent">One gateway</span> to all of it.
          </h2>
          <p className="services-sub">
            We connect you to a wide network of lenders — finding the right fit for your
            business or property finance needs, quickly and without the jargon.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <article key={i} className="service-card">
                <div className="service-head">
                  <span className="service-num">{s.num}</span>
                  <span className="service-cat">{s.cat}</span>
                </div>
                <Icon size={28} strokeWidth={1.5} className="service-icon" />
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-meta">
                  <div>
                    <span>Loan size</span>
                    <strong>{s.range}</strong>
                  </div>
                  <div>
                    <span>Term</span>
                    <strong>{s.term}</strong>
                  </div>
                </div>
                <a href="#contact" className="service-link">
                  Discuss this option
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7 H11 M8 4 L11 7 L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </article>
            )
          })}
        </div>
      </div>

      <style>{`
        .services {
          background: var(--paper);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .services-head {
          max-width: 780px;
          margin-bottom: 80px;
        }
        .services-title {
          font-size: clamp(40px, 6vw, 80px);
          margin: 24px 0 32px;
        }
        .services-sub {
          font-size: 17px;
          color: var(--muted);
          line-height: 1.6;
          max-width: 600px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
        }
        .service-card {
          background: var(--paper);
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: background 0.3s var(--ease);
          position: relative;
        }
        .service-card:hover {
          background: var(--ivory);
        }
        .service-card:hover .service-icon {
          color: var(--forest);
          transform: rotate(-8deg) scale(1.1);
        }
        .service-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .service-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
        }
        .service-cat {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 4px 10px;
          border: 1px solid var(--line);
          border-radius: 999px;
          color: var(--ink-2);
        }
        .service-icon {
          color: var(--ink);
          transition: all 0.5s var(--ease);
          margin-top: 12px;
        }
        .service-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .service-desc {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.55;
          flex: 1;
        }
        .service-meta {
          display: flex;
          gap: 24px;
          padding: 20px 0;
          border-top: 1px solid var(--line);
        }
        .service-meta > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .service-meta span {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
        }
        .service-meta strong {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
        }
        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
        }
        .service-link:hover {
          color: var(--forest);
        }

        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
