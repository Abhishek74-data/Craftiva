"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Fades page content in on every route change.
 * Keyed remount + opacity-only animation, so sticky/fixed layout is never affected.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
