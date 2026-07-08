import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PixelMark from "../PixelMark";
import ThemeToggle from "../ThemeToggle";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b transition-colors duration-300 ${
        scrolled ? "border-ink/10 bg-cream/80 backdrop-blur-sm" : "border-transparent bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 font-semibold" end>
          <PixelMark size={20} />
          Pranay
        </NavLink>
        <div className="flex items-center gap-4 sm:gap-6">
          <ul className="flex gap-3 text-xs sm:gap-6 sm:text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `group relative inline-flex min-h-11 items-center transition hover:text-accent ${isActive ? "text-accent" : "text-ink/80"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
