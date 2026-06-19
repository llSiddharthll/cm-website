import { Router } from "express";
import { asyncHandler, ApiError } from "../lib/http";
import { getCollection, type Collection } from "../schema";
import { optionalAuth, requireAuth } from "../middleware/auth";
import { validateData } from "../lib/validate";
import {
  createEntry,
  deleteEntry,
  getEntry,
  getSingleton,
  listEntries,
  putSingleton,
  reorder,
  updateEntry,
  type ListOptions,
} from "../store";

export const contentRouter = Router();

const RESERVED = new Set(["status", "q", "limit", "offset", "sort"]);

function requireCollection(slug: string): Collection {
  const col = getCollection(slug);
  if (!col) throw new ApiError(404, `Unknown collection: ${slug}`);
  return col;
}

/* ── List / read singleton ── */
contentRouter.get(
  "/:collection",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    const isAuthed = Boolean(req.user);

    // Private collections (leads, subscribers) require auth to read.
    if (col.public === false && !isAuthed) throw new ApiError(401, "Authentication required");

    if (col.kind === "singleton") {
      const entry = await getSingleton(col.slug);
      return res.json(entry);
    }

    const filters: Record<string, string> = {};
    for (const [k, v] of Object.entries(req.query)) {
      if (!RESERVED.has(k) && typeof v === "string") filters[k] = v;
    }

    const opts: ListOptions = {
      q: typeof req.query.q === "string" ? req.query.q : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      offset: req.query.offset ? Number(req.query.offset) : undefined,
      filters,
    };
    // Public callers only ever see published content.
    if (!isAuthed) opts.status = "published";
    else if (typeof req.query.status === "string" && req.query.status !== "all")
      opts.status = req.query.status;

    const items = await listEntries(col.slug, opts);
    res.json(items);
  }),
);

/* ── Read one ── */
contentRouter.get(
  "/:collection/:id",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    if (col.public === false && !req.user) throw new ApiError(401, "Authentication required");
    const entry = await getEntry(col.slug, req.params.id);
    if (!entry) throw new ApiError(404, "Not found");
    if (!req.user && entry._status !== "published") throw new ApiError(404, "Not found");
    res.json(entry);
  }),
);

/* ── Create ── */
contentRouter.post(
  "/:collection",
  requireAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    const data = validateData(col, req.body?.data ?? req.body ?? {});
    const status = typeof req.body?.status === "string" ? req.body.status : "published";

    if (col.kind === "singleton") {
      const entry = await putSingleton(col, data);
      return res.status(200).json(entry);
    }
    const entry = await createEntry(col, data, status);
    res.status(201).json(entry);
  }),
);

/* ── Update singleton (no id) ── */
contentRouter.put(
  "/:collection",
  requireAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    if (col.kind !== "singleton") throw new ApiError(400, "Missing entry id");
    const data = validateData(col, req.body?.data ?? req.body ?? {});
    const entry = await putSingleton(col, data);
    res.json(entry);
  }),
);

/* ── Reorder ── */
contentRouter.post(
  "/:collection/reorder",
  requireAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    const ids = req.body?.ids;
    if (!Array.isArray(ids)) throw new ApiError(422, "ids must be an array");
    await reorder(col.slug, ids.map(String));
    res.json({ ok: true });
  }),
);

/* ── Update one ── */
contentRouter.put(
  "/:collection/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    const partial = req.body?.partial === true;
    const data = validateData(col, req.body?.data ?? req.body ?? {}, partial);
    const status = typeof req.body?.status === "string" ? req.body.status : undefined;
    const entry = await updateEntry(col, req.params.id, data, status);
    if (!entry) throw new ApiError(404, "Not found");
    res.json(entry);
  }),
);

/* ── Delete ── */
contentRouter.delete(
  "/:collection/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const col = requireCollection(req.params.collection);
    const ok = await deleteEntry(col.slug, req.params.id);
    if (!ok) throw new ApiError(404, "Not found");
    res.json({ ok: true });
  }),
);
