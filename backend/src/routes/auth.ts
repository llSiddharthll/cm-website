import { Router } from "express";
import { z } from "zod";
import { asyncHandler, ApiError } from "../lib/http";
import { signToken, verifyCredentials } from "../lib/auth";
import { requireAuth } from "../middleware/auth";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    const user = await verifyCredentials(email, password);
    if (!user) throw new ApiError(401, "Invalid email or password");
    const token = signToken(user);
    res.json({ token, user });
  }),
);

authRouter.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({ user: req.user });
  }),
);
