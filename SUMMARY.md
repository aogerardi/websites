# Piedmondo — Project Summary

**Piedmondo** is the marketing site and portfolio for a small web-design agency that
builds affordable, modern websites for small businesses (flat-rate pricing, starting
from $250, 1–2 week turnaround). The name is Italian for "foot of the world"
(*piede* + *mondo*).

## Tech

Plain **HTML / CSS / JavaScript** — no build step, no frameworks, no dependencies.
Just open `index.html` in a browser. Deployable as a static site (Netlify, Cloudflare
Pages, GitHub Pages, etc.). Google Fonts (Fraunces + Inter) are the only external load.

## What's here

| Path | Purpose |
|------|---------|
| `index.html` | The full single-page site — hero, services, templates callout, process, pricing, portfolio, FAQ, contact form, footer. All content lives here, grouped by `<!-- SECTION -->` comments. |
| `styles.css` | All styling. Theme is driven by CSS variables under `:root` at the top; current look is "Minimal & Elegant." |
| `main.js` | Light interactivity: dark/light theme toggle (persisted in localStorage), mobile nav, contact-form submission, scroll-reveal animations, and stat count-up. |
| `templates/` | Standalone industry demo sites (restaurant, HVAC/plumbing, barbershop, attorney) plus an index — used as live "what we can build" examples. |
| `samples/` | 5 throwaway theme mockups kept for reference from when the look was chosen. |
| `assets/` | Logo marks, favicons, portfolio screenshots, and placeholders. |
| `substack/` | Unrelated content drafts (newsletter material). |
| `README.md` | Detailed editing/maintenance guide (how to rename, recolor, swap screenshots, etc.). |
| `ROADMAP.md` | Planned work and ideas. |

## Key features

- **Responsive, single-page layout** with anchor-nav sections.
- **Dark/light mode** toggle, no-flash theme applied before paint.
- **Contact form** wired to **Formspree** (AJAX submit with inline success/error;
  falls back to a contact email if sending fails).
- **Accessible & motion-aware** — ARIA labels, reduced-motion fallbacks for animations.
- **Portfolio** linking to real builds (MineralCalc, Giland Auto Detailing) with
  graceful image placeholders.

## Status

Live-ready static site. Remaining go-live items (domain, hosting, final OG image,
business email) are tracked in `README.md` and `ROADMAP.md`.
