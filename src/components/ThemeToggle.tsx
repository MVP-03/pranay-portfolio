import { useTheme } from "../hooks/useTheme";

/** 8x8 pixel-grid sun/moon glyphs, drawn in the same crisp-rect style as
 * favicon-pixel.svg, so the toggle reads as part of the site's pixel-art
 * accent rather than a generic icon-font swap. */
function SunGlyph() {
  return (
    <svg viewBox="0 0 8 8" width="14" height="14" shapeRendering="crispEdges" aria-hidden="true">
      <g fill="currentColor">
        <rect x="3" y="0" width="2" height="1" />
        <rect x="3" y="7" width="2" height="1" />
        <rect x="0" y="3" width="1" height="2" />
        <rect x="7" y="3" width="1" height="2" />
        <rect x="1" y="1" width="1" height="1" />
        <rect x="6" y="1" width="1" height="1" />
        <rect x="1" y="6" width="1" height="1" />
        <rect x="6" y="6" width="1" height="1" />
        <rect x="2" y="2" width="4" height="4" />
      </g>
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg viewBox="0 0 8 8" width="14" height="14" shapeRendering="crispEdges" aria-hidden="true">
      <g fill="currentColor">
        <rect x="3" y="0" width="3" height="1" />
        <rect x="2" y="1" width="4" height="1" />
        <rect x="1" y="2" width="4" height="4" />
        <rect x="2" y="6" width="4" height="1" />
        <rect x="3" y="7" width="3" height="1" />
      </g>
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink/15 text-ink/70 transition-colors hover:border-accent hover:text-accent"
    >
      <span key={theme} className="theme-icon-enter inline-flex">
        {isDark ? <SunGlyph /> : <MoonGlyph />}
      </span>
    </button>
  );
}
