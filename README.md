# वसुधैव नीडम् फाउंडेशन — Vashudhaiv Nidam Foundation

Official website for the Vashudhaiv Nidam Foundation, Haridwar — a bilingual
(Hindi-primary, English-secondary) single-page site covering the foundation's
mission, founder, objectives, programs, heritage, stories, and contact/donation
information.

**Live site:** https://vashudhaivnidam.org

## Tech stack

Plain HTML/CSS/JS — no build step, no framework, no package manager. The
entire site is `index.html`, with a handful of image/PDF assets alongside it.

## Local development

There's nothing to install or build. Open `index.html` directly in a browser,
or serve the directory with any static file server, e.g.:

```
npx serve .
```

## Deployment

Hosted on GitHub Pages, serving from the `main` branch root. Every push to
`main` deploys automatically — no CI/build pipeline in between. The custom
domain is configured via the root-level `CNAME` file plus DNS records at the
registrar (Namecheap); see `ARCHITECTURE.md` for details.

## Content notes

- Hindi copy throughout was AI-drafted and has not yet been reviewed by a
  native/fluent speaker.
- The "Ongoing Social Activities" list in the Objectives section was
  reconstructed from a legacy-font PDF (`uddeshya.pdf`) that didn't extract
  cleanly — verify against the original document if in doubt.
- Donation/contact forms are placeholder-only — no backend connected yet.
- Several `[Placeholder]` markers remain in `index.html` for registration
  numbers, address, phone, email, real testimonials, and gallery photos.

## Contributing to copy

When editing bilingual content, follow the existing pattern — see
`ARCHITECTURE.md` for the `hi` / `en-line` / `en-mini` class convention.
