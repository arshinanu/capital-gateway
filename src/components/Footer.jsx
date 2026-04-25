export default function Footer({ onPrivacyClick }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="footer-logo">
              <img src="/white-01.png" alt="Capital Gateway" className="footer-logo-img" />
            </a>
            <p>
              FCA authorised credit broker connecting UK businesses and property owners
              to tailored finance solutions across a wide lender network.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/capitalgatewayltd/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/p/Capital-Gateway-Ltd-61581161256015/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-cols">
            <div>
              <h4>Services</h4>
              <a href="#services">Working capital</a>
              <a href="#services">Asset finance</a>
              <a href="#services">Invoice finance</a>
              <a href="#services">Commercial mortgages</a>
              <a href="#services">Development finance</a>
              <a href="#services">Bridging loans</a>
            </div>
            <div>
              <h4>Firm</h4>
              <a href="#about">About</a>
              <a href="#testimonials">Clients</a>
              <a href="#calculator">Calculator</a>
              <a href="#news">News</a>
              <a href="#contact">Contact</a>
            </div>
            <div>
              <h4>Office</h4>
              <p>2 Leyson Road<br/>Cheltenham GL51 6RU</p>
              <a href="tel:07538346421">07538 346 421</a>
              <a href="mailto:Info@capitalgatewayltd.com">Info@capitalgatewayltd.com</a>
            </div>
          </div>
        </div>

        <div className="footer-big">AHEAD, ALWAYS</div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2026 Capital Gateway Limited.</span>
            <button onClick={onPrivacyClick} className="footer-policy-btn">Privacy & Cookies</button>
            <a href="#">Terms</a>
            <a href="#">Complaints</a>
          </div>
          <div className="footer-reg">
            <span> FRN: 936513 · ICO: ZA600162</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--ink);
          color: var(--paper);
          padding: 80px 0 32px;
          position: relative;
          overflow: hidden;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(251, 250, 246, 0.1);
        }
        .footer-logo {
          display: inline-flex;
          align-items: center;
          margin-bottom: 20px;
          transform: scale(3.5);
          margin-left: 30px;
        }
        .footer-logo-img {
          height: 64px;
          width: auto;
          display: block;
        }
        .footer-brand p {
          color: rgba(251, 250, 246, 0.6);
          font-size: 14px;
          line-height: 1.6;
          max-width: 320px;
        }
        .footer-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .footer-cols h4 {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(251, 250, 246, 0.4);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .footer-cols a, .footer-cols p {
          display: block;
          font-size: 14px;
          color: rgba(251, 250, 246, 0.85);
          margin-bottom: 10px;
          transition: color 0.3s var(--ease);
          line-height: 1.5;
        }
        .footer-cols a:hover { color: var(--accent); }

        .footer-social {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }
        .footer-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(251, 250, 246, 0.2);
          color: rgba(251, 250, 246, 0.6);
          transition: border-color 0.3s var(--ease), color 0.3s var(--ease);
        }
        .footer-social a:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .footer-big {
          font-family: var(--font-display);
          font-size: clamp(100px, 22vw, 320px);
          letter-spacing: -0.06em;
          line-height: 0.85;
          color: rgba(251, 250, 246, 0.08);
          text-align: center;
          margin: 60px 0 40px;
          font-weight: 400;
          font-variation-settings: "opsz" 144;
          user-select: none;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid rgba(251, 250, 246, 0.1);
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-legal {
          display: flex;
          gap: 24px;
          align-items: center;
          flex-wrap: wrap;
        }
        .footer-legal span, .footer-legal a, .footer-reg span {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(251, 250, 246, 0.5);
          letter-spacing: 0.04em;
        }
        .footer-legal a:hover { color: var(--accent); }
        .footer-policy-btn {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(251, 250, 246, 0.5);
          letter-spacing: 0.04em;
          transition: color 0.3s var(--ease);
        }
        .footer-policy-btn:hover { color: var(--accent); }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-cols {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  )
}
