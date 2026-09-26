"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MousePointer2 } from "lucide-react";

/**
 * Cinematic full-bleed hero.
 * Sequence: image → eyebrow → headline (line-by-line) → copy → CTAs → scroll cue,
 * then a slow parallax drift on the image while scrolling.
 */
export function Hero({
  image,
  eyebrow,
  titleLines,
  text,
  primary,
  secondary,
  meta,
}: {
  image: string;
  eyebrow: string;
  titleLines: string[];
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  meta?: { label: string; value: string }[];
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.25]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden bg-espresso sm:min-h-[88vh]"
    >
      {/* Image layer */}
      <motion.div
        style={{ y: imageY, scale: imageScale, opacity: fadeOut }}
        className="absolute inset-0 -z-10"
        initial={{ scale: reduce ? 1 : 1.14, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        {/* Editorial overlays: left scrim for type, bottom scrim, vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/88 via-espresso/50 to-espresso/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-espresso/45" />
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_45%,transparent_42%,rgba(33,28,21,0.42)_100%)]" />
      </motion.div>

      {/* Content layer */}
      <div className="wrap relative w-full pb-16 pt-28 sm:pb-24 sm:pt-36">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 h-px w-14 origin-left bg-gold"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow eyebrow-light"
        >
          {eyebrow}
        </motion.p>

        <h1 className="display-title mt-5 max-w-4xl text-[clamp(2rem,7.4vw,5.9rem)] leading-[1.01] tracking-[-0.02em] text-white">
          {titleLines.map((line, i) => (
            <span key={line} className="line-mask">
              <span style={{ animationDelay: `${0.5 + i * 0.12}s` }}>{line}</span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-base"
        >
          {text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link href={primary.href} className="btn btn-brass">
            {primary.label} <ArrowRight size={15} className="btn-arrow" />
          </Link>
          <Link href={secondary.href} className="btn btn-outline-light">
            {secondary.label}
          </Link>
        </motion.div>

        {meta && meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.35 }}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <p className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {m.label}
                  </p>
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/60 sm:right-8 lg:flex"
      >
        Scroll
        <MousePointer2 size={13} className="animate-pulse-soft" />
      </motion.div>
    </section>
  );
}
