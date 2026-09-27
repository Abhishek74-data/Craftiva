import Link from "next/link";
import { ArrowRight, Layers, Ruler, Sparkles, Truck } from "lucide-react";
import { PREMIUM } from "@/lib/premium";
import { premiumSrcSet } from "@/lib/images";
import { SITE } from "@/lib/site";
import { FadeUp, Reveal, ScrubHeading, SplitHeading } from "@/components/Motion";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { SectionHead } from "@/components/SectionHead";

/* ── 04 · Craftiva introduction (two columns) ─────────────── */

const FEATURES = [
  { icon: Ruler, label: "Custom sizes", text: "Built to your room, not a standard grid." },
  { icon: Layers, label: "Premium materials", text: "Solid wood, engineered ply, curated fabrics." },
  { icon: Sparkles, label: "Made to order", text: "Every piece is built after you confirm it." },
  { icon: Truck, label: "Factory direct", text: "Workshop pricing — no showroom markup." },
];

export function IntroSplit() {
  return (
    <section className="section wrap">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <FadeUp className="order-2 lg:order-1">
          <p className="eyebrow">Crafted differently</p>
          <SplitHeading
            as="h2"
            text="Furniture made for your space."
            variant="slide"
            className="display-title mt-4 text-[clamp(1.9rem,3.6vw,3.1rem)] text-ivory"
          />
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ash">
            From custom dimensions to finishes and fabrics, Craftiva builds furniture around the way
            you actually live — designed with you, made in our Kirti Nagar workshop, and delivered
            ready for your room.
          </p>

          <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-brass">
                  <f.icon size={16} />
                </span>
                <div>
                  <dt className="text-[13px] font-semibold text-ivory">{f.label}</dt>
                  <dd className="mt-0.5 text-[13px] leading-relaxed text-muted">{f.text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">
              Start a custom project <ArrowRight size={15} className="btn-arrow" />
            </Link>
            <Link href="/about" className="btn btn-outline">
              About Craftiva
            </Link>
          </div>
        </FadeUp>

        {/* self-start aligns the media with the row top so the sticky pin has
            real travel (a centered item only has the row slack to hold in) */}
        <FadeUp delay={0.1} className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
          <div className="relative">
            <ParallaxMedia
              className="shine relative aspect-[4/3] rounded-lg border border-line bg-surface-2"
              distance={20}
              scale
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PREMIUM.introSofa}
                srcSet={premiumSrcSet(PREMIUM.introSofa)}
                sizes="(max-width: 1023px) 100vw, 46vw"
                alt="Craftiva sofa styled in a warm contemporary living room"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
              />
            </ParallaxMedia>
            <div className="absolute bottom-4 left-4 z-10 max-w-[15rem] border border-white/15 bg-espresso/85 px-5 py-4 backdrop-blur-sm">
              <p className="eyebrow eyebrow-light">Kirti Nagar, Delhi</p>
              <p className="mt-1.5 font-display text-[15px] leading-snug text-white">
                Design, build and finish under one roof.
              </p>
            </div>
          </div>
          </Reveal>
        </FadeUp>
      </div>
    </section>
  );
}

/* ── 05 · Two editorial promo blocks ──────────────────────── */

const PROMOS = [
  {
    index: "01",
    image: PREMIUM.bedroom,
    eyebrow: "Custom made",
    title: "Designed around your space.",
    label: "Explore custom furniture",
    href: "/quote",
  },
  {
    index: "02",
    image: PREMIUM.craftHands,
    eyebrow: "Factory direct",
    title: "Crafted directly from our Kirti Nagar workshop.",
    label: "Explore our collection",
    href: "/collections",
  },
];

