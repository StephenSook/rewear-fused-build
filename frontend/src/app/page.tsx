import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BeveledBox, MonoLabel, InSilicoBadge } from "@/components/instrument";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24">
      <MonoLabel>Cox Play With Purpose · Carter&apos;s Making &amp; Remaking</MonoLabel>

      <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-7xl">
        Safe to wear,
        <br />
        <span className="text-accent-fiber">able to be</span>{" "}
        <span className="text-accent-bio">remade.</span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-fg-muted">
        REWEAR-FUSED co-designs a new cleavable elastane fiber and the matched
        enzyme that closes its loop, so a worn onesie can become a onesie again
        instead of insulation and pet bedding.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <BeveledBox accent="fiber" className="p-5">
          <MonoLabel>Wall 1</MonoLabel>
          <p className="mt-2 text-sm">
            Carter&apos;s cannot prove recovered fabric is chemically safe for
            infant skin.
          </p>
        </BeveledBox>
        <BeveledBox accent="bio" className="p-5">
          <MonoLabel>Wall 2</MonoLabel>
          <p className="mt-2 text-sm">
            Carter&apos;s cannot break down the elastane in every stretch garment.
          </p>
        </BeveledBox>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <Link
          href="/passport"
          className="group inline-flex items-center gap-3 border border-accent-bio/50 bg-accent-bio/10 px-6 py-3 font-mono text-xs tracking-widest uppercase text-accent-bio transition-colors hover:bg-accent-bio/20"
        >
          Open the Recyclability Passport
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/enzyme"
          className="group inline-flex items-center gap-3 border border-accent-fiber/40 px-6 py-3 font-mono text-xs tracking-widest uppercase text-accent-fiber transition-colors hover:bg-accent-fiber/10"
        >
          See the designed enzyme
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <InSilicoBadge />
      </div>

      <p className="mt-16 font-display text-xl text-fg-muted">
        Neither the molecule nor the enzyme existed 72 hours ago.
      </p>
    </main>
  );
}
