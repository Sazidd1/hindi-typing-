import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";

const THEME_KEY = "theme";
const THEME_EVENT = "theme-change";

/** Apply or remove the .dark class on <html> and persist to localStorage. */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // localStorage may be unavailable in some environments
  }
}

/** Read the current theme from the DOM (source of truth after FOUC script runs). */
function readThemeFromDom(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Global theme hook.
 *
 * Uses a TWO-PHASE approach for SSR compatibility:
 *  - Phase 1 (server + client first render): theme is `undefined` — components
 *    render their "light" fallback. suppressHydrationWarning on <html> prevents
 *    React from complaining about the class attribute.
 *  - Phase 2 (after mount): reads the real value from the DOM (which the FOUC
 *    script has already set correctly) and updates state. This never causes a
 *    server/client HTML mismatch because it only runs on the client.
 *
 * The toggle/setTheme functions always read directly from the DOM, so they
 * work correctly regardless of phase.
 */
export function useTheme() {
  // Start as undefined: means "we don't know yet — hydrating"
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    // After mount, read the real state from the DOM (set by the FOUC script)
    setThemeState(readThemeFromDom());

    const handleChange = () => {
      setThemeState(readThemeFromDom());
    };

    window.addEventListener(THEME_EVENT, handleChange);
    window.addEventListener("storage", (e) => {
      if (e.key === THEME_KEY) handleChange();
    });

    return () => {
      window.removeEventListener(THEME_EVENT, handleChange);
    };
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    applyTheme(newTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  // Return "light" as the safe SSR default when theme is not yet known
  return { theme: theme ?? "light", setTheme, toggleTheme };
}
