"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useInView } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { BeveledBox, MonoLabel, InSilicoBadge } from "./instrument";
import { BeveledButton } from "./beveled-button";
import { storyProgress, storyPointer } from "./story-signals";

const StoryScene = dynamic(() => import("./story-scene"), { ssr: false });

/** A pinned scroll beat: a tall section whose inner panel sticks for half its height. */
function Beat({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className="relative h-[150vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
        {/* soft scrim so copy stays legible over the live particle scene */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 56% 54% at 50% 50%, rgba(15,19,25,0.82), rgba(15,19,25,0.3) 48%, transparent 74%)",
          }}
        />
        <div className={`relative z-10 flex w-full flex-col items-center ${className ?? ""}`}>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Count-up statistic, fires once when its panel scrolls into view. */
function Stat({
  value,
  suffix = "",
  label,
  source,
}: {
  value: number;
  suffix?: string;
  label: string;
  source: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const DUR = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DUR);
      setN(Math.round(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref}>
      <div className="font-display text-5xl tabular-nums sm:text-6xl">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-fg-muted">{label}</div>
      <div className="mono-label mt-1">{source}</div>
    </div>
  );
}

export function StoryExperience() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      storyProgress.value = total > 0 ? scrolled / total : 0;
    };
    const onPointer = (e: PointerEvent) => {
      storyPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      storyPointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <>
      <StoryScene />

      <div ref={trackRef} className="relative z-10">
        {/* 01 — hero */}
        <Beat>
          <MonoLabel>Cox Play With Purpose · Carter&apos;s Making &amp; Remaking</MonoLabel>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] sm:text-8xl">
            Safe to wear,
            <br />
            <span className="text-accent-fiber">able to be</span>{" "}
            <span className="text-accent-bio">remade.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-fg-muted">
            A single computational co-design loop that closes the recycling loop on
            children&apos;s stretch apparel.
          </p>
          <div className="mono-label mt-14 flex items-center gap-2">
            <ArrowDown className="h-4 w-4 animate-bounce" /> scroll
          </div>
        </Beat>

        {/* 02 — the downcycle reality */}
        <Beat>
          <MonoLabel>01 — The reality</MonoLabel>
          <p className="mt-6 max-w-3xl font-display text-3xl leading-snug sm:text-5xl">
            Carter&apos;s already collects worn baby clothes, then shreds them into
            insulation and pet bedding.
          </p>
          <p className="mt-6 max-w-2xl text-fg-muted">
            Two walls stop a onesie from ever becoming a onesie again.
          </p>
        </Beat>

        {/* 03 — the two walls */}
        <Beat>
          <div className="w-full max-w-5xl">
            <MonoLabel>02 — The two walls</MonoLabel>
            <div className="mt-6 grid gap-6 text-left md:grid-cols-2">
              <BeveledBox accent="fiber" className="h-full p-8">
                <MonoLabel>Wall 1</MonoLabel>
                <p className="mt-4 font-display text-2xl">Chemical safety</p>
                <p className="mt-3 text-fg-muted">
                  Carter&apos;s cannot prove the recovered fabric is chemically safe for
                  infant skin.
                </p>
              </BeveledBox>
              <BeveledBox accent="bio" className="h-full p-8">
                <MonoLabel>Wall 2</MonoLabel>
                <p className="mt-4 font-display text-2xl">Elastane</p>
                <p className="mt-3 text-fg-muted">
                  Carter&apos;s cannot break down the elastane woven into every stretch
                  garment.
                </p>
              </BeveledBox>
            </div>
          </div>
        </Beat>

        {/* 04 — the stats */}
        <Beat>
          <BeveledBox className="w-full max-w-5xl p-10">
            <MonoLabel>03 — The scale</MonoLabel>
            <div className="mt-8 grid gap-12 text-left sm:grid-cols-2 lg:grid-cols-4">
              <Stat value={92} suffix="M" label="tonnes of textile waste per year" source="UNEP 2025" />
              <Stat value={80} suffix="%" label="of all clothing contains elastane" source="Fashion for Good" />
              <Stat value={1} suffix="%" label="of it makes a recycler reject the whole garment" source="Fashion for Good" />
              <Stat value={1} suffix="%" label="of garments are recycled fiber-to-fiber" source="McKinsey" />
            </div>
          </BeveledBox>
        </Beat>

        {/* 05 — the thesis */}
        <Beat>
          <MonoLabel>04 — The thesis</MonoLabel>
          <p className="mt-6 max-w-3xl font-display text-3xl leading-snug sm:text-5xl">
            Do not attack today&apos;s elastane. Co-design a new{" "}
            <Link href="/fiber" className="text-accent-fiber underline-offset-4 hover:underline">
              cleavable fiber
            </Link>{" "}
            and the matched{" "}
            <Link href="/enzyme" className="text-accent-bio underline-offset-4 hover:underline">
              enzyme
            </Link>{" "}
            that closes its loop.
          </p>
          <div className="mt-8">
            <InSilicoBadge />
          </div>
        </Beat>

        {/* 06 — closing */}
        <Beat>
          <p className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            Neither the molecule nor the enzyme existed 72 hours ago.
          </p>
          <div className="mt-10">
            <BeveledButton href="/loop" accent="bio">
              Watch the loop close
            </BeveledButton>
          </div>
        </Beat>
      </div>
    </>
  );
}
