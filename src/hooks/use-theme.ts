import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

/**
 * Manages dark/light theme by toggling the `light` class on <html>.
 * Persists choice to localStorage. Defaults to dark.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("zd-theme") as Theme | null;
    const initial = stored || "dark";
    setThemeState(initial);
    if (initial === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("zd-theme", next);
      if (next === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
