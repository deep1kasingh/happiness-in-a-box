# MVP Roadmap

A phased plan to take Happiness in a Box from local project to public website.

---

## Current Status

| Area | Status | Notes |
|------|--------|-------|
| Auth (login/register) | Done | Dual mode — localStorage and Supabase |
| Task tracking & completions | Done | Toggle tasks, auto-persist |
| Streak calculation | Done | Current + longest, live streak logic |
| Milestone motivation | Done | 3, 7, 14, 30, 100-day milestones |
| Zustand persistence | Done | Auto-saves to localStorage or Supabase |
| Supabase schema + RLS | Done | Migration script, row-level security policies |
| Deployment docs | Done | `docs/DEPLOYMENT.md` |
| Build & lint | Done | `npm run build` and `npm run lint` pass clean |

---

## What's Missing

### Must-haves (before sharing publicly)

- [x] **Error pages** — `src/app/error.tsx` (error boundary) and `src/app/not-found.tsx` (404 page)
- [x] **Favicon & app icons** — dynamic icons via `src/app/icon.tsx` and `src/app/apple-icon.tsx`, PWA icons in manifest
- [x] **OG / Twitter meta tags** — dynamic OG image via `src/app/opengraph-image.tsx`, meta tags in layout
- [x] **robots.txt / sitemap** — `src/app/robots.ts` and `src/app/sitemap.ts`

### Should-haves (for real users)

- [ ] **Enable Supabase for production** — without it, users lose data on browser clear or device switch
- [ ] **PWA service worker** — manifest exists but no service worker; "Add to Home Screen" won't cache offline
- [ ] **Auth route guards** — protected pages are accessible without login (no Next.js middleware)

### Nice-to-haves

- [ ] **Analytics** — Vercel Analytics, Plausible, or similar
- [ ] **Error logging** — Sentry or LogRocket for production errors
- [ ] **Tests** — no test framework configured; `streak.ts` and `dates.ts` are good candidates
- [ ] **Reminder system** — types exist (`StoredMotivation.reminderEnabled`) but not implemented
- [ ] **More paths** — only "Happiness" exists; the data model supports adding more in `src/features/paths/data.ts`

---

## Launch Phases

### Phase 1 — Ship It (localStorage mode)

Goal: Get a public URL with a polished first impression.

1. Add `src/app/error.tsx` and `src/app/not-found.tsx`
2. Add favicon and app icons (192x192, 512x512)
3. Add OG and Twitter meta tags to `src/app/layout.tsx`
4. Add `public/robots.txt` and a basic sitemap
5. Deploy to Vercel — connect GitHub repo, no env vars needed
6. Share with friends for early feedback

**Result**: Live site at `your-app.vercel.app`, works with localStorage.

### Phase 2 — Add Persistence (Supabase)

Goal: Users can register, log in, and sync data across devices.

1. Create a Supabase project
2. Run the existing migration (`supabase/migrations/20250101000000_day_completions.sql`)
3. Set the 3 env vars in Vercel (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_USE_SUPABASE=true`)
4. Add Next.js middleware for auth route protection
5. Redeploy

**Result**: Registered users sync across devices; guests still use localStorage.

### Phase 3 — Polish

Goal: Production-grade reliability and engagement.

1. Install `next-pwa` and configure service worker
2. Add app icons to `public/manifest.json`
3. Add analytics (Vercel Analytics or Plausible)
4. Add error monitoring (Sentry)
5. Add unit tests for core logic (`streak.ts`, `dates.ts`)
6. Implement reminder/notification system
7. Add more wellness paths

**Result**: Offline-capable PWA with monitoring and a growing feature set.

---

## Quickstart: Deploy to Vercel Now

The app is deployable today in localStorage mode:

```bash
# Push to GitHub (if not already)
git push origin main

# Then in Vercel:
# 1. Import the GitHub repo
# 2. Framework preset: Next.js (auto-detected)
# 3. No env vars needed for localStorage mode
# 4. Deploy
```

See `docs/DEPLOYMENT.md` for Supabase setup when you're ready for Phase 2.
