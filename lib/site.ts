import type { Category, Product } from "@/lib/types";

export const SITE = {
  name: "Craftiva Furniture",
  shortName: "Craftiva",
  tagline: "Custom furniture, crafted to order",
  description:
    "Craftiva Furniture is a factory-direct custom furniture workshop in Kirti Nagar, Delhi. Solid-wood sofas, beds, wardrobes, dining and storage — built to your size, wood and finish.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://craftivafurniture.in",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919711487229",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "+91 97114 87229",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 97114 87229",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@craftivafurniture.com",
  address: process.env.NEXT_PUBLIC_ADDRESS || "3rd Floor, B-102, Timber Block, Block C, WHS, Kirti Nagar, New Delhi 110015",
  postalAddress: {
    streetAddress: "3rd Floor, B-102, Timber Block, Block C, WHS, Kirti Nagar",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110015",
    addressCountry: "IN",
  },
  serviceArea: process.env.NEXT_PUBLIC_SERVICE_AREA || "Delhi-NCR",
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://maps.google.com/?q=Craftiva+Furniture+Kirti+Nagar+New+Delhi",
  hours: "Mon–Sat · 10:00 AM – 7:30 PM",
  leadTime: "10–15 days",
} as const;

export const WOOD_OPTIONS = [
  { id: "sheesham", name: "Solid Sheesham (Indian Rosewood)", desc: "Dense, highly durable with rich natural grain patterns. Ideal for beds and dining tables." },
  { id: "teak", name: "CP / Burma Teak Wood", desc: "Gold standard in luxury wood. Superior moisture resistance, natural oils, lifetime durability." },
  { id: "walnut", name: "American Walnut Finish", desc: "Warm dark-toned modern luxury finish with smooth, elegant grain." },
  { id: "mango", name: "Solid Mango Wood", desc: "Eco-friendly, sustainable hardwood with unique organic patterns and warm tones." },
  { id: "plywood", name: "Boiling Water Resistant (BWR) Plywood + Veneer", desc: "Anti-warp structural ply for built-in wardrobes, modular cabinetry and sleek consoles." },
] as const;

/** Models hand-picked for the homepage spotlight (by familyKey). */
export const FEATURED_KEYS = [
  "capri-sofa",
  "mathias-sofa",
  "regina-bed",
  "marbella-dining-table",
  "aspen-dining-table",
  "san-pierre-bed",
  "soluna-sofa",
  "estelle-bed",
  "quinn-chair",
  "trento-plinth",
  "moulin-stool",
  "terra-linea-dining-table",
];

export const BESTSELLER_KEYS = [
  "capri-sofa",
  "regina-bed",
  "quinn-chair",
  "moulin-stool",
  "marbella-dining-table",
  "estelle-bed",
];

export const CATEGORY_ORDER = [
  "sofas",
  "beds",
  "dining",
  "tables",
  "chairs",
  "storage",
  "wardrobes",
  "office",
  "ottomans",
  "kids",
  "outdoor",
  "mattresses",
];