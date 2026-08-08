# Changelog

All notable changes to this project are documented here.

## [Unreleased]

### Added
- New "WhatsApp Community" section (`.community#whatsapp`) in `index.html`,
  linking to the foundation's WhatsApp Community invite link. First of the
  4-step Phase 1 rollout in `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md` (Step 1
  of 4).
- New `resources.html` learning-materials library page (Sanskrit, Vedas,
  Upanishads, Audio, Class Recordings), linked from `index.html`'s footer.
  Ships with `[Placeholder]`/"Coming Soon" entries per category since no
  real PDFs/audio exist yet. Step 2 of 4 of the Phase 1 rollout in
  `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md`.
- New "Weekly Class Schedule" section (`.schedule#schedule`) in
  `index.html`, with a live countdown to the next session and a table
  rendered from `data/schedule.json` by the new `js/schedule.js` and
  `js/countdown.js`. Ships with dummy sessions starting 2026-09-01 and a
  "Coming Soon" status in place of a real Join link on every entry (all
  `link` values are `"#"`) — replace with real topics/teachers/times and
  links once available. Two hardcoded fallback rows stay in `index.html`
  for the `file://` local-preview case (`fetch()` can't load local JSON
  there). Linked from `index.html`'s footer, not the top nav. Step 3 of 4
  of the Phase 1 rollout in `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md`.
- New "Live Now" section (`.live-now#live`) in `index.html` — four cards
  (YouTube, Facebook, Instagram, Google Meet), each with a brand-colored
  platform icon and a "Coming Soon" status, since no real channel/page/
  profile/meeting URLs exist yet. Once available, per the plan: swap the
  YouTube/Facebook cards for their self-updating live embeds, and the
  Instagram/Meet cards for link-out buttons. Linked from `index.html`'s
  footer, not the top nav. Step 4 of 4 (final step) of the Phase 1 rollout
  in `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md`.

### Fixed
- Header brand subtitle in `index.html` had a stray "·" separator before
  "Haridwar" on its English line; removed so it reads "Vasudhaiv Nidam
  Foundation Haridwar".
- Sanskrit signature line ("Krinvanto Vishwam Aryam") in `index.html` had a
  space between "Vishwam" and "Aryam" in both the Hindi/Sanskrit and English
  text; removed to match the intended rendering.
- Top nav bar was overflowing at common desktop widths (~1366px) after the
  WhatsApp/Resources additions pushed it to 12 items, cutting off the
  Donate button and logo. Reverted the nav bar to its original 10 items —
  WhatsApp Community and Resources are reachable via their own on-page
  section/button and the footer, not the top nav.

### Changed
- Reorganized the repo root: moved all source/reference material (scans,
  source `.docx`/`.pdf`, unused images) into a new `reference-material/`
  folder, now gitignored since some files contain sensitive info (bank
  details, ID scans). Deployed site pages (`index.html`, the legal pages,
  `team.html`, `CNAME`) and project docs stay at the root, unaffected.
  Removed two stale duplicate `claude-code-handoff-summary*.md` files from
  early setup, superseded by `CLAUDE.md`/`ARCHITECTURE.md`/`CHANGELOG.md`.

### Added
- English (`en-line`) translations for the Objectives list and the
  "Ongoing Social Activities" list in the Objectives section of
  `index.html`, which previously had Hindi text only.
- English (`en-mini`) translations for the footer's Explore/Involved/
  Legal link columns and the footer-bottom copyright/credit lines in
  `index.html`, which previously had Hindi text only.
- English translations for the remaining Hindi-only spots found in a
  full-site sweep: the "About" section's pillar detail lines and the
  Contact section's Head Office address/registration number in
  `index.html`, and every row of the "Relative" definition table on
  `tax-exemption.html` (previously only the header row and first data
  row were translated).

### Fixed
- Corrected the English spelling of the organization's name from
  "Vashudhaiv Nidam" to "Vasudhaiv Nidam" (an extra "h" had been
  introduced by mistake) across `index.html`, the four legal pages,
  and project docs. The domain `vashudhaivnidam.org` keeps its
  existing spelling as-is since DNS/GitHub Pages are already
  configured with it — only display text was corrected.

### Added
- Confirmed 12A and 80G provisional registration numbers (from the
  Income Tax Department's Form 10AC orders) and organization PAN, now
  published on `tax-exemption.html` and reflected in the Transparency
  section of `index.html` (previously a "shortly" placeholder).
- Bank account details (ICICI Bank, Hardwar-Jwalapur branch, A/c No.,
  IFSC) and UPI ID for donations, added to the Contact section of
  `index.html`, along with a fraud-prevention note advising donors to
  confirm they're on `vashudhaivnidam.org` and to verify by phone if
  in doubt (no QR code embedded, since a static QR image is as
  spoofable as any other detail on a cloned copy of the site).
- Confirmed contact email (`vasudhaivnidam@gmail.com`), replacing the
  `[Placeholder]` in the Contact section of `index.html`.
- Second contact email (`yogendralathakuri@gmail.com`) and phone
  number (+91 8130114807) added to the Contact section.
- New `team.html` page listing the foundation's office bearers by
  role — patrons, president, vice president, secretary/joint
  secretary, treasurer/joint treasurer, spokesperson, media
  in-charges, and advisors — linked from `index.html`'s nav and footer.
  Each entry shows name + role with an initial-letter photo
  placeholder; individual phone numbers are intentionally omitted
  pending each person's consent to publish one. (First tried as an
  embedded `#team` section on the homepage; moved to its own page,
  matching the legal pages' pattern, since it didn't read well inline.
  The "Estate Officer" role was also dropped as not needed.) President
  entry kept as "President" (अध्यक्ष) only, without "& Founder" —
  Shri Yogendra Medhavi also being the founder is noted elsewhere, not
  in this title.
