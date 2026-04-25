import { useState, useEffect } from 'react'
import { TrendingUp, Building2, Layers, Landmark, ChevronDown, X, ArrowRight } from 'lucide-react'

const categories = [
  {
    id: 1,
    icon: TrendingUp,
    tag: 'Lending',
    title: 'Business & SME Loans',
    summary: 'Flexible funding solutions for businesses of every size — from start-ups to established SMEs.',
    items: [
      {
        name: 'Merchant Cash Advance',
        desc: 'A Merchant Cash Advance gives your business an upfront lump sum in exchange for a percentage of future card sales. Repayments flex with your revenue — when business is slow, you pay less. It\'s one of the fastest forms of unsecured funding, with decisions often made within 24 hours and no fixed monthly repayments to worry about.',
      },
      {
        name: 'Working Capital',
        desc: 'Working capital finance is designed to cover the everyday costs of running your business — payroll, supplier payments, rent, and operational expenses. It bridges the gap between money going out and money coming in, keeping your business moving without touching your long-term reserves or assets.',
      },
      {
        name: 'Business Loan',
        desc: 'A straightforward term loan that provides a fixed lump sum repaid over an agreed period, typically 1 to 10 years. Business loans are suitable for a wide range of purposes — from expansion and marketing to equipment purchases or hiring staff. Rates and terms are tailored to your turnover, trading history, and credit profile.',
      },
      {
        name: 'Asset Finance',
        desc: 'Asset finance allows you to acquire the equipment, vehicles, or machinery your business needs without paying the full cost upfront. Instead, you spread the cost over time through hire purchase, leasing, or finance lease arrangements. This preserves your working capital while giving you immediate access to the assets driving your growth.',
      },
      {
        name: 'Invoice Finance',
        desc: 'Invoice finance unlocks up to 90% of the value of your outstanding invoices the moment they are raised — rather than waiting 30 to 90 days for customers to pay. It\'s an ideal solution for businesses with strong sales but slow-paying clients, providing a continuous flow of cash tied directly to your sales ledger.',
      },
      {
        name: 'Factoring',
        desc: 'Factoring goes a step further than standard invoice finance by also handing over the management of your sales ledger and credit control to the lender. They chase payments on your behalf, freeing up significant time and resource. It\'s particularly well suited to businesses that want to outsource their debtor management entirely.',
      },
      {
        name: 'Funding for Stock',
        desc: 'Stock finance provides a revolving facility to purchase inventory in bulk, ahead of seasonal demand or large contracts. Rather than tying up cash in warehouse goods, you fund the stock purchase through a lender and repay as the stock is sold. It\'s widely used in retail, manufacturing, wholesale, and import businesses.',
      },
      {
        name: 'Overdraft / Revolving Credit',
        desc: 'A revolving credit facility works like a business overdraft — you have access to a pre-approved credit limit and draw down only what you need, when you need it. Interest is charged only on the balance drawn, not the full limit. It\'s a flexible safety net for managing cash flow gaps, unexpected costs, or short-term opportunities.',
      },
      {
        name: 'Buying / Acquisition of Business',
        desc: 'Acquisition finance helps you fund the full or partial purchase of an existing business, whether that\'s a trade sale, management buy-out, or share acquisition. Lenders assess the target business\'s cash flow, assets, and profitability alongside your own profile. We structure the finance to match the deal — including deferred consideration and vendor loans where needed.',
      },
      {
        name: 'Retail Furniture Finance',
        desc: 'Retail furniture finance enables your customers to spread the cost of high-value purchases at the point of sale. Rather than losing a sale due to upfront cost, you offer an affordable monthly payment plan — funded by a lender and settled with you immediately. It increases conversion rates and average order values for furniture and homeware retailers.',
      },
      {
        name: 'Loans Against Assets',
        desc: 'If your business owns unencumbered assets — such as plant and machinery, commercial vehicles, or property — you can use them as security to release capital quickly. Asset-backed loans typically offer higher borrowing amounts and lower rates than unsecured lending, making them ideal for businesses that are asset-rich but need liquidity.',
      },
    ],
  },
  {
    id: 2,
    icon: Building2,
    tag: 'Bridging',
    title: 'Bridging – Residential',
    summary: 'Short-term bridging finance for time-critical residential transactions and property purchases.',
    items: [
      {
        name: 'Quick Bridge (24/48 hr)',
        desc: 'When a transaction cannot wait, a quick bridge delivers funds in as little as 24 to 48 hours. These are emergency facilities for situations where a deal would otherwise collapse — such as a chain break, an urgent purchase opportunity, or an imminent legal deadline. Speed comes at a premium, but for the right deal it can be transformative.',
      },
      {
        name: 'Standard Auction Bridge Loan',
        desc: 'Buying at auction requires completion within 28 days of the hammer falling — far too fast for a standard mortgage. An auction bridge loan is pre-arranged so that funds are available the moment the gavel drops. Once you own the property, you can refinance onto a longer-term product at your own pace.',
      },
      {
        name: 'Residential Bridge Loan',
        desc: 'A residential bridge loan provides short-term secured finance against a residential property, typically for 1 to 24 months. It\'s commonly used by homeowners who want to buy before their current property sells, or by investors who need to move quickly on a purchase. The loan is repaid once the exit — sale or refinance — is completed.',
      },
      {
        name: 'Commercial Bridge Loan',
        desc: 'A commercial bridge loan is secured against commercial or mixed-use property and used to fund time-sensitive business property transactions. Whether you\'re acquiring new premises, refinancing to release equity, or repositioning an asset, a commercial bridge gives you fast access to capital while a longer-term solution is arranged.',
      },
      {
        name: 'Regulated Bridge Loan',
        desc: 'A regulated bridge loan is governed by the FCA and applies when the security property is or will be occupied by the borrower or a close family member. These loans carry full consumer protections, including affordability assessments and clear cooling-off rights. They\'re the appropriate product when bridging is secured against your own home.',
      },
      {
        name: 'Unregulated Bridge Loan',
        desc: 'Unregulated bridging loans apply to investment and buy-to-let properties where the borrower will not be living in the security. Without FCA oversight, these products can be structured more flexibly and processed more quickly, making them popular with property investors, developers, and landlords acting through limited companies.',
      },
      {
        name: 'Refurbishment Loan',
        desc: 'A refurbishment loan funds improvement works on a property before it is sold or refinanced onto a long-term mortgage. Light refurbishment covers cosmetic works such as kitchens, bathrooms, and decoration. Heavy refurbishment covers structural changes, extensions, and conversions. The loan is sized against the projected end value of the completed property.',
      },
      {
        name: 'Bridge to Let',
        desc: 'A bridge-to-let product combines a short-term bridging loan with a guaranteed exit onto a buy-to-let mortgage from the same lender. This gives investors certainty of their full exit strategy from day one. It\'s ideal for purchasing properties that need work before they can be tenanted and mortgaged at their improved value.',
      },
      {
        name: 'Development Exit Finance',
        desc: 'Development exit finance replaces expensive development debt once a scheme is practically complete and the units are ready to sell or let. It immediately reduces your monthly interest cost, gives you more time to achieve the best sale prices, and frees up your development facility for the next project. It\'s one of the smartest tools in a developer\'s toolkit.',
      },
      {
        name: 'Re-Bridge / Safe Exit',
        desc: 'A re-bridge is used when an existing bridging loan is approaching its term and the original exit — such as a sale or refinance — has been delayed. Rather than defaulting, a re-bridge replaces the loan with a fresh facility, giving you the time needed to exit cleanly. It protects your credit record and your asset while you conclude your strategy.',
      },
    ],
  },
  {
    id: 3,
    icon: Layers,
    tag: 'Development',
    title: 'Development Finance',
    summary: 'Structured finance for ground-up builds, conversions, and large-scale refurbishment projects.',
    items: [
      {
        name: 'Purchase Land With or Without Planning',
        desc: 'Land finance can be structured at any stage of the planning journey — whether you have full detailed consent, outline planning permission, or are buying without any planning at all. Lenders assess the site\'s potential, location, and your track record to determine how much they will lend. This type of finance is often the first step in a full development funding package.',
      },
      {
        name: 'Development Exit Finance',
        desc: 'Once your development is complete and units are ready to sell or hand over, development exit finance replaces your expensive construction facility with a cheaper short-term loan. This reduces your holding costs significantly, improves your returns, and gives you the breathing room to sell at the right price rather than being forced by a lender deadline.',
      },
      {
        name: 'First Time Developer Finance',
        desc: 'Breaking into property development is one of the biggest challenges new developers face — most lenders want a track record before they lend. We specialise in placing first-time developer finance with lenders who focus on the strength of the scheme, the site, and your professional team rather than solely on past experience. We\'ll guide you through every stage of the process.',
      },
      {
        name: 'Experienced Developer Finance',
        desc: 'Developers with a proven track record of successfully completing schemes can access higher loan-to-cost ratios, more competitive rates, and faster decisions. Lenders compete for the best developers, and we leverage your track record to negotiate the most favourable terms across our panel. Multiple sites and portfolio-level facilities can also be arranged.',
      },
      {
        name: 'Refurbishment / Value-Addition Finance',
        desc: 'Refurbishment finance funds works that materially increase a property\'s value or rental income — from reconfiguring internal layouts and adding extensions to full conversions and change-of-use projects. The loan is sized against the gross development value once works are complete, and funds are typically drawn in stages as works progress on site.',
      },
    ],
  },
  {
    id: 4,
    icon: Landmark,
    tag: 'Mortgage',
    title: 'Mortgage – Commercial',
    summary: 'Long-term mortgage solutions for commercial, semi-commercial, and investment properties.',
    items: [
      {
        name: 'Purchase of Commercial Property',
        desc: 'A commercial mortgage funds the purchase of business premises or investment property — including offices, retail units, warehouses, industrial estates, and leisure facilities. Owner-occupier mortgages are assessed on your business\'s trading performance, while investment mortgages are assessed primarily on rental income. Terms typically range from 5 to 25 years.',
      },
      {
        name: 'Purchase of Semi-Commercial Property',
        desc: 'Semi-commercial properties combine residential and commercial use under one roof — for example, a shop with a flat above. These require specialist lenders who understand the blended nature of the income. We have access to lenders who offer competitive rates on mixed-use properties that mainstream banks often decline to fund.',
      },
      {
        name: 'Loans for Purchasing Assets & Fittings',
        desc: 'When purchasing a business or commercial property, you may also need to fund the fixtures, fittings, and trade assets that come with it — from catering equipment to shopfitting and signage. These can often be included within the overall commercial mortgage facility or arranged separately through asset finance, depending on the lender and deal structure.',
      },
      {
        name: 'Loans for Refurbishment',
        desc: 'If you own commercial property that needs modernisation, reconfiguration, or significant repair, a refurbishment loan provides the capital to carry out the works. The loan may be structured as a standalone facility or as an additional tranche on top of an existing commercial mortgage. Lenders assess the works schedule, contractor credentials, and post-works value.',
      },
      {
        name: 'Commercial Re-Mortgage',
        desc: 'A commercial re-mortgage allows you to switch your existing commercial mortgage to a new lender — typically to access a lower interest rate, release equity from increased property value, or restructure your debt on more favourable terms. It can also be used to consolidate multiple property loans or to extend the remaining term of your facility.',
      },
      {
        name: 'Commercial Development Finance',
        desc: 'Commercial development finance funds the ground-up construction or major conversion of commercial schemes — such as office buildings, retail parks, warehouses, or mixed-use developments. The facility is drawn in staged tranches tied to build milestones, keeping your interest costs low during construction. Loans are assessed on the gross development value and strength of the scheme.',
      },
    ],
  },
]

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
        </div>

        <div className="accordion">
          {categories.map((cat) => {
            const Icon = cat.icon
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
                      <Icon size={22} strokeWidth={1.5} className="acc-icon" />
                      <span className="acc-title">{cat.title}</span>
                    </div>
                  </div>
                  <div className="acc-right">
                    <span className="acc-summary">{cat.summary}</span>
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
                            Click to learn more
                            <ArrowRight size={11} strokeWidth={2} />
                          </span>
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
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">
              <X size={18} strokeWidth={1.5} />
            </button>
            <span className="modal-cat">{selected.catTitle}</span>
            <h3 className="modal-title">{selected.name}</h3>
            <p className="modal-desc">{selected.desc}</p>
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
        }
        .services-head {
          max-width: 780px;
          margin-bottom: 64px;
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

        /* Accordion */
        .accordion {
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
        }
        .acc-item {
          border-bottom: 1px solid var(--line);
        }
        .acc-item:last-child { border-bottom: none; }

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
          min-width: 260px;
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
        }
        .acc-label {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .acc-icon {
          color: var(--ink);
          flex-shrink: 0;
          transition: color 0.3s var(--ease);
        }
        .acc-open .acc-icon { color: var(--forest); }
        .acc-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .acc-right {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .acc-summary {
          flex: 1;
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
        }
        .acc-chevron {
          flex-shrink: 0;
          color: var(--muted);
          transition: transform 0.35s var(--ease);
        }
        .acc-open .acc-chevron {
          transform: rotate(180deg);
          color: var(--forest);
        }

        .acc-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s var(--ease);
        }
        .acc-open .acc-body { grid-template-rows: 1fr; }
        .acc-inner { overflow: hidden; }

        /* Sub-item grid — compact tiles */
        .sub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
          transition: background 0.2s var(--ease), transform 0.2s var(--ease);
        }
        .sub-card:hover {
          background: var(--ivory);
          transform: scale(1.02);
          z-index: 1;
          position: relative;
        }
        .sub-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.08em;
        }
        .sub-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.25;
          color: var(--ink);
        }
        .sub-hint {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--forest);
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
          background: rgba(20, 20, 18, 0.55);
          backdrop-filter: blur(6px);
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
          max-width: 560px;
          width: 100%;
          position: relative;
          animation: zoomIn 0.25s cubic-bezier(0.34, 1.4, 0.64, 1);
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
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
          transition: background 0.2s var(--ease), color 0.2s var(--ease);
        }
        .modal-close:hover {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .modal-cat {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          padding: 4px 10px;
          border: 1px solid var(--line);
          border-radius: 999px;
          margin-bottom: 16px;
        }
        .modal-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .modal-desc {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 32px;
        }
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
          .sub-grid { grid-template-columns: 1fr 1fr; }
          .modal-box { padding: 36px 28px 32px; }
        }
        @media (max-width: 560px) {
          .sub-grid { grid-template-columns: 1fr; }
          .modal-title { font-size: 22px; }
        }
      `}</style>
    </section>
  )
}
