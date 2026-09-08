# Kiril Klein — personal portfolio

[View the live site](https://kirilklein.github.io/)

Source for my personal website and portfolio. It brings together my work in
machine learning engineering, causal inference, and clinical AI, including:

- selected research and publications;
- open-source projects such as [Causal Sandbox](https://kirilklein.github.io/causal-sandbox/)
  and [CausalEstimate](https://github.com/kirilklein/CausalEstimate);
- my CV and PhD thesis; and
- links to GitHub, Google Scholar, and LinkedIn.

The site is deliberately small: static HTML and CSS, with no application framework
or build step. GitHub Pages publishes the `master` branch.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Site content and metadata |
| `style.css` | Layout, responsive styles, and light/dark themes |
| `assets/` | Portrait, CVs, and PhD thesis |
| `cv/causal-ds-en.md` | Source for the causal-inference CV |
| `tests/test_site.py` | Link, asset, metadata, and sitemap integrity checks |
| `.github/workflows/ci.yml` | Pull-request and `master` branch checks |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |

## Local development

Install the lint dependencies and run the checks:

```sh
npm ci
npm run lint
npm test
```

Preview the site locally:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173> and check desktop and narrow mobile widths in
both light and dark mode.

## Updating documents

The main CV is built in the separate CV project and copied to
`assets/Kiril_Klein_CV.pdf`. The causal-inference CV is built from
`cv/causal-ds-en.md` and copied to `assets/Kiril_Klein_Causal_CV_EN.pdf`.

The portrait uses the original `assets/kiril-klein.png` image with a CSS crop. Adjust
`.portrait` in `style.css` to change its framing without modifying the source image.
