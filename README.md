# Mo AI

Marketing site for **Mo AI** — custom CRM development, GoHighLevel engineering,
autonomous AI agents and high-performance web.

Live design language follows Apple's Human Interface Guidelines adapted for the
web: deep space blacks, obsidian cards with hairline borders, frosted glass
chrome, tightly tracked type, and restrained iridescent accents sampled from the
Mo AI mark.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | Framer Motion |
| Icons | Lucide |
| Booking | Cal.com inline embed |
| Hosting | Vercel |

> **Bundler note.** The build and dev scripts pass `--webpack` on purpose.
> Next 16's Turbopack postcss bridge currently fails on `@tailwindcss/postcss`
> with `Missing field 'negated' on ScannerOptions.sources`, and dropping the
> postcss config makes Turbopack silently emit CSS with no Tailwind utilities at
> all. Webpack compiles the full ~47KB stylesheet correctly. Revisit once the
> Turbopack bridge is fixed.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4400
```

```bash
npm run build    # production build
npm start        # serve the build
```

## Structure

```
app/
  globals.css        design tokens (@theme), base layer, utilities
  layout.tsx         fonts, metadata, icons
  page.tsx           section composition
components/
  Nav.tsx            frosted glass floating header
  Hero.tsx           cinematic hero, ambient spotlight
  Metrics.tsx        animated counters + audience segmented control
  Services.tsx       core services bento grid
  Work.tsx           case study bento + detail modal
  Architecture.tsx   interactive Web -> CRM/GHL -> Agents flow
  CTA.tsx            ambient glow card + Cal.com embed
  Footer.tsx         multi-column footer and legal
  ui/
    Button.tsx       pill button, magnetic hover, shimmer
    Counter.tsx      viewport-triggered count-up
    Logo.tsx         mark + wordmark lockup
    Reveal.tsx       fade/slide-up on scroll
    SpotlightCard.tsx obsidian card with cursor spotlight
lib/
  data.ts            all page content and metrics
  cn.ts              class name joiner
public/
  logo-mark*.png     brand mark, used as the site glyph
  logo-full-dark.png full lockup recoloured for dark backgrounds
  logo-original.png  supplied source asset
```

## Content and claims

All copy and metrics live in `lib/data.ts`.

Client names shown on the site are **pseudonyms** and logos are omitted, because
the underlying engagements are under NDA. Every project, system and figure is
real and taken from the delivered build it came from. Figures reflect the state
of each system at delivery and are not a guarantee of future results.

## Branding

The supplied logo's wordmark is dark slate (`#304050`), which disappears on a
black background. `components/ui/Logo.tsx` therefore renders the gradient mark as
an image and sets the "Mo AI" wordmark in type, which also keeps it crisp at any
size. `public/logo-full-dark.png` holds a recoloured full lockup if the complete
artwork is ever needed on dark.

Accent tokens are sampled from the mark itself: cyan `#34d2f2`, blue `#0a84ff`,
deep blue `#0b57e0`.
