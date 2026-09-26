"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import type { Category } from "@/lib/types";
import { SITE } from "@/lib/site";
import { premiumCategoryImage } from "@/lib/premium";
import { useWishlist } from "@/components/wishlist";
import { SearchDrawer } from "@/components/SearchDrawer";
import { lockScroll } from "@/lib/lenis";

const NAV = [
  { label: "Collections", href: "/collections" },
  { label: "Custom Furniture", href: "/quote" },
  { label: "Our Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useWishlist();
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Threshold-crossing only: state flips at most once per direction,
    // and the resulting class change is paint-only (shadow/bg), never layout.
    let last = false;
    const onScroll = () => {
      const next = window.scrollY > 32;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    lockScroll(mobileOpen || searchOpen);
    return () => {
      lockScroll(false);
    };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      {/* ── Top utility bar (scrolls away naturally — never animated) ── */}
      <div className="border-b border-white/10 bg-espresso text-white/75">
        <div className="wrap flex h-9 items-center justify-between gap-4 text-[11px] font-medium tracking-[0.06em]">
          <p className="hidden items-center gap-1.5 lg:flex">
            <Clock size={12} className="text-gold" />
            {SITE.hours}
          </p>
          <p className="mx-auto flex items-center gap-1.5 truncate">
            <MapPin size={12} className="shrink-0 text-gold" />
            <span className="truncate">
              Custom Furniture <span className="text-gold">•</span> Factory Direct
              <span className="hidden sm:inline"> · Kirti Nagar, New Delhi</span>
            </span>
          </p>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 transition-colors hover:text-gold lg:flex"
          >
            <MessageCircle size={12} />
            {SITE.whatsappDisplay}
          </a>
        </div>
      </div>

      {/* ── Sticky main bar — fixed height, paint-only scroll changes ── */}
      <header className="sticky top-0 z-50">
        <div
          className={`border-b transition-[box-shadow,background-color,border-color] duration-300 ${
            scrolled
              ? "border-line bg-canvas/95 shadow-card backdrop-blur-xl"
              : "border-transparent bg-canvas/80 backdrop-blur-lg"
          }`}
        >
          <div className="wrap flex items-center justify-between gap-5 py-3">
            <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Craftiva Furniture — home">
              <img
                src="/Logo.png"
                alt="Craftiva Furniture logo"
                width={88}
                height={69}
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-11"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-ash lg:flex">
              <div
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  className={`flex items-center gap-1.5 py-2 transition-colors hover:text-brass ${
                    megaOpen ? "text-brass" : ""
                  }`}
                >
                  Shop
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {megaOpen && (
                  <div className="absolute left-1/2 top-full z-20 -translate-x-1/2 pt-4">
                    <div className="w-[min(94vw,880px)] animate-fade-in border border-line bg-surface p-6 shadow-lift">
                      <div className="grid grid-cols-5 gap-x-4 gap-y-5">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/categories/${c.slug}`}
                            className="group/mega block"
                          >
                            <div className="aspect-[4/3] overflow-hidden rounded-md border border-line bg-surface-2">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={
                                  premiumCategoryImage(c.slug) ||
                                  "/premium/hero-living-room.jpg"
                                }
                                alt={c.name}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-700 group-hover/mega:scale-105"
                              />
                            </div>
                            <p className="mt-2.5 text-[13px] font-semibold leading-snug text-ivory transition-colors group-hover/mega:text-brass">
                              {c.name}
                            </p>
                            <p className="text-[11px] text-muted">{c.productCount} designs</p>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                        <p className="text-xs text-muted">
                          Every piece made to order in Kirti Nagar · {SITE.leadTime} lead time
                        </p>
                        <Link
                          href="/collections"
                          className="text-sm font-semibold text-brass hover:underline"
                        >
                          View the full catalogue →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`link-underline py-2 transition-colors hover:text-brass ${
                    pathname === item.href ? "text-brass" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search the catalogue"
                className="grid h-10 w-10 place-items-center rounded-full text-ivory transition-colors hover:bg-ink-soft hover:text-brass"
              >
                <Search size={18} />
              </button>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative grid h-10 w-10 place-items-center rounded-full text-ivory transition-colors hover:bg-ink-soft hover:text-brass"
              >
                <Heart size={18} />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brass px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>

              <Link
                href="/quote"
                className="btn btn-primary hidden px-5! py-2.5! text-[12px]! sm:inline-flex"
              >
                Request a Quote
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full text-ivory transition-colors hover:bg-ink-soft lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-canvas animate-fade-in lg:hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
            <img src="/Logo.png" alt="Craftiva Furniture" className="h-9 w-auto" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink-soft"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <p className="eyebrow">Shop by category</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="group flex items-center gap-3 border border-line bg-surface p-2.5"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={premiumCategoryImage(c.slug) || "/premium/hero-living-room.jpg"}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-ivory">
                      {c.name}
                    </span>
                    <span className="block text-[11px] text-muted">{c.productCount} designs</span>
                  </span>
                </Link>
              ))}
            </div>

            <p className="eyebrow mt-8">Explore</p>
            <nav className="mt-3 flex flex-col divide-y divide-line border-y border-line">
              {[{ label: "All Collections", href: "/collections" }, ...NAV].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-3.5 text-[15px] font-medium text-ivory"
                >
                  {item.label}
                  <ChevronDown size={15} className="-rotate-90 text-muted" />
                </Link>
              ))}
            </nav>

            <div className="mt-7 flex flex-col gap-3">
              <Link href="/quote" className="btn btn-primary w-full">
                Request a Quote
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <p className="text-center text-xs text-muted">
                {SITE.hours} · Kirti Nagar, New Delhi
              </p>
            </div>
          </div>
        </div>
      )}

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
