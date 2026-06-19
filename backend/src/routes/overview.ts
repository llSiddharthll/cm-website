import { Router } from "express";
import { asyncHandler } from "../lib/http";
import { requireAuth } from "../middleware/auth";
import { SCHEMA } from "../schema";
import { query, get } from "../db";
import { listEntries } from "../store";

export const overviewRouter = Router();

overviewRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (_req, res) => {
    const countRows = await query<{ collection: string; c: number }>(
      "SELECT collection, COUNT(*) as c FROM entries GROUP BY collection",
    );
    const counts: Record<string, number> = {};
    for (const r of countRows) counts[r.collection] = r.c;

    const collections = SCHEMA.map((c) => ({
      slug: c.slug,
      name: c.name,
      pluralName: c.pluralName,
      group: c.group,
      icon: c.icon,
      kind: c.kind,
      count: counts[c.slug] ?? 0,
    }));

    const mediaRow = await get<{ c: number }>("SELECT COUNT(*) as c FROM media");
    const recentLeads = (await listEntries("leads", { limit: 6 })).slice(0, 6);
    const newLeads = (await listEntries("leads", { filters: { status: "new" } })).length;
    const subscribers = counts["subscribers"] ?? 0;

    res.json({
      collections,
      totals: {
        leads: counts["leads"] ?? 0,
        newLeads,
        subscribers,
        media: mediaRow?.c ?? 0,
        contentEntries: Object.entries(counts)
          .filter(([k]) => k !== "leads" && k !== "subscribers")
          .reduce((a, [, v]) => a + v, 0),
      },
      recentLeads,
    });
  }),
);
