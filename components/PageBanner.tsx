import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/Motion";

export function PageBanner({
  image,
  eyebrow,
  title,
  description,
  meta,
  breadcrumb,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25" />

      <div className="wrap relative py-14 sm:py-20">
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-xs text-ivory/70">
            <Link href="/" className="hover:text-brass">Home</Link>
            <ChevronRight size={12} />
            <span className="text-ivory">{breadcrumb}</span>
          </nav>
        )}
        <FadeUp>
          {eyebrow && (
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-brass sm:text-xs">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold leading-tight text-ivory sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory/80 sm:text-base">{description}</p>
          )}
          {meta && (
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brass">{meta}</p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

export function PageBannerShell({ children }: { children: ReactNode }) {
  return <div className="wrap">{children}</div>;
}