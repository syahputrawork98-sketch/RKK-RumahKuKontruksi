"use client";

import { useEffect, useState } from "react";

/**
 * Hook untuk mendeteksi media query match (responsive design)
 * @param query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean - apakah query match
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoints untuk mudah dipakai
 */
export const breakpoints = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 640px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1024px)",
  xl: "(max-width: 1280px)",
  "2xl": "(max-width: 1536px)",
};

// Shortcuts untuk breakpoints umum
export function useIsMobile(): boolean {
  return useMediaQuery(breakpoints.md);
}

export function useIsTablet(): boolean {
  return useMediaQuery(breakpoints.lg);
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1025px)");
}
