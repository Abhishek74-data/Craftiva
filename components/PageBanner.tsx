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
    <section className="relative overflow-hidden border-b border-line bg-surface-2">
      <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-surface-2 via-surface-2/70 to-transparent" />
      </div>

      <div className="wrap relative py-16 sm:py-24 lg:py-28">
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
          <h1 className="display-title mt-3 max-w-2xl text-4xl text-ivory sm:text-6xl">{title}</h1>
          {description && (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ash sm:text-base">{description}</p>
          )}
          {meta && (
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-brass">{meta}</p>
          )}
        </FadeUp>

        <div className="mt-9 overflow-hidden rounded-xl border border-line bg-surface lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function PageBannerShell({ children }: { children: ReactNode }) {
  return <div className="wrap">{children}</div>;
}