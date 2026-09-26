"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, MessageCircle, ArrowRight } from "lucide-react";
import type { Product, Variant } from "@/lib/types";
import { TRANSPARENT_PIXEL } from "@/lib/utils";

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

  const active = matching[Math.min(variantIdx, matching.length - 1)] ?? product.variants[0];
  const images = (active?.images && active.images.length > 0) ? active.images : [TRANSPARENT_PIXEL];
  const current = images[Math.min(imgIdx, images.length - 1)] ?? images[0] ?? TRANSPARENT_PIXEL;

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
  }, [zoomOpen, images.length]);

  return (
    <div>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-3xl bg-ivory-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current}
          src={current}
          alt={`${product.name} — ${active?.colour || "detail"} ${imgIdx + 1}`}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="eager"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = TRANSPARENT_PIXEL;
          }}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur transition-colors hover:bg-ink"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setImgIdx((i) => (i + 1) % images.length)}
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
              key={img + i}
              type="button"
              onClick={() => setImgIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === imgIdx ? "border-walnut" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-16 w-16 object-cover sm:h-20 sm:w-20" loading="lazy" />
            </button>
          ))}
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
                    onClick={() => setColour(c)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
                      colour === c ? "border-walnut bg-walnut text-ivory" : "border-line bg-ivory hover:border-walnut"
                    }`}
                  >
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
                    onClick={() => setConfig(c)}
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
      {Object.keys(active?.dims || {}).length > 0 && (
        <div className="mt-6 rounded-2xl border border-line bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Dimensions & specs</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {Object.entries(active?.dims || {}).map(([k, v]) => (
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

      {/* Fullscreen Zoom Modal */}
      {zoomOpen && (
        <div className="fixed inset-0 z-[75] grid place-items-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setZoomOpen(false)} />
          <div className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-ivory shadow-lift animate-fade-up sm:flex-row">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/60 text-ivory backdrop-blur transition-colors hover:bg-ink"
            >
              <X size={16} />
            </button>

            <div className="relative sm:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current} alt={`${product.name} — ${active?.colour || "detail"}`} className="h-56 w-full object-cover sm:h-full" />
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
              </div>

              <div className="mt-3">
                <span className="text-sm font-semibold text-walnut">Price on request</span>
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
                        onClick={() => setColour(c)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          colour === c ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
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
                        onClick={() => setConfig(c)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          config === c ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5">
                <a
                  href={`https://wa.me/${"919711487229"}?text=${encodeURIComponent(`Hi Craftiva! I'd like a quote for the ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brass w-full"
                >
                  <MessageCircle size={17} />
                  Get exact quote on WhatsApp
                </a>
              </div>

              <a
                href={`/product/${product.slug}`}
                onClick={() => setZoomOpen(false)}
                className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-walnut hover:underline"
              >
                View full details <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}