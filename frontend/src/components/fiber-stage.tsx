"use client";

import dynamic from "next/dynamic";
import { BeveledBox } from "./instrument";

// R3F Canvas is client-only. ssr:false keeps three off the server.
const FiberArchitecture = dynamic(() => import("./fiber-architecture"), {
  ssr: false,
  loading: () => (
    <div className="mono-label grid h-full place-items-center">loading fiber model</div>
  ),
});

export function FiberStage() {
  return (
    <BeveledBox accent="fiber" className="h-[48vh] min-h-[360px] w-full overflow-hidden">
      <FiberArchitecture />
    </BeveledBox>
  );
}
