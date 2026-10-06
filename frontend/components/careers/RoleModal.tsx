"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * Role details in a dialog over /careers. Rendered by the intercepting route
 * app/careers/@modal/(.)[slug], so a card click keeps the list underneath and
 * updates the URL, while a direct visit still gets the full /careers/[slug] page.
 */
export function RoleModal({
  title,
  fullHref,
  children,
}: {
  title: string;
  fullHref: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
    };
  }, [close]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <motion.button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-dark/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        // The page behind is locked; this panel scrolls on its own.
        data-lenis-prevent
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line-invert-2 bg-dark-2 text-on-ink shadow-2xl outline-none sm:max-h-[88dvh] sm:rounded-2xl"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE.outQuart }}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line-invert px-6 py-3.5">
          {/* Plain <a>: a client-side Link would be intercepted back into this modal. */}
          <a
            href={fullHref}
            className="label group inline-flex items-center gap-1.5 text-on-ink-3 transition-colors hover:text-orange"
          >
            Open full page
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-2 flex size-9 items-center justify-center rounded-full text-on-ink-2 transition-colors hover:bg-on-ink/10 hover:text-on-ink"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-6 pb-10 pt-7 sm:px-10">{children}</div>
      </motion.div>
    </div>
  );
}

/** Scrolls the modal panel (not the page) to an element inside it. */
export function ScrollToButton({
  targetId,
  className,
  children,
}: {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    >
      {children}
    </button>
  );
}
