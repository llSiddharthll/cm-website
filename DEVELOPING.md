# Developing Creative Monk

Onboarding for a developer joining the project. Read this top-to-bottom once.

## 1. Repos & where they run

| Repo | Contains | Deploys to |
| --- | --- | --- |
| **cm-website** (this monorepo) | `frontend/` (Next.js site + `/admin`) and `backend/` (the API source) | Vercel builds **`frontend/`** (project Root Directory = `frontend`) |
| **cm-backend** | A standalone copy of `backend/` | Render (free web service) — auto-deploys on push to `main` |

- **Live site + admin:** `https://cm-website-five.vercel.app` ( `/admin` for the dashboard )
- **Live API:** `https://cm-backend-an22.onrender.com`
- Data lives in **Turso** (libSQL); media on **Cloudinary**.

> ⚠️ The backend exists in two places. **Edit it in `cm-website/backend`** (the source of
> truth), then run `scripts/sync-backend.sh` to push it to `cm-backend` so Render deploys.
> Don't commit directly to `cm-backend`.

## 2. Prerequisites

- **Node 20+** (22 recommended) and npm
- git; optionally the GitHub CLI (`gh`)
- Access to the **secrets** (Turso token, Cloudinary keys, JWT secret, admin login) — these are
  **not in git**. Get `backend/.env` from the team, *or* use your own Turso + Cloudinary for an
  isolated dev environment (see below).

## 3. First-time setup

```bash
git clone https://github.com/llSiddharthll/cm-website.git
cd cm-website

# ── backend ──
cd backend
cp .env.example .env        # fill TURSO_*, CLOUDINARY_*, JWT_SECRET, ADMIN_*  (ask the team)
npm install
npm run seed                # loads starter content into Turso (idempotent, safe to re-run)
npm run dev                 # http://localhost:4000   (first Turso connect can take ~10s)

# ── frontend (new terminal) ──
cd ../frontend
cp .env.example .env.local  # set both to http://localhost:4000 (see file)
npm install
npm run dev                 # http://localhost:3000   ·   /admin for the dashboard
```

Admin login = `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env`.

**Want your own isolated data?** Create a free Turso DB (`turso db create`) and a Cloudinary
account, put their values in `backend/.env`, then `npm run seed:force`. Nothing else changes.

## 4. The one thing to understand: it's schema-driven

`backend/src/schema.ts` is the **single source of truth**. Each entry in `SCHEMA` describes a
content collection (its fields, types, labels). That one file drives **three** things:

1. **API validation** of writes,
2. the **public data shapes** the website reads,
3. the **entire admin UI** — the admin fetches `GET /api/schema` and renders its tables, forms,
   filters and sheets generically. **Add a collection to `schema.ts` → it shows up in the admin
   automatically**, no admin code needed.

Content is stored as JSON documents in one `entries` table (Turso), discriminated by `collection`.

**Data flow:** `Turso → backend API → frontend lib/cms.ts (ISR + static fallback) → server
components`. The admin writes back through the API (JWT-protected).

## 5. Project map

```
backend/src/
  schema.ts         ← collections (THE source of truth)
  store.ts          ← generic CRUD over the entries table
  routes/           ← auth, content (CRUD), media (Cloudinary), intake, overview, schema
  data/             ← seed content (service-pages.ts, case-sections.ts, …)
  seed.ts           ← loads data/* into Turso
frontend/
  lib/cms.ts        ← typed getters the site reads (fetch + fallback to bundled static content)
  app/              ← routes (server components). /admin is the dashboard.
  components/agency/ ← homepage + page sections
  components/work/   ← case-study blocks (Gallery, ScreenshotScroll, StatsGraph, …)
  components/admin/  ← the schema-driven admin (generic — rarely needs editing)
  app/globals.css    ← design tokens (dark theme, orange accent, type scale)
```

## 6. Common tasks (recipes)

- **Edit content (copy, images, stats):** use the **admin** at `/admin` — no code, writes to Turso.
- **Add a new content type (collection):**
  1. add a `Collection` to `backend/src/schema.ts` (+ a sidebar group entry in
     `frontend/components/admin/Shell.tsx` `PAGE_GROUPS`, and its lucide icon in
     `components/admin/Icon.tsx`);
  2. add a getter in `frontend/lib/cms.ts`;
  3. use it in a page. (Admin support is automatic.)
- **Add a new case-study block kind** (e.g. `video`): add it to the `kind` options on the
  `case_sections` collection in `schema.ts`, write a block component under
  `frontend/components/work/blocks/`, and add a branch in `components/work/CaseSections.tsx`.
- **Change the look:** edit tokens/helpers in `frontend/app/globals.css`. Design conventions are
  in `.claude/CLAUDE.md` (the `/awwwards` standard).

## 7. Deploy

```bash
# Frontend — just push the monorepo; Vercel auto-builds frontend/
git push origin master

# Backend — after committing backend changes, mirror to cm-backend (Render auto-deploys)
./scripts/sync-backend.sh "feat: my backend change"
```

Env vars: **Vercel** needs `NEXT_PUBLIC_API_URL` + `API_URL` (= the Render URL). **Render** needs
the backend secrets (Turso/Cloudinary/JWT/admin) — set in its dashboard.

## 8. Gotchas

- **Two backend copies** — edit in the monorepo, sync with `scripts/sync-backend.sh`. (Worth
  collapsing to one source later; ask before changing the deploy wiring.)
- **Render free tier sleeps** after ~15 min idle; the first request cold-starts (~30–50s) and can
  briefly fail CORS until warm. The public site stays up via `lib/cms.ts` static fallback. A free
  uptime pinger on `/api/health` keeps it warm.
- **Secrets are not in git** (`.env` files are gitignored). Share them out-of-band.
- **Service-page cover images** were set directly in Turso, not in seed data — a `seed:force`
  would not restore them (normal admin edits are safe).
- `next build` runs ESLint/TS strictly. The `text-[length:var(--text-*)]` lint suggestions are
  intentional — ignore them.
