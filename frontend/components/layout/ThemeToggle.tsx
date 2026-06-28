"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "system" | "light" | "dark";
const STORE = "cm-theme";
const NEXT: Record<Theme, Theme> = { system: "light", light: "dark", dark: "system" };

function resolve(t: Theme): "light" | "dark" {
  if (t === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  return t;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(((localStorage.getItem(STORE) as Theme) || "system"));
    // keep "system" in sync with the OS while that mode is active
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSys = () => {
      if (((localStorage.getItem(STORE) as Theme) || "system") === "system")
        document.documentElement.setAttribute("data-theme", mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onSys);
    return () => mq.removeEventListener("change", onSys);
  }, []);

  function cycle() {
    const t = NEXT[theme];
    setTheme(t);
    localStorage.setItem(STORE, t);
    document.documentElement.setAttribute("data-theme", resolve(t));
  }

  const active = mounted ? theme : "system";
  const Icon = active === "system" ? Monitor : active === "light" ? Sun : Moon;
  const label = active === "system" ? "System" : active === "light" ? "Light" : "Dark";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to switch (System → Light → Dark).`}
      title={`Theme: ${label}`}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full border border-line-invert text-on-ink-2 transition-colors hover:border-orange/50 hover:text-orange",
        className,
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
