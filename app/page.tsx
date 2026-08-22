import Link from "next/link";
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
import { getBestsellers, getCategories, getCategoryImage, getFeatured, getProductBySlug, getProductCount, getVariantCount } from "@/lib/data";
import { SITE } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";

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
    text: "Send us a reference photo, a catalogue piece or just your room measurements on WhatsApp.",
  },
  {
    icon: Palette,
    title: "Choose wood & finish",
    text: "Pick from solid sheesham, teak, walnut, engineered wood and a full palette of finishes and fabrics.",
  },
  {
    icon: Hammer,
    title: "We craft it",
    text: "Your piece is built to order in our Kirti Nagar workshop — you get progress photos as it takes shape.",
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

export default function HomePage() {
  const featured = getFeatured();
  const bestsellers = getBestsellers();
  const categories = getCategories();
  const heroProduct = getProductBySlug("capri-sofa-sofas");
  const heroImg = heroProduct?.variants[0]?.hero || featured[0]?.variants[0]?.hero || "";

  const stats = [
    { value: `${getProductCount()}+`, label: "Designs" },
    { value: `${getVariantCount()}`, label: "Colour & size options" },
    { value: "10–15", label: "Days lead time" },
    { value: "2×", label: "Saved vs showroom prices" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-walnut-dark">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-50 animate-kenburns" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" />
        </div>
        <div className="wrap relative flex min-h-[75vh] flex-col justify-center py-20">
          <FadeUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/40 bg-brass/15 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse"></span>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brass">
                Factory-Direct Workshop · Kirti Nagar, Delhi
              </p>
            </div>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.08] text-ivory sm:text-6xl">
              Furniture, made the way <em className="text-brass not-italic">you</em> want it.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
              Over 560 bespoke sofas, beds, wardrobes and dining collections — handcrafted to your exact dimensions,
              wood selection and finishes in our own workshop, skipping all showroom retail markups.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/collections" className="btn-brass !py-3.5 text-sm shadow-lift">
                Browse the catalogue <ArrowRight size={16} />
              </Link>
              <Link
                href="/quote"
                className="btn-outline border-ivory/40 bg-white/10 text-ivory backdrop-blur hover:border-ivory hover:bg-ivory hover:text-ink !py-3.5 text-sm"
              >
                Start a custom order
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-14 grid max-w-xl grid-cols-2 gap-6 border-t border-ivory/15 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-semibold text-ivory">{s.value}</p>
                  <p className="mt-1 text-xs text-ivory/65">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Marquee trust strip */}
      <div className="overflow-hidden border-y border-line bg-ivory-dark py-3.5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 text-xs font-semibold uppercase tracking-[0.18em] text-walnut">
              <span>Solid wood · premium plywood</span>
              <span>Made to order</span>
              <span>Custom sizes & finishes</span>
              <span>Factory-direct pricing</span>
              <span>WhatsApp quotes</span>
              <span>Delhi-NCR delivery</span>
              <span>10–15 day lead time</span>
              <span>Warranty on every piece</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="wrap py-20">
        <FadeUp>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The catalogue</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Twelve ways to furnish a home
              </h2>
            </div>
            <Link href="/collections" className="btn-outline">
              View all pieces <ArrowRight size={15} />
            </Link>
          </div>
        </FadeUp>
        <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl bg-ivory-dark"
              >
                <img
                  src={getCategoryImage(c.slug)}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg font-semibold text-ivory">{c.name}</p>
                  <p className="text-xs text-ivory/75">{c.productCount} designs</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Featured pieces */}
      <section className="border-y border-line bg-ivory-dark/50 py-20">
        <div className="wrap">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Handpicked</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Pieces our customers love
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Every design below can be re-made in your size and finish — that's the Craftiva way.
              </p>
            </div>
          </FadeUp>
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {featured.map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Made to order / process */}
      <section className="wrap py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <p className="eyebrow">Made to order, not made to sit</p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              From a photo on your phone to furniture in your living room
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
              Found a design online you love? Send it over. Want a 2.4-metre sofa when the catalogue says
              2.1? We'll build it. Every order starts with a conversation on WhatsApp and ends with a
              piece made exactly for your space.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/process" className="btn-primary">
                How it works <ArrowRight size={15} />
              </Link>
              <Link href="/quote" className="btn-outline">
                Get a custom quote
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
              <span className="flex items-center gap-2"><Ruler size={15} className="text-brass" /> Custom dimensions</span>
              <span className="flex items-center gap-2"><Award size={15} className="text-brass" /> Warranty included</span>
              <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-brass" /> Secure delivery</span>
            </div>
          </FadeUp>
          <StaggerGroup className="grid gap-4">
            {PROCESS.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-lift">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ivory-dark">
                    <step.icon size={20} className="text-walnut" />
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brass-dark">Step {i + 1}</span>
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="wrap pb-20">
          <FadeUp>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Customer favourites</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">Most requested</h2>
              </div>
              <Link href="/collections" className="text-sm font-semibold text-walnut hover:underline">
                Explore all →
              </Link>
            </div>
          </FadeUp>
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
            {bestsellers.map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      {/* Testimonials */}
      <section className="border-y border-line bg-walnut-dark py-20 text-ivory">
        <div className="wrap">
          <FadeUp>
            <p className="eyebrow !text-brass">From our customers</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Homes furnished, promises kept</h2>
          </FadeUp>
          <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="flex h-full flex-col rounded-2xl border border-ivory/15 bg-ivory/5 p-6">
                  <p className="font-display text-4xl leading-none text-brass">“</p>
                  <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-ivory/85">{t.quote}</blockquote>
                  <figcaption className="mt-5 border-t border-ivory/15 pt-4">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-ivory/60">{t.place}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Visit / CTA */}
      <section className="wrap py-20">
        <FadeUp>
          <div className="grid-pattern relative overflow-hidden rounded-3xl border border-line bg-white p-8 sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">See the workshop in person</p>
                <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  Touch the wood, feel the joinery, meet the makers
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-base">
                  Walk into our Kirti Nagar showroom-workshop, browse live pieces, and discuss your order
                  with the craftspeople who will build it. No appointments needed — just say hi.
                </p>
                <div className="mt-7 flex flex-wrap gap-3.5">
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <MapPin size={16} /> Get directions
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <MessageCircle size={16} /> Message us first
                  </a>
                </div>
                <p className="mt-5 text-xs text-muted">
                  {SITE.address} · {SITE.hours}
                </p>
              </div>
              <div className="grid gap-4">
                {[
                  { icon: Factory, title: "Our own factory", text: "We build everything in-house — no reselling, no third-party markups." },
                  { icon: Hammer, title: "Craftsmanship you can watch", text: "Joinery, upholstery and finishing all under one roof." },
                  { icon: Truck, title: "Delivered & installed", text: `Doorstep delivery across ${SITE.serviceArea} and pan-India shipping.` },
                ].map((b) => (
                  <div key={b.title} className="flex gap-4 rounded-2xl border border-line bg-ivory p-5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-walnut text-ivory">
                      <b.icon size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{b.title}</p>
                      <p className="mt-1 text-sm text-muted">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}