import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle } from "lucide-react";
import { getCategory, getCategories, getCategoryImage, getProductsByCategory } from "@/lib/data";
import { SITE } from "@/lib/site";
import { CategoryBrowser } from "@/components/CategoryBrowser";
import { FadeUp } from "@/components/Motion";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category" };
  return {
    title: category.name,
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
      <section className="relative overflow-hidden bg-walnut-dark">
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 to-ink/40" />
        </div>
        <div className="wrap relative py-16 sm:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-ivory/70">
            <Link href="/" className="hover:text-brass">Home</Link>
            <ChevronRight size={12} />
            <Link href="/collections" className="hover:text-brass">Catalogue</Link>
            <ChevronRight size={12} />
            <span className="text-ivory">{category.name}</span>
          </nav>
          <FadeUp>
            <h1 className="mt-4 font-display text-4xl font-semibold text-ivory sm:text-5xl">{category.name}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/80 sm:text-base">{category.blurb}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              {products.length} designs · {category.imageCount.toLocaleString("en-IN")} photos · made to order
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="wrap py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brass/30 bg-brass/10 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-ink">
              Need a custom size, specific wood or unique fabric?
            </p>
            <p className="text-xs text-ink-soft">
              Every {category.name.toLowerCase()} design can be tailored to your room layout in our Kirti Nagar workshop.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(`Hi Craftiva! I'm looking for a custom ${category.name.toLowerCase()} piece.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brass !px-4 !py-2 text-xs shadow-card"
          >
            <MessageCircle size={14} /> Custom {category.name} Quote
          </a>
        </div>
        <CategoryBrowser products={products} />
      </section>
    </>
  );
}