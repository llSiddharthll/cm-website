# Creative Monk

The website for **Creative Monk** — a creative & digital-growth studio from Chandigarh, India. A dark, premium, multi-page agency site: brand, web, content and performance under one roof.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme`)
- **Motion** (animation) · **Lenis** (smooth scroll) · **GSAP** (scroll)
- Statically generated case studies, blog posts, and service pages

## Pages

`/` · `/about` · `/services` (+ `/services/[content|creatives|marketing|development]`) · `/work` (+ case studies) · `/blog` (+ posts) · `/careers` · `/contact`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## Notes

Copy, figures, testimonials, team and blog posts are placeholder content — swap them in `lib/content.ts` and `lib/agency.ts`. Placeholder media URLs live in `lib/media.ts`; the hero clip is in `public/video/`.
