"use client";

import { useEffect, useRef } from "react";

/**
 * Faded bottom progress bar that fills as the page scrolls, hubtown's footer
 * indicator. Global (mounted in the Shell). Drives the fill via a ref transform
 * in a rAF loop, so it never triggers a React re-render, and stays in sync with
 * the Lenis-smoothed native scroll.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const el = fillRef.current;
      if (el) el.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 z-40 h-0.5 w-full bg-fg/10">
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-accent-bio shadow-[0_0_8px_rgba(45,224,196,0.5)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
