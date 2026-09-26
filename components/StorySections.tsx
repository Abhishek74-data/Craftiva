"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { PREMIUM } from "@/lib/premium";
import { WOOD_OPTIONS } from "@/lib/site";
import { FadeUp, Reveal, SplitHeading, StaggerGroup, StaggerItem } from "@/components/Motion";
import { SectionHead } from "@/components/SectionHead";

/* ── 19 · Full-width workshop / video-style section ───────── */

const WORKSHOP_STEPS = [
  "Design",
  "Material selection",
  "Cutting",
  "Assembly",
  "Finishing",
  "Final inspection",
];

export function WorkshopBanner() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-espresso">
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={reduce ? undefined : { y: imageY }}
          className="absolute inset-[-10%_0]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PREMIUM.craft}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover animate-[slow-pan_30s_ease-in-out_infinite_alternate]"
          />
        </motion.div>
        <span className="absolute inset-0 bg-gradient-to-r from-espresso/92 via-espresso/70 to-espresso/35" />
        <span className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-transparent to-espresso/45" />
      </div>

      <div className="wrap section">
        <div className="max-w-2xl">
          <FadeUp>
            <p className="eyebrow eyebrow-light">The Craftiva workshop</p>
            <SplitHeading
              as="h2"
              text="See how your furniture comes together."
              className="display-title mt-4 text-[clamp(2.1rem,4.6vw,3.75rem)] text-white"
            />
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/75">
              From the first cut to the final inspection, every piece is built by hand in our Kirti
              Nagar workshop — and we share the progress with you along the way.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <Link href="/process" className="group mt-10 inline-flex items-center gap-6">
              <span className="relative grid h-24 w-24 place-items-center sm:h-28 sm:w-28">
                {/* Rotating editorial ring */}
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full animate-spin-slow text-white/60"
                >
                  <defs>
                    <path
                      id="workshop-ring"
                      fill="none"
                      d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <text
                    fill="currentColor"
                    style={{ fontSize: "7.5px", letterSpacing: "1.4px" }}
                  >
                    <textPath href="#workshop-ring">
                      CRAFTIVA · THE WORKSHOP · HOW IT&apos;S MADE ·
                    </textPath>
                  </text>
                </svg>
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-sm transition-all duration-500 group-hover:border-brass group-hover:bg-brass">
                  <Play size={16} className="translate-x-[1px]" fill="currentColor" />
                </span>
              </span>
              <span className="text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                  Watch our process
                </span>
                <span className="mt-1.5 block text-[13px] text-white/60">
                  How a design becomes furniture →
                </span>
              </span>
            </Link>
          </FadeUp>

          <FadeUp delay={0.2}>
            <ol className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-6">
              {WORKSHOP_STEPS.map((s, i) => (
                <li key={s} className="flex items-baseline gap-2">
                  <span className="text-[11px] font-semibold text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12.5px] uppercase tracking-[0.14em] text-white/70">{s}</span>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ── 18 · Custom furniture steps ──────────────────────────── */

const STEPS = [
  { n: "01", title: "Choose a design", text: "Start from a catalogue piece, a photo you love, or an idea entirely your own." },
  { n: "02", title: "Customise dimensions", text: "We measure for your room — width, depth, height, storage and layout." },
  { n: "03", title: "Select materials & finish", text: "Wood, fabric, laminate and hardware, confirmed with swatches before we build." },
  { n: "04", title: "Get your quote", text: "A factory-direct price, a production timeline and photos as it takes shape." },
];

export function CustomSteps() {
  return (
    <section className="section wrap">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <FadeUp className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Custom furniture</p>
          <h2 className="display-title mt-5 text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-ivory">
            Your space.
            <br />
            Your size.
            <br />
            <span className="text-brass">Your finish.</span>
          </h2>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ash">
            Don&apos;t compromise your space around standard furniture. We build furniture around
            your requirements — from a wardrobe that fits an awkward niche to a sofa that seats
            exactly five.
          </p>
          <Link href="/quote" className="btn btn-primary mt-9">
            Start a custom project <ArrowRight size={15} className="btn-arrow" />
          </Link>
        </FadeUp>

        <StaggerGroup className="border-t border-line">
          {STEPS.map((s) => (
            <StaggerItem key={s.n}>
              <div className="group flex gap-6 border-b border-line py-8 transition-colors duration-500 hover:bg-surface-2 sm:gap-9 sm:py-10">
                <p className="font-display text-[44px] font-semibold leading-none text-line-strong transition-colors duration-500 group-hover:text-brass sm:text-[56px]">
                  {s.n}
                </p>
                <div className="pt-1">
                  <h3 className="font-display text-lg font-semibold text-ivory sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14px] leading-relaxed text-ash">{s.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ── 24 · Material story ──────────────────────────────────── */

const WOOD_TONE: Record<string, string> = {
  sheesham: "#7A4A2B",
  teak: "#B08A55",
  walnut: "#5A3A26",
  mango: "#A9743F",
  plywood: "#D8C39D",
};

export function MaterialStory() {
  return (
    <section className="section wrap">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PREMIUM.dining}
              alt="Solid wood dining furniture in a warm contemporary interior"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.04] sm:aspect-[4/3] lg:aspect-[4/5]"
            />
            <div className="absolute bottom-4 left-4 max-w-[15rem] border border-white/15 bg-espresso/85 px-5 py-4 backdrop-blur-sm">
              <p className="eyebrow eyebrow-light">Swatches first</p>
              <p className="mt-1.5 font-display text-[15px] leading-snug text-white">
                You approve the material before we cut.
              </p>
            </div>
          </div>
          </Reveal>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="lg:pt-4">
            <SectionHead
              eyebrow="Materials that make the difference"
              title="Every piece starts with the right material."
              note="We work in solid hardwoods and engineered boards, matched to how the piece will be used — and we share swatches before anything is cut."
            />

            <ul className="mt-9 border-t border-line">
              {WOOD_OPTIONS.map((w) => (
                <li
                  key={w.id}
                  className="group flex gap-4 border-b border-line py-5 transition-colors duration-500 hover:bg-surface-2 sm:gap-5 sm:py-6"
                >
                  <span
                    className="mt-1 h-9 w-9 shrink-0 rounded-full border border-black/10 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundColor: WOOD_TONE[w.id] || "#C9B69B" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[14.5px] font-semibold text-ivory transition-colors duration-500 group-hover:text-brass">
                      {w.name}
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ash">{w.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[13px] text-muted">
              Fabric, laminate, veneer and hardware options are shared with swatches during
              quoting — ask us for the current palette.
            </p>

            <Link href="/quote" className="btn btn-outline mt-7">
              Request material swatches <ArrowRight size={15} className="btn-arrow" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
