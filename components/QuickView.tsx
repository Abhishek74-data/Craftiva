"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { PriceTag, QuoteCTA } from "@/components/QuoteCTA";
import { WishlistButton } from "@/components/wishlist";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
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

  const img = activeVariant?.hero || product.variants[0]?.hero || "/img/Logo.png";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[75] grid place-items-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-ivory shadow-lift animate-fade-up sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-ink/60 text-ivory backdrop-blur transition-colors hover:bg-ink"
        >
          <X size={16} />
        </button>

        <div className="relative bg-ivory-dark sm:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={`${product.name} — ${activeVariant?.colour || "preview"}`}
            className="h-56 w-full object-cover transition-all duration-500 sm:h-full"
          />
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow">{product.category.name}</p>
              <h3 className="font-display text-2xl font-semibold leading-tight text-ink">{product.name}</h3>
              <p className="mt-1 text-xs text-muted">
                {product.subcategory} · {product.availability}
              </p>
            </div>
            <WishlistButton slug={product.slug} name={product.name} />
          </div>

          <div className="mt-3">
            <PriceTag price={product.price} className="text-base font-bold text-walnut-dark" />
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{product.shortDescription}</p>

          {colours.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Finishes & colours</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColour((prev) => (prev === c ? "" : c))}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedColour === c ? "border-walnut bg-walnut text-ivory" : "border-line bg-white hover:border-walnut"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {configs.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Configuration</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {configs.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedConfig((prev) => (prev === c ? "" : c))}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedConfig === c ? "border-ink bg-ink text-ivory" : "border-line bg-white hover:border-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeVariant?.dims && Object.keys(activeVariant.dims).length > 0 && (
            <div className="mt-4 rounded-xl border border-line bg-white/70 p-3 text-xs text-ink-soft">
              <span className="font-semibold text-ink">Approx. Specs: </span>
              {Object.entries(activeVariant.dims)
                .slice(0, 3)
                .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v}`)
                .join(" · ")}
            </div>
          )}

          <div className="mt-5">
            <QuoteCTA
              productName={product.name}
              variantName={[activeVariant?.colour, activeVariant?.configuration].filter(Boolean).join(" · ") || undefined}
              compact
            />
          </div>

          <Link
            href={`/product/${product.slug}`}
            onClick={onClose}
            className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-walnut hover:underline"
          >
            View full details & gallery <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}