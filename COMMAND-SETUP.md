# Command Center — one-time setup (~10 min)

The dashboard at **piedmondo.com/command/** reads and writes a private Google Sheet through a small script. You've done this drill once for Xtreme — same steps, one extra: you pick the password.

## Step 1 — Create the sheet
1. Go to [sheets.new](https://sheets.new) → name it **Piedmondo Pipeline**.
2. Leave it empty — the script creates the "Pipeline" tab and headers on first use.
3. **Share** it with Brady (Editor).

## Step 2 — Add the script
1. **Extensions → Apps Script**, delete the starter code.
2. Paste in **`command-center.gs`** (in this folder).
3. On the line near the top, change `var KEY = 'CHANGE-ME';` to your chosen password, e.g. `var KEY = 'pine-gold-1847';`
   - This password **is** the dashboard login AND the API key. Pick something you don't use elsewhere. Share it only with Brady (and tell Claude in-session so demos/leads can be synced — it's stored only in a local gitignored file, never in the repo).
4. 💾 Save.

## Step 3 — Deploy
1. **Deploy → New deployment → ⚙ Web app**
2. Execute as: **Me** · Who has access: **Anyone**
3. **Deploy**, authorize (Advanced → Go to project → Allow), copy the **/exec URL**.
4. **Send Claude the /exec URL** (the URL is safe to embed in the site — it answers nothing without the key).

> Changing the script later? Deploy → **Manage deployments → ✏ → New version** — the URL stays the same.

## Step 4 — Seed the pipeline
Done — all 18 current leads were seeded into the sheet via the API on 2026-07-09. (The raw seed data was removed from this public file afterward for privacy; the pipeline now lives only in the private sheet.)


## How the lock works (plain English)
- The dashboard page is public HTML, but it contains **no data and no password**.
- When you enter the password, the page uses it to ask the script for data. Wrong password → the script answers "bad key" and nothing loads.
- So the *data* is genuinely protected by Google; the page is just a viewer. Share the password with Brady only.

## Statuses the dashboard understands
`researched → queued → built → sent → replied → won → dead`
- Setting **sent** stamps the date → the **Takedown radar** flags it 7 days later.
- Marking **takedown done** = Claude moves `demos/<slug>` to `demos-archive/` in the repo (URL goes dead, code kept forever).
