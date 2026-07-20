# Practical Living Guide

## Tech stack
- **Next.js 14** (App Router), React 18, TypeScript
- **Supabase** — Postgres (articles table) + Auth (admin login)
- **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme` tokens)
- **Vitest** for tests (`npm run test`)

## Current status
- **Deployed to Vercel (production, public).** Live URL: https://eco-pet-site-r7xqsk6w4-blooging.vercel.app
- All **8 articles published** (remapped to the "Pet Care" category).
- Static pages (About, Privacy, Editorial Policy, Affiliate Disclosure, Contact) filled with real content.

## Categories
- Home & Cleaning
- Organization & Storage
- Pet Care
- Garden & Outdoor
- DIY & Simple Repairs
- Product Guides

## Recent fixes / known blockers
- **Missing Vercel env vars (500 on every page, digest 1298635809)** — the production deploy initially had NO environment variables set in Vercel. Symptom: `Error: Variables manquantes : NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY`. Fixed by adding all 4 vars to Vercel (their Production env) via `vercel env add … production`, then `vercel deploy --prod`. Also: with Vercel Authentication enabled, the site is gated to logged-in Vercel users — disable it (Dashboard → Settings → Deployment Protection) for public access. **Always set env vars in Vercel on a fresh deploy.**
- **service_role key** — `.env.local` `SUPABASE_SERVICE_ROLE_KEY` must be the real `sb_secret_…` service-role key so the admin can bypass RLS and read drafts. Never expose this secret to the client.
- **Disk space (ENOSPC)** — happens on this low-RAM machine. Fix: clear the regenerable `.next` cache and `node_modules/.cache`. Build needs `NODE_OPTIONS=--max-old-space-size=4096`.
- **Crashed dev server** — a dead `npm run dev` process makes every route 500 (including home), indistinguishable from a code bug. Restart the dev server before assuming a code regression.

## Key commands
- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build (use `NODE_OPTIONS=--max-old-space-size=4096`)
- `npm run test` — run Vitest
- `vercel env add <VAR> production` — set a Vercel env var (do this for all 4 Supabase vars before first deploy)
- `vercel deploy --prod` — production deploy
- `vercel logs <url>` / `vercel inspect <url>` — diagnose runtime errors
- `node scripts/publish-drafts.mjs list|publish|remap` — review/publish/recategorize drafts via the service-role key in `.env.local`

## Important rules
- **Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client.** Server-only (`createServiceSupabase`); anon key is for the browser.
- **Never auto-publish articles.** Scripts/seed insert as `status = 'draft'` only. Publishing is a deliberate admin action.
- **Vercel needs the env vars too.** The Supabase keys are read at build/runtime server-side; a Vercel deploy with no env vars will 500. Set them in Vercel, not just `.env.local`.
- **Blue ocean content strategy required for new articles** — every article needs a *specific, differentiated angle* (e.g. "home-compostable bags certified for backyard bins", not "best dog bags"). Avoid generic/commoditized topics; match the angle-based approach used for the 8 seed drafts. Use only free, commercially-safe cover images (Unsplash/Pexels direct CDN URLs), verified HTTP 200.

## What was just completed
- Cover-image feature: `cover_image_url` column, wired through the `Article` type / `mapRowToArticle` / create+update / validation / admin editor, rendered with `next/image` in `ArticleCard` and the article hero (Leaf fallback).
- **Sitewide audit**: no dead links or broken buttons; all routes resolve; `/admin/*` correctly 307-redirects unauthenticated users.
- **Static pages** filled with real content: About (mission, 6 categories, how-we-work, 4 values), Privacy (data, cookies, retention, rights, children), Editorial Policy (research/test/independence/corrections), Affiliate Disclosure (what/how/independence), Contact (form + coordonnées).
- **Homepage hero** updated to reflect all 6 categories.
- **All 8 draft articles reviewed and published**; subcategories (Dogs/Cats/Small Pets) remapped to "Pet Care".
- **Deployed to Vercel** (env vars set in Production); live and verified (home, article, static pages all 200 with real content).

## Next Session
- Add **real AdSense / affiliate ad code** into article and homepage layouts (currently no ads wired up).
- Optional polish: author bylines, related-articles section, sitemap/robots, RSS.
- Monitor Vercel deployment health after the first real traffic.

## Session Summary (2026-07-20)
Completed the entire "Next Session Priorities" backlog from the prior session: audit (clean), static-page content, hero update, draft review/publish (8 total, remapped to Pet Care), build, and Vercel deploy. The production 500 was a missing-env-vars issue (not Vercel Authentication) — resolved by setting the 4 Supabase env vars in Vercel. Site is live and public: https://eco-pet-site-r7xqsk6w4-blooging.vercel.app
