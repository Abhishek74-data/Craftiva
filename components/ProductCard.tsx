"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { WishlistButton } from "@/components/wishlist";
import { QuickView } from "@/components/QuickView";
import { SITE } from "@/lib/site";

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
  const hoverImg = product.variants[1]?.hero || primary?.images?.[1];
  const colours = [...new Set((product.variants || []).map((v) => v.colour).filter(Boolean))].slice(0, 3);

  // Use product's own hero so no cross-category fallback ever occurs
  const ownHeroFallback = primary?.hero || primary?.images?.[0] || "/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg";
  const displayImg = isHovered && hoverImg ? hoverImg : ownHeroFallback;

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D8] overflow-hidden p-2 sm:p-2.5 shadow-2xs hover:shadow-md transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 📸 Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:rounded-xl bg-[#F4EFEA]">
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
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
          </Link>

          {/* Action buttons (Wishlist & Quick View) */}
          <div className="absolute right-2 top-2 z-10">
            <WishlistButton slug={product.slug} name={product.name} bg="light" size={28} />
          </div>

          <div className="absolute bottom-2.5 left-1/2 z-10 hidden sm:flex -translate-x-1/2 translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className="flex h-8 items-center justify-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 text-[10px] font-bold tracking-wider text-[#191614] shadow-md hover:bg-[#191614] hover:text-white transition-colors"
            >
              <Eye size={12} /> Quick View
            </button>
          </div>

          {/* Badges */}
          <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 pointer-events-none">
            {product.newArrival && (
              <span className="inline-block rounded bg-[#8C6F47] px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
                New
              </span>
            )}
            {product.bestseller && (
              <span className="inline-block rounded bg-[#191614] px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* 📝 Content Info */}
        <div className="mt-2.5 flex flex-col flex-1 justify-between px-0.5">
          <div>
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#191614] leading-tight line-clamp-1 group-hover:text-[#8C6F47] transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-[10px] text-[#706A62] mt-0.5 truncate">
              {product.subcategory || product.category?.name || "Solid Wood"}
            </p>
          </div>

          {/* WhatsApp Quote Price Tag */}
          <div className="mt-2 pt-2 border-t border-[#E8E2D8] flex items-center justify-between gap-1">
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#8C6F47] group-hover:text-[#191614] transition-colors truncate"
            >
              <MessageCircle size={12} className="shrink-0 text-[#25D366]" />
              <span className="truncate">Get Best Price →</span>
            </Link>

            {colours.length > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                {colours.map((c) => (
                  <div
                    key={c}
                    title={c}
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/15 shadow-2xs"
                    style={{ backgroundColor: colourToCss(c) }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}