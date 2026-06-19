import { randomUUID } from "crypto";
import { db, query, get } from "./db";
import { getCollection, type Collection } from "./schema";

export type Entry = {
  _id: string;
  _slug: string | null;
  _position: number;
  _status: string;
  _createdAt: string;
  _updatedAt: string;
  [key: string]: unknown;
};

type Row = {
  id: string;
  slug: string | null;
  position: number;
  status: string;
  data: string;
  created_at: string;
  updated_at: string;
};

function serialize(row: Row): Entry {
  const data = JSON.parse(row.data) as Record<string, unknown>;
  return {
    ...data,
    _id: row.id,
    _slug: row.slug,
    _position: row.position,
    _status: row.status,
    _createdAt: row.created_at,
    _updatedAt: row.updated_at,
  };
}

function now(): string {
  return new Date().toISOString();
}

function slugValue(col: Collection, data: Record<string, unknown>): string | null {
  if (!col.slugField) return null;
  const v = data[col.slugField];
  return v == null ? null : String(v);
}

export type ListOptions = {
  status?: string;
  q?: string;
  limit?: number;
  offset?: number;
  filters?: Record<string, string>;
};

export async function listEntries(
  collectionSlug: string,
  opts: ListOptions = {},
): Promise<Entry[]> {
  const col = getCollection(collectionSlug);
  const orderBy =
    col?.defaultSort === "created_desc"
      ? "created_at DESC"
      : col?.defaultSort === "created_asc"
        ? "created_at ASC"
        : "position ASC, created_at ASC";

  const where: string[] = ["collection = ?"];
  const args: (string | number)[] = [collectionSlug];
  if (opts.status) {
    where.push("status = ?");
    args.push(opts.status);
  }

  let sql = `SELECT * FROM entries WHERE ${where.join(" AND ")} ORDER BY ${orderBy}`;
  if (opts.limit) {
    sql += ` LIMIT ${Number(opts.limit)} OFFSET ${Number(opts.offset || 0)}`;
  }

  const rows = await query<Row>(sql, args);
  let entries = rows.map(serialize);

  // In-memory text search + field filters (collections are small).
  if (opts.q) {
    const needle = opts.q.toLowerCase();
    entries = entries.filter((e) =>
      JSON.stringify(e).toLowerCase().includes(needle),
    );
  }
  if (opts.filters) {
    for (const [key, val] of Object.entries(opts.filters)) {
      if (val === "" || val == null) continue;
      entries = entries.filter((e) => {
        const f = e[key];
        if (Array.isArray(f)) return f.map(String).includes(val);
        return String(f ?? "") === val;
      });
    }
  }
  return entries;
}

export async function getSingleton(collectionSlug: string): Promise<Entry | null> {
  const row = await get<Row>(
    "SELECT * FROM entries WHERE collection = ? LIMIT 1",
    [collectionSlug],
  );
  return row ? serialize(row) : null;
}

export async function getEntry(
  collectionSlug: string,
  idOrSlug: string,
): Promise<Entry | null> {
  const row = await get<Row>(
    "SELECT * FROM entries WHERE collection = ? AND (id = ? OR slug = ?) LIMIT 1",
    [collectionSlug, idOrSlug, idOrSlug],
  );
  return row ? serialize(row) : null;
}

async function nextPosition(collectionSlug: string): Promise<number> {
  const row = await get<{ m: number | null }>(
    "SELECT MAX(position) as m FROM entries WHERE collection = ?",
    [collectionSlug],
  );
  return (row?.m ?? -1) + 1;
}

export async function createEntry(
  col: Collection,
  data: Record<string, unknown>,
  status = "published",
): Promise<Entry> {
  const id = randomUUID();
  const ts = now();
  const position = await nextPosition(col.slug);
  await db.execute({
    sql: `INSERT INTO entries (id, collection, slug, position, status, data, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, col.slug, slugValue(col, data), position, status, JSON.stringify(data), ts, ts],
  });
  return (await getEntry(col.slug, id))!;
}

/** Upsert a singleton (create if absent, else update the single row). */
export async function putSingleton(
  col: Collection,
  data: Record<string, unknown>,
): Promise<Entry> {
  const existing = await getSingleton(col.slug);
  const ts = now();
  if (existing) {
    await db.execute({
      sql: `UPDATE entries SET data = ?, updated_at = ? WHERE id = ?`,
      args: [JSON.stringify(data), ts, existing._id],
    });
    return (await getSingleton(col.slug))!;
  }
  return createEntry(col, data);
}

export async function updateEntry(
  col: Collection,
  id: string,
  data: Record<string, unknown>,
  status?: string,
): Promise<Entry | null> {
  const existing = await getEntry(col.slug, id);
  if (!existing) return null;
  const ts = now();
  await db.execute({
    sql: `UPDATE entries SET slug = ?, data = ?, status = COALESCE(?, status), updated_at = ? WHERE id = ?`,
    args: [slugValue(col, data), JSON.stringify(data), status ?? null, ts, existing._id],
  });
  return getEntry(col.slug, existing._id);
}

export async function deleteEntry(collectionSlug: string, id: string): Promise<boolean> {
  const rs = await db.execute({
    sql: "DELETE FROM entries WHERE collection = ? AND id = ?",
    args: [collectionSlug, id],
  });
  return rs.rowsAffected > 0;
}

export async function reorder(collectionSlug: string, ids: string[]): Promise<void> {
  const ts = now();
  for (let i = 0; i < ids.length; i++) {
    await db.execute({
      sql: "UPDATE entries SET position = ?, updated_at = ? WHERE collection = ? AND id = ?",
      args: [i, ts, collectionSlug, ids[i]],
    });
  }
}

export async function countEntries(collectionSlug: string): Promise<number> {
  const row = await get<{ c: number }>(
    "SELECT COUNT(*) as c FROM entries WHERE collection = ?",
    [collectionSlug],
  );
  return row?.c ?? 0;
}
