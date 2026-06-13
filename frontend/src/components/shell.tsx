"use client";

import { SmoothScroll } from "./smooth-scroll";
import { Loader } from "./loader";
import { NavRail } from "./nav-rail";
import { SoundToggle } from "./sound-toggle";
import { ScrollProgress } from "./scroll-progress";

/** Global scroll shell: smooth scroll, first-load loader, nav rail, sound toggle, progress bar. */
export function Shell() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <NavRail />
      <SoundToggle />
      <ScrollProgress />
    </>
  );
}
