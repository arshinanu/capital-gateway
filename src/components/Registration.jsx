import { useState, useRef } from 'react'
import { Building2, TrendingUp, Check, ArrowLeft, ArrowRight, User, Briefcase, Upload, FileText, X } from 'lucide-react'

const PRODUCTS = {
  business: [
    'Merchant Cash Advance',
    'Working Capital',
    'Business Term Loan',
    'Asset Finance',
    'Invoice Finance',
    'Factoring',
    'Stock Finance',
    'Revolving Credit / Overdraft',
    'Business Acquisition Finance',
    'Loans Against Assets',
    'Other',
  ],
  property: [
    'Bridging Loan – Residential',
    'Bridging Loan – Commercial',
    'Development Finance',
    'Commercial Mortgage',
    'Buy-to-Let Mortgage',
    'Refurbishment Finance',
    'Development Exit Finance',
    'Semi-Commercial Mortgage',
    'Re-Bridge / Safe Exit',
    'Other',
  ],
}

const COUNTRY_CODES = [
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+353', label: '🇮🇪 +353' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+34', label: '🇪🇸 +34' },
  { code: '+39', label: '🇮🇹 +39' },
  { code: '+31', label: '🇳🇱 +31' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+64', label: '🇳🇿 +64' },
  { code: '+27', label: '🇿🇦 +27' },
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+86', label: '🇨🇳 +86' },
  { code: '+65', label: '🇸🇬 +65' },
  { code: '+852', label: '🇭🇰 +852' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+974', label: '🇶🇦 +974' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+20', label: '🇪🇬 +20' },
]

const EMPTY = {
  /* Pipedrive: Person */
  firstName: '', lastName: '', email: '', phone: '', countryCode: '+44',
  /* Pipedrive: Organisation */
  companyName: '', companyType: '', industry: '', timeTrading: '',
  /* Pipedrive: Lead */
  financeProduct: '', loanAmount: '', loanPurpose: '', urgency: '', notes: '',
  /* Business-specific custom fields */
  annualTurnover: '', monthlyCardTurnover: '',
  /* Property-specific custom fields */
  purchaseVehicle: '', propertyType: '', propertyPostcode: '',
  propertyValue: '', ltv: '', exitStrategy: '',
}

const STEPS = ['Contact', 'Finance', 'Review']

