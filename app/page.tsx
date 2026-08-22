"use client";

import { useState } from "react";
import { MessageCircle, X, Layers, Check, ShieldCheck, Clock, MapPin, ChevronRight, Phone, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  price: string;
  originalPrice: string;
  subPrice: string;
  shortDesc: string;
  fullDesc: string;
  specs: { label: string; value: string }[];
  mainImg: string;
  lifestyleImg: string;
  whatsappMessage: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "riviera-bed",
    name: "The Riviera Ash Bed",
    category: "bedroom",
    tag: "Ash Veneer",
    price: "₹56,000",
    originalPrice: "₹92,000",
    subPrice: "(Queen) · King ₹62,000",
    shortDesc: "Isabelline white upholstery with solid ash wood veneer platform.",
    fullDesc: "Isabelline white textured upholstery framed with a medium brown solid ash wood veneer platform. Features an architectural extended headboard with integrated floating bedside shelf supports.",
    specs: [
      { label: "Timber", value: "Solid Ash Wood Veneer" },
      { label: "Upholstery", value: "Isabelline Textured Bouclé" },
      { label: "Storage", value: "German Gas-Lift Hydraulic (Optional)" },
      { label: "Dimensions", value: "84″W × 86″L × 44″H (Custom Sizing)" },
      { label: "Warranty", value: "5-Year Structural Guarantee" },
      { label: "Lead Time", value: "10–14 Days Delhi-NCR" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/01_Riviera_Bed_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Riviera Ash Bed (₹56,000). Please share customisation & mattress sizing details.",
  },
  {
    id: "madrid-bed",
    name: "The Madrid Velvet Bed",
    category: "bedroom",
    tag: "Channel Velvet",
    price: "₹54,000",
    originalPrice: "₹88,000",
    subPrice: "(Queen) · King ₹60,000",
    shortDesc: "Vertical channel-tufted velvet with gas-lift storage.",
    fullDesc: "Vertical channel-tufted high-density velvet headboard with solid internal hardwood framing. Features cushioned wrap-around side rails and German gas-lift hydraulic under-bed storage.",
    specs: [
      { label: "Fabric", value: "High-Pile Stain-Resistant Velvet" },
      { label: "Frame", value: "Kiln-Dried Hardwood Structure" },
      { label: "Storage", value: "Gas-Lift Hydraulic Mechanism" },
      { label: "Dimensions", value: "72″W × 82″L × 50″H" },
      { label: "Colors", value: "Cream, Olive, Taupe, Charcoal" },
      { label: "Lead Time", value: "10–14 Days Delhi-NCR" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/02_Madrid_Bed_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/02_Madrid_Bed_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Madrid Velvet Bed (₹54,000).",
  },
  {
    id: "kennedy-bedside",
    name: "Kennedy Bedside Table",
    category: "bedroom",
    tag: "Sintered Stone",
    price: "₹16,000",
    originalPrice: "₹26,000",
    subPrice: "(Single) · Pair ₹30,000",
    shortDesc: "Sintered stone top over 3 soft-close drawers.",
    fullDesc: "Calacatta white sintered stone marble-look top mounted over 3 soft-close telescopic drawers with satin brass hardware pulls.",
    specs: [
      { label: "Top Surface", value: "Heat & Scratch Sintered Stone" },
      { label: "Hardware", value: "Satin Brushed Brass Handles" },
      { label: "Drawers", value: "3 Soft-Close Telescopic" },
      { label: "Dimensions", value: "20″W × 16″D × 22″H" },
      { label: "Warranty", value: "5-Year Guarantee" },
      { label: "Lead Time", value: "Ready / 7 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Kennedy Bedside Table (₹16,000).",
  },
  {
    id: "archie-dresser",
    name: "Archie 6-Drawer Dresser",
    category: "bedroom",
    tag: "6-Drawer Dresser",
    price: "₹42,000",
    originalPrice: "₹68,000",
    subPrice: "(60″ Width)",
    shortDesc: "Spacious 6-drawer chest with sintered stone top.",
    fullDesc: "Spacious 6-drawer dresser with scratch-resistant sintered stone surface and heavy-duty soft-close drawer runners in a modern minimalist black timber body.",
    specs: [
      { label: "Top", value: "Calacatta Sintered Stone" },
      { label: "Structure", value: "Matt Black Seasoned Timber" },
      { label: "Drawers", value: "6 Deep Soft-Close Drawers" },
      { label: "Dimensions", value: "60″W × 18″D × 32″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/04_Archie_Dresser_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/04_Archie_Dresser_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Archie 6-Drawer Dresser (₹42,000).",
  },
  {
    id: "antonella-sofa",
    name: "The Antonella Sofa",
    category: "living",
    tag: "Living Bestseller",
    price: "₹46,000",
    originalPrice: "₹76,000",
    subPrice: "(3-Seater) · L-Shape ₹58,000",
    shortDesc: "Deep-seated sofa with 40-density HR foam cushioning.",
    fullDesc: "Stone cream textured woven fabric sofa with generous deep seating, 40-density high-resilience foam cushions, and kiln-dried internal hardwood structure.",
    specs: [
      { label: "Cushioning", value: "40-Density HR Foam (Sag-Free)" },
      { label: "Fabric", value: "Stain-Resistant Textured Weave" },
      { label: "Frame", value: "Kiln-Dried Internal Hardwood" },
      { label: "Dimensions", value: "86″L × 38″D × 32″H (Custom Lengths)" },
      { label: "Warranty", value: "5-Year Frame & Foam Warranty" },
      { label: "Lead Time", value: "10–14 Days Delhi-NCR" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Antonella Sofa (₹46,000). Please share fabric swatches and size options.",
  },
  {
    id: "ava-sofa",
    name: "The Ava Cloud Sofa",
    category: "living",
    tag: "Plush Chenille",
    price: "₹44,000",
    originalPrice: "₹72,000",
    subPrice: "(3-Seater)",
    shortDesc: "Cloud-style lounging sofa in cream chenille fabric.",
    fullDesc: "Cloud-style silhouette with ultra-soft feather-blend cushions and cream chenille upholstery for luxurious lounging.",
    specs: [
      { label: "Seating Feel", value: "Ultra Plush Cloud Comfort" },
      { label: "Fabric", value: "Soft Cream Chenille" },
      { label: "Frame", value: "Reinforced Solid Hardwood" },
      { label: "Dimensions", value: "84″L × 36″D × 30″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/06_Ava_Sofa_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/06_Ava_Sofa_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Ava Cloud Sofa (₹44,000).",
  },
  {
    id: "elianna-sofa",
    name: "The Elianna Sofa",
    category: "living",
    tag: "Modern Track-Arm",
    price: "₹48,000",
    originalPrice: "₹78,000",
    subPrice: "(3-Seater)",
    shortDesc: "Minimalist low-profile sofa with broad track arms.",
    fullDesc: "Minimalist low-profile sofa with broad track arms, high-density base core, and stain-resistant fabric for contemporary living rooms.",
    specs: [
      { label: "Profile", value: "Modern Low-Slung Silhouette" },
      { label: "Foam", value: "Dual Density 40+32 HR Core" },
      { label: "Dimensions", value: "88″L × 38″D × 31″H" },
      { label: "Warranty", value: "5-Year Frame Guarantee" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/07_Elianna_Sofa_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/07_Elianna_Sofa_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in The Elianna Sofa (₹48,000).",
  },
  {
    id: "kelly-ottoman",
    name: "Kelly Velvet Ottoman",
    category: "living",
    tag: "Curved Accent",
    price: "₹12,000",
    originalPrice: "₹20,000",
    subPrice: "(Single Pouf)",
    shortDesc: "Sculptural crescent ottoman in rich velvet.",
    fullDesc: "Organic crescent form with dense velvet padding. Perfect as an accent pouf, coffee table stool, or bedroom end bench.",
    specs: [
      { label: "Shape", value: "Curved Crescent Form" },
      { label: "Fabric", value: "High-Pile Velvet" },
      { label: "Dimensions", value: "24″W × 20″D × 17″H" },
      { label: "Lead Time", value: "5–7 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Kelly Velvet Ottoman (₹12,000).",
  },
  {
    id: "carlo-chair",
    name: "Carlo Leather Chair",
    category: "living",
    tag: "Top-Grain Leather",
    price: "₹24,000",
    originalPrice: "₹40,000",
    subPrice: "(Single) · Pair ₹45,000",
    shortDesc: "Cognac leather armchair with solid teakwood arms.",
    fullDesc: "Cognac top-grain leather armchair with solid teakwood angular armrests and exposed brass joinery.",
    specs: [
      { label: "Upholstery", value: "Top-Grain Cognac Leather" },
      { label: "Frame & Arms", value: "Solid Seasoned Teakwood" },
      { label: "Hardware", value: "Exposed Satin Brass Joinery" },
      { label: "Dimensions", value: "28″W × 32″D × 31″H" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Carlo Leather Chair (₹24,000).",
  },
  {
    id: "xandra-unit",
    name: "Xandra TV Unit",
    category: "storage",
    tag: "Dark Walnut · 78″",
    price: "₹32,000",
    originalPrice: "₹52,000",
    subPrice: "(78″ Console)",
    shortDesc: "Dark walnut media console with acoustic mesh flaps.",
    fullDesc: "Rich dark walnut veneer TV credenza with acoustic drop-down mesh flaps, internal cable routing, and brass foot caps.",
    specs: [
      { label: "Wood Finish", value: "Dark Walnut Natural Veneer" },
      { label: "Flaps", value: "Drop-Down Acoustic Mesh" },
      { label: "Dimensions", value: "78″L × 18″D × 20″H" },
      { label: "TV Compatibility", value: "Up to 85″ Screens" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Xandra TV Unit (₹32,000).",
  },
  {
    id: "douglas-wardrobe",
    name: "Douglas Tatami Armoire",
    category: "storage",
    tag: "Solid Teak & Cane",
    price: "₹48,000",
    originalPrice: "₹78,000",
    subPrice: "(38″ Wide)",
    shortDesc: "Solid teak wardrobe with natural rattan cane doors.",
    fullDesc: "Solid teakwood frame fitted with hand-woven natural rattan cane panels, internal hanging rail, adjustable shelves, and antique brass latches.",
    specs: [
      { label: "Frame Timber", value: "100% Solid Teakwood" },
      { label: "Panels", value: "Hand-Woven Natural Rattan" },
      { label: "Interior", value: "Hanging Rod + 3 Shelves" },
      { label: "Dimensions", value: "38″W × 22″D × 72″H" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Douglas Tatami Armoire (₹48,000).",
  },
  {
    id: "berkely-console",
    name: "Berkely Fluted Console",
    category: "storage",
    tag: "Fluted Timber",
    price: "₹22,000",
    originalPrice: "₹36,000",
    subPrice: "(52″ Wide)",
    shortDesc: "Oval entryway console with fluted pillar base.",
    fullDesc: "Sculptural entryway console with dual fluted tambour timber pillar bases and a rounded oval tabletop in natural satin lacquer.",
    specs: [
      { label: "Base Structure", value: "Dual Fluted Tambour Pillars" },
      { label: "Top", value: "Rounded Oval Hardwood" },
      { label: "Dimensions", value: "52″L × 16″D × 32″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Berkely Fluted Console (₹22,000).",
  },
  {
    id: "sheesham-dining",
    name: "Solid Sheesham Dining",
    category: "dining",
    tag: "100% Solid Sheesham",
    price: "₹52,000",
    originalPrice: "₹85,000",
    subPrice: "(Table + 6 Chairs)",
    shortDesc: "Solid Indian Sheesham dining table with 6 chairs.",
    fullDesc: "Handcrafted from seasoned solid Indian Sheesham wood showcasing distinctive natural grain patterns. Includes 6 ergonomic cushioned chairs.",
    specs: [
      { label: "Timber", value: "100% Seasoned Solid Sheesham" },
      { label: "Includes", value: "6-Seater Table + 6 Chairs" },
      { label: "Dimensions", value: "72″L × 36″W × 30″H" },
      { label: "Warranty", value: "5-Year Solid Timber Guarantee" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Solid Sheesham Dining Set (₹52,000).",
  },
  {
    id: "hargrove-dining",
    name: "Hargrove Round Dining",
    category: "dining",
    tag: "Round Pedestal · 4 Chairs",
    price: "₹46,000",
    originalPrice: "₹74,000",
    subPrice: "(48″ Table + 4 Chairs)",
    shortDesc: "48″ Round fluted pedestal table with 4 barrel chairs.",
    fullDesc: "Architectural fluted central pedestal base with a 48″ round hardwood tabletop and 4 curved barrel dining chairs in woven fabric.",
    specs: [
      { label: "Base", value: "Solid Fluted Central Pedestal" },
      { label: "Tabletop", value: "48″ Round Hardwood (4-6 Pax)" },
      { label: "Chairs", value: "4 Barrel Curved Dining Chairs" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    mainImg: "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Main.jpg",
    lifestyleImg: "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Lifestyle.jpg",
    whatsappMessage: "Hi Craftiva! I'm interested in the Hargrove Round Dining Suite (₹46,000).",
  },
];

const CATEGORIES = [
  { id: "all", label: "✨ All (14)" },
  { id: "bedroom", label: "🛏️ Bedroom (4)" },
  { id: "living", label: "🛋️ Living & Sofas (5)" },
  { id: "dining", label: "🪵 Dining (2)" },
  { id: "storage", label: "📺 Storage & Units (3)" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [modalViewAngle, setModalViewAngle] = useState<"main" | "lifestyle">("main");

  const openProductModal = (product: ProductItem) => {
    setActiveProduct(product);
    setModalViewAngle("main");
  };

  const closeModal = () => {
    setActiveProduct(null);
  };

  const filteredProducts = selectedCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FAF8F5] text-[#191614] min-h-screen pb-24 font-sans antialiased">
      
      {/* 📱 TOP HEADER STRIP */}
      <div className="bg-white border-b border-[#E8E2D8] px-3.5 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <p className="text-[11px] sm:text-xs font-semibold text-[#191614]">
              Factory-Direct Workshop · <strong>Kirti Nagar, Delhi</strong>
            </p>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-[#8C6F47] uppercase tracking-wider bg-[#F4EFEA] px-2.5 py-0.5 rounded-full">
            Save 40% vs Retail
          </span>
        </div>
      </div>

      {/* 📱 HERO BANNER (CLEAN & COMPACT) */}
      <section className="px-3 sm:px-6 pt-3 sm:pt-6 pb-2 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E8E2D8] p-4 sm:p-6 shadow-xs text-center">
          <span className="inline-block bg-[#EFE7DA] text-[#8C6F47] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            Volume 2026 · Master Catalogue
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#191614] leading-snug">
            Bespoke Living, <em>Handcrafted in Delhi</em>
          </h1>
          <p className="text-xs text-[#706A62] max-w-md mx-auto mt-1.5 leading-relaxed">
            Direct workshop pricing on solid Sheesham beds, tailored sectional sofas, sintered stone case goods, and architectural dining suites.
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-[#E8E2D8] pt-3 mt-3.5 text-center">
            <div>
              <p className="font-serif text-base sm:text-lg font-bold text-[#8C6F47]">100%</p>
              <p className="text-[9px] sm:text-[10px] text-[#706A62] uppercase font-semibold">Solid Wood</p>
            </div>
            <div>
              <p className="font-serif text-base sm:text-lg font-bold text-[#8C6F47]">10–14</p>
              <p className="text-[9px] sm:text-[10px] text-[#706A62] uppercase font-semibold">Days NCR</p>
            </div>
            <div>
              <p className="font-serif text-base sm:text-lg font-bold text-[#8C6F47]">5-Year</p>
              <p className="text-[9px] sm:text-[10px] text-[#706A62] uppercase font-semibold">Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📱 HORIZONTAL CATEGORY CHIPS (STICKY) */}
      <div className="sticky top-[58px] sm:top-[68px] z-30 bg-[#FAF8F5]/98 backdrop-blur-md border-y border-[#E8E2D8] py-2 px-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-[#191614] text-white shadow-xs"
                    : "bg-white text-[#706A62] border border-[#E8E2D8] hover:bg-[#F4EFEA]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📱 2-COLUMN MOBILE PRODUCT GRID (WEST ELM / ZARA HOME APP STYLE) */}
      <main className="px-3 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <span className="text-xs font-semibold text-[#706A62]">
            Showing <strong className="text-[#191614]">{filteredProducts.length}</strong> handcrafted pieces
          </span>
          <span className="text-[10px] text-[#8C6F47] font-semibold">
            👆 Tap piece for full specs
          </span>
        </div>

        {/* 2-Column Mobile, 3-Column Tablet, 4-Column Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => openProductModal(p)}
              className="bg-white rounded-xl border border-[#E8E2D8] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              {/* Product Thumbnail */}
              <div className="aspect-[4/3] bg-[#F4EFEA] relative overflow-hidden">
                <img
                  src={p.mainImg}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-[#191614]/85 text-white text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-xs">
                  {p.tag}
                </span>
                <span className="absolute bottom-2 right-2 bg-white/90 text-[#191614] text-[8.5px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                  2 Angles
                </span>
              </div>

              {/* Card Details */}
              <div className="p-2.5 sm:p-3.5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-[#191614] leading-tight line-clamp-1 group-hover:text-[#8C6F47]">
                    {p.name}
                  </h3>
                  
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-sans text-sm sm:text-base font-bold text-[#191614]">{p.price}</span>
                    <span className="text-[9.5px] text-[#706A62] truncate">{p.subPrice}</span>
                  </div>

                  <p className="text-[10.5px] text-[#706A62] mt-1 line-clamp-1 leading-snug">
                    {p.shortDesc}
                  </p>
                </div>

                {/* View Details Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal(p);
                  }}
                  className="mt-2.5 w-full bg-[#FAF8F5] hover:bg-[#191614] text-[#191614] hover:text-white border border-[#E8E2D8] text-[11px] font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <span>View Details</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🏭 WORKSHOP STATEMENT AT BOTTOM */}
        <div className="mt-8 bg-[#242D21] text-[#FAF7F2] rounded-2xl p-4 sm:p-6 shadow-xs">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#B08D5B]">Factory-Direct Promise</span>
          <h3 className="font-serif text-lg sm:text-2xl font-medium mt-1 mb-1.5">
            Built by Hand in Kirti Nagar, New Delhi
          </h3>
          <p className="text-xs text-white/80 leading-relaxed mb-3">
            Every piece is built to order in our 3rd-floor Timber Block workshop. Bring your floor plan, Pinterest reference, or exact room measurements.
          </p>
          <div className="border-t border-white/15 pt-2.5 text-[11px] text-white/80 space-y-1">
            <p>📍 <strong>Workshop:</strong> 3rd Floor, B-102, Timber Block, Kirti Nagar, New Delhi</p>
            <p>🪵 <strong>Timber:</strong> 100% Solid Seasoned Sheesham, Ash &amp; Teakwood</p>
            <p>⏱️ <strong>Lead Time:</strong> 10–14 Working Days Made-to-Order</p>
          </div>
        </div>
      </main>

      {/* 📱 SLIDE-UP PRODUCT DETAIL MODAL / SHEET */}
      {activeProduct && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={closeModal} 
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-4 sm:p-6 animate-fade-in z-10">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3.5 right-3.5 z-20 grid h-8 w-8 place-items-center rounded-full bg-[#191614]/70 hover:bg-[#191614] text-white"
            >
              <X size={16} />
            </button>

            {/* Modal Image with Angle Switcher */}
            <div className="aspect-[16/11] bg-[#F4EFEA] rounded-xl overflow-hidden relative">
              <img
                src={modalViewAngle === "main" ? activeProduct.mainImg : activeProduct.lifestyleImg}
                alt={activeProduct.name}
                className="w-full h-full object-cover"
              />

              {/* View Switcher Chips */}
              <div className="absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setModalViewAngle("main")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-xs transition-all ${
                    modalViewAngle === "main" 
                      ? "bg-[#191614] text-white" 
                      : "bg-white/90 text-[#191614]"
                  }`}
                >
                  📷 Studio Angle
                </button>
                <button
                  type="button"
                  onClick={() => setModalViewAngle("lifestyle")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold shadow-xs transition-all ${
                    modalViewAngle === "lifestyle" 
                      ? "bg-[#191614] text-white" 
                      : "bg-white/90 text-[#191614]"
                  }`}
                >
                  🛋️ Room Lifestyle
                </button>
              </div>
            </div>

            {/* Modal Product Header */}
            <div className="mt-4">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#EFE7DA] text-[#8C6F47] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {activeProduct.tag}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Save 40% vs Retail Showrooms
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#191614] mt-1.5">
                {activeProduct.name}
              </h2>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-sans text-xl font-bold text-[#191614]">{activeProduct.price}</span>
                <span className="text-xs text-gray-400 line-through">{activeProduct.originalPrice}</span>
                <span className="text-xs text-[#706A62]">{activeProduct.subPrice}</span>
              </div>

              <p className="text-xs text-[#706A62] mt-2.5 leading-relaxed">
                {activeProduct.fullDesc}
              </p>

              {/* Full Specs 2x3 Grid */}
              <div className="mt-3.5 pt-3.5 border-t border-[#E8E2D8]">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#191614] mb-2">
                  Workshop Specifications:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  {activeProduct.specs.map((s, i) => (
                    <div key={i} className="bg-[#FAF8F5] p-2 rounded-lg border border-[#E8E2D8]/60">
                      <span className="text-[#191614] font-bold block">{s.label}</span>
                      <span className="text-[#706A62] block leading-tight mt-0.5">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky WhatsApp Order CTA */}
              <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex gap-2">
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(activeProduct.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-[#0A2010] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp ({activeProduct.price})</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 📱 STICKY FLOATING BOTTOM WHATSAPP BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E2D8] px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[9px] text-[#8C6F47] font-bold uppercase tracking-wider">Kirti Nagar Workshop</span>
          <span className="text-xs font-bold text-[#191614]">Direct Factory Quotes</span>
        </div>
        <a
          href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I have an inquiry regarding custom furniture.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba59] text-[#0A2010] font-bold text-xs px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5"
        >
          <MessageCircle size={14} />
          <span>WhatsApp Us</span>
        </a>
      </div>

    </div>
  );
}