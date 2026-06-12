# REWEAR-FUSED

**Safe to wear, able to be remade.**

REWEAR-FUSED closes the textile-to-textile recycling loop on children's stretch apparel. Today, garments collected through take-back programs get shredded into insulation and pet bedding because two walls stop a onesie from becoming a onesie again: nobody can prove the recovered fabric is chemically safe for infant skin, and nobody can break down the elastane woven into every stretch garment.

REWEAR-FUSED is a single computational co-design loop that knocks down both walls:

- **Engine A — Cleavable Elastane Design.** Constraint-guided virtual screening of polyurethane-urea chemical space that emits a new, enzymatically-cleavable elastane fiber target (aliphatic isocyanate chemistry, cleavable bond in the amorphous soft segment).
- **Engine B — De Novo Carbamate Hydrolase.** A protein designed from scratch (RFdiffusion to LigandMPNN to Boltz-2 to PLACER to FoldSeek) to cleave the carbamate bond in Engine A's fiber, anchored on the published UMG-SP2 transition-state geometry.
- **Engine C — Digital Recyclability Passport.** A deployable chemical-compliance + EU-Digital-Product-Passport layer that routes recovered garments (clear / lab-test / divert) against US and EU regulation and emits a scannable GS1 Digital Link passport.

Built for the Cox Enterprises "Play With Purpose" Sustainability Hackathon, Carter's "Making & Remaking" track.

## Honesty statement (TRL 2-3)

Everything REWEAR-FUSED produces is an **in-silico design with benchmark-referenced metrics**, not a wet-lab-validated material or enzyme. Every number in this product traces to a real pipeline output or a verified citation. Predicted-property panels carry a persistent "wet-lab validation required" badge. Engine C trains on real public datasets only. No fictional personas, no synthetic data in the demo.

## Architecture

```
frontend/    Next.js 16 + React 19 + Mol* + R3F galaxy-tier 3D interface (the 5 views)
backend/     Engines A + B molecular pipelines + FastAPI artifact server
engine-c/    Compliance classifier + Digital Product Passport + data ETL
data/        Versioned, signed artifact bundle (real pipeline outputs the frontend reads)
docs/        Architecture, handoffs, demo script, ADRs
```

The frontend never depends on a live GPU job. The backend and Engine C ship pre-computed, SHA-256-signed artifacts that the deployed site renders through real code. Engine C also runs as a live FastAPI endpoint so a judge clicking the deployed link gets a real classification.

## Develop

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend / Engine C
cd backend  && python -m venv .venv && source .venv/bin/activate && pip install -e .
cd engine-c && python -m venv .venv && source .venv/bin/activate && pip install -e .
```

See `PLAN.md` for the team coordination system and `CLAUDE.md` for the full build specification.

## License

Apache-2.0. See `LICENSE`.
