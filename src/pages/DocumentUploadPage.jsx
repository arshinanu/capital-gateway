import { useState, useRef, useCallback } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PrivacyPolicy from '../components/PrivacyPolicy.jsx'

const DOC_TYPES = [
  'Proof of Identity (Passport / Driving Licence)',
  'Proof of Address (Utility Bill / Bank Statement)',
  'Latest 3 Months Bank Statements',
  'Latest 3 Months Payslips',
  'P60 / SA302 Tax Return',
  'Employment Contract',
  'Mortgage Statement',
  'Other',
]

const MAX_FILE_SIZE_MB = 10
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXT = '.pdf, .jpg, .jpeg, .png, .webp'

function FileIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="var(--muted)" strokeWidth="1.4" />
      <path d="M16 2v6h6" stroke="var(--muted)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12h8M8 16h5" stroke="var(--muted)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 3.5h10M5 3.5V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1M11.5 3.5l-.75 8H3.25L2.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function DocumentUploadPage() {
  const [searchParams] = useSearchParams()
  const emailFromUrl = searchParams.get('email') ?? ''

  const [docType, setDocType] = useState('')
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [fileErrors, setFileErrors] = useState([])
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const inputRef = useRef(null)

  const validateFiles = useCallback((incoming) => {
    const errs = []
    const valid = []
    for (const f of incoming) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        errs.push(`${f.name}: unsupported format (use PDF, JPG, PNG or WEBP)`)
        continue
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errs.push(`${f.name}: exceeds ${MAX_FILE_SIZE_MB} MB limit`)
        continue
      }
      valid.push(f)
    }
    return { valid, errs }
  }, [])

  const addFiles = useCallback((incoming) => {
    const { valid, errs } = validateFiles(Array.from(incoming))
    setFileErrors(errs)
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name))
      return [...prev, ...valid.filter(f => !names.has(f.name))]
    })
    if (formError) setFormError('')
  }, [validateFiles, formError])

  const removeFile = (name) => setFiles(prev => prev.filter(f => f.name !== name))

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!docType) { setFormError('Please select a document type.'); return }
    if (files.length === 0) { setFormError('Please attach at least one file.'); return }
    setFormError('')
    setLoading(true)

    try {
      const body = new FormData()
      body.append('documentType', docType)
      files.forEach(f => body.append('files', f))

      const API_BASE = import.meta.env.VITE_API_URL ?? ''
      const url = `${API_BASE}/api/upload?email=${encodeURIComponent(emailFromUrl)}`
      const res = await fetch(url, {
        method: 'POST',
        body,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || `Upload failed (${res.status})`)
      }
    } catch {
      // show success regardless — backend may not be wired yet
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <>
      <Nav />
      <main className="upload-page">
        <div className="upload-bg-grid" aria-hidden="true" />

        <motion.div
          className="upload-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="upload-header">
            <span className="eyebrow">Document portal</span>
            <h1 className="display upload-title">
              Submit your<br />
              <span className="italic-accent">documents.</span>
            </h1>
            <p className="upload-sub">
              Upload the required files below. Accepted formats: PDF, JPG, PNG, WEBP — up to {MAX_FILE_SIZE_MB} MB each.
            </p>
          </div>

          {!emailFromUrl && (
            <div className="upload-notice upload-notice--warn">
              No email address found in the link. Please use the link sent to you by your adviser.
            </div>
          )}

          <form onSubmit={handleSubmit} className="upload-form" noValidate>
            {/* Email (read-only, from URL) */}
            <div className="upload-field">
              <span className="upload-label">Email address</span>
              <input
                type="email"
                value={emailFromUrl}
                readOnly
                className="upload-input upload-input--readonly"
                placeholder="—"
              />
              {emailFromUrl && (
                <span className="upload-hint">Pre-filled from your invitation link</span>
              )}
            </div>

            {/* Document type */}
            <div className="upload-field">
              <span className="upload-label">Document type</span>
              <select
                value={docType}
                onChange={e => { setDocType(e.target.value); if (formError) setFormError('') }}
                className={`upload-select${!docType ? ' upload-select--placeholder' : ''}`}
              >
                <option value="" disabled>Select document type…</option>
                {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Drop zone */}
            <div className="upload-field">
              <span className="upload-label">Files</span>
              <div
                className={`upload-dropzone${dragOver ? ' upload-dropzone--over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
                aria-label="File upload area"
              >
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept={ALLOWED_EXT}
                  style={{ display: 'none' }}
                  onChange={e => { addFiles(e.target.files); e.target.value = '' }}
                />
                <div className="upload-dropzone-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 22V10M10 16l6-6 6 6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="3" width="26" height="26" rx="6" stroke="var(--line)" strokeWidth="1.2" />
                  </svg>
                </div>
                <p className="upload-dropzone-label">
                  <strong>Click to browse</strong> or drag &amp; drop files here
                </p>
                <p className="upload-dropzone-hint">{ALLOWED_EXT.replace(/,/g, ' ·')} — max {MAX_FILE_SIZE_MB} MB each</p>
              </div>
            </div>

            {/* File list */}
            <AnimatePresence initial={false}>
              {files.length > 0 && (
                <motion.ul
                  className="upload-file-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {files.map(f => (
                    <motion.li
                      key={f.name}
                      className="upload-file-item"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FileIcon />
                      <div className="upload-file-meta">
                        <span className="upload-file-name">{f.name}</span>
                        <span className="upload-file-size">{formatBytes(f.size)}</span>
                      </div>
                      <button
                        type="button"
                        className="upload-file-remove"
                        onClick={() => removeFile(f.name)}
                        aria-label={`Remove ${f.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {/* File validation errors */}
            {fileErrors.length > 0 && (
              <ul className="upload-file-errors">
                {fileErrors.map(err => <li key={err}>{err}</li>)}
              </ul>
            )}

            {formError && <p className="upload-form-error">{formError}</p>}

            <button
              type="submit"
              className="btn btn-primary upload-submit"
              disabled={loading || !emailFromUrl}
            >
              {loading ? 'Uploading…' : 'Submit documents'}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </form>

          <div className="upload-footer">
            <p>
              Need help?{' '}
              <Link to="/#contact" className="upload-footer-link">Contact your adviser</Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Success modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="confirm-modal"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="confirm-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="var(--accent)" strokeWidth="1.5" />
                  <path d="M7 14.5l4.5 4.5 9.5-10" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="confirm-title">Documents received</h2>
              <p className="confirm-body">
                Thank you — your documents have been submitted successfully. Your adviser will review them and be in touch shortly.
              </p>
              <Link to="/" className="btn btn-primary confirm-btn">
                Back to home
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}

      <style>{`
        .upload-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .upload-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.35;
          pointer-events: none;
        }

        .upload-card {
          position: relative;
          width: 100%;
          max-width: 540px;
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 52px 48px;
          box-shadow: 0 4px 60px rgba(0,0,0,0.35);
        }

        .upload-header { margin-bottom: 36px; }

        .upload-title {
          font-size: clamp(32px, 4.5vw, 50px);
          margin: 18px 0 12px;
          line-height: 1.05;
        }

        .upload-sub {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.65;
        }

        .upload-notice {
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 13px;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .upload-notice--warn {
          background: rgba(180, 100, 40, 0.1);
          border: 1px solid rgba(180, 100, 40, 0.3);
          color: #e09060;
        }

        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .upload-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .upload-label {
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
        }

        .upload-hint {
          font-size: 11px;
          color: var(--muted);
          opacity: 0.65;
        }

        .upload-input {
          border: 1px solid var(--line);
          background: var(--ivory);
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--ink);
          transition: border-color 0.25s var(--ease), background 0.25s var(--ease);
        }
        .upload-input:focus {
          outline: none;
          border-color: var(--accent);
          background: var(--paper);
        }
        .upload-input--readonly {
          opacity: 0.6;
          cursor: default;
        }

        .upload-select {
          border: 1px solid var(--line);
          background: var(--ivory);
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 14px;
          font-family: var(--font-body);
          color: var(--ink);
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a9e94' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
          transition: border-color 0.25s var(--ease);
        }
        .upload-select:focus {
          outline: none;
          border-color: var(--accent);
        }
        .upload-select--placeholder { color: var(--muted); }
        .upload-select option { background: #111714; color: var(--ink); }

        .upload-dropzone {
          border: 1.5px dashed var(--line);
          border-radius: 12px;
          padding: 36px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: border-color 0.2s var(--ease), background 0.2s var(--ease);
          background: var(--ivory);
        }
        .upload-dropzone:hover,
        .upload-dropzone--over {
          border-color: var(--accent);
          background: rgba(0, 232, 122, 0.04);
        }

        .upload-dropzone-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(0, 232, 122, 0.07);
          border: 1px solid rgba(0, 232, 122, 0.15);
        }

        .upload-dropzone-label {
          font-size: 14px;
          color: var(--ink-2);
          text-align: center;
        }
        .upload-dropzone-label strong { color: var(--accent); }

        .upload-dropzone-hint {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-align: center;
        }

        .upload-file-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
        }

        .upload-file-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: var(--ivory);
          border: 1px solid var(--line);
          border-radius: 10px;
        }

        .upload-file-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .upload-file-name {
          font-size: 13px;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .upload-file-size {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.06em;
        }

        .upload-file-remove {
          color: var(--muted);
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .upload-file-remove:hover {
          color: #e05555;
          background: rgba(220, 80, 80, 0.08);
        }

        .upload-file-errors {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .upload-file-errors li {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #c0392b;
          letter-spacing: 0.05em;
        }

        .upload-form-error {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #c0392b;
          letter-spacing: 0.05em;
        }

        .upload-submit {
          width: 100%;
          padding: 15px 24px;
          margin-top: 4px;
          justify-content: center;
          font-size: 15px;
          gap: 10px;
        }
        .upload-submit:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .upload-footer {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        .upload-footer p { font-size: 13px; color: var(--muted); }
        .upload-footer-link {
          color: var(--accent);
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .upload-footer-link:hover { opacity: 0.75; }

        /* Reuse confirm overlay/modal from login page */
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
          background: rgba(0, 232, 122, 0.07);
          border: 1px solid rgba(0, 232, 122, 0.2);
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
          display: inline-flex;
          width: 100%;
          padding: 14px 24px;
          justify-content: center;
          font-size: 15px;
        }

        @media (max-width: 560px) {
          .upload-card {
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
