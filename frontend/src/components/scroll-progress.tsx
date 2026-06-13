"use client";

import { useEffect, useState } from "react";

/**
 * Faded bottom progress bar that fills as the page scrolls, hubtown's footer
 * indicator. Global (mounted in the Shell) so every view shows reading depth.
 * Reads native scroll via rAF so it stays in sync with Lenis smoothing.
 */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-40 h-px w-full bg-fg/5">
      <div
        className="h-full bg-accent-bio/60 transition-[width] duration-150 ease-out"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}
