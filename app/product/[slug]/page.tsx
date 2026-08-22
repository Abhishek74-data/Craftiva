import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  ChevronRight,
  Factory,
  Hammer,
  MessageCircle,
  Palette,
  Ruler,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getAllProducts, getProductBySlug, getRelated } from "@/lib/data";
import { SITE } from "@/lib/site";
import { ProductGallery } from "@/components/ProductGallery";
import { PriceTag, QuoteCTA } from "@/components/QuoteCTA";
import { WishlistButton } from "@/components/wishlist";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp } from "@/components/Motion";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelated(product);
  const colours = [...new Set(product.variants.map((v) => v.colour).filter(Boolean))];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.variants[0]?.hero,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/MadeToOrder",
      url: `${SITE.url}/product/${product.slug}`,
      description: product.price.note,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="wrap py-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-walnut">Home</Link>
          <ChevronRight size={12} />
          <Link href={`/categories/${product.category.slug}`} className="hover:text-walnut">
            {product.category.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <ProductGallery product={product} />

          <div className="lg:sticky lg:top-32 lg:self-start">
            <FadeUp>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{product.subcategory} · {product.category.name}</p>
                  <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                    {product.name}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-xs text-muted">
                    <Factory size={13} className="text-brass" />
                    Made to order · {product.leadTime} lead time
                  </p>
                </div>
                <WishlistButton slug={product.slug} name={product.name} />
              </div>

              <div className="mt-5 rounded-2xl border border-line bg-white p-5 shadow-xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Estimated Factory Price</p>
                <div className="mt-1">
                  <PriceTag price={product.price} className="text-2xl font-bold font-display text-walnut-dark" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{product.price.note}</p>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{product.shortDescription}</p>

              <div className="mt-7">
                <QuoteCTA productName={product.name} variantName={colours[0]} />
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  { icon: Ruler, label: "Any size, built to your room spec" },
                  { icon: Palette, label: `${colours.length || 1} finish${colours.length === 1 ? "" : "es"} available` },
                  { icon: Hammer, label: "Crafted in Kirti Nagar workshop" },
                  { icon: ShieldCheck, label: "1-Year structural warranty" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-3">
                    <b.icon size={16} className="shrink-0 text-brass" />
                    <span className="text-xs font-medium text-ink-soft">{b.label}</span>
                  </div>
                ))}
              </div>

              {product.materials.length > 0 && (
                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Materials</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {product.materials.map((m) => (
                      <span key={m} className="rounded-full bg-ivory-dark px-3.5 py-1.5 text-xs font-medium text-ink-soft">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.description && product.description !== product.shortDescription && (
                <details className="group mt-7 rounded-2xl border border-line bg-white">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-ink">
                    Full description
                    <ChevronRight size={15} className="transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft">
                    {product.description}
                  </p>
                </details>
              )}

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-brass/30 bg-brass/10 p-4">
                <Award size={18} className="mt-0.5 shrink-0 text-brass-dark" />
                <p className="text-xs leading-relaxed text-ink-soft">
                  <strong className="text-ink">Factory-direct guarantee:</strong> you're buying from the
                  workshop that builds it. Share your room size and desired finish on WhatsApp and we'll
                  quote the exact piece — usually in under an hour.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
                <span className="flex items-center gap-1.5"><Truck size={13} /> {SITE.serviceArea} delivery & pan-India shipping</span>
                <span className="flex items-center gap-1.5"><MessageCircle size={13} /> Replies in working hours</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory-dark/50 py-16">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">You might also like</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink">More {product.category.name.toLowerCase()}</h2>
              </div>
              <Link href={`/categories/${product.category.slug}`} className="text-sm font-semibold text-walnut hover:underline">
                See all →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.familyKey} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}