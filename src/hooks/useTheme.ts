import { useEffect, useState } from "react";

import type { ThemeMode } from "../types";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: ThemeMode = "system";

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === "light" || value === "dark" || value === "system";

const getSystemDarkMode = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;

    const saved = localStorage.getItem(STORAGE_KEY);
    return isThemeMode(saved) ? saved : DEFAULT_THEME;
  });

  const [resolvedDark, setResolvedDark] = useState<boolean>(() =>
    theme === "dark" ? true : theme === "light" ? false : getSystemDarkMode(),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark"
          ? true
          : theme === "light"
            ? false
            : mediaQuery.matches;
      setResolvedDark(isDark);
      root.classList.toggle("dark", isDark);
    };

    applyTheme();

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage quota or privacy errors.
    }

    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") return "light";
      if (prev === "light") return "system";
      return "dark";
    });
  };

  return { theme, setTheme, resolvedDark, toggleTheme };
}
