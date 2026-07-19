# Practical Living Guide

## Tech stack
- **Next.js 14** (App Router), React 18, TypeScript
- **Supabase** — Postgres (articles table) + Auth (admin login)
- **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme` tokens)
- **Vitest** for tests (`npm run test`)

## Current status
- **Local dev only** — not deployed, not pushed to GitHub with the latest changes.
- Working tree has uncommitted work (cover-image feature + 8 seed drafts).

## Categories
- Home & Cleaning
- Organization & Storage
- Pet Care
- Garden & Outdoor
- DIY & Simple Repairs
- Product Guides

## Recent fixes / known blockers
- **service_role key** — `.env.local` `SUPABASE_SERVICE_ROLE_KEY` must be the real `sb_secret_…` service-role key so the admin can bypass RLS and read drafts (it was briefly set to the anon key, which hid all drafts). It is now corrected. Never expose this secret to the client.
- **Disk space (ENOSPC)** — happened twice. Fix: clear the regenerable `.next` cache and `node_modules/.cache`. Build needs `NODE_OPTIONS=--max-old-space-size=4096` on this low-RAM machine.
- **Admin articles page "Internal Server Error"** — root cause was a **crashed dev server** (every route 500'd, including home). Not a code/column bug. Fixed by restarting `npm run dev`. The new `cover_image_url` column and the 8 drafts were not the cause (`mapRowToArticle` handles the column; `ArticlesManager` doesn't render it).

## Key commands
- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build (use `NODE_OPTIONS=--max-old-space-size=4096`)
- `npm run test` — run Vitest

## Important rules
- **Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.** Server-only (`createServiceSupabase`); anon key is for the browser.
- **Never auto-publish articles.** Scripts/seed insert as `status = 'draft'` only. Publishing is a deliberate admin action.
- **Blue ocean content strategy required for new articles** — every article needs a *specific, differentiated angle* (e.g. "home-compostable bags certified for backyard bins", not "best dog bags"). Avoid generic/commoditized topics; match the angle-based approach used for the 8 seed drafts. Use only free, commercially-safe cover images (Unsplash/Pexels direct CDN URLs), verified HTTP 200.

## What was just completed
- Added `cover_image_url` column via `supabase/migrations/0002_add_cover_image.sql` (also created by `scripts/seed-drafts.sql`).
- Wired `coverImageUrl` through the `Article` type, `mapRowToArticle`, `createArticle`/`updateArticle`, validation, and the admin editor.
- Rendered cover images with `next/image` in `ArticleCard` (featured + standard) and the article hero, with descriptive `alt` and Leaf fallback.
- Generated **8 draft articles** with specific angles, SEO slugs, value-stating excerpts, category, and Unsplash covers (`scripts/seed-drafts.sql` + `scripts/seed-drafts.mjs`).
- Restarted the crashed dev server; `/`, `/admin/login`, `/admin/articles` all respond (home 200, login 200, articles 307 when unauthenticated).

## Next planned step
- Confirm `/admin/articles` shows the 8 drafts with a real `sb_secret_…` service-role key (RLS bypass). Then review/refine the drafts and only publish deliberately — never auto-publish.
- (Optional) Commit and push the cover-image feature + seed drafts to GitHub once verified.

## Next Session Priorities
1. Audit every button and interactive element site-wide (header nav, footer links, homepage CTAs like "Explore guides" and "Our editorial standards", article page buttons, admin panel buttons) and list which ones are broken, dead links, or do nothing.
2. Fix all broken buttons found.
3. Fill in real, complete content for static pages: About, Privacy Policy, Editorial Policy, Affiliate Disclosure, Contact — currently these are placeholder or incomplete.
4. Update homepage hero description to reflect all 6 categories, not just pets (still pending from last session).
5. Review and publish remaining 7 draft articles.
6. Only after all this: deploy to Vercel.
