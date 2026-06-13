"use client";

import { SmoothScroll } from "./smooth-scroll";
import { Loader } from "./loader";
import { NavRail } from "./nav-rail";
import { SoundToggle } from "./sound-toggle";
import { ScrollProgress } from "./scroll-progress";
import { PageTransition } from "./page-transition";

/** Global scroll shell: smooth scroll, loader, nav rail, sound, progress, route veil. */
export function Shell() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <NavRail />
      <SoundToggle />
      <ScrollProgress />
      <PageTransition />
    </>
  );
}
