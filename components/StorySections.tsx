import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { PREMIUM } from "@/lib/premium";
import { WOOD_OPTIONS } from "@/lib/site";
import { FadeUp, Reveal, StaggerGroup, StaggerItem } from "@/components/Motion";
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
  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PREMIUM.craftHands}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-espresso/92 via-espresso/70 to-espresso/40" />
        <span className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/50" />
      </div>

      <div className="wrap section">
        <div className="max-w-2xl">
          <FadeUp>
            <p className="eyebrow eyebrow-light">The Craftiva workshop</p>
            <h2 className="display-title mt-4 text-[clamp(2rem,4.4vw,3.5rem)] text-white">
              See how your furniture comes together.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/75">
              From the first cut to the final inspection, every piece is built by hand in our Kirti
              Nagar workshop — and we share the progress with you along the way.
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <Link href="/process" className="group mt-9 inline-flex items-center gap-4">
              <span className="relative grid h-14 w-14 place-items-center rounded-full border border-white/40 text-white transition-all duration-500 group-hover:border-brass group-hover:bg-brass">
                <Play size={17} className="translate-x-[1px]" fill="currentColor" />
                <span className="absolute inset-0 -z-10 animate-pulse-soft rounded-full border border-white/25" />
              </span>
              <span className="text-left">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                  Watch our story
                </span>
                <span className="mt-1 block text-[13px] text-white/60">
                  How a design becomes furniture
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
    <section className="border-y border-line bg-surface-2">
      <div className="wrap section">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <FadeUp>
            <p className="eyebrow">Custom furniture</p>
            <h2 className="display-title mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ivory">
              Your space.
              <br />
              Your size.
              <br />
              Your finish.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ash">
              Don&apos;t compromise your space around standard furniture. We build furniture around
              your requirements — from a wardrobe that fits an awkward niche to a sofa that seats
              exactly five.
            </p>
            <Link href="/quote" className="btn btn-primary mt-8">
              Start a custom project <ArrowRight size={15} className="btn-arrow" />
            </Link>
          </FadeUp>

          <StaggerGroup className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {STEPS.map((s) => (
              <StaggerItem key={s.n}>
                <div className="h-full bg-surface p-7 transition-colors duration-500 hover:bg-canvas sm:p-9">
                  <p className="font-display text-3xl font-semibold text-brass">{s.n}</p>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ivory">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ash">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ── 24 · Material story ──────────────────────────────────── */

export function MaterialStory() {
  return (
    <section className="section wrap">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeUp>
          <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PREMIUM.craft}
              alt="Craftsman finishing a solid wood surface in the Craftiva workshop"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
            />
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

            <ul className="mt-9 divide-y divide-line border-y border-line">
              {WOOD_OPTIONS.map((w) => (
                <li key={w.id} className="group flex flex-col gap-1 py-5 transition-colors hover:bg-surface-2 sm:py-6">
                  <p className="text-[14px] font-semibold text-ivory transition-colors group-hover:text-brass">
                    {w.name}
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-ash">{w.desc}</p>
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
