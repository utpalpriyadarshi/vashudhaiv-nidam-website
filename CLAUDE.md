# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page bilingual (Hindi-primary/English-secondary) website for वसुधैव नीडम् फाउंडेशन
(Vashudhaiv Nidam Foundation), Haridwar. Static site: everything lives in `index.html` at
the repo root, plus a handful of image/PDF assets alongside it. No build step, no
frameworks, no package manager — plain HTML/CSS/JS in one file. There is no test suite
and no lint/build/run command; editing is done directly in `index.html` and previewed by
opening it in a browser.

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
- Several `[Placeholder]` markers remain in `index.html` for registration numbers,
  address, phone, email, real testimonials, and gallery photos — don't remove these
  markers without replacement content.
- The donation/contact forms are placeholder-only (no backend wired up).
- The "Ongoing Social Activities" list in the Objectives section was reconstructed from
  a legacy-font PDF (`uddeshya.pdf`) that didn't extract cleanly — treat it as
  provisional and verify against the source PDF if asked to correct it.
- Hindi copy throughout was AI-drafted and not yet reviewed by a native/fluent speaker.

## Deployment

No CI/build pipeline. The intended deployment path is GitHub Pages (chosen over Netlify
after a Netlify config-parsing failure): enable Pages via `gh api` on the repo, serving
from `main` branch root (`/`), then point a custom domain via a root-level `CNAME` file
plus GitHub Pages' standard A/CNAME DNS records. Once Pages is enabled, every push to
`main` deploys directly — no build step in between.
