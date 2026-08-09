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
4. **Team photos** (`team.html`) — all 9 entries currently show
   initial-letter circles instead of real photos.
5. **Site-wide "placeholder design" banner** at the top of `index.html` —
   still present, not yet removed.
6. **Footer copyright note** (`index.html`) — still reads
   "[Placeholder सामग्री — केवल डिज़ाइन समीक्षा हेतु]".
7. **Founder's photo/bio accuracy** — worth double-checking against the
   actual founder before launch (the Founder section on the homepage
   currently profiles Maharshi Dayanand Saraswati as spiritual
   inspiration, not a photo/bio of Shri Yogendra Medhavi personally —
   confirm whether a personal founder bio/photo is wanted in addition).
8. **Weekly class schedule dummy data** (`data/schedule.json`) — 5 dummy
   sessions starting 2026-09-01 (topics like "Sanskrit Basics", teacher
   "Acharya Ji", every `link` set to `"#"` showing "Coming Soon"). Built
   ahead of real schedule data per
   `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md` so the table/countdown mechanism
   could ship now. Replace with real topics/teachers/days/times and real
   Join links once available — just edit the JSON file directly, no code
   changes needed.
9. **Live Now section** (`.live-now#live`, `index.html`) — four static
   "Coming Soon" placeholder cards (YouTube, Facebook, Instagram, Google
   Meet), no real channel/page/profile/meeting URLs yet. Built ahead of
   real platform URLs per `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md`. Once
   URLs are available: swap the YouTube card for the channel's Live-tab
   `<iframe>` embed, the Facebook card for the Page Plugin embed (both
   self-update live/offline, no API key needed), and the Instagram/Meet
   cards for "Watch on Instagram"/"Join Meet" link-out buttons.
10. **Domain spelling mismatch — switch in progress.** The foundation's
    name is spelled "Vasudhaiv Nidam" (no "h" after the "s"), but the live
    domain `vashudhaivnidam.org` was registered with an extra "h" by
    mistake. Decision made: switch primary to the correctly-spelled
    `vasudhaivnidam.org` (already purchased on Namecheap) while the site
    is still pre-launch/placeholder-banner stage, before real
    backlinks/print materials accumulate. Steps:
    - [ ] Add DNS records for `vasudhaivnidam.org` at Namecheap (Advanced
      DNS): `A` records for `@` → GitHub Pages IPs
      (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
      `185.199.111.153`), `CNAME` for `www` → `utpalpriyadarshi.github.io`.
      **(user action, in progress)**
    - [x] Update this repo's `CNAME` file and all docs/copy referencing
      the domain to `vasudhaivnidam.org` (branch
      `infra/switch-primary-domain`).
    - [ ] Wait for DNS to propagate, then merge the branch to `main` so
      GitHub Pages picks up the new custom domain, and wait for the new
      HTTPS certificate to be issued/approved.
    - [ ] Set up a Namecheap domain redirect (301, URL Redirect record)
      from `vashudhaivnidam.org` → `vasudhaivnidam.org` so old
      links/typos still resolve, once the new domain is confirmed live.
    Note: GitHub Pages only serves one canonical custom domain at a time
    (set via the repo's `CNAME` file), so the redirect for the old domain
    has to happen at the registrar/DNS level (Namecheap), not in this
    repo.

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
