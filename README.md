# [Agency Name] — Homesite

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
│  ├─ favicon.svg        Tab icon (placeholder mark — swap for your logo)
│  ├─ placeholder.svg    "Screenshot coming soon" fallback for project images
│  ├─ mineralcalc.png    ← add screenshot (16:9, ~1200×675)
│  ├─ giland.png         ← add screenshot
│  ├─ portfolio.png      ← add screenshot
│  ├─ lawncare.png       ← add screenshot
│  └─ pools.png          ← add screenshot
└─ samples/          5 throwaway theme mockups used to pick the look (kept for reference)
```

## How to edit the common things

### Change the agency name
The name is the placeholder text **`[Agency Name]`**. Find-and-replace every
`[Agency Name]` in `index.html` (appears in the title, nav brand, OG tags, and footer).

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
(currently `alexogerardi@gmail.com` — swap for a business email when you have one).

**To collect submissions straight to an inbox** (no email app needed), sign up for a
free form backend and point the form at it:
- **Formspree** (https://formspree.io) or **Web3Forms** (https://web3forms.com)
- Set `<form action="https://...endpoint" method="POST">`, give each input a `name`
  (already done), and remove/disable the JS `submit` handler in `main.js`.

## Before going live (to-do)

- [ ] Pick the agency name + replace `[Agency Name]`
- [ ] Replace `favicon.svg` with a real logo/monogram
- [ ] Add the 4 project screenshots in `assets/`
- [ ] Decide on a business email for the contact form
- [ ] Add a real `assets/og-image.png` (1200×630) for social sharing
- [ ] Buy a domain + choose hosting (e.g. Netlify, Cloudflare Pages, GitHub Pages — all free for a static site)
