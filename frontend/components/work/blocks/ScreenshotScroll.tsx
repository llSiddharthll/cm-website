"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { MousePointer2, Globe } from "lucide-react";
import { MockSitePage } from "./MockSitePage";

/**
 * Full-page website screenshot inside a browser frame that auto-scrolls
 * top→bottom on hover (the long-screenshot reveal). Uses a real uploaded
 * screenshot when provided, else a CSS mock site. Reduced-motion → manual scroll.
 */
export function ScreenshotScroll({
  screenshot,
  url,
  title = "Brand",
}: {
  screenshot?: string;
  url?: string;
  title?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const host = (url || `${title.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`).replace(/^https?:\/\//, "");

  function enter() {
    if (reduce) return;
    const f = frameRef.current,
      el = innerRef.current;
    if (!f || !el) return;
    const dist = el.offsetHeight - f.clientHeight;
    if (dist <= 0) return;
    el.style.transition = `transform ${Math.max(2.6, dist / 200).toFixed(1)}s linear`;
    el.style.transform = `translate3d(0, -${dist}px, 0)`;
  }
  function leave() {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform = "translate3d(0,0,0)";
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line-invert bg-dark-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-line-invert bg-dark-2 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-on-ink-3/40" />
          <span className="size-2.5 rounded-full bg-on-ink-3/40" />
          <span className="size-2.5 rounded-full bg-on-ink-3/40" />
        </div>
        <div className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-md bg-dark px-3 py-1.5">
          <Globe className="size-3 text-on-ink-3" />
          <span className="mono truncate text-[length:var(--text-mono)] text-on-ink-3">{host}</span>
        </div>
      </div>

      {/* viewport */}
      <div
        ref={frameRef}
        onMouseEnter={enter}
        onMouseLeave={leave}
        className={`group relative h-[clamp(22rem,58vh,40rem)] ${reduce ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        <div ref={innerRef} className="will-change-transform">
          {screenshot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={screenshot} alt={`${title} website`} loading="lazy" decoding="async" className="block w-full" />
          ) : (
            <MockSitePage title={title} />
          )}
        </div>

        {!reduce && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-dark/80 px-3 py-1.5 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
            <MousePointer2 className="size-3.5 text-orange" />
            <span className="mono text-[length:var(--text-mono)] text-on-ink-2">Hover to scroll the page</span>
          </div>
        )}
      </div>
    </div>
  );
}
