"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Per-element 3D tilt + magnetic pull + glare on hover — the premium instrument
 * feel. The element rotates toward the cursor in perspective, drifts magnetically
 * after it, and a soft accent glare tracks the pointer; on leave it springs back
 * with an elastic ease. Eased with GSAP quickTo (snappy, allocation-free). The
 * hubtown reference drives its 3D in WebGL; for our DOM instrument chrome this is
 * the right, lightweight equivalent. Collapses to nothing under reduced-motion.
 */
export function Tilt3D({
  children,
  className,
  maxTilt = 8,
  magnetic = 0.12,
  perspective = 900,
  glare = true,
  accent = "bio",
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  magnetic?: number;
  perspective?: number;
  glare?: boolean;
  accent?: "bio" | "fiber";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    gsap.set(node, { transformPerspective: perspective, transformStyle: "preserve-3d" });
    const rX = gsap.quickTo(node, "rotationX", { duration: 0.4, ease: "power3.out" });
    const rY = gsap.quickTo(node, "rotationY", { duration: 0.4, ease: "power3.out" });
    const tX = gsap.quickTo(node, "x", { duration: 0.45, ease: "power3.out" });
    const tY = gsap.quickTo(node, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height; // 0..1
      rY((px - 0.5) * maxTilt * 2);
      rX((py - 0.5) * -maxTilt * 2);
      tX((px - 0.5) * r.width * magnetic);
      tY((py - 0.5) * r.height * magnetic);
      node.style.setProperty("--mx", `${px * 100}%`);
      node.style.setProperty("--my", `${py * 100}%`);
    };
    const onLeave = () => {
      gsap.to(node, { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, maxTilt, magnetic, perspective]);

  const glareColor =
    accent === "fiber" ? "oklch(0.74 0.17 45 / 0.22)" : "oklch(0.83 0.18 175 / 0.22)";

  return (
    <div ref={ref} className={cn("group/tilt relative [will-change:transform]", className)}>
      {children}
      {glare && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${glareColor}, transparent 65%)`,
          }}
        />
      )}
    </div>
  );
}
