/**
 * Pixel-art social glyphs (accent spot #3 of 3, see .plan/portfolio-plan.md
 * "Visual Identity"). Inline SVG with `fill="currentColor"` — not static
 * <img> files — so they repaint with the theme (ink flips light/dark)
 * instead of a fixed color baked into the asset.
 */
export function GithubGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 12 12" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true">
      <g fill="currentColor">
        <rect x="2" y="0" width="2" height="1" />
        <rect x="8" y="0" width="2" height="1" />
        <rect x="1" y="1" width="4" height="1" />
        <rect x="7" y="1" width="4" height="1" />
        <rect x="1" y="2" width="10" height="1" />
        <rect x="0" y="3" width="12" height="4" />
        <rect x="1" y="7" width="10" height="1" />
        <rect x="2" y="8" width="2" height="2" />
        <rect x="8" y="8" width="2" height="2" />
      </g>
    </svg>
  );
}

export function LinkedinGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 10 10" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true">
      <g fill="currentColor">
        <rect x="2" y="2" width="1" height="1" />
        <rect x="2" y="4" width="1" height="5" />
        <rect x="5" y="4" width="1" height="5" />
        <rect x="5" y="4" width="4" height="1" />
        <rect x="8" y="4" width="1" height="5" />
      </g>
    </svg>
  );
}

export function EmailGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 10 8" width={size} height={size} shapeRendering="crispEdges" aria-hidden="true">
      <g fill="currentColor">
        <rect x="0" y="0" width="10" height="1" />
        <rect x="0" y="7" width="10" height="1" />
        <rect x="0" y="0" width="1" height="8" />
        <rect x="9" y="0" width="1" height="8" />
        <rect x="0" y="1" width="1" height="1" />
        <rect x="9" y="1" width="1" height="1" />
        <rect x="1" y="2" width="1" height="1" />
        <rect x="8" y="2" width="1" height="1" />
        <rect x="2" y="3" width="1" height="1" />
        <rect x="7" y="3" width="1" height="1" />
        <rect x="3" y="4" width="1" height="1" />
        <rect x="6" y="4" width="1" height="1" />
        <rect x="4" y="4" width="2" height="1" />
      </g>
    </svg>
  );
}
