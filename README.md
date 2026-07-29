# Shorter — Waitlist Landing Page (plain static site)

A single HTML page with two waitlist forms (customers + Founding Barbers)
and a founder-updates feed, in Shorter's black & white brand. Plain HTML/CSS/JS
— no framework, no build step, nothing to install. What you see in this
folder is exactly what gets deployed.

## What's in here

- `index.html` — the whole page
- `assets/style.css` — all styling (strict black/white palette, Poppins for
  headings + Inter for body, loaded from Google Fonts)
- `assets/script.js` — submits both waitlist forms via `fetch` and shows an
  inline success/error message instead of redirecting
- `assets/images/` — the two phone-mockup screens pulled from your Figma
  exports (swap these for final app screenshots any time)
- `CNAME` — the custom domain for GitHub Pages

I opened this file in a real browser (desktop and mobile widths) before
sending it to you, so what you're getting has actually been visually checked
— including fixing a mobile layout bug where the two overlapping phone
mockups covered the hero buttons on narrow screens (now shows a single
phone on mobile).

## Assumptions I made (both a two-minute change if wrong)

1. **Custom domain: `getshorter.app`** — set in the `CNAME` file. See "Domain
   setup" below to change it or drop it entirely.
2. **Form backend: [Formspree](https://formspree.io)** — free, no server
   needed, works with a static site. Both forms point at a placeholder
   endpoint right now (`REPLACE_WITH_YOUR_FORM_ID`) — see "Wiring up the
   forms" below. The form markup + JS in `assets/script.js` will work with
   any service that accepts a normal form POST and returns 2xx/JSON, so
   Google Sheets, Airtable, Mailchimp etc. all work too — just swap the
   `action` URL on both `<form>` tags in `index.html`.

## 1. Push this to GitHub

From this folder:

```bash
git init
git add .
git commit -m "Shorter waitlist landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 2. Turn on GitHub Pages

**Settings → Pages → Build and deployment → Source → "Deploy from a
branch"** → branch `main`, folder `/ (root)` → Save. No GitHub Actions
workflow needed at all — GitHub serves the files in this repo directly.
Give it a minute or two after your first push, then your site is live at
either your custom domain or `https://<username>.github.io/<repo>/`.

This is the simplest possible path: there's no install step and no build to
fail, since there's nothing to compile — the HTML/CSS/JS in this repo is the
same thing that ends up live.

## 3. Domain setup

**Keeping `getshorter.app`:**

1. In your DNS provider, add either:
   - Four `A` records at the apex (`getshorter.app`) pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`, **or**
   - An `ALIAS`/`ANAME` record at the apex pointing at
     `<your-username>.github.io`, if your provider supports it
   - A `CNAME` record for `www` pointing at `<your-username>.github.io`
2. In **Settings → Pages → Custom domain**, enter `getshorter.app` and save.
   GitHub verifies DNS and can auto-provision HTTPS (can take minutes to
   hours).
3. The `CNAME` file in this repo already contains `getshorter.app` — leave
   it as-is.

**Different domain:** edit the `CNAME` file to match, repeat the DNS steps.

**No domain yet, just want the free `github.io` URL:** delete the `CNAME`
file. Nothing else to change — this project uses relative asset paths
(`assets/...`), so it works fine whether it's served from a domain root or
from `/<repo>/`.

## 4. Wiring up the forms (Formspree)

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a form (or two, one per audience — either works, since both forms
   already send a hidden `audience` field so leads are distinguishable
   either way).
3. Copy the endpoint URL (`https://formspree.io/f/xxxxxxxx`).
4. In `index.html`, replace `https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID`
   in **both** `<form action="...">` attributes (customer form and barber
   form) with your real endpoint(s).
5. Commit and push. Formspree's dashboard can forward submissions to email,
   export to CSV, or connect to Zapier/Sheets.

Until you do this, submitting either form shows "Form isn't connected yet"
instead of failing silently.

## Editing content

- **Founder updates:** each entry is a `.update-item` block inside
  `<div class="updates-list">` in `index.html` — copy/paste a block and edit
  the date/tag/title/body to add a new one (newest usually goes first).
- **Benefits copy:** edit the `<ul class="benefit-list">` items directly.
- **Hero headline/phone images:** `index.html` (search for `class="hero"`)
  and `assets/images/`.
- **Colors/fonts:** all in `assets/style.css` under `:root` — driven by
  `--black` / `--white` / `--grey-*` variables plus `--font-head` (Poppins)
  and `--font-body` (Inter).

## Local preview

No install needed — just open `index.html` directly in a browser, or from
this folder run:

```bash
python3 -m http.server 8000
```

and visit `http://localhost:8000`.
