import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { BeveledBox, MonoLabel, InSilicoBadge } from "@/components/instrument";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "For the judges — REWEAR-FUSED",
};

type Tier = "WIRED LIVE" | "IN-SILICO" | "REAL DATA" | "FORWARD";

const TIER_STYLE: Record<Tier, string> = {
  "WIRED LIVE": "text-pass border-pass/40",
  "REAL DATA": "text-pass border-pass/40",
  "IN-SILICO": "text-warn border-warn/40",
  FORWARD: "text-fg-muted border-rule",
};

function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 border px-2.5 py-1 font-mono text-[0.6rem] tracking-widest uppercase",
        TIER_STYLE[tier],
      )}
    >
      {tier}
    </span>
  );
}

const ITEMS: { name: string; tier: Tier; trl?: string; detail: string }[] = [
  {
    name: "Engine C — Digital Recyclability Passport",
    tier: "WIRED LIVE",
    trl: "TRL 6",
    detail:
      "A real FastAPI endpoint and a deployed UI. Deterministic rules over real US/EU thresholds plus a classifier, emitting a scannable GS1 Digital Link passport. The product Carter's could deploy in Year 1. Click the link, it works.",
  },
  {
    name: "The application (5 views)",
    tier: "WIRED LIVE",
    detail:
      "Deployed on Vercel, reading the signed artifact bundle through real rendering code. Mol* renders a real PDB; the passport QR resolves to a real GS1 URI. No hardcoded backend, no faked screens.",
  },
  {
    name: "Training + reference data",
    tier: "REAL DATA",
    detail:
      "Real public datasets only: CPSC Recalls, EU Safety Gate, Toxic-Free Future / Peaslee PFAS, OEKO-TEX negatives. Garment archetypes use real published compositions; the garment images are illustrative, not specific product photos.",
  },
  {
    name: "Engine A — Cleavable elastane",
    tier: "IN-SILICO",
    trl: "TRL 3",
    detail:
      "Constraint-guided virtual screening over published monomers (aliphatic isocyanates only; cleavable bond in the amorphous soft segment; 25-35 wt% hard). Property predictions carry benchmark-referenced confidence. This is a designed candidate, not a spun fiber.",
  },
  {
    name: "Engine B — De novo carbamate hydrolase",
    tier: "IN-SILICO",
    trl: "TRL 2",
    detail:
      "RFdiffusion to LigandMPNN to Boltz-2 to PLACER to FoldSeek. We report PLACER preorganization on the Lauko thresholds and a FoldSeek novelty verdict. The rendered structure is a reference serine-hydrolase scaffold standing in until the designed PDB lands. This is a design, not an expressed protein.",
  },
  {
    name: "Wet-lab validation",
    tier: "FORWARD",
    detail:
      "Not done, by definition of a 72-hour build. The ask: express the top enzyme designs and spin a fiber sample, prove activity on a carbamate surrogate, file a provisional, and pilot one Carter's SKU. That is what the residency funds.",
  },
];

export default function JudgesPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>

      <header className="mt-6 mb-10">
        <MonoLabel>For the judges</MonoLabel>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          What is real, what is in-silico
        </h1>
        <p className="mt-4 max-w-2xl text-fg-muted">
          Everything REWEAR-FUSED produces is an in-silico design with
          benchmark-referenced metrics, not a wet-lab-validated material or
          enzyme. Here is exactly what is wired live, what is designed in-silico,
          and what is forward work. We would rather you check than take our word.
        </p>
      </header>

      <div className="space-y-4">
        {ITEMS.map((it) => (
          <BeveledBox key={it.name} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl leading-tight">{it.name}</h2>
                {it.trl && <span className="mono-label mt-1 inline-block">{it.trl}</span>}
              </div>
              <TierBadge tier={it.tier} />
            </div>
            <p className="mt-3 text-sm text-fg-muted">{it.detail}</p>
          </BeveledBox>
        ))}
      </div>

      <BeveledBox accent="bio" className="mt-8 p-6">
        <MonoLabel>The honesty moat</MonoLabel>
        <p className="mt-3 text-sm">
          Every number on this site traces to a real pipeline output or a verified
          DOI. No fabricated citations. No synthetic data in the judged path. No
          fictional persona. The pre-computed artifacts are real outputs of real
          pipelines, frozen for demo-safety and SHA-256 signed; Engine C also runs
          live. If a claim is in-silico, the in-silico badge says so.
        </p>
        <div className="mt-4">
          <InSilicoBadge />
        </div>
      </BeveledBox>
    </main>
  );
}
