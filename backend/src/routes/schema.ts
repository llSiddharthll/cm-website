import { Router } from "express";
import { SCHEMA } from "../schema";

export const schemaRouter = Router();

// Public: the admin fetches this to render every table, form and filter.
schemaRouter.get("/", (_req, res) => {
  res.json({ collections: SCHEMA });
});
