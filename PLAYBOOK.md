# Piedmondo Sales Playbook — The Demo Factory

The machine that turns templates into paying clients. Written so any future session can run it cold — no prior conversation needed. Companion files: `pipeline/leads.csv` (the funnel tracker) and `demos/` (deployed prospect demos).

**Goal:** first $1,000 collected. **Pilot cap:** stop and reassess after 10 demos sent — ≥2 replies means scale; 0–1 means change the pitch or channel before building demo #11.

**Division of labor:** Claude researches, builds, drafts. Alex sends, talks, closes. Claude never sends outbound.

---

## 1. The funnel

Every lead moves through these statuses (the `status` column in `pipeline/leads.csv`):

`researched → demo_live → sent → replied → call → deposit → delivered → paid` (or `dead` at any point, with the reason in `notes`)

Weekly readout: count leads at each stage, compute reply rate (replied/sent) and close rate (deposit/sent). Compare against the pilot stop conditions above.

## 2. Prospect research criteria

Hunt for businesses that are **alive but invisible**:

- **Industry:** one we have a template for — restaurant, HVAC/plumbing, barbershop, attorney, nail salon, lawn care/landscaping (templates/standard), bar/lounge (Maximillian), auto detailing (Giland pattern), epoxy/concrete/trades (Xtreme pattern).
- **Alive:** recent Google/Yelp reviews (within ~3 months) or active FB/IG posting. Dead businesses don't buy websites.
- **Invisible:** no website at all, a Facebook page as their only web presence, or a site that is broken / not mobile-friendly / a decade old. Check their Google Business Profile "website" field and Yelp listing.
- **Reachable:** a findable owner contact — email on FB page, DM-able IG/FB, or a contact form. Phone-only is workable but worse (Alex would have to cold-call).
- **Sweet spot size:** owner-operated, 1–20 employees. Big enough to afford $250–600 without blinking, small enough that the owner decides alone.

Good hunting grounds: Yelp/Google Maps searches in mid-size towns (50k–300k pop — big-metro businesses get agency spam constantly), local "best of" lists where some entries have no site link, FB local business directories, new-business announcements in local news.

**Field-tested signals (from the 2026-07-07 research run — ~25 searches, 7 qualified):**
- The strongest no-site tell is an auto-generated Facebook URL: `facebook.com/p/Business-Name-1000...`. Vanity URLs (`facebook.com/businessname`) are weaker but still worth checking.
- Businesses with **100+ Google/Yelp reviews almost always have a site already**. The sweet spot is 5–60 reviews: established enough to pay, small enough to be invisible.
- **Skip HVAC/plumbing** (every operator gets sold a site early — 4 of 4 checked had one) and **skip nail salons** (a template-mill vendor has saturated them; look for `<city name>nails<...>.com` title patterns like "Nail Salon 47804 | Best Nail Salon").
- **Best industries so far:** barbershops, lawn care, owner-operated diners/breakfast spots, solo mobile detailers.
- Scraper directories (`*.website`, `res-menu.net`, `netwaiter.com`, `wheree.com`, `menufyy`) are NOT owned sites — and they're a pitch angle: they show the business with wrong/conflicting hours the owner can't fix.
- Search recipe that works: `<industry> <mid-size city+state> facebook page reviews -site:yelp.com` → then verify each candidate with `"<Business Name>" <city> website` and confirm no owned domain appears.

Log every qualified prospect as a row in `pipeline/leads.csv` even if we don't build for them yet — research is reusable.

## 3. Demo build procedure

1. **Pick the base:** nearest template in `templates/`, or the nearest past build (Giland/Xtreme/Maximillian) if it's a better fit.
2. **Personalize** (the minimum that makes it feel *theirs*):
   - Business name everywhere (title, hero, OG tags, footer)
   - Their town/area callouts (hero, footer, service-area strip)
   - Real services + realistic prices (from their FB/Yelp; omit prices if unknown)
   - Real phone/hours if public; placeholder form otherwise
   - 1–2 real review quotes from their Google/Yelp (attributed, verbatim — these are real, unlike template placeholders)
   - Their own public business photos ONLY in the private pitch to them (spec-work norm; replace with stock instantly if they object). Stock/placeholder otherwise.
