"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
interface ThemeContext { theme: Theme; toggle: () => void; }

const STORAGE_KEY = "synapse-theme";
const Context = createContext<ThemeContext | null>(null);

function initial(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const t = initial();
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return <Context.Provider value={{ theme, toggle }}>{children}</Context.Provider>;
}

export function useTheme(): ThemeContext {
  const ctx = useContext(Context);
  if (!ctx) return { theme: "light", toggle: () => undefined };
  return ctx;
}
