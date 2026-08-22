"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Product, Variant } from "@/lib/types";
import { colourToCss } from "@/components/ProductCard";

export function ProductGallery({ product }: { product: Product }) {
  const [variantIdx, setVariantIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [colour, setColour] = useState("");
  const [config, setConfig] = useState("");
  const [zoomOpen, setZoomOpen] = useState(false);

  const colours = useMemo(
    () => [...new Set(product.variants.map((v) => v.colour).filter(Boolean))],
    [product.variants],
  );
  const configs = useMemo(
    () => [...new Set(product.variants.map((v) => v.configuration).filter(Boolean))],
    [product.variants],
  );

  const matching: Variant[] = useMemo(() => {
    let list = product.variants;
    if (colour) {
      const withColour = list.filter((v) => v.colour === colour);
      if (withColour.length > 0) list = withColour;
    }
    if (config) {
      const withConfig = list.filter((v) => v.configuration === config);
      if (withConfig.length > 0) list = withConfig;
    }
    return list;
  }, [product.variants, colour, config]);

  useEffect(() => {
    setVariantIdx(0);
    setImgIdx(0);
  }, [colour, config]);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowRight") setImgIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setImgIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomOpen]);

  const active = matching[Math.min(variantIdx, matching.length - 1)] ?? product.variants[0];
  const images = active?.images ?? [];
  const current = images[Math.min(imgIdx, images.length - 1)] ?? images[0] ?? "/img/Logo.png";
  const dims = active?.dims ?? {};

  return (
    <div>
      {/* Main image */}
      <div className="group relative overflow-hidden rounded-3xl bg-ivory-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current}
          src={current}
          alt={`${product.name} — ${active?.colour || "detail"} view ${imgIdx + 1}`}
          className="aspect-[4/3] w-full cursor-zoom-in object-cover transition-transform duration-500 hover:scale-[1.02]"
          loading="eager"
          onClick={() => setZoomOpen(true)}
        />

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Zoom image"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/60 text-ivory backdrop-blur transition-all duration-300 hover:bg-ink group-hover:opacity-100"
        >
          <Maximize2 size={15} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx((i) => (i - 1 + images.length) % images.length);
              }}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur transition-colors hover:bg-ink"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setImgIdx((i) => (i + 1) % images.length);
              }}
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur transition-colors hover:bg-ink"
            >
              <ChevronRight size={18} />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-1 text-[10px] font-semibold text-ivory backdrop-blur">
              {imgIdx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setImgIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === imgIdx ? "border-walnut ring-2 ring-walnut/30" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-16 w-16 object-cover sm:h-20 sm:w-20" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {zoomOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-4 backdrop-blur-md animate-fade-in">
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Close zoom"
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="flex max-h-[85vh] max-w-5xl flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt={product.name}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
            />
            <p className="mt-3 text-xs text-white/70">
              {product.name} · {imgIdx + 1} of {images.length}
            </p>
          </div>
        </div>
      )}

      {/* Variant selectors */}
      {(colours.length > 1 || configs.length > 1) && (
        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Choose your {product.type.toLowerCase()} — {product.variantCount} options in this design
          </p>
          {colours.length > 1 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-ink-soft">Finish & colour</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {colours.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColour((prev) => (prev === c ? "" : c))}
                    aria-pressed={colour === c}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                      colour === c ? "border-walnut bg-walnut text-ivory shadow-sm" : "border-line bg-ivory text-ink hover:border-walnut"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: colourToCss(c) }}
                    />
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
          {configs.length > 1 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-ink-soft">Configuration / size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {configs.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setConfig((prev) => (prev === c ? "" : c))}
                    aria-pressed={config === c}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                      config === c ? "border-ink bg-ink text-ivory" : "border-line bg-ivory hover:border-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dimensions */}
      {Object.keys(dims).length > 0 && (
        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Dimensions & specs</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {Object.entries(dims).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2">
                <dt className="text-xs capitalize text-muted">{k.replace(/_/g, " ")}</dt>
                <dd className="text-xs font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[11px] text-muted">
            Reference dimensions from the photographed piece — we build to your exact spec.
          </p>
        </div>
      )}
    </div>
  );
}