"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <span className="pointer-events-none hidden rounded-xl bg-ink/90 px-3 py-1.5 text-xs font-medium text-ivory opacity-0 shadow-lift backdrop-blur transition-all duration-300 md:group-hover:opacity-100 group-hover:opacity-100">
        Direct from workshop · Live support
      </span>
      <a
        href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like a quote for a furniture piece.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Craftiva Furniture on WhatsApp"
        className="group relative flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white shadow-lift transition-all hover:bg-[#20ba5a] hover:scale-105"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-white"></span>
        </span>
        <MessageCircle size={20} />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}