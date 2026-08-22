import Link from "next/link";
import { Clock, Factory, MapPin, MessageCircle, Ruler, ShieldCheck, Truck } from "lucide-react";
import type { Category } from "@/lib/types";
import { SITE } from "@/lib/site";

export function Footer({ categories }: { categories: Category[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-walnut-dark text-ivory">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold">Craftiva</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brass">Furniture</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/75">
            Factory-direct custom furniture from the heart of Kirti Nagar. Solid-wood pieces built to your
            size, wood and finish — no middlemen, no showroom markups.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I have a question about custom furniture.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-brass px-3.5 py-1.5 text-xs font-semibold text-ivory transition-colors hover:bg-brass-dark"
            >
              <MessageCircle size={13} />
              Quick WhatsApp Inquiry
            </a>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-ivory/70">
            <Factory size={14} className="shrink-0 text-brass" />
            Factory-direct · no retail markup
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Catalogue</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-ivory/80">
            {categories.slice(0, 10).map((c) => (
              <li key={c.slug}>
                <Link href={`/categories/${c.slug}`} className="transition-colors hover:text-brass">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Explore</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ivory/80">
            {( [
              { href: "/collections", label: "All Pieces" },
              { href: "/quote", label: "Custom Order" },
              { href: "/process", label: "How It Works" },
              { href: "/about", label: "About Craftiva" },
              { href: "/contact", label: "Visit the Workshop" },
              { href: "/faqs", label: "FAQs" },
              { href: "/wishlist", label: "Wishlist" },
            ] as const ).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brass">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">Visit & Contact</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ivory/80">
            <li className="flex gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brass" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock size={15} className="mt-0.5 shrink-0 text-brass" />
              <span>{SITE.hours}</span>
            </li>
            <li className="flex gap-2.5">
              <MessageCircle size={15} className="mt-0.5 shrink-0 text-brass" />
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brass"
              >
                WhatsApp · {SITE.whatsappDisplay}
              </a>
            </li>
            <li className="flex gap-2.5">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-brass" />
              <span>Serving {SITE.serviceArea} & pan-India delivery</span>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-ivory/15 px-3.5 py-2.5 text-xs text-ivory/70">
            <Truck size={15} className="shrink-0 text-brass" />
            Made to order · {SITE.leadTime} lead time
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="wrap flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/60 sm:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Ruler size={12} /> Crafted in Kirti Nagar, New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}