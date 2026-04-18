# Debjeet Swain — Personal Website

Personal site for [debjeetswain.com](https://debjeetswain.com), built with React, TypeScript, and Vite.

The site is structured as a calm editorial portfolio with six primary sections:

- `/` home
- `/build` projects, experiments, and AI tools
- `/pm-dojo` PM Dojo project page
- `/stack` workflow and tooling
- `/living` curated directory for intentional living
- `/about` longer personal narrative
- `/contact` outreach page

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind v4 utilities plus custom CSS system
- Vercel for deployment

## Local Development

```bash
npm install
npm run dev
```

The local production preview flow:

```bash
npm run build
npm run preview
```

## Deployment

This repo is linked to Vercel and deploys as a static SPA.

- `vercel.json` rewrites all routes to `index.html`
- `public/sitemap.xml` contains the published routes
- `public/robots.txt` points crawlers to the sitemap

## Notes

- The main visual system lives in `src/index.css`.
- Shared page chrome lives in `src/components/Layout.tsx`.
- Route definitions live in `src/App.tsx`.
- Downloadable prompt files for the Build and PM Dojo pages live in `public/commands/`.
