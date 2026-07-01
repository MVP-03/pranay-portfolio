import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState, type ComponentType } from "react";
import { projects } from "../content/projects/_index";

const caseStudies = import.meta.glob("../content/projects/*.mdx");

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [CaseStudy, setCaseStudy] = useState<ComponentType | null>(null);

  useEffect(() => {
    setCaseStudy(null);
    if (!slug) return;
    const loader = caseStudies[`../content/projects/${slug}.mdx`];
    if (!loader) return;
    loader().then((mod) => setCaseStudy(() => (mod as { default: ComponentType }).default));
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link to="/projects" className="text-accent hover:underline">
        ← All projects
      </Link>
      <h1 className="mt-4 text-4xl font-semibold">{project.title}</h1>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent-soft px-3 py-1 text-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Optional links: only render what exists — never a dead link */}
      <div className="mt-6 flex gap-4">
        {project.liveUrl && (
          <a href={project.liveUrl} className="text-accent hover:underline">
            Live demo
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} className="text-accent hover:underline">
            Repo
          </a>
        )}
      </div>

      <div className="case-study mt-8">{CaseStudy ? <CaseStudy /> : <p>Loading…</p>}</div>
    </article>
  );
}
