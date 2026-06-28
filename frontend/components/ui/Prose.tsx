import { cn } from "@/lib/utils";

/** Renders admin-authored rich-text HTML with the shared prose typography. */
export function Prose({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn("cm-prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
