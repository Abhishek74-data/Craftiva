"use client";

import { useState, useMemo, useEffect } from "react";
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
import { TRANSPARENT_PIXEL } from "@/lib/utils";

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

  // Extract clean unique colours from actual variants
  const colours = useMemo(() => {
    return [...new Set(product.variants.map((v) => v.colour).filter(Boolean))].slice(0, 8);
  }, [product.variants]);

  const [selectedColour, setSelectedColour] = useState<string>(colours[0] || "");

  // Build size options from actual variant configurations
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
    // Fallback: single generic option
    return [{
      id: "standard",
      label: "Standard",
      sublabel: "Workshop specification",
      dimensions: "Standard dimensions",
      variantMatcher: () => true,
    }];
  }, [product.variants]);

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[0]);

  // Find the exact active variant based on selected size matcher and/or colour
  const activeVariant = useMemo(() => {
    const variants = product.variants || [];
    if (variants.length === 0) return undefined;

    // 1. Try to find variant matching both selected size matcher AND selected colour
    if (selectedSize?.variantMatcher) {
      const matchSizeAndColour = variants.find(
        (v) => selectedSize.variantMatcher!(v) && (!selectedColour || v.colour?.toLowerCase() === selectedColour.toLowerCase())
      );
      if (matchSizeAndColour) return matchSizeAndColour;

      const matchSizeOnly = variants.find((v) => selectedSize.variantMatcher!(v));
      if (matchSizeOnly) return matchSizeOnly;
    }

    // 2. Try to match colour
    if (selectedColour) {
      const matchColour = variants.find((v) => v.colour?.toLowerCase() === selectedColour.toLowerCase());
      if (matchColour) return matchColour;
    }

    return variants[0];
  }, [product.variants, selectedSize, selectedColour]);

  // Extract all images for the currently active variant
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

  const currentImage = allImages[Math.min(selectedImgIdx, allImages.length - 1)] || allImages[0];

  // 🎯 ACTIVE SIZE CLICK HANDLER: Immediately switches active variant, gallery, and photo!
  const handleSelectSize = (opt: SizeOption, idx: number) => {
    setSelectedSize(opt);
    setSelectedImgIdx(0); // Reset to hero photo of the new size/variant
  };

  // 🎨 ACTIVE COLOUR CLICK HANDLER
  const handleSelectColour = (colour: string) => {
    setSelectedColour(colour);
    setSelectedImgIdx(0);
  };

  // Keyboard navigation for zoom
  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
      if (e.key === "ArrowRight") setSelectedImgIdx((i) => (i + 1) % allImages.length);
      if (e.key === "ArrowLeft") setSelectedImgIdx((i) => (i - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomOpen, allImages.length]);

  // Construct dynamic WhatsApp quotation message
  const whatsappQuoteUrl = useMemo(() => {
    const text = `Hi Craftiva! I'd like to get the best factory price quote for "${product.name}".
• Selected Size: ${selectedSize?.label || "Standard"} (${selectedSize?.sublabel || ""})
• Dimensions: ${selectedSize?.dimensions || "Standard"}
• Finish/Colour: ${selectedColour}
• Delivery: Delhi-NCR / Pan-India

Please share the best direct factory price, real wood/fabric swatches and confirm production timeline.`;
    return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }, [product.name, selectedSize, selectedColour]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      
      {/* 🖼️ LEFT COLUMN: MULTI-PHOTO GALLERY */}
      <div>
        {/* Main Big Photo */}
        <div className="group relative overflow-hidden rounded-2xl bg-surface-2 border border-line shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentImage}
            src={currentImage}
            alt={`${product.name} — Photo ${selectedImgIdx + 1}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = allImages[0] || TRANSPARENT_PIXEL;
            }}
            className="aspect-[4/3] w-full cursor-zoom-in object-cover transition-transform duration-500 hover:scale-[1.02]"
            onClick={() => setZoomOpen(true)}
          />

          {/* Fullscreen Zoom Trigger */}
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label="Zoom image"
            className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-all duration-300 hover:bg-black group-hover:opacity-100"
          >
            <Maximize2 size={16} />
          </button>

          {/* Prev / Next Buttons */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImgIdx((i) => (i - 1 + allImages.length) % allImages.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImgIdx((i) => (i + 1) % allImages.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Counter Badge */}
          <div className="absolute bottom-3.5 right-3.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
            {selectedImgIdx + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnail Row */}
        {allImages.length > 1 && (
          <div className="mt-3.5 flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
            {allImages.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                onClick={() => setSelectedImgIdx(idx)}
                className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImgIdx === idx
                    ? "border-brass ring-2 ring-brass/30 opacity-100"
                    : "border-line opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`${product.name} — view ${idx + 1}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = TRANSPARENT_PIXEL;
                  }}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* 🏭 Factory Direct Badge Under Gallery */}
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-card">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
              <Hammer size={19} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brass">Handcrafted in Kirti Nagar</p>
              <p className="text-[13px] text-ash mt-1">
                Every piece is custom-tailored in our 3rd-floor Timber Block workshop. Bring your floor plan or Pinterest reference.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🏷️ RIGHT COLUMN: PRODUCT DETAILS & INTERACTIVE SELECTORS */}
      <div className="flex flex-col">
        
        {/* Header & Wishlist */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-brass/40 bg-brass/10 text-brass text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full">
                {product.subcategory}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 px-2 py-1 rounded-full">
                Save up to 50% vs Showroom
              </span>
            </div>
            <h1 className="display-title mt-3 text-3xl text-ivory sm:text-5xl">{product.name}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-ash">
              <Clock size={13} className="text-brass" />
              Made to order · <strong className="font-semibold text-ivory">10–15 Days Delhi-NCR Delivery</strong>
            </p>
          </div>
          <WishlistButton slug={product.slug} name={product.name} />
        </div>

        {/* 🏷️ Direct Factory Quote Banner */}
        <div className="mt-6 rounded-2xl border border-brass/30 bg-brass/10 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ash">Pricing</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-display text-xl text-ivory sm:text-2xl">Direct Factory Best Price</span>
              </div>
            </div>
            <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink bg-brass px-3 py-1.5 rounded-full">
              Get Quote on WhatsApp
            </span>
          </div>
          <p className="mt-3 text-xs text-ash leading-relaxed border-t border-brass/30 pt-3">
            Selected: <strong className="text-ivory">{selectedSize?.label}</strong> in{" "}
            <strong className="text-ivory">{selectedColour}</strong> finish.
          </p>
        </div>

        {/* 📏 INTERACTIVE SIZE / CONFIGURATION SELECTOR */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory flex items-center gap-2">
              <Ruler size={14} className="text-brass" /> 1. Select Size &amp; Dimensions
            </span>
            <span className="text-[11px] text-brass font-semibold">{selectedSize?.dimensions}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {sizeOptions.map((opt, idx) => {
              const isSelected = selectedSize?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectSize(opt, idx)}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-brass bg-brass/10 ring-1 ring-brass/40"
                      : "border-line bg-[#f7f4ee] hover:border-brass/60 hover:bg-[#ece7dd]"
                  }`}
                >
                  <span className={`font-semibold text-xs block ${isSelected ? "text-ivory" : "text-ash"}`}>
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-muted block leading-tight mt-1">{opt.sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🎨 INTERACTIVE COLOUR & FINISH SWATCHES */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory flex items-center gap-2">
              <Palette size={14} className="text-brass" /> 2. Select Fabric / Timber Finish
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
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "border-ivory bg-ivory text-ink"
                      : "border-line bg-[#f7f4ee] text-ash hover:border-brass hover:text-brass"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/30"
                    style={{ backgroundColor: colourToCss(c) }}
                  />
                  <span>{c}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 💬 DIRECT WHATSAPP ORDER / QUOTE CTA */}
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#2fdd6c] px-6 py-4 text-[13px] font-bold tracking-wide text-[#06210f] shadow-lift transition-all"
          >
            <MessageCircle size={18} />
            <span>Get Best Quote on WhatsApp</span>
          </a>
          <p className="text-center text-[11px] uppercase tracking-[0.14em] text-muted">
            Instant response from our Kirti Nagar workshop · Share custom photos or Pinterest links
          </p>
        </div>

        {/* 🛠️ WORKSHOP SPECIFICATIONS TABLE (2x3 GRID) */}
        <div className="mt-8 border-t border-line pt-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ivory mb-4">
            Workshop Technical Specifications
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { k: "Timber & Framing", v: "100% Solid Seasoned Wood" },
              { k: "Cushioning / Foam", v: "40-Density HR Core (Sag-Free)" },
              { k: "Current Dimensions", v: selectedSize?.dimensions || "Standard" },
              { k: "Hardware / Storage", v: "German Telescopic / Gas-Lift" },
              { k: "Structural Guarantee", v: "5-Year Frame Warranty" },
              { k: "Delivery Timeline", v: "10–15 Working Days NCR" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-line bg-[#f7f4ee] p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted block">{s.k}</span>
                <span className="font-semibold text-ivory mt-1 block leading-snug">{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Short Description */}
        <div className="mt-6 border-t border-line pt-5 text-[13px] text-ash leading-relaxed">
          <p>{product.shortDescription || product.description}</p>
        </div>

      </div>

      {/* 🔍 FULLSCREEN ZOOM LIGHTBOX MODAL */}
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
            alt={`${product.name} — enlarged view ${selectedImgIdx + 1}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = TRANSPARENT_PIXEL;
            }}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
          />

          <div className="absolute bottom-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSelectedImgIdx((i) => (i - 1 + allImages.length) % allImages.length)}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/30"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-sm font-bold text-white">
              {selectedImgIdx + 1} / {allImages.length}
            </span>
            <button
              type="button"
              onClick={() => setSelectedImgIdx((i) => (i + 1) % allImages.length)}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/30"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}