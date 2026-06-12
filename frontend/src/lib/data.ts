/**
 * Data layer. The ONE place the artifact source is chosen. Today it returns
 * mock fixtures; at the artifact-freeze gate it fetches the real signed bundle
 * from NEXT_PUBLIC_ARTIFACTS_BASE_URL (same shapes, no caller change) and the
 * live passport from NEXT_PUBLIC_ENGINE_C_API_URL. Callers never know the source.
 */
import * as mock from "./mock-data";
import type {
  Garment,
  Regulation,
  Classification,
  DigitalProductPassport,
} from "./types";

export function getGarments(): Garment[] {
  return mock.garments;
}

export function getGarment(id: string): Garment | undefined {
  return mock.garments.find((g) => g.id === id);
}

export function getRegulations(): Regulation[] {
  return mock.regulations;
}

export function getRegulation(id: string): Regulation | undefined {
  return mock.regulations.find((r) => r.id === id);
}

export function getClassification(garmentId: string): Classification | undefined {
  return mock.classifications.find((c) => c.garmentId === garmentId);
}

export function getPassport(garmentId: string): DigitalProductPassport | undefined {
  return mock.passports.find((p) => p.garmentId === garmentId);
}

export const engineA = {
  candidate: mock.fiberCandidate,
  tradeoff: mock.tradeoffCurve,
  screening: mock.screening,
};

export const engineB = { design: mock.enzymeDesign };
export const pair = mock.matchedPair;

/** True while any rendered artifact is still a pre-pipeline placeholder. */
export function isPlaceholder(garmentId: string): boolean {
  return getClassification(garmentId)?.placeholder ?? false;
}
