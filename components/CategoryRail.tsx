import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { premiumCategoryImage } from "@/lib/premium";
import { Rail } from "@/components/Rail";
import { SectionHead } from "@/components/SectionHead";

export function CategoryRail({ categories }: { categories: Category[] }) {
  return (
    <section className="section wrap">
      <SectionHead
        eyebrow="Explore Craftiva"
        title="Shop by category"
        note="Ten furniture categories, each built to order in your dimensions, wood and finish."
        action={
          <Link href="/collections" className="btn btn-outline shrink-0">
            All collections <ArrowRight size={15} className="btn-arrow" />
          </Link>
        }
      />

      <div className="mt-12">
        <Rail ariaLabel="Furniture categories">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group w-[45%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-[18.4%]"
            >
              <div className="relative aspect-square overflow-hidden rounded-full border border-line bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={premiumCategoryImage(c.slug) || "/premium/hero-living-room.jpg"}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 rounded-full bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15" />
                <span className="absolute inset-0 rounded-full border border-transparent transition-all duration-500 group-hover:border-brass/70" />
                <span className="absolute bottom-4 left-1/2 grid h-9 w-9 -translate-x-1/2 translate-y-3 place-items-center rounded-full bg-brass text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight size={15} />
                </span>
              </div>
              <p className="mt-4 text-center font-display text-[17px] font-semibold text-ivory transition-colors group-hover:text-brass">
                {c.name}
              </p>
              <p className="mt-1 text-center text-[10.5px] uppercase tracking-[0.18em] text-muted">
                {c.productCount} designs
              </p>
            </Link>
          ))}
        </Rail>
      </div>
    </section>
  );
}
