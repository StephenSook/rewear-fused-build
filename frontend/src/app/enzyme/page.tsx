import Link from "next/link";
import { ArrowLeft, ArrowRight, DownloadSimple, Check } from "@phosphor-icons/react/dist/ssr";
import { BeveledBox, MonoLabel, InSilicoBadge } from "@/components/instrument";
import { EnzymeStage } from "@/components/enzyme-stage";
import { engineB, pair } from "@/lib/data";

export const metadata = {
  title: "De Novo Carbamate Hydrolase — REWEAR-FUSED",
};

const REFERENCE_PDB = "/pdb/reference-hydrolase-1tca.pdb";

function Metric({
  label,
  value,
  pass,
  threshold,
}: {
  label: string;
  value: string;
  pass?: boolean;
  threshold?: string;
}) {
  return (
    <div className="border-b border-rule/50 pb-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="mono-label">{label}</span>
        <span className="font-mono text-sm tabular-nums">{value}</span>
      </div>
      {threshold && (
        <div className="mt-1 flex items-center gap-1.5 font-mono text-[0.6rem] text-fg-muted">
          {pass && <Check weight="bold" className="h-3 w-3 text-pass" />}
          {threshold}
        </div>
      )}
    </div>
  );
}

export default function EnzymePage() {
  const d = engineB.design;
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <Link
        href="/passport"
        className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Passport
      </Link>

      <header className="mt-6 mb-8">
        <MonoLabel>Engine B · de novo design · the grand-prize moment</MonoLabel>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          De Novo Carbamate Hydrolase
        </h1>
        <p className="mt-4 max-w-2xl text-fg-muted">
          An enzyme designed from scratch to cleave the carbamate bond in the
          matched fiber. Anchored on the published UMG-SP2 transition-state
          geometry, re-engineered to a near-neutral Ser-His-Asp triad.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <EnzymeStage url={REFERENCE_PDB} />
          <p className="mt-3 font-mono text-[0.65rem] text-fg-muted">
            Reference serine-hydrolase scaffold (CALB, PDB 1TCA) shown as a
            placeholder. The designed structure replaces it at the artifact-freeze
            gate. Drag to rotate.
          </p>
        </div>

        <div className="space-y-5">
          <BeveledBox accent="bio" className="p-5">
            <MonoLabel>Catalytic triad</MonoLabel>
            <p className="mt-2 font-display text-xl">{d.catalyticTriad}</p>
            <p className="mt-1 text-sm text-fg-muted">
              engineered, near-neutral pH {d.pHOptimum[0].toFixed(1)} to{" "}
              {d.pHOptimum[1].toFixed(1)}, cotton-compatible
            </p>
          </BeveledBox>

          <BeveledBox className="p-5">
            <div className="flex items-baseline justify-between">
              <MonoLabel>PLACER preorganization</MonoLabel>
              <span className="font-mono text-2xl tabular-nums text-accent-bio">
                {d.placer.preorganizationFraction.toFixed(2)}
                <span className="text-sm text-fg-muted">
                  {" "}
                  ± {d.placer.uncertainty.toFixed(2)}
                </span>
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <Metric
                label="pLDDT (protein)"
                value={String(d.placer.plddt)}
                pass={d.placer.plddt > 80}
                threshold="Lauko: > 80"
              />
              <Metric
                label="pLDDT (active site)"
                value={String(d.placer.plddtActiveSite)}
                pass={d.placer.plddtActiveSite > 90}
                threshold="Lauko: > 90"
              />
              <Metric
                label="catalytic Cα RMSD"
                value={`${d.placer.catalyticCaRmsd.toFixed(1)} Å`}
                pass={d.placer.catalyticCaRmsd < 1.0}
                threshold="Lauko: < 1.0 Å"
              />
              <Metric
                label="self-consistency RMSD"
                value={`${d.placer.scRmsd.toFixed(1)} Å`}
                pass={d.placer.scRmsd < 2.0}
                threshold="Lauko: < 2.0 Å"
              />
            </div>
          </BeveledBox>

          <BeveledBox className="p-5">
            <MonoLabel>FoldSeek novelty</MonoLabel>
            <p className="mt-2 text-sm">{d.noveltyVerdict}</p>
            <p className="mt-1 font-mono text-[0.65rem] text-fg-muted">
              best TM-score {d.foldseekBestTM.toFixed(2)}
            </p>
          </BeveledBox>

          <BeveledBox accent="fiber" className="p-5">
            <MonoLabel>Matched pair</MonoLabel>
            <p className="mt-2 text-sm">{pair.narrative}</p>
            <p className="mt-1 font-mono text-[0.65rem] text-fg-muted">
              {pair.enzyme_match}
            </p>
          </BeveledBox>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={REFERENCE_PDB}
              download
              className="inline-flex items-center gap-2 border border-rule px-4 py-2 font-mono text-xs tracking-widest uppercase text-fg-muted transition-colors hover:text-fg"
            >
              <DownloadSimple className="h-4 w-4" /> Structure .pdb
            </a>
            <InSilicoBadge />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <Link
          href="/passport"
          className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase text-accent-bio"
        >
          Back to the passport
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </main>
  );
}
