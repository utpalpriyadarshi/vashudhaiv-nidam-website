# Making the website editable by the Media Cell — options

Status: **for review / decision** (12 Nov 2026). No code has been changed.

## Goal

Let the Media Cell person add and update functions, events and photos
without editing HTML, so the site owner does not have to do every update.

## Constraints

- Site is static (plain HTML/CSS/JS) on GitHub Pages, custom domain
  `vasudhaivnidam.org`, no backend and no build step.
- Content is Hindi-first with an English line (`hi` / `en-line` / `en-mini`).
- Editor is non-technical. Free or near-free is preferred.
- Existing rule: nothing reaches `main` without the owner's review.
- Photos should stay under ~200 KB each.

"Dynamic" here means moving the changing content out of `index.html` into
data files that an editing form updates.

## Options

| Option | How the media person works | Pros | Cons |
|---|---|---|---|
| **A. Decap CMS (git-based admin page)** | Logs in at `/admin`, fills a form (Hindi title, English title, date, photo), publishes | Free. Stays on GitHub Pages. Form UI with photo upload. "Editorial workflow" turns each submission into a pull request, so the owner approves before it goes live | Each editor needs a GitHub account. Needs a small free login helper (e.g. a Cloudflare Worker). No automatic photo resizing |
| **B. Google Sheet as database** | Adds a row (Hindi text, English text, photo link) to a Google Sheet | Easiest for non-technical people. No new logins | Drive images are unreliable to embed, so a free image host is needed. No approval step unless built. Depends on Google's publish-to-web |
| **C. Hosted CMS (Sanity, Contentful)** | Logs in to a polished web dashboard | Best editing experience and image handling | Third-party account and API. Bilingual fields need setup. Free tiers can change |
| **D. WordPress or similar** | Standard WordPress dashboard | Familiar to many | Paid hosting, full rebuild, ongoing security updates. Overkill |

## Recommendation: Option A (Decap CMS)

Costs nothing, keeps the current site, and preserves the review step.

How it would work:

1. Move Functions & Events photos, Upcoming Events (and later Gallery,
   Team) into data files such as `events.json`.
2. The page renders those items with a small script, using the same
   `hi` / `en-mini` markup as today.
3. The Media Cell person adds or edits entries in the admin form; the owner
   approves the resulting pull request.

Caveats:

- Script-rendered content does not show with JavaScript off. Search engines
  handle it. If that matters, a small automatic build step can be added.
- Photo size: add a note in the form, or a GitHub Action that compresses
  images automatically.
- Option B is the fallback if editors cannot manage GitHub accounts.

## Decisions needed

1. How many people will edit, and can they create a GitHub account?
   (If not, prefer Option B.)
2. Which sections should be editable first? Suggested: Functions & Events
   and Upcoming Events, then Gallery and Team.
3. Must the owner approve every change, or may the media person publish
   directly?
4. Go-ahead to prototype Option A on a branch so the admin form can be
   tried before anything goes live?

## Next step if approved

Prototype on a branch: data file + renderer for Functions & Events, Decap
config with bilingual fields, login helper setup notes, and README /
ARCHITECTURE / CHANGELOG updates.
