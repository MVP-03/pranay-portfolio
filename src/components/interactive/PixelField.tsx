import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Interactive pixel-grid backdrop for the hero - extends the site's
 * pixel-art accent (see .plan/portfolio-plan.md "Visual Identity") from a
 * static decoration into the page's signature moment: a field of small
 * squares that drift gently and brighten near the cursor. Ambient only -
 * never covers or competes with the headline/CTA (low opacity, behind
 * content, ignores pointer events).
 */
export default function PixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cell = 26;
    let cols = 0;
    let rows = 0;
    let dots: { baseX: number; baseY: number; phase: number }[] = [];
    let pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let start = performance.now();

    // Read the theme's accent color from CSS rather than hardcoding it, so
    // the field re-tints itself when dark mode flips --color-accent.
    let accentRgb = "181, 74, 36";
    const readAccentColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
      const match = /^#([0-9a-f]{6})$/i.exec(hex);
      if (!match) return;
      const value = match[1];
      const r = parseInt(value.slice(0, 2), 16);
      const g = parseInt(value.slice(2, 4), 16);
      const b = parseInt(value.slice(4, 6), 16);
      accentRgb = `${r}, ${g}, ${b}`;
    };
    readAccentColor();

    // Under reduced motion there's no running rAF loop to pick up a color
    // change, so force one repaint on theme toggle.
    const themeObserver = new MutationObserver(() => {
      readAccentColor();
      if (reducedMotion) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ baseX: c * cell, baseY: r * cell, phase: Math.random() * Math.PI * 2 });
        }
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = (now - start) / 1000;
      const accent = accentRgb;

      for (const dot of dots) {
        const drift = reducedMotion ? 0 : Math.sin(t * 0.6 + dot.phase) * 2;
        const x = dot.baseX + drift;
        const y = dot.baseY + drift;
        const dist = Math.hypot(pointer.x - x, pointer.y - y);
        const proximity = Math.max(0, 1 - dist / 140);
        const size = 2 + proximity * 2.5;
        const alpha = 0.08 + proximity * 0.5;
        ctx.fillStyle = `rgba(${accent}, ${alpha})`;
        ctx.fillRect(x, y, size, size);
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerLeave = () => {
      pointer = { x: -9999, y: -9999 };
    };

    resize();
    if (reducedMotion) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