3. **Add the demo banner** (top of page, dismissible):
   ```html
   <div id="pd-banner" style="position:sticky;top:0;z-index:999;background:#111;color:#fafafa;padding:10px 16px;text-align:center;font:14px/1.4 Inter,system-ui,sans-serif;">
     Live demo built for <strong>[Business Name]</strong> by <a href="https://piedmondo.com" style="color:#fff;text-decoration:underline;">Piedmondo</a> — like it? It's yours.
     <a href="https://piedmondo.com/#contact" style="color:#fff;text-decoration:underline;margin-left:8px;">Claim this site &rarr;</a>
     <button onclick="this.parentElement.remove()" style="background:none;border:0;color:#999;margin-left:10px;cursor:pointer;">&times;</button>
   </div>
   ```
4. **Add noindex** to `<head>`: `<meta name="robots" content="noindex">` — demos must not rank or leak into search.
5. **Deploy:** folder at `demos/<slug>/index.html` in this repo (slug = kebab-case business name). Push → live at `piedmondo.com/demos/<slug>/` in ~1 min.
6. **QA before Alex sends** (all must pass):
   - [ ] Loads at the live URL
   - [ ] Mobile 375px: no clipped text, no horizontal scroll
   - [ ] Zero console errors
   - [ ] Banner shows, dismisses, and its CTA links to piedmondo.com/#contact
   - [ ] `noindex` present
   - [ ] Business name correct everywhere (search for template leftovers!)
   - [ ] Phone/links go where they claim
7. **Log it:** update the lead's row → `demo_live`, fill `demo_slug`.

When a QA miss slips through, add the check here the same session — fix the system, not the instance.

## 4. Outreach scripts (Claude drafts per-lead; Alex sends)

Personalize the [bracketed] parts — the one specific observation is what separates this from spam.

**Touch 1 (day 0):**
> Hi [Name] — I came across [Business] while looking at [industry] shops in [Town]. Noticed you're running everything through [Facebook page / an older site], so I went ahead and built you a modern homepage to show what's possible: **[demo link]**
>
> It's a live working site — takes 30 seconds to look at on your phone. If you like it, it's yours: flat $[250–600] once, done in about a week, no monthly agency fees. If not, no worries — I'll take it down.
>
> — Alex, piedmondo.com

**Touch 2 (day 3):**
> Hi [Name] — just making sure the demo site I built for [Business] didn't get buried: [demo link]. Happy to tweak anything (colors, photos, layout) — that's part of the build. Either way, no pressure.

**Touch 3 (day 7, final):**
> Last note from me — I'll be taking the [Business] demo down this week to free the space. If you want it (or want changes first), just reply and it stays up. Otherwise, best of luck with the shop — genuinely.

Rules: never send more than 3 touches; take a demo down promptly if asked; if they reply with anything but a hard no, move status to `replied` and Alex takes over the conversation.

## 5. Pricing & objections (Alex's close sheet)

Anchors: **Base $250** (single page) · **Standard $350–600** (multi-page) · 50% deposit, 50% on delivery · then $10/mo maintenance (hosting + edits) or ~$150 buyout.

- *"I can't afford a website"* → "That's why the price is flat and public — $250, once. Most agencies charge $2,000+ for the same thing. And you've already seen yours — it's built."
- *"I get all my business from Facebook"* → "Keep the Facebook page — the site makes it work harder. When someone Googles you and finds nothing, they call the competitor who has a site. This catches those."
- *"I need to think about it"* → "Totally fair. The demo stays up through [date]. One thing worth knowing: the price includes changes — colors, photos, pages — so 'not quite right' isn't a reason to pass."
- *"Can you add [feature]?"* → "Almost certainly — most additions fit in Standard ($350–600). Tell me what you need and I'll quote it flat before we start."
- *"How do I know you're legit?"* → Point to piedmondo.com/#work — live client sites (Giland, Xtreme), plus the demo they're literally looking at.

Deposit = a Stripe payment link (Alex has Stripe; wire links when ready so "yes" is one click).

## 6. Tracker column definitions (`pipeline/leads.csv`)

| Column | Meaning |
|---|---|
| `date_added` | YYYY-MM-DD the lead was researched |
| `business` | Business name |
| `industry` | Which template industry |
| `city_state` | Location |
| `contact` | Best contact route: email / FB DM / IG DM / form / phone |
| `contact_detail` | The actual address/handle/URL |
| `presence` | Current web presence: none / fb-only / broken-site / old-site |
| `pitch_angle` | The one specific observation for Touch 1 |
| `demo_slug` | Folder name under demos/ (blank until built) |
| `status` | Funnel stage (see §1) |
| `sent` | Date of Touch 1 |
| `last_touch` | Date of most recent touch (max 3) |
| `notes` | Anything: reply content, objection, reason dead |

---

*Maintenance note: this playbook is the system of record for the sales motion. Corrections from real-world results go here, not in chat history.*
