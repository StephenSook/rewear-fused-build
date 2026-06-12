# REWEAR-FUSED — Team Coordination

Live coordination doc for Stephen (frontend + architecture), Pravin (Engines A+B), Vinh (Engine C + data/infra). Update this file on every status change. **No git hooks; manual discipline.** Read `CLAUDE.md` for the build spec and the Operating Contract.

Legend: ✅ done · 🟡 in progress · ⬜ not started · ⛔ blocked

## Commit-gated protocol (manual)

1. Before starting a task: set it 🟡, add your name + a timestamp in Notes, commit **PLAN.md only**, push. That is your lock.
2. On finish: set ✅, commit PLAN.md only, push.
3. If blocked: set ⛔ with a one-line reason.
4. Before starting ANY task: `git pull` and read this file. If someone holds 🟡 on overlapping files, coordinate first.
5. PLAN.md commits are atomic and never bundled with code. Message format: `status: [task#] [emoji] [desc]`.
6. Handoffs: add `→ [Name]` in Notes.
7. Stale-lock TTL = 4 hours. No commit on a 🟡 task in 4h means the lock is stale; ping the owner, then claim it.
8. Contract changes (anything in Shared Contracts) require a `⚠️ CONTRACT` commit prefix and a ping to every consumer before committing.
9. Lanes own non-overlapping directories: Stephen `frontend/` + `data/contract.md`, Pravin `backend/`, Vinh `engine-c/` + `data/datasets/`. Per-lane branches -> PR -> rebase-merge to `main`.

## Status

| # | Component | File(s) | Owner | Status | Deps | Notes |
|---|-----------|---------|-------|--------|------|-------|
| 0.1 | Repo relocate off iCloud | repo root | Stephen | ✅ | - | moved to ~/dev/rewear-fused |
| 0.2 | Senior-dev hygiene | .gitignore/.env.example/LICENSE/CI | Stephen | ✅ | - | done |
| 0.3 | CLAUDE.md v3 | CLAUDE.md | Stephen | ✅ | - | Operating Contract + frontier deltas |
| 0.4 | Data contract (anti-drift) | data/contract.md | Stephen | ✅ | - | authored; Pravin + Vinh to sign off |
| 0.5 | Design system | DESIGN_SYSTEM.md | Stephen | ✅ | - | tokens + instrument UI |
| 1.1 | Frontend scaffold | frontend/ | Stephen | ✅ | 0.4 | Next 16.2 + Tailwind v4 + tokens; 3D stack (Mol*/R3F/GSAP) next |
| 1.2 | Typed data layer + ALL mock fixtures | frontend/src/lib, data/ | Stephen | ✅ | 0.4 | conforms to contract; real archetypes + regs, numbers placeholdered |
| 1.3 | VIEW 2 Passport (demo floor) | frontend/src/app | Stephen | ✅ | 1.2 | G1 met: builds + runtime smoke green |
| 1.4 | VIEW 4 Enzyme (Mol*) | frontend/src/components, app/enzyme | Stephen | ✅ | 1.2 | live Mol* render verified (Playwright, 0 errors); placeholder scaffold until Engine B |
| 1.5 | VIEW 3 Fiber + trade-off curve | frontend/src/components, app/fiber | Stephen | ✅ | 1.2 | funnel + candidate + R3F architecture + trade-off curve + handoff; Playwright-verified, 0 errors |
| 1.6 | VIEW 5 Closed loop (GPU particles) | frontend/src/scenes | Stephen | ⬜ | 1.4,1.5 | emotional peak |
| 1.7 | VIEW 1 Story cold-open | frontend/src/app | Stephen | ⬜ | 1.6 | two walls |
| 2.1 | Engine B pipeline | backend/engine_b | Pravin | ⬜ | 0.4 | RFdiffusion->...->FoldSeek |
| 2.2 | Engine A screening | backend/engine_a | Pravin | ⬜ | 0.4 | RDKit + surrogates |
| 2.3 | GPU pre-flight smoke | backend/scripts | Pravin | ⬜ | - | before June 14 |
| 2.4 | Artifact server + manifest | backend/api | Pravin | ⬜ | 2.1,2.2 | SHA-256 signed |
| 3.1 | Engine C data ETL | engine-c/ingest | Vinh | ⬜ | 0.4 | CPSC/Safety Gate/PFAS/OEKO-TEX |
| 3.2 | Compliance classifier | engine-c/classifier | Vinh | ⬜ | 3.1 | rules + CatBoost, PR-AUC>=0.85 |
| 3.3 | Passport (VC + GS1 + QR) | engine-c/passport | Vinh | ⬜ | 3.2 | clear/lab-test/divert |
| 3.4 | Live endpoint + keepalive | engine-c/api | Vinh | ⬜ | 3.2 | Render, frozen model |
| 4.1 | Wire frontend to real artifacts | frontend, data | Stephen | ⬜ | 2.4,3.3 | at artifact-freeze gate |
| 4.2 | Deploy (June 14 fresh repo) | infra | all | ⬜ | 1.3 | Vercel + Render + secrets |
| 4.3 | Playwright golden-path (deployed) | frontend/e2e | Stephen | ⬜ | 4.2 | incognito smoke |
| 4.4 | Demo video | docs | all | ⬜ | 4.3 | June 16, captioned, <5min |