export function PromoBlocks() {
  return (
    <section className="wrap section-tight pt-0">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {PROMOS.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.1}>
            <Link
              href={p.href}
              className="group shine relative block aspect-[4/5] overflow-hidden rounded-lg border border-line bg-espresso sm:aspect-[16/11] lg:aspect-[5/6]"
            >
              <ParallaxMedia className="absolute inset-0" distance={22}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  srcSet={premiumSrcSet(p.image)}
                  sizes="(max-width: 1023px) 100vw, 47vw"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-[1.01] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
                />
              </ParallaxMedia>
              <span className="absolute inset-0 bg-gradient-to-t from-espresso/92 via-espresso/45 to-espresso/15 transition-colors duration-700 group-hover:from-espresso/95 group-hover:via-espresso/55" />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/10" />

              {/* Editorial index */}
              <span className="absolute right-6 top-5 z-10 font-display text-[13px] font-semibold tracking-[0.3em] text-white/50 sm:right-9 sm:top-7">
                {p.index}
              </span>

              <div className="absolute inset-x-0 bottom-0 z-10 p-7 sm:p-10 lg:p-12">
                <p className="eyebrow eyebrow-light">{p.eyebrow}</p>
                <h3 className="display-title mt-3 max-w-md text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.06] text-white">
                  {p.title}
                </h3>
                <span className="caption-slide mt-7">
                  <span className="flex items-center gap-3 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white">
                    <span className="relative pb-1.5">
                      {p.label}
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
                    </span>
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-500 group-hover:translate-x-2"
                    />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── 20 · Space inspiration ───────────────────────────────── */

const SPACES = [
  { label: "Living room", title: "Sofas built for long evenings", image: PREMIUM.livingRoom, href: "/categories/sofas" },
  { label: "Bedroom", title: "Beds and storage for restful rooms", image: PREMIUM.spaceBedroom, href: "/categories/beds" },
  { label: "Dining", title: "Tables sized to your gatherings", image: PREMIUM.spaceDining, href: "/categories/dining" },
  { label: "Workshop", title: "See where it all comes together", image: PREMIUM.spaceWorkshop, href: "/process" },
];

export function InspirationGrid() {
  return (
    <section className="section wrap">
      <SectionHead
        eyebrow="Spaces made with Craftiva"
        title="Rooms that start in the workshop"
        note="A few of the spaces our furniture is built for — each piece made to the dimensions of the room it lives in."
      />

      <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SPACES.map((s, i) => (
          <FadeUp key={s.href} delay={i * 0.07}>
            <Link href={s.href} className="group block">
              <div className="relative">
                <ParallaxMedia className="shine aspect-[4/5] rounded-lg border border-line bg-surface-2" distance={16}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    srcSet={premiumSrcSet(s.image)}
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 45vw, 23vw"
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                  />
                </ParallaxMedia>
                <span className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent opacity-85 transition-opacity duration-700 group-hover:opacity-100" />

                {/* Arrow reveal, inside the frame */}
                <span className="absolute bottom-5 right-5 z-10 grid h-10 w-10 translate-y-3 place-items-center rounded-full border border-white/50 text-white opacity-0 transition-[transform,opacity] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight size={15} />
                </span>

                {/* Label sits on the image now — editorial card */}
                <span className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <span className="block text-[10.5px] uppercase tracking-[0.2em] text-gold">
                    {s.label}
                  </span>
                  <span className="mt-2 block font-display text-[18px] font-semibold leading-snug text-white transition-transform duration-500 group-hover:-translate-y-0.5">
                    {s.title}
                  </span>
                </span>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ── 30 · Final dark CTA ──────────────────────────────────── */

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />
      <div className="wrap relative section text-center">
        <FadeUp>
          <p className="eyebrow eyebrow-light">Your space. Your size. Your finish.</p>
          <ScrubHeading
            as="h2"
            text="Let's create something that fits your space."
            className="display-title mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)] text-white"
          />
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/70">
            Have a specific size, design or finish in mind? Share a photo or a measurement — we&apos;ll
            come back with a design, a timeline and a factory-direct quote.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/quote" className="btn btn-brass">
              Start your custom project <ArrowRight size={15} className="btn-arrow" />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              WhatsApp us
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
