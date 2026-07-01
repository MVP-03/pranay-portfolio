# Pranay — Portfolio

React + TypeScript + Vite + Tailwind + React Router. Design decisions are
recorded in [.plan/portfolio-plan.md](.plan/portfolio-plan.md) — read that
before changing hierarchy, states, or the pixel-art accent rule (max 3
places: cursor, header mark, social icons).

## Setup

```bash
npm install
cp .env.example .env   # fill in your Formspree endpoint
npm run dev
```

## Before shipping — replace placeholders

- `src/content/projects/_index.ts` and matching `.mdx` files — real projects
- `public/projects/*.png` — real project screenshots (falls back to a
  title-on-accent-color card if an image is missing/broken — this is
  intentional, not a bug)
- `src/routes/Resume.tsx` — real experience/education/skills
- `public/resume.pdf` — real resume file
- `src/routes/Contact.tsx`, `src/components/layout/Footer.tsx` — replace
  `you@example.com` / `your-username` with real contact info
- `public/icon-github.svg`, `icon-linkedin.svg`, `icon-email.svg` — these
  are placeholder pixel-art glyphs; refine the art before shipping
- `src/routes/Home.tsx` — about blurb needs a real concrete example, not
  the placeholder sentence

## Build

```bash
npm run build
npm run preview
```

Deploys as a static site to any host (Vercel/Netlify free tier both work,
zero config needed for a Vite app).
