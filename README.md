# Meridian Capital — Mortgage Consultancy Website

A modern, minimal fintech-style React website for a mortgage consultancy firm specialising in business and property loans.

## Stack

- **React 18** + **Vite** (fast dev server & build)
- **lucide-react** for icons
- Pure CSS with CSS variables (no Tailwind, no UI library — keeps the design distinctive)
- Google Fonts: Fraunces (display), Instrument Sans (body), JetBrains Mono (mono)

## Structure

```
src/
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── styles.css               # Global tokens, typography, utilities
└── components/
    ├── Nav.jsx              # Sticky nav w/ scroll state + mobile menu
    ├── Hero.jsx             # Headline, stat strip, live chart motif
    ├── LendersStrip.jsx     # Scrolling lender marquee
    ├── Services.jsx         # 6 loan products in a grid
    ├── About.jsx            # Why-choose-us + four pillars
    ├── Calculator.jsx       # Interactive eligibility calculator (sliders)
    ├── Testimonials.jsx     # Carousel of client stories
    ├── Contact.jsx          # Enquiry form + direct contact methods
    └── Footer.jsx           # Footer w/ FCA reg + oversized wordmark
```

## Getting started

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # → production bundle in dist/
npm run preview  # preview the build locally
```

## Design notes

**Palette** — Warm ivory base (`#f4f1ea`), deep ink (`#0f1412`), muted forest accent (`#1f3a32`), electric lime signal (`#c6ff4a`). Chosen to feel premium and confident without the cliché navy/gold of traditional finance brands.

**Typography** — Fraunces (a variable serif with optical sizing) for display, paired with Instrument Sans for body. This pairing reads as editorial rather than corporate.

**Motion** — Intentionally restrained. Subtle scroll-based nav state, hover micro-interactions on service cards, and a single marquee. No gratuitous scroll animations.

## Customisation checklist

Before going live, swap out:

1. **Company name & logo** — Currently "Meridian". Replace wordmark in `Nav.jsx` and `Footer.jsx`, plus `<title>` in `index.html`.
2. **Contact details** — Phone, email, address in `Contact.jsx` and `Footer.jsx`.
3. **FCA registration number** — Currently `824721` placeholder in `Footer.jsx`.
4. **Testimonials** — Currently fictional, in `Testimonials.jsx`.
5. **Calculator assumptions** — Base rates in `Calculator.jsx` (`baseRate` constant). Currently 5.25% property / 6.85% business. Update to reflect your actual panel.
6. **Form submission** — `Contact.jsx` currently logs to console. Wire up to your backend/CRM (Formspree, HubSpot, Pipedrive, etc.).
7. **Lender list** — Real lenders on your panel in `LendersStrip.jsx`.

## Compliance note

The calculator output is labelled as indicative and includes a repossession warning. Consult your compliance officer on exact FCA-required wording for your market and product set before launch.
