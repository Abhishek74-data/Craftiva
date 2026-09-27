"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Scroll-anchored media frame.
 *
 * The frame scrolls with the document while the image inside drifts a few
 * pixels against it (transform-only, image overscanned by 8% on each edge so
 * no gaps ever show). The eye reads it as: content moves, media stays
 * anchored, media has subtle independent movement.
 *
 * Disabled below md and for prefers-reduced-motion. Callers pass the frame's
 * own position/size classes (e.g. `relative aspect-[4/5]` or `absolute
 * inset-0`) — the component only adds overflow clipping.
 */
export function ParallaxMedia({
  children,
  className = "",
  distance = 20,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={enabled && !reduce ? { y } : undefined}
        className="absolute inset-x-0 -inset-y-[8%]"
      >
        {children}
      </motion.div>
    </div>
  );
}
