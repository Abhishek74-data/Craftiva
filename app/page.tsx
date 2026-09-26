import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Award,
  Factory,
  Hammer,
  MapPin,
  MessageCircle,
  Palette,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import {
  getBestsellers,
  getCategories,
  getCategoryImage,
  getFeatured,
  getProductBySlug,
  getProductCount,
  getVariantCount,
} from "@/lib/data";
import { SITE } from "@/lib/site";
import { PREMIUM, premiumCategoryImage } from "@/lib/premium";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";
import { TRANSPARENT_PIXEL } from "@/lib/utils";

const TESTIMONIALS = [
  {
    quote:
      "Ordered a modular sofa in a custom size — the fit is perfect for our compact living room. Finished exactly on the date they promised.",
    name: "Ananya R.",
    place: "Saket, New Delhi",
  },
  {
    quote:
      "Visited the Kirti Nagar workshop, picked the wood, and watched them build our bed. The quality at this price is unheard of in showrooms.",
    name: "Rohit & Meera K.",
    place: "Gurugram",
  },
  {
    quote:
      "The team shared photos and progress updates on WhatsApp through every step. Our walnut dining set is the centrepiece of the house now.",
    name: "Sanya T.",
    place: "Noida",
  },
];

const PROCESS = [
  {
    icon: MessageCircle,
    title: "Share your idea",
    text: "Send a reference photo, a catalogue piece or just your room measurements on WhatsApp.",
  },
  {
    icon: Palette,
    title: "Choose wood & finish",
    text: "Solid sheesham, teak, walnut, engineered wood — plus a full palette of finishes and fabrics.",
  },
  {
    icon: Hammer,
    title: "We craft it",
    text: "Built to order in our Kirti Nagar workshop, with progress photos as it takes shape.",
  },
  {
    icon: Truck,
    title: "Delivered & installed",
    text: "Delivered across Delhi-NCR and India, installed in your home within the promised lead time.",
  },
];

export const metadata = {
  title: "Craftiva Furniture — Custom Furniture, Factory-Direct from Kirti Nagar, Delhi",
};

