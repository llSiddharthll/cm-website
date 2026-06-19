import express from "express";
import cors from "cors";
import { env } from "./env";
import { migrate } from "./db";
import { ensureBootstrapAdmin } from "./lib/auth";
import { cloudinaryEnabled } from "./lib/cloudinary";
import { notFound, errorHandler } from "./middleware/error";
import { authRouter } from "./routes/auth";
import { schemaRouter } from "./routes/schema";
import { contentRouter } from "./routes/content";
import { mediaRouter } from "./routes/media";
import { overviewRouter } from "./routes/overview";
import { intakeRouter } from "./routes/intake";

const app = express();

const allowed = new Set(env.corsOrigins);
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / curl / server-to-server (no Origin header)
      if (!origin) return cb(null, true);
      if (allowed.has(origin)) return cb(null, true);
      // allow any Vercel preview/production domain
      try {
        const host = new URL(origin).hostname;
        if (host.endsWith(".vercel.app") || host === "localhost" || host.endsWith(".localhost"))
          return cb(null, true);
      } catch {
        /* ignore */
      }
      return cb(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "2mb" }));

app.get("/", (_req, res) => {
  res.json({ name: "Creative Monk API", status: "ok" });
});
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, cloudinary: cloudinaryEnabled, time: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/schema", schemaRouter);
app.use("/api/overview", overviewRouter);
app.use("/api/media", mediaRouter);
app.use("/api/intake", intakeRouter);
app.use("/api/content", contentRouter);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await migrate();
  await ensureBootstrapAdmin();
  app.listen(env.port, () => {
    console.log(`[cm-backend] listening on http://localhost:${env.port} (${env.nodeEnv})`);
    console.log(`[cm-backend] cloudinary: ${cloudinaryEnabled ? "enabled" : "disabled"}`);
  });
}

start().catch((err) => {
  console.error("[cm-backend] failed to start:", err);
  process.exit(1);
});
