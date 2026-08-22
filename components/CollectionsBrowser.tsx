"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Loader2, RotateCcw, Search, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "popular" | "name" | "variants";

export function CollectionsBrowser({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [sort, setSort] = useState<SortKey>("popular");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  useEffect(() => {
    setPage(1);
  }, [searchQuery, category, type, sort]);

  const types = useMemo(
    () => [...new Set(products.map((p) => p.type).filter(Boolean))].sort(),
    [products],
  );

  // Correctly deduplicate category objects by slug
  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; name: string }>();
    for (const p of products) {
      if (p.category && !map.has(p.category.slug)) {
        map.set(p.category.slug, p.category);
      }
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const tokens = q.split(/\s+/);
      list = list.filter((p) => {
        const text = `${p.name} ${p.type} ${p.category.name} ${p.subcategory} ${p.shortDescription} ${p.tags.join(" ")}`.toLowerCase();
        return tokens.every((t) => text.includes(t));
      });
    }
    if (category !== "all") list = list.filter((p) => p.category.slug === category);
    if (type !== "all") list = list.filter((p) => p.type === type);
    list = [...list];
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "variants") list.sort((a, b) => b.variantCount - a.variantCount);
    return list;
  }, [products, searchQuery, category, type, sort]);

  const shown = filtered.slice(0, page * PAGE_SIZE);
  const hasActiveFilters = searchQuery.trim() !== "" || category !== "all" || type !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setType("all");
    setSort("popular");
  };

  return (
    <>
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pieces by name, style, wood..."
              className="w-full rounded-full border border-line bg-ivory-dark/40 py-2.5 pl-10 pr-4 text-xs font-medium text-ink placeholder:text-muted focus:border-brass focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category, Type & Sort Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink focus:border-brass focus:outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink focus:border-brass focus:outline-none"
            >
              <option value="all">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink focus:border-brass focus:outline-none"
            >
              <option value="popular">Most popular</option>
              <option value="variants">Most options</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line/60 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Active:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sand/60 px-3 py-1 text-xs font-medium text-ink">
                “{searchQuery}”
                <button type="button" onClick={() => setSearchQuery("")}><X size={12} /></button>
              </span>
            )}
            {category !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sand/60 px-3 py-1 text-xs font-medium text-ink">
                {categories.find((c) => c.slug === category)?.name || category}
                <button type="button" onClick={() => setCategory("all")}><X size={12} /></button>
              </span>
            )}
            {type !== "all" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-sand/60 px-3 py-1 text-xs font-medium text-ink">
                {type}
                <button type="button" onClick={() => setType("all")}><X size={12} /></button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-walnut hover:underline"
            >
              <RotateCcw size={12} /> Reset all
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs font-medium text-muted">
          Showing <span className="font-semibold text-ink">{shown.length}</span> of{" "}
          <span className="font-semibold text-ink">{filtered.length}</span> designs
        </p>
      </div>

      {/* Products Grid */}
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.familyKey} product={p} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="mt-12 rounded-3xl border border-dashed border-line bg-white/60 p-12 text-center">
          <Filter size={32} className="mx-auto text-muted" />
          <p className="mt-4 font-display text-lg font-semibold text-ink">No designs match your filters</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Try adjusting your search keywords or clearing a category filter — or we can build it from scratch!
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={clearAllFilters} className="btn-primary">
              Clear all filters
            </button>
            <a
              href={`https://wa.me/919711487229?text=${encodeURIComponent("Hi Craftiva! I was looking for a design on your website and would like a custom quote.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Pagination Load More */}
      {shown.length < filtered.length && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            className="btn-primary gap-2"
          >
            <Loader2 size={16} /> Load more ({filtered.length - shown.length} remaining)
          </button>
        </div>
      )}
    </>
  );
}