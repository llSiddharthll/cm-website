import { Router } from "express";
import { z } from "zod";
import multer from "multer";
import { asyncHandler } from "../lib/http";
import { getCollection } from "../schema";
import { createEntry, listEntries } from "../store";
import { verifyTurnstile } from "../lib/turnstile";
import { googleOAuthEnabled } from "../env";
import {
  consentUrl,
  exchangeCode,
  saveRefreshToken,
  driveConnected,
  uploadToDrive,
} from "../lib/gdrive";

export const intakeRouter = Router();

/* ── Public CV upload, applicants upload a résumé in one click; we store it in
   the studio's OWN Google Drive (owner-authorized) and return a shareable link. ── */
const cvUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

intakeRouter.post(
  "/upload",
  cvUpload.single("file"),
  asyncHandler(async (req, res) => {
    const file = (req as { file?: Express.Multer.File }).file;
    if (!file) return res.status(422).json({ error: "No file uploaded" });
    if (!ALLOWED_CV_TYPES.has(file.mimetype))
      return res.status(415).json({ error: "Please upload a PDF or Word document" });
    if (!(await driveConnected()))
      return res.status(503).json({ error: "Résumé upload isn’t set up yet." });
    const result = await uploadToDrive(file.buffer, file.originalname, file.mimetype);
    res.status(201).json({ url: result.url, name: result.name });
  }),
);

/* ── One-time owner authorization so uploads land in the studio's Drive ── */
intakeRouter.get("/gauth/start", (_req, res) => {
  if (!googleOAuthEnabled) return res.status(503).send("Google OAuth is not configured.");
  res.redirect(consentUrl());
});

intakeRouter.get(
  "/gauth/callback",
  asyncHandler(async (req, res) => {
    const code = typeof req.query.code === "string" ? req.query.code : "";
    if (!code) return res.status(400).send("Missing authorization code.");
    const refresh = await exchangeCode(code);
    await saveRefreshToken(refresh);
    res.type("html").send(
      `<div style="font-family:system-ui;max-width:32rem;margin:15vh auto;text-align:center">
        <h2>✅ Google Drive connected</h2>
        <p>Applicant CVs will now upload straight into this Google account's Drive.
        You can close this tab.</p>
      </div>`,
    );
  }),
);

intakeRouter.get(
  "/gauth/status",
  asyncHandler(async (_req, res) => {
    res.json({ configured: googleOAuthEnabled, connected: await driveConnected() });
  }),
);

/** Captcha token accompanying a public submission (stripped before storage). */
const turnstileToken = z.string().max(4096).optional().or(z.literal(""));

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(60).optional().or(z.literal("")),
  company: z.string().max(200).optional().or(z.literal("")),
  budget: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(5000).optional().or(z.literal("")),
  source: z.string().max(120).optional().or(z.literal("")),
  turnstileToken,
});

intakeRouter.post(
  "/contact",
  asyncHandler(async (req, res) => {
    const { turnstileToken: token, ...input } = contactSchema.parse(req.body);
    if (!(await verifyTurnstile(token, req.ip)))
      return res.status(400).json({ error: "Captcha verification failed" });
    const col = getCollection("leads")!;
    const entry = await createEntry(col, { ...input, status: "new" });
    res.status(201).json({ ok: true, id: entry._id });
  }),
);

const applySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(60).optional().or(z.literal("")),
  role: z.string().max(200).optional().or(z.literal("")),
  portfolio: z.string().max(500).optional().or(z.literal("")),
  linkedin: z.string().max(500).optional().or(z.literal("")),
  resume: z.string().max(500).optional().or(z.literal("")),
  message: z.string().max(5000).optional().or(z.literal("")),
  source: z.string().max(120).optional().or(z.literal("")),
  turnstileToken,
});

intakeRouter.post(
  "/apply",
  asyncHandler(async (req, res) => {
    const { turnstileToken: token, ...input } = applySchema.parse(req.body);
    if (!(await verifyTurnstile(token, req.ip)))
      return res.status(400).json({ error: "Captcha verification failed" });
    const col = getCollection("applications")!;
    const entry = await createEntry(col, { ...input, status: "new" });
    res.status(201).json({ ok: true, id: entry._id });
  }),
);

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().max(120).optional().or(z.literal("")),
});

intakeRouter.post(
  "/subscribe",
  asyncHandler(async (req, res) => {
    const input = subscribeSchema.parse(req.body);
    const col = getCollection("subscribers")!;
    // de-dupe by email
    const existing = await listEntries("subscribers", { filters: { email: input.email } });
    if (existing.length) return res.json({ ok: true, already: true });
    await createEntry(col, input);
    res.status(201).json({ ok: true });
  }),
);
