import { createClient, type Client, type InValue } from "@libsql/client";
import { env } from "./env";

export const db: Client = createClient({
  url: env.turso.url,
  authToken: env.turso.authToken,
});

/** Run a query and return typed rows as plain objects. */
export async function query<T = Record<string, unknown>>(
  sql: string,
  args: InValue[] = [],
): Promise<T[]> {
  const rs = await db.execute({ sql, args });
  return rs.rows as unknown as T[];
}

export async function get<T = Record<string, unknown>>(
  sql: string,
  args: InValue[] = [],
): Promise<T | null> {
  const rows = await query<T>(sql, args);
  return rows[0] ?? null;
}

export async function run(sql: string, args: InValue[] = []): Promise<void> {
  await db.execute({ sql, args });
}

const MIGRATIONS: string[] = [
  `CREATE TABLE IF NOT EXISTS entries (
    id TEXT PRIMARY KEY,
    collection TEXT NOT NULL,
    slug TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published',
    data TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_entries_collection ON entries (collection, position)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_entries_collection_slug
     ON entries (collection, slug) WHERE slug IS NOT NULL`,
  `CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    public_id TEXT NOT NULL,
    url TEXT NOT NULL,
    resource_type TEXT,
    format TEXT,
    bytes INTEGER,
    width INTEGER,
    height INTEGER,
    folder TEXT,
    original_filename TEXT,
    created_at TEXT NOT NULL
  )`,
];

export async function migrate(): Promise<void> {
  for (const sql of MIGRATIONS) {
    await db.execute(sql);
  }
}
