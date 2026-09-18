/**
 * One-off migration IMPORT: load a JSON dump (from migrate-export.ts) into the
 * current DB (the embedded file DB on the VM). Idempotent (INSERT OR REPLACE).
 *   node dist/migrate-import.js /tmp/dump.json
 * Creates the schema first, so it is safe to run on a fresh DB.
 */
import { readFileSync } from "node:fs";
import { db, migrate } from "./db";

type Row = Record<string, unknown>;

async function main() {
  const path = process.argv[2] || "/tmp/dump.json";
  const dump = JSON.parse(readFileSync(path, "utf8")) as {
    entries?: Row[];
    admin_users?: Row[];
    media?: Row[];
  };
  await migrate();

  const entries = dump.entries ?? [];
  for (const e of entries) {
    const data = typeof e.data === "string" ? e.data : JSON.stringify(e.data);
    await db.execute({
      sql: `INSERT OR REPLACE INTO entries (id, collection, slug, position, status, data, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        e.id as string,
        e.collection as string,
        (e.slug ?? null) as string | null,
        (e.position ?? 0) as number,
        (e.status ?? "published") as string,
        data,
        e.created_at as string,
        e.updated_at as string,
      ],
    });
  }

  const admins = dump.admin_users ?? [];
  for (const a of admins) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO admin_users (id, email, password_hash, name, created_at)
            VALUES (?, ?, ?, ?, ?)`,
      args: [
        a.id as string,
        a.email as string,
        a.password_hash as string,
        (a.name ?? null) as string | null,
        a.created_at as string,
      ],
    });
  }

  const media = dump.media ?? [];
  for (const m of media) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO media (id, public_id, url, resource_type, format, bytes, width, height, folder, original_filename, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        m.id as string,
        m.public_id as string,
        m.url as string,
        (m.resource_type ?? null) as string | null,
        (m.format ?? null) as string | null,
        (m.bytes ?? null) as number | null,
        (m.width ?? null) as number | null,
        (m.height ?? null) as number | null,
        (m.folder ?? null) as string | null,
        (m.original_filename ?? null) as string | null,
        m.created_at as string,
      ],
    });
  }

  console.log(
    `[import] entries=${entries.length} admins=${admins.length} media=${media.length}`,
  );
  process.exit(0);
}

main().catch((e) => {
  console.error("[import] failed:", e);
  process.exit(1);
});
