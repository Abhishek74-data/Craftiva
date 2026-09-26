/* Curated editorial photography used for banners, hero and category tiles.
   Sourced from Unsplash (free for commercial use, no attribution required)
   and stored locally in /public/premium so nothing is hotlinked.
   See data/premium-credits.json for the source list. */

export const PREMIUM = {
  hero: "/premium/hero-living-room.jpg",
  craft: "/premium/banner-craft.jpg",
  craftHands: "/premium/craft-hands.jpg",
  showroom: "/premium/showroom.jpg",
  bedroom: "/premium/banner-bedroom.jpg",
  dining: "/premium/banner-dining.jpg",
} as const;

export const PREMIUM_CATEGORY: Record<string, string> = {
  beds: "/premium/cat-beds.jpg",
  wardrobes: "/premium/cat-wardrobes.jpg",
  sofas: "/premium/cat-sofas.jpg",
  dining: "/premium/cat-dining.jpg",
  tables: "/premium/cat-tables.jpg",
  chairs: "/premium/cat-chairs.jpg",
  storage: "/premium/cat-storage.jpg",
  office: "/premium/cat-office.jpg",
  ottomans: "/premium/cat-ottomans.jpg",
  kids: "/premium/cat-kids.jpg",
};

export function premiumCategoryImage(slug: string): string {
  return PREMIUM_CATEGORY[slug] || "";
}