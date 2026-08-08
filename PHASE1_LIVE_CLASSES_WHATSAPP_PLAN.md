# Live Classes & WhatsApp Integration — Plan

Planning doc for surfacing live/recorded classes (Facebook, YouTube, Instagram,
Google Meet), WhatsApp community links, and shared learning materials on the
website. Captured here so the reasoning and decisions aren't lost between
sessions. Update this file (or move it to "Done"/delete) as phases ship —
same convention as `PENDING_WORK.md`.

## Context / constraint

The site is currently static HTML/CSS/JS with no backend, no build step, no
database (see `CLAUDE.md`). Any plan has to either fit inside that constraint
(Phase 1) or explicitly justify adding a backend (Phase 2) — avoid drifting
into a backend "by accident."

## Phase 1 — Static site only (no backend)

Target: maximum value, minimum ongoing maintenance, ships as a normal feature
branch on the existing site.

**Phase 1 is not built in one shot.** It ships as 4 separate steps, each its
own feature branch, reviewed and merged independently before the next one
starts. This table is the source of truth for status — update it as each
step ships so nothing gets lost between sessions.

| Step | Section | Branch (suggested name) | Depends on | Status |
|---|---|---|---|---|
| 1 | WhatsApp Community (`.community#whatsapp` in `index.html`) | `feature/whatsapp-community` | WhatsApp Community invite link | **Done — merged to main** |
| 2 | Resources page (`resources.html`) | `feature/resources-page` | None — can start with `[Placeholder]` content | **Done — merged to main** |
| 3 | Weekly Schedule + countdown (`.schedule#schedule` in `index.html`, `data/schedule.json`, `js/schedule.js`, `js/countdown.js`) | `feature/class-schedule` | Real weekly schedule data | **Built with dummy data — pending review/merge** |
| 4 | Live Now (`.live-now#live` in `index.html`) | `feature/live-now` | YouTube/Facebook/Instagram/Meet links | **Not started** |

Why this order: Step 1 needs the least missing information (a WhatsApp link
may already exist) and Step 2 can start today with placeholders like other
unfilled content on this site, so both are unblocked immediately. Steps 3
and 4 wait on real schedule data and platform URLs respectively — see
"Content needed before building" below for the exact list per step.

Each step, once picked, follows the same cycle: create its branch → build →
verify locally (per the local-preview caveat below) → push → user reviews →
merge to `main` → mark "Done" in the table above and in `PENDING_WORK.md` if
relevant.

### Structural decision

- **New sections inside `index.html`** (not new standalone pages) for: Live
  Now, Weekly Schedule, WhatsApp Community. These are homepage-relevant and
  should appear in the normal scroll/nav, matching the existing
  `.programs#programs`-style section pattern.
- **New standalone `resources.html`** for the learning-materials library.
  This mirrors the site's existing pattern of standalone pages (`privacy.html`,
  `terms.html`, `refund-policy.html`, `tax-exemption.html`, `team.html`) —
  precedented, not risky. A materials library will grow long and doesn't
  belong in the homepage scroll.
- No separate `live-classes.html` or `schedule.html` — folding them into
  `index.html` avoids duplicating nav/header/footer across more files than
  necessary.
- No `css/style.css` — styles stay inline per file, consistent with current
  convention (no build step).

### File structure

```
index.html                  (existing — gains 3 new sections)
resources.html              (new — standalone page, mirrors legal-page pattern)
data/
  schedule.json             (new)
js/
  countdown.js               (new)
  schedule.js                (new — fetches schedule.json, renders table)
assets/
  pdf/sanskrit/, vedas/, upanishads/   (new subfolders)
  audio/
  qr/                        (WhatsApp invite QR image)
```

### `data/schedule.json` schema

```json
[
  {
    "topic_hi": "संस्कृत मूल पाठ",
    "topic_en": "Sanskrit Basics",
    "teacher": "Acharya A",
    "datetime": "2026-08-10T18:00:00+05:30",
    "platform": "youtube",
    "link": "https://youtube.com/..."
  }
]
```

`platform` enum: `youtube` | `facebook` | `meet` | `instagram` — maps to
icon/label and the correct Join/Watch button styling in `schedule.js`.

**Timezone**: store `datetime` with an explicit `+05:30` (IST) offset. The
foundation expects an international audience, so the schedule table and
countdown must render both the canonical IST time and the visitor's
converted local time — computed off the offset-aware timestamp so it's
correct regardless of viewer timezone.

### New `index.html` sections

**Step 4 — `.live-now#live` — "Live Now"**
- YouTube channel Live-tab `<iframe>` embed (self-updating live/offline
  state, no API key needed)
- Facebook Page Plugin embed (self-updating)
- "Instagram पर देखें / Watch on Instagram" button → link-out (Instagram
  Live isn't embeddable off-platform)
- "Google Meet जॉइन करें / Join Meet" button → link-out
- All labels follow the existing bilingual `hi` / `en-line` pattern

**No custom "is anyone live right now" API logic in Phase 1** — YouTube's
Live-tab embed and Facebook's Page Plugin already self-update without any
code on our side. A true cross-platform "🔴 LIVE" badge driven by polling
each platform's API belongs in Phase 2 (needs a key + quota + a place to run
the polling).

