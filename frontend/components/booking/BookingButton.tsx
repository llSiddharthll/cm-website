"use client";

import { type ComponentProps, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Opens the Creative Monk booking widget (GoHighLevel) in a modal so the
 * "strategy call" CTAs create an appointment inline instead of navigating away.
 * `form_embed.js` auto-resizes the iframe to its content height.
 */
const EMBED_SRC =
  "https://app.creativemonkstudio.com/widget/booking/szkaUEgiHdvheQVHaymo";
const EMBED_JS = "https://app.creativemonkstudio.com/js/form_embed.js";

export function BookingButton({
  className,
  children,
  onClick,
  ...rest
}: ComponentProps<"button">) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    // Load the widget's resize script once (it listens for the iframe's height).
    if (!document.querySelector(`script[src="${EMBED_JS}"]`)) {
      const s = document.createElement("script");
      s.src = EMBED_JS;
      s.async = true;
      document.body.appendChild(s);
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
        className={className}
        {...rest}
      >
        {children}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Book a free strategy call"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden
              onMouseDown={() => setOpen(false)}
            />
            <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-black/10 px-5 py-3">
                <span className="text-sm font-semibold tracking-tight text-neutral-900">
                  Book a free strategy call
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid size-8 place-items-center rounded-full text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <iframe
                  src={EMBED_SRC}
                  title="Book a free strategy call"
                  allow="payment"
                  scrolling="no"
                  id="szkaUEgiHdvheQVHaymo_modal"
                  style={{
                    width: "100%",
                    minHeight: "70vh",
                    border: "none",
                    overflow: "hidden",
                  }}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
