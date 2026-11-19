"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function play() {
    if (prefersReducedMotion()) return;
    videoRef.current?.play().catch(() => {});
  }

  function pause() {
    videoRef.current?.pause();
  }

  useEffect(() => {
    const video = videoRef.current;
    const deviceCanHover = window.matchMedia("(hover: hover)").matches;
    if (!video || deviceCanHover || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const previewPath = `/previews/${project.slug}`;

  return (
    <article
      className="card"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <div className="card-media">
        <video
          ref={videoRef}
          poster={`${previewPath}.jpg`}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={`${previewPath}.webm`} type="video/webm" />
          <source src={`${previewPath}.mp4`} type="video/mp4" />
        </video>
      </div>
      <div className="card-body">
        <p className="label">{project.tag}</p>
        <h3>
          <a className="card-link" href={project.url}>
            {project.title}
          </a>
        </h3>
        <p>{project.blurb}</p>
        <p className="card-actions">
          <span aria-hidden="true">Open ↗</span>
          <a href={project.source}>Source</a>
        </p>
      </div>
    </article>
  );
}
