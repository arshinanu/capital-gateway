import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', loanType: 'property', amount: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: POST to your backend / CRM
    console.log('Enquiry:', form)
    setSubmitted(true)
  }

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <section id="contact" className="contact">
      <div className="container contact-inner">
        <div className="contact-left">
          <span className="eyebrow">Get in touch</span>
          <h2 className="display contact-title">
            Let's talk<br/>
            <span className="italic-accent">numbers.</span>
          </h2>
          <p className="contact-lede">
            Every enquiry gets a rapid, personal response — no call centres, no
            templated replies. If your funding requirement is time-critical,
            flag it and we'll prioritise.
          </p>

          <div className="contact-methods">
            <a href="tel:07538346421" className="method">
              <div className="method-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 4 C3 3, 4 2, 5 2 L7 2 L9 6 L7 8 C8 11, 9 12, 12 13 L14 11 L18 13 L18 15 C18 16, 17 17, 16 17 C9 17, 3 11, 3 4 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span>Direct line</span>
                <strong>07538 346 421</strong>
              </div>
            </a>

            <a href="mailto:Info@capitalgatewayltd.com" className="method">
              <div className="method-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 6 L10 11 L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span>Email</span>
                <strong>Info@capitalgatewayltd.com</strong>
              </div>
            </a>

            <div className="method">
              <div className="method-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2 C13 2, 16 5, 16 8 C16 13, 10 18, 10 18 C10 18, 4 13, 4 8 C4 5, 7 2, 10 2 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <span>Marketing Office</span>
                <strong>2 Leyson Road<br/>Cheltenham GL51 6RU</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-head">
                <h3>New enquiry</h3>
                <span className="form-step">Takes 2 minutes</span>
              </div>

              <div className="form-grid">
                <label className="input">
                  <span>Full name</span>
                  <input required value={form.name} onChange={update('name')} placeholder="Jane Okonkwo" />
                </label>
                <label className="input">
                  <span>Email</span>
                  <input required type="email" value={form.email} onChange={update('email')} placeholder="jane@company.com" />
                </label>
                <label className="input">
                  <span>Phone</span>
                  <input value={form.phone} onChange={update('phone')} placeholder="+44 ..." />
                </label>
                <label className="input">
                  <span>Loan type</span>
                  <select value={form.loanType} onChange={update('loanType')}>
                    <option value="working-capital">Working capital</option>
                    <option value="asset">Asset finance</option>
                    <option value="invoice">Invoice finance</option>
                    <option value="startup">Startup loan</option>
                    <option value="mortgage">Commercial / residential mortgage</option>
                    <option value="bridging">Bridging loan</option>
                    <option value="development">Development finance</option>
                    <option value="mezzanine">Mezzanine finance</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
                <label className="input full">
                  <span>Approx. loan amount</span>
                  <input value={form.amount} onChange={update('amount')} placeholder="£500,000" />
                </label>
                <label className="input full">
                  <span>Tell us about your requirement</span>
                  <textarea rows="4" value={form.message} onChange={update('message')} placeholder="What are you financing? Any deadlines we should know about?" />
                </label>
              </div>

              <button type="submit" className="btn btn-primary form-submit">
                Submit enquiry
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <p className="form-note">
                Your data stays private. We'll never share it with third parties without
                your explicit consent. See our <a href="#">privacy policy</a>.
              </p>
            </form>
          ) : (
            <div className="form success">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M18 28 L25 35 L38 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Enquiry received.</h3>
              <p>A partner will be in touch within 24 hours. In urgent cases, please do call the direct line.</p>
              <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setForm({name:'',email:'',phone:'',loanType:'property',amount:'',message:''}) }}>
                Submit another
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 80px;
          align-items: start;
        }
        .contact-title {
          font-size: clamp(44px, 6.5vw, 96px);
          margin: 24px 0 32px;
        }
        .contact-lede {
          font-size: 17px;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 56px;
          max-width: 440px;
        }
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .method {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: transform 0.3s var(--ease);
        }
        a.method:hover {
          transform: translateX(4px);
        }
        .method-icon {
          width: 44px; height: 44px;
          border: 1px solid var(--line);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--forest);
          flex-shrink: 0;
        }
        .method span {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .method strong {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          line-height: 1.3;
        }

        .form {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 40px;
        }
        .form-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
        }
        .form-head h3 {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        .form-step {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 28px;
        }
        .input.full { grid-column: 1 / -1; }
        .input {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .input span {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }
        .input input,
        .input select,
        .input textarea {
          border: 1px solid var(--line);
          background: var(--ivory);
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 15px;
          transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
          font-family: var(--font-body);
        }
        .input input:focus,
        .input select:focus,
        .input textarea:focus {
          outline: none;
          border-color: var(--ink);
          background: var(--paper);
        }
        .input textarea { resize: vertical; min-height: 100px; }

        .form-submit {
          width: 100%;
          justify-content: center;
          padding: 18px;
          margin-bottom: 20px;
        }
        .form-note {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          line-height: 1.6;
        }
        .form-note a { color: var(--forest); text-decoration: underline; }

        .form.success {
          text-align: center;
          padding: 60px 40px;
          color: var(--forest);
        }
        .form.success h3 {
          font-family: var(--font-display);
          font-size: 32px;
          margin: 24px 0 12px;
          color: var(--ink);
        }
        .form.success p {
          color: var(--muted);
          margin-bottom: 32px;
        }

        @media (max-width: 900px) {
          .contact-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .form { padding: 28px 20px; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
