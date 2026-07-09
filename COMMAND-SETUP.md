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

## Step 4 — Seed the pipeline (optional but recommended)
Open the sheet's **Pipeline** tab (visit the dashboard once, or run the script's `sheet_` — headers appear after the first request). Then paste this block starting at **cell A2** (it's tab-separated; paste directly):

```
1	2026-07-07	Droopy's Lawn & Maintenance	lawn-care	Muncie, IN	email	Droopyslawn@gmail.com	9 yrs in business, 21 reviews, no site — only BBB/Manta pages	droopys-lawn	https://piedmondo.com/demos/droopys-lawn/	built	2026-07-07				Owner John Jett. (765) 808-0990. Email = best channel.
2	2026-07-08	Casa Del Taco	restaurant	Glendale, AZ	fb	facebook.com/CasadelTacoaz	Googling them lands on menu scrapers they don't control	casa-del-taco	https://piedmondo.com/demos/casa-del-taco/	built	2026-07-08				(602) 854-1331. Bilingual demo. 45+ reviews.
3	2026-07-09	Unos Tacos y Birria	restaurant	Phoenix, AZ	fb	facebook.com/unostacosaz	8,600 FB fans, no real site — everything runs through Linktree	unos-tacos-y-birria	https://piedmondo.com/demos/unos-tacos-y-birria/	built	2026-07-09				(602) 281-6840. Bilingual demo. Big following.
4	2026-07-09	Mariscos La Phoenikera	restaurant	Phoenix (Maryvale), AZ	fb	facebook.com/p/Mariscos-La-Phoenikera-100089064347078	Popular mariscos spot, FB-only			researched					(623) 846-0000. Verify on FB before building.
5	2026-07-09	Panadería El Guero	bakery	Phoenix, AZ	fb	facebook.com/PanaderiaElGuero1	Beloved panadería, no website at all			researched					Verify phone/hours on FB.
6	2026-07-09	Tacos y Mariscos El Kora	restaurant	Phoenix, AZ	fb	facebook.com/tacosymariscoselkoraphx	FB-only, menu/hours hard to find			researched					Verify on FB.
7	2026-07-09	Mariscos Mi Nuevo Nayarit	restaurant	Phoenix, AZ	fb	facebook.com/minuevonayarit	FB-only mariscos restaurant			researched					Verify on FB.
8	2026-07-09	La Pupusa Loca	restaurant	Phoenix, AZ	phone	(602) 352-8358	Salvadoran pupusería, no site			researched					4320 W Thomas Rd. Confirm FB page.
9	2026-07-09	Barba's Barbershop	barbershop	Mesa, AZ	fb	facebook.com/barbasbarbershopaz	Info scattered across FB/Booksy, no home base			researched					Barbershop template ready.
10	2026-07-09	Mikey's Barber Shop	barbershop	Glendale, AZ	fb	facebook.com/mikeysbarbershopaz	Traditional shop, no website			researched					Verify on FB.
11	2026-07-09	Elite Barber Shop	barbershop	Glendale, AZ	fb	facebook.com/elitebarbershopusa	Good cuts, invisible on Google			researched					Verify on FB.
12	2026-07-09	Taqueria Las Palmas	restaurant	Mesa, AZ	email	taquerialaspalmas19@gmail.com	Food truck — only a bare auto-page	 		researched					(480) 519-0516. HAS EMAIL — reachable both ways.
13	2026-07-07	IMack Barber Lounge	barbershop	Fort Wayne, IN	fb	facebook.com/p/IMack-Barber-Lounge-100054583984441	2 locations + press, no site			researched					Owner Mack V. Books via the Cut app.
14	2026-07-07	The Original Breakfast Place	restaurant	Erie, PA	fb	facebook.com/TheOriginalBreakfastPlaceLlc	Top Google results are menu scrapers with wrong hours			researched					(814) 825-2727.
15	2026-07-07	White Swan Barber Shop	barbershop	Fort Wayne, IN	fb	facebook.com/whiteswanbarbershop	Institution since the '60s, 126 reviews, no site			researched					(260) 489-5111.
16	2026-07-07	Laced Barber Co	barbershop	Fort Wayne, IN	fb	facebook.com/p/Laced-Barber-Co-100066836885228	Booking on Booksy, info split across FB/IG			researched					(260) 444-5744.
17	2026-07-07	Detailed Lawn Care	lawn-care	Muncie, IN	fb	facebook.com/DetailedLawnCareMuncie	Insured, well-reviewed, invisible outside FB			researched					(765) 606-3208.
18	2026-07-07	E-Quality Mobile Auto Detailing	detailing	Chattanooga, TN	fb	facebook.com/p/E-Quality-Mobile-Auto-Detailing-100057554975708	Only detailer in town with no site			researched					Weak activity — verify alive.
```

## How the lock works (plain English)
- The dashboard page is public HTML, but it contains **no data and no password**.
- When you enter the password, the page uses it to ask the script for data. Wrong password → the script answers "bad key" and nothing loads.
- So the *data* is genuinely protected by Google; the page is just a viewer. Share the password with Brady only.

## Statuses the dashboard understands
`researched → queued → built → sent → replied → won → dead`
- Setting **sent** stamps the date → the **Takedown radar** flags it 7 days later.
- Marking **takedown done** = Claude moves `demos/<slug>` to `demos-archive/` in the repo (URL goes dead, code kept forever).
