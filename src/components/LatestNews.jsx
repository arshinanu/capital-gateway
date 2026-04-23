const articles = [
  {
    tag: 'Business Finance',
    date: 'Apr 2025',
    title: 'Bank of England Holds Base Rate at 4.5% — What It Means for Business Borrowers',
    excerpt:
      'The MPC voted to hold rates steady in April, giving SMEs more certainty on debt-servicing costs. Lenders are now competing harder on fixed-rate working capital and asset finance products.',
    href: 'https://www.bankofengland.co.uk/monetary-policy-summary-and-minutes',
  },
  {
    tag: 'Property Finance',
    date: 'Apr 2025',
    title: 'Commercial Property Investment Rebounds as Yields Stabilise Across UK Regions',
    excerpt:
      'Transaction volumes in Q1 2025 rose 18% year-on-year as investors returned to regional office and industrial stock. Commercial mortgage appetite among specialist lenders is growing.',
    href: 'https://www.savills.co.uk/research_articles/229130/375464-0',
  },
  {
    tag: 'Business Finance',
    date: 'Mar 2025',
    title: 'SME Lending Rises for Third Consecutive Quarter as Confidence Returns',
    excerpt:
      'British Business Bank data shows net lending to SMEs increased for the third straight quarter. Invoice finance and revolving credit facilities drove the majority of new drawdowns.',
    href: 'https://www.british-business-bank.co.uk/research/',
  },
  {
    tag: 'Property Finance',
    date: 'Mar 2025',
    title: 'Bridging Finance Volumes Hit Record High as Property Chains Speed Up',
    excerpt:
      'The short-term lending market completed over £850m in Q1 2025 — a record quarter. Regulated bridging is increasingly used as a strategic tool, not just a last resort.',
    href: 'https://www.astl.org.uk/',
  },
  {
    tag: 'Property Finance',
    date: 'Feb 2025',
    title: 'Planning Reform Boosts Residential Development Pipeline Across England',
    excerpt:
      "Government planning changes are translating into more starts, and development finance lenders are responding with more competitive LTVs on schemes with strong pre-sales.",
    href: 'https://www.gov.uk/government/collections/planning-practice-guidance',
  },
  {
    tag: 'Business Finance',
    date: 'Feb 2025',
    title: 'Asset Finance Market Grows 9% as Firms Invest in Equipment and Green Tech',
    excerpt:
      'The Finance & Leasing Association reports a 9% rise in asset finance new business. Electric vehicles, solar installations, and manufacturing equipment dominate new agreements.',
    href: 'https://www.fla.org.uk/data-and-research/',
  },
]

export default function LatestNews() {
  return (
    <section id="news" className="news">
      <div className="container">
        <div className="news-header">
          <span className="eyebrow">Market Intelligence</span>
          <h2 className="display news-title">
            Latest<br /><span className="italic-accent">News</span>
          </h2>
          <p className="news-intro">
            Stay informed on the trends shaping business lending and property finance across the UK.
          </p>
        </div>

        <div className="news-grid">
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card"
            >
              <div className="news-card-top">
                <span className="news-tag">{a.tag}</span>
                <span className="news-date">{a.date}</span>
              </div>
              <h3 className="news-card-title">{a.title}</h3>
              <p className="news-card-excerpt">{a.excerpt}</p>
              <span className="news-read">
                Read more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .news {
          background: var(--ivory-2);
          border-top: 1px solid var(--line);
        }
        .news-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
          margin-bottom: 64px;
        }
        .news-title {
          font-size: clamp(56px, 8vw, 96px);
          margin-top: 16px;
        }
        .news-intro {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.6;
          max-width: 380px;
          align-self: end;
        }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
        }
        .news-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 32px;
          background: var(--paper);
          transition: background 0.3s var(--ease);
        }
        .news-card:hover {
          background: var(--ivory);
        }
        .news-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .news-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--paper);
          background: var(--forest);
          padding: 4px 10px;
          border-radius: 999px;
        }
        .news-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.06em;
        }
        .news-card-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--ink);
          flex: 1;
        }
        .news-card-excerpt {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.65;
        }
        .news-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--forest);
          margin-top: auto;
          transition: gap 0.3s var(--ease);
        }
        .news-card:hover .news-read {
          gap: 10px;
          color: var(--accent-2);
        }

        @media (max-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .news-header {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .news-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
