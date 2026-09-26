import Link from "next/link";
import { ArrowRight, Factory, Hammer, MapPin, MessageCircle, Truck } from "lucide-react";
import {
  getBestsellers,
  getCategories,
  getCategory,
  getCategoryImage,
  getFeatured,
  getProductCount,
} from "@/lib/data";
import { SITE } from "@/lib/site";
import { PREMIUM, premiumCategoryImage } from "@/lib/premium";
import { Hero } from "@/components/Hero";
import { CategoryRail } from "@/components/CategoryRail";
import { IntroSplit, PromoBlocks, InspirationGrid, FinalCTA } from "@/components/Editorial";
import { WorkshopBanner, CustomSteps, MaterialStory } from "@/components/StorySections";
import { ProductRail, CategoryShowcase } from "@/components/ProductRail";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/Motion";

const TRUST_MARQUEE = [
  "Solid wood & premium plywood",
  "Made to order",
  "Custom sizes & finishes",
  "Factory-direct pricing",
  "WhatsApp quotes",
  "Delhi-NCR delivery",
  "10–15 day lead time",
  "Kirti Nagar workshop",
];

function Marquee() {
  return (
    <div className="overflow-hidden border-b border-line bg-ink-soft py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-10 text-[10.5px] font-semibold uppercase tracking-[0.26em] text-brass">
            {TRUST_MARQUEE.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeatured();
  const selected = getBestsellers();
  const productCount = getProductCount();
  const sofas = getCategory("sofas");

  return (
    <>
      {/* 02 · Cinematic hero */}
      <Hero
        image={PREMIUM.hero}
        eyebrow="Crafted for your space"
        titleLines={["Furniture crafted", "around the way you live."]}
        text="Custom furniture, made to order and crafted directly from our Kirti Nagar workshop — in your size, your wood and your finish."
        primary={{ label: "Explore collection", href: "/collections" }}
        secondary={{ label: "Build your custom piece", href: "/quote" }}
        meta={[
          { label: "Designs", value: `${productCount}` },
          { label: "Categories", value: `${categories.length}` },
          { label: "Lead time", value: SITE.leadTime },
        ]}
      />

      <Marquee />

      {/* 03 · Shop by category */}
      <CategoryRail categories={categories} />

      {/* 04 · Craftiva introduction */}
      <IntroSplit />

      {/* 05 · Two editorial blocks */}
      <PromoBlocks />

      {/* 06 · Featured collection */}
      <section className="section border-y border-line bg-surface-2">
        <div className="wrap">
          <SectionHead
            eyebrow="Featured Craftiva collection"
            title="Selected pieces from our furniture collection"
            note="Every design can be custom built in your exact size, wood and finish."
            action={
              <Link href="/collections" className="btn btn-outline shrink-0">
                Browse all <ArrowRight size={15} className="btn-arrow" />
              </Link>
            }
          />
          <StaggerGroup className="mt-11 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-7 lg:grid-cols-4">
            {featured.map((p) => (
              <StaggerItem key={p.familyKey}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 07 · Editorial category showcase */}
      {sofas && (
        <div className="py-16 lg:py-24">
          <CategoryShowcase
            eyebrow="Made for the living room"
            title="Sofas built around your room"
            description="From a compact two-seater to a four-metre L-shaped sectional — choose the frame, the fabric and the depth, and we build it to your measurements."
            image={premiumCategoryImage("sofas") || getCategoryImage("sofas")}
            href="/categories/sofas"
            ctaLabel="Explore sofas"
            countLabel={`${sofas.productCount} designs · custom sizes available`}
          />
        </div>
      )}

      {/* 08 · Workshop / story banner */}
      <WorkshopBanner />

      {/* 09 · Space inspiration */}
      <InspirationGrid />

      {/* 10 · Selected pieces rail */}
      <div className="border-y border-line bg-surface-2">
        <ProductRail
          products={selected}
          eyebrow="Selected by Craftiva"
          title="Pieces worth looking at first"
          note="A short list from the workshop floor — popular formats we build again and again."
        />
      </div>

      {/* 11 · Custom furniture steps */}
      <CustomSteps />

      {/* 12 · Material story */}
      <MaterialStory />

      {/* 13 · Workshop visit & trust */}
      <section className="section border-y border-line bg-surface-2">
        <div className="wrap">
          <FadeUp>
            <div className="grid overflow-hidden border border-line bg-surface lg:grid-cols-2">
              <div className="p-6 sm:p-10 lg:p-14">
                <p className="eyebrow">See the workshop in person</p>
                <h2 className="display-title mt-4 text-[clamp(1.7rem,3vw,2.5rem)] text-ivory">
                  Touch the wood, feel the joinery, meet the makers
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ash">
                  Walk into our Kirti Nagar showroom-workshop, browse live pieces, and discuss your
                  order with the craftspeople who will build it. No appointment needed.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <MapPin size={15} /> Get directions
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <MessageCircle size={15} className="text-[#25D366]" /> Message us first
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
                title: "Our own workshop",
                text: "Everything is built in-house — no reselling, no third-party markups.",
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
              <div key={b.title} className="flex gap-4 border border-line bg-canvas p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
                  <b.icon size={16} />
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ivory">{b.title}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 · Final CTA */}
      <FinalCTA />
    </>
  );
}
