import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Registration from '../components/Registration.jsx'
import Footer from '../components/Footer.jsx'
import PrivacyPolicy from '../components/PrivacyPolicy.jsx'

export default function ApplyPage() {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <Nav />
      <main style={{ paddingTop: '0' }}>
        <Registration />
      </main>
      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </>
  )
}
