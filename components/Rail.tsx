"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Lightweight premium rail:
 * native scroll-snap (touch + trackpad), pointer drag (mouse), keyboard arrows,
 * arrow buttons and pagination dots. No external dependencies.
 */
export function Rail({
  children,
  className = "",
  ariaLabel,
  showArrows = true,
  showDots = true,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  showArrows?: boolean;
  showDots?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const total = Math.max(1, Math.ceil(el.scrollWidth / Math.max(1, el.clientWidth)));
    setPages(total);
    setPage(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      setPage(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
    el.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    const el = ref.current;
    if (!el) return;
    if (drag.current.active) {
      drag.current.active = false;
      el.style.scrollSnapType = "";
      el.style.cursor = "";
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className={`group/rail relative ${className}`}>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            nudge(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            nudge(-1);
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        style={{ cursor: "grab" }}
      >
        {children}
      </div>

      {showArrows && (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => nudge(-1)}
            className="absolute -left-3 top-[calc(50%-1.5rem)] z-10 hidden h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ivory opacity-0 shadow-card transition-all duration-300 hover:border-brass hover:text-brass group-hover/rail:opacity-100 lg:grid"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => nudge(1)}
            className="absolute -right-3 top-[calc(50%-1.5rem)] z-10 hidden h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ivory opacity-0 shadow-card transition-all duration-300 hover:border-brass hover:text-brass group-hover/rail:opacity-100 lg:grid"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {showDots && pages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-7 bg-brass" : "w-1.5 bg-line-strong hover:bg-brass/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
