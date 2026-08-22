"use client";

import Link from "next/link";
import { Heart, MessageCircle, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useWishlist } from "@/components/wishlist";
import { PriceTag } from "@/components/QuoteCTA";
import { SITE } from "@/lib/site";
import type { Price } from "@/lib/types";

interface CatalogItem {
  slug: string;
  name: string;
  category: string;
  price: Price;
  image: string;
}

export function WishlistView() {
  const { items, clearWishlist, removeWishlist } = useWishlist();
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((d: { items: CatalogItem[] }) => {
        if (alive) setCatalog(d.items);
      })
      .finally(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, []);

  const saved = catalog.filter((c) => items.includes(c.slug));

  const packageMessage = useMemo(() => {
    const list = saved.map((s, i) => `${i + 1}. *${s.name}* (${s.category})`).join("\n");
    return [
      "Hi Craftiva! I've shortlisted these pieces on your website for my home and would like a bundled package quote:\n",
      list,
      "\n\nPlease share the package price, material recommendations and estimated timeline.",
    ].join("\n");
  }, [saved]);

  const packageWaHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(packageMessage)}`;

  return (
    <>
      {items.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink-soft">
            <span className="font-bold text-ink">{items.length}</span> piece{items.length === 1 ? "" : "s"} saved in your shortlist
          </p>
          <button type="button" onClick={clearWishlist} className="btn-ghost !px-3.5 !py-1.5 text-xs text-muted hover:text-red-600">
            <Trash2 size={13} /> Clear all
          </button>
        </div>
      )}

      {/* Multi-Item Package Quote Banner */}
      {saved.length > 0 && (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-brass/30 bg-brass/10 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brass-dark">
              <Sparkles size={14} /> Full House / Package Discount
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-ink">
              Get a Bundled Workshop Quote for All {saved.length} Pieces
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Furnishing multiple rooms? Send your complete shortlist directly to our workshop on WhatsApp for combined pricing.
            </p>
          </div>
          <a
            href={packageWaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brass shrink-0 !py-3 text-sm shadow-card"
          >
            <MessageCircle size={16} />
            Quote All Saved Pieces on WhatsApp
          </a>
        </div>
      )}

      {!loaded ? (
        <p className="mt-16 text-center text-sm text-muted">Loading your shortlist…</p>
      ) : items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-line bg-ivory-dark/40 py-20 text-center">
          <Heart size={36} className="mx-auto text-muted/60" />
          <p className="mt-4 font-display text-xl font-semibold text-ink">Your shortlist is empty</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
            Tap the heart icon on any sofa, bed or table to save it here for comparison.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/collections" className="btn-primary">Browse Catalogue</Link>
            <Link href="/quote" className="btn-outline">Custom Order</Link>
          </div>
        </div>
      ) : saved.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line bg-ivory-dark/50 py-16 text-center">
          <p className="text-sm font-semibold text-ink">Loading saved pieces…</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <div key={p.slug} className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-shadow hover:shadow-lift">
              <Link href={`/product/${p.slug}`} className="shrink-0 overflow-hidden rounded-xl bg-ivory-dark">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image || "/img/Logo.png"}
                  alt={p.name}
                  className="h-28 w-28 object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{p.category}</p>
                <Link href={`/product/${p.slug}`} className="mt-1 line-clamp-2 text-sm font-semibold text-ink hover:text-walnut">
                  {p.name}
                </Link>
                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                  <PriceTag price={p.price} className="text-xs font-semibold text-walnut" />
                  <button
                    type="button"
                    onClick={() => removeWishlist(p.slug)}
                    aria-label={`Remove ${p.name}`}
                    className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-red-300 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}