function StepIndicator({ step }) {
  return (
    <div className="step-indicator">
      {STEPS.map((label, i) => (
        <div key={i} className={`step-dot-wrap${i < step ? ' done' : ''}${i === step ? ' active' : ''}`}>
          <div className="step-dot">
            {i < step ? <Check size={11} strokeWidth={2.5} /> : <span>{i + 1}</span>}
          </div>
          <span className="step-label">{label}</span>
          {i < STEPS.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  )
}

function Field({ label, children, full }) {
  return (
    <label className={`input${full ? ' full' : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  )
}

export default function Registration() {
  const [loanType, setLoanType] = useState('business')
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showCodePicker, setShowCodePicker] = useState(false)
  const [bankStatements, setBankStatements] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const up = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors(er => ({ ...er, [k]: '' }))
  }

  const switchType = (t) => {
    setLoanType(t)
    setForm(f => ({ ...f, financeProduct: '' }))
    setStep(0)
  }

  const validateStep0 = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    return e
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.financeProduct) e.financeProduct = 'Please select a product'
    if (!form.loanAmount.trim()) e.loanAmount = 'Required'
    return e
  }

  const next = () => {
    let e = {}
    if (step === 0) e = validateStep0()
    if (step === 1) e = validateStep1()
    if (Object.keys(e).length) { setErrors(e); return }
    setStep(s => s + 1)
    window.scrollTo({ top: document.getElementById('apply').offsetTop - 100, behavior: 'smooth' })
  }

  const back = () => setStep(s => s - 1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setServerError('')

    const payload = {
      title: `${form.firstName} ${form.lastName} – ${form.companyName || 'Individual'}`,
      person: {
        first_name: form.firstName,
        last_name: form.lastName,
        email: [{ value: form.email, primary: true, label: 'work' }],
        phone: [{ value: `${form.countryCode}${form.phone}`, primary: true, label: 'mobile' }],
      },
      organization: {
        name: form.companyName,
        type: form.companyType,
        industry: form.industry,
        time_trading: form.timeTrading,
      },
      lead: {
        label: loanType,
        finance_product: form.financeProduct,
        value: form.loanAmount,
        purpose: form.loanPurpose,
        urgency: form.urgency,
        ...(loanType === 'business' && {
          annual_turnover: form.annualTurnover,
          monthly_card_turnover: form.monthlyCardTurnover,
        }),
        ...(loanType === 'property' && {
          purchase_vehicle: form.purchaseVehicle,
          property_type: form.propertyType,
          property_postcode: form.propertyPostcode,
          property_value: form.propertyValue,
          exit_strategy: form.exitStrategy,
        }),
      },
      notes: form.notes,
    }

    console.group('[LoanApplication] POST /api/loan-applications')
    console.log('Payload:', JSON.stringify(payload, null, 2))

    try {
      const fd = new FormData()
      fd.append('data', JSON.stringify(payload))
      bankStatements.forEach((file, i) => fd.append(`bankStatement_${i}`, file))

      const res = await fetch('/api/loan-applications', {
        method: 'POST',
        body: fd,
      })

      console.log('Status:', res.status, res.statusText)

      const data = await res.json().catch(() => null)
      console.log('Response:', data)

      if (!res.ok) {
        throw new Error(data?.message || `Server error ${res.status}`)
      }

      console.log('Success')
      setSubmitted(true)
    } catch (err) {
      console.error('Error:', err.message)
      setServerError(err.message || 'Something went wrong. Please try again or call us directly.')
    } finally {
      console.groupEnd()
      setLoading(false)
    }
  }

  const reset = () => { setForm(EMPTY); setStep(0); setSubmitted(false); setErrors({}); setServerError(''); setBankStatements([]) }

  const addFiles = (files) => {
    const allowed = Array.from(files).filter(f => /\.(pdf|jpg|jpeg|png)$/i.test(f.name))
    setBankStatements(prev => [...prev, ...allowed])
  }

  const removeFile = (i) => setBankStatements(prev => prev.filter((_, j) => j !== i))

  const products = PRODUCTS[loanType]

  return (
    <section id="apply" className="registration">
      <div className="container reg-inner">

        {/* Left panel */}
        <div className="reg-left">
          <span className="eyebrow">Apply now</span>
          <h2 className="display reg-title">
            Start your<br />
            <span className="italic-accent">application.</span>
          </h2>
          <p className="reg-lede">
            Complete this short form and a specialist will review your case
            within 24 hours — no obligation, no credit footprint.
          </p>

          <div className="reg-type-tabs">
            <button
              className={`type-tab${loanType === 'business' ? ' active' : ''}`}
              onClick={() => switchType('business')}
            >
              <TrendingUp size={18} strokeWidth={1.5} />
              Business Loan
            </button>
            <button
              className={`type-tab${loanType === 'property' ? ' active' : ''}`}
              onClick={() => switchType('property')}
            >
              <Building2 size={18} strokeWidth={1.5} />
              Property Loan
            </button>
          </div>

          <div className="reg-features">
            {[
              'No credit footprint on initial enquiry',
              'Access to 400+ specialist lenders',
              'Decision in principle within 48 hours',
              'Fully FCA authorised broker',
            ].map((f, i) => (
              <div key={i} className="reg-feature">
                <div className="reg-check"><Check size={12} strokeWidth={2.5} /></div>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div className="reg-right">
          {submitted ? (
            <div className="reg-form success">
              <div className="success-icon">
                <Check size={28} strokeWidth={2} />
              </div>
              <h3>Application received.</h3>
              <p>
                A specialist will review your{' '}
                {loanType === 'business' ? 'business loan' : 'property finance'} enquiry
                and be in touch within 24 hours.
              </p>
              <button className="btn btn-ghost" onClick={reset}>Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reg-form" noValidate>
              <div className="form-head">
                <div>
                  <h3>
                    {loanType === 'business' ? 'Business' : 'Property'} loan enquiry
                  </h3>
                  <p className="form-sub">
                    {loanType === 'business'
                      ? 'SME & commercial funding'
                      : 'Bridging, development & mortgages'}
                  </p>
                </div>
                <StepIndicator step={step} />
              </div>

              {/* ── Step 0: Contact & Company ── */}
              {step === 0 && (
                <div className="form-section">
                  <div className="section-label">
                    <User size={14} strokeWidth={2} />
                    Contact details
                  </div>
                  <div className="form-grid">
                    <Field label="First name">
                      <input
                        required value={form.firstName} onChange={up('firstName')}
                        placeholder="Jane" className={errors.firstName ? 'err' : ''}
                      />
                      {errors.firstName && <span className="err-msg">{errors.firstName}</span>}
                    </Field>
                    <Field label="Last name">
                      <input
                        required value={form.lastName} onChange={up('lastName')}
                        placeholder="Okonkwo" className={errors.lastName ? 'err' : ''}
                      />
                      {errors.lastName && <span className="err-msg">{errors.lastName}</span>}
                    </Field>
                    <Field label="Email address">
                      <input
                        type="email" required value={form.email} onChange={up('email')}
                        placeholder="jane@company.com" className={errors.email ? 'err' : ''}
                      />
                      {errors.email && <span className="err-msg">{errors.email}</span>}
                    </Field>
                    <Field label="Phone number">
                      <div className="phone-field">
                        {showCodePicker ? (
                          <select
                            value={form.countryCode}
                            onChange={(e) => {
                              up('countryCode')(e)
                              setShowCodePicker(false)
                            }}
                            className="phone-code"
                            autoFocus
                          >
                            {COUNTRY_CODES.map(c => (
                              <option key={c.code} value={c.code}>{c.label}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            type="button"
                            className="phone-code-badge"
                            onClick={() => setShowCodePicker(true)}
                            title="Change country code"
                          >
                            {form.countryCode}
                          </button>
                        )}
                        <input
                          type="tel" required value={form.phone} onChange={up('phone')}
                          placeholder="7700 000 000" className={errors.phone ? 'err' : ''}
                        />
                      </div>
                      {errors.phone && <span className="err-msg">{errors.phone}</span>}
                    </Field>
                  </div>

                  <div className="section-label" style={{ marginTop: 28 }}>
                    <Briefcase size={14} strokeWidth={2} />
                    {loanType === 'business' ? 'Business details' : 'Applicant details'}
                  </div>
                  <div className="form-grid">
                    <Field label="Company / trading name" full>
                      <input
                        value={form.companyName} onChange={up('companyName')}
                        placeholder={loanType === 'business' ? 'Acme Ltd' : 'Acme Properties Ltd (if applicable)'}
                      />
                    </Field>
                    <Field label="Business structure">
                      <select value={form.companyType} onChange={up('companyType')}>
                        <option value="">Select…</option>
                        <option>Limited Company (Ltd)</option>
                        <option>Public Limited Company (PLC)</option>
                        <option>Limited Liability Partnership (LLP)</option>
                        <option>Sole Trader</option>
                        <option>Partnership</option>
                        <option>Special Purpose Vehicle (SPV)</option>
                        <option>Charity / Non-profit</option>
                        <option>Individual</option>
                      </select>
                    </Field>
                    {loanType === 'business' ? (
                      <Field label="Industry / sector">
                        <select value={form.industry} onChange={up('industry')}>
                          <option value="">Select…</option>
                          <option>Retail</option>
                          <option>Hospitality &amp; Food Service</option>
                          <option>Construction &amp; Trades</option>
                          <option>Manufacturing</option>
                          <option>Professional Services</option>
                          <option>Healthcare</option>
                          <option>Transport &amp; Logistics</option>
                          <option>Technology</option>
                          <option>Import / Export</option>
                          <option>Property &amp; Real Estate</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    ) : (
                      <Field label="Purchase vehicle">
                        <select value={form.purchaseVehicle} onChange={up('purchaseVehicle')}>
                          <option value="">Select…</option>
                          <option>Personal / Individual</option>
                          <option>Limited Company (Ltd)</option>
                          <option>Special Purpose Vehicle (SPV)</option>
                          <option>LLP</option>
                          <option>Pension (SSAS/SIPP)</option>
                        </select>
                      </Field>
                    )}
                    <Field label="Time trading">
                      <select value={form.timeTrading} onChange={up('timeTrading')}>
                        <option value="">Select…</option>
                        <option>Pre-revenue / Start-up</option>
                        <option>Under 1 year</option>
                        <option>1 – 2 years</option>
                        <option>2 – 5 years</option>
                        <option>5+ years</option>
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {/* ── Step 1: Finance Details ── */}
              {step === 1 && (
                <div className="form-section">
                  <div className="section-label">
                    {loanType === 'business' ? <TrendingUp size={14} strokeWidth={2} /> : <Building2 size={14} strokeWidth={2} />}
                    Finance requirements
                  </div>
                  <div className="form-grid">
                    <Field label="Finance product" full>
                      <select
                        required value={form.financeProduct} onChange={up('financeProduct')}
                        className={errors.financeProduct ? 'err' : ''}
                      >
                        <option value="">Select product…</option>
                        {products.map(p => <option key={p}>{p}</option>)}
                      </select>
                      {errors.financeProduct && <span className="err-msg">{errors.financeProduct}</span>}
                    </Field>
                    <Field label="Amount required">
                      <input
                        required value={form.loanAmount} onChange={up('loanAmount')}
                        placeholder="£250,000" className={errors.loanAmount ? 'err' : ''}
                      />
                      {errors.loanAmount && <span className="err-msg">{errors.loanAmount}</span>}
                    </Field>
                    <Field label="Urgency">
                      <select value={form.urgency} onChange={up('urgency')}>
                        <option value="">Select…</option>
                        <option>ASAP – within days</option>
                        <option>Within 1 month</option>
                        <option>1 – 3 months</option>
                        <option>3+ months</option>
                      </select>
                    </Field>
                    <Field label="Purpose of funds" full>
                      <input
                        value={form.loanPurpose} onChange={up('loanPurpose')}
                        placeholder={loanType === 'business'
                          ? 'e.g. expand premises, purchase equipment, cover cashflow…'
                          : 'e.g. purchase, refinance, refurbishment…'}
                      />
                    </Field>

                    {/* Business-specific fields */}
                    {loanType === 'business' && (
                      <>
                        <Field label="Estimated annual turnover">
                          <select value={form.annualTurnover} onChange={up('annualTurnover')}>
                            <option value="">Select range…</option>
                            <option>Under £100k</option>
                            <option>£100k – £250k</option>
                            <option>£250k – £500k</option>
                            <option>£500k – £1m</option>
                            <option>£1m – £5m</option>
                            <option>£5m+</option>
                          </select>
                        </Field>
                        <Field label="Monthly card / sales turnover">
                          <input
                            value={form.monthlyCardTurnover} onChange={up('monthlyCardTurnover')}
                            placeholder="e.g. £30,000 (for MCA)"
                          />
                        </Field>
                      </>
                    )}

                    {/* Property-specific fields */}
                    {loanType === 'property' && (
                      <>
                        <Field label="Property type">
                          <select value={form.propertyType} onChange={up('propertyType')}>
                            <option value="">Select…</option>
                            <option>Residential – House</option>
                            <option>Residential – Flat / Apartment</option>
                            <option>HMO</option>
                            <option>Buy-to-Let</option>
                            <option>Commercial</option>
                            <option>Semi-Commercial (Mixed Use)</option>
                            <option>Land (with planning)</option>
                            <option>Land (without planning)</option>
                            <option>Development Site</option>
                          </select>
                        </Field>
                        <Field label="Property postcode">
                          <input
                            value={form.propertyPostcode} onChange={up('propertyPostcode')}
                            placeholder="e.g. GL51 6RU"
                          />
                        </Field>
                        <Field label="Estimated property value">
                          <input
                            value={form.propertyValue} onChange={up('propertyValue')}
                            placeholder="£750,000"
                          />
                        </Field>
                        <Field label="Exit strategy">
                          <select value={form.exitStrategy} onChange={up('exitStrategy')}>
                            <option value="">Select…</option>
                            <option>Sale of property</option>
                            <option>Refinance onto term mortgage</option>
                            <option>Let &amp; refinance (bridge-to-let)</option>
                            <option>Development sale</option>
                            <option>Repayment from business</option>
                            <option>Other</option>
                          </select>
                        </Field>
                      </>
                    )}

                    <Field label="Additional notes" full>
                      <textarea
                        rows="3" value={form.notes} onChange={up('notes')}
                        placeholder="Anything else we should know? Any deadlines, existing charges, or context that would help…"
                      />
                    </Field>

                    <div className="input full">
                      <span>Bank statements — last 6 months</span>
                      <button
                        type="button"
                        className="upload-trigger"
                        onClick={() => setShowUploadModal(true)}
                      >
                        <Upload size={15} strokeWidth={1.8} />
                        {bankStatements.length > 0
                          ? `${bankStatements.length} file${bankStatements.length > 1 ? 's' : ''} uploaded — click to manage`
                          : 'Upload bank statements'}
                      </button>
                      {bankStatements.length > 0 && (
                        <div className="uploaded-pill-list">
                          {bankStatements.map((f, i) => (
                            <div key={i} className="uploaded-pill">
                              <FileText size={12} strokeWidth={1.8} />
                              <span>{f.name}</span>
                              <button type="button" onClick={() => removeFile(i)} aria-label="Remove">
                                <X size={11} strokeWidth={2.2} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Bank Statement Upload Modal ── */}
              {showUploadModal && (
                <div
                  className="upload-overlay"
                  onClick={(e) => { if (e.target === e.currentTarget) setShowUploadModal(false) }}
                >
                  <div className="upload-modal">
                    <div className="upload-modal-head">
                      <div>
                        <h4>Bank Statements</h4>
                        <p>Upload your last 6 months of bank statements (PDF, JPG or PNG)</p>
                      </div>
                      <button type="button" className="upload-close" onClick={() => setShowUploadModal(false)}>
                        <X size={16} strokeWidth={2} />
                      </button>
                    </div>

                    <div
                      className={`upload-dropzone${dragOver ? ' drag' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault()
                        setDragOver(false)
                        addFiles(e.dataTransfer.files)
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="dropzone-icon">
                        <Upload size={26} strokeWidth={1.5} />
                      </div>
                      <p className="dropzone-label">Drag &amp; drop files here</p>
                      <p className="dropzone-sub">or click to browse</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
                      />
                    </div>

                    {bankStatements.length > 0 && (
                      <div className="modal-file-list">
                        <div className="modal-file-list-header">
                          {bankStatements.length} file{bankStatements.length > 1 ? 's' : ''} selected
                        </div>
                        {bankStatements.map((f, i) => (
                          <div key={i} className="modal-file-row">
                            <FileText size={14} strokeWidth={1.5} className="modal-file-icon" />
                            <span className="modal-file-name">{f.name}</span>
                            <span className="modal-file-size">{(f.size / 1024).toFixed(0)} KB</span>
                            <button type="button" className="modal-file-remove" onClick={() => removeFile(i)}>
                              <X size={13} strokeWidth={2} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="upload-modal-footer">
                      <button type="button" className="btn btn-ghost" onClick={() => setShowUploadModal(false)}>
                        Cancel
                      </button>
                      <button type="button" className="btn btn-accent" onClick={() => setShowUploadModal(false)}>
                        <Check size={14} strokeWidth={2.2} />
                        Done{bankStatements.length > 0 ? ` (${bankStatements.length})` : ''}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2: Review ── */}
              {step === 2 && (
                <div className="form-section review">
                  <div className="section-label">
                    <Check size={14} strokeWidth={2} />
                    Review &amp; submit
                  </div>
                  <div className="review-grid">
                    <ReviewBlock title="Contact">
                      <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                      <ReviewRow label="Email" value={form.email} />
                      <ReviewRow label="Phone" value={form.phone ? `${form.countryCode} ${form.phone}` : '—'} />
                    </ReviewBlock>
                    <ReviewBlock title={loanType === 'business' ? 'Business' : 'Applicant'}>
                      <ReviewRow label="Company" value={form.companyName || '—'} />
                      <ReviewRow label="Structure" value={form.companyType || '—'} />
                      {loanType === 'business'
                        ? <ReviewRow label="Industry" value={form.industry || '—'} />
                        : <ReviewRow label="Vehicle" value={form.purchaseVehicle || '—'} />}
                      <ReviewRow label="Time trading" value={form.timeTrading || '—'} />
                    </ReviewBlock>
                    <ReviewBlock title="Finance" wide>
                      <ReviewRow label="Type" value={loanType === 'business' ? 'Business Loan' : 'Property Loan'} accent />
                      <ReviewRow label="Product" value={form.financeProduct || '—'} />
                      <ReviewRow label="Amount" value={form.loanAmount || '—'} />
                      <ReviewRow label="Urgency" value={form.urgency || '—'} />
                      <ReviewRow label="Purpose" value={form.loanPurpose || '—'} />
                      {loanType === 'business' && <>
                        <ReviewRow label="Annual turnover" value={form.annualTurnover || '—'} />
                        <ReviewRow label="Monthly card turnover" value={form.monthlyCardTurnover || '—'} />
                      </>}
                      {loanType === 'property' && <>
                        <ReviewRow label="Property type" value={form.propertyType || '—'} />
                        <ReviewRow label="Postcode" value={form.propertyPostcode || '—'} />
                        <ReviewRow label="Property value" value={form.propertyValue || '—'} />
                        <ReviewRow label="Exit strategy" value={form.exitStrategy || '—'} />
                      </>}
                      {form.notes && <ReviewRow label="Notes" value={form.notes} />}
                      <ReviewRow
                        label="Bank statements"
                        value={bankStatements.length > 0 ? `${bankStatements.length} file${bankStatements.length > 1 ? 's' : ''} attached` : 'None uploaded'}
                      />
                    </ReviewBlock>
                    {bankStatements.length > 0 && (
                      <div className="review-block wide review-docs">
                        <div className="review-block-title">Attached documents</div>
                        {bankStatements.map((f, i) => (
                          <div key={i} className="review-doc-row">
                            <FileText size={13} strokeWidth={1.5} />
                            <span>{f.name}</span>
                            <span className="review-doc-size">{(f.size / 1024).toFixed(0)} KB</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="review-note">
                    By submitting you consent to Capital Gateway contacting you about your enquiry. Your data is
                    processed in line with our privacy policy and will not be shared without your explicit consent.
                  </p>
                </div>
              )}

              {/* Navigation */}
              {serverError && (
                <div className="server-error">{serverError}</div>
              )}
              <div className="form-nav">
                {step > 0 && (
                  <button type="button" className="btn btn-ghost nav-back" onClick={back} disabled={loading}>
                    <ArrowLeft size={15} strokeWidth={1.8} />
                    Back
                  </button>
                )}
                {step < 2 ? (
                  <button type="button" className="btn btn-accent nav-next" onClick={next}>
                    Continue
                    <ArrowRight size={15} strokeWidth={1.8} />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary nav-next" disabled={loading}>
                    {loading ? 'Submitting…' : 'Submit application'}
                    {!loading && <ArrowRight size={15} strokeWidth={1.8} />}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>

      <style>{`
        .registration {
          background: var(--ivory);
          border-top: 1px solid var(--line);
          padding-top: 160px;
        }
        .reg-inner {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 80px;
          align-items: start;
        }

        /* ── Left panel ── */
        .reg-title {
          font-size: clamp(40px, 5.5vw, 80px);
          margin: 24px 0 28px;
        }
        .reg-lede {
          font-size: 16px;
          color: var(--muted);
          line-height: 1.6;
          margin-bottom: 36px;
          max-width: 420px;
        }
        .reg-type-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 36px;
        }
        .type-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--paper);
          font-size: 14px;
          font-weight: 500;
          color: var(--ink-2);
          cursor: pointer;
          transition: all 0.25s var(--ease);
        }
        .type-tab.active {
          background: var(--accent);
          color: var(--paper);
          border-color: var(--accent);
        }
        .type-tab:not(.active):hover {
          border-color: var(--ink);
          background: var(--ivory-2);
        }
        .reg-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .reg-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--muted);
        }
        .reg-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(0,232,122,0.08);
          border: 1px solid rgba(0,232,122,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
        }

        /* ── Form panel ── */
        .reg-form {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 2px 40px rgba(0,0,0,0.3);
        }
        .form-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .form-head h3 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .form-sub {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }

        /* Step indicator */
        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }
        .step-dot-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          position: relative;
        }
        .step-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid var(--line);
          background: var(--ivory);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          transition: all 0.3s var(--ease);
          z-index: 1;
          position: relative;
        }
        .step-dot-wrap.active .step-dot {
          border-color: var(--accent);
          background: var(--accent);
          color: var(--paper);
        }
        .step-dot-wrap.done .step-dot {
          border-color: var(--accent);
          background: var(--accent);
          color: var(--paper);
        }
        .step-label {
          display: none;
        }
        .step-line {
          width: 28px;
          height: 1.5px;
          background: var(--line);
          transition: background 0.3s var(--ease);
        }
        .step-dot-wrap.done .step-line {
          background: var(--accent);
        }

        /* Section label */
        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }

        /* Form grid */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 8px;
        }
        .input { display: flex; flex-direction: column; gap: 7px; }
        .input.full { grid-column: 1 / -1; }
        .input > span {
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
          padding: 13px 15px;
          font-size: 14px;
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease);
          font-family: var(--font-body);
          appearance: auto;
        }
        .input input:focus,
        .input select:focus,
        .input textarea:focus {
          outline: none;
          border-color: var(--accent);
          background: var(--paper);
        }
        .input input.err,
        .input select.err {
          border-color: #c0392b;
        }
        .err-msg {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #c0392b;
          letter-spacing: 0.05em;
        }
        .input textarea { resize: vertical; min-height: 80px; }
        .phone-field {
          display: flex;
          gap: 0;
        }
        .phone-code-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          border: 1px solid var(--line);
          border-right: none;
          border-radius: 10px 0 0 10px;
          background: var(--ivory-2);
          font-size: 13px;
          font-family: var(--font-mono);
          color: var(--ink-2);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s var(--ease), color 0.2s var(--ease);
        }
        .phone-code-badge:hover {
          background: var(--ivory);
          color: var(--ink);
        }
        .phone-field .phone-code {
          border-radius: 10px 0 0 10px;
          border-right: none;
          width: auto;
          min-width: 120px;
          flex-shrink: 0;
          background: var(--ivory-2);
        }
        .phone-field .phone-code:focus {
          border-right: none;
          z-index: 1;
        }
        .phone-field input {
          border-radius: 0 10px 10px 0;
          flex: 1;
          min-width: 0;
        }

        /* Review */
        .review-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .review-block {
          background: var(--ivory);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 18px 20px;
        }
        .review-block.wide { grid-column: 1 / -1; }
        .review-block-title {
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted);
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--line);
        }
        .review-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          padding: 5px 0;
          font-size: 13px;
        }
        .review-row:not(:last-child) {
          border-bottom: 1px solid var(--line);
        }
        .review-row-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          flex-shrink: 0;
        }
        .review-row-value {
          color: var(--ink);
          font-size: 13px;
          text-align: right;
          word-break: break-word;
        }
        .review-row-value.accent {
          color: var(--accent);
          font-weight: 600;
        }
        .review-note {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          line-height: 1.7;
          margin-bottom: 24px;
          padding: 14px 16px;
          background: var(--ivory-2);
          border: 1px solid var(--line);
          border-radius: 10px;
        }

        /* Server error */
        .server-error {
          margin-top: 20px;
          padding: 13px 16px;
          background: rgba(192, 57, 43, 0.06);
          border: 1px solid rgba(192, 57, 43, 0.25);
          border-radius: 10px;
          font-size: 13px;
          color: #c0392b;
          line-height: 1.5;
        }

        /* Form nav */
        .form-nav {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }
        .nav-back { padding: 12px 20px; font-size: 14px; }
        .nav-next { padding: 14px 28px; }
        .nav-next:disabled, .nav-back:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
        }

        /* Success */
        .reg-form.success {
          text-align: center;
          padding: 80px 40px;
          color: var(--accent);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .reg-form.success h3 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .reg-form.success p {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          max-width: 360px;
        }

        /* ── Upload trigger button ── */
        .upload-trigger {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 18px;
          border: 1.5px dashed var(--line);
          border-radius: 10px;
          background: var(--ivory);
          font-size: 14px;
          color: var(--ink-2);
          cursor: pointer;
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease), color 0.25s var(--ease);
          width: 100%;
          justify-content: center;
          font-family: var(--font-body);
        }
        .upload-trigger:hover {
          border-color: var(--accent);
          background: rgba(0,232,122,0.04);
          color: var(--accent);
        }
        .uploaded-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }
        .uploaded-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px 5px 9px;
          background: rgba(0,232,122,0.07);
          border: 1px solid rgba(0,232,122,0.18);
          border-radius: 999px;
          font-size: 12px;
          color: var(--accent);
          max-width: 260px;
        }
        .uploaded-pill span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 180px;
        }
        .uploaded-pill button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          color: var(--accent);
          opacity: 0.6;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .uploaded-pill button:hover { opacity: 1; }

        /* ── Upload modal overlay ── */
        .upload-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,16,14,0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: overlayIn 0.2s var(--ease);
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .upload-modal {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 20px;
          width: 100%;
          max-width: 540px;
          box-shadow: 0 20px 60px rgba(10,16,14,0.22);
          animation: modalUp 0.25s var(--ease);
          overflow: hidden;
        }
        @keyframes modalUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .upload-modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          padding: 28px 28px 24px;
          border-bottom: 1px solid var(--line);
        }
        .upload-modal-head h4 {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .upload-modal-head p {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .upload-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid var(--line);
          background: var(--ivory);
          cursor: pointer;
          color: var(--ink-2);
          flex-shrink: 0;
          transition: background 0.2s var(--ease), color 0.2s var(--ease);
        }
        .upload-close:hover { background: var(--ivory-2); color: var(--ink); }

        .upload-dropzone {
          margin: 24px 28px 0;
          border: 2px dashed var(--line);
          border-radius: 14px;
          padding: 40px 24px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease);
        }
        .upload-dropzone:hover,
        .upload-dropzone.drag {
          border-color: var(--accent);
          background: rgba(0,232,122,0.04);
        }
        .dropzone-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(0,232,122,0.07);
          border: 1px solid rgba(0,232,122,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          margin: 0 auto 16px;
        }
        .dropzone-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .dropzone-sub {
          font-size: 12px;
          color: var(--muted);
        }

        .modal-file-list {
          margin: 20px 28px 0;
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
        }
        .modal-file-list-header {
          padding: 9px 14px;
          background: var(--ivory-2);
          font-family: var(--font-mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          border-bottom: 1px solid var(--line);
        }
        .modal-file-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          font-size: 13px;
          border-bottom: 1px solid var(--line);
        }
        .modal-file-row:last-child { border-bottom: none; }
        .modal-file-icon { color: var(--accent); flex-shrink: 0; }
        .modal-file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--ink);
        }
        .modal-file-size {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          flex-shrink: 0;
        }
        .modal-file-remove {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: none;
          cursor: pointer;
          color: var(--muted);
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .modal-file-remove:hover { background: rgba(192,57,43,0.07); color: #c0392b; border-color: rgba(192,57,43,0.3); }

        .upload-modal-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          padding: 24px 28px;
        }

        /* Review docs */
        .review-docs { margin-top: 0; }
        .review-doc-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          font-size: 13px;
          border-bottom: 1px solid var(--line);
          color: var(--ink);
        }
        .review-doc-row:last-child { border-bottom: none; }
        .review-doc-size {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
        }

        @media (max-width: 1024px) {
          .reg-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
        @media (max-width: 768px) {
          .reg-form { padding: 28px 20px; }
          .form-grid { grid-template-columns: 1fr; }
          .review-grid { grid-template-columns: 1fr; }
          .review-block.wide { grid-column: auto; }
          .form-head { flex-direction: column; gap: 16px; }
          .reg-type-tabs { flex-direction: column; }
          .type-tab { justify-content: center; }
          .upload-modal { max-width: 100%; border-radius: 16px; }
          .upload-modal-head,
          .upload-dropzone,
          .modal-file-list,
          .upload-modal-footer { margin-left: 20px; margin-right: 20px; }
          .upload-modal-head { padding: 20px 20px 16px; }
          .upload-modal-footer { padding: 20px; }
        }
      `}</style>
    </section>
  )
}

function ReviewBlock({ title, children, wide }) {
  return (
    <div className={`review-block${wide ? ' wide' : ''}`}>
      <div className="review-block-title">{title}</div>
      {children}
    </div>
  )
}

function ReviewRow({ label, value, accent }) {
  return (
    <div className="review-row">
      <span className="review-row-label">{label}</span>
      <span className={`review-row-value${accent ? ' accent' : ''}`}>{value}</span>
    </div>
  )
}
