"use client";

import { useState } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react/dist/ssr";
import { audioEngine } from "@/lib/audio-engine";

/**
 * Sound toggle. The click is the user gesture that unlocks Web Audio; it starts
 * a soft ambient pad and arms the cleavage cues (the bond-snap swell on the loop
 * and the story fuse). Clicking again fades everything out.
 */
export function SoundToggle() {
  const [on, setOn] = useState(false);

  return (
    <button
      onClick={() => setOn(audioEngine.toggle())}
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
