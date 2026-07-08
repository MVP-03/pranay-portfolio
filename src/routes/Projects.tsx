import { projects, otherRepoGroups, githubProfileUrl } from "../content/projects/_index";
import type { ProjectCategory } from "../types/project";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/interactive/Reveal";

const categoryOrder: ProjectCategory[] = ["Engineering & Product", "Machine Learning", "Cybersecurity", "Personal"];

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Reveal as="h1" className="font-pixel text-3xl tracking-wide">
        Projects
      </Reveal>

      {projects.length > 0 ? (
        categoryOrder.map((category) => {
          const items = projects.filter((project) => project.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category} className="mt-12 first:mt-8">
              <Reveal as="h2" className="font-pixel text-sm tracking-widest text-ink/60 uppercase">
                {category}
              </Reveal>
              <div className="mt-6 flex flex-wrap gap-6">
                {items.map((project, i) => (
                  <Reveal
                    key={project.slug}
                    delay={i * 80}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                  >
                    <ProjectCard project={project} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <p className="mt-8 text-ink/70">Projects coming soon.</p>
      )}

      {/* Smaller, unlisted GitHub work - real range, not portfolio-grade individually.
          See .plan/portfolio-plan.md-adjacent decision: grouped by method rather than
          padding the curated list above with ~35 unlabeled scaffold repos. */}
      <details className="group mt-16 border-t border-ink/10 pt-6">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/60 transition hover:border-accent-deep hover:text-accent-deep">
          <span>+{otherRepoGroups.reduce((sum, g) => sum + g.count, 0)} more experiments on GitHub</span>
          <span className="transition-transform duration-200 ease-out group-open:rotate-180">▾</span>
        </summary>
        <div className="mt-4 flex flex-wrap gap-2">
          {otherRepoGroups.map((group) => (
            <a
              key={group.label}
              href={githubProfileUrl}
              className="rounded-full bg-accent-soft px-3 py-1 text-xs text-ink/70 transition hover:bg-accent hover:text-cream"
            >
              {group.label} · {group.count}
            </a>
          ))}
        </div>
      </details>
    </div>
  );
}
