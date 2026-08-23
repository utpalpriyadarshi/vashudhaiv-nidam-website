# Pending Work

Running list of known gaps/placeholders on the live site, tracked here so we
don't lose track between sessions. Update this file (move items to "Done" or
delete them) as each is resolved.

## Open

1. **Blog/article snippets** (Heritage section, `index.html`) — 3 placeholder
   entries (Charaka Samhita/nutrition, Aryabhata/Vedic math, folk-art
   workshops). Decide: keep as illustrative examples, or replace with real
   content.
2. **Real testimonials** (Stories section, `index.html`) — 3
   `[Placeholder नाम]` entries (parent, skills graduate, volunteer). Waiting
   on the organization.
3. **Gallery photos** (`#gallery`, `index.html`) — placeholder note asking
   for real event/program photography. Not yet available. **Deferred until
   after Phase 1 of the live-classes/WhatsApp work
   (`PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md`) ships.**

   Planned workflow once picked up:
   - The 8 tiles are currently empty `<div>`s styled with CSS gradients
     (`.gallery-grid div:nth-child(...)`), not images — replace each with
     an `<img>` sourced from a new `assets/gallery/` folder, keeping the
     existing `hi`/`en-mini` caption overlay pattern.
   - File naming should match each tile's caption slug (e.g.
     `assets/gallery/classroom-day.jpg`).
   - Photos should be resized to roughly tile-rendered size and compressed
     (well under 300KB each) before committing — they go directly into the
     git repo, so keeping them lean matters for repo size and page load.
   - Confirm with the foundation once that event/program photos (especially
     of children) are OK to publish, rather than checking per-photo.
   - If the gallery is expected to grow well past ~8-12 photos, don't keep
     committing dozens of images — add a "View more photos" tile linking to
     an external album (Google Photos/Drive) instead, to avoid repo bloat.
   - No JSON/data file needed for a fixed grid this size — hand-edited HTML
     is consistent with how the rest of this site's content is maintained.
4. **Team photos** (`team.html`) — all 16 entries currently show
   initial-letter circles instead of real photos (4 patrons, president,
   vice president, secretary + joint secretary, treasurer + joint
   treasurer, spokesperson, 3 media in-charges, 2 advisors).
5. **Footer copyright note** (`index.html`) — still reads
   "[Placeholder सामग्री — केवल डिज़ाइन समीक्षा हेतु]".
6. **Founder's photo/bio accuracy** — worth double-checking against the
   actual founder before launch (the Founder section on the homepage
   currently profiles Maharshi Dayanand Saraswati as spiritual
   inspiration, not a photo/bio of Shri Yogendra Medhavi personally —
   confirm whether a personal founder bio/photo is wanted in addition).
