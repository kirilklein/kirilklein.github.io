import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const EMAIL = "kiril.vadimovic.klein@gmail.com";
const GITHUB_URL = "https://github.com/kirilklein";
const SCHOLAR_URL = "https://scholar.google.com/citations?user=8k9TwncAAAAJ&hl=en";
const LINKEDIN_URL = "https://www.linkedin.com/in/kiril-klein-phd-574809211";

function Arrow() {
  return <span aria-hidden="true"> ↗</span>;
}

function SectionHeading({ number, id, children }: { number: string; id: string; children: string }) {
  return (
    <header className="section-heading">
      <p className="label">{number}</p>
      <h2 id={id}>{children}</h2>
    </header>
  );
}

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="navigation" aria-label="Main navigation">
        <a className="wordmark" href="#main" aria-label="Kiril Klein, top of page">
          KK
        </a>
        <div>
          <a href="#explainers">Explainers</a>
          <a href="#research">Research</a>
          <a href="#software">Software</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main id="main">
        <header className="hero">
          <div>
            <p className="label">Machine learning · NLP &amp; LLMs · Causal inference</p>
            <h1>
              Kiril Klein<span className="suffix">, PhD</span>
            </h1>
            <p className="tagline">From clinical data to reliable models and evidence.</p>
            <p className="hero-summary">
              I build ML systems for healthcare end to end, with NLP, LLMs and transformers for
              longitudinal records, and develop methods to estimate treatment effects from
              observational data.
            </p>
            <p className="location">Machine Learning Engineer at Aiomic · Copenhagen</p>
            <p className="buttons">
              <a className="button primary" href="#explainers">
                Explore explainers <span aria-hidden="true">↓</span>
              </a>
              <a className="button" href="/assets/Kiril_Klein_CV.pdf">
                Download CV
                <Arrow />
              </a>
            </p>
            <p className="social-links">
              <a href={GITHUB_URL}>GitHub</a>
              <a href={SCHOLAR_URL}>Google&nbsp;Scholar</a>
              <a href={LINKEDIN_URL}>LinkedIn</a>
            </p>
          </div>
          <Image
            className="portrait"
            src="/assets/kiril-klein.png"
            alt="Portrait of Kiril Klein"
            width={640}
            height={640}
            priority
          />
        </header>

        <section className="section" aria-labelledby="explainers">
          <SectionHeading number="01 / Explainers" id="explainers">
            Things you can poke at
          </SectionHeading>
          <p className="section-intro">
            Interactive pages that teach one idea by letting you change it. Free, and they run in
            the browser.
          </p>
          <div className="card-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="research">
          <SectionHeading number="02 / Research" id="research">
            Selected research
          </SectionHeading>
          <article className="item">
            <p className="meta">Machine Learning for Healthcare · 2024 · Joint first author</p>
            <h3>
              <a href="https://proceedings.mlr.press/v252/odgaard24a.html">
                CORE-BEHRT: A Carefully Optimized and Rigorously Evaluated BEHRT
                <Arrow />
              </a>
            </h3>
            <p>
              Systematic improvements to EHR data representation, model architecture, and training.
              Outperformed the baseline on 24 of 25 clinical prediction tasks.
            </p>
          </article>
          <article className="item">
            <p className="meta">NEJM AI · 2026 · Co-author</p>
            <h3>
              <a href="https://doi.org/10.1056/AIra2501253">
                MEDS — An Emerging Data Standard and Ecosystem for Health AI Research
                <Arrow />
              </a>
            </h3>
            <p>
              A shared data standard and ecosystem for machine learning on structured medical
              records.
            </p>
          </article>
          <a className="text-link" href={SCHOLAR_URL}>
            All publications on Google Scholar
            <Arrow />
          </a>
          <article className="feature">
            <p className="label">PhD thesis · University of Copenhagen · 2026</p>
            <h3>Scalable Causal Inference on Electronic Health Records Using Transformers</h3>
            <p>
              Connecting EHR transformers with target trial emulation: from clinical prediction to
              treatment-effect estimation and large-scale drug-safety screening.
            </p>
            <a href="/assets/Kiril_Klein_PhD_Thesis.pdf">
              Read the thesis <span className="file-info">PDF · 11 MB</span>
              <Arrow />
            </a>
          </article>
        </section>

        <section className="section" aria-labelledby="software">
          <SectionHeading number="03 / Open source" id="software">
            Open-source software
          </SectionHeading>
          <article className="item">
            <h3>
              <a href="https://kirilklein.github.io/CausalEstimate/">
                CausalEstimate
                <Arrow />
              </a>
            </h3>
            <p>
              A Python library for treatment-effect estimation from propensity scores and outcome
              predictions, including IPW, AIPW, TMLE, and matching.{" "}
              <a href="https://github.com/kirilklein/CausalEstimate">Source code</a>.
            </p>
          </article>
          <article className="item">
            <h3>
              <a href="https://github.com/FGA-DIKU/BONSAI">
                BONSAI
                <Arrow />
              </a>
            </h3>
            <p>
              A framework for transformer modelling of electronic health records. I am its main
              developer and coordinated the team behind its causal-inference extension,{" "}
              <a href="https://github.com/kirilklein/bonsai-causal">BONSAI Causal</a>.{" "}
              <a href="https://doi.org/10.21105/joss.08869">Paper (JOSS)</a>.
            </p>
          </article>
          <a className="text-link" href={GITHUB_URL}>
            More on GitHub
            <Arrow />
          </a>
        </section>

        <section className="section" aria-labelledby="about">
          <SectionHeading number="04 / About" id="about">
            Research depth. Engineering ownership.
          </SectionHeading>
          <div className="prose">
            <p>
              At <strong>Aiomic</strong>, I designed and built the ML system for clinical document
              analysis and brought it into production. It combines gradient boosting, fine-tuned
              encoder transformers and LLMs in one workflow, with blinded validation before
              deployment.
            </p>
            <p>
              I completed my PhD at the <strong>University of Copenhagen</strong> and the Pioneer
              Centre for AI, where I developed a method for estimating causal drug effects from the
              longitudinal records of more than 2 million patients. My earlier training is in
              physics and computational physics.
            </p>
            <p className="buttons">
              <a className="button" href="/assets/Kiril_Klein_CV.pdf">
                CV (PDF)
                <Arrow />
              </a>
              <a className="button" href="/assets/Kiril_Klein_Causal_CV_EN.pdf">
                Causal inference CV (PDF)
                <Arrow />
              </a>
            </p>
          </div>
        </section>

        <footer id="contact">
          <p className="label">Get in touch</p>
          <a className="email" href={`mailto:${EMAIL}`}>
            {EMAIL}
            <Arrow />
          </a>
          <div className="footer-note">
            <span>Kiril Klein, PhD</span>
            <span>Copenhagen, Denmark</span>
          </div>
        </footer>
      </main>
    </>
  );
}
