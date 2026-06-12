"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import {
  getGarments,
  getClassification,
  getPassport,
  getRegulation,
} from "@/lib/data";
import { BeveledBox, MonoLabel } from "./instrument";
import { PassportCard } from "./passport-card";
import type { RegStatus } from "@/lib/types";

const STATUS_COLOR: Record<RegStatus, string> = {
  PASS: "text-pass",
  FLAG: "text-warn",
  FAIL: "text-fail",
};

export function PassportExplorer() {
  const garments = getGarments();
  const [selectedId, setSelectedId] = useState(garments[1].id); // legging: the elastane story
  const garment = garments.find((g) => g.id === selectedId)!;
  const classification = getClassification(selectedId);
  const passport = getPassport(selectedId);

  return (
    <div className="space-y-8">
      <div>
        <MonoLabel>01 — Garment intake</MonoLabel>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {garments.map((g) => {
            const active = g.id === selectedId;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedId(g.id)}
                className="text-left"
              >
                <BeveledBox
                  accent={active ? "bio" : "none"}
                  className={cn(
                    "p-4 transition-colors",
                    active ? "bg-bg-elevated" : "bg-bg-elevated/30 hover:bg-bg-elevated/60",
                  )}
                >
                  <div className="font-display text-base leading-tight">{g.name}</div>
                  <div className="mt-2 font-mono text-[0.65rem] text-fg-muted">
                    {g.fiberComposition.map((c) => `${c.percent}% ${c.fiber}`).join(" · ")}
                  </div>
                </BeveledBox>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <MonoLabel>02 — Recyclability passport</MonoLabel>
          <div className="mt-3">
            <AnimatePresence mode="wait">
              {passport && (
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <PassportCard garment={garment} passport={passport} />
                </motion.div>
              )}
              {!passport && (
                <BeveledBox className="p-6 text-sm text-fg-muted">
                  No pre-computed passport for this garment yet. The router still
                  classifies it below; the passport renders once Engine C emits it.
                </BeveledBox>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <MonoLabel>03 — Regulatory router</MonoLabel>
          <div className="mt-3">
            {classification && (
              <BeveledBox className="p-5">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-mono text-xs text-fg-muted">
                    decision confidence
                  </span>
                  <span className="font-mono text-lg tabular-nums">
                    {Math.round(classification.probability * 100)}%
                  </span>
                </div>
                <ul className="space-y-3">
                  {classification.triggeredRegulations.map((t) => {
                    const reg = getRegulation(t.regulationId);
                    return (
                      <li key={t.regulationId} className="border-b border-rule/50 pb-3 last:border-0">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm">{reg?.name ?? t.regulationId}</span>
                          <span
                            className={cn(
                              "font-mono text-[0.65rem] tracking-widest uppercase",
                              STATUS_COLOR[t.status],
                            )}
                          >
                            {t.status}
                          </span>
                        </div>
                        <div className="mt-1 font-mono text-[0.65rem] text-fg-muted">
                          {reg?.citation} · {reg?.limit}
                        </div>
                        <div className="mt-1 text-xs text-fg-muted">{t.detail}</div>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 font-mono text-[0.65rem] text-fg-muted">
                  PR-AUC {classification.prAuc.toFixed(2)} · AUC {classification.auc.toFixed(2)}
                </div>
              </BeveledBox>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
