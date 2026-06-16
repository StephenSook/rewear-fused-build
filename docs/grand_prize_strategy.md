# REWEAR-FUSED · Grand-Prize Strategy (honest) + Engine B de-novo run-book

Written 2026-06-16. The grand prize (Cox judges) rewards the "shouldn't be possible" reaction. This is how we win it WITHOUT crossing the honesty line that sank APEX.

## The hard constraint (non-negotiable)
We CANNOT claim a de-novo carbamate hydrolase (FoldSeek TM < 0.5, no prior art) unless we actually produce one. Pravin's Engine B delivered the **LigandMPNN-redesign fallback** (TM ~0.8 to 6EQE / 7SH6 / 1TCA), which the handoff explicitly defines as the fallback for when RFdiffusion2 does not converge on a valid catalytic de-novo fold. A judge opening `designs.json` sees TM 0.85; faking TM < 0.5 there ends the run. The honesty moat is the differentiator.

## How we win the grand prize HONESTLY: the co-design LOOP is the "shouldn't be possible"
The grand-prize moment is NOT only the enzyme. It is the **closed co-design loop**, and that is genuinely novel:
- **Flag 3 (verified open as of June 2026): the joint co-design loop has not been demonstrated for textile fibers.** Designing a cleavable fiber AND its matched enzyme *together* so a non-recyclable garment becomes recyclable, is the first-of-its-kind move. We demonstrate it LIVE on real data.
- It is **wired and real, not a concept**: live Engine C on 631 real CPSC recalls, a real RDKit fiber screen (612 -> 487 -> 23 -> 10), three real engineered hydrolases with repositioned Ser-His-Asp triads and real PLACER metrics, the closed loop animated, all on a public URL.
- The engineered redesign is itself a real result: existing urethanases need pH 10; we engineered a near-neutral-pH (7.0-8.5) carbamate-cleaving triad. That is a real contribution, honestly a redesign not a de-novo fold.

**Pitch the grand prize on the LOOP:** "No one has co-designed a cleavable fiber and its matched enzyme together for textiles. Here it closes, live, on real data. The de-novo enzyme is our next swing; what runs today is a real engineered redesign and a real working passport." Honest + strong + defensible under inspection.

## The de-novo UPSIDE: the only legitimate way to reclaim the de-novo claim (Pravin's GPU, or any GPU)
If we land a real de-novo fold (TM < 0.5) tonight, we ADD the Flag-1 grand-prize claim. It needs GPU compute Claude Code cannot run locally (no CUDA here, no protein-design service available). Run-book, grounded in `docs/pravin_handoff.md` §1:

1. **GPU:** RunPod H100/B200 (Pravin owns the account, D6). Budget ~$300-500. Reality: this is frontier work and may not converge by the deadline; the fallback already shipped is the honest floor.
2. **Theozyme (the design target):** re-anchor on the UMG-SP2 QM/MM transition-state geometry from `8WDW` (apo + PMS/BBC-bound; fallback `9FVF` UMG-SP3 product-bound). Extract the reaction-coordinate geometry: oxyanion hole (~2.8 A N-H...O=C), nucleophile-base-acid Ser-His-Asp spacing. Submit THAT as the atom-level constraint (a designed re-anchoring, not a copy of the wild type).
3. **Backbone:** RFdiffusion2 (default, MIT, RosettaCommons/RFdiffusion2), theozyme-anchored, atom-level active-site scaffolding. RFdiffusion3 only if you need ligand co-generation.
4. **Sequence:** LigandMPNN over the de-novo backbone (Ser-His-Asp near-neutral triad).
5. **Cheap filter:** ESMFold; then **Boltz-2** refold + affinity (rank only; do not over-claim a Boltz number).
6. **Validate (the gate):** PLACER 50-model ensembles -> preorganization fraction on the Lauko thresholds (pLDDT > 80 / active-site > 90, catalytic-Ca RMSD < 1.0 A, scRMSD < 2.0 A). **FoldSeek TM < 0.5 to UMG-SP2 + the SP1/SP2/SP3 cluster = the de-novo claim.** If nothing passes BOTH gates, keep the honest redesign; do NOT relabel a redesign as de-novo.
7. **Emit to contract:** write `enzymes/designs.json` (`noveltyVerdict: "no close structural match in PDB (TM < 0.5), de novo fold"`, real `foldseekBestTM` < 0.5, full `placer{}`, `pdbPath`), pre-convert the `.pdb` -> `.bcif` (binary; `.gitattributes` now marks `*.bcif binary`), re-sign `manifest.json` ON A LF CHECKOUT (`python scripts/build_manifest.py`), validate `python scripts/validate_artifacts.py --strict`.

## Swap-in is instant (the frontend is built for it)
`frontend/src/lib/data.ts` selects the lead design by id. To promote a real de-novo design:
1. Drop the valid `enzyme-00X.bcif` into `data/artifacts/v1.0.0/pdb/` and `frontend/public/pdb/`.
2. Update `designs.json` for that id (TM < 0.5, de-novo verdict), re-sign the manifest, sync to `frontend/src/lib/artifacts/`.
3. In `data.ts`, point `leadDesign` at the de-novo id; flip the `enzyme/page` + `enzyme-detail` + `judges-ledger` copy back to de-novo framing (one clause each), and the pitch Beat 4 / Q4.
4. `vercel --prod`, Playwright-verify, done. Reclaims the Flag-1 grand-prize claim honestly.

## What NOT to do
Do not fabricate a `.bcif` or a TM number. Do not relabel the redesign as de-novo. Do not claim "no prior art" for the redesigned enzyme (claim it for the co-design LOOP, which is true). The redesign + the live loop is a strong, honest grand-prize entry; a faked de-novo is a disqualified one.
