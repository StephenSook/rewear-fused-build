# CLAUDE.md — REWEAR-FUSED Build Specification (v2)

> **This file is the single source of truth for Claude Code building the REWEAR-FUSED frontend and full project architecture.**
> Read this entire file before writing any code. Re-read the relevant section before starting each build phase.
> This is a 72-hour hackathon build — Cox Enterprises **"Play With Purpose" Sustainability Hackathon**, **Carter's "Making & Remaking" track**, kickoff ~June 14 2026, in-person demo **June 17 2026**, teams ≤4. The goal is the highest-possible technical and visual ceiling — a demo that produces a "this shouldn't be possible in 72 hours" reaction from expert judges, while still looking clean and premium. **Do not hold back. Do not simplify for feasibility. Build the whole thing.**
>
> **v2 changelog:** Every version number, library, model, dataset, regulatory citation, and prize/strategy fact below is now anchored to verified research (mid-2026). The frontend stack is locked to current stable releases; the backend pipeline is locked to the real de-novo-enzyme toolchain; the pitch/positioning is locked to Cox's actual investment thesis.

---

## 0. PROJECT IDENTITY

**Name:** REWEAR-FUSED
**One-line pitch:** *"Carter's — here's the molecule for your next onesie, and here's the enzyme that closes its loop. Neither existed 72 hours ago."*

**What it is:** A single computational **co-design loop** that jointly designs two matched molecules to close the textile-to-textile recycling loop on children's stretch apparel (currently non-recyclable because of its elastane/spandex content). Instead of designing one enzyme to attack *existing* elastane — a crystalline, hostile substrate that defeats every native enzyme — REWEAR-FUSED inverts the problem: it co-designs a **new, enzymatically-cleavable elastane fiber** AND the **matched de novo enzyme** that uniquely cleaves it. One inverse-design problem, two coupled variables.

**The three engines:**
- **Engine A — Cleavable Elastane Design** (constraint-guided virtual screening of polyurethane-urea chemical space). Enumerates candidate fiber compositions, scores them with property-prediction models, filters against hard constraints, and emits a carbamate substrate target.
- **Engine B — De Novo Carbamate Hydrolase** (generative protein design). Designs an enzyme from scratch to cleave the carbamate bond in Engine A's fiber. Anchored on (not copied from) the published UMG-SP2 urethanase transition state.
- **Engine C — Digital Recyclability Passport** (compliance + chemical chain-of-custody software layer). Routes recovered garments (clear / lab-test / divert) against US/EU chemical regulation, and emits an EU-ESPR-aligned Digital Product Passport. **This is the guaranteed-working demo floor AND a serious 25–30% of the pitch — not a throwaway wrapper. Under California SB 707 and EU ESPR it is a fee-reducing compliance asset, not a nice-to-have.**

**The frontend's job** is to make this loop *visible and visceral*: a judge sees a garment enter, watches the system propose a redesigned cleavable fiber, watches a matched enzyme get designed against it, sees the 3D structures rendered live, and watches the closed loop animate — "today: shred → pet bedding; REWEAR-FUSED: depolymerize → re-spin → new onesie."

---

## 1. THE WIN CONDITION (why every build decision is made)

