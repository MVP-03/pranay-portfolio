import { Link } from "react-router-dom";
import { projects } from "../content/projects/_index";
import ProjectCard from "../components/ProjectCard";
import PixelMark from "../components/PixelMark";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="py-24 text-center sm:text-left">
        <div className="flex items-center justify-center gap-3 sm:justify-start">
          <PixelMark />
          <span className="text-sm uppercase tracking-widest text-ink/60">Pranay</span>
        </div>
        {/* Identity statement — resolved copy, see .plan/portfolio-plan.md */}
        <h1 className="mt-4 text-4xl leading-tight font-semibold sm:text-6xl">
          I build software — and bonds with people.
        </h1>
        <Link
          to="/projects"
          className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-medium text-cream transition hover:opacity-90"
        >
          See my work
        </Link>
      </section>

      <section className="py-16">
        <h2 className="text-sm font-semibold tracking-widest text-ink/60 uppercase">Featured projects</h2>
        {featured.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-ink/70">Projects coming soon.</p>
        )}
        <Link to="/projects" className="mt-6 inline-block text-accent hover:underline">
          View all projects →
        </Link>
      </section>

      <section className="py-16">
        <p className="max-w-xl text-lg text-ink/80">
          I'm a final-year CS engineering student who moves between building
          things and talking to the people they're for — running GTM and
          product for an AI startup, leading two student organizations as
          Vice-President, and co-founding{" "}
          <span className="font-medium">You (me) Us</span>, a mental health
          blog about being honest instead of polished. The through-line is
          the same whether I'm shipping a model or writing a post: get closer
          to the actual person on the other side.
        </p>
      </section>
    </div>
  );
}
