"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";
const root = () => document.documentElement;

// <html data-theme> is the single source of truth (set before paint by the inline script).
const subscribe = (notify) => {
  const observer = new MutationObserver(notify);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const isDark = () => root().dataset.theme === "dark";

/** Light/dark switch. Both icons are in the markup and CSS picks one, so there's no flicker. */
export default function ThemeToggle({ className }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  // Until the visitor makes a choice, keep following the OS setting.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {}
      root().dataset.theme = event.matches ? "dark" : "light";
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    root().dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label="Dark mode"
      className={cn(
        "grid size-11 place-items-center rounded-control border border-ink/20 text-ink transition-colors duration-200 hover:border-ink/50 hover:bg-ink/5",
        className,
      )}
    >
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
    </button>
  );
}
