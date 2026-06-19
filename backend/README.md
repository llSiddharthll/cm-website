# Creative Monk — API (backend)

A small, schema-driven content API for the Creative Monk site. Express + TypeScript,
data in **Turso** (libSQL), media on **Cloudinary**, JWT-protected admin writes.

Hosted **separately** from the frontend (Render / Railway / Fly / a VPS / Docker).

## Stack

- **Express 4** + **TypeScript** (compiled to `dist/`)
- **Turso / libSQL** (`@libsql/client`) — a single `entries` document table + `admin_users` + `media`
- **Cloudinary** for image/video uploads
- **JWT** auth (`jsonwebtoken` + `bcryptjs`), **zod** validation

## How it works

Every content type is described once in [`src/schema.ts`](src/schema.ts) (the **schema
registry**). That single source of truth drives:

- validation of writes,
- the public data shapes the website reads,
- and the entire admin UI (tables, forms, filters, sheets) — the admin fetches
  `GET /api/schema` and renders itself.

Content is stored as JSON documents in the `entries` table, discriminated by
`collection`. Singletons (site settings, hero, …) are a single row; collections are
many rows ordered by `position`.

## Run locally

```bash
cp .env.example .env     # fill in Turso, Cloudinary, JWT, admin creds
npm install
npm run seed             # load the starter content into Turso (idempotent)
npm run dev              # http://localhost:4000
```

`npm run seed:force` wipes all entries and reseeds. A bootstrap admin
(`ADMIN_EMAIL` / `ADMIN_PASSWORD`) is created automatically on first boot.

## Scripts

| script | what |
| --- | --- |
| `npm run dev` | watch mode (tsx) |
| `npm run build` | compile to `dist/` |
| `npm start` | run the compiled server |
| `npm run migrate` | create tables + bootstrap admin |
| `npm run seed` / `seed:force` | load starter content |

## API

| method | path | auth | notes |
| --- | --- | --- | --- |
| GET | `/api/health` | – | health + cloudinary status |
| GET | `/api/schema` | – | the collection registry (drives the admin) |
| POST | `/api/auth/login` | – | `{ email, password }` → `{ token, user }` |
| GET | `/api/auth/me` | ✓ | current admin |
| GET | `/api/content/:collection` | public* | list (singleton → object). `?q=`, `?status=`, field filters |
| GET | `/api/content/:collection/:idOrSlug` | public* | one entry |
| POST | `/api/content/:collection` | ✓ | create (singleton → upsert) |
| PUT | `/api/content/:collection` | ✓ | update singleton |
| PUT | `/api/content/:collection/:id` | ✓ | update entry |
| DELETE | `/api/content/:collection/:id` | ✓ | delete entry |
| POST | `/api/content/:collection/reorder` | ✓ | `{ ids: [...] }` |
| GET | `/api/media` | ✓ | media library |
| POST | `/api/media/upload` | ✓ | multipart `file` → Cloudinary |
| DELETE | `/api/media/:id` | ✓ | remove asset |
| GET | `/api/overview` | ✓ | dashboard counts + recent leads |
| POST | `/api/intake/contact` | – | website contact form → a lead |
| POST | `/api/intake/subscribe` | – | newsletter sign-up |

\* `leads` and `subscribers` require auth to read. Public reads only ever return
`status = "published"` content.

## Deploy

**Docker** (works on Fly, Railway, Render, a VPS):

```bash
docker build -t cm-backend .
docker run -p 4000:4000 --env-file .env cm-backend
```

**Render / Railway (no Docker):** build `npm install && npm run build`,
start `npm start`, and set the env vars from `.env.example`. Set `CORS_ORIGINS`
to your frontend origin(s); any `*.vercel.app` origin is allowed automatically.

After the API has a public URL, point the frontend at it with
`NEXT_PUBLIC_API_URL=https://your-api-host`.
