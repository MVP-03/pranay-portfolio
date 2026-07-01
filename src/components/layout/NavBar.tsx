import { NavLink } from "react-router-dom";
import PixelMark from "../PixelMark";

const links = [
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="border-b border-ink/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 font-semibold" end>
          <PixelMark size={20} />
          Pranay
        </NavLink>
        <ul className="flex gap-3 text-xs sm:gap-6 sm:text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center transition hover:text-accent ${isActive ? "text-accent" : "text-ink/80"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
