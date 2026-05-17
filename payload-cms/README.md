# ZeroDay Payload CMS

Headless CMS that powers the pages and widgets of the ZeroDay marketing site.
Editors can create new pages, drop widgets onto them, and publish — the live
site fetches everything at runtime via the Payload REST API.

## Stack

- Payload 3 (Next.js 15 app router)
- PostgreSQL (Neon / Supabase / Railway / any Postgres)
- Local file uploads for media (swap to S3/R2 in `payload.config.ts` if needed)

## Local setup

```bash
cd payload-cms
cp .env.example .env        # fill DATABASE_URI + PAYLOAD_SECRET
npm install
npm run dev                 # admin at http://localhost:3001/admin
```

First boot will run migrations and prompt you to create the first admin user.

## Deploy

Any Node 20+ host works (Railway, Render, Fly, Vercel, a VPS). You only need:

1. A Postgres database (Neon free tier is enough to start).
2. The env vars from `.env.example`.
3. `npm run build && npm start`.

Once live, set its public URL as `PAYLOAD_API_URL` in the ZeroDay frontend
(via Lovable Cloud secrets) so the site can read pages from it.

## Built-in widgets

Each widget is defined in `payload.config.ts` and has a matching React
component in the frontend at `src/components/blocks/`. The two must share
the same `slug`.

| Slug | Purpose |
| --- | --- |
| `hero` | Headline + sub + dual CTA |
| `terminal` | Animated SSH-style terminal |
| `richText` | Lexical rich text |
| `image` | Single image with caption |
| `processSteps` | Numbered step list |
| `marquee` | Infinite scrolling strip |
| `selectedWorks` | Project card grid |
| `cta` | Call-to-action band |
| `spacer` | Vertical space |
| `html` | Raw HTML escape hatch |

### Adding a new widget

1. In `payload.config.ts`, define a new block object (give it a unique `slug`)
   and add it to `ALL_BLOCKS`.
2. In the frontend repo, create `src/components/blocks/<slug>.tsx`.
3. Register it in `src/components/blocks/block-renderer.tsx`.
4. Redeploy both. Editors will see the new widget in the admin immediately.

## Creating a page

1. Open `/admin` → **Pages → Create new**.
2. Set `slug`. Use `home` for the homepage; anything else becomes `/your-slug`.
3. Add widgets in the **Page widgets** field, in any order.
4. Set status to **Published** and save. The frontend revalidates on next request.
