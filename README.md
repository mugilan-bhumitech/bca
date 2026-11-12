# bca

Bhumi Campus Awards 2027 website — React + Vite.

Pages: Home (`/`), Campus Changemakers Summit (`/summit`), Partner (`/partner`), Vote / Verification (`/vote`).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production site is written to `dist/`. Upload the contents of `dist/` to the web root. It includes an `.htaccess` (from `public/`) that serves the single-page routes on Apache and redirects the old `.php` / `.html` links (UTM query strings are kept).

## Notes

- Motion: Lenis smooth scroll + GSAP ScrollTrigger; every animation has a `prefers-reduced-motion` fallback.
- UTM pass-through: `utm_*` tags in the URL are carried onto the hub.bhumi.club apply / vote / summit links and between pages (`src/lib/utm.js`).
- Images live in `public/assets/images` (large originals were resized by `scripts/optimize-images.mjs`).
- The "Direct verification form" on `/vote` is a client-side demo carried over from the old `vote.php`: it does not submit votes anywhere. Real votes go through the Zoho portal tab.
