"use client";

import { SmoothScroll } from "./smooth-scroll";
import { Loader } from "./loader";
import { NavRail } from "./nav-rail";
import { SoundToggle } from "./sound-toggle";

/** Global scroll shell: smooth scroll, first-load loader, nav rail, sound toggle. */
export function Shell() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <NavRail />
      <SoundToggle />
    </>
  );
}
