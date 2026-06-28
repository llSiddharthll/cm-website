"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progressive client-side pagination ("infinite scroll"): reveals `step` items
 * at a time as a sentinel element scrolls into view. Resets to the first page
 * whenever `resetKey` changes (e.g. a filter switch).
 *
 * Returns the visible slice plus a ref to attach to a sentinel placed just
 * after the list. The observer re-arms on each load, so it keeps filling the
 * viewport until the sentinel is pushed out of range or everything is shown.
 */
export function useInfiniteList<T>(
  items: T[],
  { step = 9, resetKey }: { step?: number; resetKey?: unknown } = {},
) {
  const [count, setCount] = useState(step);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // reset to the first page when the filtered set changes
  useEffect(() => {
    setCount(step);
  }, [resetKey, step]);

  const total = items.length;
  const hasMore = count < total;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCount((c) => Math.min(c + step, total));
        }
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, step, total, count]);

  return {
    visible: count >= total ? items : items.slice(0, count),
    hasMore,
    shown: Math.min(count, total),
    total,
    sentinelRef,
  };
}
