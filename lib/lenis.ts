import type Lenis from "lenis";

/**
 * The single smooth-scroll instance for the whole app.
 * One system only — nothing else may drive page scrolling.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/**
 * Locks page scrolling for overlays (mobile menu, search, modals).
 * Stops Lenis when present and falls back to body overflow otherwise,
 * so the behaviour is identical with or without smooth scrolling.
 */
export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
