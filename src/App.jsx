import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import LendersStrip from './components/LendersStrip.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Calculator from './components/Calculator.jsx'
import Testimonials from './components/Testimonials.jsx'
import TrustpilotBanner from './components/TrustpilotBanner.jsx'
import LatestNews from './components/LatestNews.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import ApplyPage from './pages/ApplyPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
function HomePage() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <div className="page-wrap">
        <Nav />
        <main>
          <Hero />
          <LendersStrip />
          <Services />
          <About />
          <Calculator />
          <Testimonials />
          <TrustpilotBanner />
          <LatestNews />
          <Contact />
        </main>
        <Footer onPrivacyClick={() => setShowPrivacy(true)} />
        {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      </div>

      <button
        className={`back-to-top${showTop ? ' visible' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
        style={{ position: 'fixed', zIndex: 150 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Home
      </button>

      <style>{`
        .back-to-top {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 150;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 20px;
          background: var(--ivory);
          color: var(--ink);
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid var(--line);
          box-shadow: 0 4px 20px rgba(0,0,0,0.18);
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
          pointer-events: none;
        }
        .back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .back-to-top:hover {
          background: var(--accent);
          color: var(--paper);
          border-color: var(--accent);
        }
        @media (max-width: 560px) {
          .back-to-top {
            bottom: 20px;
            right: 20px;
            padding: 10px 16px;
          }
        }
      `}</style>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
