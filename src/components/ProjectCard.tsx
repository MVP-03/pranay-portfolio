import { Link } from "react-router-dom";
import { useRef, useState, type PointerEvent } from "react";
import type { Project } from "../types/project";

/**
 * Pointer-tracked spotlight + gentle 3D tilt (see .spotlight-card in
 * index.css) - desktop-only via the media query in CSS, so touch never
 * gets a stuck hover state. The card is still a plain <Link> underneath:
 * keyboard/touch users get the full hit target and hover-independent
 * clickability per .plan/portfolio-plan.md "Project Card Design".
 */
export default function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card || e.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    card.style.setProperty("--spot-x", `${px * 100}%`);
    card.style.setProperty("--spot-y", `${py * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - py) * 6}deg`);
    card.style.setProperty("--tilt-y", `${(px - 0.5) * 6}deg`);
  }

  function handlePointerLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.slug}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="spotlight-card group flex h-full flex-col overflow-hidden rounded-lg border border-ink/15 bg-cream shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent-deep hover:shadow-md focus-visible:border-accent-deep"
    >
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-accent-soft">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-accent px-4 text-center font-semibold text-cream">
            {project.cardTitle ?? project.title}
          </div>
        ) : (
          <>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-accent-soft" />}
            <img
              src={project.image}
              alt=""
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          </>
        )}
      </div>
      <div className="relative z-[2] flex flex-1 flex-col bg-cream p-4">
        <h3 className="text-lg font-semibold">{project.cardTitle ?? project.title}</h3>
        <p className="mt-1 text-sm text-ink/80">{project.outcomeLine}</p>
        <div className="mt-3 flex flex-wrap gap-2 pt-1 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-accent-soft px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
