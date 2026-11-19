# Kiril Klein — personal portfolio

[View the live site](https://kirilklein.github.io/)

Source for my personal website and portfolio. It brings together my work in
machine learning engineering, causal inference, and clinical AI, including:

- selected research and publications;
- open-source projects such as [Causal Sandbox](https://kirilklein.github.io/causal-sandbox/)
  and [CausalEstimate](https://github.com/kirilklein/CausalEstimate);
- my CV and PhD thesis; and
- links to GitHub, Google Scholar, and LinkedIn.

The site is a single page built with Next.js and exported as static HTML. A GitHub Actions
workflow builds it and publishes the `out/` directory to GitHub Pages on every push to `master`.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Page content |
| `src/app/layout.tsx` | Metadata, structured data, and fonts |
| `src/app/globals.css` | Layout, responsive styles, and dark/light themes |
| `src/data/projects.ts` | The explainer cards |
| `src/components/ProjectCard.tsx` | One card with its looping preview |
| `public/assets/` | Portrait, CVs, and PhD thesis |
| `public/previews/` | Card clips and posters |
| `scripts/record-previews.mjs` | Records the card clips from the live explainers |
| `cv/causal-ds-en.md` | Source for the causal-inference CV |
| `tests/test_site.py` | Link, asset, metadata, and sitemap checks on the export |
| `.github/workflows/` | Pull-request checks and the Pages deployment |

## Local development

```sh
npm ci
npm run dev        # http://localhost:3000
```

Run the checks. The tests read the static export, so build first:

```sh
npm run lint
npm run build
npm test
```

Check desktop and narrow mobile widths in both dark and light mode.

## Adding an explainer card

Add an entry to `src/data/projects.ts` and a scenario with the same slug to
`scripts/record-previews.mjs`, then record its clip (needs `ffmpeg`):

```sh
npx playwright install chromium
node scripts/record-previews.mjs <slug>
```

## Updating documents

The main CV is built in the separate CV project and copied to
`public/assets/Kiril_Klein_CV.pdf`. The causal-inference CV is built from
`cv/causal-ds-en.md` and copied to `public/assets/Kiril_Klein_Causal_CV_EN.pdf`.

The portrait is `public/assets/kiril-klein.png`, cropped to a circle by `.portrait` in
`src/app/globals.css`.
