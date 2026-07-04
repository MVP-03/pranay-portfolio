import { Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "../content/projects/_index";
import ProjectCard from "../components/ProjectCard";
import PixelMark from "../components/PixelMark";
import PixelField from "../components/interactive/PixelField";
import SplitText from "../components/interactive/SplitText";
import Magnetic from "../components/interactive/Magnetic";
import Reveal from "../components/interactive/Reveal";

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden">
        <PixelField />
        <div className="relative mx-auto grid max-w-4xl items-center gap-12 px-6 py-24 sm:grid-cols-[1.3fr_1fr]">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <PixelMark />
              <span className="text-sm uppercase tracking-widest text-ink/60">Mula Venkata Pranay</span>
            </div>
            {/* Identity statement - resolved copy, see .plan/portfolio-plan.md */}
            <h1 className="mt-4 text-4xl leading-tight font-semibold text-balance sm:text-6xl">
              <SplitText text="I build software - and bonds with people." />
            </h1>
            <div className="mt-8 flex justify-center sm:justify-start">
              <Magnetic>
                <Link
                  to="/projects"
                  className="inline-block rounded-md bg-accent px-6 py-3 font-medium text-cream shadow-sm transition hover:opacity-90"
                >
                  See my work
                </Link>
              </Magnetic>
            </div>
          </div>

          <Reveal delay={120} className="mx-auto sm:mx-0 sm:justify-self-end">
            <div className="relative h-40 w-40 sm:h-56 sm:w-56">
              <div className="absolute inset-0 rotate-3 rounded-2xl bg-accent-soft" />
              <div className="absolute inset-0 -rotate-2 overflow-hidden rounded-2xl border-2 border-ink/10 bg-cream">
                {!portraitFailed ? (
                  <img
                    src="/portrait-pixel.jpg"
                    alt="Portrait of Pranay"
                    className="h-full w-full object-cover object-[50%_15%]"
                    onError={() => setPortraitFailed(true)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-accent-soft text-sm text-ink/50">
                    Photo coming soon
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <section className="py-16">
          <h2 className="text-sm font-semibold tracking-widest text-ink/60 uppercase">Featured projects</h2>
          {featured.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project, i) => (
                <Reveal key={project.slug} delay={i * 80}>
                  <ProjectCard project={project} />
                </Reveal>
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
          <Reveal>
            <p className="max-w-xl text-lg text-ink/80">
              I'm a computer science engineering graduate who moves between
              building things and talking to the people they're for - running
              GTM and product for an AI startup, having led two student
              organizations as Vice-President along the way, and co-founding{" "}
              <span className="font-medium">You (me) Us</span>, a mental health
              blog about being honest instead of polished. The through-line is
              the same whether I'm shipping a model or writing a post: get closer
              to the actual person on the other side.
            </p>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
