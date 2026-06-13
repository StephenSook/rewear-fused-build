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
| 1.6 | VIEW 5 Closed loop (GPU particles) | frontend/src/components, app/loop | Stephen | ✅ | 1.4,1.5 | 90k-particle scroll-scrubbed storm; onesie->cleavage->monomers->new onesie; Playwright-verified across 3 states, 0 errors |
| 1.7 | VIEW 1 Story cold-open | frontend/src/app/page.tsx | Stephen | ✅ | 1.6 | scroll story + stat count-up; Playwright-verified |
| 1.8 | Scroll shell (Lenis, loader, nav rail, sound) | frontend/src/components | Stephen | ✅ | - | global; loop regression-checked under Lenis |
| 1.9 | Garment archetype thumbnails (Kie AI) | frontend/public/archetypes | Stephen | ✅ | 1.3 | nano-banana stills wired into the passport |
| 2.1 | Engine B pipeline | backend/engine_b | Pravin | ⬜ | 0.4 | RFdiffusion->...->FoldSeek |
| 2.2 | Engine A screening | engine-a/ (RDKit) | Stephen→Pravin | 🟡 | 0.4 | Stephen building real RDKit reference impl 2026-06-12 pre-kickoff (CPU-feasible); → Pravin to own/extend at kickoff |
| 2.3 | GPU pre-flight smoke | backend/scripts | Pravin | ⬜ | - | before June 14 |
| 2.4 | Artifact server + manifest | backend/api | Pravin | ⬜ | 2.1,2.2 | SHA-256 signed |
| 3.1 | Engine C data ETL | engine-c/ingest | Stephen→Vinh | ✅ | 0.4 | 631 real CPSC recalls ingested + labeled (flammability 206, drawstring 142, lead 12); → Vinh to extend (Safety Gate, PFAS) |
| 3.2 | Compliance classifier | engine-c/classifier | Stephen→Vinh | ✅ | 3.1 | deterministic rules + per-label CatBoost, honest CV PR-AUC (flammability 0.99 product-type signal, lead 0.25 — ROC 0.89 lies on rare positives); 10 tests pass; → Vinh |
| 3.3 | Passport (VC + GS1 + QR) | engine-c/passport | Stephen→Vinh | ✅ | 3.2 | real DPP emitter: W3C VC 2.0 + real Ed25519 (did:key) + GS1 Digital Link; 3 signed passports; clear/lab-test/divert; → Vinh |
| 3.4 | Live endpoint + keepalive | engine-c/api | Stephen→Vinh | 🟡 | 3.2 | /classify + /passport serve real model output (TestClient-verified); Render deploy + keepalive cron pending; → Vinh |
| 4.1 | Wire frontend to real artifacts | frontend, data | Stephen | 🟡 | 3.3 | Engine C compliance wired to real signed bundle (passport router verified, 0 errors); Engine A/B still in-silico until their pipelines run |
| 4.2 | Deploy (June 14 fresh repo) | infra | all | ⬜ | 1.3 | Vercel + Render + secrets |
| 4.3 | Playwright golden-path (deployed) | frontend/e2e | Stephen | ⬜ | 4.2 | incognito smoke |
| 4.4 | Demo video | docs | all | ⬜ | 4.3 | June 16, captioned, <5min |

## Live build log

