# वसुधैव नीडम् फाउंडेशन — Vasudhaiv Nidam Foundation

Official website for the Vasudhaiv Nidam Foundation, Haridwar — a bilingual
(Hindi-primary, English-secondary) single-page site covering the foundation's
mission, founder, team, objectives, programs, heritage, stories, and
contact/donation information.

**Live site:** https://vashudhaivnidam.org

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
deployed site.

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

## Pages

- `index.html` — the main single-page site
- `team.html` — office bearers (patrons, president, secretary, treasurer,
  spokesperson, media in-charges, advisors), grouped by role
- `privacy.html` — Privacy Policy
- `terms.html` — Terms & Conditions
- `refund-policy.html` — Donation & Refund Policy
- `tax-exemption.html` — Tax Exemption (80G) info, including the Section 13
  "relative"/"specified person" disclosure rules for donations over ₹50,000

All four legal pages plus `team.html` are linked from `index.html`'s nav
and/or footer, are bilingual (Hindi/English), and share a lightweight common
look with a "Back to Home" link — see `ARCHITECTURE.md` for how they're built.

## Content notes

- Hindi copy throughout was AI-drafted and has not yet been reviewed by a
  native/fluent speaker.
- The "Ongoing Social Activities" list in the Objectives section was
  reconstructed from a legacy-font PDF (`reference-material/uddeshya.pdf`)
  that didn't extract cleanly — verify against the original document if in
  doubt.
- Donation/contact forms are placeholder-only — no backend connected yet.
  Donations go via UPI ID and bank transfer details (no payment gateway
  involved), published in the Contact section of `index.html`.
- Registration no., address, phone, email, and 12A/80G provisional
  registration numbers (see `tax-exemption.html`) are filled in throughout
  `index.html` and the legal pages.
- Several `[Placeholder]` markers remain in `index.html` for real
  testimonials and gallery photos.
- Live classes / WhatsApp Community integration is being built in phased
  steps — see `PHASE1_LIVE_CLASSES_WHATSAPP_PLAN.md` for the plan and status.
  Step 1 (WhatsApp Community section) has shipped.

## Contributing to copy

When editing bilingual content, follow the existing pattern — see
`ARCHITECTURE.md` for the `hi` / `en-line` / `en-mini` class convention.
