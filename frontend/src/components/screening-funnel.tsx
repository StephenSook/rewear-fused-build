"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "motion/react";
import { engineA } from "@/lib/data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * A number that counts up to its value as it scrolls into view, in sync with
 * the funnel bar fill. The tween writes textContent directly through the ref,
 * so the animation never triggers a React re-render per frame. Collapses to the
 * final value instantly under prefers-reduced-motion.
 */
function CountUp({ to, delay }: { to: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.textContent = to.toLocaleString();
      return;
    }
    const controls = animate(0, to, {
      duration: 0.9,
      delay,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, to, delay]);

  return (
    <span ref={ref} className="font-mono text-sm tabular-nums">
      0
    </span>
  );
}

/** Constraint-guided screening funnel: enumerated to scored to filtered to top. */
export function ScreeningFunnel() {
  const s = engineA.screening;
  const stages = [
    { label: "Enumerated", count: s.enumeratedCount },
    { label: "Scored", count: s.scoredCount },
    { label: "Filtered", count: s.filteredCount },
    { label: "Top candidate", count: s.topCandidateIds.length },
  ];
  const max = stages[0].count;
  const width = (c: number) => Math.max(0.08, Math.log(c + 1) / Math.log(max + 1));

  return (
    <div className="space-y-2">
      {stages.map((st, i) => {
        const last = i === stages.length - 1;
        return (
          <div key={st.label} className="relative h-11">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${width(st.count) * 100}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="h-full border border-rule"
              style={{
                background: last
                  ? "oklch(0.83 0.18 175 / 0.2)"
                  : "oklch(0.74 0.17 45 / 0.12)",
                borderColor: last ? "oklch(0.83 0.18 175 / 0.5)" : undefined,
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
              <span className="mono-label">{st.label}</span>
              <CountUp to={st.count} delay={i * 0.12} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
