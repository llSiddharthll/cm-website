import { randomUUID } from "crypto";
import { Router } from "express";
import multer from "multer";
import { asyncHandler, ApiError } from "../lib/http";
import { requireAuth } from "../middleware/auth";
import { cloudinaryEnabled, destroyAsset, uploadBuffer } from "../lib/cloudinary";
import { db, get, query } from "../db";

export const mediaRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

type MediaRow = {
  id: string;
  public_id: string;
  url: string;
  resource_type: string | null;
  format: string | null;
  bytes: number | null;
  width: number | null;
  height: number | null;
  folder: string | null;
  original_filename: string | null;
  created_at: string;
};

mediaRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const type = typeof req.query.type === "string" ? req.query.type : null;
    const rows = type
      ? await query<MediaRow>(
          "SELECT * FROM media WHERE resource_type = ? ORDER BY created_at DESC",
          [type],
        )
      : await query<MediaRow>("SELECT * FROM media ORDER BY created_at DESC");
    res.json(rows);
  }),
);

mediaRouter.post(
  "/upload",
  requireAuth,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!cloudinaryEnabled) throw new ApiError(503, "Cloudinary is not configured");
    if (!req.file) throw new ApiError(422, "No file uploaded");

    const result = await uploadBuffer(req.file.buffer, req.file.originalname);
    const id = randomUUID();
    await db.execute({
      sql: `INSERT INTO media (id, public_id, url, resource_type, format, bytes, width, height, folder, original_filename, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id,
        result.public_id,
        result.url,
        result.resource_type,
        result.format,
        result.bytes,
        result.width ?? null,
        result.height ?? null,
        null,
        result.original_filename ?? null,
        new Date().toISOString(),
      ],
    });
    res.status(201).json({ id, ...result });
  }),
);

mediaRouter.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const row = await get<MediaRow>("SELECT * FROM media WHERE id = ?", [req.params.id]);
    if (!row) throw new ApiError(404, "Not found");
    await destroyAsset(row.public_id, row.resource_type || "image");
    await db.execute({ sql: "DELETE FROM media WHERE id = ?", args: [req.params.id] });
    res.json({ ok: true });
  }),
);
