/**
 * Header pixel-art mark (accent spot #2 of 3 - see .plan/portfolio-plan.md
 * "Visual Identity"). Decorative only: name text next to it carries the
 * meaning, so this is hidden from assistive tech. Inline SVG (not an
 * <img src>) so `currentColor` can pick up the accent color per theme
 * instead of baking a fixed color into a static file.
 */
export default function PixelMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 8 8"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="shrink-0 text-accent-deep"
    >
      <g fill="currentColor">
        <rect x="3" y="1" width="2" height="1" />
        <rect x="2" y="2" width="4" height="1" />
        <rect x="1" y="3" width="6" height="2" />
        <rect x="2" y="5" width="4" height="1" />
        <rect x="3" y="6" width="2" height="1" />
      </g>
    </svg>
  );
}
