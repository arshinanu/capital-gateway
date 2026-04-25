import { useState, useMemo, useRef } from 'react'

const DEFAULTS = { property: 5.25, business: 6.85 }

function loadRates() {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('calc-rates') || '{}') } }
  catch { return { ...DEFAULTS } }
}

export default function Calculator() {
  const [loanType, setLoanType] = useState('property')
  const [amount, setAmount] = useState(500000)
  const [term, setTerm] = useState(15)
  const [income, setIncome] = useState(120000)
  const [rates, setRates] = useState(loadRates)
  const [editingRate, setEditingRate] = useState(false)
  const [rateInput, setRateInput] = useState('')
  const rateRef = useRef(null)

  const currentRate = rates[loanType]

  const startEdit = () => {
    setRateInput(String(currentRate))
    setEditingRate(true)
    setTimeout(() => rateRef.current?.select(), 0)
  }

  const commitRate = () => {
    const parsed = parseFloat(rateInput)
    if (!isNaN(parsed) && parsed > 0 && parsed < 100) {
      const updated = { ...rates, [loanType]: parsed }
      setRates(updated)
      localStorage.setItem('calc-rates', JSON.stringify(updated))
    }
    setEditingRate(false)
  }

  const onRateKey = (e) => {
    if (e.key === 'Enter') commitRate()
    if (e.key === 'Escape') setEditingRate(false)
  }

  const result = useMemo(() => {
    const baseRate = currentRate / 100
    const monthly = baseRate / 12
    const n = term * 12
    const payment = (amount * monthly) / (1 - Math.pow(1 + monthly, -n))
    const totalInterest = payment * n - amount
    const dti = ((payment * 12) / income) * 100
    const eligible = dti < 40
    return {
      monthly: Math.round(payment),
      totalInterest: Math.round(totalInterest),
      rate: currentRate.toFixed(2),
      dti: dti.toFixed(1),
      eligible,
    }
  }, [amount, term, income, loanType, currentRate])

  const fmt = (n) => '£' + n.toLocaleString('en-GB')

  return (
    <section id="calculator" className="calc">
      <div className="container">
        <div className="calc-head">
          <span className="eyebrow">Indicative calculator</span>
          <h2 className="display calc-title">
            How much <span className="italic-accent">could</span><br/>
            you borrow?
          </h2>
          <p className="calc-sub">
            A quick indication based on headline assumptions. Your actual terms depend on
            credit profile, security, and lender-specific criteria — so treat this as a
            starting point, not an offer.
          </p>
        </div>

        <div className="calc-panel">
          <div className="calc-controls">
            <div className="type-toggle">
              <button
                className={loanType === 'property' ? 'active' : ''}
                onClick={() => setLoanType('property')}
              >
                Property Loan
              </button>
              <button
                className={loanType === 'business' ? 'active' : ''}
                onClick={() => setLoanType('business')}
              >
                Business Loan
              </button>
            </div>

            <Field
              label="Loan amount"
              value={fmt(amount)}
              min={50000} max={10000000} step={10000}
              val={amount} onChange={setAmount}
              hint={`Min ${fmt(50000)} · Max ${fmt(10000000)}`}
            />

            <Field
              label="Term"
              value={`${term} years`}
              min={1} max={40} step={1}
              val={term} onChange={setTerm}
              hint="1 – 40 years"
            />

            <Field
              label={loanType === 'property' ? 'Annual household income' : 'Annual turnover'}
              value={fmt(income)}
              min={30000} max={2000000} step={5000}
              val={income} onChange={setIncome}
            />
          </div>

          <div className="calc-result">
            <div className="result-head">
              <span className="eyebrow" style={{color: 'rgba(251, 250, 246, 0.6)'}}>Indicative Result</span>
              <span className={`pill ${result.eligible ? 'ok' : 'warn'}`}>
                <span className="dot"></span>
                {result.eligible ? 'Likely eligible' : 'Speak with us'}
              </span>
            </div>

            <div className="result-main">
              <span className="result-label">Est. monthly payment</span>
              <div className="result-big">
                {fmt(result.monthly)}
                <span className="result-period">/mo</span>
              </div>
            </div>

            <div className="result-grid">
              <div>
                <span>Indicative rate</span>
                {editingRate ? (
                  <div className="rate-edit">
                    <input
                      ref={rateRef}
                      type="number"
                      min="0.1"
                      max="99"
                      step="0.05"
                      value={rateInput}
                      onChange={e => setRateInput(e.target.value)}
                      onBlur={commitRate}
                      onKeyDown={onRateKey}
                      className="rate-input"
                      autoFocus
                    />
                    <span className="rate-pct">%</span>
                  </div>
                ) : (
                  <button className="rate-display" onClick={startEdit} title="Click to edit rate">
                    <strong>{result.rate}%</strong>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                )}
              </div>
              <div>
                <span>Total interest</span>
                <strong>{fmt(result.totalInterest)}</strong>
              </div>
              <div>
                <span>Debt-to-income</span>
                <strong>{result.dti}%</strong>
              </div>
              <div>
                <span>Total repayable</span>
                <strong>{fmt(result.monthly * term * 12)}</strong>
              </div>
            </div>

            <a href="#contact" className="btn btn-accent result-cta">
              Get a tailored quote
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <p className="result-disclaimer">
              Illustrative only. Rates shown are indicative market averages, not an offer.
              Actual terms subject to underwriting. Your property may be repossessed if you
              do not keep up repayments.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .calc-head {
          max-width: 700px;
          margin-bottom: 64px;
        }
        .calc-title {
          font-size: clamp(40px, 6vw, 80px);
          margin: 24px 0 32px;
        }
        .calc-sub {
          font-size: 17px;
          color: var(--muted);
          line-height: 1.6;
        }

        .calc-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .calc-controls {
          background: var(--paper);
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .calc-result {
          background: var(--ink);
          color: var(--paper);
          padding: 48px;
          position: relative;
          overflow: hidden;
        }
        .calc-result::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(198, 255, 74, 0.15), transparent 70%);
          pointer-events: none;
        }

        .type-toggle {
          display: flex;
          background: var(--ivory);
          border-radius: 999px;
          padding: 4px;
          border: 1px solid var(--line);
          width: fit-content;
        }
        .type-toggle button {
          padding: 10px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s var(--ease);
          color: var(--muted);
        }
        .type-toggle button.active {
          background: var(--ink);
          color: var(--paper);
        }

        .result-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .result-head .eyebrow::before {
          background: rgba(251, 250, 246, 0.4);
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-family: var(--font-mono);
          border: 1px solid rgba(251, 250, 246, 0.2);
        }
        .pill .dot {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .pill.ok .dot { background: var(--accent); }
        .pill.warn .dot { background: #f5a524; }

        .result-main {
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .result-label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(251, 250, 246, 0.6);
          display: block;
          margin-bottom: 12px;
        }
        .result-big {
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 80px);
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--accent);
        }
        .result-period {
          font-size: 20px;
          color: rgba(251, 250, 246, 0.5);
          margin-left: 8px;
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 32px 0;
          border-top: 1px solid rgba(251, 250, 246, 0.15);
          border-bottom: 1px solid rgba(251, 250, 246, 0.15);
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }
        .result-grid > div {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .result-grid span {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(251, 250, 246, 0.5);
        }
        .result-grid strong {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
        }

        .rate-display {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: inherit;
        }
        .rate-display strong {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
        }
        .rate-display svg {
          opacity: 0.4;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .rate-display:hover svg { opacity: 1; }
        .rate-edit {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .rate-input {
          width: 72px;
          background: rgba(251,250,246,0.12);
          border: 1px solid rgba(251,250,246,0.35);
          border-radius: 6px;
          color: var(--paper);
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          padding: 2px 8px;
          outline: none;
        }
        .rate-input:focus {
          border-color: var(--accent);
        }
        .rate-input::-webkit-inner-spin-button,
        .rate-input::-webkit-outer-spin-button { -webkit-appearance: none; }
        .rate-pct {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          margin-left: 2px;
        }

        .result-cta {
          width: 100%;
          justify-content: center;
          margin-bottom: 20px;
        }
        .result-disclaimer {
          font-size: 11px;
          color: rgba(251, 250, 246, 0.4);
          line-height: 1.6;
          font-family: var(--font-mono);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .calc-panel { grid-template-columns: 1fr; }
          .calc-controls, .calc-result { padding: 32px 24px; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, value, min, max, step, val, onChange, hint }) {
  const pct = ((val - min) / (max - min)) * 100
  return (
    <div className="field">
      <div className="field-row">
        <label>{label}</label>
        <span className="field-value">{value}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={val}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` }}
      />
      {hint && <span className="field-hint">{hint}</span>}
      <style>{`
        .field { display: flex; flex-direction: column; gap: 10px; }
        .field-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .field label {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }
        .field-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .field input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, var(--ink) 0%, var(--ink) var(--pct), var(--line) var(--pct), var(--line) 100%);
          border-radius: 2px;
          outline: none;
        }
        .field input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          background: var(--accent);
          border: 2px solid var(--ink);
          border-radius: 50%;
          cursor: grab;
          transition: transform 0.2s var(--ease);
        }
        .field input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .field input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px;
          background: var(--accent);
          border: 2px solid var(--ink);
          border-radius: 50%;
          cursor: grab;
        }
        .field-hint {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.08em;
        }
      `}</style>
    </div>
  )
}
