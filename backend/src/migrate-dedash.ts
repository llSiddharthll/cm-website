/**
 * One-off content sweep: replace em-dashes (—) with commas across ALL stored
 * content (every entry's JSON data), so live copy doesn't read as AI-generated.
 * En-dashes (–, used in number ranges) are left untouched.
 *   node dist/migrate-dedash.js
 */
import { db, query } from "./db";

function dedash(str: string): string {
  if (str.indexOf("—") === -1 && !/&mdash;|&#8212;|&#x2014;/i.test(str)) return str;
  let s = str.replace(/&mdash;|&#8212;|&#x2014;/gi, "—");
  s = s.replace(/([>"'`])\s*—\s*/g, "$1"); // leading dash after quote/tag → drop
  s = s.replace(/ *— */g, ", ");
  s = s.replace(/—/g, ", ");
  return s;
}

function walk(v: unknown): unknown {
  if (typeof v === "string") return dedash(v);
  if (Array.isArray(v)) return v.map(walk);
  if (v && typeof v === "object") {
    const o: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) o[k] = walk(val);
    return o;
  }
  return v;
}

async function main() {
  const rows = await query<{ id: string; data: string }>("SELECT id, data FROM entries");
  let updated = 0;
  for (const r of rows) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(r.data);
    } catch {
      continue;
    }
    const nextStr = JSON.stringify(walk(parsed));
    if (nextStr !== r.data) {
      await db.execute({
        sql: "UPDATE entries SET data = ?, updated_at = ? WHERE id = ?",
        args: [nextStr, new Date().toISOString(), r.id],
      });
      updated++;
    }
  }
  console.log(`[dedash] updated ${updated} of ${rows.length} entries`);
  process.exit(0);
}

main().catch((e) => {
  console.error("[dedash] failed:", e);
  process.exit(1);
});
