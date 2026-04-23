import { useState } from 'react'
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

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
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
    </>
  )
}
