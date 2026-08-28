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

  // Extract clean unique colours
  const colours = useMemo(() => {
    const fromVariants = (product.variants || []).map((v) => v.colour).filter(Boolean);
    const fromOptions = product.colourOptions || [];
    const combined = [...new Set([...fromVariants, ...fromOptions])];
    if (combined.length > 0) return combined.slice(0, 8);
    return ["Stone Cream", "Isabelline White", "Dark Walnut", "Cognac Brown", "Natural Cane"];
  }, [product]);

  const [selectedColour, setSelectedColour] = useState<string>(colours[0] || "Natural");

  // Determine clean, distinct size options based on product type / category
  const sizeOptions: SizeOption[] = useMemo(() => {
    const slug = (product.slug || "").toLowerCase();
    const cat = (product.category?.slug || "").toLowerCase();

    if (slug.includes("bed") || cat === "beds") {
      return [
        {
          id: "queen",
          label: "Queen Size",
          sublabel: "60″ × 78″ (5 × 6.5 ft)",
          dimensions: "66″W × 84″L × 44″H",
          variantMatcher: (v) => /queen/i.test(v.configuration || "") || /queen/i.test(v.name || ""),
        },
        {
          id: "king",
          label: "King Size",
          sublabel: "72″ × 78″ (6 × 6.5 ft)",
          dimensions: "78″W × 84″L × 44″H",
          variantMatcher: (v) => /king/i.test(v.configuration || "") || /king/i.test(v.name || ""),
        },
        {
          id: "custom",
          label: "Custom Sizing",
          sublabel: "Built to your room",
          dimensions: "Bespoke Room Dimensions",
        },
      ];
    }

    if (slug.includes("sofa") || cat === "sofas" || cat === "sectionals") {
      return [
        {
          id: "3seater",
          label: "3-Seater",
          sublabel: "86″ Length (Standard)",
          dimensions: "86″L × 38″D × 32″H",
          variantMatcher: (v) =>
            (/3\s*(pieces|seater|seat)/i.test(v.configuration || "") || /3\s*(pieces|seater|seat)/i.test(v.name || "")) &&
            !/chaise/i.test(v.name || ""),
        },
        {
          id: "4seater",
          label: "4-Seater",
          sublabel: "102″ Length (Extra Room)",
          dimensions: "102″L × 38″D × 32″H",
          variantMatcher: (v) =>
            /4\s*(pieces|seater|seat)/i.test(v.configuration || "") || /4\s*(pieces|seater|seat)/i.test(v.name || ""),
        },
        {
          id: "lshape",
          label: "L-Shape Sectional",
          sublabel: "108″ with Chaise Lounger",
          dimensions: "108″L × 68″Chaise × 32″H",
          variantMatcher: (v) =>
            /chaise|sectional|modular|2\s*pieces/i.test(v.configuration || "") ||
            /chaise|sectional|modular|2\s*pieces/i.test(v.name || ""),
        },
      ];
    }

    if (slug.includes("dining") || cat === "dining" || cat === "dining-tables") {
      return [
        { id: "4seater", label: "4-Seater Suite", sublabel: "48″ Round / 54″ Table", dimensions: "48″ Round × 30″H" },
        { id: "6seater", label: "6-Seater Suite", sublabel: "72″ Table + 6 Chairs", dimensions: "72″L × 36″W × 30″H" },
        { id: "8seater", label: "8-Seater Grand", sublabel: "96″ Table + 8 Chairs", dimensions: "96″L × 42″W × 30″H" },
      ];
    }

    if (slug.includes("dresser") || slug.includes("console") || slug.includes("tv") || cat === "storage") {
      return [
        { id: "standard", label: "Standard Size", sublabel: "60″ Wide Credenza", dimensions: "60″W × 18″D × 32″H" },
        { id: "grand", label: "Grand 78″ Unit", sublabel: "Up to 85″ TV Screens", dimensions: "78″W × 18″D × 24″H" },
        { id: "custom", label: "Custom Dimensions", sublabel: "Built to your wall", dimensions: "Bespoke Wall Dimensions" },
      ];
    }

    if (slug.includes("chair") || cat === "chairs" || cat === "stools") {
      return [
        { id: "single", label: "Single Accent Piece", sublabel: "Individual Unit", dimensions: "Standard Dimensions" },
        { id: "pair", label: "Matching Pair (Set of 2)", sublabel: "Save on pair order", dimensions: "Set of 2 Units" },
        { id: "set4", label: "Set of 4 / Dining Set", sublabel: "Suite Configuration", dimensions: "Set of 4 Units" },
      ];
    }

    return [
      { id: "standard", label: "Standard Size", sublabel: "Workshop Specification", dimensions: "Standard Dimensions" },
      { id: "custom", label: "Custom Dimensions", sublabel: "Built to your space", dimensions: "Bespoke Measurements" },
    ];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizeOptions[0]!);

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
    return [activeVariant?.hero || product.variants?.[0]?.hero || "/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg"];
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
        <div className="group relative overflow-hidden rounded-3xl bg-[#F4EFEA] border border-[#E8E2D8] shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={currentImage}
            src={currentImage}
            alt={`${product.name} — Photo ${selectedImgIdx + 1}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = allImages[0];
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
                key={img}
                type="button"
                onClick={() => setSelectedImgIdx(idx)}
                className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                  selectedImgIdx === idx
                    ? "border-[#191614] ring-2 ring-[#8C6F47]/40 scale-95"
                    : "border-[#E8E2D8] opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = allImages[0];
                  }}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* 🏭 Factory Direct Badge Under Gallery */}
        <div className="mt-6 rounded-2xl border border-[#E8E2D8] bg-white p-4.5 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EFE7DA] text-[#8C6F47]">
              <Hammer size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8C6F47]">Handcrafted in Kirti Nagar</p>
              <p className="text-[11.5px] text-[#706A62] mt-0.5">
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
            <div className="flex items-center gap-2">
              <span className="bg-[#EFE7DA] text-[#8C6F47] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {product.subcategory}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Save 40% vs Showroom
              </span>
            </div>
            <h1 className="mt-2 font-serif text-2xl sm:text-4xl font-bold text-[#191614] leading-tight">
              {product.name}
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#706A62]">
              <Clock size={13} className="text-[#8C6F47]" />
              Made to order · <strong>10–14 Days Delhi-NCR Delivery</strong>
            </p>
          </div>
          <WishlistButton slug={product.slug} name={product.name} />
        </div>

        {/* 🏷️ Direct Factory Quote Banner */}
        <div className="mt-4.5 rounded-2xl border border-[#E8E2D8] bg-[#FAF8F5] p-4.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#706A62]">Pricing</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#191614]">Direct Factory Best Price</span>
              </div>
            </div>
            <span className="text-[10.5px] font-bold text-[#8C6F47] bg-[#EFE7DA] px-3 py-1 rounded-full">
              Get Quote on WhatsApp
            </span>
          </div>
          <p className="mt-2 text-xs text-[#706A62] leading-relaxed border-t border-[#E8E2D8] pt-2">
            Selected: <strong>{selectedSize?.label}</strong> in <strong>{selectedColour}</strong> finish.
          </p>
        </div>

        {/* 📏 INTERACTIVE SIZE / CONFIGURATION SELECTOR */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#191614] flex items-center gap-1.5">
              <Ruler size={14} className="text-[#8C6F47]" /> 1. Select Size & Dimensions:
            </span>
            <span className="text-[11px] text-[#8C6F47] font-semibold">{selectedSize?.dimensions}</span>
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
                      ? "border-[#191614] bg-[#FAF8F5] ring-2 ring-[#8C6F47]/40 shadow-xs"
                      : "border-[#E8E2D8] bg-white hover:border-[#8C6F47] hover:bg-[#FAF8F5]/50"
                  }`}
                >
                  <span className="font-bold text-xs text-[#191614] block">{opt.label}</span>
                  <span className="text-[10px] text-[#706A62] block leading-tight mt-0.5">{opt.sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🎨 INTERACTIVE COLOUR & FINISH SWATCHES */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#191614] flex items-center gap-1.5">
              <Palette size={14} className="text-[#8C6F47]" /> 2. Select Fabric / Timber Finish:
            </span>
            <span className="text-[11px] font-bold text-[#191614]">{selectedColour}</span>
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
                      ? "border-[#191614] bg-[#191614] text-white shadow-xs"
                      : "border-[#E8E2D8] bg-white text-[#706A62] hover:border-[#191614]"
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: colourToCss(c) }}
                  />
                  <span>{c}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 💬 DIRECT WHATSAPP ORDER / QUOTE CTA */}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={whatsappQuoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] px-6 py-3.5 text-xs font-bold text-[#0A2010] shadow-md transition-all"
          >
            <MessageCircle size={18} />
            <span>Get Best Quote on WhatsApp</span>
          </a>
          <p className="text-center text-[11px] text-[#706A62]">
            ⚡ Instant response from our Kirti Nagar workshop · Share custom photos or Pinterest links
          </p>
        </div>

        {/* 🛠️ WORKSHOP SPECIFICATIONS TABLE (2x3 GRID) */}
        <div className="mt-6 border-t border-[#E8E2D8] pt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#191614] mb-3">
            Workshop Technical Specifications:
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-[#E8E2D8] bg-white p-3">
              <span className="text-[10px] font-bold uppercase text-[#706A62] block">Timber & Framing</span>
              <span className="font-semibold text-[#191614] mt-0.5 block">100% Solid Seasoned Wood</span>
            </div>
            <div className="rounded-xl border border-[#E8E2D8] bg-white p-3">
              <span className="text-[10px] font-bold uppercase text-[#706A62] block">Cushioning / Foam</span>
              <span className="font-semibold text-[#191614] mt-0.5 block">40-Density HR Core (Sag-Free)</span>
            </div>
            <div className="rounded-xl border border-[#E8E2D8] bg-white p-3">
              <span className="text-[10px] font-bold uppercase text-[#706A62] block">Current Dimensions</span>
              <span className="font-semibold text-[#191614] mt-0.5 block">{selectedSize?.dimensions}</span>
            </div>
            <div className="rounded-xl border border-[#E8E2D8] bg-white p-3">
              <span className="text-[10px] font-bold uppercase text-[#706A62] block">Hardware / Storage</span>
              <span className="font-semibold text-[#191614] mt-0.5 block">German Telescopic / Gas-Lift</span>
            </div>
            <div className="rounded-xl border border-[#E8E2D8] bg-white p-3">
              <span className="text-[10px] font-bold uppercase text-[#706A62] block">Structural Guarantee</span>
              <span className="font-semibold text-[#191614] mt-0.5 block">5-Year Frame Warranty</span>
            </div>
            <div className="rounded-xl border border-[#E8E2D8] bg-white p-3">
              <span className="text-[10px] font-bold uppercase text-[#706A62] block">Delivery Timeline</span>
              <span className="font-semibold text-[#191614] mt-0.5 block">10–14 Working Days NCR</span>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div className="mt-5 border-t border-[#E8E2D8] pt-4 text-xs text-[#706A62] leading-relaxed">
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
            alt=""
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
