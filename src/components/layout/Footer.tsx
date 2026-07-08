import Magnetic from "../interactive/Magnetic";
import { GithubGlyph, LinkedinGlyph, EmailGlyph } from "../SocialIcons";
import VisitorCounter from "../VisitorCounter";

/**
 * Pixel-art social icons (accent spot #3 of 3). These are functional links,
 * not decoration, so each gets an accessible label - unlike PixelMark.
 */
const socials = [
  { href: "https://github.com/MVP-03", label: "GitHub profile", Glyph: GithubGlyph },
  { href: "https://linkedin.com/in/venkata-pranay-mula-037a41288", label: "LinkedIn profile", Glyph: LinkedinGlyph },
  { href: "mailto:pranaysurya4@gmail.com", label: "Email Pranay", Glyph: EmailGlyph },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-ink/60">
        <div className="flex items-center gap-4">
          <p className="font-pixel tracking-wide">&copy; {new Date().getFullYear()} Pranay</p>
          <VisitorCounter />
        </div>
        <div className="flex gap-4 text-ink/70">
          {socials.map(({ href, label, Glyph }) => (
            <Magnetic key={href} strength={0.5} range={40}>
              <a href={href} aria-label={label} className="inline-block transition hover:text-accent">
                <Glyph size={20} />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
}
