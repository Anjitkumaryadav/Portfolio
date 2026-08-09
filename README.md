# Anjit Kumar Yadav — Portfolio

A dark, editorial, motion-driven portfolio for a Software Engineer. Built from
scratch with React + Vite + Tailwind, GSAP + Motion + Lenis.

## Run

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview the build
npm run lint     # eslint
```

## Editing content

**All copy, projects, experience, skills, and links live in one file:**
[`src/data/site.js`](src/data/site.js). Search for `TODO` — four values need
your input (the site works with placeholders until then):

1. **GitHub URL** — `links.github`
2. **Impulsive Web start date** — `experience[0].period`
3. **Full name of "L&B"** — `experience[1].company`
4. **Resume PDF** — drop `public/Anjit-Kumar-Yadav-Resume.pdf` (button already wired)

## Structure

- `src/data/site.js` — content (single source of truth)
- `src/lib/` — hooks: Lenis smooth scroll, reduced-motion, magnetic, pointer, `cn`
- `src/components/` — primitives (SplitText, Reveal, MagneticButton, Cursor, Rail),
  coded CSS/SVG project mockups, the case-study overlay
- `src/sections/` — Preloader, Nav, Hero, About, Experience, Projects,
  TestMindPipeline, Skills, Philosophy, ResumeCTA, Contact, Footer

## Design system

Dark base (`#08090A`), bone-white ink, one copper accent (`#D2A15E`). Type:
Inter Tight (display) · Instrument Serif italic (accent) · JetBrains Mono (meta),
all self-hosted. Tokens are defined in `tailwind.config.js`.

## Motion & accessibility

Heavy but purposeful animation — preloader, mask-slide text reveals, cursor-parallax
hero, magnetic buttons, custom cursor, a GSAP-pinned Test Mind pipeline, an interactive
skills constellation. Everything honors `prefers-reduced-motion` (Lenis and pinning
off, reveals become instant), keeps keyboard access, and clips horizontal overflow.

## SEO

`index.html` carries title/description/canonical, Open Graph + Twitter cards, and
JSON-LD `Person`. `public/` has `robots.txt`, `sitemap.xml`, `favicon.svg`, and
`og-image.svg`. Update the `https://anjitkumaryadav.dev/` placeholder domain to your
real domain once deployed.
