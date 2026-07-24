import { stripHtml } from "./html";

/**
 * Canonical slug from arbitrary text (handles HTML-laden titles, e.g. legacy
 * WordPress imports where a title is `<strong>…</strong>`). Trimmed on both
 * ends — use for auto-generating from a title.
 */
export function slugify(input: unknown): string {
  return stripHtml(input)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Slug for a field the user is actively typing into. Same normalisation but
 * keeps a single trailing hyphen so you can type a space between words without
 * it being stripped (which would make the next word merge onto the previous).
 */
export function slugifyInput(input: string): string {
  const trailing = /[^a-z0-9]$/i.test(input); // user just typed a separator
  const core = slugify(input);
  return trailing && core ? `${core}-` : core;
}
