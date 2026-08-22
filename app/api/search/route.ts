import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const results = searchProducts(q).slice(0, 12).map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category.name,
    price: p.price,
    image: p.variants[0]?.hero || "",
  }));
  return NextResponse.json({ query: q, results });
}