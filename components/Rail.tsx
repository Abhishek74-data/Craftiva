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
  onActiveChange,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel: string;
  showArrows?: boolean;
  showDots?: boolean;
  onActiveChange?: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const activeCb = useRef(onActiveChange);
  activeCb.current = onActiveChange;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  // Geometry is measured once (measure/resize) — never read from the DOM
  // inside the scroll handler, so scrolling the rail causes no layout reads.
  const geo = useRef({ centers: [] as number[], width: 1 });
  const pageRef = useRef(-1);
  const activeRef = useRef(-1);
  const rafRef = useRef(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { centers, width } = geo.current;
    if (centers.length === 0) return;

    const nextPage = Math.round(el.scrollLeft / Math.max(1, width));
    if (nextPage !== pageRef.current) {
      pageRef.current = nextPage;
      setPage(nextPage);
    }

    const center = el.scrollLeft + width / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < centers.length; i++) {
      const dist = Math.abs(centers[i] - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    if (best !== activeRef.current) {
      activeRef.current = best;
      activeCb.current?.(best);
    }
  }, []);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    geo.current = {
      centers: items.map((item) => item.offsetLeft + item.offsetWidth / 2),
      width: el.clientWidth,
    };
    setPages((prev) => {
      const total = Math.max(1, Math.ceil(el.scrollWidth / Math.max(1, el.clientWidth)));
      return prev === total ? prev : total;
    });
    update();
  }, [update]);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure, update]);

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
            className="absolute -left-4 top-[calc(50%-1.5rem)] z-10 hidden h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-ivory opacity-0 shadow-card backdrop-blur transition-[opacity,border-color,color] duration-300 hover:border-brass hover:text-brass focus-visible:opacity-100 group-hover/rail:opacity-100 lg:grid"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => nudge(1)}
            className="absolute -right-4 top-[calc(50%-1.5rem)] z-10 hidden h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-ivory opacity-0 shadow-card backdrop-blur transition-[opacity,border-color,color] duration-300 hover:border-brass hover:text-brass focus-visible:opacity-100 group-hover/rail:opacity-100 lg:grid"
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
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                i === page ? "w-7 bg-brass" : "w-1.5 bg-line-strong hover:bg-brass/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
