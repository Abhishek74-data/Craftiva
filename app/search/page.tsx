import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { searchProducts } from "@/lib/data";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata = {
  alternates: { canonical: "/search" },
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q || "").trim();
  const results = query ? searchProducts(query) : [];

  return (
    <section className="wrap py-14">
      <p className="eyebrow">Search the catalogue</p>
      <h1 className="display-title mt-3 text-4xl text-ivory sm:text-5xl">Search</h1>
      {query ? (
        <p className="mt-4 text-sm text-muted">
          {results.length} result{results.length === 1 ? "" : "s"} for <strong className="text-ivory">“{query}”</strong>
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted">Type a query in the search bar to find pieces.</p>
      )}

      {results.length > 0 ? (
        <div className="mt-8">
          <ProductGrid
            key={query}
            products={results}
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
          />
        </div>
      ) : (
        query && (
          <div className="mt-12 rounded-lg border border-dashed border-line bg-surface-2 py-16 text-center">
            <SearchIcon size={28} className="mx-auto text-muted" />
            <p className="mt-4 text-sm font-semibold text-ivory">No pieces match “{query}”</p>
            <p className="mt-1 text-sm text-muted">
              Try “sofa”, “walnut”, “bed”, “wardrobe” — or send us the design on WhatsApp, we&apos;ll make it.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/collections" className="btn btn-outline">Browse everything</Link>
            </div>
          </div>
        )
      )}
    </section>
  );
}