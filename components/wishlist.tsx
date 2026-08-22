"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Heart, X } from "lucide-react";

const STORAGE_KEY = "craftiva-wishlist";

interface WishlistContextValue {
  items: string[];
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (slug: string, name?: string) => void;
  removeWishlist: (slug: string) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [toast, setToast] = useState<{ slug: string; name: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItems(readStorage());
    const sync = () => setItems(readStorage());
    window.addEventListener("craftiva:wishlist", sync);
    return () => window.removeEventListener("craftiva:wishlist", sync);
  }, []);

  const persist = useCallback((next: string[]) => {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage full or private mode */
    }
    window.dispatchEvent(new CustomEvent("craftiva:wishlist"));
  }, []);

  const showToast = useCallback((name: string) => {
    setToast({ slug: name, name });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const toggleWishlist = useCallback(
    (slug: string, name?: string) => {
      setItems((prev) => {
        const exists = prev.includes(slug);
        const next = exists ? prev.filter((s) => s !== slug) : [...prev, slug];
        persist(next);
        if (!exists && name) showToast(name);
        return next;
      });
    },
    [persist, showToast],
  );

  const removeWishlist = useCallback(
    (slug: string) => {
      setItems((prev) => {
        const next = prev.filter((s) => s !== slug);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const clearWishlist = useCallback(() => persist([]), [persist]);

  const isWishlisted = useCallback((slug: string) => items.includes(slug), [items]);

  const value = useMemo(
    () => ({ items, isWishlisted, toggleWishlist, removeWishlist, clearWishlist, count: items.length }),
    [items, isWishlisted, toggleWishlist, removeWishlist, clearWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
      {toast && <WishlistToast name={toast.name} onClose={() => setToast(null)} />}
    </WishlistContext.Provider>
  );
}

function WishlistToast({ name, onClose }: { name: string; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(
    <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 animate-fade-up">
      <div className="flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-ivory shadow-lift">
        <Heart size={16} className="fill-brass text-brass" />
        <span className="max-w-[70vw] truncate">
          <strong className="font-semibold">{name}</strong> added to wishlist
        </span>
        <button onClick={onClose} aria-label="Dismiss" className="ml-1 rounded-full p-1 hover:bg-white/10">
          <X size={14} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(slug);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(slug, name);
      }}
      className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
        active
          ? "border-walnut bg-walnut text-ivory"
          : "border-line bg-white/80 text-ink hover:border-walnut hover:text-walnut"
      } ${className}`}
    >
      <Heart size={17} className={active ? "fill-ivory" : ""} />
    </button>
  );
}