**Step 3 — `.schedule#schedule` — "Weekly Class Schedule"**
- `<table>` skeleton in HTML; `schedule.js` fetches `data/schedule.json` and
  renders rows client-side (topic hi/en, teacher, day/time in IST + visitor
  local time, platform icon, Join/Watch button)
- Small hardcoded 1–2 row fallback stays in the HTML in case JS/fetch fails
  — also covers the local-preview issue below
- Countdown ("X दिन Y घंटे Z मिनट में शुरू / starts in X days Y hours Z
  minutes") computed by `countdown.js` from the next upcoming entry

**Step 1 — `.community#whatsapp` — "WhatsApp Community"**
- "समुदाय जॉइन करें / Join Community" button (`wa.me` or Community invite
  link)
- Static QR code image (`assets/qr/whatsapp-community.png`)
- Short description + link to a separate announcements channel if one exists

### Step 2 — New `resources.html`

- Same `<head>`/nav/footer boilerplate pattern as the legal pages
- Categorized sections (Sanskrit / Vedas / Upanishads / Audio / Recordings),
  each a list of download links into `assets/pdf/...`, `assets/audio/...`
- Bilingual headers/labels per convention
- Linked from `index.html` nav as a new item

### Local preview caveat

`fetch('data/schedule.json')` fails under `file://` (the current
double-click-to-open preview workflow) due to browser CORS restrictions —
works fine once deployed to GitHub Pages (`https://`). Mitigations:
1. Document in `README.md`: preview via `npx serve .` or
   `python -m http.server` when testing the schedule/live sections instead
   of double-clicking `index.html`.
2. Keep the inline fallback table (above) so the section still shows
   something reasonable without a local server.

### Docs to update in the same branch (per `CLAUDE.md`)

- `README.md` — new pages/sections, new `data/`/`js/` folders, local-preview
  note
- `ARCHITECTURE.md` — the new sections, the JSON-driven schedule pattern,
  and a note that Phase 1.5/2 (below) is the planned next step
- `CHANGELOG.md` — dated entry once shipped

### Content needed before building (avoid inventing real-looking placeholders)

- **Step 1**: WhatsApp Community invite link (+ any per-subject group links)
- **Step 2**: none required to start — build with `[Placeholder]` entries
  like other unfilled content on this site (testimonials, gallery), swap in
  real PDFs/audio later
- **Step 3**: real weekly schedule (topics, teachers, days/times) to seed
  `schedule.json`. Built ahead of this with dummy sessions (starting
  2026-09-01, `link: "#"` on every entry, rendering "Coming Soon" instead
  of a Join button) so the table/countdown mechanism could ship now —
  swap in real data by editing `data/schedule.json` directly, no code
  changes needed.
- **Step 4**: YouTube channel URL/handle, Facebook Page URL, Instagram
  profile URL, Google Meet recurring link(s) (confirm if these differ per
  class)

## Phase 1.5 — Lightweight CMS (optional, before considering a backend)

Goal: stop hand-editing `schedule.json` (and eventually the resources list)
in HTML/JSON directly, without standing up a backend.

- **Google Sheets published as CSV/JSON** (File → Share → Publish to web) —
  genuinely zero-backend: a volunteer edits a spreadsheet, the site's JS
  fetches the published URL. Preferred option.
- Airtable is a viable alternative with a similar publish-and-fetch model.
- **Decap CMS was considered and rejected for this phase** — despite being
  "Git-based," its admin login still needs Netlify Identity + Git Gateway or
  a GitHub OAuth proxy, i.e. a real auth backend to stand up. That defeats
  the point of staying backend-free at this stage.

## Phase 2 — Backend required (only if manual upkeep becomes a bottleneck)

Not planned for now; captured so the reasoning is on record if revisited.

| Feature | Why it needs a backend | Rough shape |
|---|---|---|
| Searchable learning-materials library | Static file lists don't scale/search well past ~30–50 items | Small headless CMS or DB + search index |
| Registration → gated Meet link released 15 min before class | Needs to store registrants and check time server-side | Serverless function + small DB (Airtable/Supabase-scale is likely enough) |
| WhatsApp bot auto-posting approved messages to the site | Needs WhatsApp Business API + a listener writing to a DB | WhatsApp Cloud API webhook → serverless function → DB → static frontend reads via `fetch()` |
| Unified admin portal (schedule/upload/announce from one place) | This *is* the backend — a CMS admin UI | Natural home for schedule, PDFs, announcements, replacing manual edits |
| Push notifications | Needs a notification service + subscriber list | Web Push API + small backend, or just rely on WhatsApp Community broadcasts instead |
| Automated class reminders (email/WhatsApp) | Needs scheduled jobs + a messaging integration | Cron job hitting WhatsApp Business API / email service |

Recommended pattern if Phase 2 is ever justified: keep `index.html` etc. as
the static shell, add a small serverless backend + lightweight DB only for
the dynamic pieces (schedule, registrations, materials index), and have
`fetch()` calls pull that data into the existing static pages — avoids a
full framework rewrite.

## Recommended sequencing

Ship Phase 1 in full first — it covers the large majority of the value at
near-zero cost/risk and requires no new infrastructure. Move to Phase 1.5
only once hand-editing `schedule.json` becomes a real annoyance for whoever
maintains the site. Revisit Phase 2 only if a specific Phase 1.5 limitation
(e.g., registration gating, search) becomes a genuine blocker.
