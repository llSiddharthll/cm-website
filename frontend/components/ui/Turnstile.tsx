"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/site";

type TurnstileOptions = {
  sitekey: string;
  theme?: "light" | "dark" | "auto";
  action?: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileOptions) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** True when a site key is configured — forms use this to require a token. */
export const turnstileEnabled = Boolean(TURNSTILE_SITE_KEY);

/** Loads the Turnstile script once and resolves when the API is ready. */
let loader: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-turnstile]",
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.dataset.turnstile = "true";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile"));
    document.head.appendChild(s);
  });
  return loader;
}

/**
 * Cloudflare Turnstile — invisible/low-friction captcha.
 *
 * Renders nothing when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset, so forms keep
 * working before the keys are configured. `onVerify` receives the token to
 * submit (and "" when it expires or errors).
 */
export function Turnstile({
  onVerify,
  action,
  className,
}: {
  onVerify: (token: string) => void;
  action?: string;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Keep the latest callback without re-running the render effect.
  const cb = useRef(onVerify);
  cb.current = onVerify;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !boxRef.current || !window.turnstile) return;
        if (widgetId.current) return;
        widgetId.current = window.turnstile.render(boxRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          action,
          callback: (token) => cb.current(token),
          "expired-callback": () => cb.current(""),
          "error-callback": () => cb.current(""),
        });
      })
      .catch(() => {
        // Script blocked (ad-blocker/offline) — don't hard-block the form.
        cb.current("");
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already gone */
        }
        widgetId.current = null;
      }
    };
  }, [action]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={boxRef} className={className} />;
}
