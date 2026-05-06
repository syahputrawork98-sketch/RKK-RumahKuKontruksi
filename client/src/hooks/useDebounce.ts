"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook untuk debounce value - delay update value sampai user selesai input
 * Berguna untuk search input, autocomplete, dll
 * @param value - nilai yang akan di-debounce
 * @param delay - delay dalam milliseconds (default: 500)
 * @returns debouncedValue - nilai yang sudah di-debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook untuk throttle function - limit function execution
 * @param callback - fungsi yang akan di-throttle
 * @param delay - delay dalam milliseconds
 * @returns throttledCallback - fungsi yang sudah di-throttle
 */
export function useThrottle<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay: number = 500
): (...args: TArgs) => void {
  const lastRunRef = useRef(0);

  return useCallback(
    (...args: TArgs) => {
      const now = performance.now();
      if (now - lastRunRef.current >= delay) {
        lastRunRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}
