/**
 * Helpers for showing CMS values that may contain HTML.
 *
 * Rich-text fields (and some legacy WordPress-imported titles) hold markup.
 * Printing them with String() leaks tags like `<p>` / `<strong>` into the UI,
 * so plain-text contexts strip them and rich contexts render them.
 */

/** Strip tags and decode the common entities — for table cells, titles, previews. */
export function stripHtml(input: unknown): string {
  const s = String(input ?? "");
  if (!s.includes("<") && !s.includes("&")) return s;
  return s
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|tr)>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when a value carries markup worth rendering rather than printing. */
export function looksLikeHtml(value: unknown): boolean {
  return typeof value === "string" && /<[a-z][^>]*>/i.test(value);
}
