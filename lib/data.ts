import { readFileSync } from "node:fs";
import path from "node:path";
import type { Category, Product } from "@/lib/types";
import { BESTSELLER_KEYS, CATEGORY_ORDER, FEATURED_KEYS } from "@/lib/site";
import { premiumCategoryImage } from "@/lib/premium";

const PRODUCTS_PATH = path.join(process.cwd(), "data/catalog/products.json");
const CATEGORIES_PATH = path.join(process.cwd(), "data/catalog/categories.json");

let productsCache: Product[] | null = null;
let categoriesCache: Category[] | null = null;

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
    const raw = JSON.parse(readFileSync(CATEGORIES_PATH, "utf8")) as Category[];
    const bySlug = new Map(raw.map((c) => [c.slug, c]));
    const ordered = CATEGORY_ORDER.map((s) => bySlug.get(s)).filter(Boolean) as Category[];
    const rest = raw.filter((c) => !CATEGORY_ORDER.includes(c.slug));

    // Single source of truth: every count shown on the site is recomputed from
    // products.json so homepage, header, rail and category pages can never disagree.
    const perCategory = new Map<string, { productCount: number; imageCount: number }>();
    for (const p of loadProducts()) {
      if (p.needsReview) continue;
      const cur = perCategory.get(p.category.slug) || { productCount: 0, imageCount: 0 };
      cur.productCount += 1;
      for (const v of p.variants) cur.imageCount += v.images?.length ?? 0;
      perCategory.set(p.category.slug, cur);
    }

    categoriesCache = [...ordered, ...rest].map((c) => ({
      ...c,
      productCount: perCategory.get(c.slug)?.productCount ?? 0,
      imageCount: perCategory.get(c.slug)?.imageCount ?? c.imageCount ?? 0,
    }));
  }
  return categoriesCache;
}

/** Catalogue as the visitor sees it — products.json minus anything awaiting review. */
function catalogue(): Product[] {
  return loadProducts().filter((p) => !p.needsReview);
}

let countsCache: { products: number; variants: number; images: number } | null = null;

/** Site-wide counts, all derived from products.json (never from meta.json or literals). */
function loadCounts(): { products: number; variants: number; images: number } {
  if (!countsCache) {
    let variants = 0;
    let images = 0;
    const products = catalogue();
    for (const p of products) {
      variants += p.variants.length;
      for (const v of p.variants) images += v.images?.length ?? 0;
    }
    countsCache = { products: products.length, variants, images };
  }
  return countsCache;
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return catalogue().filter((p) => p.category.slug === categorySlug);
}

export function getCategories(): Category[] {
  return loadCategories();
}

export function getCategory(slug: string): Category | undefined {
  return loadCategories().find((c) => c.slug === slug);
}

export function getFeatured(): Product[] {
  const byKey = new Map(loadProducts().map((p) => [p.familyKey, p]));
  const keys = [...FEATURED_KEYS].filter((k) => byKey.has(k));
  const rest = loadProducts().filter((p) => !FEATURED_KEYS.includes(p.familyKey) && !p.needsReview);
  const picked = keys.map((k) => byKey.get(k)!);
  const filler = [...rest].sort((a, b) => b.variantCount - a.variantCount).slice(0, Math.max(0, 8 - picked.length));
  return [...picked, ...filler].slice(0, 8);
}

export function getFeaturedProducts(): Product[] {
  return getFeatured();
}

export function getBestsellers(): Product[] {
  const byKey = new Map(loadProducts().map((p) => [p.familyKey, p]));
  return BESTSELLER_KEYS.filter((k) => byKey.has(k)).map((k) => byKey.get(k)!);
}

export function getNewArrivals(): Product[] {
  return loadProducts().filter((p) => p.newArrival);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameCat = getProductsByCategory(product.category.slug)
    .filter((p) => p.familyKey !== product.familyKey && !p.needsReview)
    .sort((a, b) => (a.subcategory === product.subcategory ? -1 : 1) - (b.subcategory === product.subcategory ? -1 : 1));
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  const other = loadProducts().filter(
    (p) => p.familyKey !== product.familyKey && p.category.slug !== product.category.slug && !p.needsReview,
  );
  return [...sameCat, ...other].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);
  return loadProducts()
    .filter((p) => !p.needsReview)
    .map((p) => {
      const haystack = [p.name, p.type, p.category.name, p.subcategory, p.shortDescription, ...(p.tags || [])]
        .join(" ")
        .toLowerCase();
      const hits = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
      return { p, hits };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || b.p.variantCount - a.p.variantCount)
    .map((x) => x.p);
}

/** Representative hero image for a category (first product's variant hero). */
export function getCategoryImage(slug: string): string {
  const premium = premiumCategoryImage(slug);
  if (premium) return premium;
  const products = getProductsByCategory(slug);
  for (const p of products) {
    const img = p.variants[0]?.hero;
    if (img) return img;
  }
  return "/img/Logo.png";
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
  return loadCounts().images;
}

export function getVariantCount(): number {
  return loadCounts().variants;
}

export function getProductCount(): number {
  return loadCounts().products;
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