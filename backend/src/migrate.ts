import { migrate } from "./db";
import { ensureBootstrapAdmin } from "./lib/auth";

migrate()
  .then(ensureBootstrapAdmin)
  .then(() => {
    console.log("[migrate] done");
    process.exit(0);
  })
  .catch((err) => {
    console.error("[migrate] failed:", err);
    process.exit(1);
  });
