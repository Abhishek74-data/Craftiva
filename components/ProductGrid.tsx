"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

/**
 * Product grid with progressive rendering: mounts the first page of cards
 * and reveals the rest on demand so category/search pages never download
 * hundreds of images up front. Remount via `key` when filters change to
 * reset to the first page.
 */
export function ProductGrid({
  products,
  pageSize = 24,
  className = "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4",
}: {
  products: Product[];
  pageSize?: number;
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const shown = products.slice(0, page * pageSize);

  return (
    <>
      <div className={className}>
        {shown.map((p) => (
          <ProductCard key={p.familyKey} product={p} />
        ))}
      </div>

      {shown.length < products.length && (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setPage((v) => v + 1)}
            className="btn btn-primary gap-2"
          >
            <Loader2 size={16} /> Load more ({products.length - shown.length} remaining)
          </button>
        </div>
      )}
    </>
  );
}
