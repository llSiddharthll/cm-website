import { cn } from "@/lib/utils";

/**
 * Mono section label, optionally prefixed by an orange index (e.g. "01").
 * The index is a real structural device — use it where content is a sequence.
 */
export function Eyebrow({
  children,
  index,
  className,
  invert = false,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2.5",
        invert && "text-on-ink-2",
        className,
      )}
    >
      {index && <span className="text-orange">{index}</span>}
      {index && <span className="h-px w-5 bg-current opacity-40" aria-hidden />}
      {children}
    </span>
  );
}
