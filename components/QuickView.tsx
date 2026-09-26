"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { PriceTag, QuoteCTA } from "@/components/QuoteCTA";
import { WishlistButton } from "@/components/wishlist";
import { TRANSPARENT_PIXEL } from "@/lib/utils";
import { lockScroll } from "@/lib/lenis";

export function QuickView({ product, open, onClose }: { product: Product; open?: boolean; onClose: () => void }) {
  const [selectedColour, setSelectedColour] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");

  const colours = [...new Set(product.variants.map((v) => v.colour).filter(Boolean))];
  const configs = [...new Set(product.variants.map((v) => v.configuration).filter(Boolean))];

  // Find the active matching variant
  const activeVariant =
    product.variants.find((v) => {
      const matchCol = selectedColour ? v.colour === selectedColour : true;
      const matchCfg = selectedConfig ? v.configuration === selectedConfig : true;
      return matchCol && matchCfg;
    }) || product.variants[0];

  const fallbackHero = product.variants[0]?.hero || product.variants[0]?.images?.[0] || TRANSPARENT_PIXEL;
  const img = activeVariant?.hero || fallbackHero;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  if (!open) return null;

return (
    <div className="fixed inset-0 z-[75] grid place-items-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-lift animate-fade-up sm:flex-row" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white backdrop-blur transition-colors hover:bg-black"
        >
          <X size={16} />
        </button>

        <div className="relative bg-surface-2 sm:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={`${product.name} — ${activeVariant?.colour || "preview"}`}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = TRANSPARENT_PIXEL;
            }}
            className="h-56 w-full object-cover transition-all duration-500 sm:h-full"
          />
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">{product.category?.name || "Product"}</p>
              <h3 className="font-display text-2xl font-medium leading-tight text-ivory">{product.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                {product.subcategory} · {product.availability || "Made to order"}
              </p>
            </div>
            <WishlistButton slug={product.slug} name={product.name} />
          </div>

          <div className="mt-3">
            <PriceTag price={product.price} className="text-base font-semibold text-brass" />
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ash">{product.shortDescription || product.description}</p>

          {colours.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Finishes & colours</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColour((prev) => (prev === c ? "" : c))}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      selectedColour === c || (!selectedColour && activeVariant.colour === c)
                        ? "border-ivory bg-ivory text-ink"
                        : "border-line bg-surface-2 text-ash hover:border-brass hover:text-brass"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {configs.length > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Dimensions & config</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {configs.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedConfig((prev) => (prev === c ? "" : c))}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      selectedConfig === c || (!selectedConfig && activeVariant.configuration === c)
                        ? "border-ivory bg-ivory text-ink"
                        : "border-line bg-surface-2 text-ash hover:border-brass hover:text-brass"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <QuoteCTA productName={product.name} variantName={activeVariant?.name} />
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center gap-2 rounded-full border border-line bg-surface-2 px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:border-brass hover:text-brass"
            >
              View full details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}