## Gates

- **G1 (demo floor)**: VIEW 2 passport renders end-to-end against mocks on localhost. A working demo exists.
- **G2 (mid-build, non-negotiable)**: VIEW 2 + one molecular view (VIEW 4) + a deployed URL are green. No frontier layer proceeds until G2 is green.
- **G3 (artifact-freeze, June 15 EOD, hard)**: real Engine A/B/C outputs replace mocks; manifest SHA verified; if the enzyme pipeline is not on track, the LigandMPNN-redesign fallback triggers.
- **G4 (video-freeze, June 16 midday)**: deployed golden-path green in incognito; capture the demo video.

## Shared Contracts

| Contract | Owner | Consumers | Definition |
|----------|-------|-----------|------------|
| Artifact JSON shapes | Stephen | Pravin, Vinh, frontend | `data/contract.md` — enzymes/fibers/pairs/passports field names |
| Artifact folder + manifest | Stephen | all | `data/artifacts/v1.0.0/{enzymes,fibers,pairs,passports,pdb}/` + `manifest.json` (SHA-256 per file) |
| Fiber↔enzyme match | Pravin | frontend | `pairs/topPairs.json` cross-references `fiberId` + `enzymeId` + `enzyme_match` |
| Engine C endpoint shape | Vinh | frontend | `POST /classify` returns the passport JSON in `data/contract.md` |
| Frozen model parity | Vinh | frontend | deployed endpoint serves the exact model that produced `v1.0.0` (manifest SHA) |

## Decisions

### D1 — Build now, fresh repo June 14
Build immediately in `~/dev/rewear-fused`; initialize a fresh public repo with clean event-window history on June 14. Real commits only. **Locked 2026-06-12 by Stephen.**

### D2 — Repo location
`~/dev/rewear-fused`, off iCloud, no trailing space. Never develop from Desktop/Documents. **Locked 2026-06-12 by Stephen.**

### D3 — Demo realness
Real public datasets + real Carter's product archetypes + builders demo live + recruit a real external contact (Hailes/UCL, Fashion for Good first). External quote is upside, not load-bearing. No fiction, no synthetic data in the judged path. **Locked 2026-06-12 by Stephen.**

### D4 — Track strategy
Making & Remaking (Carter's) + grand prize + Cox Cleantech Residency. No multi-track dilution. **Locked 2026-06-12 by Stephen.**

### D5 — Webpack bundler (not Turbopack)
Mol*'s module graph crashes the Turbopack production build at runtime ("module factory not available"). dev and build run `--webpack`; Mol* bundles cleanly there. Revisit Turbopack when the molstar chunking bug is fixed. **Locked 2026-06-12.**

### D6 — RunPod ownership
Pravin owns the RunPod account and the ~$300-500 weekend budget cap. **Locked 2026-06-12 by Stephen.**

### D7 — Artifact hosting
For the demo, artifacts live in `data/artifacts/` (repo-tracked) and ship as Vercel static; Cloudflare R2 is the scale path when bundles grow. **Locked 2026-06-12 by Stephen.**

## Open Questions

- [x] **Q1:** RunPod account + budget — Pravin (see D6).
- [x] **Q2:** Artifact hosting — Vercel static + repo-tracked for the demo, R2 for scale (see D7).
- [x] **Q3:** Private backup — done: github.com/StephenSook/rewear-fused-build (private), pushed; `main` tracks it.

## Secrets ownership (real values never committed; see `.env.example`)

| Secret | Owner | Lives in |
|--------|-------|----------|
| NEXT_PUBLIC_ARTIFACTS_BASE_URL / ENGINE_C_API_URL | Stephen | Vercel env |
| R2_* (Cloudflare) | Vinh | Render env + local |
| ENGINE_C_LLM_API_KEY | Vinh | Render env |
| KEEPALIVE_TARGET_URL | Vinh | GH Actions secret |
| RUNPOD_API_KEY | Pravin | local + GPU host |
| KIE_AI_API_KEY / ELEVENLABS_API_KEY | Stephen | local only (never CI) |
