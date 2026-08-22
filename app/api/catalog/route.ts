import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/data";

export const runtime = "nodejs";

export async function GET() {
  const items = getAllProducts()
    .filter((p) => !p.needsReview)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category.name,
      price: p.price,
      image: p.variants[0]?.hero || "",
    }));
  return NextResponse.json({ items });
}