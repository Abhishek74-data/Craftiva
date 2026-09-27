"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion policy: when the user prefers reduced motion, framer
 * transform/layout animations resolve instantly (opacity fades remain,
 * which are movement-free and WCAG-safe). Pure runtime config — nothing
 * here changes rendered markup, so hydration is unaffected.
 */
export function MotionSetup({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
