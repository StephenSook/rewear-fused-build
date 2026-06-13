# Demo video + pitch script (for the June 16 11:59pm DevPost capture)

Target length ~4 minutes (DevPost allows 1 to 5). Real screen captures of the deployed app are the PRIMARY evidence; generated media is garnish only. Honest TRL 2-3 framing throughout; the in-silico badge stays visible. No fictional persona, no synthetic data.

## The spine (every beat serves this)
"Carter's, here is the molecule for your next onesie, and here is the enzyme that closes its loop. Neither existed 72 hours ago." Safe to wear, able to be remade.

## 4-minute beat sheet

| t | View (real capture) | On screen | Narration (verbatim) |
|---|---------------------|-----------|----------------------|
| 0:00-0:25 | VIEW 1 `/` | Loader resolves, scroll the hero into the two walls and the stats counting up | "Carter's collects worn baby clothes, then shreds them into insulation and pet bedding. Two walls stop a onesie from becoming a onesie again: they can't prove the fabric is chemically safe, and they can't break down the elastane. Elastane is in 80% of clothing, and 1% of it makes a recycler reject the whole garment." |
| 0:25-1:10 | VIEW 2 `/passport` | Select the legging, show the clear/lab-test/divert router with the real citations, scan the GS1 QR live | "Engine C is the part Carter's can deploy in Year 1. It routes each garment against real US and EU regulation, CPSIA, California PFAS law, REACH, OEKO-TEX, and emits a scannable EU Digital Product Passport. Under SB 707 it is a fee-reducing compliance asset, not a nice-to-have." |
| 1:10-1:55 | VIEW 3 `/fiber` | The screening funnel, the candidate card with every constraint checked, the trade-off curve, the handoff card | "We don't invent a polymer. We screen published monomers, aliphatic only so nothing carcinogenic comes off near a baby, and put the cleavable bond in the soft segment so the stretch survives. The trade-off curve is the honesty: there is a real 25 to 35 percent design window. The winning fiber emits its carbamate as the enzyme's target." |
| 1:55-2:45 | VIEW 4 `/enzyme` | The Mol* enzyme rotating (drag), the Ser-His-Asp triad highlighted, the PLACER metric and FoldSeek badge | "Engine B is an enzyme designed from scratch to cleave that exact bond, with an engineered near-neutral Ser-His-Asp triad so it does not destroy the companion cotton. PLACER preorganization 0.67 on the Lauko thresholds; FoldSeek says no close match in the PDB. This is in-silico, TRL 2-3, and we say so." |
| 2:45-3:30 | VIEW 5 `/loop` | Scroll-drive the storm: onesie, cleavage flash, monomers, new onesie; then the Today-vs-REWEAR comparison | "Watch the loop close. Today's onesie, the carbamate cleaves, it depolymerizes to recoverable monomers, and re-spins into a new onesie. We replace the ocean-microplastic-shedding fate with a controlled industrial hydrolysis fate." |
| 3:30-4:00 | VIEW 5 footer | The closing cards | "We're the Nexus Circular of textiles, the exact shape Cox bet 150 million dollars on. License to an incumbent, 2030 to 2032. The ask: 10 thousand dollars and 6 weeks to wet-lab-validate, file a provisional, and pilot one Carter's SKU. Carter's, here is the molecule for your next onesie, and here is the enzyme that closes its loop. Neither existed 72 hours ago." |

## Shot list (capture order, all from the DEPLOYED url in a clean browser profile)
1. `/` full scroll-through (loader to closing), slow, ~25s. Capture the stat count-up.
2. `/passport` select each garment; lab-test on the legging; phone scans the QR on camera (the strongest single moment).
3. `/fiber` scroll: funnel animates, candidate card, the 3D fiber drag, the trade-off curve in view.
4. `/enzyme` drag the molecule a half-turn, hover the triad, the metric panel.
5. `/loop` slow scroll start to finish so the storm morphs through all phases; then the comparison + footer.
- Record 4K/60 in OBS. Keep one continuous take per view; trim later.

## Recording + asset discipline
- Real screen captures are the evidence. Do not "enhance" them through a generative video model (that regenerates frames = synthetic evidence). A deterministic 4K upscale before upload is fine.
- Narration: ElevenLabs via Kie AI, two-pass loudnorm to -16 LUFS, captions ON. Place audio cues on measured pauses.
- Optional garnish only: a Kie AI / Kling B-roll opener of fabric or molecules, clearly not presented as product footage. Keep under ~5 seconds total.
- Verify the final link plays in incognito before submitting.

## Q&A defense (have these reflexive for Demo Day, June 17)
- "Did you make a real enzyme/fiber?" In-silico designs with benchmark-referenced metrics; we label predicted vs validated. Honesty is the shield.
- "Toxic byproducts?" Aliphatic isocyanate design, aromatic amine release NONE (the green check on the passport).
- "pH 10 destroys the cotton?" We engineer a near-neutral Ser-His-Asp triad, not the wild-type lysine triad.
- "Does cleavability kill the stretch?" The bond is in the amorphous soft segment; the trade-off curve shows the 25-35 window holds >=400% elongation.
- "Is AI really generating a copolymer?" Constraint-guided screening, not generative invention; the funnel shows enumerate to score to filter.
- "Isn't this two projects?" One inverse-design loop; the substrate-handoff arrow from the fiber to the enzyme is the proof.
- "Will Carter's pay?" They already pay TerraCycle to downcycle into pet bedding. We replace that line item with a fiber-to-fiber loop plus an SB 707 / EU DPP compliance asset.
