import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelated } from "@/lib/data";
import { SITE } from "@/lib/site";
import { ProductView } from "@/components/ProductView";
import { ProductCard } from "@/components/ProductCard";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.variants[0]?.hero || "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg",
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price?.from || 32000,
      availability: "https://schema.org/MadeToOrder",
      url: `${SITE.url}/product/${product.slug}`,
      description: product.price?.note || "Direct workshop pricing",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
        <div className="wrap">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-[#706A62] mb-6">
            <Link href="/" className="hover:text-[#191614]">Home</Link>
            <ChevronRight size={12} />
            <Link href={`/categories/${product.category?.slug || "living"}`} className="hover:text-[#191614]">
              {product.category?.name || "Furniture"}
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#191614] font-semibold">{product.name}</span>
          </nav>

          {/* Interactive Product View (Multi-Photo Gallery, Size/Colour Selectors, Specs Table, Dynamic WhatsApp Quote) */}
          <ProductView product={product} />

        </div>
      </div>

      {/* Related Products Carousel */}
      {related.length > 0 && (
        <section className="border-t border-[#E8E2D8] bg-white py-14">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6F47]">Similar Workshop Pieces</span>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#191614]">
                  More from {product.category?.name || "Collection"}
                </h2>
              </div>
              <Link href={`/categories/${product.category?.slug || "living"}`} className="text-xs font-bold text-[#8C6F47] hover:underline">
                View All {product.category?.name || "Collection"} →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
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