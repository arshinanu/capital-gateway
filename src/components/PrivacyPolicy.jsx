export default function PrivacyPolicy({ onClose }) {
  return (
    <div className="policy-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="policy-modal">
        <div className="policy-header">
          <div>
            <span className="eyebrow">Legal</span>
            <h2 className="policy-title">Privacy & Cookie Policy</h2>
          </div>
          <button className="policy-close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="policy-body">

          <section className="policy-section">
            <h3>Our Contact Details</h3>
            <div className="contact-block">
              <p><strong>Capital Gateway Ltd</strong></p>
              <p>170 Farmfield Road, Cheltenham, England, GL51 3RB</p>
              <p>
                <a href="tel:+447538346421">+44 7538 346421</a> &nbsp;/&nbsp;
                <a href="tel:+447587592759">+44 7587 592759</a>
              </p>
              <p><a href="mailto:sibi.joseph@capitalgatewayltd.com">sibi.joseph@capitalgatewayltd.com</a></p>
            </div>
          </section>

          <section className="policy-section">
            <h3>The Type of Personal Information We Collect</h3>
            <p>We currently collect and process the following information:</p>
            <ul>
              <li>Personal identifiers, contacts, and characteristics (e.g. title, first name, last name, mobile number, email address, date of birth, occupation, gross income)</li>
            </ul>
            <p>For secured loan applications, this also includes:</p>
            <ul>
              <li>Timestamp of your submission</li>
              <li>Name of borrower on title at Land Registry</li>
              <li>Home address and address of security property</li>
              <li>Market value of security property</li>
              <li>Outstanding mortgage with 1st charge lender and lender name</li>
              <li>Details of second charge lender (if applicable)</li>
              <li>Mortgage arrears</li>
              <li>Brief specification of the property</li>
              <li>Whether the property is freehold or leasehold; leasehold service charge arrears (if applicable)</li>
              <li>Bankruptcy status</li>
              <li>Desired loan amount and purpose of the loan</li>
            </ul>
            <p>
              This information is required by lenders to assess your application and offer appropriate
              terms for <strong>Main Loans</strong> (up to 70% LTV, 12 months with no repayments) or{' '}
              <strong>Sub Loans</strong> (40–50% LTV, funds in 3–5 days for business purposes).
            </p>
          </section>

          <section className="policy-section">
            <h3>How We Get the Personal Information and Why We Have It</h3>
            <p>
              Most of the personal information we process is provided to us directly by you for the
              following reason: to qualify, assess, and ultimately provide an offer of secured finance
              via either a Main Loan or Sub Loan, tailored to your financial needs.
            </p>
            <p>We also receive personal information indirectly from:</p>
            <ul>
              <li>
                Online publicly available sites such as Zoopla, Rightmove, and other property
                valuation platforms to estimate property values (e.g. a property valued at £500k)
              </li>
              <li>
                HMLR Land Registry for property ownership and charge details to verify your
                application (e.g. confirming a £200k first charge)
              </li>
            </ul>
            <p>
              We use the information you provide to qualify, assess, and present your application to
              our private and mainstream lenders, specifically to support your inquiry toward a secured
              funding offer. We may also use your contact information to send you marketing
              communications about our secured loan services, but only if you have provided explicit
              consent.
            </p>
            <p>We may share this information with:</p>
            <ul>
              <li>
                Private and mainstream lender organisations as part of our process to generate an
                offer of secured finance and appropriate terms in response to your specific inquiry
              </li>
              <li>
                Third-party service providers (e.g. PipeDrive CRM, Google Sheets) for secure storage
                and processing of your data
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h3>Our Lawful Bases Under UK GDPR</h3>
            <ul>
              <li>
                <strong>Contractual obligation:</strong> To process your secured loan application and
                provide the services you have requested
              </li>
              <li>
                <strong>Legal obligation:</strong> To comply with regulatory requirements, such as
                verifying your identity and property details
              </li>
              <li>
                <strong>Consent:</strong> For marketing communications, where you have explicitly
                opted in to receive updates about our secured loan services
              </li>
            </ul>
          </section>

          <section className="policy-section">
            <h3>How We Store Your Personal Information</h3>
            <p>
              Your information is securely stored in our Google and ZohoCRM systems, which are
              protected with industry-standard encryption and access controls.
            </p>
            <p>
              We keep personal information for up to <strong>6 years</strong> to comply with legal
              and regulatory requirements in the financial services industry. After this period, we
              will securely dispose of your information by deleting it from our systems through manual
              and automated removal processes, conducted on an annual basis.
            </p>
            <p>
              If you wish to apply again after this period, you will need to initiate a new inquiry
              with a new opt-in or written consent to engage with our services.
            </p>
          </section>

          <section className="policy-section">
            <h3>Your Data Protection Rights</h3>
            <p>Under data protection law, you have the following rights:</p>
            <ul>
              <li><strong>Right of access:</strong> You have the right to ask us for copies of your personal information</li>
              <li><strong>Right to rectification:</strong> You have the right to ask us to rectify personal information you think is inaccurate</li>
              <li><strong>Right to erasure:</strong> You have the right to ask us to erase your personal information in certain circumstances</li>
              <li><strong>Right to restriction of processing:</strong> You have the right to ask us to restrict the processing of your personal information in certain circumstances</li>
              <li><strong>Right to object to processing:</strong> You have the right to object to the processing of your personal information in certain circumstances, including for marketing purposes</li>
              <li><strong>Right to data portability:</strong> You have the right to ask that we transfer your personal information to another organisation, or to you, in certain circumstances</li>
            </ul>
            <p>
              You are not required to pay any charge for exercising your rights. If you make a
              request, we have one month to respond to you.
            </p>
            <div className="contact-block">
              <p><strong>Contact us to exercise your rights:</strong></p>
              <p>Email: <a href="mailto:sibi.joseph@capitalgatewayltd.com">sibi.joseph@capitalgatewayltd.com</a></p>
              <p>Phone: <a href="tel:+447587592759">+44 7587 592759</a> / <a href="tel:+447538346421">+44 7538 346421</a></p>
              <p>Post: 170 Farmfield Road, Cheltenham, England, GL51 3RB</p>
            </div>
          </section>

          <div className="policy-divider" />

          <section className="policy-section">
            <h3>How to Complain</h3>
            <p>
              If you have any concerns about our use of your personal information, you can make a
              complaint to us using the contact details above.
            </p>
            <p>
              You can also complain to the <strong>Information Commissioner's Office (ICO)</strong>{' '}
              if you are unhappy with how we have used your data:
            </p>
            <div className="contact-block">
              <p>Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
              <p>Helpline: <a href="tel:03031231113">0303 123 1113</a></p>
              <p>Website: <a href="https://www.ico.org.uk" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a></p>
            </div>
          </section>

          <div className="policy-divider" />

          <section className="policy-section">
            <h3>Cookie Policy</h3>
            <p>
              Our website uses cookies to ensure it functions correctly and to understand how visitors
              use our site. A cookie is a small text file stored on your device.
            </p>
            <div className="cookie-table">
              <div className="cookie-row cookie-row-head">
                <span>Type</span>
                <span>Purpose</span>
                <span>Duration</span>
              </div>
              <div className="cookie-row">
                <span>Essential</span>
                <span>Required for the site to function (form submission, navigation)</span>
                <span>Session</span>
              </div>
              <div className="cookie-row">
                <span>Analytics</span>
                <span>Anonymous usage data to help us improve the site</span>
                <span>Up to 2 years</span>
              </div>
              <div className="cookie-row">
                <span>Preference</span>
                <span>Remembers settings such as cookie consent status</span>
                <span>1 year</span>
              </div>
            </div>
            <p style={{marginTop: '16px'}}>
              You can control or delete cookies through your browser settings at any time. Disabling
              essential cookies may affect site functionality. For more information, visit{' '}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.
            </p>
          </section>

        </div>
      </div>

      <style>{`
        .policy-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 20, 18, 0.6);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .policy-modal {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 24px;
          width: 100%;
          max-width: 760px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .policy-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 36px 40px 28px;
          border-bottom: 1px solid var(--line);
          flex-shrink: 0;
        }
        .policy-title {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-top: 12px;
        }
        .policy-close {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s var(--ease);
          margin-top: 8px;
        }
        .policy-close:hover {
          background: var(--ink);
          color: var(--paper);
          border-color: var(--ink);
        }
        .policy-body {
          overflow-y: auto;
          padding: 36px 40px 48px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .policy-section h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin-bottom: 12px;
          color: var(--ink);
        }
        .policy-section p {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 12px;
        }
        .policy-section p:last-child { margin-bottom: 0; }
        .policy-section ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }
        .policy-section ul li {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.55;
          padding-left: 16px;
          position: relative;
        }
        .policy-section ul li::before {
          content: '–';
          position: absolute;
          left: 0;
          color: var(--forest);
        }
        .policy-section a {
          color: var(--forest);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .policy-section strong {
          color: var(--ink-2);
          font-weight: 600;
        }
        .contact-block {
          background: var(--ivory);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 12px;
        }
        .contact-block p {
          font-size: 14px;
          margin-bottom: 0;
        }
        .policy-divider {
          border-top: 1px solid var(--line);
        }
        .cookie-table {
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 4px;
        }
        .cookie-row {
          display: grid;
          grid-template-columns: 1fr 2.5fr 1fr;
          gap: 16px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--line);
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
        }
        .cookie-row:last-child { border-bottom: none; }
        .cookie-row-head {
          background: var(--ivory);
          font-family: var(--font-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--ink-2);
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .policy-header, .policy-body { padding: 24px; }
          .policy-title { font-size: 26px; }
          .cookie-row { grid-template-columns: 1fr; gap: 4px; }
          .cookie-row-head span:not(:first-child) { display: none; }
        }
      `}</style>
    </div>
  )
}
