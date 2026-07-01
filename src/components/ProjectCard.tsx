import { Link } from "react-router-dom";
import { useState } from "react";
import type { Project } from "../types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-lg border border-transparent transition hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-accent-soft">
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
              className={`h-full w-full object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.cardTitle ?? project.title}</h3>
        <p className="mt-1 text-sm text-ink/80">{project.outcomeLine}</p>
        <div className="mt-3 flex flex-wrap gap-2">
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
