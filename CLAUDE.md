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

## Growth & Monetization Roadmap
Monetization is **not yet wired up**. Affiliate Disclosure exists, but no ad/affiliate code is live. Plan below; items marked « manual » must be done by the user (account creation/approval can't be automated).

### Accounts to create manually (user action)
- **Amazon Associates** — register at affiliate-program.amazon.com. Requires an active site with real content + some traffic; approval typically takes a few days. Apply under the live domain (eco-pet-site-r7xqsk6w4-blooging.vercel.app or the custom domain once set).
- **ShareASale** — register as an affiliate at shareasale.com, then apply to individual merchants (each merchant approves separately). Pick merchants matching the 6 categories (pet, cleaning, garden, organization, DIY, product guides).
- **Stripe** — create a Stripe account and complete verification (business details + payout bank account) before any live charges.

### Tags / keys to insert once obtained
- **Amazon Associates Tracking ID** (e.g. `practicallvg-20`) → store as `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`; a small affiliate-link helper should append it to every Amazon URL so product links stay tagged and compliant.
- **ShareASale Affiliate ID** (your numeric affiliate #) + per-merchant affiliate link URLs → insert merchant links into the relevant articles.
- **Stripe keys** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (browser-safe, `pk_live_…`) and `STRIPE_SECRET_KEY` (`sk_live_…`, **server-only, never NEXT_PUBLIC_**). Add a webhook signing secret only if using webhooks.
- All of the above go into Vercel **Production** env vars **and** `.env.local` (gitignored) — never commit secrets.

### Next actions
1. Add real **AdSense / affiliate ad slots** into article + homepage layouts (see Next Session).
2. Centralize affiliate tagging behind one helper + env var so links stay consistent and the Affiliate Disclosure page remains accurate as programs are added.
3. Decide Stripe use case (donations « support us », one-time product sales, or subscriptions) and add a server-side checkout endpoint — keep the secret key server-only.
4. Apply to the first 2–3 merchants per category; insert links only after approval.
5. Re-verify the live Affiliate Disclosure + Editorial Policy pages still match reality after each program goes live.

### Scaffolding in place (2026-07-20)
Code is ready so inserting keys is a one-step deploy, not a rewrite:
- `src/lib/affiliate.ts` — `amazonUrl()`, `withAmazonTag()`, `shareasaleUrl()` (read `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` / `NEXT_PUBLIC_SHAREASALE_AFFILIATE_ID`).
- `src/lib/stripe.ts` — server-only (`import 'server-only'`) Stripe helper; `createDonationSession()` for a one-time "support us" checkout. Throws clearly if `STRIPE_SECRET_KEY` unset.
- `src/app/api/stripe/checkout/route.ts` — `POST` handler (Node runtime) → returns Stripe Checkout URL.
- `src/components/SupportButton.tsx` — client button; renders **nothing** until `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set (so the live site is unchanged until keys are added + redeployed). Mounted in `SiteFooter`.
- `.env.example` — committed template listing all Supabase + monetization vars (no secrets).
- `stripe` added to dependencies. Build passes (16 routes incl. `/api/stripe/checkout`).
**To activate:** set the 4 monetization env vars in Vercel Production + `.env.local`, commit any article link updates using the affiliate helpers, then `vercel deploy --prod`.

## Session Summary (2026-07-20)
Completed the entire "Next Session Priorities" backlog from the prior session: audit (clean), static-page content, hero update, draft review/publish (8 total, remapped to Pet Care), build, and Vercel deploy. The production 500 was a missing-env-vars issue (not Vercel Authentication) — resolved by setting the 4 Supabase env vars in Vercel. Site is live and public: https://eco-pet-site-r7xqsk6w4-blooging.vercel.app
