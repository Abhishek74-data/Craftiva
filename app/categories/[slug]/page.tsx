import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle } from "lucide-react";
import { getCategory, getCategories, getCategoryImage, getProductsByCategory } from "@/lib/data";
import { SITE } from "@/lib/site";
import { CategoryBrowser } from "@/components/CategoryBrowser";
import { FadeUp } from "@/components/Motion";
import { SafeImg } from "@/components/SafeImg";
import { TRANSPARENT_PIXEL } from "@/lib/utils";

export const dynamicParams = true;

export function generateStaticParams() {
  const categories = getCategories();
  const seen = new Set<string>();
  const params: { slug: string }[] = [];

  for (const c of categories) {
    if (c.slug && !seen.has(c.slug)) {
      seen.add(c.slug);
      params.push({ slug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: `${category.name} | Craftiva Furniture Delhi`,
    description: category.blurb,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug).filter((p) => !p.needsReview);
  const image = getCategoryImage(slug);

  return (
    <>
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImg
            src={image || TRANSPARENT_PIXEL}
            alt=""
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/40" />
        </div>
        <div className="wrap relative py-16 sm:py-24">
          <nav className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ash">
            <Link href="/" className="hover:text-brass">Home</Link>
            <ChevronRight size={12} />
            <Link href="/collections" className="hover:text-brass">Catalogue</Link>
            <ChevronRight size={12} />
            <span className="text-ivory">{category.name}</span>
          </nav>
          <FadeUp>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-brass">The Catalogue</p>
            <h1 className="display-title mt-3 text-4xl text-ivory sm:text-6xl">{category.name}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ash sm:text-base">{category.blurb}</p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-brass">
              {products.length} designs · {category.imageCount?.toLocaleString("en-IN") || products.length} photos · made to order
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="wrap py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brass/30 bg-brass/10 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-ivory">
              Need a custom size, specific wood or unique fabric?
            </p>
            <p className="text-xs text-ash">
              Every {category.name.toLowerCase()} design can be tailored to your room layout in our Kirti Nagar workshop.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi Craftiva! I'm looking for a custom ${category.name.toLowerCase()} piece.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brass px-4! py-2! text-xs shadow-card"
          >
            <MessageCircle size={14} /> Custom {category.name} Quote
          </a>
        </div>
        <CategoryBrowser products={products} />
      </section>
    </>
  );
}