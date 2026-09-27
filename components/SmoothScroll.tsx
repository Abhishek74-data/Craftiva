"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { cancelFrame, frame } from "motion";
import { setLenis, getLenis } from "@/lib/lenis";

/**
 * The one smooth-scroll system for the site.
 *
 * Lenis interpolates the real window scroll position with frame-rate-
 * independent damping (lerp) — wheel/touch input sets the target immediately,
 * and the viewport glides to it with a natural momentum tail. It does NOT run
 * its own rAF: the scroll step is scheduled into Motion's single frame loop
 * (frame.read with keepAlive), in the read phase, so the scroll position is
 * up to date before any scroll-linked transforms are computed in the same
 * frame. One animation loop drives the entire scroll experience.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
      respectReducedMotion: true,
    });
    setLenis(lenis);

    const tick = ({ timestamp }: { timestamp: number }) => {
      lenis.raf(timestamp);
    };
    frame.read(tick, true);

    return () => {
      cancelFrame(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  // Align Lenis with Next's route-change scroll reset.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
