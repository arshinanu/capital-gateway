import { useState, useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PrivacyPolicy from '../components/PrivacyPolicy.jsx'

const SORO_EMBED_SRC = 'https://app.trysoro.com/api/embed/080569c9-46c6-4f32-9c18-d1925dda52c1'

export default function BlogPage() {
  const [showPrivacy, setShowPrivacy] = useState(false)

  // React doesn't execute <script> tags rendered in JSX, so inject the Soro embed manually
  useEffect(() => {
    const script = document.createElement('script')
    // Soro's CDN caches the embed per-referer for an hour; a 5-minute cache-buster lets new posts show quickly
    script.src = `${SORO_EMBED_SRC}?v=${Math.floor(Date.now() / 300000)}`
    script.defer = true
    document.body.appendChild(script)
    return () => {
      script.remove()
      const mount = document.getElementById('soro-blog')
      if (mount) mount.innerHTML = ''
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <section id="blog" className="blog">
          <div className="container">
            <div className="blog-header">
              <span className="eyebrow">Insights</span>
              <h1 className="display blog-title">
                Our<br /><span className="italic-accent">Blog</span>
              </h1>
              <p className="blog-intro">
                Guides, insights and updates on business lending and property finance across the UK.
              </p>
            </div>

            <div id="soro-blog"></div>
          </div>
        </section>
      </main>
      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}

      <style>{`
        .blog {
          padding-top: 180px;
          min-height: 70vh;
        }
        .blog-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
          margin-bottom: 64px;
        }
        .blog-title {
          font-size: clamp(57px, calc(8vw + 1px), 97px);
          font-weight: 600;
          margin-top: 16px;
        }
        .blog-intro {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.6;
          max-width: 380px;
          align-self: end;
        }

        /* Soro ships light-theme colours (#1a1a1a text) — restyle for the dark site */
        #soro-blog .soro-blog,
        #soro-blog .soro-blog-card-title,
        #soro-blog .soro-blog-article-title,
        #soro-blog .soro-blog-article-content,
        #soro-blog .soro-blog-article-content h2,
        #soro-blog .soro-blog-article-content h3 {
          color: var(--ink);
        }
        #soro-blog .soro-blog-card-title,
        #soro-blog .soro-blog-article-title,
        #soro-blog .soro-blog-article-content h2,
        #soro-blog .soro-blog-article-content h3 {
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }
        #soro-blog .soro-blog-card-excerpt,
        #soro-blog .soro-blog-article-date,
        #soro-blog .soro-blog-empty,
        #soro-blog .soro-blog-loading {
          color: var(--muted);
        }
        #soro-blog .soro-blog-card-date {
          font-family: var(--font-mono);
          color: var(--muted);
        }
        #soro-blog .soro-blog-card {
          background: var(--paper);
          border-color: var(--line);
        }
        #soro-blog .soro-blog-card:hover {
          border-color: var(--accent);
          box-shadow: 0 20px 50px -20px rgba(0, 232, 122, 0.35);
        }
        #soro-blog .soro-blog-back {
          color: var(--ink-2);
          border-color: var(--line);
        }
        #soro-blog .soro-blog-back:hover {
          background: var(--ivory);
          border-color: var(--accent);
          color: var(--ink);
        }
        #soro-blog .soro-blog-article-content a {
          color: var(--accent);
        }
        #soro-blog .soro-blog-spinner {
          border-color: var(--line);
          border-top-color: var(--accent);
        }

        @media (max-width: 768px) {
          .blog { padding-top: 140px; }
          .blog-header {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </>
  )
}
