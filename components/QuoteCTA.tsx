"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { productQuoteMessage } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { Price } from "@/lib/types";

export function PriceTag({ price, className = "" }: { price?: Price; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8C6F47] group-hover:text-[#191614] transition-colors ${className}`}>
      Get Best Price on WhatsApp →
    </span>
  );
}

export function QuoteCTA({
  productName,
  variantName,
  compact = false,
}: {
  productName: string;
  variantName?: string;
  compact?: boolean;
}) {
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    `Hi Craftiva! I'd like to get the best factory price quote for the *${productName}*${variantName ? ` (${variantName})` : ""}. Please share pricing and lead time.`
  )}`;
  
  return (
    <div className="flex flex-col gap-3">
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-brass w-full">
        <MessageCircle size={17} />
        Get Best Quote on WhatsApp
      </a>
      <Link href={`/quote?product=${encodeURIComponent(productName)}`} className="btn-outline w-full">
        Request a custom quote
      </Link>
      {!compact && (
        <p className="text-center text-xs text-muted">
          Factory-direct pricing · reply within working hours · {SITE.leadTime} lead time
        </p>
      )}
    </div>
  );
}