- Contact form now submits via `mailto:` (opens the visitor's email
  client with name/email/reason/message pre-filled), replacing the
  placeholder JS alert. Added a "Message on WhatsApp" button as an
  alternative, linking to wa.me/916397447509 with a pre-filled Hindi
  greeting — no third-party form service/account needed for either.
- Added `PENDING_WORK.md` to track remaining placeholders/decisions
  (testimonials, gallery photos, team photos, heritage blog snippets,
  placeholder-design banner, footer copyright note) across sessions.

### Fixed
- English translations across the site (`.en-sub`, `.en-line`, `.en-mini`)
  were rendered at ~60% opacity, smaller size, and (for `.en-line`) italic,
  making them look faded/secondary next to the bold Hindi headings. Raised
  opacity to 0.85, increased font-weight and size, and dropped the italic,
  while keeping Hindi as the visually primary language. Also removed 47
  inline style overrides that had been re-applying the old lower
  opacity/italic per-instance.

### Added
- `.gitignore` for Office lock files (`~$*`) and OS cruft.
- `README.md`, `ARCHITECTURE.md`, `CHANGELOG.md` project documentation.
- Bilingual legal pages: `privacy.html`, `terms.html`, `refund-policy.html`,
  `tax-exemption.html`, adapted from `Disclaimer_information.docx` and
  `Relative-Definition.docx`, corrected to the foundation's actual Haridwar
  address/jurisdiction (source docs referenced a different NGO's Delhi
  office).
- Footer "Legal" links wired up to the four new legal pages.
- "Website created & maintained by Utpal Priyadarshi" credit line in the
  footer of every page.
- Confirmed registration no., address, and phone numbers (from the
  registration voucher) filled in throughout `index.html` and the legal
  pages.

### Fixed
- Header logos (left "flame" mark, right official emblem) were being
  cropped by a circular CSS mask that clipped into their artwork; removed
  the mask so both display fully. Also doubled both logos in size.
- Nav menu items were vertically misaligned because one label
  ("हमारे बारे में"/About) wrapped to two lines while others stayed on one;
  forced single-line nav labels so all items align on the same baseline.
- Header brand subtitle ("Vasudhaiv Nidam Foundation · Haridwar") was
  wrapping mid-word; now keeps "Vasudhaiv Nidam Foundation" intact and lets
  "· Haridwar" drop to its own line instead of crowding the Home nav link.
- Contact section copy referenced "Har Ki Pauri" instead of the actual
  Arya Samaj Mandir / BHEL Ranipur address; corrected.

### Fixed
- GitHub's "Enforce HTTPS" toggle (`https_enforced`) is now `true` — the
  site force-redirects to `https://vashudhaivnidam.org`.

### Known issues / carried-forward notes
- Donate section is still a placeholder; going live via UPI ID/bank
  transfer details pending receipt from the organization.
- Email address and specific 12A/80G registration numbers are still
  `[Placeholder]` — not yet provided.

## 2026-07-30

### Added
- Custom domain `vashudhaivnidam.org` configured via root-level `CNAME` file.
- GitHub Pages enabled, serving from `main` branch root; repo switched to
  public (required for Pages on GitHub's free plan).
- `CLAUDE.md` guidance for AI-assisted development in this repo.
- Git repository initialized locally and merged with the existing
  GitHub-hosted `index.html` (uploaded via web UI); `origin` set to
  `https://github.com/utpalpriyadarshi/vashudhaiv-nidam-website.git`.

### Known issues / carried-forward notes
- Hindi copy throughout was AI-drafted and not yet reviewed by a native/
  fluent speaker.
- "Ongoing Social Activities" list in the Objectives section was
  reconstructed from a legacy-font PDF (`uddeshya.pdf`) that didn't extract
  cleanly — needs verification against the source document.
- Donation/contact forms are placeholder-only; no backend connected.
- Several `[Placeholder]` markers remain in `index.html` for registration
  numbers, address, phone, email, real testimonials, and gallery photos.

## 2026-07-25

### Added
- Initial single-page bilingual (Hindi/English) site (`index.html`) covering
  hero, founder, stats, about, objectives, programs, heritage, stories,
  involvement, gallery, transparency, and contact sections.
