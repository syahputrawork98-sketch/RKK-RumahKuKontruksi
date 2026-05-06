"use client";

import React, { useRef, useState } from "react";
import { ToastContext, type Toast } from "./toast-context";

function createToastId(nextIdRef: React.MutableRefObject<number>): string {
  const id = `toast_${nextIdRef.current}`;
  nextIdRef.current += 1;
  return id;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextIdRef = useRef(1);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = createToastId(nextIdRef);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 3000,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
