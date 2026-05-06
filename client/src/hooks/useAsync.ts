"use client";

import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
  status: "idle" | "pending" | "success" | "error";
  data?: T;
  error?: Error;
};

/**
 * Hook untuk handle async operations dengan error handling
 * @param asyncFunction - async function yang akan dijalankan
 * @param immediate - jalankan function langsung saat mount (default: false)
 * @returns { status, data, error, execute } - state dan execute function
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = false
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
  });

  const execute = useCallback(async () => {
    setState({ status: "pending" });
    try {
      const data = await asyncFunction();
      setState({ status: "success", data });
      return data;
    } catch (error) {
      setState({
        status: "error",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  }, [asyncFunction]);

  // Execute immediately jika immediate = true
  useEffect(() => {
    if (immediate) {
      const timer = setTimeout(() => {
        void execute();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
