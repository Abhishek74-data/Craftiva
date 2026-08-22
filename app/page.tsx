"use client";

import { useState } from "react";
import { MessageCircle, X, ChevronLeft, ChevronRight, Ruler, Palette, Hammer, ShieldCheck, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { colourToCss } from "@/components/ProductCard";

const DEFAULT_FALLBACK_IMG = "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg";

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
  sizes: { label: string; sub: string; price: string }[];
  colours: string[];
  images: string[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: "riviera-bed",
    name: "The Riviera Bed",
    category: "bedroom",
    tag: "Ash Veneer",
    price: "₹56,000",
    originalPrice: "₹92,000",
    subPrice: "Queen · King ₹62k",
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
    sizes: [
      { label: "Queen Size", sub: "60″ × 78″", price: "₹56,000" },
      { label: "King Size", sub: "72″ × 78″", price: "₹62,000" },
      { label: "Custom Sizing", sub: "Bespoke Fit", price: "₹60,000" },
    ],
    colours: ["Isabelline White", "Stone Cream", "Dark Walnut", "Natural Ash"],
    images: [
      "/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg",
      "/Catalogue_Images_For_Drive/01_Riviera_Bed_2.jpg",
      "/Catalogue_Images_For_Drive/01_Riviera_Bed_3.jpg",
      "/Catalogue_Images_For_Drive/01_Riviera_Bed_4.jpg",
      "/Catalogue_Images_For_Drive/01_Riviera_Bed_Lifestyle.jpg",
    ],
  },
  {
    id: "madrid-bed",
    name: "The Madrid Bed",
    category: "bedroom",
    tag: "Channel Velvet",
    price: "₹54,000",
    originalPrice: "₹88,000",
    subPrice: "Queen · King ₹60k",
    shortDesc: "Vertical channel-tufted velvet with gas-lift storage.",
    fullDesc: "Vertical channel-tufted high-density velvet headboard with solid internal hardwood framing. Features cushioned wrap-around side rails and German gas-lift hydraulic under-bed storage.",
    specs: [
      { label: "Fabric", value: "High-Pile Stain-Resistant Velvet" },
      { label: "Frame", value: "Kiln-Dried Hardwood Structure" },
      { label: "Storage", value: "Gas-Lift Hydraulic Mechanism" },
      { label: "Dimensions", value: "72″W × 82″L × 50″H" },
      { label: "Warranty", value: "5-Year Frame Guarantee" },
      { label: "Lead Time", value: "10–14 Days Delhi-NCR" },
    ],
    sizes: [
      { label: "Queen Size", sub: "60″ × 78″", price: "₹54,000" },
      { label: "King Size", sub: "72″ × 78″", price: "₹60,000" },
      { label: "Custom Sizing", sub: "Bespoke Fit", price: "₹58,000" },
    ],
    colours: ["Cream Velvet", "Olive Velvet", "Taupe Velvet", "Charcoal Velvet"],
    images: [
      "/Catalogue_Images_For_Drive/02_Madrid_Bed_Main.jpg",
      "/Catalogue_Images_For_Drive/02_Madrid_Bed_2.jpg",
      "/Catalogue_Images_For_Drive/02_Madrid_Bed_3.jpg",
      "/Catalogue_Images_For_Drive/02_Madrid_Bed_Lifestyle.jpg",
    ],
  },
  {
    id: "kennedy-bedside",
    name: "Kennedy Bedside",
    category: "bedroom",
    tag: "Sintered Stone",
    price: "₹16,000",
    originalPrice: "₹26,000",
    subPrice: "Single · Pair ₹30k",
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
    sizes: [
      { label: "Single Unit", sub: "1 Bedside Table", price: "₹16,000" },
      { label: "Matching Pair", sub: "Set of 2 Tables", price: "₹30,000" },
    ],
    colours: ["White Sintered Stone", "Black Marble Top", "Natural Walnut Body"],
    images: [
      "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Main.jpg",
      "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_2.jpg",
      "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_3.jpg",
      "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Lifestyle.jpg",
    ],
  },
  {
    id: "archie-dresser",
    name: "Archie Dresser",
    category: "bedroom",
    tag: "6-Drawer",
    price: "₹42,000",
    originalPrice: "₹68,000",
    subPrice: "60″ Wide Chest",
    shortDesc: "Spacious 6-drawer chest with sintered stone top.",
    fullDesc: "Spacious 6-drawer dresser with scratch-resistant sintered stone surface and heavy-duty soft-close drawer runners in a modern minimalist black timber body.",
    specs: [
      { label: "Top", value: "Calacatta Sintered Stone" },
      { label: "Structure", value: "Matt Black Seasoned Timber" },
      { label: "Drawers", value: "6 Deep Soft-Close Drawers" },
      { label: "Dimensions", value: "60″W × 18″D × 32″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    sizes: [
      { label: "60″ Standard", sub: "6 Drawers", price: "₹42,000" },
      { label: "72″ Grand", sub: "8 Drawers", price: "₹52,000" },
    ],
    colours: ["Calacatta White / Black", "Natural Oak Finish", "Dark Walnut Finish"],
    images: [
      "/Catalogue_Images_For_Drive/04_Archie_Dresser_Main.jpg",
      "/Catalogue_Images_For_Drive/04_Archie_Dresser_2.jpg",
      "/Catalogue_Images_For_Drive/04_Archie_Dresser_3.jpg",
      "/Catalogue_Images_For_Drive/04_Archie_Dresser_Lifestyle.jpg",
    ],
  },
  {
    id: "antonella-sofa",
    name: "Antonella Sofa",
    category: "living",
    tag: "Bestseller",
    price: "₹46,000",
    originalPrice: "₹76,000",
    subPrice: "3-Seater · L-Shape ₹58k",
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
    sizes: [
      { label: "3-Seater", sub: "86″ Length", price: "₹46,000" },
      { label: "4-Seater", sub: "102″ Length", price: "₹54,000" },
      { label: "L-Shape Sectional", sub: "108″ with Chaise", price: "₹58,000" },
    ],
    colours: ["Stone Cream", "Isabelline White", "Taupe Grey", "Olive Green", "Charcoal"],
    images: [
      "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg",
      "/Catalogue_Images_For_Drive/05_Antonella_Sofa_2.jpg",
      "/Catalogue_Images_For_Drive/05_Antonella_Sofa_3.jpg",
      "/Catalogue_Images_For_Drive/05_Antonella_Sofa_4.jpg",
      "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Lifestyle.jpg",
    ],
  },
  {
    id: "ava-sofa",
    name: "The Ava Sofa",
    category: "living",
    tag: "Plush Chenille",
    price: "₹44,000",
    originalPrice: "₹72,000",
    subPrice: "3-Seater Cloud",
    shortDesc: "Cloud-style lounging sofa in cream chenille fabric.",
    fullDesc: "Cloud-style silhouette with ultra-soft feather-blend cushions and cream chenille upholstery for luxurious lounging.",
    specs: [
      { label: "Seating Feel", value: "Ultra Plush Cloud Comfort" },
      { label: "Fabric", value: "Soft Cream Chenille" },
      { label: "Frame", value: "Reinforced Solid Hardwood" },
      { label: "Dimensions", value: "84″L × 36″D × 30″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    sizes: [
      { label: "3-Seater Cloud", sub: "84″ Length", price: "₹44,000" },
      { label: "4-Seater Cloud", sub: "100″ Length", price: "₹52,000" },
      { label: "Sectional Suite", sub: "112″ L-Shape", price: "₹62,000" },
    ],
    colours: ["Cream Chenille", "Beige Weave", "Silver Grey", "Powder Blue"],
    images: [
      "/Catalogue_Images_For_Drive/06_Ava_Sofa_Main.jpg",
      "/Catalogue_Images_For_Drive/06_Ava_Sofa_2.jpg",
      "/Catalogue_Images_For_Drive/06_Ava_Sofa_3.jpg",
      "/Catalogue_Images_For_Drive/06_Ava_Sofa_Lifestyle.jpg",
    ],
  },
  {
    id: "elianna-sofa",
    name: "Elianna Sofa",
    category: "living",
    tag: "Track-Arm",
    price: "₹48,000",
    originalPrice: "₹78,000",
    subPrice: "3-Seater Low",
    shortDesc: "Minimalist low-profile sofa with broad track arms.",
    fullDesc: "Minimalist low-profile sofa with broad track arms, high-density base core, and stain-resistant fabric for contemporary living rooms.",
    specs: [
      { label: "Profile", value: "Modern Low-Slung Silhouette" },
      { label: "Foam", value: "Dual Density 40+32 HR Core" },
      { label: "Dimensions", value: "88″L × 38″D × 31″H" },
      { label: "Warranty", value: "5-Year Frame Guarantee" },
    ],
    sizes: [
      { label: "3-Seater Low", sub: "88″ Length", price: "₹48,000" },
      { label: "4-Seater Low", sub: "104″ Length", price: "₹56,000" },
      { label: "Corner Lounger", sub: "110″ Sectional", price: "₹64,000" },
    ],
    colours: ["Stone Cream", "Oatmeal Beige", "Charcoal Grey", "Olive Green"],
    images: [
      "/Catalogue_Images_For_Drive/07_Elianna_Sofa_Main.jpg",
      "/Catalogue_Images_For_Drive/07_Elianna_Sofa_2.jpg",
      "/Catalogue_Images_For_Drive/07_Elianna_Sofa_3.jpg",
      "/Catalogue_Images_For_Drive/07_Elianna_Sofa_4.jpg",
      "/Catalogue_Images_For_Drive/07_Elianna_Sofa_Lifestyle.jpg",
    ],
  },
  {
    id: "kelly-ottoman",
    name: "Kelly Ottoman",
    category: "living",
    tag: "Curved Accent",
    price: "₹12,000",
    originalPrice: "₹20,000",
    subPrice: "Single Accent Pouf",
    shortDesc: "Sculptural crescent ottoman in rich velvet.",
    fullDesc: "Organic crescent form with dense velvet padding. Perfect as an accent pouf, coffee table stool, or bedroom end bench.",
    specs: [
      { label: "Shape", value: "Curved Crescent Form" },
      { label: "Fabric", value: "High-Pile Velvet" },
      { label: "Dimensions", value: "24″W × 20″D × 17″H" },
      { label: "Lead Time", value: "5–7 Days" },
    ],
    sizes: [
      { label: "Single Pouf", sub: "24″ × 20″", price: "₹12,000" },
      { label: "Pair of 2", sub: "Matching Set", price: "₹22,000" },
    ],
    colours: ["Beige Velvet", "Olive Green", "Burnt Orange", "Charcoal"],
    images: [
      "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Main.jpg",
      "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_2.jpg",
      "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_3.jpg",
      "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Lifestyle.jpg",
    ],
  },
  {
    id: "carlo-chair",
    name: "Carlo Chair",
    category: "living",
    tag: "Leather",
    price: "₹24,000",
    originalPrice: "₹40,000",
    subPrice: "Single · Pair ₹45k",
    shortDesc: "Cognac leather armchair with solid teakwood arms.",
    fullDesc: "Cognac top-grain leather armchair with solid teakwood angular armrests and exposed brass joinery.",
    specs: [
      { label: "Upholstery", value: "Top-Grain Cognac Leather" },
      { label: "Frame & Arms", value: "Solid Seasoned Teakwood" },
      { label: "Hardware", value: "Exposed Satin Brass Joinery" },
      { label: "Dimensions", value: "28″W × 32″D × 31″H" },
    ],
    sizes: [
      { label: "Single Chair", sub: "1 Armchair", price: "₹24,000" },
      { label: "Matching Pair", sub: "Set of 2 Chairs", price: "₹45,000" },
    ],
    colours: ["Cognac Leather", "Charcoal Black Leather", "Olive Leather", "Tan Brown"],
    images: [
      "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Main.jpg",
      "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_2.jpg",
      "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_3.jpg",
      "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Lifestyle.jpg",
    ],
  },
  {
    id: "xandra-unit",
    name: "Xandra TV Unit",
    category: "storage",
    tag: "Dark Walnut",
    price: "₹32,000",
    originalPrice: "₹52,000",
    subPrice: "78″ TV Console",
    shortDesc: "Dark walnut media console with acoustic mesh flaps.",
    fullDesc: "Rich dark walnut veneer TV credenza with acoustic drop-down mesh flaps, internal cable routing, and brass foot caps.",
    specs: [
      { label: "Wood Finish", value: "Dark Walnut Natural Veneer" },
      { label: "Flaps", value: "Drop-Down Acoustic Mesh" },
      { label: "Dimensions", value: "78″L × 18″D × 20″H" },
      { label: "TV Compatibility", value: "Up to 85″ Screens" },
    ],
    sizes: [
      { label: "60″ Standard", sub: "Up to 65″ TV", price: "₹28,000" },
      { label: "78″ Grand", sub: "Up to 85″ TV", price: "₹32,000" },
      { label: "90″ Executive", sub: "Up to 100″ TV", price: "₹38,000" },
    ],
    colours: ["Dark Walnut", "Natural Teak Finish", "Smoked Oak"],
    images: [
      "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Main.jpg",
      "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_2.jpg",
      "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_3.jpg",
      "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Lifestyle.jpg",
    ],
  },
  {
    id: "douglas-wardrobe",
    name: "Douglas Wardrobe",
    category: "storage",
    tag: "Teak & Cane",
    price: "₹48,000",
    originalPrice: "₹78,000",
    subPrice: "38″ Wide Armoire",
    shortDesc: "Solid teak wardrobe with natural rattan cane doors.",
    fullDesc: "Solid teakwood frame fitted with hand-woven natural rattan cane panels, internal hanging rail, adjustable shelves, and antique brass latches.",
    specs: [
      { label: "Frame Timber", value: "100% Solid Teakwood" },
      { label: "Panels", value: "Hand-Woven Natural Rattan" },
      { label: "Interior", value: "Hanging Rod + 3 Shelves" },
      { label: "Dimensions", value: "38″W × 22″D × 72″H" },
    ],
    sizes: [
      { label: "2-Door Armoire", sub: "38″W × 72″H", price: "₹48,000" },
      { label: "3-Door Grand", sub: "56″W × 78″H", price: "₹68,000" },
    ],
    colours: ["Natural Teak & Cane", "Dark Walnut & Cane", "Black Satin & Cane"],
    images: [
      "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Main.jpg",
      "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_2.jpg",
      "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_3.jpg",
      "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Lifestyle.jpg",
    ],
  },
  {
    id: "berkely-console",
    name: "Berkely Console",
    category: "storage",
    tag: "Fluted Timber",
    price: "₹22,000",
    originalPrice: "₹36,000",
    subPrice: "52″ Oval Top",
    shortDesc: "Oval entryway console with fluted pillar base.",
    fullDesc: "Sculptural entryway console with dual fluted tambour timber pillar bases and a rounded oval tabletop in natural satin lacquer.",
    specs: [
      { label: "Base Structure", value: "Dual Fluted Tambour Pillars" },
      { label: "Top", value: "Rounded Oval Hardwood" },
      { label: "Dimensions", value: "52″L × 16″D × 32″H" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    sizes: [
      { label: "52″ Entryway", sub: "Standard Console", price: "₹22,000" },
      { label: "64″ Living Credenza", sub: "Long Console", price: "₹28,000" },
    ],
    colours: ["Natural Hardwood", "Dark Walnut Finish", "Satin Black"],
    images: [
      "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_Main.jpg",
      "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_2.jpg",
      "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_3.jpg",
      "/Catalogue_Images_For_Drive/12_Berkely_Fluted_Console_Lifestyle.jpg",
    ],
  },
  {
    id: "sheesham-dining",
    name: "Sheesham Dining",
    category: "dining",
    tag: "Solid Sheesham",
    price: "₹52,000",
    originalPrice: "₹85,000",
    subPrice: "Table + 6 Chairs",
    shortDesc: "Solid Indian Sheesham dining table with 6 chairs.",
    fullDesc: "Handcrafted from seasoned solid Indian Sheesham wood showcasing distinctive natural grain patterns. Includes 6 ergonomic cushioned chairs.",
    specs: [
      { label: "Timber", value: "100% Seasoned Solid Sheesham" },
      { label: "Includes", value: "6-Seater Table + 6 Chairs" },
      { label: "Dimensions", value: "72″L × 36″W × 30″H" },
      { label: "Warranty", value: "5-Year Solid Timber Guarantee" },
    ],
    sizes: [
      { label: "6-Seater Suite", sub: "72″ Table + 6 Chairs", price: "₹52,000" },
      { label: "8-Seater Grand", sub: "96″ Table + 8 Chairs", price: "₹68,000" },
      { label: "4-Seater Compact", sub: "48″ Table + 4 Chairs", price: "₹42,000" },
    ],
    colours: ["Natural Sheesham Grain", "Honey Teak Finish", "Dark Walnut Finish"],
    images: [
      "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Main.jpg",
      "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_2.jpg",
      "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_3.jpg",
      "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Lifestyle.jpg",
    ],
  },
  {
    id: "hargrove-dining",
    name: "Hargrove Dining",
    category: "dining",
    tag: "Pedestal 48″",
    price: "₹46,000",
    originalPrice: "₹74,000",
    subPrice: "48″ Table + 4 Chairs",
    shortDesc: "48″ Round fluted pedestal table with 4 barrel chairs.",
    fullDesc: "Architectural fluted central pedestal base with a 48″ round hardwood tabletop and 4 curved barrel dining chairs in woven fabric.",
    specs: [
      { label: "Base", value: "Solid Fluted Central Pedestal" },
      { label: "Tabletop", value: "48″ Round Hardwood (4-6 Pax)" },
      { label: "Chairs", value: "4 Barrel Curved Dining Chairs" },
      { label: "Lead Time", value: "10–14 Days" },
    ],
    sizes: [
      { label: "48″ Round + 4 Chairs", sub: "4-Person Suite", price: "₹46,000" },
      { label: "60″ Round + 6 Chairs", sub: "6-Person Suite", price: "₹58,000" },
    ],
    colours: ["Natural Ash Wood", "Walnut Veneer", "Smoked Oak"],
    images: [
      "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Main.jpg",
      "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_2.jpg",
      "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_3.jpg",
      "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Lifestyle.jpg",
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "✨ All (14)" },
  { id: "bedroom", label: "🛏️ Beds (4)" },
  { id: "living", label: "🛋️ Sofas (5)" },
  { id: "dining", label: "🪵 Dining (2)" },
  { id: "storage", label: "📺 Storage (3)" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [modalSelectedSize, setModalSelectedSize] = useState<number>(0);
  const [modalSelectedColour, setModalSelectedColour] = useState<string>("");

  const openProductModal = (product: ProductItem) => {
    setActiveProduct(product);
    setModalImageIndex(0);
    setModalSelectedSize(0);
    setModalSelectedColour(product.colours[0] || "Natural");
  };

  const closeModal = () => {
    setActiveProduct(null);
  };

  const nextModalImage = () => {
    if (!activeProduct) return;
    setModalImageIndex((prev) => (prev + 1) % activeProduct.images.length);
  };

  const prevModalImage = () => {
    if (!activeProduct) return;
    setModalImageIndex((prev) => (prev - 1 + activeProduct.images.length) % activeProduct.images.length);
  };

  const filteredProducts = selectedCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FAF8F5] text-[#191614] min-h-screen pb-24 font-sans antialiased">
      
      {/* 📱 TOP HEADER STRIP */}
      <div className="bg-white border-b border-[#E8E2D8] px-3 py-2 sm:py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <p className="text-[10px] sm:text-xs font-semibold text-[#191614]">
              Workshop Direct · <strong>Kirti Nagar, Delhi</strong>
            </p>
          </div>
          <span className="text-[9px] sm:text-xs font-bold text-[#8C6F47] uppercase tracking-wider bg-[#F4EFEA] px-2 py-0.5 rounded-full">
            Save 40%
          </span>
        </div>
      </div>

      {/* 📱 HERO BANNER */}
      <section className="px-2.5 sm:px-6 pt-2.5 sm:pt-6 pb-1 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D8] p-3 sm:p-6 shadow-xs text-center">
          <span className="inline-block bg-[#EFE7DA] text-[#8C6F47] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-1.5">
            Volume 2026 · Master Catalogue
          </span>
          <h1 className="font-serif text-xl sm:text-3xl font-medium text-[#191614] leading-tight">
            Bespoke Living, <em>Handcrafted in Delhi</em>
          </h1>
          <p className="text-[11px] sm:text-xs text-[#706A62] max-w-md mx-auto mt-1 leading-snug">
            Direct workshop pricing on solid Sheesham beds, tailored sectional sofas, and dining suites.
          </p>

          <div className="grid grid-cols-3 gap-1.5 border-t border-[#E8E2D8] pt-2.5 mt-2.5 text-center">
            <div>
              <p className="font-serif text-sm sm:text-lg font-bold text-[#8C6F47]">100%</p>
              <p className="text-[8px] sm:text-[10px] text-[#706A62] uppercase font-semibold">Solid Wood</p>
            </div>
            <div>
              <p className="font-serif text-sm sm:text-lg font-bold text-[#8C6F47]">10–14</p>
              <p className="text-[8px] sm:text-[10px] text-[#706A62] uppercase font-semibold">Days NCR</p>
            </div>
            <div>
              <p className="font-serif text-sm sm:text-lg font-bold text-[#8C6F47]">5-Year</p>
              <p className="text-[8px] sm:text-[10px] text-[#706A62] uppercase font-semibold">Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🏷️ NON-HIDING CATEGORY PILLS */}
      <div className="sticky top-[52px] sm:top-[68px] z-30 bg-[#FAF8F5]/98 backdrop-blur-md border-y border-[#E8E2D8] py-2 px-2.5 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs font-semibold transition-all shrink-0 ${
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

      {/* 📱 3-COLUMN MOBILE PRODUCT GRID */}
      <main className="px-2 sm:px-6 py-3 sm:py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <span className="text-[11px] sm:text-xs font-semibold text-[#706A62]">
            Showing <strong className="text-[#191614]">{filteredProducts.length}</strong> pieces
          </span>
          <span className="text-[9.5px] sm:text-[10px] text-[#8C6F47] font-semibold">
            👆 Tap piece to view
          </span>
        </div>

        {/* 3-Column on Mobile, 4-Column on Tablet, 5-Column on Desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => openProductModal(p)}
              className="bg-white rounded-lg sm:rounded-xl border border-[#E8E2D8] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              {/* Product Thumbnail with bulletproof onError */}
              <div className="aspect-[1/1] sm:aspect-[4/3] bg-[#F4EFEA] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = DEFAULT_FALLBACK_IMG;
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-1 left-1 bg-[#191614]/85 text-white text-[7px] sm:text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  {p.tag}
                </span>
                <span className="absolute bottom-1 right-1 bg-white/90 text-[#191614] text-[7px] sm:text-[8px] font-bold px-1 py-0.5 rounded shadow-xs">
                  {p.images.length} Photos
                </span>
              </div>

              {/* Card Details */}
              <div className="p-1.5 sm:p-2.5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-[11px] sm:text-sm font-semibold text-[#191614] leading-tight line-clamp-1 group-hover:text-[#8C6F47]">
                    {p.name}
                  </h3>
                  
                  <div className="mt-0.5">
                    <span className="font-sans text-[11.5px] sm:text-sm font-bold text-[#191614] block leading-tight">{p.price}</span>
                    <span className="text-[8px] sm:text-[9.5px] text-[#706A62] truncate block">{p.subPrice}</span>
                  </div>
                </div>

                <div className="mt-1.5 w-full bg-[#FAF8F5] group-hover:bg-[#191614] text-[#191614] group-hover:text-white border border-[#E8E2D8] text-[9px] sm:text-[10px] font-bold py-1 rounded text-center transition-colors">
                  Details &amp; Sizes →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🏭 WORKSHOP PROMISE */}
        <div className="mt-6 bg-[#242D21] text-[#FAF7F2] rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-xs">
          <span className="text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#B08D5B]">Factory-Direct Promise</span>
          <h3 className="font-serif text-base sm:text-2xl font-medium mt-0.5 mb-1">
            Built by Hand in Kirti Nagar, New Delhi
          </h3>
          <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mb-2.5">
            Every piece is built to order in our 3rd-floor Timber Block workshop. Bring your floor plan, Pinterest reference, or exact room measurements.
          </p>
          <div className="border-t border-white/15 pt-2 text-[10px] sm:text-[11px] text-white/80 space-y-0.5">
            <p>📍 <strong>Workshop:</strong> 3rd Floor, B-102, Timber Block, Kirti Nagar, New Delhi</p>
            <p>🪵 <strong>Timber:</strong> 100% Solid Seasoned Sheesham, Ash &amp; Teakwood</p>
            <p>⏱️ <strong>Lead Time:</strong> 10–14 Working Days Made-to-Order</p>
          </div>
        </div>
      </main>

      {/* 📱 SLIDE-UP PRODUCT DETAIL MODAL (WITH MULTI-PHOTO GALLERY, SIZE & COLOUR SELECTORS) */}
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

            {/* Main Big Photo in Modal */}
            <div className="aspect-[16/11] bg-[#F4EFEA] rounded-xl overflow-hidden relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProduct.images[modalImageIndex] || activeProduct.images[0] || DEFAULT_FALLBACK_IMG}
                alt={`${activeProduct.name} - View ${modalImageIndex + 1}`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = DEFAULT_FALLBACK_IMG;
                }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Prev / Next Buttons */}
              {activeProduct.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevModalImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/50 hover:bg-black/75 text-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextModalImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-black/50 hover:bg-black/75 text-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Photo Index Counter */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                {modalImageIndex + 1} / {activeProduct.images.length}
              </div>
            </div>

            {/* 📸 Horizontal Thumbnail Strip (Click to Switch Photo) */}
            {activeProduct.images.length > 1 && (
              <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1 no-scrollbar">
                {activeProduct.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setModalImageIndex(idx)}
                    className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      modalImageIndex === idx 
                        ? "border-[#191614] ring-2 ring-[#8C6F47]/40 scale-105" 
                        : "border-[#E8E2D8] opacity-70 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imgUrl} 
                      alt="" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = DEFAULT_FALLBACK_IMG;
                      }}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Product Header */}
            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#EFE7DA] text-[#8C6F47] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {activeProduct.tag}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Save 40% vs Showrooms
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#191614] mt-1.5">
                {activeProduct.name}
              </h2>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-sans text-xl font-bold text-[#191614]">
                  {activeProduct.sizes[modalSelectedSize]?.price || activeProduct.price}
                </span>
                <span className="text-xs text-gray-400 line-through">{activeProduct.originalPrice}</span>
                <span className="text-xs text-[#706A62]">
                  ({activeProduct.sizes[modalSelectedSize]?.label || activeProduct.subPrice})
                </span>
              </div>

              {/* 📏 Size / Configuration Selector in Modal */}
              <div className="mt-3.5 border-t border-[#E8E2D8] pt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#191614] block mb-1.5 flex items-center gap-1">
                  <Ruler size={13} className="text-[#8C6F47]" /> Available Sizes &amp; Dimensions:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {activeProduct.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setModalSelectedSize(idx)}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        modalSelectedSize === idx
                          ? "border-[#191614] bg-[#FAF8F5] ring-1 ring-[#8C6F47]"
                          : "border-[#E8E2D8] bg-white hover:bg-[#FAF8F5]"
                      }`}
                    >
                      <span className="text-xs font-bold text-[#191614] block">{s.label}</span>
                      <span className="text-[9.5px] text-[#706A62] block leading-tight">{s.sub}</span>
                      <span className="text-[10px] font-bold text-[#8C6F47] mt-0.5 block">{s.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 🎨 Colour / Finish Swatches in Modal */}
              <div className="mt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#191614] block mb-1.5 flex items-center gap-1">
                  <Palette size={13} className="text-[#8C6F47]" /> Selected Finish: <strong>{modalSelectedColour}</strong>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProduct.colours.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setModalSelectedColour(c)}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all ${
                        modalSelectedColour === c
                          ? "border-[#191614] bg-[#191614] text-white"
                          : "border-[#E8E2D8] bg-white text-[#706A62]"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: colourToCss(c) }}
                      />
                      <span>{c}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Specs 2x3 Grid */}
              <div className="mt-3.5 pt-3 border-t border-[#E8E2D8]">
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
                  href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
                    `Hi Craftiva! I want a factory quote for ${activeProduct.name} in ${
                      activeProduct.sizes[modalSelectedSize]?.label || "Standard Size"
                    } and ${modalSelectedColour} finish (${
                      activeProduct.sizes[modalSelectedSize]?.price || activeProduct.price
                    }). Please share fabric/wood samples.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-[#0A2010] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp ({activeProduct.sizes[modalSelectedSize]?.price || activeProduct.price})</span>
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