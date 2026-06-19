"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * Bottom sheet / drawer. Slides up from the bottom with a scrim, locks body
 * scroll, and closes on ESC / scrim click / the close button. Rendered through a
 * portal so transformed ancestors (scroll-reveal wrappers) can't trap it.
 */
export function BottomSheet({
  open,
  onClose,
  label,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={title}>
          {/* scrim */}
          <motion.button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink-block/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* panel */}
          <motion.div
            className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col rounded-t-[var(--radius)] border-t-2 border-orange bg-paper"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE.outQuart }}
          >
            {/* sticky header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-paper px-[var(--gutter)] py-4">
              <div className="flex min-w-0 items-baseline gap-3">
                {label && <span className="label shrink-0 text-orange">{label}</span>}
                {title && (
                  <span className="display truncate text-lg font-bold text-ink">
                    {title}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="group/x flex size-10 shrink-0 items-center justify-center border border-line transition-colors hover:border-ink hover:bg-ink"
                aria-label="Close"
              >
                <X className="size-5 text-ink transition-colors group-hover/x:text-on-ink" strokeWidth={2} />
              </button>
            </div>

            {/* scrollable body */}
            <div className="overflow-y-auto overscroll-contain px-[var(--gutter)] py-8" data-lenis-prevent>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
