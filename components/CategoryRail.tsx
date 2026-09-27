"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/types";
import { premiumCategoryImage } from "@/lib/premium";
import { Rail } from "@/components/Rail";
import { SectionHead } from "@/components/SectionHead";

export function CategoryRail({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(0);
  const onActiveChange = useCallback((i: number) => setActive(i), []);

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

      <div className="mt-12 sm:mt-14">
        <Rail ariaLabel="Furniture categories" onActiveChange={onActiveChange}>
          {categories.map((c, i) => {
            const isActive = i === active;
            return (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                aria-current={isActive ? "true" : undefined}
                className="group w-[62%] shrink-0 snap-start sm:w-[34%] md:w-[26%] lg:w-[19.5%]"
              >
                <div
                  className={`relative aspect-square overflow-hidden rounded-full border bg-surface-2 transition-[border-color,box-shadow] duration-700 ease-out ${
                    isActive
                      ? "border-brass shadow-lift"
                      : "border-line group-hover:border-brass/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={premiumCategoryImage(c.slug) || "/premium/hero-living-room.jpg"}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out ${
                      isActive ? "scale-[1.06]" : "group-hover:scale-[1.07]"
                    }`}
                  />
                  <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15" />
                  <span
                    className={`absolute inset-[6px] rounded-full border transition-colors duration-700 ${
                      isActive ? "border-gold/50" : "border-transparent"
                    }`}
                  />
                  <span className="absolute bottom-5 left-1/2 grid h-10 w-10 -translate-x-1/2 translate-y-3 place-items-center rounded-full bg-brass text-white opacity-0 transition-[transform,opacity] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight size={16} />
                  </span>
                </div>

                <p
                  className={`mt-4 text-center font-display text-[17px] font-semibold transition-colors duration-500 ${
                    isActive ? "text-brass" : "text-ivory group-hover:text-brass"
                  }`}
                >
                  {c.name}
                </p>
                <p className="mt-1 text-center text-[10.5px] uppercase tracking-[0.18em] text-muted">
                  {c.productCount} designs
                </p>
              </Link>
            );
          })}
        </Rail>
      </div>
    </section>
  );
}
