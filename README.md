# EcoPet — Sustainable Pet Supplies

A Next.js (App Router) site for eco-friendly pet product guides and reviews.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Public site: `/`, `/about`, `/article/[slug]`
Admin (demo, in-memory): `/admin/login`, `/admin/articles`, `/admin/new`

## Vercel deployment

1. Push this repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repository.
3. Vercel auto-detects Next.js. Use these settings (defaults are usually correct):
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install`
4. Add environment variables (see below), then click **Deploy**.
5. For subsequent deploys, push to the connected branch or use **Redeploy** in the dashboard.

No special adapter is required — Vercel supports Next.js natively.

## Environment variables

Set these in the Vercel dashboard (**Project → Settings → Environment Variables**)
and redeploy after adding them:

| Name             | Required | Notes                                              |
| ---------------- | -------- | -------------------------------------------------- |
| `ADMIN_USERNAME` | no       | Admin login user. Defaults to `admin`.             |
| `ADMIN_PASSWORD` | no       | Admin login password. Defaults to `password123`.   |

> Note: the admin area is a client-side demo using in-memory data. Before
> production, move auth to a server route and replace the article store with a
> real database/CMS. Do not rely on `ADMIN_PASSWORD` as a security control yet.
