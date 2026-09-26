const WHATSAPP_NUMBER = '447587592759' // +44 7587 592759

export default function WhatsAppButton() {
  return (
    <>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
      >
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3C9.1 3 3.5 8.6 3.5 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.9c1.9 1.1 4.1 1.6 6 1.6 6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3z"
            fill="#25D366"
          />
          <path
            d="M22.4 18.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.4 3.6.2.3 2.4 3.7 5.8 5.1.8.3 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-0.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4z"
            fill="#fff"
          />
        </svg>
      </a>

      <style>{`
        .whatsapp-btn {
          position: fixed;
          bottom: 32px;
          left: 32px;
          z-index: 150;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.28);
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .whatsapp-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 26px rgba(0,0,0,0.34);
        }
        @media (max-width: 560px) {
          .whatsapp-btn {
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </>
  )
}
