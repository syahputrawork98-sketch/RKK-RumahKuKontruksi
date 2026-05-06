"use client";

import { useTheme } from "@/context/theme-context";

export function useDarkMode() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return {
    isDark: theme === "dark",
    theme,
    setTheme,
    toggleTheme,
  };
}