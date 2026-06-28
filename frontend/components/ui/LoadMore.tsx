import { cn } from "@/lib/utils";

/**
 * Sentinel + status row for infinite-scroll lists. Attach `sentinelRef` from
 * useInfiniteList. Shows pulsing dots while more is loading, then a quiet
 * end-of-list count.
 */
export function LoadMore({
  sentinelRef,
  hasMore,
  shown,
  total,
  noun = "items",
  className,
}: {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  shown: number;
  total: number;
  noun?: string;
  className?: string;
}) {
  return (
    <div
      ref={sentinelRef}
      className={cn("flex flex-col items-center gap-3 pt-16", className)}
      aria-live="polite"
    >
      {hasMore ? (
        <>
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-1.5 animate-bounce rounded-full bg-orange [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-orange [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-orange" />
          </span>
          <span className="mono text-on-ink-3">
            Loading more — {shown} of {total}
          </span>
        </>
      ) : (
        total > 0 && (
          <span className="mono text-on-ink-3">
            {total} {total === 1 ? noun.replace(/s$/, "") : noun} · end
          </span>
        )
      )}
    </div>
  );
}