- **2026-06-12 (Stephen):** Frontend fully maximized + verified on the prod webpack build (all 5 views, 0 console errors): Story cursor-3D + close burst, Enzyme Mol* + PLACER, Fiber selective-Bloom + count-up funnel, Passport live classify-to-verdict router + QR scan reticle, Loop instrument stepper + cleavage glow. Global systems: Web Audio engine, route transitions, shared Reveal choreography, skip-link + focus rings, reduced-motion across all 3D.
- **2026-06-12 (Stephen, directive from owner):** Make the data REAL now, kill all `placeholder:true`. Taking on Engine C (3.1-3.4) + Engine A (2.2) as real reference implementations pre-kickoff so the demo runs on real data, not mocks. CPSC Recalls API verified reachable (live JSON, 805+ children's records). engine-c venv built: rdkit 2026.03.3, catboost 1.2.10, sklearn 1.9.0. → Vinh/Pravin to own/extend at kickoff. Engine B de-novo design still needs RunPod GPU (Pravin, D6); CPU parts (FoldSeek novelty) buildable here.
- **2026-06-12 (Stephen):** ✅ Engine C is REAL end-to-end (commits 5509c74, 9f5c7d2). 631 live CPSC recalls → labeled → per-label CatBoost (label-keywords stripped so it can't cheat) → honest CV PR-AUC (flammability 0.99, drawstring 0.96, lead 0.25). Deterministic rule layer routes clear/lab-test/divert from real fiber composition; bodysuit clear, legging lab-test (5% elastane ESPR flag), rashguard divert (18% elastane FAIL + PFAS flag). Real W3C VC 2.0 passports, Ed25519-signed, GS1 Digital Link. Live /classify + /passport verified. Frontend wired to the real signed bundle (placeholder numbers GONE); passport router verified in-browser, prod webpack build green. The research PDF's synthetic-SKU population was REJECTED per the no-synthetic-data rule. NEXT: Engine A (RDKit screening, real candidate + funnel), then Render deploy + keepalive (3.4), then Engine B GPU (Pravin).
- **2026-06-13 (Stephen):** Git hygiene — consolidated to ONE dev remote (`origin` → rewear-fused-build) and DELETED the stray `rewear-fused` private mirror that was causing the back-and-forth (zero unique commits; all in the canonical repo). The clean `rewear-fused` name is now free for the June-14 fresh public repo.
- **2026-06-13 (Stephen):** CI hardened + GREEN per-job on the merged SHA (commit 37e68da). FIXED two silent bugs: the engine-c job was indented outside `jobs:` (never ran) and the backend job installed a non-existent `requirements.txt` (always errored). ADDED a **golden-path** job: builds the prod webpack bundle, boots `next start`, and Playwright-walks all 5 views asserting each renders (Mol* via swiftshader flags, R3F, real Engine C data) with ZERO console errors — 5/5 pass in CI. "CI green" now means the real app boots. Lane ownership clarified in `docs/vinh_handoff.md` (Stephen's Engine C is a ~20% reference; the depth + Render deploy + pitch pack stay Vinh's; Pravin's Engine A/B untouched).
- **2026-06-13 (Stephen):** Polish + deploy-readiness (commits eae5ea8, 2e3f343, cb88eac; CI green). (1) Richer audio: a produced kie.ai Suno dark-ambient bed (45s loop, 721KB) with a reverb-fed Am(add9) synth fallback that always works offline; cleavage stays synth (ElevenLabs SFX gen 500'd twice). (2) 3D hover (Tilt3D): nav rail + sound toggle tilt toward the cursor in perspective with magnetic pull + accent glare + corner ticks, GSAP quickTo + elastic snap-back, reduced-motion safe; hubtown's real nav is WebGL raycast (verified teardown) so this is the on-brand DOM equivalent. (3) **4.2 deploy DE-RISKED**: `frontend/vercel.json` (framework nextjs, `next build --webpack`, cache headers) + `.nvmrc` 22; fired a **private Vercel preview** that BUILT (Mol* webpack on Vercel infra, ~1min) and RENDERS — verified live at the preview URL: Mol* canvas + Ser-His-Asp + PLACER + real Engine C data, 0 console errors. June-14 public deploy is now one command (`vercel --prod` from the fresh repo, Root Directory=frontend, NEXT_PUBLIC_* set).

## Timeline (UPDATED 2026-06-12 from the Cox "Know Before You Go" email)

- **Kickoff Sun June 14, 2pm-6pm** at **TSQATL Clubhouse, 848 Spring St NW** (NOT the Biltmore). Team Formation submission on DevPost by **June 14 11:59pm**.
- **Build Mon June 15 - Tue June 16** at the **Biltmore Innovation Center, 817 W Peachtree St NW** (7am-7pm, in-person optional; may work remote).
- **FINAL SUBMISSION DEADLINE: Tue June 16, 11:59pm** (submit the final project to DevPost). The schedule PDF makes this the hard deadline; the older Devpost rules text said June 17, so confirm with organizers, but PLAN for June 16 11:59pm.
- **Demo Day Wed June 17** at the Biltmore: judging 10:30-3, present in person (at least one member required). No new submission on the 17th. Winners reception 4:30-7.
- Net build window is ~58 hours (June 14 2pm to June 16 11:59pm), not 72. Front-load accordingly.

## Logistics (every team member, before/at kickoff)
- [ ] Register on the Cox form (all three: Stephen, Pravin, Vinh) with a .edu email.
- [ ] Agree to the Terms & Conditions via the **DocuSign** email (NEW requirement, each member).
- [ ] DevPost: create account, join the hackathon, confirm all members on the team, select the **Making & Remaking (Carter's)** track AND the prize categories (must opt in to be eligible).
- [ ] Join the Discord (appears as Render ATL; the Play with Purpose channels are inside).
- [ ] Pull the Google Drive files. Credits available: Cursor, Anthropic, Google.
- Judges now include Mercedes-Benz, Chick-fil-a, Inspire Brands, TedXAtlanta, plus Southern Company, Cox Farms, City of Atlanta, Delta, Carter's, gener8tor, Cox Cleantech Residency.

## Gates

- **G1 (demo floor)**: VIEW 2 passport renders end-to-end against mocks on localhost. A working demo exists.
- **G2 (mid-build, non-negotiable)**: VIEW 2 + one molecular view (VIEW 4) + a deployed URL are green. No frontier layer proceeds until G2 is green.
- **G3 (artifact-freeze, June 15 EOD, hard)**: real Engine A/B/C outputs replace mocks; manifest SHA verified; if the enzyme pipeline is not on track, the LigandMPNN-redesign fallback triggers. Deploy (fresh repo + Vercel + Render + keepalive) done by June 15 EOD too, so June 16 is integration + video + submit only.
- **G4 (submit, June 16 11:59pm, HARD)**: deployed golden-path green in incognito; demo video recorded (under 5 min, captioned); abstract + video + final project submitted to DevPost. Everything done by this deadline. June 17 is present-only.

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
- [x] **Q3:** Single dev remote (CONSOLIDATED 2026-06-13) — `origin` → github.com/StephenSook/rewear-fused-build (private); `main` tracks `origin/main`. A second private mirror `rewear-fused` was being pushed to in parallel by mistake; removed as a local remote and all commits synced into the one canonical repo. The clean `rewear-fused` name is reserved for the **June-14 fresh public repo** (D1) — do not develop against it before then. Until June 14: one repo, `rewear-fused-build`. Just `git push`.

## Secrets ownership (real values never committed; see `.env.example`)

| Secret | Owner | Lives in |
|--------|-------|----------|
| NEXT_PUBLIC_ARTIFACTS_BASE_URL / ENGINE_C_API_URL | Stephen | Vercel env |
| R2_* (Cloudflare) | Vinh | Render env + local |
| ENGINE_C_LLM_API_KEY | Vinh | Render env |
| KEEPALIVE_TARGET_URL | Vinh | GH Actions secret |
| RUNPOD_API_KEY | Pravin | local + GPU host |
| KIE_AI_API_KEY / ELEVENLABS_API_KEY | Stephen | local only (never CI) |
