"use client";

import { useEffect, useRef } from "react";

/**
 * Hook untuk detect click outside element
 * Berguna untuk close dropdown, modal, tooltip, dll
 * @param callback - fungsi yang dijalankan saat click outside
 * @returns ref - ref yang di-attach ke elemen
 */
export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  callback: () => void
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
