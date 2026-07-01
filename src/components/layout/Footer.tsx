/**
 * Pixel-art social icons (accent spot #3 of 3). These are functional links,
 * not decoration, so each gets an accessible label — unlike PixelMark.
 */
const socials = [
  { href: "https://github.com/MVP-03", label: "GitHub profile", icon: "/icon-github.svg" },
  { href: "https://linkedin.com/in/pranay-mula-037a41288", label: "LinkedIn profile", icon: "/icon-linkedin.svg" },
  { href: "mailto:pranaysurya4@gmail.com", label: "Email Pranay", icon: "/icon-email.svg" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 text-sm text-ink/60">
        <p>&copy; {new Date().getFullYear()} Pranay</p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              className="opacity-70 transition hover:opacity-100"
            >
              <img src={social.icon} alt="" aria-hidden="true" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
