import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PrivacyPolicy from '../components/PrivacyPolicy.jsx'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const up = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: '' }))
    if (serverError) setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError('')
    try {
      const API_BASE = import.meta.env.VITE_API_URL ?? ''
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.message || `Error ${res.status}`)
    } catch {
      // intentional: always show confirmation regardless of server result
    } finally {
      setLoading(false)
      setShowConfirm(true)
    }
  }

  return (
    <>
      <Nav />
      <main className="login-page">
        <div className="login-bg-grid" aria-hidden="true" />

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="login-header">
            <span className="eyebrow">Client portal</span>
            <h1 className="display login-title">
              Welcome<br />
              <span className="italic-accent">back.</span>
            </h1>
            <p className="login-sub">Sign in to manage your applications and documents.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <label className="login-field">
              <span>Email address</span>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={up('email')}
                placeholder="you@company.com"
                className={errors.email ? 'err' : ''}
              />
              {errors.email && <span className="login-err">{errors.email}</span>}
            </label>

            <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Continue'}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              New client?{' '}
              <Link to="/apply" className="login-footer-link">Start your application</Link>
            </p>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              className="confirm-modal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="confirm-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="var(--accent)" strokeWidth="1.5" />
                  <path d="M7 14.5l4.5 4.5 9.5-10" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="confirm-title">Check your inbox</h2>
              <p className="confirm-body">
                If your email is registered with us, we'll send you a link to access your account shortly.
              </p>
              <button
                className="btn btn-primary confirm-btn"
                onClick={() => setShowConfirm(false)}
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}

      <style>{`
        .login-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .login-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.35;
          pointer-events: none;
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 52px 48px;
          box-shadow: 0 4px 60px rgba(0,0,0,0.35);
        }

        .login-header {
          margin-bottom: 40px;
        }

        .login-title {
          font-size: clamp(36px, 5vw, 56px);
          margin: 18px 0 12px;
          line-height: 1.05;
        }

        .login-sub {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .login-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .login-field > span {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }

        .login-field input {
          border: 1px solid var(--line);
          background: var(--ivory);
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--ink);
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease);
        }
        .login-field input:focus {
          outline: none;
          border-color: var(--accent);
          background: var(--paper);
        }
        .login-field input.err {
          border-color: #c0392b;
        }
        .login-field input::placeholder {
          color: var(--muted);
          opacity: 0.5;
        }

        .login-err {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #c0392b;
          letter-spacing: 0.05em;
        }

        .login-submit {
          width: 100%;
          padding: 15px 24px;
          margin-top: 6px;
          justify-content: center;
          font-size: 15px;
          gap: 10px;
        }
        .login-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        .login-footer p {
          font-size: 13px;
          color: var(--muted);
        }
        .login-footer-link {
          color: var(--accent);
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .login-footer-link:hover { opacity: 0.75; }

        /* Confirmation popup */
        .confirm-overlay {
          position: fixed;
          inset: 0;
          z-index: 500;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .confirm-modal {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 48px 44px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 80px rgba(0,0,0,0.4);
        }

        .confirm-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(var(--accent-rgb, 180,140,90), 0.08);
          border: 1px solid rgba(var(--accent-rgb, 180,140,90), 0.2);
          margin: 0 auto 24px;
        }

        .confirm-title {
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 14px;
          line-height: 1.15;
        }

        .confirm-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 32px;
        }

        .confirm-btn {
          width: 100%;
          padding: 14px 24px;
          justify-content: center;
          font-size: 15px;
        }

        @media (max-width: 560px) {
          .login-card {
            padding: 36px 24px;
            border-radius: 20px;
          }
          .confirm-modal {
            padding: 36px 24px;
          }
        }
      `}</style>
    </>
  )
}
