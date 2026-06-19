import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, get } from "../db";
import { env } from "../env";

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
};

type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: string;
};

export async function findUserByEmail(email: string): Promise<UserRow | null> {
  return get<UserRow>("SELECT * FROM admin_users WHERE email = ? LIMIT 1", [
    email.toLowerCase(),
  ]);
}

export async function createUser(
  email: string,
  password: string,
  name?: string,
): Promise<AdminUser> {
  const id = randomUUID();
  const hash = await bcrypt.hash(password, 10);
  await db.execute({
    sql: "INSERT INTO admin_users (id, email, password_hash, name, created_at) VALUES (?, ?, ?, ?, ?)",
    args: [id, email.toLowerCase(), hash, name ?? null, new Date().toISOString()],
  });
  return { id, email: email.toLowerCase(), name: name ?? null };
}

/** Create the bootstrap admin from env on first boot, if no admin exists. */
export async function ensureBootstrapAdmin(): Promise<void> {
  const row = await get<{ c: number }>("SELECT COUNT(*) as c FROM admin_users");
  if ((row?.c ?? 0) > 0) return;
  await createUser(env.admin.email, env.admin.password, env.admin.name);
  console.log(`[auth] Bootstrap admin created: ${env.admin.email}`);
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<AdminUser | null> {
  const row = await findUserByEmail(email);
  if (!row) return null;
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return null;
  return { id: row.id, email: row.email, name: row.name };
}

export function signToken(user: AdminUser): string {
  return jwt.sign({ sub: user.id, email: user.email, name: user.name }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn as jwt.SignOptions["expiresIn"],
  });
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const payload = jwt.verify(token, env.jwt.secret) as jwt.JwtPayload;
    return {
      id: String(payload.sub),
      email: String(payload.email),
      name: (payload.name as string) ?? null,
    };
  } catch {
    return null;
  }
}
