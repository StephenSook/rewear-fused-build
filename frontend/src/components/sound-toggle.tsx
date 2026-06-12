"use client";

import { useRef, useState } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react/dist/ssr";

/**
 * Sound toggle. A click (a user gesture, satisfying autoplay policy) starts a
 * very soft ambient pad through the Web Audio API; clicking again fades it out.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode[]; gain: GainNode } | null>(null);

  const toggle = () => {
    if (!on) {
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 420;
      lp.connect(gain);
      const o1 = ctx.createOscillator();
      o1.type = "sine";
      o1.frequency.value = 110;
      o1.connect(lp);
      const o2 = ctx.createOscillator();
      o2.type = "sine";
      o2.frequency.value = 165;
      o2.detune.value = 4;
      o2.connect(lp);
      o1.start();
      o2.start();
      gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2);
      nodesRef.current = { osc: [o1, o2], gain };
      setOn(true);
    } else {
      const n = nodesRef.current;
      const ctx = ctxRef.current;
      if (n && ctx) {
        n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        const osc = n.osc;
        setTimeout(() => osc.forEach((o) => o.stop()), 450);
      }
      nodesRef.current = null;
      setOn(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      className="mono-label fixed right-4 top-4 z-40 hidden items-center gap-2 border border-rule px-3 py-2 transition-colors hover:text-fg sm:flex"
    >
      {on ? (
        <SpeakerHigh className="h-4 w-4 text-accent-bio" />
      ) : (
        <SpeakerSlash className="h-4 w-4" />
      )}
      sound {on ? "on" : "off"}
    </button>
  );
}
