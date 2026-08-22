import { readFileSync } from "node:fs";
import path from "node:path";
import type { CatalogMeta, Category, Product } from "@/lib/types";
import { BESTSELLER_KEYS, CATEGORY_ORDER, FEATURED_KEYS } from "@/lib/site";

const PRODUCTS_PATH = path.join(process.cwd(), "data/catalog/products.json");
const CATEGORIES_PATH = path.join(process.cwd(), "data/catalog/categories.json");
const META_PATH = path.join(process.cwd(), "data/catalog/meta.json");

let productsCache: Product[] | null = null;
let categoriesCache: Category[] | null = null;
let metaCache: CatalogMeta | null = null;

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  sofas: "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg",
  beds: "/Catalogue_Images_For_Drive/01_Riviera_Bed_Main.jpg",
  dining: "/Catalogue_Images_For_Drive/13_Solid_Sheesham_Dining_Set_Main.jpg",
  tables: "/Catalogue_Images_For_Drive/03_Kennedy_Bedside_Main.jpg",
  chairs: "/Catalogue_Images_For_Drive/09_Carlo_Leather_Chair_Main.jpg",
  storage: "/Catalogue_Images_For_Drive/04_Archie_Dresser_Main.jpg",
  wardrobes: "/Catalogue_Images_For_Drive/11_Douglas_Tatami_Wardrobe_Main.jpg",
  ottomans: "/Catalogue_Images_For_Drive/08_Kelly_Ottoman_Main.jpg",
  office: "/Catalogue_Images_For_Drive/10_Xandra_Entertainment_Main.jpg",
  kids: "/Catalogue_Images_For_Drive/06_Ava_Sofa_Main.jpg",
  outdoor: "/Catalogue_Images_For_Drive/14_Hargrove_Round_Dining_Main.jpg",
  mattresses: "/Catalogue_Images_For_Drive/02_Madrid_Bed_Main.jpg",
};

function loadProducts(): Product[] {
  if (!productsCache) {
    productsCache = JSON.parse(readFileSync(PRODUCTS_PATH, "utf8")) as Product[];
    const featuredSet = new Set(FEATURED_KEYS);
    const bestsellerSet = new Set(BESTSELLER_KEYS);
    productsCache = productsCache.map((p) => ({
      ...p,
      featured: featuredSet.has(p.familyKey),
      bestseller: bestsellerSet.has(p.familyKey),
    }));
  }
  return productsCache;
}

function loadCategories(): Category[] {
  if (!categoriesCache) {
    categoriesCache = JSON.parse(readFileSync(CATEGORIES_PATH, "utf8")) as Category[];
    const bySlug = new Map(categoriesCache.map((c) => [c.slug, c]));
    const ordered = CATEGORY_ORDER.map((s) => bySlug.get(s)).filter(Boolean) as Category[];
    const rest = categoriesCache.filter((c) => !CATEGORY_ORDER.includes(c.slug));
    categoriesCache = [...ordered, ...rest];
  }
  return categoriesCache;
}

function loadMeta(): CatalogMeta {
  if (!metaCache) {
    metaCache = JSON.parse(readFileSync(META_PATH, "utf8")) as CatalogMeta;
  }
  return metaCache;
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return loadProducts().filter((p) => p.category.slug === categorySlug);
}

export function getCategories(): Category[] {
  return loadCategories();
}

export function getFeatured(): Product[] {
  const all = loadProducts();
  const byKey = new Map(all.map((p) => [p.familyKey, p]));
  const list = FEATURED_KEYS.map((k) => byKey.get(k)).filter(Boolean) as Product[];
  return list.length ? list : all.slice(0, 8);
}

export function getBestsellers(): Product[] {
  const all = loadProducts();
  const byKey = new Map(all.map((p) => [p.familyKey, p]));
  const list = BESTSELLER_KEYS.map((k) => byKey.get(k)).filter(Boolean) as Product[];
  return list.length ? list : all.slice(8, 16);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);
  return loadProducts()
    .filter((p) => !p.needsReview)
    .map((p) => {
      const haystack = [p.name, p.type, p.category.name, p.subcategory, p.shortDescription, ...p.tags]
        .join(" ")
        .toLowerCase();
      const hits = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
      return { p, hits };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || b.p.variantCount - a.p.variantCount)
    .map((x) => x.p);
}

export function getCatalogStats(): CatalogMeta {
  return loadMeta();
}

/** Representative hero image for a category (with curated fallback). */
export function getCategoryImage(slug: string): string {
  if (CATEGORY_IMAGE_MAP[slug]) {
    return CATEGORY_IMAGE_MAP[slug];
  }
  const products = getProductsByCategory(slug);
  for (const p of products) {
    const img = p.variants[0]?.hero;
    if (img) return img;
  }
  return "/Catalogue_Images_For_Drive/05_Antonella_Sofa_Main.jpg";
}

/** All variants flattened for quick view / admin-style browsing. */
export function getVariantOptions(product: Product): {
  colours: string[];
  configurations: string[];
} {
  const colours = [...new Set(product.variants.map((v) => v.colour).filter(Boolean))];
  const configurations = [...new Set(product.variants.map((v) => v.configuration).filter(Boolean))];
  return { colours, configurations };
}

export function getImageCount(): number {
  return loadMeta().images;
}

export function getVariantCount(): number {
  return loadMeta().variants;
}

export function getProductCount(): number {
  return loadMeta().products;
}

export function getRecentProducts(limit = 12): Product[] {
  return loadProducts()
    .filter((p) => !p.needsReview)
    .slice(-limit)
    .reverse();
}

export function getPopularByType(type: string, exclude?: Product, limit = 4): Product[] {
  return loadProducts()
    .filter((p) => p.type === type && p.familyKey !== exclude?.familyKey && !p.needsReview)
    .sort((a, b) => b.variantCount - a.variantCount)
    .slice(0, limit);
}