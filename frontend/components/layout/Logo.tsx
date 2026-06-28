import { cn } from "@/lib/utils";

/**
 * Full Creative Monk wordmark logo. Two versions swap automatically with the
 * active theme — white "creative" on dark surfaces, black on light — via the
 * `[data-theme]` rules in globals.css. The `invert` prop is accepted for
 * backward-compat but no longer used (the swap is theme-driven).
 */
export function Logo({ className }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-cm-dark.png"
        alt="Creative Monk"
        width={480}
        height={132}
        className="logo-cm--dark h-7 w-auto shrink-0 object-contain md:h-8"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-cm-light.png"
        alt=""
        aria-hidden
        width={480}
        height={132}
        className="logo-cm--light h-7 w-auto shrink-0 object-contain md:h-8"
      />
    </span>
  );
}
