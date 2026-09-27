"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { MotionValue, Variants } from "motion/react";

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Left-to-right clip-path image wipe — the exact reveal technique used by
 * premium editorial themes: the frame starts fully clipped from the right
 * (`inset(0 100% 0 0)`) and opens to `inset(0)` over 1.5s with a power2-out
 * curve once the element's top crosses 90% of the viewport.
 *
 * The clip lives on an inner child because a fully-clipped element reports a
 * zero intersection area, which would stop the outer IntersectionObserver
 * (whileInView) from ever firing.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{ hidden: {}, show: {} }}
    >
      <motion.div
        variants={{
          hidden: { clipPath: "inset(0% 100% 0% 0%)" },
          show: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Scroll-progress driver for the scrubbed heading variant. */
function ScrubWord({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [start, end], [0.3, 1]);
  const x = useTransform(progress, [start, end], [-7, 0]);
  return (
    <motion.span className="inline-block" style={{ opacity, x }}>
      {children}
    </motion.span>
  );
}

const HEADING_VARIANTS: Record<
  "rise" | "slide",
  {
    hidden: Variants[string];
    show: Variants[string];
    group: { stagger: number };
  }
> = {
  /** Word-by-word rise (default editorial entrance). */
  rise: {
    hidden: { opacity: 0, y: "0.55em" },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    group: { stagger: 0.05 },
  },
  /**
   * Horizontal slide with a back-out overshoot — words fly in from the right
   * and settle with a slight bounce (SplitText chars x→0, Back.easeOut).
   */
  slide: {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] } },
    group: { stagger: 0.03 },
  },
};

/**
 * Scroll-scrubbed heading fill: words start at 30% opacity nudged left and
 * fill to full strength as the heading travels from 92% → 60% of the viewport
 * (progress-linked, replays both directions while scrolling).
 */
export function ScrubHeading({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "h1" | "p";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.6"],
  });
  const words = text.split(" ");

  if (reduce) {
    const Static = Tag;
    return <Static className={className}>{text}</Static>;
  }

  const M = motion[Tag] as typeof motion.h2;
  const n = words.length;
  // Each word fills over the final 30% of the window; starts are spread over 70%.
  const windowSpan = 0.3;
  const step = n > 1 ? (1 - windowSpan) / (n - 1) : 0;

  return (
    <M ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrubWord
          key={`${word}-${i}`}
          progress={scrollYProgress}
          start={i * step}
          end={i * step + windowSpan}
        >
          {word}
          {i < n - 1 ? "\u00A0" : ""}
        </ScrubWord>
      ))}
    </M>
  );
}

/**
 * Split-heading entrance. `rise` lifts words up; `slide` flings them in from
 * the right with a springy overshoot. Use `ScrubHeading` for the scroll-linked
 * fill effect.
 */
export function SplitHeading({
  text,
  className = "",
  as: Tag = "h2",
  variant = "rise",
}: {
  text: string;
  className?: string;
  as?: "h2" | "h3" | "h1" | "p";
  variant?: "rise" | "slide";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Static = Tag;
    return <Static className={className}>{text}</Static>;
  }

  const M = motion[Tag] as typeof motion.h2;
  const v = HEADING_VARIANTS[variant];

  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: v.group.stagger } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{ hidden: v.hidden, show: v.show }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </M>
  );
}
