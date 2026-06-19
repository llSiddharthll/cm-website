import type { NextFunction, Request, Response } from "express";
import { verifyToken, type AdminUser } from "../lib/auth";
import { ApiError } from "../lib/http";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AdminUser;
    }
  }
}

function tokenFrom(req: Request): string | null {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) return header.slice(7);
  return null;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const token = tokenFrom(req);
  if (!token) throw new ApiError(401, "Authentication required");
  const user = verifyToken(token);
  if (!user) throw new ApiError(401, "Invalid or expired token");
  req.user = user;
  next();
}

/** Sets req.user when a valid token is present; never rejects. */
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = tokenFrom(req);
  if (token) {
    const user = verifyToken(token);
    if (user) req.user = user;
  }
  next();
}
