"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
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
import { cardSrcSet, curateGalleryImages } from "@/lib/images";
import { formatSizeLabel } from "@/lib/describe";
import { lockScroll } from "@/lib/lenis";

interface SizeOption {
  id: string;
  label: string;
  sublabel: string;
  dimensions: string;
  variantMatcher?: (v: Variant) => boolean;
}

const GALLERY_SIZES = "(max-width: 1023px) 100vw, 40vw";
const THUMB_SIZES = "(max-width: 1023px) 72px, 80px";

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
    const curated = curateGalleryImages(activeVariant?.images || product.variants?.[0]?.images || []);
    if (curated.length > 0) return curated;
    return [activeVariant?.hero || product.variants?.[0]?.hero || TRANSPARENT_PIXEL];
  }, [activeVariant, product.variants]);

  const safeIdx = Math.min(selectedImgIdx, allImages.length - 1);
  const currentImage = allImages[safeIdx] || allImages[0];

  /* ── Gallery strip: one native scroll-snap track (touch swipe on mobile,
        arrows / thumbs / trackpad on desktop). Scroll is the single source of
        the visible index; programmatic scrolls are guarded so smooth scrolling
        doesn't race the listener. ───────────────────────────────────────── */
  const stripRef = useRef<HTMLDivElement | null>(null);
  // Only-set-once callback ref: the exiting AnimatePresence layer must not
  // null the node the listener is attached to.
  const setStripNode = useCallback((node: HTMLDivElement | null) => {
    if (node) stripRef.current = node;
  }, []);
  const idxRef = useRef(selectedImgIdx);
  idxRef.current = selectedImgIdx;
  const progRef = useRef(false);
  const progTimer = useRef<number | undefined>(undefined);

  // Identity of the photo set — changes (with a crossfade) when the variant
  // or configuration changes; never on plain index moves.
  const variantKey = `${activeVariant?.id ?? "base"}|${selectedSize?.id ?? ""}`;

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (progRef.current) return;
        const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
        if (i !== idxRef.current && i >= 0 && i < allImages.length) setSelectedImgIdx(i);
      });
    };
    const release = () => {
      progRef.current = false;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", release);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", release);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [variantKey, allImages.length]);

  const scrollToIdx = (i: number) => {
    const el = stripRef.current;
    setSelectedImgIdx(i);
    if (!el) return;
    progRef.current = true;
    const reduceNow =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduceNow ? "instant" : "smooth" });
    window.clearTimeout(progTimer.current);
    progTimer.current = window.setTimeout(() => {
      progRef.current = false;
    }, 700);
  };

  const handleSelectSize = (opt: SizeOption) => {
    setSelectedSize(opt);
    setSelectedImgIdx(0);
    progRef.current = false;
  };

  const handleSelectColour = (colour: string) => {
    setSelectedColour(colour);
    setSelectedImgIdx(0);
    progRef.current = false;
  };

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowRight") scrollToIdx((safeIdx + 1) % allImages.length);
      if (e.key === "ArrowLeft")
        scrollToIdx((safeIdx - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomOpen, allImages.length, safeIdx]);

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

  // Customer-facing spec grid — normalized at data-load, never raw supplier
  // fields (no weight/cbm/carton/zero dimensions/logistics codes).
  const dimsLabel = formatSizeLabel(product.sizeLabel);
  const specs: { k: string; v: string }[] = [
    ...(dimsLabel ? [{ k: "Built size", v: dimsLabel }] : []),
    ...(product.customizable ? [{ k: "Custom sizing", v: "Custom dimensions available" }] : []),
    { k: "Materials", v: (product.materials || []).join(" · ") || "Solid wood" },
    { k: "Selected finish", v: selectedColour || "To be decided" },
    { k: "Configuration", v: selectedSize?.label || "Standard" },
    { k: "Lead time", v: product.leadTime || SITE.leadTime },
    { k: "Warranty", v: "5-year frame · 1-year upholstery" },
    { k: "Availability", v: product.availability || "Made to order" },
  ];

  return (
    <div className="grid gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-[1.15fr_1fr] lg:gap-14">
      {/* ── Media column — large calm gallery; pins on desktop so the photos
              stay with you while the info column scrolls ─────────────────── */}
      <div className="min-w-0">
        <div className="lg:sticky lg:top-32">
          <div className="group relative aspect-[4/3] overflow-hidden border border-line bg-surface-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={variantKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div
                  ref={setStripNode}
                  data-lenis-prevent
                  className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
                >
                  {allImages.map((img, idx) => (
                    <div
                      key={img + idx}
                      className="relative h-full w-full shrink-0 snap-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        srcSet={cardSrcSet(img)}
                        sizes={GALLERY_SIZES}
                        alt={`${product.name} — photo ${idx + 1}`}
                        loading={idx === 0 ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={idx === 0 ? "high" : "auto"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.srcset = "";
                          target.src = TRANSPARENT_PIXEL;
                        }}
                        onClick={() => setZoomOpen(true)}
                        className="h-full w-full cursor-zoom-in object-cover transition-transform duration-[450ms] ease-out lg:group-hover:scale-[1.04]"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
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
                  onClick={() =>
                    scrollToIdx((safeIdx - 1 + allImages.length) % allImages.length)
                  }
                  className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/80 lg:grid"
                >
                  <ChevronLeft size={19} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => scrollToIdx((safeIdx + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/80 lg:grid"
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
                  onClick={() => scrollToIdx(idx)}
                  aria-label={`Show photo ${idx + 1}`}
                  aria-pressed={safeIdx === idx}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden border transition-[border-color,opacity] duration-300 sm:h-20 sm:w-20 ${
                    safeIdx === idx
                      ? "border-brass opacity-100"
                      : "border-line opacity-55 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    srcSet={cardSrcSet(img)}
                    sizes={THUMB_SIZES}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.srcset = "";
                      target.src = TRANSPARENT_PIXEL;
                    }}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Info column ─────────────────────────────────── */}
      <div className="flex min-w-0 flex-col">
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
                  aria-pressed={isSelected}
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
                  aria-pressed={isSelected}
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
              onClick={() => scrollToIdx((safeIdx - 1 + allImages.length) % allImages.length)}
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
              onClick={() => scrollToIdx((safeIdx + 1) % allImages.length)}
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
