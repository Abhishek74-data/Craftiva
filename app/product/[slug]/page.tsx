import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelated } from "@/lib/data";
import { SITE } from "@/lib/site";
import { ProductView } from "@/components/ProductView";
import { ProductCard } from "@/components/ProductCard";
import { TRANSPARENT_PIXEL } from "@/lib/utils";

export const dynamicParams = true;

export function generateStaticParams() {
  const products = getAllProducts();
  const seen = new Set<string>();
  const params: { slug: string }[] = [];

  for (const p of products) {
    if (p.slug && !seen.has(p.slug)) {
      seen.add(p.slug);
      params.push({ slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: `${product.name} | Craftiva Furniture Delhi`,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelated(product, 4);

  // Only advertise a price in structured data when the product genuinely has one.
  // The site is quote-based (no visible prices), so emitting a hardcoded number
  // would mismatch the page and risk Google showing a price we never set.
  const hasPrice = typeof product.price?.from === "number";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.variants[0]?.hero || TRANSPARENT_PIXEL,
    brand: { "@type": "Brand", name: SITE.name },
    ...(hasPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price!.from,
            availability: "https://schema.org/MadeToOrder",
            url: `${SITE.url}/product/${product.slug}`,
            description: product.price?.note || "Direct workshop pricing",
          },
        }
      : {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            availability: "https://schema.org/MadeToOrder",
            url: `${SITE.url}/product/${product.slug}`,
            description: "Made to order — factory-direct price on request",
          },
        }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen py-8 sm:py-12">
        <div className="wrap">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-muted mb-7">
            <Link href="/" className="transition-colors hover:text-brass">Home</Link>
            <ChevronRight size={12} />
            <Link href={`/categories/${product.category?.slug || "living"}`} className="transition-colors hover:text-brass">
              {product.category?.name || "Furniture"}
            </Link>
            <ChevronRight size={12} />
            <span className="text-ivory font-semibold">{product.name}</span>
          </nav>

          {/* Interactive Product View (Multi-Photo Gallery, Size/Colour Selectors, Specs Table, Dynamic WhatsApp Quote) */}
          <ProductView product={product} />

        </div>
      </div>

      {/* Related Products Carousel */}
      {related.length > 0 && (
        <section className="border-t border-line bg-sand py-16 lg:py-24">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-brass">Similar Workshop Pieces</span>
                <h2 className="display-title mt-2 text-2xl text-ivory sm:text-4xl">
                  More from {product.category?.name || "Collection"}
                </h2>
              </div>
              <Link href={`/categories/${product.category?.slug || "living"}`} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brass transition-colors hover:text-ivory">
                View All {product.category?.name || "Collection"} →
              </Link>
            </div>
            <div className="mt-8 h-px w-full bg-gradient-to-r from-brass/70 via-line to-transparent" />
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
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