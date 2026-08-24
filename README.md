# kirilklein.github.io

Personal site at <https://kirilklein.github.io> — CV, publications, and PhD thesis.

Static HTML, no build step. `.nojekyll` keeps GitHub Pages from running Jekyll.

```
index.html                        the whole site
style.css                         the whole stylesheet
assets/Kiril_Klein_CV.pdf         built from personal/rabota/cv (src/ml-engineer-en.md)
assets/Kiril_Klein_PhD_Thesis.pdf
```

To update the CV, edit `src/ml-engineer-en.md` in the CV repo, run `./build.sh` there,
and copy `out/Kiril_Klein_ML_Engineer_EN.pdf` over `assets/Kiril_Klein_CV.pdf`.
