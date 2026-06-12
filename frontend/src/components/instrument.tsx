import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Decision } from "@/lib/types";

/** Beveled instrument panel with corner ticks. The hubtown-derived chrome. */
export function BeveledBox({
  children,
  className,
  accent = "none",
}: {
  children: ReactNode;
  className?: string;
  accent?: "bio" | "fiber" | "none";
}) {
  const tick =
    accent === "bio"
      ? "bg-accent-bio"
      : accent === "fiber"
        ? "bg-accent-fiber"
        : "bg-fg-muted";
  return (
    <div
      className={cn(
        "relative border border-rule bg-bg-elevated/60 backdrop-blur-sm",
        className,
      )}
    >
      <span className={cn("absolute -top-px -left-px h-2 w-2", tick)} />
      <span className={cn("absolute -top-px -right-px h-2 w-2", tick)} />
      <span className={cn("absolute -bottom-px -left-px h-2 w-2", tick)} />
      <span className={cn("absolute -bottom-px -right-px h-2 w-2", tick)} />
      {children}
    </div>
  );
}

/** Monospace micro-label / section eyebrow. */
export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("mono-label", className)}>{children}</span>;
}

/** Persistent honesty badge for any predicted-property surface. */
export function InSilicoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1.5 border border-rule px-2 py-1 text-fg-muted",
        className,
      )}
      title="Every value is an in-silico design with benchmark-referenced metrics. Wet-lab validation required."
    >
      <span className="h-1.5 w-1.5 rounded-full bg-warn" />
      in-silico · TRL 2-3
    </span>
  );
}

const DECISION_META: Record<
  Decision,
  { label: string; text: string; border: string; dot: string }
> = {
  clear: { label: "CLEAR", text: "text-pass", border: "border-pass/40", dot: "bg-pass" },
  "lab-test": { label: "LAB-TEST", text: "text-warn", border: "border-warn/40", dot: "bg-warn" },
  divert: { label: "DIVERT", text: "text-fail", border: "border-fail/40", dot: "bg-fail" },
};

export function DecisionBadge({ decision }: { decision: Decision }) {
  const m = DECISION_META[decision];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs tracking-widest uppercase",
        m.text,
        m.border,
      )}
    >
      <span className={cn("h-2 w-2", m.dot)} />
      {m.label}
    </span>
  );
}
