"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "ayatas-docs-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

// Runs before React hydrates so the stored theme is applied on first paint.
export const themeScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var d=s==="dark"||((!s||s==="system")&&window.matchMedia("${DARK_QUERY}").matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

/* Preference store: the selected theme, shared across every consumer. */

const themeListeners = new Set<() => void>();
let themeSnapshot: Theme | null = null;

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function subscribeTheme(onChange: () => void) {
  themeListeners.add(onChange);
  return () => themeListeners.delete(onChange);
}

function getThemeSnapshot(): Theme {
  themeSnapshot ??= readStoredTheme();
  return themeSnapshot;
}

function getServerThemeSnapshot(): Theme {
  return "system";
}

export function setTheme(theme: Theme) {
  themeSnapshot = theme;
  try {
    if (theme === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable; the choice still applies for this session.
  }
  themeListeners.forEach((listener) => listener());
}

/* System store: the operating system's current color-scheme preference. */

function subscribeSystem(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSystemSnapshot(): ResolvedTheme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function getServerSystemSnapshot(): ResolvedTheme {
  return "light";
}

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const systemTheme = useSyncExternalStore(
    subscribeSystem,
    getSystemSnapshot,
    getServerSystemSnapshot,
  );

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
