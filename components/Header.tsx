"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Clock, Heart, MapPin, Menu, MessageCircle, Search, X } from "lucide-react";
import type { Category } from "@/lib/types";
import { SITE } from "@/lib/site";
import { useWishlist } from "@/components/wishlist";
import { SearchDrawer } from "@/components/SearchDrawer";

export function Header({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { count } = useWishlist();
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="bg-walnut-dark text-ivory">
          <div className="wrap flex items-center justify-between gap-4 py-2 text-[11px] font-medium tracking-wide">
            <p className="hidden items-center gap-1.5 sm:flex">
              <Clock size={12} />
              {SITE.hours}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">{SITE.address}</span>
            </p>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 transition-colors hover:text-brass md:flex"
            >
              <MessageCircle size={12} />
              WhatsApp · {SITE.whatsappDisplay}
            </a>
          </div>
        </div>

        <div className="border-b border-line bg-ivory/90 backdrop-blur-md">
          <div className="wrap flex items-center justify-between gap-4 py-4">
            <Link href="/" className="group flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/d/1MdM4wk_Iq7gTxeuleXX94_PQD-YCOt59"
                alt="Craftiva Furniture logo"
                width={88}
                height={69}
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft lg:flex">
              <Link
                href="/catalogue.html"
                className="font-bold text-walnut transition-colors hover:text-brass flex items-center gap-1"
              >
                <span>📖</span> Master Catalogue 2026
              </Link>
              <Link
                href="/collections"
                className={`link-underline transition-colors hover:text-walnut ${
                  pathname === "/collections" ? "text-walnut font-semibold" : ""
                }`}
              >
                All Pieces
              </Link>
              <Link
                href="/quote"
                className={`link-underline transition-colors hover:text-walnut ${
                  pathname === "/quote" ? "text-walnut font-semibold" : ""
                }`}
              >
                Custom Order
              </Link>
              <Link
                href="/process"
                className={`link-underline transition-colors hover:text-walnut ${
                  pathname === "/process" ? "text-walnut font-semibold" : ""
                }`}
              >
                Our Process
              </Link>
              <Link
                href="/about"
                className={`link-underline transition-colors hover:text-walnut ${
                  pathname === "/about" ? "text-walnut font-semibold" : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/faqs"
                className={`link-underline transition-colors hover:text-walnut ${
                  pathname === "/faqs" ? "text-walnut font-semibold" : ""
                }`}
              >
                FAQs
              </Link>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/catalogue.html"
                className="btn-brass !py-2 !px-4 !text-xs inline-flex items-center gap-1.5"
              >
                <span>Lookbook</span>
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to discuss a furniture order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark hidden !px-4 !py-2 !text-xs sm:inline-flex"
              >
                <MessageCircle size={14} />
                WhatsApp Quote
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/80 lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(88vw,400px)] flex-col bg-ivory shadow-lift animate-fade-in">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <img
                src="https://lh3.googleusercontent.com/d/1MdM4wk_Iq7gTxeuleXX94_PQD-YCOt59"
                alt="Craftiva"
                className="h-8 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-line"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <Link
                href="/catalogue.html"
                className="mb-4 flex items-center justify-between rounded-xl bg-walnut p-3.5 text-sm font-bold text-ivory shadow-card"
              >
                <span>📖 Open Master Catalogue 2026</span>
                <span>→</span>
              </Link>
              <p className="eyebrow mb-2">Explore</p>
              <div className="flex flex-col gap-1">
                {( [
                  { href: "/catalogue.html", label: "Master Catalogue" },
                  { href: "/collections", label: "All Pieces" },
                  { href: "/quote", label: "Custom Order" },
                  { href: "/process", label: "Our Process" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  { href: "/faqs", label: "FAQs" },
                ] as const ).map((l) => {
                  const isActive = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive ? "bg-sand/60 text-walnut font-bold" : "text-ink hover:bg-ivory-dark"
                      }`}
                    >
                      <span>{l.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className="border-t border-line px-5 py-4">
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brass w-full"
              >
                <MessageCircle size={16} /> WhatsApp us
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                {SITE.hours} · {SITE.address}
              </p>
            </div>
          </div>
        </div>
      )}

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}