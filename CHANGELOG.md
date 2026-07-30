# Changelog

All notable changes to this project are documented here.

## [Unreleased]

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
- Header brand subtitle ("Vashudhaiv Nidam Foundation · Haridwar") was
  wrapping mid-word; now keeps "Vashudhaiv Nidam Foundation" intact and lets
  "· Haridwar" drop to its own line instead of crowding the Home nav link.
- Contact section copy referenced "Har Ki Pauri" instead of the actual
  Arya Samaj Mandir / BHEL Ranipur address; corrected.

### Known issues / carried-forward notes
- GitHub's "Enforce HTTPS" toggle (`https_enforced`) is still `false` as of
  this writing, even though the certificate is approved and HTTPS works
  fine when accessed directly — no action needed on our end, just waiting
  on GitHub.
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
