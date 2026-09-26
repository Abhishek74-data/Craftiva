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
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent" />

      <div className="wrap relative py-16 sm:py-24">
        {breadcrumb && (
          <nav className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-ash">
            <Link href="/" className="transition-colors hover:text-brass">Home</Link>
            <ChevronRight size={12} />
            <span className="text-ivory">{breadcrumb}</span>
          </nav>
        )}
        <FadeUp>
          {eyebrow && (
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-brass sm:text-[11px]">
              {eyebrow}
            </p>
          )}
          <h1 className="display-title mt-3 max-w-3xl text-4xl text-ivory sm:text-6xl">{title}</h1>
          {description && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ash sm:text-base">{description}</p>
          )}
          {meta && (
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-brass">{meta}</p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}

export function PageBannerShell({ children }: { children: ReactNode }) {
  return <div className="wrap">{children}</div>;
}