"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      className={`group relative flex items-center gap-2 rounded-full border border-ember-500/30 bg-ink-800/60 px-1 py-1 transition hover:border-ember-500/60 ${compact ? "" : ""}`}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          isDark ? "bg-transparent text-ink-500" : "bg-ember-500 text-ink-950 shadow-glow"
        }`}
      >
        <Sun size={15} />
      </span>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
          isDark ? "bg-ember-500 text-ink-950 shadow-glow" : "bg-transparent text-mist-200"
        }`}
      >
        <Moon size={15} />
      </span>
      {!mounted && <span className="sr-only">Loading theme</span>}
    </button>
  );
}
