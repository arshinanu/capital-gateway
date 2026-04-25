import { useState, useEffect } from 'react'

export default function LatestNews() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const SHEET_ID = '1xkcswQd7OVKpymthmh-BjkshYumFi0xIHjbdRsIXZa4'
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
      .then(r => r.text())
      .then(text => {
        const json = JSON.parse(text.slice(47, -2))
        const rows = json.table.rows.map(row => ({
          tag:     row.c[0]?.v ?? '',
          date:    row.c[1]?.v ?? '',
          title:   row.c[2]?.v ?? '',
          excerpt: row.c[3]?.v ?? '',
          href:    row.c[4]?.v ?? '',
        }))
        setArticles(rows)
      })
      .catch(() => {})
  }, [])

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
