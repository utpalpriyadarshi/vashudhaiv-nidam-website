# Vashudhaiv Nidam Foundation Website — Handoff Summary for Claude Code

## Project
Single-page bilingual (Hindi-primary/English-secondary) website for
वसुधैव नीडम् फाउंडेशन (Vashudhaiv Nidam Foundation), Haridwar. Static site:
`index.html` at repo root, plus logo/image assets. No build step, no
frameworks — plain HTML/CSS/JS.

## Status so far
- ✅ GitHub repository created, `index.html` pushed
- ✅ Netlify connected via Git import — but deploy failed with:
  `Failed during stage 'Reading and parsing configuration files'`
  (likely a Base directory / Publish directory mismatch, or a stray
  `netlify.toml` — never fully resolved)
- ➡️ **Decision made: moving to GitHub Pages instead of Netlify**, since it
  has no build-configuration layer and avoids this class of error entirely
- Domain: already purchased, not yet pointed at anything live

## What's needed now — GitHub Pages setup (CLI-driven)

### 1. Check prerequisites
```
gh --version
gh auth status
```
Install `gh` (GitHub CLI) if missing; run `gh auth login` if not authenticated.

### 2. Enable GitHub Pages
```
gh api --method POST /repos/{owner}/{repo}/pages -f "source[branch]=main" -f "source[path]=/"
```
Replace `{owner}` and `{repo}` with the actual GitHub username and repo name.

Verify:
```
gh api /repos/{owner}/{repo}/pages
```
Should return JSON with `"html_url"` like `https://<owner>.github.io/<repo>/`.

### 3. Add custom domain via CNAME file (no web UI needed)
```
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain for GitHub Pages"
git push
```

### 4. DNS records to add at the domain registrar
**A records** (root domain):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
**CNAME record** (for `www`):
```
<github-username>.github.io
```

### 5. Confirm HTTPS is enforced (after DNS propagates)
```
gh api /repos/{owner}/{repo}/pages
```
Look for `"https_enforced": true`.

## Ongoing workflow after setup
Every `git push` to `main` auto-deploys to the live domain. No dashboards,
no drag-and-drop, no separate hosting UI to manage — just commit and push.

## Bilingual (Hindi/English) editing in Claude Code
Claude Code handles Hindi/Devanagari text the same as this chat interface —
it's a language capability, not an interface feature. It will follow the
existing bilingual pattern used throughout `index.html`:
```html
<p class="hi">हिंदी टेक्स्ट यहाँ...<span class="en-line">English translation here...</span></p>
```
Just ensure files stay saved as **UTF-8** (already the case for the current
file) so Hindi text doesn't get corrupted on save.

## Known content notes (carry forward, not urgent blockers)
- Hindi copy throughout was AI-drafted and not yet reviewed by a native/
  fluent speaker — worth a pass before public launch
- The "Ongoing Social Activities" list in the Objectives section was
  reconstructed from a legacy-font PDF that didn't extract cleanly — verify
  against the original document
- Donation/contact forms are placeholder-only — no backend connected yet
  (would need a form service or custom backend before accepting real
  submissions)
- Several `[Placeholder]` markers remain in `index.html` for registration
  numbers, address, phone, email, real testimonials, and gallery photos
