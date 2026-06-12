"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { BeveledBox, MonoLabel, InSilicoBadge } from "@/components/instrument";

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
  source,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
        {prefix}
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-fg-muted">{label}</div>
      <div className="mono-label mt-1">{source}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* hero */}
      <section className="flex min-h-screen flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-5xl">
          <MonoLabel>Cox Play With Purpose · Carter&apos;s Making &amp; Remaking</MonoLabel>
          <h1 className="mt-6 font-display text-6xl leading-[0.95] sm:text-8xl">
            Safe to wear,
            <br />
            <span className="text-accent-fiber">able to be</span>{" "}
            <span className="text-accent-bio">remade.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-fg-muted">
            A single computational co-design loop that closes the recycling loop
            on children&apos;s stretch apparel.
          </p>
          <div className="mono-label mt-16 flex items-center gap-2">
            <ArrowDown className="h-4 w-4" /> scroll
          </div>
        </div>
      </section>

      {/* the downcycle reality */}
      <section className="px-6 py-40">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <MonoLabel>The reality</MonoLabel>
            <p className="mt-6 max-w-3xl font-display text-3xl leading-snug sm:text-5xl">
              Carter&apos;s already collects worn baby clothes, then shreds them
              into insulation and pet bedding.
            </p>
            <p className="mt-6 max-w-2xl text-fg-muted">
              Two walls stop a onesie from ever becoming a onesie again.
            </p>
          </Reveal>
        </div>
      </section>

      {/* the two walls */}
      <section className="px-6 pb-40">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <BeveledBox accent="fiber" className="h-full p-8">
              <MonoLabel>Wall 1</MonoLabel>
              <p className="mt-4 font-display text-2xl">Chemical safety</p>
              <p className="mt-3 text-fg-muted">
                Carter&apos;s cannot prove the recovered fabric is chemically safe
                for infant skin.
              </p>
            </BeveledBox>
          </Reveal>
          <Reveal>
            <BeveledBox accent="bio" className="h-full p-8">
              <MonoLabel>Wall 2</MonoLabel>
              <p className="mt-4 font-display text-2xl">Elastane</p>
              <p className="mt-3 text-fg-muted">
                Carter&apos;s cannot break down the elastane woven into every
                stretch garment.
              </p>
            </BeveledBox>
          </Reveal>
        </div>
      </section>

      {/* the stats */}
      <section className="border-y border-rule px-6 py-32">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={92} suffix="M" label="tonnes of textile waste per year" source="UNEP 2025" />
          <Stat value={80} suffix="%" label="of all clothing contains elastane" source="Fashion for Good" />
          <Stat value={1} suffix="%" label="of it makes a recycler reject the whole garment" source="Fashion for Good" />
          <Stat value={1} suffix="%" label="of garments are recycled fiber-to-fiber" source="McKinsey" />
        </div>
      </section>

      {/* the thesis */}
      <section className="px-6 py-40">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <MonoLabel>The thesis</MonoLabel>
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
          </Reveal>
        </div>
      </section>

      {/* closing */}
      <section className="px-6 pb-48">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Link href="/loop" className="group block">
              <p className="max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
                Neither the molecule nor the enzyme existed 72 hours ago.
              </p>
              <span className="mt-8 inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-accent-bio">
                Watch the loop close
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
