"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { WishlistButton } from "@/components/wishlist";
import { PriceTag } from "@/components/QuoteCTA";
import { QuickView } from "@/components/QuickView";

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
  return map[name.toLowerCase()] || "#C9B69B";
}

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const [quickOpen, setQuickOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const primary = product.variants[0];
  const hoverImg = product.variants[1]?.hero || primary?.images[1];
  const colours = [...new Set(product.variants.map((v) => v.colour).filter(Boolean))].slice(0, 4);

  // Use the product's own hero as the ultimate fallback, so a bed NEVER turns into a sofa
  const ownHeroFallback = primary?.hero || primary?.images?.[0] || "";
  const displayImg = isHovered && hoverImg ? hoverImg : ownHeroFallback;

  return (
    <>
      <div
        className="group relative flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Media Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ivory-dark">
          <Link
            href={`/product/${product.slug}`}
            className="absolute inset-0 z-0 block"
            aria-label={`View details for ${product.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImg}
              alt={product.name}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = ownHeroFallback;
              }}
              className={`h-full w-full object-cover transition-all duration-500 ${
                isHovered ? "scale-[1.05]" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          {/* Action buttons */}
          <div className="absolute right-3 top-3 z-10 translate-y-[-4px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <WishlistButton slug={product.slug} name={product.name} bg="dark" size={32} />
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 translate-y-4 items-center gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className="flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-[11px] font-bold tracking-widest text-ink shadow-lg transition-colors hover:bg-ink hover:text-white"
            >
              <Eye size={14} /> Quick View
            </button>
          </div>

          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5 pointer-events-none">
            {product.newArrival && (
              <span className="inline-block rounded bg-brass px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
                New
              </span>
            )}
            {product.bestseller && (
              <span className="inline-block rounded bg-ink px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col px-1">
          <Link href={`/product/${product.slug}`} className="group-hover:text-brass transition-colors">
            <h3 className="font-display text-sm font-semibold tracking-wide text-ink">{product.name}</h3>
          </Link>
          
          <div className="mt-1 flex items-baseline gap-2">
            <PriceTag price={product.price} />
          </div>

          <div className="mt-3 flex items-center justify-between">
            {colours.length > 0 && (
              <div className="flex items-center gap-1">
                {colours.map((c) => (
                  <div
                    key={c}
                    title={c}
                    className="h-3.5 w-3.5 rounded-full border border-line shadow-sm"
                    style={{ backgroundColor: colourToCss(c) }}
                  />
                ))}
                {product.variants.length > 4 && (
                  <span className="text-[10px] font-medium text-muted">+{product.variants.length - 4}</span>
                )}
              </div>
            )}
            <p className="text-[10px] uppercase tracking-widest text-muted">{product.category?.name || "Living"}</p>
          </div>
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}