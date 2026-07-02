/**
 * Word-by-word entrance for the hero headline - the one place on the site
 * that earns a kinetic-type treatment (first thing a visitor reads).
 * Pure CSS animation (see .split-word in index.css) so it runs off the
 * main thread and is interruption-safe; reduced-motion users get the
 * final state immediately.
 */
export default function SplitText({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="split-word"
          style={{ "--word-delay": `${startDelay + i * 55}ms` } as React.CSSProperties}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
