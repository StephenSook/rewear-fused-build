/**
 * Mock fixtures conforming to /data/contract.md. These let the entire UI be
 * demoable from hour zero. Real artifacts (Pravin + Vinh) replace these at the
 * artifact-freeze gate (June 15 EOD) with identical shapes, no UI change.
 *
 * Honesty: garment compositions and regulation thresholds are REAL and verifiable.
 * Pipeline-derived numbers (classification probabilities, fiber/enzyme metrics)
 * are clearly marked `placeholder: true` until the real classifier/pipeline lands;
 * the InSilicoBadge surfaces that state in the UI.
 */
import type {
  Garment,
  Regulation,
  Classification,
  DigitalProductPassport,
  FiberCandidate,
  EnzymeDesign,
  MatchedPair,
  TradeoffCurve,
  Screening,
} from "./types";

// Representative Carter's archetypes. Compositions are realistic for the
// category; verify against the live product page before the judged demo.
export const garments: Garment[] = [
  {
    id: "carters-bodysuit-cotton",
    name: "Carter's 5-Pack Cotton Bodysuit, 0-3M",
    archetype: "bodysuit",
    imageUrl: "/archetypes/bodysuit.jpg",
    fiberComposition: [{ fiber: "Cotton", percent: 100, source: "category-typical" }],
    simulatedChemicalHistory: "Better Cotton sourced, OEKO-TEX context",
    inSilico: true,
  },
  {
    id: "carters-legging-blend",
    name: "Carter's Cotton-Blend Legging, 12M",
    archetype: "legging",
    imageUrl: "/archetypes/legging.jpg",
    fiberComposition: [
      { fiber: "Cotton", percent: 95, source: "category-typical" },
      { fiber: "Elastane", percent: 5, source: "category-typical" },
    ],
    simulatedChemicalHistory: "Stretch waistband, elastane present",
    inSilico: true,
  },
  {
    id: "carters-rashguard-swim",
    name: "Carter's UPF Rashguard, 24M",
    archetype: "swim",
    imageUrl: "/archetypes/swim.jpg",
    fiberComposition: [
      { fiber: "Recycled Polyester", percent: 82, source: "category-typical" },
      { fiber: "Elastane", percent: 18, source: "category-typical" },
    ],
    simulatedChemicalHistory: "Water-repellent finish, PFAS screen relevant",
    inSilico: true,
  },
];

// Real US/EU thresholds (verifiable). Citations are human-readable statute refs.
export const regulations: Regulation[] = [
  {
    id: "CPSIA_LEAD_SUBSTRATE",
    name: "CPSIA lead (substrate)",
    jurisdiction: "US-Federal",
    limit: "100 ppm",
    citation: "CPSIA Section 101; 16 CFR 1500",
    effectiveDate: "2011-08-14",
  },
  {
    id: "CPSIA_PHTHALATES",
    name: "CPSIA phthalates (8, accessible parts)",
    jurisdiction: "US-Federal",
    limit: "1000 ppm each",
    citation: "CPSIA Section 108; 16 CFR 1307",
    effectiveDate: "2018-04-25",
  },
  {
    id: "CPSIA_FLAMMABILITY_SLEEPWEAR",
    name: "Children's sleepwear flammability",
    jurisdiction: "US-Federal",
    limit: "16 CFR 1615/1616",
    citation: "16 CFR 1615 and 1616",
    effectiveDate: "1996-01-01",
  },
  {
    id: "CA_AB1817_PFAS",
    name: "California AB 1817 PFAS in textiles",
    jurisdiction: "US-CA",
    limit: "100 ppm total organic fluorine (50 ppm from 2027)",
    citation: "California AB 1817 (2022)",
    effectiveDate: "2025-01-01",
  },
  {
    id: "REACH_ENTRY43_AMINES",
    name: "REACH aromatic amines (azo)",
    jurisdiction: "EU",
    limit: "30 mg/kg",
    citation: "REACH Annex XVII Entry 43",
    effectiveDate: "2003-09-11",
  },
  {
    id: "OEKO_TEX_CLASS_I_FORMALDEHYDE",
    name: "OEKO-TEX Class I formaldehyde (infant)",
    jurisdiction: "EU",
    limit: "16 mg/kg (not detectable)",
    citation: "OEKO-TEX Standard 100 Class I",
    effectiveDate: "2025-04-01",
  },
  {
    id: "EU_ESPR_DPP",
    name: "EU Digital Product Passport (textiles)",
    jurisdiction: "EU",
    limit: "DPP required",
    citation: "ESPR Regulation 2024/1781",
    effectiveDate: "2027-01-01",
  },
];