function SectionHead({
  eyebrow,
  title,
  note,
  action,
}: {
  eyebrow: string;
  title: string;
  note?: string;
  action?: ReactNode;
}) {
  return (
    <FadeUp>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display-title mt-3 text-3xl text-ivory sm:text-5xl">{title}</h2>
        </div>
        {action}
      </div>
      {note && <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash">{note}</p>}
      <div className="mt-7 h-px w-full bg-gradient-to-r from-brass/70 via-line to-transparent" />
    </FadeUp>
  );
}

export default function HomePage() {
  const featured = getFeatured();
  const bestsellers = getBestsellers();
  const categories = getCategories();
  const heroProduct = getProductBySlug("capri-sofa-sofas") || featured[0];
  const heroImg = PREMIUM.hero || heroProduct?.variants[0]?.hero || TRANSPARENT_PIXEL;

  const stats = [
    { value: `${getProductCount()}+`, label: "Designs" },
    { value: `${getVariantCount()}`, label: "Colour & size options" },
    { value: "10–15", label: "Days lead time" },
    { value: "2×", label: "Saved vs showroom" },
  ];

  return (
    <div className="bg-ink text-ivory overflow-hidden">
      {/* 🛋️ HERO */}
      <section className="relative isolate flex min-h-[88vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImg}
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-95 animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/72 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#efebe3] via-[#efebe3]/45 to-transparent" />
        </div>

        <div className="wrap pb-14 pt-32 sm:pb-20 sm:pt-40">
          <FadeUp>
            <p className="inline-flex items-center gap-2 border border-brass/40 bg-white/75 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-brass backdrop-blur w-max">
              <Factory size={13} /> Factory-direct · Kirti Nagar, Delhi
            </p>
            <h1 className="display-title mt-7 max-w-3xl text-[2.6rem] leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
              Furniture, made the way{" "}
              <em className="not-italic text-brass">you</em> want it.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash sm:text-base">
              Over {getProductCount()} custom sofas, beds, wardrobes and dining pieces — built to your
              size, wood and finish in our own workshop, at prices that skip the showroom.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/collections" className="btn-primary px-7! text-[13px]!">
                Browse the catalogue <ArrowRight size={15} />
              </Link>
              <Link href="/quote" className="btn-outline px-7! text-[13px]!">
                Start a custom order
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/85 px-5 py-6 backdrop-blur-sm">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <p className="font-display text-2xl font-light tracking-tight text-ivory sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">{s.label}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      </section>

      {/* 🚀 MARQUEE TRUST STRIP */}
      <div className="overflow-hidden border-y border-line bg-ink-soft py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-brass/90">
              <span>Solid wood · premium plywood</span>
              <span>Made to order</span>
              <span>Custom sizes &amp; finishes</span>
              <span>Factory-direct pricing</span>
              <span>WhatsApp quotes</span>
              <span>Delhi-NCR delivery</span>
              <span>10–15 day lead time</span>
              <span>Warranty on every piece</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🗂️ CATEGORY SHOWCASE */}
      <section className="wrap py-20 sm:py-28">
        <SectionHead
          eyebrow="The Master Catalogue"
          title="Furnish every room in the house"
          action={
            <Link href="/collections" className="btn-outline shrink-0 px-5! py-2.5! text-xs!">
              View all pieces <ArrowRight size={14} />
            </Link>
          }
        />

        <StaggerGroup className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-surface-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={premiumCategoryImage(c.slug) || getCategoryImage(c.slug)}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-95 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <p className="font-display text-sm font-medium text-ivory leading-snug line-clamp-1 transition-colors group-hover:text-brass sm:text-lg">
                    {c.name}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ash">
                    {c.productCount} designs
                  </p>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-brass transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* ⭐ FEATURED PIECES */}
      <section className="border-y border-line bg-[#e9e5db] py-20 sm:py-28">
        <div className="wrap">
          <SectionHead
            eyebrow="Handpicked"
            title="Pieces our customers love"
            note="Every design can be custom built in your exact size, wood and finish in our Kirti Nagar workshop."
          />

          <StaggerGroup className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {featured.slice(0, 8).map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 🔨 MADE TO ORDER / 4-STEP WORKSHOP PROCESS */}
      <section className="wrap py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeUp className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-lg border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PREMIUM.craft}
                alt="Craftiva craftsmen shaping solid wood in the Kirti Nagar workshop"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/75 to-transparent p-5 sm:p-7">
                <p className="text-[10px] uppercase tracking-[0.28em] text-brass">Kirti Nagar workshop</p>
                <p className="mt-2 font-display text-base text-ivory sm:text-xl">
                  Built by hand, one piece at a time
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp className="order-1 lg:order-2">
            <p className="eyebrow">Made to order, not made to stock</p>
            <h2 className="display-title mt-3 text-3xl text-ivory sm:text-5xl">
              From a photo on your phone to furniture in your living room
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ash sm:text-base">
              Found a design online you love? Send it over. Want a 2.4-metre sofa when the catalogue says
              2.1? We&apos;ll build it. Every order starts with a conversation on WhatsApp and ends with a
              piece made exactly for your space.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/process" className="btn-primary px-6! text-xs!">
                How it works <ArrowRight size={14} />
              </Link>
              <Link href="/quote" className="btn-outline px-6! text-xs!">
                Get a custom quote
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ash">
              <span className="flex items-center gap-2">
                <Ruler size={14} className="text-brass" /> Custom dimensions
              </span>
              <span className="flex items-center gap-2">
                <Award size={14} className="text-brass" /> Warranty included
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brass" /> Secure delivery
              </span>
            </div>

            <ol className="mt-10 border-t border-line">
              {PROCESS.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-line py-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
                    <step.icon size={17} />
                  </div>
                  <div>
                    <p className="flex items-baseline gap-3 text-sm font-semibold text-ivory">
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-brass">
                        Step {i + 1}
                      </span>
                      {step.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>
        </div>
      </section>

      {/* 🏆 BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="wrap pb-20 sm:pb-28">
          <SectionHead
            eyebrow="Customer favourites"
            title="Most requested"
            action={
              <Link href="/collections" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brass transition-colors hover:text-ivory">
                Explore all →
              </Link>
            }
          />
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
            {bestsellers.slice(0, 6).map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      {/* 💬 TESTIMONIALS */}
      <section className="relative isolate overflow-hidden border-y border-line py-20 sm:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PREMIUM.craftHands}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/75 via-ink/88 to-ink" />
        <div className="wrap">
          <SectionHead eyebrow="From our customers" title="Homes furnished, promises kept" />

          <StaggerGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="flex h-full flex-col border border-line bg-surface/70 p-6 backdrop-blur-sm sm:p-8">
                  <p className="font-display text-4xl leading-none text-brass">“</p>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ash">{t.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-[13px] font-semibold text-ivory">{t.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted">{t.place}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 📍 WORKSHOP VISIT & DIRECTIONS */}
      <section className="wrap py-20 sm:py-28">
        <FadeUp>
          <div className="grid overflow-hidden border border-line bg-surface lg:grid-cols-2">
            <div className="p-6 sm:p-10 lg:p-14">
              <p className="eyebrow">See the workshop in person</p>
              <h2 className="display-title mt-3 text-3xl text-ivory sm:text-4xl">
                Touch the wood, feel the joinery, meet the makers
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ash">
                Walk into our Kirti Nagar showroom-workshop, browse live pieces, and discuss your order with
                the craftspeople who will build it. No appointments needed — just say hi.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-6! text-xs!">
                  <MapPin size={14} /> Get directions
                </a>
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-6! text-xs!"
                >
                  <MessageCircle size={14} className="text-[#25D366]" /> Message us first
                </a>
              </div>

              <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted">
                {SITE.address} · {SITE.hours}
              </p>
            </div>

            <div className="border-t border-line lg:border-l lg:border-t-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PREMIUM.showroom}
                alt="Inside the Craftiva showroom-workshop in Kirti Nagar, Delhi"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full"
              />
            </div>
          </div>
        </FadeUp>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: Factory,
              title: "Our own factory",
              text: "We build everything in-house — no reselling, no third-party markups.",
            },
            {
              icon: Hammer,
              title: "Craftsmanship you can watch",
              text: "Joinery, upholstery and finishing all under one roof.",
            },
            {
              icon: Truck,
              title: "Delivered & installed",
              text: `Doorstep delivery across ${SITE.serviceArea} and pan-India shipping.`,
            },
          ].map((b) => (
            <div key={b.title} className="flex gap-4 border border-line bg-[#f7f4ee] p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
                <b.icon size={16} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-ivory">{b.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
