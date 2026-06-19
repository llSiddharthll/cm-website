# Creative Monk

Monorepo for **Creative Monk** — a dark, premium, multi-page agency site plus a
schema-driven content API and admin dashboard.

```
CM-Website/
├── frontend/   Next.js 16 site + /admin dashboard  (deployed on Vercel)
└── backend/    Express + TypeScript content API     (hosted separately)
```

## frontend/ — site + admin

- **Next.js 16** (App Router) · React 19 · TypeScript · Tailwind v4 · Motion · GSAP/Lenis
- Public pages read content through `lib/cms.ts`, which fetches the API with ISR and
  **falls back to bundled static content** — so the site renders even with no backend.
- `/admin` is a schema-driven dashboard (Radix + shadcn-style UI): login, overview,
  search/filter tables, detail + edit side-sheets, Cloudinary media library.
- Set `NEXT_PUBLIC_API_URL` (browser/admin) and `API_URL` (server) to the deployed
  backend to go fully dynamic. See `frontend/.env.example`.

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000  ( /admin for the dashboard )
npm run build
```

Deployed on Vercel with **Root Directory = `frontend`**.

## backend/ — content API

- **Express + TypeScript**, data in **Turso** (libSQL), media on **Cloudinary**,
  JWT-protected admin writes.
- One schema registry (`src/schema.ts`) drives validation, the public data shapes,
  and the admin UI (served at `GET /api/schema`).

```bash
cd backend
cp .env.example .env   # Turso, Cloudinary, JWT, admin creds
npm install
npm run seed           # load starter content into Turso
npm run dev            # http://localhost:4000
```

Hosted **separately** (Render / Railway / Fly / Docker). See `backend/README.md`.

## Going live end-to-end

1. Deploy `backend/` somewhere with a public URL; set its env (Turso/Cloudinary/JWT/admin).
2. In the Vercel project, set `NEXT_PUBLIC_API_URL` and `API_URL` to that URL and redeploy.
3. The site now reads from the API and the admin at `/admin` is fully operational.
