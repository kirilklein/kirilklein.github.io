export type Project = {
  slug: string;
  tag: string;
  title: string;
  blurb: string;
  url: string;
  source: string;
};

export const projects: Project[] = [
  {
    slug: "tree-explorer",
    tag: "Biology · 3D",
    title: "Tree Explorer",
    blurb:
      "A 3D tree you can fly around. Zoom in on the leaves, the trunk or the roots to see how each part works.",
    url: "https://kirilklein.github.io/tree-explorer/",
    source: "https://github.com/kirilklein/tree-explorer",
  },
  {
    slug: "causal-sandbox",
    tag: "Causal inference",
    title: "Causal Sandbox",
    blurb:
      "Guided lessons and a full simulator. Change the confounding, the adjustment set or the estimator, and compare the estimate with the known true effect.",
    url: "https://kirilklein.github.io/causal-sandbox/",
    source: "https://github.com/kirilklein/causal-sandbox",
  },
  {
    slug: "bolmo-explainer",
    tag: "Language models · Paper",
    title: "Bolmo Explainer",
    blurb:
      "A walkthrough of Bolmo (Nature, 2026): how a finished subword language model is rebuilt to read and write raw bytes.",
    url: "https://kirilklein.github.io/bolmo-explainer/",
    source: "https://github.com/kirilklein/bolmo-explainer",
  },
];
