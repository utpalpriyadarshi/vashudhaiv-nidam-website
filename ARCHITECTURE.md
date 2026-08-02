# Architecture

## Overview

The main site is a single static HTML file (`index.html`) with an inline
`<style>` block, inline SVG graphics, and a small inline `<script>` at the
end of the body. There are no external JS dependencies, no build tooling,
and no server-side component — it is served as-is by GitHub Pages.

Four standalone legal pages (`privacy.html`, `terms.html`,
`refund-policy.html`, `tax-exemption.html`) live alongside it — see
"Legal pages" below.

## Styling

All theme colors are defined once as CSS custom properties in `:root` near
the top of the file, then referenced throughout the stylesheet:

| Variable | Role |
|---|---|
| `--teal-deep`, `--teal-mid` | Primary dark accent tones |
| `--marigold` | Warm accent (highlights, CTAs) |
| `--maroon` | Secondary accent |
| `--stone`, `--stone-dark` | Background/surface tones |
| `--ink` | Body text |
| `--brass` | Decorative/border accent |
| `--paper` | Light background/text-on-dark |
| `--ganga` | Cool accent (river motif) |

Change the palette by editing these variables rather than hardcoding hex
values in individual rules.

## Page structure

The body is a sequence of `<section>` elements, each with a semantic class
and often an `id` used as a nav-anchor target:

- `.hero#home` — landing/hero section
- `.founder` — founder profile
- `.stats` — animated counters
- `#about` — about the foundation (includes an inline SVG river graphic)
- `.objectives#objectives` — mission objectives, including the "Ongoing
  Social Activities" list sourced from `uddeshya.pdf`
- `.programs#programs` — programs offered
- `.heritage#heritage` — heritage/cultural content
- `#stories` — testimonials/stories
- `.involve#involve` — how to get involved
- `#gallery` — photo gallery
- `.transparency` — transparency/accountability info
- `.contact#contact` — contact form and donation info

## Bilingual content convention

Hindi is the primary language; English appears as an inline secondary
translation using two dedicated classes. This pattern is used throughout
the file and should be preserved when adding or editing copy:

```html
<p class="hi">हिंदी टेक्स्ट यहाँ...<span class="en-line">English translation here...</span></p>
```

Form labels and small inline glosses use `class="en-mini"` instead of
`en-line` (see the contact form fields around line 720).

## Inline script

A single `<script>` block near the end of the body (~line 762) handles all
client-side behavior:

- **Mobile nav toggle** — `#navToggle` toggles an `open` class on
  `#navLinks`; clicking any nav link closes it again.
- **Scroll reveal** — an `IntersectionObserver` adds a `visible` class to
  `.reveal` elements as they enter the viewport (threshold 0.15).
- **Animated stat counters** — a separate `IntersectionObserver` animates
  `.stat-num` elements from 0 to their `data-count` value over 1.4s when
  they become 50% visible, formatting with `toLocaleString('en-IN')`.

## Legal pages

`privacy.html`, `terms.html`, `refund-policy.html`, and `tax-exemption.html`
are standalone bilingual HTML pages, each duplicating a slimmed-down subset
of `index.html`'s CSS (fonts, color variables, a simple header with a
"Back to Home" link, and a matching footer) rather than sharing a linked
stylesheet — kept deliberately simple/self-contained rather than factoring
out shared CSS, to avoid touching the live `index.html` styling when
editing legal copy. They're linked from `index.html`'s footer "Legal"
column.

## Team page

`team.html` follows the same standalone/self-contained pattern as the legal
pages above (its own inline CSS, sticky header with a "Back to Home" link,
matching footer) rather than being embedded in `index.html`. It lists the
foundation's office bearers grouped by role — patrons, president, vice
president, secretary/joint secretary, treasurer/joint treasurer,
spokesperson, media in-charges, and advisors — each with an initial-letter
photo placeholder pending real photos. It's linked from `index.html`'s nav
and footer "Explore" column. An embedded on-page version was tried first but
didn't read well inline on the homepage, so it was moved out.

Content was adapted from `Disclaimer_information.docx` (80G tax note,
Privacy Policy, Terms & Conditions, all originally bundled in one doc) and
`Relative-Definition.docx` (Section 13 "relative"/"specified person"
definitions, used in `tax-exemption.html` to support the >₹50,000 donor
disclosure requirement). The source `.docx` had been copied from a
different NGO's template and referenced that NGO's Delhi office/domain —
all four pages now use this foundation's actual Haridwar registered
address and Haridwar/Uttarakhand jurisdiction instead.

## Assets

- `index.html` — the main single-page site
- `team.html` — office bearers page
- `reference-material/` — source/reference material only, gitignored and
  not part of the deployed site (nothing in this folder is referenced by
  any `<img>`/`url()` in the HTML — check before assuming otherwise):
  - `maharshi-dayanand-saraswati.jpg`, `om.jpeg` — not currently used by
    any page; kept in case they're wanted for the Founder section later
  - `uddeshya.pdf` — source document for the objectives/activities content
  - `Disclaimer_information.docx`, `Relative-Definition.docx` — source
    documents the four legal pages were adapted from (their content now
    lives in the site, not the files themselves)
  - `voucher.jpeg`, `DNS.jpeg` — reference screenshots (registration
    voucher, domain/DNS setup)
  - `12A.jpeg`, `80G.jpeg`, `bank_details.jpeg`, `mail_id.jpeg`,
    `officials.jpeg`, `upi_id.jpeg` — scans used to source the
    registration numbers, bank/UPI details, and contact info published
    on the site; kept local-only since they contain sensitive info

The favicon is embedded directly as a `data:image/jpeg;base64,...` URI on
line 7 of `index.html` — this makes that one line extremely long; this is
expected and not a bug.

## Deployment

- **Host:** GitHub Pages, serving the `main` branch from the repo root (`/`)
- **Repo:** `utpalpriyadarshi/vashudhaiv-nidam-website` (public — required
  for Pages on GitHub's free plan)
- **Custom domain:** `vashudhaivnidam.org`, configured via the root-level
  `CNAME` file in this repo
- **DNS (Namecheap, Advanced DNS tab):**
  - `A` records for `@` → GitHub Pages IPs
    (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`)
  - `CNAME` record for `www` → `utpalpriyadarshi.github.io`
- **HTTPS:** fully enforced (`https_enforced: true`) with a GitHub-issued
  Let's Encrypt certificate — the site force-redirects to
  `https://vashudhaivnidam.org`

There is no CI pipeline — every push to `main` is live within moments.
