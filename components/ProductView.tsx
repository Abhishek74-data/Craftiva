"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Ruler,
  Palette,
  Hammer,
  Clock,
} from "lucide-react";
import type { Product, Variant } from "@/lib/types";
import { SITE } from "@/lib/site";
import { WishlistButton } from "@/components/wishlist";
import { colourToCss } from "@/components/ProductCard";
import { formatPriceRange, TRANSPARENT_PIXEL } from "@/lib/utils";
import { lockScroll } from "@/lib/lenis";

interface SizeOption {
  id: string;
  label: string;
  sublabel: string;
  dimensions: string;
  variantMatcher?: (v: Variant) => boolean;
}

export function ProductView({ product }: { product: Product }) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const colours = useMemo(
    () => [...new Set(product.variants.map((v) => v.colour).filter(Boolean))].slice(0, 8),
    [product.variants],
  );
  const [selectedColour, setSelectedColour] = useState<string>(colours[0] || "");

  const sizeOptions = useMemo(() => {
    const variantConfigs = [...new Set(product.variants.map((v) => v.configuration).filter(Boolean))];
    if (variantConfigs.length > 0) {
      return variantConfigs.map((config) => ({
        id: config.toLowerCase().replace(/\s+/g, "-"),
        label: config,
        sublabel: "Available",
        dimensions: "",
        variantMatcher: (v: Variant) => v.configuration === config,
      }));
    }
    return [
      {
        id: "standard",
        label: "Standard",
        sublabel: "Workshop specification",
        dimensions: "Standard dimensions",
        variantMatcher: () => true,
      },
    ];
  }, [product.variants]);

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[0]);

  const activeVariant = useMemo(() => {
    const variants = product.variants || [];
    if (variants.length === 0) return undefined;
    if (selectedSize?.variantMatcher) {
      const both = variants.find(
        (v) =>
          selectedSize.variantMatcher!(v) &&
          (!selectedColour || v.colour?.toLowerCase() === selectedColour.toLowerCase()),
      );
      if (both) return both;
      const sizeOnly = variants.find((v) => selectedSize.variantMatcher!(v));
      if (sizeOnly) return sizeOnly;
    }
    if (selectedColour) {
      const colourOnly = variants.find(
        (v) => v.colour?.toLowerCase() === selectedColour.toLowerCase(),
      );
      if (colourOnly) return colourOnly;
    }
    return variants[0];
  }, [product.variants, selectedSize, selectedColour]);

  const allImages = useMemo(() => {
    const raw = (activeVariant?.images || product.variants?.[0]?.images || []).filter(Boolean);
    const unique = [...new Set(raw)];
    const curated = unique.filter((img) => {
      const lower = img.toLowerCase();
      return (
        lower.includes("main") ||
        lower.includes("lifestyle") ||
        lower.includes("01") ||
        lower.includes("02") ||
        lower.includes("03") ||
        lower.includes("04") ||
        lower.includes("05") ||
        lower.includes("1.") ||
        lower.includes("2.") ||
        lower.includes("3.")
      );
    });
    if (curated.length > 0) return curated.slice(0, 6);
    if (unique.length > 0) return unique.slice(0, 5);
    return [activeVariant?.hero || product.variants?.[0]?.hero || TRANSPARENT_PIXEL];
  }, [activeVariant, product.variants]);

  const safeIdx = Math.min(selectedImgIdx, allImages.length - 1);
  const currentImage = allImages[safeIdx] || allImages[0];

  const handleSelectSize = (opt: SizeOption) => {
    setSelectedSize(opt);
    setSelectedImgIdx(0);
  };

  const handleSelectColour = (colour: string) => {
    setSelectedColour(colour);
    setSelectedImgIdx(0);
  };

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowRight") setSelectedImgIdx((i) => (i + 1) % allImages.length);
      if (e.key === "ArrowLeft")
        setSelectedImgIdx((i) => (i - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [zoomOpen, allImages.length]);

  const whatsappQuoteUrl = useMemo(() => {
    const text = `Hi Craftiva! I'd like a factory-direct quote for "${product.name}".
• Size / configuration: ${selectedSize?.label || "Standard"}
• Finish / colour: ${selectedColour || "To be decided"}
• Delivery: Delhi-NCR / pan-India

Please share the best workshop price, current fabric/wood swatches and the production timeline.`;
    return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [product.name, selectedSize, selectedColour]);

  const quoteHref = `/quote?product=${encodeURIComponent(product.slug)}${
    selectedSize?.label ? `&size=${encodeURIComponent(selectedSize.label)}` : ""
  }${selectedColour ? `&finish=${encodeURIComponent(selectedColour)}` : ""}`;

  const price =
    product.price && !product.price.onRequest && typeof product.price.from === "number"
      ? formatPriceRange(product.price.from, product.price.to ?? product.price.from)
      : null;

  const specs: { k: string; v: string }[] = [
    { k: "Materials", v: (product.materials || []).join(" · ") || "Solid wood" },
    ...(product.sizeLabel ? [{ k: "Built size", v: product.sizeLabel }] : []),
    { k: "Finish selected", v: selectedColour || "To be decided" },
    { k: "Configuration", v: selectedSize?.label || "Standard" },
    { k: "Lead time", v: product.leadTime || SITE.leadTime },
    { k: "Availability", v: product.availability || "Made to order" },
    { k: "Warranty", v: "5-year frame · 1-year upholstery" },
  ];

  return (
    <div className="grid gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* ── Gallery ─────────────────────────────────────── */}
      <div className="min-w-0">
        <div className="group relative aspect-[4/3] overflow-hidden border border-line bg-surface-2">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={`${product.name} — photo ${safeIdx + 1}`}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = allImages[0] || TRANSPARENT_PIXEL;
              }}
              onClick={() => setZoomOpen(true)}
              className="absolute inset-0 h-full w-full cursor-zoom-in object-cover"
            />
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label="Zoom image"
            className="absolute right-3.5 top-3.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black"
          >
            <Maximize2 size={15} />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setSelectedImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}
                className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/80"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setSelectedImgIdx((i) => (i + 1) % allImages.length)}
                className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/80"
              >
                <ChevronRight size={19} />
              </button>
              <div className="absolute bottom-3.5 right-3.5 z-10 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {safeIdx + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>

        {allImages.length > 1 && (
          <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
            {allImages.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                onClick={() => setSelectedImgIdx(idx)}
                aria-label={`Show photo ${idx + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden border transition-[border-color,opacity] duration-300 sm:h-20 sm:w-20 ${
                  safeIdx === idx
                    ? "border-brass opacity-100"
                    : "border-line opacity-55 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = TRANSPARENT_PIXEL;
                  }}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Workshop note */}
        <div className="mt-6 flex gap-4 border border-line bg-surface p-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
            <Hammer size={17} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass">
              Built in our Kirti Nagar workshop
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ash">
              Bring your floor plan, a reference photo or a Pinterest link — we&apos;ll build this
              piece to your measurements.
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-[14px] leading-relaxed text-ash">
            {product.shortDescription || product.description}
          </p>
        </div>
      </div>

      {/* ── Info column ─────────────────────────────────── */}
      <div className="flex min-w-0 flex-col lg:sticky lg:top-32 lg:self-start">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{product.subcategory || product.category?.name}</p>
            <h1 className="display-title mt-3 text-[clamp(1.9rem,3.4vw,2.75rem)] text-ivory">
              {product.name}
            </h1>
            <p className="mt-3 flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.14em] text-ash">
              <Clock size={13} className="text-brass" />
              Made to order · {product.leadTime || SITE.leadTime}
            </p>
          </div>
          <WishlistButton slug={product.slug} name={product.name} />
        </div>

        <div className="mt-5 border-b border-line pb-5">
          {price ? (
            <p className="font-display text-2xl font-semibold text-ivory">
              {price}
              <span className="ml-2 align-middle text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                factory direct
              </span>
            </p>
          ) : (
            <p className="font-display text-xl font-semibold text-brass">
              Factory-direct pricing on request
            </p>
          )}
        </div>

        {/* Options */}
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory">
              <Ruler size={14} className="text-brass" /> 1. Size &amp; configuration
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {sizeOptions.map((opt) => {
              const isSelected = selectedSize?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectSize(opt)}
                  className={`rounded-md border p-3 text-left transition-colors duration-300 ${
                    isSelected
                      ? "border-brass bg-brass/10"
                      : "border-line bg-surface hover:border-brass/60"
                  }`}
                >
                  <span
                    className={`block text-xs font-semibold ${isSelected ? "text-ivory" : "text-ash"}`}
                  >
                    {opt.label}
                  </span>
                  <span className="mt-1 block text-[10px] leading-tight text-muted">
                    {opt.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory">
              <Palette size={14} className="text-brass" /> 2. Fabric / timber finish
            </span>
            <span className="text-[11px] font-bold text-brass">{selectedColour || "—"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colours.map((c) => {
              const isSelected = selectedColour === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleSelectColour(c)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                    isSelected
                      ? "border-ivory bg-ivory text-ink"
                      : "border-line bg-surface text-ash hover:border-brass hover:text-brass"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/25"
                    style={{ backgroundColor: colourToCss(c) }}
                  />
                  {c}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[12px] text-muted">
            Selecting a finish switches to the actual workshop photo for that variant. Need another
            shade? Ask for the current swatch palette.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3">
          <a href={quoteHref} className="btn btn-primary w-full">
            Request a custom quote
          </a>
          <a
            href={whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full"
          >
            <MessageCircle size={16} className="text-[#25D366]" />
            Chat on WhatsApp
          </a>
          <p className="text-center text-[11.5px] text-muted">
            {product.customizable
              ? "Custom size, wood and finish available · replies during workshop hours"
              : "Factory-direct pricing · replies during workshop hours"}
          </p>
        </div>

        {/* Real specifications */}
        <div className="mt-8 border-t border-line pt-6">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory">
            Piece details
          </h2>
          <dl className="mt-4 grid grid-cols-2 gap-2">
            {specs.map((s) => (
              <div key={s.k} className="border border-line bg-surface p-3.5">
                <dt className="block text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  {s.k}
                </dt>
                <dd className="mt-1 block text-[13px] font-semibold leading-snug text-ivory">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────── */}
      {zoomOpen && (
        <div className="fixed inset-0 z-[200] grid place-items-center bg-black/95 p-4 backdrop-blur-md animate-fade-in">
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Close zoom"
            className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X size={20} />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage}
            alt={`${product.name} — enlarged view ${safeIdx + 1}`}
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = TRANSPARENT_PIXEL;
            }}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />

          <div className="absolute bottom-6 flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setSelectedImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-sm font-semibold text-white">
              {safeIdx + 1} / {allImages.length}
            </span>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setSelectedImgIdx((i) => (i + 1) % allImages.length)}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/30"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
