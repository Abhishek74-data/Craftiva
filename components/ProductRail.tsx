import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { Rail } from "@/components/Rail";
import { ProductCard } from "@/components/ProductCard";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { SectionHead } from "@/components/SectionHead";
import { SplitHeading } from "@/components/Motion";
import { premiumSrcSet } from "@/lib/images";

export function ProductRail({
  products,
  eyebrow,
  title,
  note,
  viewAllHref = "/collections",
}: {
  products: Product[];
  eyebrow: string;
  title: string;
  note?: string;
  viewAllHref?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="section wrap">
      <SectionHead
        eyebrow={eyebrow}
        title={title}
        note={note}
        action={
          <Link href={viewAllHref} className="btn btn-outline shrink-0">
            View all <ArrowRight size={15} className="btn-arrow" />
          </Link>
        }
      />

      <div className="mt-11">
        <Rail ariaLabel={title}>
          {products.map((p) => (
            <div
              key={p.familyKey}
              className="w-[72%] shrink-0 snap-start sm:w-[46%] md:w-[31%] lg:w-[23.5%]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </Rail>
      </div>
    </section>
  );
}

/** Editorial single-category showcase: large image + copy + CTA (§23). */
export function CategoryShowcase({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  ctaLabel,
  countLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  href: string;
  ctaLabel: string;
  countLabel?: string;
}) {
  return (
    <section className="wrap pb-4">
      <div className="relative overflow-hidden rounded-lg border border-line bg-surface-2">
        <div className="grid lg:grid-cols-2">
          <div className="shine group relative min-h-[16rem] overflow-hidden lg:min-h-[26rem]">
            <ParallaxMedia className="absolute inset-0" distance={24}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                srcSet={premiumSrcSet(image)}
                sizes="(max-width: 1023px) 100vw, 50vw"
                alt={imageAlt || `${title} — Craftiva collection`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />
            </ParallaxMedia>
            <span className="absolute inset-0 bg-gradient-to-t from-espresso/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-espresso/20" />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-12">
            <p className="eyebrow">{eyebrow}</p>
            <SplitHeading
              as="h2"
              text={title}
              variant="slide"
              className="display-title mt-4 text-[clamp(1.8rem,3.2vw,2.75rem)] text-ivory"
            />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ash">{description}</p>
            {countLabel && (
              <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-brass">
                {countLabel}
              </p>
            )}
            <div className="mt-8">
              <Link href={href} className="btn btn-primary">
                {ctaLabel} <ArrowRight size={15} className="btn-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
