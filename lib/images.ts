/** Helpers for plain-<img> responsive sources (srcset/sizes). Variant files
    are produced by scripts/gen-responsive.mjs. */

/** Original (source) width per premium asset — used to offer the full-size
    original as the largest srcset candidate. */
const PREMIUM_ORIGINAL_WIDTHS: Record<string, number> = {
  "/premium/hero-living-room.jpg": 3840,
  "/premium/living-room-alt.jpg": 2600,
  "/premium/banner-craft.jpg": 2400,
  "/premium/craft-hands.jpg": 1400,
  "/premium/showroom.jpg": 1600,
  "/premium/banner-bedroom.jpg": 2400,
  "/premium/banner-dining.jpg": 2400,
  "/premium/intro-sofa.jpg": 1000,
  "/premium/showcase-sofa.jpg": 1000,
  "/premium/space-bedroom.jpg": 1000,
  "/premium/space-dining.jpg": 2000,
  "/premium/space-workshop.jpg": 2000,
  "/premium/cat-beds.jpg": 1200,
  "/premium/cat-wardrobes.jpg": 1200,
  "/premium/cat-sofas.jpg": 1200,
  "/premium/cat-dining.jpg": 1200,
  "/premium/cat-tables.jpg": 1200,
  "/premium/cat-chairs.jpg": 1200,
  "/premium/cat-storage.jpg": 1200,
  "/premium/cat-office.jpg": 1200,
  "/premium/cat-ottomans.jpg": 1200,
  "/premium/cat-kids.jpg": 1200,
};

function buildSrcSet(src: string, widths: number[], originalWidth?: number): string | undefined {
  if (src.startsWith("data:")) return undefined;
  const dot = src.lastIndexOf(".");
  if (dot === -1) return undefined;
  const base = src.slice(0, dot);
  const ext = src.slice(dot);
  const parts = widths.map((w) => `${base}.${w}${ext} ${w}w`);
  if (originalWidth) parts.push(`${src} ${originalWidth}w`);
  return parts.join(", ");
}

/** srcset for catalogue card images: 480w + 800w variants (no original —
    cards never display wider than ~600 CSS px). */
export function cardSrcSet(src: string): string | undefined {
  return buildSrcSet(src, [480, 800]);
}

/**
 * The curated photo set a PDP gallery may show (max 6, preferring
 * main/lifestyle/numbered shots). Single source of truth shared with
 * scripts/gen-responsive.mjs: the generator creates 480/800 variants for
 * exactly this set (plus the first 3 card images), so every srcset candidate
 * the UI can request exists — no 404s. Keep both sides in sync by using
 * this function only.
 */
export function curateGalleryImages(images: readonly (string | null | undefined)[]): string[] {
  const unique = [...new Set(images.filter((img): img is string => !!img))];
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
  return [];
}

/** srcset for /premium images: 800w + 1600w variants + the original.
    The 1600w candidate is only offered when the source is actually wider
    (otherwise that variant file would just be a re-encoded original). */
export function premiumSrcSet(src: string): string | undefined {
  const originalWidth = PREMIUM_ORIGINAL_WIDTHS[src];
  if (!originalWidth) return undefined;
  const dot = src.lastIndexOf(".");
  if (dot === -1) return undefined;
  const base = src.slice(0, dot);
  const ext = src.slice(dot);
  const parts = [`${base}.480${ext} 480w`, `${base}.800${ext} 800w`];
  if (originalWidth > 1600) parts.push(`${base}.1600${ext} 1600w`);
  parts.push(`${src} ${originalWidth}w`);
  return parts.join(", ");
}
