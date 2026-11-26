# वसुधैवनीडम् फाउंडेशन — Vasudhaivnidam Foundation

Official website for the Vasudhaivnidam Foundation, Haridwar — a bilingual
(Hindi-primary, English-secondary) single-page site covering the foundation's
mission, founder, team, objectives, programs, heritage, stories, and
contact/donation information.

**Live site:** https://vasudhaivnidam.org

## Organization details

Source: registration voucher (`reference-material/voucher.jpeg`).

- **Registration No.:** IV/418/2024-II
- **Address:** Arya Samaj Mandir, Sector-1, BHEL Ranipur, Haridwar, Uttarakhand
- **Phone:** +91 6397447509, +91 9634010402, +91 8130114807
- **Email:** vasudhaivnidam@gmail.com, yogendralathakuri@gmail.com

## Tech stack

Plain HTML/CSS/JS — no build step, no framework, no package manager. The
entire site is `index.html`. Source/reference material (scans, source docs)
lives in `reference-material/`, which is gitignored and not part of the
deployed site. Deployed images (donation QR, campaign photos) live in
`assets/`, derived/cropped from files in `reference-material/` and kept
lean (well under 300KB each) before committing.

## Local development

There's nothing to install or build. Open `index.html` directly in a browser,
or serve the directory with any static file server, e.g.:

```
npx serve .
```

**Note:** the Weekly Class Schedule section (`#schedule`) fetches
`data/schedule.json` via `fetch()`, which browsers block under `file://`
(double-clicking `index.html` directly). Use `npx serve .` or
`python -m http.server` to preview that section with real data — opening
the file directly still shows two hardcoded fallback rows so the section
isn't empty. The same applies to the events from `data/events.json`:
under `file://` the "Functions & Events" grid shows only the hardcoded
fallback photos and no upcoming events.

## Deployment

Hosted on GitHub Pages, serving from the `main` branch root. Every push to
`main` deploys automatically — no build pipeline in between. The only
GitHub Action, `compress-photos.yml`, recompresses oversized event photos
(see "Media Cell admin" below). The custom
domain is configured via the root-level `CNAME` file plus DNS records at the
registrar (Namecheap); see `ARCHITECTURE.md` for details.

## Pages

- `index.html` — the main single-page site
- `team.html` — office bearers (patrons, president, secretary, treasurer,
  spokesperson, media in-charges, advisors), grouped by role
- `resources.html` — learning-materials library (Sanskrit, Vedas, Upanishads,
  Audio, Class Recordings), currently `[Placeholder]`/"Coming Soon" entries
  pending real PDFs/audio
- `privacy.html` — Privacy Policy
- `terms.html` — Terms & Conditions
- `refund-policy.html` — Donation & Refund Policy
- `tax-exemption.html` — Tax Exemption (80G) info, including the Section 13
  "relative"/"specified person" disclosure rules for donations over ₹50,000

All four legal pages plus `team.html` and `resources.html` are linked from
`index.html`'s nav and/or footer, are bilingual (Hindi/English), and share a
lightweight common look with a "Back to Home" link — see `ARCHITECTURE.md`
for how they're built.

## Content notes

- Hindi copy throughout was AI-drafted and has not yet been reviewed by a
  native/fluent speaker.
- The "Ongoing Social Activities" list in the Objectives section was
  reconstructed from a legacy-font PDF (`reference-material/uddeshya.pdf`)
  that didn't extract cleanly — verify against the original document if in
  doubt.
- Donation/contact forms are placeholder-only — no backend connected yet.
  Donations go via UPI ID and bank transfer details (no payment gateway
  involved), published in the Contact section of `index.html`, alongside a
  scan-and-pay QR code (`assets/qr/donation-qr.jpg`) verified to decode to
  the same UPI ID.
- Registration no., address, phone, email, and 12A/80G provisional
  registration numbers (see `tax-exemption.html`) are filled in throughout
  `index.html` and the legal pages.
- Several `[Placeholder]` markers remain in `index.html` for real
  testimonials and gallery photos.
- Live classes / WhatsApp Community integration is being built in phased
  steps — see `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md` for the plan and status.
  Step 1 (WhatsApp Community section) has shipped; Step 2 (`resources.html`)
  has shipped with placeholder content; Step 3 (Weekly Schedule + countdown)
  has shipped with dummy data (`data/schedule.json`, sessions starting
  2026-09-01, every `link` set to `"#"`) — swap in the real schedule once
  available; Step 4 (Live Now — YouTube/Facebook/Instagram/Meet) has shipped
  as four static "Coming Soon" placeholder cards, since no real platform
  URLs exist yet — swap in real embeds/links once available (all Meet
  cards/rows will use one single recurring Meet link, once received — see
  `PENDING_WORK.md` item 7). None of the four are in the top nav bar — an
  earlier attempt added WhatsApp/Resources there and pushed it past 10
  items, which overflowed at common desktop widths and cut off the Donate
  button/logo. WhatsApp Community is reachable via its own on-page
  section/button; `resources.html`, the schedule, and Live Now via the
  footer "Explore" column.
- WhatsApp Community section also has a "Subject Groups" card for the
  Upanishad Pathan (daily recitation) group, alongside the general
  community invite link.
- The `#events` section holds the hand-written "Recent campaigns" card
  (Thaila Kranti, 15 August 2026) and, above it, an "Upcoming Events" block
  that appears only while `data/events.json` has an event dated today or
  later (see "Media Cell admin" below).