The team targets **all three prizes simultaneously**:
1. **Track win (Carter's "Making & Remaking"):** the *fusion* — the only project that closes both walls blocking Carter's KIDCYCLE program (can't certify chemical safety; can't break down elastane). **Carter's reps pick the track winner** — so the pitch must speak to Carter's commercial pain.
2. **Grand prize (FIFA World Cup 2026 tickets, "shouldn't be possible"):** Engine B — the first de novo-designed carbamate hydrolase. **Cox judges award the grand prize** — so the science must map to Cox's investment thesis.
3. **Cox Cleantech Residency interview** (6-week, $10,000-stipend, equity-free, Atlanta program for early-stage cleantech founders): the deep-tech materials story + a *credible commercial deployability* story (Engine C as a Year-1 deployable product).

**The single most important positioning fact (bake into copy where natural):** Cox Cleantech led a **$150M round to become majority owner of Nexus Circular** — proprietary chemistry converting hard-to-recycle plastic waste into virgin-equivalent feedstock for global brands. REWEAR-FUSED is the textile analog. The framing **"we're the Nexus Circular of textiles"** maps the project onto a nine-figure bet Cox already made. The Residency explicitly wants teams with *"existing patents or active progress toward securing intellectual property licenses"* and *"a minimum viable product ready for an initial pilot."*

**Implication for the frontend:** It must simultaneously read as (a) scientifically serious to a materials/biochem judge, (b) commercially credible to a Cox residency judge, and (c) visually unforgettable to every judge in the room. The molecular visualization carries (a) and (c); the Digital Recyclability Passport dashboard carries (b).

---

## 2. NON-NEGOTIABLE SCIENTIFIC CONSTRAINTS (locked — do not deviate)

Locked after a full adversarial-validation arc (deep-research scans, a forensic citation fact-check, an internal-consistency audit, and a six-blind-spot defensive brief). **Every piece of copy, every data label, every tooltip in the UI must respect these. If you generate UI text that violates one, you have introduced a flaw a judge will catch.**

### CONSTRAINT 1 — Aliphatic isocyanates ONLY.
Hard segments built from **aliphatic** isocyanates (HDI, H12MDI, IPDI) — **never** aromatic (MDI, TDI).
- **Why:** Aromatic isocyanates cleave to aromatic diamines — MDA (4,4'-methylenedianiline) and TDA — and **MDA is an IARC Group 2B possible carcinogen**, restricted under REACH Annex XVII Appendix 8, OEKO-TEX Standard 100 Class I (infant) limit ~20 mg/kg. A fiber that sheds a carcinogen next to a baby's skin is a dead pitch. Aliphatic isocyanates cleave to aliphatic diamines (1,6-hexamethylenediamine, 4,4'-diaminodicyclohexylmethane, isophoronediamine) — none on any carcinogen list.
- **UI:** every fiber candidate shows its isocyanate as aliphatic; the passport shows "aromatic amine release: NONE — aliphatic isocyanate design" as a green check.

### CONSTRAINT 2 — Engine B targets a near-neutral-pH Ser-His-Asp triad.
Enzyme designed around a **Ser-His-Asp catalytic triad** (near-neutral pH ~7.0–8.5), **not** the wild-type UMG-SP2 Ser-Ser-cis-Lys triad (alkaline pH ~10).
- **Why:** Wild-type UMG-SP2's lysine mechanism needs pH ~10 (Branson 2023; Świderek 2025 QM/MM); at pH 10 the companion cotton/wool we want to recover is damaged. De novo design freedom lets us swap to a His-based triad (as in lipases/proteases/cutinases) for a near-neutral optimum.
- **UI:** enzyme panel labels the triad "Ser-His-Asp (engineered, near-neutral pH 7.0–8.5)"; operating window "pH 7.0–8.5, 30–40 °C — cotton-compatible."

### CONSTRAINT 3 — Cleavable bond in the SOFT (amorphous) segment; hard-segment 25–35 wt%.
Hydrolytically/enzymatically cleavable bond in the **soft, amorphous segment** (PCL or polycarbonate diol, ~2,000 g/mol), **not** the crystalline hard domains. Hard-segment content **25–35 wt%**.
- **Why:** crystalline hard segments provide elastic recovery and fatigue resistance; disrupting them to gain enzyme access would destroy the ≥400% stretch. Putting the cleavable bond in the amorphous phase resolves the mechanics-vs-cleavability tension (published window: Xu *SusMat* 2026; Qin *Adv. Sci.* 2024). Below ~17 wt% degrades too fast; above ~40 wt% won't degrade.
- **UI:** fiber panel shows crystalline hard segments (intact, load-bearing) + amorphous soft segment (cleavable bond lives here); the trade-off curve (§5, VIEW 3) makes it explicit.

### CONSTRAINT 4 — Engine A is "constraint-guided virtual screening," NOT "generative design."
Engine A **enumerates** candidate compositions across known monomer/chain-extender combinations, **scores** them with a PU-elastomer-specific property predictor, **filters** against the constraints, and **emits** the best candidate as Engine B's substrate.
- **Why:** the polymer language models (polyBART, polyBERT, POLYT5) explicitly state in their own papers that they handle homopolymers and random copolymers — **not segmented block copolymers** like elastane (polyBART, arXiv:2506.04233, says so verbatim). Claiming generative design over a space the tools can't represent is a flaw a judge will expose. "Constraint-guided screening" is both more honest and more credible.
- **UI:** copy says "AI-guided screening of [N] candidate fiber compositions" — never "AI invented a new polymer." Show the funnel: enumerated → scored → filtered → top candidate.

### CONSTRAINT 5 — Honest framing of what's in-silico vs. validated.
Everything REWEAR-FUSED produces is an **in-silico design with benchmark-referenced metrics** — not a wet-lab-validated material or enzyme. Never imply a physical fiber was spun or a physical enzyme expressed. Cyclic fatigue, elastic recovery, and hysteresis are **not predictable by current ML** and require wet-lab validation — say so where relevant.
- **UI:** a persistent, tasteful **"in-silico design — wet-lab validation required"** badge on any predicted-property panel. State TRL explicitly where natural: Engine A ≈ TRL 3, Engine B ≈ TRL 2, Engine C ≈ TRL 6. Honesty is a strength that signals scientific maturity and is what separates winning deep-tech pitches from over-claimers.

### THE TWO OPEN NOVELTY FLAGS (the project's audacity — frame as frontier, not gap):
- **Flag 1:** No de novo computationally-designed carbamate hydrolase / urethanase has been publicly disclosed (verified open as of June 2026).
- **Flag 2:** No AI-generative-designed enzymatically-cleavable segmented polyurethane-urea elastane has been publicly disclosed (verified open).
- Plus: the **joint co-design loop** has not been demonstrated for textile fibers.

### THE PRE-EMPTIVE MICROPLASTIC FRAME (a sustainability judge WILL ask):
Even with safe aliphatic chemistry, a stretch garment sheds microfibers and trace diamine during wash-life. **Reframe, don't hide:** REWEAR-FUSED's enzymatic end-of-life *replaces* the microplastic-shedding-into-the-ocean fate with a **controlled industrial hydrolysis fate.** The end-of-life / impact panel should make this point.

---

## 3. THE FRONTEND STACK (galaxy-tier — hand-built, no scaffolding-tool output)

**Do not use Lovable, Stitch, v0, bolt, or any scaffolding-tool output. Hand-build everything.** All versions below are current stable as of mid-2026; if `npm view <pkg> version` differs at build time, use latest stable — the patterns are version-stable.

### Core framework
- **Next.js 16.2.x (App Router, Turbopack default for dev AND prod)** — best React 19 + R3F v9 ecosystem fit; mature `next/dynamic({ ssr:false })` for Mol*/R3F; first-class Vercel deploy; the largest shadcn/ui registry support. Turbopack is the default bundler in 16.
- **React 19.2.x** — keep **React Compiler** ON (removes hand-written `useMemo`/`useCallback` in the heavy animation tree); use **`use()`** to suspend on the static PDB fetch; use the **Activity** API (R3F v9.5+ compatible) to pre-mount but pause off-screen 3D scenes.
- **TypeScript 5.7+** — `"moduleResolution":"bundler"`, `"verbatimModuleSyntax":true`, `"noUncheckedIndexedAccess":true`; typed routes via `next typegen`. Lint with **ESLint 9 flat config** or **Biome 2** (Next 16 deprecated `next lint`).
- **Tailwind CSS v4.3.x (Oxide engine, CSS-first `@theme` config — no `tailwind.config.js`)** — use **OKLCH** colors in `@theme` so opacity-mixing stays perceptually uniform. v4 needs Safari 16.4+/Chrome 111+/Firefox 128+ (fine on a controlled demo laptop). Do NOT ship the default Tailwind look. Reject vanilla-extract / Panda / StyleX (bundling complexity not worth 72h).

### 3D molecular visualization (the centerpiece — this creates the shock factor)
- **Mol\* (`molstar` 5.9.x)** — the engine PDBe and RCSB PDB.org use in production; the only realistic choice for publication-grade cartoon/surface/licorice of the designed enzyme and its Ser-His-Asp active site. **Integration: do NOT use the stale `molstar-react` wrapper.** Mount Mol* imperatively in a `'use client'` component, own a `PluginContext` ref in `useEffect`, dispose on unmount, set `renderer.backgroundColor` to the dark base. Dynamic-import with `next/dynamic({ ssr:false })` (the bundle is ~2 MB). Scope `molstar.css` inside a `data-molstar` wrapper via a Tailwind `@layer` to isolate it from the v4 reset. Pre-convert PDB → **BinaryCIF (.bcif)** (~80% smaller, instant load).
- **React Three Fiber (`@react-three/fiber` 9.6.x) + `@react-three/drei` 10.7.x + `three` r184** for the custom 3D: the segmented-polymer fiber view, the enzyme-meets-substrate docking, and the closed-loop depolymerization. R3F v9 pairs with React 19; mount `<Canvas>` inside a `next/dynamic({ ssr:false })` client component.
- **`@react-three/postprocessing` 3.0.x + `postprocessing` 6.39.x** for the glow stack (below).

### Motion & scroll
- **GSAP 3.15.x** — **now 100% free including ALL former Club plugins** (Webflow made GSAP fully free, incl. ScrollTrigger, ScrollSmoother, SplitText, MorphSVG, Flip, DrawSVG, MotionPath, on April 30 2025). Use for the orchestrated scroll-narrative master timeline and the hero sequence. Integrate via the **`@gsap/react` `useGSAP()`** hook; register plugins once at module top.
- **Motion 12.40.x (`motion`, formerly Framer Motion)** for React-idiomatic micro-interactions: `layout`, `AnimatePresence`, `whileHover/whileInView`, gesture handlers, animated number counters (`useMotionValue`+`useSpring`+`useTransform`). Native oklch interpolation.
- **Lenis 1.3.x** for smooth scrolling. **Pair Lenis with GSAP ScrollTrigger** (route `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add(t=>lenis.raf(t*1000))`, `lagSmoothing(0)`). Do **not** also enable ScrollSmoother — pick one.
- **View Transitions API** (same-document Baseline since Oct 2025) for the Engine A→B→C tab switch only — give the panel a `view-transition-name`, wrap state change in `document.startViewTransition()`. Keep the hero on GSAP for total control.
- Native **CSS scroll-driven animations** (`animation-timeline: view()`) for small reveals (fade-ups, counters) — runs on the compositor; reserve GSAP for scrubbed multi-element sequences.

### Data visualization
- **visx 3.12.x (`@visx/xychart`, `@visx/curve`, `@visx/gradient`)** for the **bespoke mechanics-vs-cleavability trade-off curve** (VIEW 3) — custom glowing Pareto stroke, shaded design window.
- **ECharts 6.1.x (`echarts` + `echarts-for-react`)** for the **Engine C compliance dashboard gauges** — built-in gauge/radial/sunburst with OKLCH gradient axis lines.
- Reject Recharts/Nivo/Tremor (too SaaS-default) and raw D3 (3× the code of visx).

### WebGPU vs WebGL2 and GPGPU particles
- **WebGL2 is the safe demo-day default; ship one WebGPU/TSL scene as a "next-gen visuals" toggle.** WebGPU reached cross-browser Baseline Jan 2026 and three.js `WebGPURenderer`/TSL is production-ready, but WebGPU forces `await renderer.init()` (one more failure point). Use `forceWebGL: true` for the guaranteed-safe build; verify the demo laptop's Chrome supports WebGPU before committing the hero scene to it.
- **Depolymerization storm:** safe path = three.js **`GPUComputationRenderer`** (ping-pong float textures, GLSL update; comfortably **100k–250k particles**). Aspirational path = **TSL compute** (`instancedArray` + `Fn().compute(N)` via `renderer.computeAsync`; **~1M particles**). Drive the simulation from the **same scroll-progress value** GSAP uses for the camera — the scroll bar becomes the "depolymerize → re-spin" lever.

### UI primitives, typography, icons
- **shadcn/ui 4.x with the Base UI base (`@base-ui/react` 1.5.x), not Radix.** Base UI hit v1.0 stable Dec 2025 (built by the original Radix + MUI teams), includes native multi-select/combobox/autocomplete Radix lacks, and uses a `render` prop instead of `asChild`. `npx shadcn@latest create` → Base UI, compact style, custom base color in `@theme`. Restyle every primitive; never ship stock. (Radix remains an available fallback per-component since they share the abstraction.)
- **Typography (NO Inter/Roboto/Arial/system fonts, NO Space Grotesk):**
  - **Display/brand:** *Editorial New* (Pangram Pangram) — high-contrast didone, "editorial science journal" voice.
  - **Body/UI:** *Söhne* (Klim; the Stripe/OpenAI neo-grotesque) — or **General Sans** (Pangram Pangram, free) as the budget swap.
  - **Mono/data/SMILES/residues:** *JetBrains Mono* — for kinetics values, DOIs, SMILES strings, residue labels (Ser-195, His-57, Asp-102).
  - Self-host via `next/font/local`; use variable fonts so weight can animate on scroll-reveal headlines.
- **Icons: Phosphor (`@phosphor-icons/react` 2.1.x)** — six weights incl. **duotone**; the variety + duotone is the cheapest way to escape the generic Lucide-everywhere look. Lucide stays as the shadcn-internal default only.

---

## 4. DESIGN DIRECTION (commit fully — a deep-tech instrument, not a SaaS landing page)

**Aesthetic concept:** *"Molecular laboratory instrument meets editorial science journal."* The precision of a scientific-instrument UI (Benchling, a cryo-EM viewer, mission-control) crossed with the typographic confidence of a high-end science publication. Dark, deep, atmospheric — molecules glow against depth.

**The 4-rule "clean but shocking" discipline** (prevents heavy 3D from becoming cluttered):
1. **One 3D moment per viewport, max.** The molecule or the chart, never both side-by-side.
2. **Negative space is the primary layout primitive.** 8-pt spacing scale; hero sections 200px+ vertical padding; never less than 64px between sections.
3. **Two-accent rule:** bio-green/cyan (`--color-accent-bio`) ONLY for enzyme/biology; amber/coral (`--color-accent-fiber`) ONLY for fiber/material. They **meet and fuse only at the loop-closing moment.** Third "color" is white-at-low-opacity on near-black. No other hues except in data-viz scales.
4. **Token architecture (Tailwind v4 CSS-first `@theme`):**
   ```css
   @theme {
     --color-bg: oklch(0.13 0.01 240);
     --color-bg-elevated: oklch(0.17 0.01 240);
     --color-fg: oklch(0.96 0.005 240);
     --color-fg-muted: oklch(0.65 0.01 240);
     --color-accent-bio: oklch(0.83 0.18 175);   /* enzyme */
     --color-accent-fiber: oklch(0.74 0.17 45);  /* fiber */
     --color-rule: oklch(0.25 0.005 240 / 0.6);
     --font-display: 'Editorial New', serif;
     --font-body: 'Söhne', system-ui, sans-serif;
     --font-mono: 'JetBrains Mono', monospace;
     --shadow-bloom: 0 0 80px -8px oklch(0.83 0.18 175 / 0.45);
   }
   ```
   Every component reads only from these tokens. Reskin by changing tokens, never component code.

**The glow recipe** (the premium look): lift emissive material colors above 1.0 (`emissive.multiplyScalar(2.5)`) so selective **Bloom** only blooms HDR-range pixels; stack `<Environment preset="studio" />` for soft PBR reflections; `<MeshTransmissionMaterial>` for the "frozen-glass elastane filament." Post-stack: `SSAO → Bloom(mipmapBlur) → DepthOfField → ChromaticAberration → Vignette → ToneMapping(ACES_FILMIC)`. Atmosphere via low-density `<Sparkles>` + a 6–10% gradient-mesh "fog," not true volumetrics. Molecular renders idle with a slow living rotation — never static. One orchestrated, staggered page-load beats scattered micro-interactions.

---

## 5. THE FIVE CORE VIEWS

Cohesive SPA (or app-router multi-route with shared layout) with smooth transitions. The demo flows through them in order.

### VIEW 1 — The Story / Landing ("The Two Walls")
Scroll-driven cold-open (GSAP ScrollTrigger + Lenis).
- Carter's KIDCYCLE/TerraCycle collects worn baby clothes and **downcycles them into pet bedding and composite lumber** because two walls stop a onesie becoming a onesie again. **Wall 1:** can't prove recovered fabric is chemically safe for infant skin. **Wall 2:** can't break down the elastane in every stretch garment.
- Scroll reveals the REWEAR-FUSED thesis: co-design a new cleavable fiber + a matched enzyme. Closing line appears here and again at the end: *"Neither existed 72 hours ago."*
- **Stats to feature (verified):** ~92 million tonnes of textile waste globally per year (UNEP); **elastane is in ~80% of all clothing, and just ~1% of it makes a recycler reject the whole garment** (Fashion for Good "Stretching Circularity," 2026); only ~1% of garments are recycled fiber-to-fiber.

### VIEW 2 — Engine C: The Digital Recyclability Passport (THE DEMO FLOOR — build FIRST)
The guaranteed-working core, 25–30% of the pitch. A garment-intake + chemical-compliance dashboard.
- **Input:** a selectable realistic Carter's-style garment (each with fiber composition + simulated chemical history).
- **Router decision:** classify each garment **clear / lab-test / divert** against US/EU regulation, with the probability and the specific regulatory citation driving the decision.
- **The passport card** shows: fiber composition; regulatory status against **CPSIA** (lead, phthalates, 16 CFR 1610 flammability), **California AB 1817 / AB 347** (PFAS in textiles), **California SB 707** (textile EPR — Landbell PRO, producers join by July 1 2026, penalties to $50K/day), **New York ECL §37-0121**, **Maine LD 1503**, **REACH Annex XVII Entry 43 + Entry 72** (aromatic amines), **OEKO-TEX Standard 100 Class I** (infant), **EU ESPR / Digital Product Passport** (textiles delegated act ~Q2 2027); a green "aromatic amine release: NONE — aliphatic isocyanate design" check (Constraint 1); and a **GS1 Digital Link QR** the judge can physically scan on stage.
- **Frame it as the fee-reducing compliance asset:** "the product Carter's can deploy in Year 1 — it lowers SB 707 eco-modulated EPR fees and pre-positions for EU DPP — while the molecular loop validates in Year 2."
- **Data:** classifier trained on public data (CPSC Recalls API at `saferproducts.gov/RestWebServices/Recall?format=json`, EU Safety Gate/RAPEX, Toxic-Free Future/Peaslee PFAS datasets, OEKO-TEX as compliant negatives). Frontend reads pre-computed classifier outputs (§6). **Report PR-AUC alongside AUC** (positives <5%/label; ROC-AUC is misleadingly high). Honest target PR-AUC ~0.55–0.75.

### VIEW 3 — Engine A: Cleavable Fiber Design
The constraint-guided screening view.
- **Funnel viz (visx):** [N] enumerated candidate compositions → scored on predicted properties → filtered against constraints → top candidate(s), animated.
- **Candidate cards:** isocyanate (aliphatic — labeled), soft segment (PCL/polycarbonate ~2000 g/mol), chain extender, hard-segment wt% (25–35%), predicted Tg(soft) < -50 °C, Tg(hard) > 150 °C, elongation > 400%.
- **Fiber-architecture 3D (R3F):** crystalline hard segments (intact, load-bearing) + amorphous soft segment with the cleavable carbamate bond highlighted (Constraint 3 made visible).
- **THE TRADE-OFF CURVE (visx, the honesty centerpiece):** hard-segment wt% on x; *degradability* and *mechanical retention* as two crossing curves; **design window 25–35 wt% shaded**; annotate "<17 wt% = degrades too fast; >40 wt% = won't degrade." Caption cites Xu *SusMat* 2026 + Qin *Adv. Sci.* 2024. Turns a vulnerability into a demonstration of rigor.
- **The handoff:** the top fiber's carbamate microenvironment is *emitted as Engine B's substrate target.* The handoff arrow is the visual proof it's ONE loop, not two projects.

### VIEW 4 — Engine B: De Novo Enzyme Design (THE GRAND-PRIZE MOMENT)
Molecular hero view (Mol\* + R3F).
- **Pipeline trace (animated, staged):** RFdiffusion2 (backbone) → LigandMPNN (sequence) → Boltz-2 (structure + binding) → PLACER (active-site validation) → FoldSeek (novelty). This is the exact stack from Lauko *Science* 2025 and Kim/Woodbury/Ahern *Nature* 2026.
- **Enzyme structure (Mol\*):** publication-grade cartoon + surface; **Ser-His-Asp active site** in licorice with the carbamate substrate docked; slow living rotation; click residue → label.
- **Headline metric:** **PLACER preorganization fraction** on the Lauko thresholds (pLDDT > 80 protein / > 90 active site, catalytic-Cα RMSD < 1.0 Å, full-chain self-consistency RMSD < 2.0 Å); show with uncertainty.
- **Catalytic-triad label:** "Ser-His-Asp (engineered, near-neutral pH 7.0–8.5)" (Constraint 2).
- **FoldSeek novelty badge:** "no close structural match in PDB (TM-score < 0.5) — de novo fold" (Flag 1).
- **Downloadable:** each design as a `.pdb` the judge can inspect.
- **Matched-pair proof:** this enzyme was designed *against Engine A's fiber.*

### VIEW 5 — The Closed Loop (THE EMOTIONAL PEAK)
Most motion-crafted moment (R3F + GSAP).
- Full **3D animated journey:** garment → recovered fiber → designed cleavable elastane → matched enzyme approaches → **carbamate bond cleaves** → fiber depolymerizes into recoverable monomers → re-spun into new fiber → new onesie. Built on the GPGPU particle system, scrubbed by scroll.
- Side-by-side **"Today"** (garment → shredder → pet bedding, dead end) vs **"REWEAR-FUSED"** (garment → enzymatic depolymerization → re-spin → new garment, closed circle).
- The two accent colors **meet and fuse** at the cleavage moment.
- **End-of-life / impact panel** with the microplastic reframe: "replaces ocean microplastic-shedding fate with controlled industrial hydrolysis."
- Closing line lands: *"Carter's — here's the molecule for your next onesie, and here's the enzyme that closes its loop. Neither existed 72 hours ago."*
- **Commercialization footer (for the Cox residency judge):** "we're the Nexus Circular of textiles"; license to an incumbent (Hyosung Creora bio-based ~1yr precedent; LYCRA × QIRA ~3yr; ROICA V550 ~2yr-to-brand); realistic market horizon **2030–2032**; spandex market **$9B today → ~$20B by ~2033** (SkyQuest/Market.us); drop-in to existing solution dry-spinning; the residency ask: "$10K + 6 weeks to wet-lab-validate, file a provisional, and pilot one Carter's SKU."

---

## 6. DATA ARCHITECTURE (how the frontend gets its data)

**Hard rule: the live demo NEVER depends on a real-time GPU job.** All backend pipelines (Engine A screening, Engine B design, Engine C classifier) ship **pre-computed, signed artifacts (JSON + PDB)**; the frontend reads them as read-only truth. Pre-compute the top 3 matched fiber-enzyme pairs so the pitch can't break on stage. Build a **typed data layer + ALL mock fixtures FIRST** so the entire UI is demoable from hour one; swap mocks for real pipeline outputs as they land — same shape, no UI changes.

```
/data
  /garments/garments.json            // id, name, image, fiberComposition[], simulatedChemicalHistory
  /compliance
     classifications.json            // per-garment: decision(clear|lab-test|divert), probability, prAuc, auc, triggeredRegulations[]
     regulations.json                // catalog: id, name, jurisdiction, limit, citation
  /fibers
     candidates.json                 // Engine A: id, isocyanate(aliphatic), softSegment, softSegmentMW, chainExtender,
                                      //   hardSegmentWtPct, predicted{tgSoft,tgHard,elongation,modulus}, accessibilityScore, inSilico:true
     screening.json                  // enumeratedCount, scoredCount, filteredCount, topCandidateIds[]
     tradeoffCurve.json              // x:hardSegmentWtPct[], degradability[], mechanicalRetention[], designWindow:[25,35]
  /enzymes
     designs.json                    // Engine B: id, matchedFiberId, catalyticTriad:"Ser-His-Asp", pHOptimum:[7.0,8.5],
                                      //   placer{preorganizationFraction,plddt,scRmsd,catalyticCaRmsd}, foldseekBestTM, foldseekBestHitPdb,
                                      //   noveltyVerdict, pdbPath, inSilico:true
     /pdb/design_01.pdb … design_03.pdb
  /pairs/topPairs.json                // 3 pre-computed pairs: {fiberId, enzymeId, substrateSmiles, narrative}
  /dpps/dpp_example_*.json            // ESPR-aligned Digital Product Passport (GS1 Digital Link URI)
```

- Typed data layer in `/lib/data.ts`, loaded via `@tanstack/react-query`; every type above is a TS interface.
- Client state via **zustand** (selected garment / fiber / enzyme / animation playback).
- PDB files read by Mol\* directly (pre-convert to `.bcif`). Ship 3 placeholder hydrolase PDBs until Engine B's real outputs arrive.
- If a live API is wired later (FastAPI), it serves the **same shapes** — but the demo runs off static files.

---

## 7. BUILD SEQUENCE (mirrors the 72-hour plan)

**Governing principle: ship the guaranteed-working demo floor (VIEW 2) FIRST, so a working demo exists even if the molecular views are still being polished at hour 60. Then the molecular views. Then the loop. Then relentless polish. Rehearse more than you build in the final stretch.**

### PHASE 1 — Foundation + Demo Floor (hours 0–14)
1. Scaffold Next.js 16 + TS + Tailwind v4 + shadcn/Base UI; install the full stack (§3).
2. Implement the **design-token system** (§4) as `@theme` CSS variables; self-host fonts via `next/font/local`; build grain/glow utilities. Lock the aesthetic before building views.
3. Build the **typed data layer + ALL mock fixtures** (§6).
4. Build **VIEW 2 (Digital Recyclability Passport)** end-to-end against mocks — intake, router decision, passport card, regulatory panel, scannable QR. **Once this works, a demo exists.**
5. Build the app shell: status rail (in-silico badge, current engine, pipeline state), navigation, dark atmospheric background.

### PHASE 2 — The Molecular Engines (hours 14–36)
6. Integrate **Mol\*** (imperative mount, `.bcif`, dark theme, active-site licorice). Prove the renderer works.
7. Build **VIEW 4 (Engine B)** — pipeline trace, Mol\* enzyme render, PLACER metric, Ser-His-Asp label, FoldSeek novelty badge, PDB download.
8. Build **VIEW 3 (Engine A)** — screening funnel, candidate cards, R3F fiber-architecture view, **the trade-off curve**. Wire the substrate-handoff arrow to Engine B.

### PHASE 3 — The Loop + Narrative (hours 36–48)
9. Build **VIEW 5 (Closed Loop)** — R3F + GSAP 3D journey, GPGPU particles (WebGL2 path), today-vs-REWEAR-FUSED comparison, bond-cleavage hero, color-fusion, microplastic reframe, commercialization footer.
10. Build **VIEW 1 (Story)** — GSAP scroll cold-open, two walls, thesis reveal, closing line.

### PHASE 4 — Orchestration + Demo-Safety (hours 48–72)
11. Wire the one spectacular staggered page-load (Motion + GSAP).
12. Tune every view-to-view transition to presentation grade.
13. Living idle rotation on molecular renders; hover-reveal residue labels.
14. **Demo-safety pass:** every view works offline off static data; no real-time dependency; deterministic "demo mode" that walks the five views in pitch order; pre-load the 3 matched pairs; **record a 4K/60fps OBS screen capture of the full flow** as the ultimate fallback.
15. Performance: code-split per view, `frameloop="demand"` on static scenes (call `invalidate()` from GSAP onUpdate), lazy-load heavy 3D, Meshopt+KTX2 for any glTF, instant first paint on the Story view.

### Drop-if-late thresholds
- VIEW 2, VIEW 4, the scroll narrative, and the demo-safety pass **cannot be dropped**.
- Closed-loop particles: drop to **30k** if behind; trade-off curve: ship **static** (no animation) if behind.
- Stretch only if Phase 4 finishes early: WebGPU/TSL 1M-particle path; custom screen-space god-rays GLSL; cross-document View Transitions.

---

## 8. THE JUDGE-DEFENSE LAYER (bake answers into the UI so the product pre-empts the hard questions)

Each has a cited answer from the defensive brief. Where natural, make the answer *visible* so a judge sees it before asking:

1. **"What toxic products come off when you cleave it?"** → Constraint 1 visible: aliphatic-isocyanate design, "aromatic amine release: NONE" green check.
2. **"Doesn't your enzyme need pH 10, which destroys the cotton?"** → Constraint 2 visible: "Ser-His-Asp (engineered, near-neutral pH 7.0–8.5) — cotton-compatible."
3. **"Won't making it cleavable destroy the stretch?"** → Constraint 3 + trade-off curve visible: cleavable bond in the soft phase, design window shaded, ≥400% elongation retained.
4. **"Can AI really generate a new block copolymer?"** → Constraint 4 visible: "constraint-guided screening," the funnel, never "generative invention."
5. **"Did you actually make any of this?"** → Constraint 5 visible: the persistent "in-silico — wet-lab validation required" badge + explicit TRL. Honesty as armor.
6. **"What about microplastics / what's the business model?"** → loop view's microplastic reframe + the "Nexus Circular of textiles" commercialization footer (license-to-incumbent, 2030–2032, the residency ask).
7. **"Isn't this two projects?"** → the substrate-handoff arrow (VIEW 3 → VIEW 4) + the matched-pair display in VIEW 4 and VIEW 5. The visual proof it's one loop.
8. **"Will Carter's pay for this?"** → "Carter's already pays TerraCycle to downcycle stretch garments into pet bedding. We replace that line item with a fiber-to-fiber loop + an SB 707 / EU-DPP compliance asset. Same line item; better outcome."

---

## 9. CITATIONS (verified, DOI-only — use in captions/tooltips; do NOT invent citations)

Only these verified sources may appear in the UI. A fact-check confirmed several red-team citations were fabricated — never reintroduce an unverified citation, and do not invent kinetics numbers (read them from the data layer; mark placeholders clearly in fixtures).

**Enzyme design / mechanism**
- Lauko et al. 2025 — de novo serine hydrolases (esters) via RFdiffusion + PLACER. *Science* 388:eadu2454. DOI 10.1126/science.adu2454.
- Ahern/Yim et al. 2026 — RFdiffusion2, atom-level enzyme scaffolding (41/41 AME benchmark). *Nat. Methods* 23:96–105. DOI 10.1038/s41592-025-02975-x.
- Kim/Woodbury/Ahern et al. 2026 — de novo metallohydrolases (phosphonate ester; kcat/KM up to 53,000 M⁻¹s⁻¹). *Nature* 649:246–253. DOI 10.1038/s41586-025-09746-w.
- Dauparas et al. 2025 — LigandMPNN. *Nat. Methods*. DOI 10.1038/s41592-025-02626-1.
- Branson et al. 2023 — metagenomic urethanases UMG-SP1/2/3; "most active at pH 10." *Angew. Chem. Int. Ed.* 62:e202216220. DOI 10.1002/anie.202216220.
- Bayer/Rotilio et al. 2024 — UMG-SP1 structure + engineering (~3× urethane, 8× amide). *Angew. Chem. Int. Ed.* 63:e202404492. DOI 10.1002/anie.202404492.
- Li et al. 2025 — UMG-SP2 structure-guided engineering (A141G/Q399A). *Adv. Sci.* 12:2416019. DOI 10.1002/advs.202416019.
- Paiva et al. 2025 — UMG-SP2 QM/MM pathway. *Chem. Sci.* 16:2437. DOI 10.1039/D4SC06688J.
- Świderek et al. 2025 — UMG-SP2 mechanism, alkaline-pH requirement, barrier ~21.2 kcal/mol. *JACS* 147:42511. DOI 10.1021/jacs.5c13147.
- Anselmi/Hailes et al. 2025 — metagenomic urethanases need ball-milling + cellulase on commercial elastane fabric (crystallinity-wall evidence). *Green Chem.* 27:12176. DOI 10.1039/D5GC03560K.

**Fiber / polymer**
- Xu et al. 2026 — bio-based PUE hard-segment sweep; soft-segment degradation. *SusMat*. DOI 10.1002/sus2.70038.
- Qin et al. 2024 — PCL-based PU-urea, fatigue resistance + degradability via chain-extender tuning. *Adv. Sci.* 11:2400255. DOI 10.1002/advs.202400255.
- Ding et al. 2023 — ML prediction of PU-elastomer mechanical properties (R² 0.85–0.91). *Chin. J. Polym. Sci.* 41:422–431. DOI 10.1007/s10118-022-2838-6.
- Savit et al. 2025 — polyBART; states it does NOT support copolymers. EMNLP Findings 2025; arXiv:2506.04233.
- Kuenneth & Ramprasad 2023 — polyBERT (homopolymer + random copolymer only). *Nat. Commun.* 14:4099. DOI 10.1038/s41467-023-39868-6.
- St. John et al. 2023 — PolyID (NREL). *Macromolecules* 56:8547. DOI 10.1021/acs.macromol.3c00994.
- DelRe/Xu et al. 2021 — enzymes nano-dispersed in plastics (embedded-enzyme prior art; context). *Nature* 592:558. DOI 10.1038/s41586-021-03408-3.

**Market / regulatory / commercialization (cite as facts, not DOIs)**
- Fashion for Good "Stretching Circularity" 2026 — elastane in ~80% of clothing; ~1% rejects a garment from recycling.
- UNEP 2025 — ~92 million tonnes textile waste/year.
- McKinsey (Retail) — fiber-to-fiber recycling could reach 18–26% of gross textile waste by 2030.
- Spandex market: SkyQuest / Market.us — ~$9B (2023) → ~$20B (~2033), ~8% CAGR.
- California SB 707 (Responsible Textile Recovery Act 2024) — Landbell PRO; producers join by July 1 2026; penalties to $10K–$50K/day.
- EU ESPR Digital Product Passport — textiles delegated act ~Q2 2027.
- Commercialization precedents: Hyosung Creora bio-based (~23% CO₂ cut); LYCRA × QIRA (early-2025 launch); Asahi Kasei ROICA V550 (C2C-certified biodegradable stretch). Cox Cleantech / Nexus Circular ($150M round, majority owner) as the investment-thesis archetype.

---

## 10. WHAT "DONE" LOOKS LIKE

- All five views build and run, fully data-driven off `/data` (mocks, then real pipeline outputs — same shapes).
- VIEW 2 (Digital Recyclability Passport) works standalone as the demo floor, with a physically scannable QR.
- VIEW 4 renders a real PDB in Mol\* with the Ser-His-Asp active site, the PLACER metric, and the FoldSeek novelty badge.
- VIEW 5's closed-loop animation lands as the emotional peak with the bond-cleavage moment and color-fusion.
- Every Constraint (1–5) is respected in every piece of UI copy and every data label; explicit TRL where natural.
- Every judge-defense answer (§8) is visible in the product.
- A deterministic "demo mode" walks the five views in pitch order with zero real-time dependencies; a 4K OBS fallback recording exists.
- The aesthetic is a cohesive deep-tech instrument — dark, dimensional, molecular, unforgettable — distinctive typography (no Inter/Roboto/system fonts), one spectacular orchestrated page-load.
- Deployed to **Vercel**; verified to also run on `localhost` offline on the demo laptop.

---

## 11. NOTES FOR CLAUDE CODE (operating instructions)

- **Read this whole file before starting. Re-read the relevant section before each phase.**
- Build **mocks and types first** so the UI is always demoable; never block the frontend on the back-end pipeline.
- When in doubt between "impressive" and "safe," the user has chosen **impressive** — build the maximal version. But never violate a scientific Constraint (§2); those are the one place where correctness beats spectacle (and correctness IS the spectacle here).
- Use **current stable versions** (§3). If a pinned version has moved, use latest stable; pin React + `@react-three/fiber` to a single matched pair to avoid reconciler mismatch.
- Do not reintroduce any citation not in §9. Do not invent kinetics numbers — read from the data layer; mark placeholders in fixtures.
- Keep the **"in-silico — wet-lab validation required"** honesty badge persistent on predicted-property panels. It is a feature, not a disclaimer.
- The two accent colors keep the enzyme-half and fiber-half visually distinct everywhere, and fuse only at the loop-closing moment.
- This is a frontend + architecture spec; the enzyme/polymer/compliance pipelines are the back-end's domain (RFdiffusion2 → LigandMPNN → Boltz-2 → PLACER → FoldSeek; RDKit + PolyID/Ding-XGBoost screening; LightGBM compliance classifier + FastAPI). The frontend consumes their pre-computed artifacts.
- **Demo-safety is non-negotiable:** localhost-offline build, hotspot backup, 4K recorded fallback, clean browser profile, two laptops.

---

*End of CLAUDE.md (v2). Build the whole thing. Neither the molecule nor the enzyme existed 72 hours ago — make the interface look like it.*
