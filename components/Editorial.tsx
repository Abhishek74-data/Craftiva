import Link from "next/link";
import { ArrowRight, Layers, Ruler, Sparkles, Truck } from "lucide-react";
import { PREMIUM } from "@/lib/premium";
import { SITE } from "@/lib/site";
import { FadeUp, Reveal } from "@/components/Motion";
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
          <h2 className="display-title mt-4 text-[clamp(1.9rem,3.6vw,3.1rem)] text-ivory">
            Furniture made for your space.
          </h2>
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

        <FadeUp delay={0.1} className="order-1 lg:order-2">
          <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PREMIUM.showroom}
              alt="Craftiva furniture styled in a warm contemporary living room"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
            />
            <div className="absolute bottom-4 left-4 max-w-[15rem] border border-white/15 bg-espresso/85 px-5 py-4 backdrop-blur-sm">
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
    image: PREMIUM.bedroom,
    eyebrow: "Custom made",
    title: "Designed around your space.",
    label: "Explore custom furniture",
    href: "/quote",
  },
  {
    image: PREMIUM.craft,
    eyebrow: "Factory direct",
    title: "Crafted at our Kirti Nagar workshop.",
    label: "Explore our collection",
    href: "/collections",
  },
];

export function PromoBlocks() {
  return (
    <section className="wrap pb-6">
      <div className="grid gap-5 lg:grid-cols-2">
        {PROMOS.map((p, i) => (
          <FadeUp key={p.href} delay={i * 0.08}>
            <Link
              href={p.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg border border-line sm:aspect-[16/11]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-espresso/10" />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-700 group-hover:bg-espresso/15" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <p className="eyebrow eyebrow-light">{p.eyebrow}</p>
                <h3 className="display-title mt-3 max-w-sm text-[clamp(1.6rem,2.6vw,2.35rem)] text-white">
                  {p.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white">
                  {p.label}
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-500 group-hover:translate-x-1.5"
                  />
                </span>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ── 20 · Space inspiration ───────────────────────────────── */

const SPACES = [
  { label: "Living room", title: "Sofas built for long evenings", image: PREMIUM.hero, href: "/categories/sofas" },
  { label: "Bedroom", title: "Beds and storage for restful rooms", image: PREMIUM.bedroom, href: "/categories/beds" },
  { label: "Dining", title: "Tables sized to your gatherings", image: PREMIUM.dining, href: "/categories/dining" },
  { label: "Workshop", title: "See where it all comes together", image: PREMIUM.craft, href: "/process" },
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
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10.5px] uppercase tracking-[0.2em] text-brass">{s.label}</p>
                  <p className="mt-1.5 font-display text-[19px] font-semibold leading-snug text-ivory transition-colors group-hover:text-brass">
                    {s.title}
                  </p>
                </div>
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ash transition-all duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-white">
                  <ArrowRight size={14} />
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
          <h2 className="display-title mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.75rem)] text-white">
            Let&apos;s create something that fits your space.
          </h2>
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
