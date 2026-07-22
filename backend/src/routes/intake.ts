import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../lib/http";
import { getCollection } from "../schema";
import { createEntry, listEntries } from "../store";
import { verifyTurnstile } from "../lib/turnstile";

export const intakeRouter = Router();

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
