import { useState, useEffect } from 'react'
import { TrendingUp, Building2, Layers, Landmark, ChevronDown, X, ArrowRight } from 'lucide-react'
import servicesData from '../data/services.json'

// Icon names used in services.json → lucide components
const ICONS = { TrendingUp, Building2, Layers, Landmark }

const categories = servicesData.categories

// Text fields may be a single string or an array of paragraphs
const toParagraphs = (text) => (Array.isArray(text) ? text : text ? [text] : [])

function Section({ title, children }) {
  return (
    <section className="modal-section">
      <h4 className="modal-section-title">{title}</h4>
      {children}
    </section>
  )
}

const Paras = ({ text }) =>
  toParagraphs(text).map((p, i) => <p key={i} className="modal-desc">{p}</p>)

// Renders a sub-service's detail. See src/data/services.json for the fields.
function ServiceDetail({ item }) {
  const { overview, desc, howItWorks, uses, considerations, help, riskWarning, note } = item
  return (
    <>
      {(overview || desc) && (
        <Section title="Overview"><Paras text={overview || desc} /></Section>
      )}

      {howItWorks?.length > 0 && (
        <Section title="How It Works">
          <ol className="modal-steps">
            {howItWorks.map((step, i) => (
              <li key={i} className="modal-step">
                <span className="modal-step-num">{i + 1}</span>
                <div>
                  <h5 className="modal-step-title">{step.title}</h5>
                  <p className="modal-desc">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {uses && (
        <Section title={uses.title || 'What Can the Funding Be Used For?'}>
          <Paras text={uses.intro} />
          {uses.items?.length > 0 && (
            <ul className="modal-highlights">
              {uses.items.map((u, i) => <li key={i}>{u}</li>)}
            </ul>
          )}
        </Section>
      )}

      {considerations && (
        <Section title="Key Considerations"><Paras text={considerations} /></Section>
      )}

      {help && (
        <Section title="How Capital Gateway Ltd Can Help"><Paras text={help} /></Section>
      )}

      {riskWarning && <p className="modal-risk">{riskWarning}</p>}
      {note && <p className="modal-note">{note}</p>}
    </>
  )
}

export default function Services() {
  const [open, setOpen] = useState(null)
  const [selected, setSelected] = useState(null)

  const toggle = (id) => setOpen(prev => (prev === id ? null : id))

  useEffect(() => {
    if (!selected) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="services" className="services">
      <div className="container">

        <div className="services-head">
          <span className="eyebrow">What we do</span>
          <h2 className="display services-title">
            Business and property finance.<br />
            <span className="italic-accent">One gateway</span> to all of it.
          </h2>
          <p className="services-sub">
            We connect you to a wide network of lenders — finding the right fit for your
            business or property finance needs, quickly and without the jargon.
          </p>
          <div className="services-stats">
            <div className="stat-pill">
              <span className="stat-num">35+</span>
              <span className="stat-label">Finance products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-num">4</span>
              <span className="stat-label">Specialist categories</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-pill">
              <span className="stat-num">1</span>
              <span className="stat-label">Expert broker</span>
            </div>
          </div>
        </div>

        <div className="accordion">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon] || Layers
            const isOpen = open === cat.id
            return (
              <div key={cat.id} className={`acc-item${isOpen ? ' acc-open' : ''}`}>

                <button
                  className="acc-trigger"
                  onClick={() => toggle(cat.id)}
                  aria-expanded={isOpen}
                >
                  <div className="acc-left">
                    <span className="acc-tag">{cat.tag}</span>
                    <div className="acc-label">
                      <span className="acc-icon-wrap">
                        <Icon size={18} strokeWidth={1.5} className="acc-icon" />
                      </span>
                      <span className="acc-title">{cat.title}</span>
                    </div>
                  </div>
                  <div className="acc-right">
                    <span className="acc-summary">{cat.summary}</span>
                    <span className="acc-count">{cat.items.length}</span>
                    <ChevronDown size={20} className="acc-chevron" strokeWidth={1.5} />
                  </div>
                </button>

                <div className="acc-body">
                  <div className="acc-inner">
                    <div className="sub-grid">
                      {cat.items.map((item, i) => (
                        <button
                          key={i}
                          className="sub-card"
                          onClick={() => setSelected({ ...item, catTitle: cat.title })}
                        >
                          <span className="sub-num">{String(i + 1).padStart(2, '0')}</span>
                          <span className="sub-name">{item.name}</span>
                          <span className="sub-hint">
                            Learn more
                            <ArrowRight size={11} strokeWidth={2} />
                          </span>
                          <span className="sub-bar" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)} role="presentation">
          <div
            className="modal-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header-strip" />
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">
              <X size={18} strokeWidth={1.5} />
            </button>
            <span className="modal-cat">{selected.catTitle}</span>
            <h3 className="modal-title" id="modal-title">{selected.name}</h3>
            <div className="modal-body">
              <ServiceDetail item={selected} />
            </div>
            <a href="#contact" className="btn btn-primary modal-cta" onClick={() => setSelected(null)}>
              Discuss this option
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      )}

      <style>{`
        .services {
          background: var(--paper);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }
        .services::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(0,232,122,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 0% 100%, rgba(0,232,122,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .services-head {
          max-width: 780px;
          margin-bottom: 64px;
        }
        .services-title {
          font-size: clamp(41px, calc(6vw + 1px), 81px);
          font-weight: 600;
          margin: 24px 0 32px;
        }
        .services-sub {
          font-size: 18px;
          font-weight: 600;
          color: var(--muted);
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 40px;
        }

        /* Stats row */
        .services-stats {
          display: flex;
          align-items: center;
          gap: 0;
          width: fit-content;
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          background: var(--ivory);
        }
        .stat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 14px 28px;
          gap: 2px;
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--accent);
          line-height: 1;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--muted);
          white-space: nowrap;
        }
        .stat-divider {
          width: 1px;
          height: 36px;
          background: var(--line);
          flex-shrink: 0;
        }

        /* Accordion */
        .accordion {
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 24px rgba(0,232,122,0.04);
        }
        .acc-item {
          border-bottom: 1px solid var(--line);
          position: relative;
        }
        .acc-item:last-child { border-bottom: none; }
        .acc-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s var(--ease);
        }
        .acc-open::before { transform: scaleY(1); }

        .acc-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 32px;
          padding: 32px 36px;
          background: var(--paper);
          cursor: pointer;
          text-align: left;
          transition: background 0.25s var(--ease);
        }
        .acc-trigger:hover { background: var(--ivory); }
        .acc-open .acc-trigger { background: var(--ivory); }

        .acc-left {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 270px;
          flex-shrink: 0;
        }
        .acc-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          padding: 4px 10px;
          border: 1px solid var(--line);
          border-radius: 999px;
          width: fit-content;
          transition: background 0.25s var(--ease), color 0.25s var(--ease), border-color 0.25s var(--ease);
        }
        .acc-open .acc-tag {
          background: var(--accent);
          color: var(--paper);
          border-color: var(--accent);
        }
        .acc-label {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .acc-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--ivory-2);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease);
        }
        .acc-open .acc-icon-wrap {
          background: var(--accent);
          border-color: var(--accent);
        }
        .acc-icon {
          color: var(--ink);
          transition: color 0.3s var(--ease);
        }
        .acc-open .acc-icon { color: var(--paper); }
        .acc-title {
          font-family: var(--font-display);
          font-size: 23px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .acc-right {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .acc-summary {
          flex: 1;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
        }
        .acc-count {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          background: var(--ivory-2);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 3px 10px;
          flex-shrink: 0;
          transition: background 0.25s var(--ease), color 0.25s var(--ease);
        }
        .acc-open .acc-count {
          background: rgba(0,232,122,0.1);
          color: var(--accent);
          border-color: rgba(0,232,122,0.25);
        }
        .acc-chevron {
          flex-shrink: 0;
          color: var(--muted);
          transition: transform 0.35s var(--ease), color 0.25s var(--ease);
        }
        .acc-open .acc-chevron {
          transform: rotate(180deg);
          color: var(--accent);
        }

        .acc-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s var(--ease);
        }
        .acc-open .acc-body { grid-template-rows: 1fr; }
        .acc-inner { overflow: hidden; }

        /* Sub-item grid */
        .sub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 1px;
          background: var(--line);
          border-top: 1px solid var(--line);
        }
        .sub-card {
          background: var(--paper);
          padding: 22px 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
          position: relative;
          overflow: hidden;
        }
        .sub-card:hover {
          background: var(--ivory);
          z-index: 1;
          transform: perspective(500px) translateZ(8px);
          box-shadow: 0 4px 16px rgba(0,232,122,0.06);
        }
        .sub-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s var(--ease);
        }
        .sub-card:hover .sub-bar { transform: scaleX(1); }
        .sub-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.08em;
          transition: color 0.2s var(--ease);
        }
        .sub-card:hover .sub-num { color: var(--accent); }
        .sub-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.25;
          color: var(--ink);
          flex: 1;
        }
        .sub-hint {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--accent);
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s var(--ease), transform 0.2s var(--ease);
        }
        .sub-card:hover .sub-hint {
          opacity: 1;
          transform: translateY(0);
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(20, 20, 18, 0.6);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .modal-box {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 48px 48px 40px;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
          animation: zoomIn 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .modal-header-strip {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-2), var(--accent) 60%, #6effc0 100%);
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: var(--ivory);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--ink-2);
          transition: background 0.2s var(--ease), color 0.2s var(--ease), border-color 0.2s var(--ease);
        }
        .modal-close:hover {
          background: var(--accent);
          color: var(--paper);
          border-color: var(--accent);
        }
        .modal-cat {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--paper);
          background: var(--accent);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .modal-title {
          font-family: var(--font-display);
          font-size: 29px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .modal-body {
          flex: 1;
          min-height: 0;
          width: 100%;
          overflow-y: auto;
          margin-bottom: 28px;
          padding-right: 8px;
        }
        .modal-section { margin-bottom: 28px; }
        .modal-section:last-of-type { margin-bottom: 20px; }
        .modal-section-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 12px;
        }
        .modal-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-step {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .modal-step-num {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(0,232,122,0.12);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }
        .modal-step-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .modal-risk {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.6;
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-left: 3px solid var(--accent);
          border-radius: 8px;
          background: var(--ivory);
          margin-bottom: 12px;
        }
        .modal-note {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
          font-style: italic;
        }
        .modal-desc {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 16px;
        }
        .modal-desc:last-child { margin-bottom: 0; }
        .modal-highlights {
          margin: 8px 0 0;
          padding-left: 20px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.7;
        }
        .modal-highlights li { margin-bottom: 6px; }
        .modal-highlights li::marker { color: var(--accent); }
        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 900px) {
          .acc-trigger {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 24px 20px;
          }
          .acc-left { min-width: unset; }
          .acc-right { width: 100%; }
          .acc-summary { display: none; }
          .acc-count { display: none; }
          .sub-grid { grid-template-columns: 1fr 1fr; }
          .modal-box { padding: 40px 28px 32px; }
          .services-stats { border-radius: 12px; }
          .stat-pill { padding: 12px 20px; }
        }
        @media (max-width: 560px) {
          .sub-grid { grid-template-columns: 1fr; }
          .modal-title { font-size: 23px; }
          .services-stats { width: 100%; }
          .stat-pill { flex: 1; }
        }
      `}</style>
    </section>
  )
}
