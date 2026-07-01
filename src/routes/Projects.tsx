import { projects } from "../content/projects/_index";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Projects</h1>
      {projects.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-ink/70">Projects coming soon.</p>
      )}
    </div>
  );
}
