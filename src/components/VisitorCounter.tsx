import { useEffect, useState } from "react";

/**
 * Site-wide visit tally via Abacus (free, no auth, no backend of our own -
 * this is a static site). Hits once per browser session (sessionStorage
 * guard) rather than once per route change, since Footer stays mounted
 * across client-side navigation. Fails silently - a blocked third-party
 * request (ad-blockers, offline) should never surface as broken UI.
 */
const NAMESPACE = "pranay-portfolio-mvp03";
const KEY = "visits";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visit-counted");
    const endpoint = alreadyCounted
      ? `https://abacus.jasoncameron.dev/get/${NAMESPACE}/${KEY}`
      : `https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${KEY}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data: { value: number }) => {
        setCount(data.value);
        sessionStorage.setItem("visit-counted", "1");
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="font-pixel text-xs tracking-widest text-ink/50 uppercase">
      {count.toLocaleString()} visits
    </span>
  );
}
