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

  const displayImg = isHovered && hoverImg ? hoverImg : primary?.hero || "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg";

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
                (e.target as HTMLImageElement).src = "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg";
              }}
              className={`h-full w-full object-cover transition-all duration-500 ${
                isHovered ? "scale-[1.05]" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          {/* Action buttons */}
          <div className="absolute right-3 top-3 z-10 translate-y-[-4px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <WishlistButton slug={product.slug} name={product.name} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickOpen(true);
            }}
            className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 translate-y-2 items-center gap-1.5 rounded-full bg-ink/90 px-4 py-2 text-xs font-semibold text-ivory opacity-0 shadow-card backdrop-blur transition-all duration-300 hover:bg-walnut group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye size={14} /> Quick view
          </button>

          {product.variantCount > 1 && (
            <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
              {product.variantCount} {product.variantCount === 2 ? "option" : "options"}
            </span>
          )}
        </div>

        {/* Info Container */}
        <div className="flex flex-1 flex-col px-1 pt-3.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${product.slug}`}
                className="line-clamp-1 text-sm font-semibold text-ink transition-colors hover:text-walnut"
              >
                {product.name}
              </Link>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted">{product.subcategory}</p>
            </div>
            <PriceTag price={product.price} className="shrink-0 text-xs" />
          </div>

          {colours.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              {colours.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="h-3.5 w-3.5 rounded-full border border-ink/20 shadow-xs transition-transform hover:scale-125"
                  style={{ backgroundColor: colourToCss(c) }}
                />
              ))}
              <span className="ml-1 truncate text-[10px] text-muted">{colours.join(" · ")}</span>
            </div>
          )}
        </div>
      </div>

      <QuickView product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}