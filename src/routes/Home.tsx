import { Link } from "react-router-dom";
import { useState } from "react";
import { projects } from "../content/projects/_index";
import ProjectCard from "../components/ProjectCard";
import PixelMark from "../components/PixelMark";
import PixelField from "../components/interactive/PixelField";
import SplitText from "../components/interactive/SplitText";
import Magnetic from "../components/interactive/Magnetic";
import Reveal from "../components/interactive/Reveal";
import { GithubGlyph, LinkedinGlyph, EmailGlyph } from "../components/SocialIcons";

const quickLinks = [
  { href: "https://github.com/MVP-03", label: "GitHub profile", Glyph: GithubGlyph },
  { href: "https://linkedin.com/in/venkata-pranay-mula-037a41288", label: "LinkedIn profile", Glyph: LinkedinGlyph },
  { href: "mailto:pranaysurya4@gmail.com", label: "Email Pranay", Glyph: EmailGlyph },
];

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink/10">
        <PixelField />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <PixelMark />
            <span className="font-pixel text-sm tracking-widest text-ink/60 uppercase">Mula Venkata Pranay</span>
          </div>
          {/* Identity statement - resolved copy, see .plan/portfolio-plan.md */}
          <h1 className="mt-4 max-w-3xl text-center text-4xl leading-tight font-semibold text-balance sm:text-left sm:text-6xl">
            <SplitText text="I help build software - and bond with people." />
          </h1>

          {/* Photo + about, side by side - the two halves of the same idea
              rather than a photo card floating apart from the copy. */}
          <div className="mt-12 grid gap-8 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-start sm:gap-10">
            <Reveal delay={80} className="mx-auto w-40 shrink-0 sm:mx-0 sm:w-full">
              <div className="relative">
                <div className="absolute -top-2 -left-2 h-full w-full rounded-2xl border-2 border-accent/40" aria-hidden="true" />
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-ink/15 bg-accent-soft shadow-sm">
                  {!portraitFailed ? (
                    <img
                      src="/portrait-pixel.jpg"
                      alt="Portrait of Pranay"
                      className="h-full w-full object-cover object-[50%_15%]"
                      onError={() => setPortraitFailed(true)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-ink/50">Photo coming soon</div>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160} className="text-center sm:text-left">
              <h2 className="font-pixel text-sm tracking-widest text-ink/60 uppercase">About me</h2>
              <p className="mt-3 max-w-xl text-ink/80">
                Computer science engineering graduate who moves between
                building things and talking to the people they're for -
                shipping models, running GTM, and co-founding{" "}
                <Link to="/projects/you-me-us" className="font-medium underline decoration-ink/30 hover:decoration-accent">
                  You (me) Us
                </Link>
                . I like problems that need both a working prototype and a
                convincing pitch.
              </p>
              <p className="font-pixel mt-4 text-xs tracking-widest text-ink/50 uppercase">
                Currently: GTM & Product, StepsAI
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
                <Magnetic>
                  <Link
                    to="/projects"
                    className="inline-block rounded-md bg-accent px-6 py-3 font-medium text-cream shadow-sm transition hover:opacity-90"
                  >
                    See my work
                  </Link>
                </Magnetic>
                <Link to="/resume" className="text-sm font-medium text-ink/70 transition hover:text-accent">
                  View resume →
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 border-t border-ink/10 pt-5 text-ink/60 sm:justify-start">
                {quickLinks.map(({ href, label, Glyph }) => (
                  <a key={href} href={href} aria-label={label} className="transition hover:text-accent">
                    <Glyph size={18} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <section className="py-16">
          <h2 className="font-pixel text-sm tracking-widest text-ink/60 uppercase">Featured projects</h2>
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
      </div>
    </div>
  );
}
