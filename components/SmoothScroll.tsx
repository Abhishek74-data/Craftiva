"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { setLenis, getLenis } from "@/lib/lenis";

/**
 * The one smooth-scroll system for the site.
 *
 * Lenis intercepts wheel input and interpolates the real window scroll position
 * on the compositor-friendly rAF loop, so every scroll-driven effect already in
 * the page (motion useScroll parallax, sticky headers, reveals, native sticky)
 * consumes one smoothed scroll stream. Nothing else touches page scroll.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.0,
      // fast start, gentle settle — controlled, never floaty
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      gestureOrientation: "vertical",
      respectReducedMotion: true,
    });
    setLenis(lenis);
    return () => {
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
