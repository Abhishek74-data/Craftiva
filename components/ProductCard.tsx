"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { WishlistButton } from "@/components/wishlist";
import { QuickView } from "@/components/QuickView";
import { formatPriceRange } from "@/lib/utils";
import { TRANSPARENT_PIXEL } from "@/lib/utils";

export function colourToCss(name: string): string {
  const map: Record<string, string> = {
    "isabelline white": "#F4F1EA",
    "stone cream": "#E6DFD3",
    cream: "#F7F3E9",
    beige: "#EADDC7",
    taupe: "#B3A596",
    cognac: "#9A5328",
    brown: "#6E472A",
    "dark walnut": "#3D2B1F",
    walnut: "#5C4033",
    charcoal: "#36454F",
    grey: "#808080",
    "gainsboro grey": "#DCDCDC",
    black: "#1A1A1A",
    olive: "#556B2F",
    green: "#4A6B53",
    blue: "#3B536B",
    natural: "#D7C4A8",
    velvet: "#C9A780",
  };
  return map[name.toLowerCase()] || "#C9B69B"
}

function priceLabel(product: Product): string | null {
  const p = product.price;
  if (p && !p.onRequest && typeof p.from === "number") {
    return `From ${formatPriceRange(p.from, p.to ?? p.from)}`;
  }
  return null;
}

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const primary = product.variants[0];
  const mainImg = primary?.hero || primary?.images?.[0] || TRANSPARENT_PIXEL;
  const altImg = product.variants[1]?.hero || primary?.images?.[1] || "";
  const price = priceLabel(product);

  return (
    <>
      <div
        className="group relative flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface-2">
          <Link
            href={`/product/${product.slug}`}
            className="absolute inset-0 z-0 block"
            aria-label={`View ${product.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImg}
              alt={product.name}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = TRANSPARENT_PIXEL;
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                hovered && altImg ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            {altImg && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={altImg}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                  hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            )}
          </Link>

          {/* Wishlist */}
          <div className="absolute right-2.5 top-2.5 z-10">
            <WishlistButton slug={product.slug} name={product.name} className="h-9 w-9" />
          </div>

          {/* Quick view */}
          <div className="absolute inset-x-3 bottom-3 z-10 flex justify-center opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-3">
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className="flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[10.5px] font-bold uppercase tracking-[0.16em] text-ivory shadow-lift transition-colors hover:bg-brass hover:text-white"
            >
              <Eye size={13} /> Quick view
            </button>
          </div>

          {/* Badges (only when real flags exist) */}
          {product.newArrival && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-brass px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.14em] text-white">
              New
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted">
              {product.subcategory || product.category?.name}
            </p>
            <Link href={`/product/${product.slug}`} className="mt-1.5 block">
              <h3 className="font-display text-[17px] font-semibold leading-snug text-ivory transition-colors group-hover:text-brass">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-[13px] text-ash">
              {price ?? (product.customizable ? "Customisable · made to order" : "Made to order")}
            </p>
          </div>

          <Link
            href={`/product/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ash transition-all duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-white"
          >
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
