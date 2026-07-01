/**
 * Header pixel-art mark (accent spot #2 of 3 — see .plan/portfolio-plan.md
 * "Visual Identity"). Decorative only: name text next to it carries the
 * meaning, so this is hidden from assistive tech.
 */
export default function PixelMark({ size = 24 }: { size?: number }) {
  return (
    <img
      src="/favicon-pixel.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}
