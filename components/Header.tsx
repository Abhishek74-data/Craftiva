"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, MapPin, Menu, MessageCircle, X } from "lucide-react";
import type { Category } from "@/lib/types";
import { SITE } from "@/lib/site";

export function Header({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* Top Info Bar */}
        <div className="bg-[#1E1916] text-[#FAF7F2] border-b border-[#362C27]">
          <div className="px-3 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3 py-1.5 text-[10px] sm:text-[11px] font-medium tracking-wide">
            <p className="flex items-center gap-1.5 truncate">
              <MapPin size={11} className="shrink-0 text-[#B08D5B]" />
              <span className="truncate">Kirti Nagar Workshop · Mon–Sat 10am–7:30pm</span>
            </p>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#B08D5B] hover:text-white shrink-0 font-bold"
            >
              <MessageCircle size={11} />
              <span>{SITE.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="border-b border-[#E5DFD5] bg-[#F7F5F0]/95 backdrop-blur-md">
          <div className="px-3 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3 py-2.5 sm:py-3.5">
            <Link href="/" className="group flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Logo.png"
                alt="Craftiva Furniture logo"
                width={88}
                height={69}
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 text-xs sm:text-sm font-medium text-[#736C64] lg:flex">
              <Link
                href="/#products"
                className="font-bold text-[#1E1916] transition-colors hover:text-[#8C6F47]"
              >
                Catalogue 2026
              </Link>
              <Link
                href="/collections"
                className={`transition-colors hover:text-[#1E1916] ${
                  pathname === "/collections" ? "text-[#1E1916] font-semibold" : ""
                }`}
              >
                All 560+ Pieces
              </Link>
              <Link
                href="/quote"
                className={`transition-colors hover:text-[#1E1916] ${
                  pathname === "/quote" ? "text-[#1E1916] font-semibold" : ""
                }`}
              >
                Custom Order
              </Link>
              <Link
                href="/process"
                className={`transition-colors hover:text-[#1E1916] ${
                  pathname === "/process" ? "text-[#1E1916] font-semibold" : ""
                }`}
              >
                Workshop Process
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-[#1E1916] ${
                  pathname === "/about" ? "text-[#1E1916] font-semibold" : ""
                }`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`transition-colors hover:text-[#1E1916] ${
                  pathname === "/contact" ? "text-[#1E1916] font-semibold" : ""
                }`}
              >
                Visit Workshop
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to get a furniture quote.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-[#0A2010] font-bold text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 rounded-full flex items-center gap-1.5 shadow-xs"
              >
                <MessageCircle size={13} />
                <span>WhatsApp Quote</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border border-[#E5DFD5] bg-white text-[#191613] lg:hidden"
              >
                <Menu size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(84vw,340px)] flex-col bg-[#F7F5F0] shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] px-4 py-3.5 bg-white">
              <img
                src="/Logo.png"
                alt="Craftiva"
                className="h-7 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#E5DFD5] text-[#191613]"
              >
                <X size={15} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 text-sm font-medium">
              <Link
                href="/#products"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl bg-[#1E1916] text-[#FAF7F2] p-3 font-bold shadow-xs"
              >
                <span>📖 2026 Master Catalogue</span>
                <span>→</span>
              </Link>
              <Link
                href="/collections"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg p-2.5 text-[#191613] hover:bg-[#EFE9E0]"
              >
                <span>All 560+ Designs</span>
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg p-2.5 text-[#191613] hover:bg-[#EFE9E0]"
              >
                <span>Custom Order</span>
              </Link>
              <Link
                href="/process"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg p-2.5 text-[#191613] hover:bg-[#EFE9E0]"
              >
                <span>Workshop Process</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg p-2.5 text-[#191613] hover:bg-[#EFE9E0]"
              >
                <span>About Craftiva</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-lg p-2.5 text-[#191613] hover:bg-[#EFE9E0]"
              >
                <span>Visit Workshop (Kirti Nagar)</span>
              </Link>
            </nav>

            <div className="border-t border-[#E5DFD5] p-4 bg-white space-y-2 text-xs">
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-[#0A2010] font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[10px] text-center text-[#736C64]">
                📍 3rd Floor, B-102, Timber Block, Kirti Nagar, Delhi
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}