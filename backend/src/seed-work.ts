/* One-off: replace placeholder work with the REAL client cases/galleries/video,
   and point every service-page cover at real client work.
   Run: npm run seed:work  (safe to re-run — it clears + re-inserts these collections). */
import { db, migrate } from "./db";
import { getCollection } from "./schema";
import { createEntry, updateEntry } from "./store";
import {
  REAL_CASES,
  REAL_CASE_SECTIONS,
  REAL_REELS,
  REAL_VIDEO_PROJECTS,
  SERVICE_COVERS,
  CLIENT_LOGOS,
  PORTFOLIO,
} from "./data/work";

const clone = (x: unknown) => JSON.parse(JSON.stringify(x)) as Record<string, unknown>;

async function reseed(slug: string, rows: readonly unknown[]) {
  const col = getCollection(slug);
  if (!col) throw new Error(`unknown collection ${slug}`);
  await db.execute({ sql: "DELETE FROM entries WHERE collection = ?", args: [slug] });
  for (const r of rows) await createEntry(col, clone(r));
  console.log(`[seed:work] ${slug}: ${rows.length} rows`);
}

async function run() {
  await migrate();

  await reseed("cases", REAL_CASES);
  await reseed("case_sections", REAL_CASE_SECTIONS);
  await reseed("portfolio", PORTFOLIO);
  await reseed("reels", REAL_REELS);
  await reseed("video_projects", REAL_VIDEO_PROJECTS);

  // service-page hero covers → real client work, pooled per category
  const col = getCollection("service_pages");
  if (col) {
    const rs = await db.execute(
      "SELECT id, data FROM entries WHERE collection = 'service_pages' ORDER BY position",
    );
    const counters: Record<string, number> = {};
    let updated = 0;
    for (const row of rs.rows as unknown as { id: string; data: string }[]) {
      const data = JSON.parse(row.data);
      const cat = String(data.category || "");
      const pool = SERVICE_COVERS[cat];
      if (!pool || !pool.length) continue;
      const i = counters[cat] ?? 0;
      data.cover = pool[i % pool.length];
      counters[cat] = i + 1;
      await updateEntry(col, String(row.id), data);
      updated++;
    }
    console.log(`[seed:work] service_pages covers updated: ${updated}`);
  }

  // client logos → set on matching clients
  const cl = getCollection("clients");
  if (cl) {
    const rs = await db.execute(
      "SELECT id, data FROM entries WHERE collection = 'clients'",
    );
    let logos = 0;
    for (const row of rs.rows as unknown as { id: string; data: string }[]) {
      const data = JSON.parse(row.data);
      const logo = CLIENT_LOGOS[String(data.name)];
      if (!logo || data.logo === logo) continue;
      data.logo = logo;
      await updateEntry(cl, String(row.id), data);
      logos++;
    }
    console.log(`[seed:work] client logos set: ${logos}`);
  }

  console.log("[seed:work] done");
  process.exit(0);
}

run().catch((e) => {
  console.error("[seed:work] failed:", e);
  process.exit(1);
});
