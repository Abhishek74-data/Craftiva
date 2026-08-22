"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { formatPriceRange } from "@/lib/utils";
import type { Price } from "@/lib/types";

interface SearchItem {
  slug: string;
  name: string;
  category: string;
  price: Price;
  image: string;
}

export function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((d) => setResults(d.results))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-x-0 top-0 bg-ivory shadow-lift animate-fade-in">
        <div className="wrap py-6">
          <div className="flex items-center gap-4">
            <form onSubmit={submit} className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5">
              <Search size={18} className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sofas, beds, wardrobes, dining…"
                className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
              />
              {loading && <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-brass border-t-transparent" />}
            </form>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white"
            >
              <X size={17} />
            </button>
          </div>

          {query.trim() && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted">
                  {loading ? "Searching…" : `No pieces match "${query}". Try “sofa”, “walnut”, “bed”.`}
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {results.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/product/${r.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 py-3 transition-colors hover:bg-ivory-dark/50"
                      >
                        {r.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt={r.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" loading="lazy" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink">{r.name}</p>
                          <p className="text-xs text-muted">{r.category}</p>
                        </div>
                        <p className="shrink-0 text-sm font-medium text-walnut">
                          {r.price.onRequest ? "Price on request" : formatPriceRange(r.price.from!, r.price.to!)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted">Popular:</span>
              {["Sofa", "Bed", "Wardrobe", "Dining Table", "Desk", "Ottoman"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setQuery(t)}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-walnut hover:text-walnut"
                >
                  {t}
                </button>
              ))}
              <Link
                href="/collections"
                onClick={onClose}
                className="ml-auto flex items-center gap-1 text-xs font-semibold text-walnut hover:underline"
              >
                Browse everything <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}