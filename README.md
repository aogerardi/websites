# Piedmondo — Homesite

The agency's own marketing site + portfolio. Plain HTML/CSS/JS — no build step, no
frameworks. Open `index.html` in a browser to view it.

## Files

```
Sites/
├─ index.html        Main page (all sections live here)
├─ styles.css        All styling, theme variables at the top
├─ main.js           Mobile nav toggle + contact-form handler
├─ README.md         This file
├─ assets/
│  ├─ piedmondo-mark.svg       Logo mark (mountains + ring) — used as favicon + nav/footer brand
│  ├─ piedmondo-mark-white.svg White version of the mark, for dark backgrounds
│  ├─ piedmondo-lockup.svg     Mark + "Piedmondo" wordmark
│  ├─ piedmondo-mark-512/1024.png  Raster marks (social, print)
│  ├─ favicon-16.png / favicon-32.png / apple-touch-icon-180.png  Browser/iOS icons
│  ├─ favicon.svg        Old placeholder mark (unused — kept for reference)
│  ├─ placeholder.svg    "Screenshot coming soon" fallback for project images
│  ├─ mineralcalc.png    Portfolio screenshot
│  └─ giland.png         Portfolio screenshot
└─ samples/          5 throwaway theme mockups used to pick the look (kept for reference)
```

## How to edit the common things

### Change the agency name
The agency is named **Piedmondo** ("foot of the world"). The name appears in
`index.html` (title, nav brand, OG tags, footer), the templates' footers, and the
`templates/` index. To rename, find-and-replace `Piedmondo` across the repo.

### Change the colors / fonts
Everything is driven by CSS variables at the top of `styles.css` under `:root`.
Swap these and the whole site updates:
- `--accent` / `--accent-hover` — buttons, links, accents (currently near-black)
- `--fg`, `--bg`, `--bg-muted`, `--bg-accent` — text and backgrounds
- `--font-head` (Fraunces serif) and `--font-body` (Inter) — change the
  Google Fonts `<link>` in `index.html` if you switch fonts.

The current theme is "Sample 4 — Minimal & Elegant." The other looks we tried are
in `samples/` if you want to revisit them.

### Add project screenshots
Drop PNGs into `assets/` with the exact names listed above. They appear
automatically; until then a clean placeholder shows. For `.jpg` instead, update the
`src` paths in the "Our Work" section of `index.html`.

### Edit pricing / FAQ / copy
All content is plain text in `index.html`, grouped by clearly labeled
`<!-- ============ SECTION ============ -->` comments.

## Contact form

Right now the form (in `main.js`) opens the visitor's email app pre-filled and sends
to the address in `data-contact-email` on the `<form>` in `index.html`
(currently `piedmondosites@gmail.com`).

**To collect submissions straight to an inbox** (no email app needed), sign up for a
free form backend and point the form at it:
- **Formspree** (https://formspree.io) or **Web3Forms** (https://web3forms.com)
- Set `<form action="https://...endpoint" method="POST">`, give each input a `name`
  (already done), and remove/disable the JS `submit` handler in `main.js`.

## Before going live (to-do)

- [ ] Pick the agency name + replace `[Agency Name]`
- [x] Replace placeholder favicon with the real Piedmondo logo (`piedmondo-mark.svg`)
- [ ] Add the 2 project screenshots in `assets/` (`mineralcalc.png`, `giland.png`)
- [ ] Decide on a business email for the contact form
- [ ] Add a real `assets/og-image.png` (1200×630) for social sharing
- [ ] Buy a domain + choose hosting (e.g. Netlify, Cloudflare Pages, GitHub Pages — all free for a static site)
