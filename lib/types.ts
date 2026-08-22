export interface Category {
  slug: string;
  name: string;
  blurb: string;
  productCount: number;
  imageCount: number;
  subcategories: string[];
}

export interface ColourSwatch {
  name: string;
  url: string;
}

export interface Variant {
  id: string;
  name: string;
  colour: string;
  configuration: string;
  type: string;
  images: string[];
  roles: string[];
  hero: string;
  swatchImage: string;
  colourSwatches: ColourSwatch[];
  folder: string;
  referencePrice: string;
  dims: Record<string, string>;
}

export interface Price {
  type: "range" | "on-request";
  from?: number;
  to?: number;
  note: string;
  onRequest: boolean;
}

export interface Product {
  id: string;
  familyKey: string;
  slug: string;
  name: string;
  category: { slug: string; name: string };
  subcategory: string;
  type: string;
  shortDescription: string;
  description: string;
  price: Price;
  source: "koala" | "westelm";
  customizable: boolean;
  leadTime: string;
  availability: string;
  materials: string[];
  tags: string[];
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  needsReview: boolean;
  variants: Variant[];
  variantCount: number;
}

export interface CatalogMeta {
  generatedAt: string;
  sourceFolders: number;
  products: number;
  variants: number;
  images: number;
  categories: number;
  needsReview: number;
  imagesRoot: string;
}