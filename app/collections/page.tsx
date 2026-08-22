import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllProducts, getCategories, getProductCount } from "@/lib/data";
import { CollectionsBrowser } from "@/components/CollectionsBrowser";
import { FadeUp } from "@/components/Motion";

export const metadata = {
  title: "All Pieces",
  description: "Browse the full Craftiva catalogue — over 560 custom furniture designs made to order in Kirti Nagar, Delhi.",
};

export default function CollectionsPage() {
  const products = getAllProducts().filter((p) => !p.needsReview);
  const categories = getCategories();

  return (
    <>
      <section className="border-b border-line bg-ivory-dark/60 py-14">
        <div className="wrap">
          <nav className="flex items-center gap-1.5 text-xs text-muted">
            <Link href="/" className="hover:text-walnut">Home</Link>
            <ChevronRight size={12} />
            <span className="text-ink">All Pieces</span>
          </nav>
          <FadeUp>
            <h1 className="mt-4 font-display text-4xl font-semibold text-ink sm:text-5xl">The full catalogue</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
              Every design in our workshop, photographed from our floor. Each piece is made to order — pick
              the base design, then tell us your size, wood and finish.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass-dark">
              {getProductCount()} designs · all made to order
            </p>
          </FadeUp>
          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-walnut hover:text-walnut"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap py-12">
        <CollectionsBrowser products={products} />
      </section>
    </>
  );
}