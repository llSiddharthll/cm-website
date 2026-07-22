import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  isProd: (process.env.NODE_ENV || "development") === "production",

  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  turso: {
    url: required("TURSO_DATABASE_URL"),
    authToken: process.env.TURSO_AUTH_TOKEN || undefined,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_FOLDER || "creative-monk",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "dev-insecure-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  admin: {
    email: process.env.ADMIN_EMAIL || "admin@thecreativemonk.in",
    password: process.env.ADMIN_PASSWORD || "change-me",
    name: process.env.ADMIN_NAME || "Creative Monk Admin",
  },

  turnstile: {
    // Cloudflare Turnstile secret key. When unset, captcha verification is
    // skipped so public forms keep working before the keys are configured.
    secretKey: process.env.TURNSTILE_SECRET_KEY || "",
  },
};

export const turnstileEnabled = Boolean(env.turnstile.secretKey);

export const cloudinaryEnabled = Boolean(
  env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret,
);
