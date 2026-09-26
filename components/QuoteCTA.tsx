"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { formatPriceRange, productQuoteMessage } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { Price } from "@/lib/types";

export function PriceTag({ price, className = "" }: { price?: Price; className?: string }) {
  if (!price || price.onRequest) {
    return (
      <span className={`text-sm font-semibold text-brass ${className}`}>
        Price on request
      </span>
    );
  }
  return (
    <span className={`text-sm font-semibold text-ivory ${className}`}>
      {formatPriceRange(price.from!, price.to!)}
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
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(productQuoteMessage(productName, variantName))}`;
  return (
    <div className="flex flex-col gap-3">
      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-brass w-full">
        <MessageCircle size={17} />
        Get exact quote on WhatsApp
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