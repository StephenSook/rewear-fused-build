"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const CHAPTERS = [
  { href: "/", label: "Story" },
  { href: "/fiber", label: "Fiber" },
  { href: "/enzyme", label: "Enzyme" },
  { href: "/loop", label: "Loop" },
  { href: "/passport", label: "Passport" },
];

export function NavRail() {
  const path = usePathname();
  return (
    <nav className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 sm:flex">
      {CHAPTERS.map((c) => {
        const active = c.href === "/" ? path === "/" : path.startsWith(c.href);
        return (
          <Link key={c.href} href={c.href} className="group flex items-center gap-3">
            <span
              className={cn(
                "h-2 w-2 transition-colors",
                active ? "bg-accent-bio" : "bg-fg-muted/40 group-hover:bg-fg-muted",
              )}
            />
            <span
              className={cn(
                "mono-label transition-colors",
                active ? "text-fg" : "text-fg-muted/50 group-hover:text-fg-muted",
              )}
            >
              {c.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
