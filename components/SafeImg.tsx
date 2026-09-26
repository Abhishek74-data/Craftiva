"use client";

import { useState } from "react";
import { TRANSPARENT_PIXEL } from "@/lib/utils";

export function SafeImg({
  src,
  alt = "",
  className,
  loading,
  fallback = TRANSPARENT_PIXEL,
}: {
  src: string;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  fallback?: string;
}) {
  const [current, setCurrent] = useState(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setCurrent(fallback)}
    />
  );
}
