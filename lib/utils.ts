import { SITE } from "@/lib/site";

/**
 * A 1x1 transparent PNG as base64 data URI - absolute last resort fallback
 * Never fails, never 404s, invisible to user
 */
export const TRANSPARENT_PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

/**
 * Get the best available image for a product/variant, with safe fallbacks
 */
export function getProductImage(product: { variants?: { hero?: string; images?: string[] }[] }): string {
  const v = product.variants?.[0];
  return v?.hero || v?.images?.[0] || TRANSPARENT_PIXEL;
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceRange(from: number, to: number): string {
  return `${formatINR(from)} – ${formatINR(to)}`;
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productQuoteMessage(productName: string, variantName?: string): string {
  return [
    `Hi Craftiva! I'd like a quote for the *${productName}*.`,
    variantName ? `\nVariant: ${variantName}` : "",
    "\n\nPlease share the price, available finishes and delivery time.",
  ].join("");
}

export function customQuoteMessage(details: {
  type?: string;
  size?: string;
  wood?: string;
  finish?: string;
  notes?: string;
}): string {
  return [
    "Hi Craftiva! I'd like a made-to-order quote.",
    details.type ? `\n• Furniture type: ${details.type}` : "",
    details.size ? `\n• Approx. size: ${details.size}` : "",
    details.wood ? `\n• Wood / material: ${details.wood}` : "",
    details.finish ? `\n• Finish / colour: ${details.finish}` : "",
    details.notes ? `\n• Notes: ${details.notes}` : "",
    "\n\nPlease share the price and lead time.",
  ].join("");
}

export function waMeBase(): string {
  return `https://wa.me/${SITE.whatsappNumber}`;
}