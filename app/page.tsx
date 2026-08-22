"use client";

import { useState } from "react";
import { MessageCircle, MapPin, Sparkles, ArrowRight, ShieldCheck, Truck, Ruler, Phone, Eye, Layers, ChevronDown } from "lucide-react";
import { SITE } from "@/lib/site";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  price: string;
  subPrice: string;
  description: string;
  specs: { label: string; value: string }[];
  mainImg: string;
  lifestyleImg: string;
  whatsappMessage: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "riviera-bed",
    name: "The Riviera Isabelline Bed",
    category: "bedroom",
    tag: "Bestseller · Ash Veneer",
    price: "₹56,000",
    subPrice: "(Queen) / ₹62,000 (King)",
    description: "Isabelline white textured upholstery framed with a medium brown solid ash wood veneer platform. Features an architectural extended headboard.",
    specs: [
      { label: "Material", value: "Ash Veneer + Bouclé" },
      { label: "Storage", value: "Optional Hydraulic" },
      { label: "Dimensions", value: "84″W × 86″L × 44″H" },
      { label: "Lead Time", value: "10–14 Days NCR" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/01_Riviera_Bed_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Riviera Isabelline Bed (₹56,000). Please share customisation details.",
  },
  {
    id: "madrid-bed",
    name: "The Madrid Cream Velvet Bed",
    category: "bedroom",
    tag: "Luxury Velvet · Channel Tuft",
    price: "₹54,000",
    subPrice: "(Queen) / ₹60,000 (King)",
    description: "Vertical channel-tufted high-density velvet headboard with solid internal hardwood framing. German gas-lift hydraulic storage ready.",
    specs: [
      { label: "Material", value: "High-Pile Velvet" },
      { label: "Storage", value: "Gas-Lift Hydraulic" },
      { label: "Dimensions", value: "72″W × 82″L × 50″H" },
      { label: "Lead Time", value: "10–14 Days NCR" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/02_Madrid_Bed_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/02_Madrid_Bed_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Madrid Cream Velvet Bed (₹54,000).",
  },
  {
    id: "kennedy-bedside",
    name: "Kennedy Bedside Table",
    category: "bedroom",
    tag: "Sintered Stone · 3-Drawers",
    price: "₹16,000",
    subPrice: "(Single) / ₹30,000 (Pair)",
    description: "Calacatta white sintered stone marble-look top mounted over 3 soft-close telescopic drawers with satin brass hardware.",
    specs: [
      { label: "Top", value: "Sintered Stone" },
      { label: "Hardware", value: "Satin Brass Pulls" },
      { label: "Dimensions", value: "20″W × 16″D × 22″H" },
      { label: "Warranty", value: "5-Year Structural" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Kennedy Bedside Table (₹16,000).",
  },
  {
    id: "archie-dresser",
    name: "Archie 6-Drawer Dresser",
    category: "bedroom",
    tag: "Case Goods · Sintered Stone",
    price: "₹42,000",
    subPrice: "(60″ Wide)",
    description: "Spacious 6-drawer dresser with scratch-resistant sintered stone surface and heavy-duty soft-close drawer runners.",
    specs: [
      { label: "Top", value: "Sintered Stone" },
      { label: "Body", value: "Matt Black Timber" },
      { label: "Dimensions", value: "60″W × 18″D × 32″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/04_Archie_Dresser_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/04_Archie_Dresser_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Archie 6-Drawer Dresser (₹42,000).",
  },
  {
    id: "antonella-sofa",
    name: "The Antonella Stone Cream Sofa",
    category: "living",
    tag: "Bestseller · 3-Seater / Sectional",
    price: "₹46,000",
    subPrice: "(3-Seater) / ₹58,000 (L-Shape)",
    description: "Stone cream textured woven fabric sofa with generous deep seating, 40-density high-resilience foam, and kiln-dried internal hardwood structure.",
    specs: [
      { label: "Cushioning", value: "40-Density HR Foam" },
      { label: "Fabric", value: "Heavy Textured Weave" },
      { label: "Dimensions", value: "86″L × 38″D × 32″H" },
      { label: "Custom Sizes", value: "Yes, to your room" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Antonella Stone Cream Sofa (₹46,000). Please share fabric shade options.",
  },
  {
    id: "ava-sofa",
    name: "The Ava Cream Cloud Sofa",
    category: "living",
    tag: "Plush Comfort · Chenille",
    price: "₹44,000",
    subPrice: "(3-Seater)",
    description: "Cloud-style silhouette with ultra-soft feather-blend cushions and cream chenille upholstery. Maximum lounging comfort.",
    specs: [
      { label: "Feel", value: "Ultra Plush Cloud" },
      { label: "Fabric", value: "Cream Chenille" },
      { label: "Dimensions", value: "84″L × 36″D × 30″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/06_Ava_Sofa_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/06_Ava_Sofa_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Ava Cream Cloud Sofa (₹44,000).",
  },
  {
    id: "elianna-sofa",
    name: "The Elianna Track-Arm Sofa",
    category: "living",
    tag: "Architectural · Low Profile",
    price: "₹48,000",
    subPrice: "(3-Seater)",
    description: "Minimalist low-profile sofa with broad track arms, high-density base core, and stain-resistant fabric for contemporary living rooms.",
    specs: [
      { label: "Profile", value: "Modern Low-Slung" },
      { label: "Foam", value: "Dual Density HR" },
      { label: "Dimensions", value: "88″L × 38″D × 31″H" },
      { label: "Warranty", value: "5-Year Structure" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/07_Elianna_Sofa_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/07_Elianna_Sofa_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Elianna Track-Arm Sofa (₹48,000).",
  },
  {
    id: "kelly-ottoman",
    name: "Kelly Velvet Curved Ottoman",
    category: "living",
    tag: "Accent Seating · Sculptural",
    price: "₹12,000",
    subPrice: "(Single)",
    description: "Organic crescent form with dense velvet padding. Perfect as an accent pouf, coffee table stool, or bedroom end bench.",
    specs: [
      { label: "Shape", value: "Curved Crescent" },
      { label: "Fabric", value: "Luxury Velvet" },
      { label: "Dimensions", value: "24″W × 20″D × 17″H" },
      { label: "Use", value: "Living & Bedroom" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Kelly Velvet Ottoman (₹12,000).",
  },
  {
    id: "carlo-chair",
    name: "Carlo Mid-Century Leather Chair",
    category: "living",
    tag: "Top-Grain Leather · Solid Teak",
    price: "₹24,000",
    subPrice: "(Single) / ₹45,000 (Pair)",
    description: "Cognac top-grain leather armchair with solid teakwood angular armrests and exposed brass joinery.",
    specs: [
      { label: "Leather", value: "Top-Grain Cognac" },
      { label: "Frame", value: "Solid Teakwood" },
      { label: "Dimensions", value: "28″W × 32″D × 31″H" },
      { label: "Delivery", value: "Delhi-NCR & Pan-India" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Carlo Leather Chair (₹24,000).",
  },
  {
    id: "xandra-unit",
    name: "Xandra Entertainment & Media Unit",
    category: "storage",
    tag: "Dark Walnut · 78″ Length",
    price: "₹32,000",
    subPrice: "(78″ TV Console)",
    description: "Rich dark walnut veneer TV credenza with acoustic drop-down mesh flaps, internal cable routing, and brass foot caps.",
    specs: [
      { label: "Finish", value: "Dark Walnut Veneer" },
      { label: "Cable Mgmt", value: "Internal Pass-Through" },
      { label: "Dimensions", value: "78″L × 18″D × 20″H" },
      { label: "Fits TV", value: "Up to 85″ Screens" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Xandra Entertainment Unit (₹32,000).",
  },
  {
    id: "douglas-wardrobe",
    name: "Douglas Solid Wood Tatami Armoire",
    category: "storage",
    tag: "Solid Teak · Natural Rattan",
    price: "₹48,000",
    subPrice: "(38″ Wide Armoire)",
    description: "Solid teakwood frame fitted with hand-woven natural rattan cane panels, internal hanging rail, adjustable shelves, and antique brass latches.",
    specs: [
      { label: "Wood", value: "Solid Teakwood" },
      { label: "Panels", value: "Natural Rattan Cane" },
      { label: "Dimensions", value: "38″W × 22″D × 72″H" },
      { label: "Interior", value: "Hanging Rail + Shelves" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Douglas Tatami Wardrobe (₹48,000).",
  },
  {
    id: "berkely-console",
    name: "Berkely Fluted Console Table",
    category: "storage",
    tag: "Fluted Timber · Oval Top",
    price: "₹22,000",
    subPrice: "(52″ Wide)",
    description: "Sculptural entryway console with dual fluted tambour timber pillar bases and a rounded oval tabletop in natural satin lacquer.",
    specs: [
      { label: "Base", value: "Fluted Tambour Timber" },
      { label: "Top", value: "Oval Hardwood" },
      { label: "Dimensions", value: "52″L × 16″D × 32″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Berkely Fluted Console (₹22,000).",
  },
  {
    id: "sheesham-dining",
    name: "Solid Sheesham 6-Seater Dining Suite",
    category: "dining",
    tag: "100% Solid Sheesham · 6 Chairs",
    price: "₹52,000",
    subPrice: "(Table + 6 Cushioned Chairs)",
    description: "Handcrafted from seasoned solid Indian Sheesham wood showcasing distinctive natural grain patterns. Includes 6 cushioned ergonomic high-back chairs.",
    specs: [
      { label: "Timber", value: "100% Solid Sheesham" },
      { label: "Includes", value: "Table + 6 Chairs" },
      { label: "Dimensions", value: "72″L × 36″W × 30″H" },
      { label: "Warranty", value: "5-Year Timber Guarantee" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Set_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Set_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Solid Sheesham Dining Set (₹52,000).",
  },
  {
    id: "hargrove-dining",
    name: "Hargrove Round Pedestal Dining Suite",
    category: "dining",
    tag: "Round Pedestal · 4 Chairs",
    price: "₹46,000",
    subPrice: "(48″ Round Table + 4 Chairs)",
    description: "Architectural fluted central pedestal base with a 48″ round hardwood tabletop and 4 curved barrel dining chairs in woven fabric.",
    specs: [
      { label: "Base", value: "Fluted Solid Pedestal" },
      { label: "Diameter", value: "48″ Round (4-6 Seater)" },
      { label: "Includes", value: "Table + 4 Barrel Chairs" },
      { label: "Finish", value: "Warm Walnut / Natural" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Hargrove Round Dining Suite (₹46,000).",
  },
];

const CATEGORIES = [
  { id: "all", label: "✨ All Pieces" },
  { id: "bedroom", label: "🛏️ Bedroom" },
  { id: "living", label: "🛋️ Living & Sofas" },
  { id: "dining", label: "🪵 Dining Suites" },
  { id: "storage", label: "📺 Storage & Units" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lifestyleToggled, setLifestyleToggled] = useState<Record<string, boolean>>({});

  const toggleImage = (id: string) => {
    setLifestyleToggled((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = selectedCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#F7F5F0] text-[#191613] min-h-screen pb-20 sm:pb-12 overflow-x-hidden font-sans">
      
      {/* 📱 MOBILE-FIRST HERO SPREAD */}
      <section className="px-3 sm:px-6 pt-3 sm:pt-6 pb-6 sm:pb-10 max-w-7xl mx-auto">
        <div className="bg-[#1E1916] text-[#FAF7F2] rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 shadow-xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B08D5B]/40 bg-[#B08D5B]/15 px-2.5 py-0.5 sm:py-1 mb-3 sm:mb-4 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#B08D5B] animate-pulse"></span>
            <p className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#B08D5B]">
              Master Catalogue 2026 · Delhi Workshop
            </p>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] mb-2 sm:mb-3">
            Bespoke Living, <span className="italic">Handcrafted in Delhi.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-xl mb-4 sm:mb-6">
            Solid Sheesham beds, tailored sectional sofas, sintered stone case goods, and architectural dining suites. Hand-joined directly in our Kirti Nagar workshop — zero showroom markups.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="#products"
              className="bg-[#B08D5B] text-[#191613] hover:bg-[#c7a26f] font-bold text-[11px] sm:text-xs uppercase tracking-wider px-5 py-2.5 sm:py-3 rounded-full transition-all shadow-md inline-flex items-center gap-1.5"
            >
              Browse 14 Core Pieces ↓
            </a>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to commission a custom furniture piece.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 hover:bg-white/10 text-[#FAF7F2] font-semibold text-[11px] sm:text-xs uppercase tracking-wider px-5 py-2.5 sm:py-3 rounded-full transition-all inline-flex items-center gap-1.5"
            >
              <MessageCircle size={13} /> WhatsApp Quote
            </a>
          </div>

          {/* Quick Stats on Mobile */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-4 mt-5 text-center">
            <div>
              <p className="font-serif text-lg sm:text-2xl font-bold text-[#B08D5B]">100%</p>
              <p className="text-[10px] sm:text-xs text-white/70">Solid Hardwoods</p>
            </div>
            <div>
              <p className="font-serif text-lg sm:text-2xl font-bold text-[#B08D5B]">10–14</p>
              <p className="text-[10px] sm:text-xs text-white/70">Days Lead Time</p>
            </div>
            <div>
              <p className="font-serif text-lg sm:text-2xl font-bold text-[#B08D5B]">5-Year</p>
              <p className="text-[10px] sm:text-xs text-white/70">Warranty</p>
            </div>
          </div>

        </div>
      </section>

      {/* 📱 HORIZONTAL SCROLLABLE CATEGORY PILLS (STICKY) */}
      <div className="sticky top-[68px] sm:top-[76px] z-40 bg-[#F7F5F0]/95 backdrop-blur-md border-y border-[#E5DFD5] py-2.5 shadow-xs" id="products">
        <div className="px-3 sm:px-6 max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-[#1E1916] text-[#FAF7F2] shadow-sm"
                    : "bg-[#EFE9E0] text-[#736C64] hover:bg-[#E5DFD5] hover:text-[#191613]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📱 PRODUCT CATALOGUE CARDS (MOBILE OPTIMIZED) */}
      <main className="px-3 sm:px-6 py-6 sm:py-10 max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#736C64]">
            Showing <strong className="text-[#191613] font-bold">{filteredProducts.length}</strong> handcrafted pieces
          </p>
          <span className="text-[10px] sm:text-xs text-[#8C6F47] font-semibold flex items-center gap-1">
            <span>👆 Tap photo to flip room view</span>
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((p) => {
            const isToggled = lifestyleToggled[p.id] || false;
            const currentImg = isToggled ? p.lifestyleImg : p.mainImg;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                {/* Image Container with Tap-To-Flip */}
                <div
                  onClick={() => toggleImage(p.id)}
                  className="aspect-[16/11] bg-[#FAF8F5] relative overflow-hidden cursor-pointer select-none"
                >
                  <img
                    src={currentImg}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category / Material Tag */}
                  <span className="absolute top-2.5 left-2.5 bg-[#1E1916]/85 backdrop-blur text-white text-[9px] sm:text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    {p.tag}
                  </span>

                  {/* Interactive Flip Badge */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImage(p.id);
                    }}
                    className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-white text-[#191613] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1"
                  >
                    <Layers size={11} />
                    <span>{isToggled ? "Studio View" : "Room View"}</span>
                  </button>

                  <div className="absolute bottom-2 left-2.5 bg-black/60 backdrop-blur text-white text-[9px] px-2 py-0.5 rounded-md sm:hidden">
                    {isToggled ? "📷 Room Lifestyle Angle" : "📷 Front Studio Angle"}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#191613] leading-snug">
                      {p.name}
                    </h3>
                    
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-sans text-base sm:text-lg font-bold text-[#1E1916]">{p.price}</span>
                      <span className="text-[11px] text-[#736C64]">{p.subPrice}</span>
                    </div>

                    <p className="text-xs text-[#736C64] mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    {/* Compact Specs Badges */}
                    <div className="grid grid-cols-2 gap-1.5 mt-3 pt-3 border-t border-[#EFE9E0] text-[10px] text-[#736C64]">
                      {p.specs.slice(0, 2).map((spec, i) => (
                        <div key={i} className="bg-[#FAF8F5] p-1.5 rounded-md">
                          <span className="text-[#191613] font-semibold block">{spec.label}:</span>
                          <span className="truncate block">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 1-Tap WhatsApp Inquiry Button */}
                  <a
                    href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(p.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full bg-[#1E1916] hover:bg-[#8C6F47] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle size={14} className="text-[#B08D5B]" />
                    <span>WhatsApp Quote ({p.price})</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🏭 WORKSHOP VISIT & QUALITY PROMISE */}
        <section className="bg-[#242D21] text-[#FAF7F2] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-lg mt-10">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B08D5B]">Factory Direct</span>
              <h3 className="font-serif text-xl sm:text-3xl font-medium mt-1 mb-2">
                Crafted in Kirti Nagar. Delivered Across Delhi-NCR.
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed mb-4">
                We do not mass-produce for warehouse shelves. Every piece is built to order in our 3rd-floor Timber Block workshop. Bring your floor plan, Pinterest reference, or room measurements.
              </p>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to visit the Kirti Nagar workshop.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#B08D5B] text-[#191613] hover:bg-[#c7a26f] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-1.5"
              >
                Schedule Workshop Visit →
              </a>
            </div>

            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/20 pt-4 lg:pt-0 lg:pl-6 text-xs text-[#FAF7F2]/80 space-y-2">
              <p>📍 <strong>Location:</strong> {SITE.address}</p>
              <p>🪵 <strong>Timber:</strong> 100% Kiln-Dried Solid Hardwood &amp; 18mm BWR Ply</p>
              <p>⏱️ <strong>Turnaround:</strong> 10–14 Days Made-to-Order</p>
              <p>📞 <strong>Direct Line:</strong> {SITE.whatsappDisplay}</p>
            </div>
          </div>
        </section>

      </main>

      {/* 📱 STICKY FLOATING WHATSAPP BAR ON MOBILE */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-[#1E1916] text-[#FAF7F2] border-t border-[#B08D5B]/30 px-4 py-2.5 flex items-center justify-between shadow-2xl sm:hidden">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#B08D5B] font-bold uppercase tracking-wider">Craftiva Workshop</span>
          <span className="text-xs font-semibold text-white">Custom Furniture Quotes</span>
        </div>
        <a
          href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to ask a question about custom furniture.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-[#0A2010] font-bold text-xs px-4 py-2 rounded-full shadow-md flex items-center gap-1.5"
        >
          <MessageCircle size={14} />
          <span>WhatsApp Chat</span>
        </a>
      </div>

    </div>
  );
}