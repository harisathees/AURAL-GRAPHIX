# AURAL-GRAPHIX

Next.js rebuild of the Aural Graphix creative-agency site — a 1:1 recreation of the
original design in a modern, SEO-first React stack.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 with design tokens mirrored from the source design system |
| Motion | `motion` (Framer Motion) — appear, text, ticker, scroll and carousel effects |
| Images | `next/image` with AVIF/WebP, local optimised assets (49 MB → 3.5 MB) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
```

Set `NEXT_PUBLIC_SITE_URL` before deploying so canonicals, Open Graph URLs and the
sitemap resolve against the real domain. Set `CONTACT_WEBHOOK_URL` to forward
contact-form submissions.

## Routes

| Route | Type |
|---|---|
| `/` | Home — hero, gallery, compare, bento, services, projects, process, testimonials, blog, FAQ |
| `/about-us` | Studio, mission, stats, team |
| `/projects` · `/projects/[slug]` | Showcase + case studies (4 static pages) |
| `/blog` · `/blog/[slug]` | Articles (6 static pages) |
| `/contact-us` | Form + FAQ |
| `/legal-pages/[slug]` | Privacy policy |
| `/sitemap.xml` · `/robots.txt` · `/opengraph-image` | Generated |

## Design system

Typography, colour and spacing tokens are defined once in `src/app/globals.css`
and match the source exactly across three breakpoints (phone `<810px`,
tablet `810–1199px`, desktop `≥1200px`).

```
Heading 1   40 / 56 / 70 px      Body        15 / 16 / 16 px
Heading 2   36 / 40 / 52 px      Text Medium 16 / 18 / 18 px
Heading 3   32 / 36 / 42 px      Text SM     13 / 14 / 14 px
Heading 4   28 / 32 / 36 px      Pre Title   12 px, 0.15em, uppercase
Heading 5   20 / 22 / 22 px      Script      Caveat 18 px
```

Brand `#6F46D4` · Deep purple `#2D1B6B` · Midnight `#060612` · Mist `#F5F4F3`

## Animation

Recreated from the source motion spec:

- **Appear** — `opacity 0→1`, `y 20→0`, 0.5s spring, staggered per block
- **Text** — per-character reveal with 10px blur, 0.4s spring
- **Ticker** — seamless marquees (gallery rows, industries list), pause on hover
- **Rings** — 150s linear rotation carrying the tool-icon glyphs
- **Process** — scroll-linked sticky section; the arc fills and the step swaps with scroll
- **Carousels** — autoplay + drag + dots, spring transitions

All motion respects `prefers-reduced-motion`.

## SEO

Per-route metadata and canonicals, Open Graph + Twitter cards, a generated OG image,
`sitemap.xml`, `robots.txt`, semantic headings, and JSON-LD for `Organization`,
`WebSite`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`, `BlogPosting`
and `CreativeWork`.

## Structure

```
src/
  app/          routes, layout, sitemap, robots, OG image, contact API
  components/
    layout/     navigation, footer
    sections/   page sections
    ui/         button, carousel, marquee, reveal, cards, icons
  data/         site config, content, CMS-derived projects/blog/legal
  lib/          types, motion variants, SEO helpers
public/assets/  optimised imagery
```
