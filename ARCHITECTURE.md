# Architecture

## Overview

The site is a single static HTML file (`index.html`) with an inline
`<style>` block, inline SVG graphics, and a small inline `<script>` at the
end of the body. There are no external JS dependencies, no build tooling,
and no server-side component — it is served as-is by GitHub Pages.

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

## Assets

- `index.html` — the entire site
- `maharshi-dayanand-saraswati.jpg`, `om.jpeg` — images referenced by the page
- `uddeshya.pdf` — source document for the objectives/activities content
- `Disclaimer_information.docx`, `Relative-Definition.docx` — supporting
  reference documents (not part of the deployed site)
- `voucher.jpeg`, `DNS.jpeg` — reference screenshots (domain purchase, etc.),
  not part of the deployed site

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
- **HTTPS:** enforced automatically by GitHub once the certificate is
  provisioned after DNS verification

There is no CI pipeline — every push to `main` is live within moments.
