import Link from "next/link";
import { getAllProducts, getCategories, getProductCount } from "@/lib/data";
import { PREMIUM } from "@/lib/premium";
import { CollectionsBrowser } from "@/components/CollectionsBrowser";
import { PageBanner } from "@/components/PageBanner";

export const metadata = {
  title: "All Pieces",
  description: "Browse the full Craftiva catalogue — over 540 custom furniture designs made to order in Kirti Nagar, Delhi.",
};

export default function CollectionsPage() {
  const products = getAllProducts().filter((p) => !p.needsReview);
  const categories = getCategories();

  return (
    <>
      <PageBanner
        image={PREMIUM.hero}
        eyebrow="The Master Catalogue"
        title="The full catalogue"
        description="Every design in our workshop, photographed from our floor. Each piece is made to order — pick the base design, then tell us your size, wood and finish."
        meta={`${getProductCount()} designs · all made to order`}
        breadcrumb="All Pieces"
      />
      <section className="wrap -mt-8 pb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="rounded-full border border-line bg-[#f7f4ee] px-4 py-2 text-xs font-semibold text-ash backdrop-blur transition-colors hover:border-brass hover:text-brass"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap py-12">
        <CollectionsBrowser products={products} />
      </section>
    </>
  );
}