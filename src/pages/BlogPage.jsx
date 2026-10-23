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
    script.src = SORO_EMBED_SRC
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
