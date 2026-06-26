/* One-off: replace placeholder social proof with REAL data pulled from Google +
   their own site. Run: npm run seed:content  (safe to re-run). */
import { db, migrate } from "./db";
import { getCollection } from "./schema";
import { createEntry, putSingleton } from "./store";
import {
  REAL_REVIEWS,
  REAL_REVIEW_SUMMARY,
  REAL_STATS,
  REAL_AWARDS,
  REAL_CERTS,
  REAL_LOCATIONS,
} from "./data/proof";

const clone = (x: unknown) => JSON.parse(JSON.stringify(x)) as Record<string, unknown>;

async function reseed(slug: string, rows: readonly unknown[]) {
  const col = getCollection(slug);
  if (!col) throw new Error(`unknown collection ${slug}`);
  await db.execute({ sql: "DELETE FROM entries WHERE collection = ?", args: [slug] });
  for (const r of rows) await createEntry(col, clone(r));
  console.log(`[seed:content] ${slug}: ${rows.length} rows`);
}

async function single(slug: string, data: unknown) {
  const col = getCollection(slug);
  if (!col) throw new Error(`unknown singleton ${slug}`);
  await putSingleton(col, clone(data));
  console.log(`[seed:content] singleton ${slug}`);
}

async function run() {
  await migrate();
  await reseed("reviews", REAL_REVIEWS);
  await reseed("stats", REAL_STATS);
  await reseed("awards", REAL_AWARDS);
  await reseed("certs", REAL_CERTS.map((name) => ({ name })));
  await single("review_summary", REAL_REVIEW_SUMMARY);
  await single("locations", REAL_LOCATIONS);
  console.log("[seed:content] done");
  process.exit(0);
}

run().catch((e) => {
  console.error("[seed:content] failed:", e);
  process.exit(1);
});
