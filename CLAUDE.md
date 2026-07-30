# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (Hindi-primary/English-secondary) website for वसुधैव नीडम् फाउंडेशन
(Vashudhaiv Nidam Foundation), Haridwar. Static site: `index.html` is the main
single-page site at the repo root, plus four standalone legal pages (`privacy.html`,
`terms.html`, `refund-policy.html`, `tax-exemption.html`) and a handful of image/PDF
assets. No build step, no frameworks, no package manager — plain HTML/CSS/JS. There is
no test suite and no lint/build/run command; editing is done directly in the HTML files
and previewed by opening them in a browser.

**Live at https://vashudhaivnidam.org (GitHub Pages, custom domain).**

## Branching workflow — read before editing

The site is live and already reviewed/approved by the organization's users, and `main`
auto-deploys on every push with no CI/staging step in between. **Never commit or push
directly to `main`.** For every change: create a feature branch (e.g.
`git checkout -b docs/whatever`), commit there, push it, and only merge to `main` after
the user has reviewed the change (they typically open the file locally in a browser
first). This applies to docs and README changes too, not just `index.html`.

**Keep `README.md`, `ARCHITECTURE.md`, and `CHANGELOG.md` updated as part of every
change**, not as a separate cleanup pass afterward — when a change adds a page, fixes a
bug, or updates content/config, update the relevant doc(s) in the same branch/commit.
`CHANGELOG.md` gets a dated entry for anything user-visible; `README.md`/`ARCHITECTURE.md`
get updated when structure, pages, or conventions change.

## Architecture of `index.html`

The file is one long HTML document with an inline `<style>` block, inline SVG, and a
small inline `<script>` at the end (~line 762). There are no external JS dependencies.

- **CSS custom properties** (`:root`, near the top) define the entire palette/theme —
  e.g. `--teal-deep`, `--teal-mid`, `--marigold`, `--maroon`, `--stone`, `--ink`,
  `--brass`, `--paper`, `--ganga`. Change colors here, not by hardcoding hex values
  in rules.
- **Sections** are laid out top-to-bottom as `<section>` elements with both a semantic
  class and often an `id` used for nav anchors: `.hero#home`, `.founder`, `.stats`,
  `#about`, `.objectives#objectives`, `.programs#programs`, `.heritage#heritage`,
  `#stories`, `.involve#involve`, `#gallery`, `.transparency`, `.contact#contact`.
- **Bilingual content pattern** — this is the most important convention in the file.
  Hindi is primary, English is a secondary inline translation, using two class names:
  ```html
  <p class="hi">हिंदी टेक्स्ट यहाँ...<span class="en-line">English translation here...</span></p>
  ```
  Labels/inputs use `class="en-mini"` for the smaller inline English gloss (see the
  contact form fields). When adding or editing copy, preserve this `hi` / `en-line` /
  `en-mini` structure rather than inventing new class names.
- **Inline `<script>`** (end of body) handles only: mobile nav toggle (`#navToggle` /
  `#navLinks`), scroll-reveal via `IntersectionObserver` on `.reveal` elements, and
  animated stat counters via `IntersectionObserver` on `.stat-num` elements reading a
  `data-count` attribute.
- The favicon is an inline `data:image/jpeg;base64,...` URI on line 7 — it's a single
  very long line; don't be alarmed by tools reporting huge line lengths for the file,
  and avoid dumping the whole file through tools with small per-call size limits (read
  it in ranges instead).

## Editing conventions

- Keep the file saved as **UTF-8** — Hindi/Devanagari text will corrupt on save
  otherwise.
- Writing or editing Hindi/English bilingual copy is a normal part of working in this
  file; follow the `hi` / `en-line` pattern above rather than treating Hindi as an edge
  case.
- Registration no., address, and phone are confirmed and filled in throughout
  `index.html` and the legal pages. Email and the specific 12A/80G registration numbers
  remain `[Placeholder]` markers — don't remove these without replacement content.
- Several `[Placeholder]` markers also remain in `index.html` for real testimonials and
  gallery photos.
- The donation/contact forms are placeholder-only (no backend wired up). Donations are
  planned to go live via UPI ID/bank transfer details (no payment gateway) once received
  from the organization.
- The four legal pages (`privacy.html`, `terms.html`, `refund-policy.html`,
  `tax-exemption.html`) were adapted from `Disclaimer_information.docx` and
  `Relative-Definition.docx`. Those source docs had been copied from a different NGO's
  template (Bal Raksha Bharat) and referenced the wrong org's Delhi address/jurisdiction —
  already corrected to Haridwar in the live pages, but keep this in mind if re-deriving
  content from those source files again.
- The "Ongoing Social Activities" list in the Objectives section was reconstructed from
  a legacy-font PDF (`uddeshya.pdf`) that didn't extract cleanly — treat it as
  provisional and verify against the source PDF if asked to correct it.
- Hindi copy throughout was AI-drafted and not yet reviewed by a native/fluent speaker.

## Deployment

No CI/build pipeline. Deployed via GitHub Pages (chosen over Netlify after a Netlify
config-parsing failure), serving from `main` branch root (`/`), with the custom domain
`vashudhaivnidam.org` configured via a root-level `CNAME` file plus GitHub Pages' standard
A/CNAME DNS records (Namecheap). Every push to `main` deploys directly — no build step in
between. HTTPS is fully enforced (`https_enforced: true`) — the site force-redirects to
`https://vashudhaivnidam.org`; verify via
`gh api repos/utpalpriyadarshi/vashudhaiv-nidam-website/pages` if ever in doubt.