// Mock classifications (placeholder until Engine C produces real outputs).
export const classifications: Classification[] = [
  {
    garmentId: "carters-bodysuit-cotton",
    decision: "clear",
    probability: 0.97,
    prAuc: 0.86,
    auc: 0.94,
    triggeredRegulations: [
      { regulationId: "CPSIA_LEAD_SUBSTRATE", status: "PASS", measuredOrPredicted: "predicted", detail: "predicted lead well below 100 ppm" },
      { regulationId: "CA_AB1817_PFAS", status: "PASS", measuredOrPredicted: "predicted", detail: "no intentional PFAS, mono-material cotton" },
      { regulationId: "OEKO_TEX_CLASS_I_FORMALDEHYDE", status: "PASS", measuredOrPredicted: "predicted", detail: "formaldehyde not detectable" },
    ],
    shapTopFeatures: [
      { feature: "mono-material cotton", weight: 0.41 },
      { feature: "supplier OEKO-TEX history", weight: 0.22 },
    ],
    inSilico: true,
    placeholder: true,
  },
  {
    garmentId: "carters-legging-blend",
    decision: "lab-test",
    probability: 0.58,
    prAuc: 0.86,
    auc: 0.91,
    triggeredRegulations: [
      { regulationId: "CA_AB1817_PFAS", status: "FLAG", measuredOrPredicted: "predicted", detail: "stretch finish, PFAS screen recommended" },
      { regulationId: "EU_ESPR_DPP", status: "FLAG", measuredOrPredicted: "deterministic", detail: "elastane blend blocks fiber-to-fiber recycling today" },
      { regulationId: "OEKO_TEX_CLASS_I_FORMALDEHYDE", status: "PASS", measuredOrPredicted: "predicted", detail: "within Class I limit" },
    ],
    shapTopFeatures: [
      { feature: "elastane content", weight: 0.38 },
      { feature: "stretch finish proxy", weight: 0.19 },
    ],
    inSilico: true,
    placeholder: true,
  },
  {
    garmentId: "carters-rashguard-swim",
    decision: "divert",
    probability: 0.81,
    prAuc: 0.86,
    auc: 0.9,
    triggeredRegulations: [
      { regulationId: "CA_AB1817_PFAS", status: "FAIL", measuredOrPredicted: "predicted", detail: "water-repellent finish, high PFAS risk" },
      { regulationId: "EU_ESPR_DPP", status: "FLAG", measuredOrPredicted: "deterministic", detail: "high elastane, non-recyclable today" },
    ],
    shapTopFeatures: [
      { feature: "water-repellent finish proxy", weight: 0.44 },
      { feature: "elastane content", weight: 0.27 },
    ],
    inSilico: true,
    placeholder: true,
  },
];

export const passports: DigitalProductPassport[] = [
  {
    passportId: "01/00845678901234/21/CL12M-0001",
    garmentId: "carters-legging-blend",
    gs1DigitalLinkUri: "https://id.gs1.org/01/00845678901234/21/CL12M-0001",
    qrPayload: "https://id.gs1.org/01/00845678901234/21/CL12M-0001",
    classification: classifications[1],
    aromaticAmineRelease: "NONE",
    credential: {
      type: ["VerifiableCredential", "DigitalProductPassport"],
      issuer: "did:web:rewear-fused.github.io",
      proof: {
        type: "Ed25519Signature2020",
        verificationMethod: "did:web:rewear-fused.github.io#key-1",
        signatureValue: "PLACEHOLDER_SIGNATURE",
      },
    },
    trl: "TRL 2-3",
    inSilico: true,
    placeholder: true,
  },
];

// Engine A / B / pair stubs for the molecular views (placeholder until pipeline).
export const fiberCandidate: FiberCandidate = {
  id: "fiber-001",
  isocyanate: { name: "H12MDI", type: "aliphatic", pubchemCid: 16156 },
  softSegment: { name: "PCL-diol", mwGramsPerMol: 2000 },
  chainExtender: "BDO",
  hardSegmentWtPct: 30,
  predicted: { tgSoftC: -60, tgHardC: 165, elongationPct: 520, modulusMPa: 42, confidence: 0.78 },
  accessibilityScore: 0.71,
  carbamateSmarts: "[#6]-NH-C(=O)-O-[#6]",
  inSilico: true,
  placeholder: true,
};

export const enzymeDesign: EnzymeDesign = {
  id: "enzyme-001",
  matchedFiberId: "fiber-001",
  catalyticTriad: "Ser-His-Asp",
  pHOptimum: [7.0, 8.5],
  placer: {
    preorganizationFraction: 0.67,
    plddt: 84,
    plddtActiveSite: 91,
    catalyticCaRmsd: 0.8,
    scRmsd: 1.6,
    uncertainty: 0.06,
  },
  foldseekBestTM: 0.41,
  foldseekBestHitPdb: null,
  noveltyVerdict: "no close structural match in PDB (TM-score < 0.5), de novo fold",
  pdbPath: "pdb/enzyme-001.bcif",
  inSilico: true,
  placeholder: true,
};

export const matchedPair: MatchedPair = {
  fiberId: "fiber-001",
  enzymeId: "enzyme-001",
  enzyme_match: "designed against fiber-001 carbamate microenvironment",
  substrateSmiles: "O=C(NC1CCCCC1)OCCCC",
  narrative: "The enzyme's Ser-His-Asp triad is shaped to the exact carbamate of the designed fiber.",
};

export const tradeoffCurve: TradeoffCurve = {
  x: [10, 15, 20, 25, 30, 35, 40, 45],
  degradability: [0.95, 0.9, 0.78, 0.62, 0.48, 0.34, 0.18, 0.08],
  mechanicalRetention: [0.2, 0.32, 0.5, 0.68, 0.82, 0.9, 0.95, 0.97],
  designWindow: [25, 35],
  citationNote: "Design window per Xu SusMat 2026 and Qin Adv. Sci. 2024.",
};

export const screening: Screening = {
  enumeratedCount: 12480,
  scoredCount: 3120,
  filteredCount: 47,
  topCandidateIds: ["fiber-001"],
};
