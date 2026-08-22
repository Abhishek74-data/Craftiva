import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { searchProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
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
      <h1 className="font-display text-4xl font-semibold text-ink">Search</h1>
      {query ? (
        <p className="mt-3 text-sm text-muted">
          {results.length} result{results.length === 1 ? "" : "s"} for <strong className="text-ink">“{query}”</strong>
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">Type a query in the search bar to find pieces.</p>
      )}

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.familyKey} product={p} />
          ))}
        </div>
      ) : (
        query && (
          <div className="mt-12 rounded-2xl border border-dashed border-line bg-ivory-dark/50 py-16 text-center">
            <SearchIcon size={28} className="mx-auto text-muted" />
            <p className="mt-4 text-sm font-semibold text-ink">No pieces match “{query}”</p>
            <p className="mt-1 text-sm text-muted">
              Try “sofa”, “walnut”, “bed”, “wardrobe” — or send us the design on WhatsApp, we'll make it.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/collections" className="btn-outline">Browse everything</Link>
            </div>
          </div>
        )
      )}
    </section>
  );
}