- A "Functions & Events" section (`#event-photos`) shows real photos from
  the Foundation's functions/felicitation events (`assets/events/`), now
  listed in `data/events.json` (20 at the time of the move) — kept
  separate from `#gallery` since it's VIP/felicitation photography, not
  the classroom/skills photos `#gallery` is captioned for. Some captions
  are still generic pending confirmation of exact event details — see
  `PENDING_WORK.md` item 8. The 12 added on 12 Nov 2026 come from
  `reference-material/121126/` (several events at several places, e.g.
  Roorkee and Mauritius; captions kept generic on venue/date).
  Above those, an `.event-feature` block highlights the latest event (currently
  the 24 Nov 2026 Antarang meeting) with a bilingual write-up, news links and
  its own 9-photo grid (3 columns) (`assets/events/antarang-*.jpg`, from
  `reference-material/Photo241126/`).

## Media Cell admin (Sveltia CMS)

**Status: prototype on the `feature/sveltia-cms` branch, not live.** Decisions
behind it are recorded in `DYNAMIC_CONTENT_OPTIONS.md`.

The Media Cell adds events and photos through a form at `/admin/`
([Sveltia CMS](https://sveltiacms.app), a Decap-compatible git-based CMS)
instead of editing HTML. Saving there commits straight to the repository —
`data/events.json` plus the photo in `assets/events/` — with no pull request
and no owner review. Everything else (HTML, CSS, JS, `admin/config.yml`) is
still changed only on a feature branch and merged after the owner's review.

- `admin/index.html` — loads Sveltia CMS from its CDN
- `admin/config.yml` — backend, photo settings and the event form's fields
- `admin/guide.html` — one-page Hindi/English guide for the Media Cell
  (log in, add an event, upload a photo); opens at `/admin/guide.html`
- `data/events.json` — the events, as one array
- `js/events.js` — renders the events into `index.html` (see
  `ARCHITECTURE.md`, "Events data")
- `.github/workflows/compress-photos.yml` — recompresses any photo over
  200 KB in `assets/events/`

Each event has `title_hi`, `title_en`, `date`, `location_hi`, `location_en`,
`photo`, `caption_hi`, `caption_en`. An event dated today or later shows
under "Upcoming Events"; from the day after, its photo shows under
"Functions & Events".

### One-time setup

1. **Add each editor as a collaborator.** Each Media Cell person creates a
   free GitHub account. In the repository: Settings → Collaborators → Add
   people, with the default (Write) role. They accept the email invitation.
2. **Deploy the login helper** (Sveltia CMS Authenticator, a free Cloudflare
   Worker; full instructions at https://github.com/sveltia/sveltia-cms-auth):
   1. Sign in to Cloudflare (the account already used for the old-domain
      redirect works) and open
      `https://deploy.workers.cloudflare.com/?url=https://github.com/sveltia/sveltia-cms-auth`
      to deploy the Worker. Note its URL, of the form
      `https://sveltia-cms-auth.<SUBDOMAIN>.workers.dev`.
   2. Register a GitHub App (GitHub → Settings → Developer settings → GitHub
      Apps → New GitHub App; the authenticator's README has a pre-filled
      link). Give it a unique name of at most 34 characters, set the
      **Callback URL** to `<WORKER URL>/callback`, leave "Expire user
      authorization tokens" on, and leave Webhook, Device Flow and "Request
      user authorization (OAuth) during installation" off. Repository
      permissions: **Contents: Read and write** (Metadata: Read-only is
      added automatically). "Only on this account" is enough.
   3. Create the app. Copy its **Client ID**, then generate and copy a
      **client secret**.
   4. Install the app (its "Install App" tab) on this repository only.
   5. In Cloudflare, open the Worker → Settings → Variables and Secrets and
      add `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (as a secret), and
      `ALLOWED_DOMAINS` = `vasudhaivnidam.org` plus the trial site's
      hostname from step 3, comma-separated. Save and deploy.
   6. In `admin/config.yml`, uncomment `base_url` and set it to the Worker
      URL.
3. **Host the trial copy.** GitHub Pages only serves `main`, so to try the
   admin before go-live the branch needs its own address. In Cloudflare:
   Workers & Pages → Create → Pages → connect this GitHub repository, set
   the production branch to `feature/sveltia-cms`, leave the build command
   empty and the output directory as `/`. The trial site is then at
   `https://<project>.pages.dev/` and its admin at `/admin/`. While
   `backend.branch` in `admin/config.yml` is `feature/sveltia-cms`,
   everything saved from the admin lands on that branch and shows on the
   trial site only, never on the live site.

Without step 2 the admin still works for the owner through "Sign In Using
Access Token" (a GitHub personal access token), which is enough for a first look
but not suitable for the Media Cell.

### Trying it on a computer

Serve the folder (`npx serve .` or `python -m http.server`) and open
`http://localhost:<port>/admin/index.html` in Chrome or Edge. "Work with
Local Repository" edits the files in this folder directly, with no login and
no commit, so the result can be checked at `http://localhost:<port>/`.

### Go-live checklist

1. In `admin/config.yml` change `backend.branch` to `main`.
2. Make sure `ALLOWED_DOMAINS` on the Worker includes `vasudhaivnidam.org`.
3. Remove any test events from `data/events.json` (and their photos).
4. Merge the branch into `main` after review. The admin is then at
   `https://vasudhaivnidam.org/admin/`.
5. Delete the Cloudflare Pages trial project.

### What the owner still does

Collaborators have write access to the whole repository; the admin simply
does not offer anything except events and photos. GitHub cannot restrict a
collaborator to certain files, so the "code needs review" rule rests on the
editors using only the admin. Every admin save is an ordinary commit, so it
shows in the repository history and can be reverted.

## Contributing to copy

When editing bilingual content, follow the existing pattern — see
`ARCHITECTURE.md` for the `hi` / `en-line` / `en-mini` class convention.
