import { cn } from "@/lib/utils";

/**
 * Creative Monk logo: the orange monk glyph (theme-agnostic) + the wordmark
 * set in the display face, which inverts for dark surfaces.
 */
export function Logo({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt="Creative Monk"
        width={32}
        height={32}
        className="h-7 w-auto shrink-0 object-contain"
      />
      <span
        className={cn(
          "display text-[1.05rem] font-extrabold tracking-[-0.03em]",
          invert ? "text-on-ink" : "text-ink",
        )}
      >
        Creative&nbsp;Monk
      </span>
    </span>
  );
}
