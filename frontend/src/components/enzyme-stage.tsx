"use client";

import dynamic from "next/dynamic";
import { BeveledBox } from "./instrument";

// Mol* loads client-only. ssr:false keeps it off the server entirely.
const MolstarViewer = dynamic(() => import("./molstar-viewer"), {
  ssr: false,
  loading: () => (
    <div className="mono-label grid h-full place-items-center">initializing viewer</div>
  ),
});

export function EnzymeStage({ url }: { url: string }) {
  return (
    <BeveledBox
      accent="bio"
      className="h-[60vh] min-h-[420px] w-full overflow-hidden shadow-[var(--shadow-bloom)]"
    >
      <MolstarViewer url={url} className="h-full w-full" />
    </BeveledBox>
  );
}