7. **Weekly class schedule dummy data** (`data/schedule.json`) — 5 dummy
   sessions starting 2026-09-01 (topics like "Sanskrit Basics", teacher
   "Acharya Ji", every `link` set to `"#"` showing "Coming Soon"). Built
   ahead of real schedule data per
   `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md` so the table/countdown mechanism
   could ship now. Replace with real topics/teachers/days/times and real
   Join links once available — just edit the JSON file directly, no code
   changes needed.
   - **Decision (2026-08-13):** Google Meet links will use **one single
     recurring Meet link** reused across every `platform: "meet"` row,
     rather than a separate link per class. Once that recurring link
     exists (create a recurring Google Calendar event, grab its stable
     `meet.google.com/xxx-xxxx-xxx` URL), paste it into every `meet` row's
     `link` field in `data/schedule.json` — still just a JSON edit, no
     code changes.
   - **Partially done (2026-08-22):** Received the real recurring Meet
     link for उपनिषद् पठन (Upanishad Pathan), `meet.google.com/iyx-vqgc-eyr`,
     confirmed Mon/Wed/Fri 9:00–10:00 PM IST with आचार्य योगेन्द्र मेधावी जी
     (Acharya Yogendra Medhavi Ji). Added as three real rows in
     `data/schedule.json` (this week's Mon/Wed/Fri occurrences) and synced
     into the static fallback row in `index.html`. Sanskrit Basics/Vedas
     Study/Yoga Session/Open Q&A rows are still dummy placeholders —
     replace once their real details arrive. Note: the acharya also
     shared a Google Calendar *share* link (`calendar.google.com/.../share?slt=...`)
     — deliberately **not** published anywhere on the site, since that
     link grants access to their whole personal calendar rather than just
     this event; a proper single-event link (`calendar.app.google/...`)
     was also shared but not added to the site per the org's preference to
     skip an "Add to calendar" button for now.
8. **Event photo captions need confirmation** (`.event-photos#event-photos`,
   `index.html`, added 2026-08-23) — 8 real photos from
   `reference-material/230826/` were published in a new "Functions &
   Events" section (`assets/events/`). Several captions are intentionally
   generic ("सामुदायिक कार्यक्रम" / Community programme,
   "विद्यालय में कार्यक्रम" / Programme at a school,
   "कार्यक्रम में सहभोज" / Community meal) because the exact event
   name/date/location wasn't legible from the photo itself — confirm the
   real details with the foundation and tighten the captions (and add
   date/location like the other event sections do) once known. The two
   Yagyashala/Mahayajna and the Sanskar Shala/World Environment Day photos
   have banner text confirming those event names/dates.
9. **Videos from the foundation** — the same batch
   (`reference-material/230826/`) was shared as "photos and videos," but
   only 18 photos arrived, no video files. Asked the foundation to
   re-share the videos separately; once they land, decide on hosting
   (YouTube unlisted/embed vs. direct file) before adding them to the
   site — large video files should not be committed directly to the repo.
10. **Facebook Page URL** (`.live-now#live`, `index.html`) — the Facebook
   card in the Live Now section currently links to a one-off reel share
   (`facebook.com/share/r/18ChB2dbpZ/`), not the actual Page, so it'll go
   stale. Swap for the real Facebook Page URL once available. (Also
   revisit YouTube/Facebook as self-updating embeds later if a `UC...`
   channel ID and the Page URL become available — see Done log below for
   why link-out buttons were used instead.)

## Done

- Registration no., address, phone confirmed and filled in.
- 12A/80G provisional registration numbers + PAN published on
  `tax-exemption.html` and `index.html`.
- Bank account + UPI ID for donations added to Contact section, with a
  fraud-prevention verification note.
- Contact email(s) confirmed (`vasudhaivnidam@gmail.com`,
  `yogendralathakuri@gmail.com`) and second phone number added.
- Office bearers moved to standalone `team.html`, linked from nav/footer.
  President entry kept as "President" (अध्यक्ष) only, not "President &
  Founder", even though Shri Yogendra Medhavi is both.
- Contact/donation form backend: now submits via `mailto:` with a
  "Message on WhatsApp" button as an alternative (both use existing
  contact details, no third-party account needed).
- **Domain spelling mismatch fixed.** Primary domain switched from the
  misregistered `vashudhaivnidam.org` to the correctly-spelled
  `vasudhaivnidam.org`: repo `CNAME` and all docs/copy updated, DNS added
  at Namecheap, GitHub Pages custom domain + HTTPS cert reissued, and
  `main` merged/live on the new domain. The old domain now redirects
  (301, HTTP and HTTPS) to the new one via Cloudflare (DNS moved to
  Cloudflare nameservers since Namecheap's free URL-forward only serves
  HTTP, not HTTPS) — a Redirect Rule matches `vashudhaivnidam.org`
  requests and rewrites them to `https://vasudhaivnidam.org` with path
  preserved.
- Site-wide "placeholder design" banner removed from the top of
  `index.html` (`.placeholder-note` div and its CSS rule).
- Donation UPI scan-and-pay QR code added to the Contact section
  (`assets/qr/donation-qr.jpg`, cropped from the ICICI Bank standee,
  verified to decode to the same UPI ID already published as text).
- Upanishad Pathan WhatsApp group added as a "Subject Groups" card under
  the WhatsApp Community section, alongside the general community invite.
- New "Upcoming Events" section (`.upcoming-events#events`) added with
  the Thaila Kranti (jute bag) campaign — 500 bags, distributing 15th
  August at the office premises in Haridwar.
- Real Upanishad Pathan Google Meet link (`meet.google.com/iyx-vqgc-eyr`)
  added to `data/schedule.json` as three Mon/Wed/Fri rows with Acharya
  Yogendra Medhavi Ji, replacing that one dummy row (the JSON file is
  what actually drives the live schedule table, not the static HTML).
  Sanskrit Basics/Vedas Study/Yoga Session/Open Q&A rows are still dummy
  placeholders. The acharya's Google Calendar *share* link was
  deliberately not published (grants access to their whole personal
  calendar, not just this event).
- Live Now section's four "Coming Soon" cards replaced with real
  link-out buttons: YouTube (`youtube.com/@acharyayogendramedhaviveda7334`),
  Instagram (`instagram.com/yogendramedhavi`), Google Meet (same
  recurring link as above), and Facebook (a reel share link — see Open
  item 8 above for the remaining gap). Kept as simple links rather than
  self-updating embeds since those need a YouTube channel ID and
  Facebook Page URL that aren't available yet.
