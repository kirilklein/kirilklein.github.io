# kirilklein.github.io

Personal site at <https://kirilklein.github.io> — CV, publications, and PhD thesis.

Static HTML, no build step. `.nojekyll` keeps GitHub Pages from running Jekyll.

```
index.html                        the whole site
style.css                         the whole stylesheet
cv/causal-ds-en.md                source for the English causal inference CV
assets/Kiril_Klein_CV.pdf         built from personal/rabota/cv (src/ml-engineer-en.md)
assets/Kiril_Klein_PhD_Thesis.pdf
assets/Kiril_Klein_Causal_CV_EN.pdf  English causal inference CV
assets/kiril-klein.png              original portrait, cropped with CSS
```

To update the CV, edit `src/ml-engineer-en.md` in the CV repo, run `./build.sh` there,
and copy `out/Kiril_Klein_ML_Engineer_EN.pdf` over `assets/Kiril_Klein_CV.pdf`.

The causal-inference download is built from `cv/causal-ds-en.md` using the Pandoc
setup in `personal/rabota/cv`. Copy the rebuilt PDF into `assets/`.
The portrait uses a circular CSS background crop; adjust `.portrait` in `style.css`
to change the framing without changing the original photograph.

Preview locally with `python3 -m http.server 4173 --bind 127.0.0.1`, then open
<http://127.0.0.1:4173>. Check narrow mobile and desktop widths in light and dark mode.

Before opening a pull request, install the lint tools with `npm ci`, then run:

```
npm run lint
npm test
```

CI runs the same HTML/CSS lint and site-integrity tests on pull requests and pushes
to `master`.

GitHub Pages currently publishes `master`. This refresh is based on the existing
`site-rewrite` draft and must be merged into the publishing branch to go live.
