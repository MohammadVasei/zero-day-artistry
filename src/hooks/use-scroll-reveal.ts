import { useEffect, useRef, useState } from "react";

/**
 * Attaches an IntersectionObserver that triggers a reveal animation
 * when the element enters the viewport.
 *
 * SSR-safe: elements start visible (revealed=true). On hydration,
 * elements above the fold stay visible; elements below get their
 * `revealed` class removed so they can animate in on scroll.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(true); // SSR: start visible

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — keep everything visible
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    // Check if the element is already in the viewport (above the fold)
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      // Already visible — trigger reveal immediately
      setIsRevealed(true);
      return;
    }

    // Below the fold — hide it, then reveal on scroll
    setIsRevealed(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isRevealed };
}
