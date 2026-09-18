/**
 * One-off migration EXPORT: dump the whole DB (entries + admin users + media)
 * to a JSON file. Run locally against the source DB (e.g. Turso) — reads only.
 *   npx tsx src/migrate-export.ts turso-dump.json
 * Pair with migrate-import.ts on the destination (the new embedded file DB).
 */
import { writeFileSync } from "node:fs";
import { db } from "./db";

type Row = Record<string, unknown>;
const pick = (rows: Row[], keys: string[]) =>
  rows.map((r) => Object.fromEntries(keys.map((k) => [k, (r as Row)[k] ?? null])));

async function main() {
  const out = process.argv[2] || "turso-dump.json";
  const entries = (
    await db.execute(
      "SELECT id, collection, slug, position, status, data, created_at, updated_at FROM entries",
    )
  ).rows as unknown as Row[];
  let admins: Row[] = [];
  let media: Row[] = [];
  try {
    admins = (
      await db.execute("SELECT id, email, password_hash, name, created_at FROM admin_users")
    ).rows as unknown as Row[];
  } catch {
    /* table may not exist */
  }
  try {
    media = (
      await db.execute(
        "SELECT id, public_id, url, resource_type, format, bytes, width, height, folder, original_filename, created_at FROM media",
      )
    ).rows as unknown as Row[];
  } catch {
    /* table may not exist */
  }

  const dump = {
    entries: pick(entries, [
      "id",
      "collection",
      "slug",
      "position",
      "status",
      "data",
      "created_at",
      "updated_at",
    ]),
    admin_users: pick(admins, ["id", "email", "password_hash", "name", "created_at"]),
    media: pick(media, [
      "id",
      "public_id",
      "url",
      "resource_type",
      "format",
      "bytes",
      "width",
      "height",
      "folder",
      "original_filename",
      "created_at",
    ]),
  };
  writeFileSync(out, JSON.stringify(dump));
  console.log(
    `[export] entries=${dump.entries.length} admins=${dump.admin_users.length} media=${dump.media.length} -> ${out}`,
  );
  process.exit(0);
}

main().catch((e) => {
  console.error("[export] failed:", e);
  process.exit(1);
});
