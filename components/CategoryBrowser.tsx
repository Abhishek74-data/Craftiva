"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "featured" | "name" | "variants";

export function CategoryBrowser({ products }: { products: Product[] }) {
  const [subcat, setSubcat] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const subcats = useMemo(
    () => [...new Set(products.map((p) => p.subcategory).filter(Boolean))].sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let list = subcat === "all" ? products : products.filter((p) => p.subcategory === subcat);
    list = [...list];
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "variants") list.sort((a, b) => b.variantCount - a.variantCount);
    return list;
  }, [products, subcat, sort]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubcat("all")}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              subcat === "all"
                ? "border-ivory bg-ivory text-ink"
                : "border-line bg-[#f7f4ec] text-ash hover:border-brass hover:text-brass"
            }`}
          >
            All ({products.length})
          </button>
          {subcats.map((s) => {
            const countInSub = products.filter((p) => p.subcategory === s).length;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSubcat(s)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  subcat === s
                    ? "border-ivory bg-ivory text-ink"
                    : "border-line bg-[#f7f4ec] text-ash hover:border-brass hover:text-brass"
                }`}
              >
                {s} ({countInSub})
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-2 text-xs text-muted">
          <SlidersHorizontal size={14} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-line bg-[#f7f4ec] px-3.5 py-2 text-xs font-semibold text-ivory focus:border-brass focus:outline-none"
          >
            <option value="featured">Most popular</option>
            <option value="variants">Most options</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.familyKey} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-lg border border-dashed border-line bg-[#f7f4ec] p-12 text-center">
          <p className="font-display text-lg font-semibold text-ivory">No pieces in this subcategory yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            We can make any custom variation for you. Send us your dimensions or photo!
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={() => setSubcat("all")} className="btn btn-primary">
              View all ({products.length})
            </button>
          </div>
        </div>
      )}
    </>
  );
}