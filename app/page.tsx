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
  const heroProduct = getProductBySlug("capri-sofa-sofas") || featured[0];
  const heroImg = heroProduct?.variants[0]?.hero || "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg";

  const stats = [
    { value: `${getProductCount()}+`, label: "Designs" },
    { value: `${getVariantCount()}`, label: "Colour & size options" },
    { value: "10–15", label: "Days lead time" },
    { value: "2×", label: "Saved vs showroom prices" },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#191614] overflow-hidden font-sans">
      
      {/* 🛋️ HERO BANNER */}
      <section className="relative overflow-hidden bg-[#191614]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImg}
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-40 animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex min-h-[65vh] sm:min-h-[72vh] flex-col justify-center py-12 sm:py-20">
          <FadeUp>
            <p className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#B08D5B] bg-white/10 backdrop-blur px-3 py-1 rounded-full w-max">
              <Factory size={13} /> Factory-direct · Kirti Nagar, Delhi
            </p>
            <h1 className="mt-4 max-w-2xl font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Furniture, made the way <em className="text-[#B08D5B] not-italic">you</em> want it.
            </h1>
            <p className="mt-4 max-w-xl text-xs sm:text-base leading-relaxed text-white/80">
              Over 560 custom sofas, beds, wardrobes and dining pieces — built to your size, wood and
              finish in our own workshop, at prices that skip the showroom.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B08D5B] hover:bg-[#8C6F47] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all"
              >
                Browse the catalogue <ArrowRight size={15} />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur hover:bg-white hover:text-[#191614] px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all"
              >
                Start a custom order
              </Link>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4 sm:gap-6 sm:mt-12 sm:pt-8 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-xl sm:text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 🚀 MARQUEE TRUST STRIP */}
      <div className="overflow-hidden border-y border-[#E8E2D8] bg-[#F4EFEA] py-2.5 sm:py-3.5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex gap-8 sm:gap-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#8C6F47]"
            >
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

      {/* 🗂️ 12 CATEGORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6F47] block mb-1">
                The Master Catalogue
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#191614] leading-tight">
                Twelve ways to furnish a home
              </h2>
            </div>
            <Link
              href="/collections"
              className="self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-[#191614] bg-white hover:bg-[#191614] hover:text-white px-4 py-2 text-xs font-bold text-[#191614] transition-all shrink-0"
            >
              View all pieces <ArrowRight size={14} />
            </Link>
          </div>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#E8E2D8] bg-[#F4EFEA] shadow-2xs hover:shadow-md transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getCategoryImage(c.slug)}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* 🌑 Solid High-Contrast Gradient for perfect text contrast on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                  <p className="font-serif text-xs sm:text-base md:text-lg font-bold text-white leading-snug line-clamp-1 group-hover:text-[#B08D5B] transition-colors">
                    {c.name}
                  </p>
                  <p className="text-[9.5px] sm:text-xs text-white/80 font-medium mt-0.5">
                    {c.productCount} designs
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* ⭐ FEATURED PIECES (Handpicked) */}
      <section className="border-y border-[#E8E2D8] bg-[#F4EFEA]/60 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6F47] block mb-1">
                  Handpicked
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#191614] leading-tight">
                  Pieces our customers love
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-[#706A62]">
                Every design can be custom built in your exact size, wood and finish in our Kirti Nagar workshop.
              </p>
            </div>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featured.slice(0, 8).map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 🔨 MADE TO ORDER / 4-STEP WORKSHOP PROCESS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <FadeUp>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6F47] block mb-1">
              Made to order, not made to sit
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-[#191614]">
              From a photo on your phone to furniture in your living room
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#706A62] sm:mt-5">
              Found a design online you love? Send it over. Want a 2.4-metre sofa when the catalogue says
              2.1? We'll build it. Every order starts with a conversation on WhatsApp and ends with a
              piece made exactly for your space.
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/process"
                className="inline-flex items-center gap-2 rounded-full bg-[#191614] hover:bg-[#8C6F47] px-5 py-2.5 text-xs font-bold text-white transition-all shadow-xs"
              >
                How it works <ArrowRight size={14} />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-full border border-[#191614] bg-white hover:bg-[#FAF8F5] px-5 py-2.5 text-xs font-bold text-[#191614] transition-all"
              >
                Get a custom quote
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-xs font-semibold text-[#191614]">
              <span className="flex items-center gap-1.5"><Ruler size={14} className="text-[#8C6F47]" /> Custom dimensions</span>
              <span className="flex items-center gap-1.5"><Award size={14} className="text-[#8C6F47]" /> Warranty included</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#8C6F47]" /> Secure delivery</span>
            </div>
          </FadeUp>

          <StaggerGroup className="grid gap-3 sm:gap-4">
            {PROCESS.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="flex gap-3.5 rounded-xl sm:rounded-2xl border border-[#E8E2D8] bg-white p-3.5 sm:p-5 shadow-2xs">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F4EFEA] text-[#8C6F47]">
                    <step.icon size={18} />
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#191614]">
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#8C6F47]">
                        Step {i + 1}
                      </span>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed text-[#706A62]">{step.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 🏆 BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-3 sm:px-6 pb-12 sm:pb-20">
          <FadeUp>
            <div className="flex items-end justify-between gap-4 mb-6 sm:mb-10">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6F47] block mb-1">
                  Customer favourites
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#191614]">
                  Most requested
                </h2>
              </div>
              <Link href="/collections" className="text-xs font-bold text-[#8C6F47] hover:underline">
                Explore all →
              </Link>
            </div>
          </FadeUp>

          <StaggerGroup className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
            {bestsellers.slice(0, 6).map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      {/* 💬 TESTIMONIALS */}
      <section className="border-y border-[#362C27] bg-[#191614] py-12 sm:py-20 text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <FadeUp>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#B08D5B] block mb-1">
              From our customers
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold">
              Homes furnished, promises kept
            </h2>
          </FadeUp>

          <StaggerGroup className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.name}>
                <figure className="flex h-full flex-col rounded-xl sm:rounded-2xl border border-white/15 bg-white/5 p-4.5 sm:p-6">
                  <p className="font-serif text-3xl leading-none text-[#B08D5B]">“</p>
                  <blockquote className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-white/85">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 border-t border-white/15 pt-3">
                    <p className="text-xs sm:text-sm font-bold">{t.name}</p>
                    <p className="text-[10px] text-white/60">{t.place}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 📍 WORKSHOP VISIT & DIRECTIONS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
        <FadeUp>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E8E2D8] bg-white p-5 sm:p-10 lg:p-14 shadow-2xs">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6F47] block mb-1">
                  See the workshop in person
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-[#191614]">
                  Touch the wood, feel the joinery, meet the makers
                </h2>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#706A62]">
                  Walk into our Kirti Nagar showroom-workshop, browse live pieces, and discuss your
                  order with the craftspeople who will build it. No appointments needed — just say hi.
                </p>
                
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#191614] hover:bg-[#8C6F47] px-5 py-2.5 text-xs font-bold text-white transition-all shadow-xs"
                  >
                    <MapPin size={14} /> Get directions
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#191614] bg-white hover:bg-[#FAF8F5] px-5 py-2.5 text-xs font-bold text-[#191614] transition-all"
                  >
                    <MessageCircle size={14} className="text-[#25D366]" /> Message us first
                  </a>
                </div>

                <p className="mt-4 text-[11px] text-[#706A62]">
                  {SITE.address} · {SITE.hours}
                </p>
              </div>

              <div className="grid gap-3">
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
                  <div
                    key={b.title}
                    className="flex gap-3.5 rounded-xl border border-[#E8E2D8] bg-[#FAF8F5] p-3.5 sm:p-4"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#191614] text-[#FAF7F2]">
                      <b.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#191614]">{b.title}</p>
                      <p className="mt-0.5 text-[11px] text-[#706A62]">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}