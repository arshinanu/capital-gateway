import { useState, useMemo } from 'react'

export default function Calculator() {
  const [loanType, setLoanType] = useState('property')
  const [amount, setAmount] = useState(500000)
  const [term, setTerm] = useState(15)
  const [income, setIncome] = useState(120000)

  const result = useMemo(() => {
    // Simplified illustrative calculation
    const baseRate = loanType === 'property' ? 0.0525 : 0.0685
    const monthly = baseRate / 12
    const n = term * 12
    const payment = (amount * monthly) / (1 - Math.pow(1 + monthly, -n))
    const totalInterest = payment * n - amount
    const dti = ((payment * 12) / income) * 100
    const eligible = dti < 40
    return {
      monthly: Math.round(payment),
      totalInterest: Math.round(totalInterest),
      rate: (baseRate * 100).toFixed(2),
      dti: dti.toFixed(1),
      eligible,
    }
  }, [amount, term, income, loanType])

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
              min={1} max={30} step={1}
              val={term} onChange={setTerm}
              hint="1 – 30 years"
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
                <strong>{result.rate}%</strong>
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
