# Happiness in a Box

A web app (and future native app) for daily paths: complete tasks, build streaks, and stay motivated.

## What it does

- **Paths**: Life areas like *Happiness* (more can be added). Each path has ordered tasks.
- **Tasks**: E.g. 10 min exercise, 10 min yoga, 25 min Sudarshan Kriya, 20 min meditation.
- **Streaks**: Consecutive days with all tasks completed. Current and longest streak are shown.
- **Motivation**: Milestones (3, 7, 14, 30, 100 days) and “next milestone” messaging.

- **Local/demo**: Data is in the browser (localStorage); no backend needed.
- **Production**: Use [Supabase](https://supabase.com) for auth and completions so progress syncs across devices. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure (modular, app-ready)

```
src/
├── app/                    # Next.js App Router (pages, layout)
├── components/             # UI components
│   ├── motivation/        # Progress ring, motivation messages
│   ├── providers/         # Hydration (store sync from storage)
│   ├── streak/            # Streak badge
│   └── task/              # Task card
├── features/              # Domain modules
│   ├── paths/             # Path + task data (seed), getters
│   └── motivation/        # Milestones data
├── lib/                   # Shared utilities (no React)
│   ├── dates.ts           # Date strings, helpers
│   ├── streak.ts          # Pure streak computation
│   └── storage.ts         # localStorage abstraction (swap for app)
├── store/                 # Zustand store (persisted)
└── types/                 # Shared TS types (paths, tasks, streaks, motivation)
```

- **Types** and **lib** are framework-agnostic so they can be moved into a shared package later (e.g. `packages/core`) for a React Native or Expo app.
- **Storage** is behind `src/lib/storage.ts`; replace with AsyncStorage or API when you add a backend or native app.
- **Zustand** works on both web and React Native; the same store shape can be reused.

## Adding more paths

1. In `src/features/paths/data.ts`:
   - Add a new entry to `PATHS` (id, slug, name, description, icon, color, `taskIds`).
   - Add a key to `TASKS_BY_PATH` with the same path id and an array of `Task` objects.
2. Paths with `active: true` show on the home page and are available at `/path/<slug>`.

## Production

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for deploying with localStorage only or with Supabase (auth + database), env vars, migration, and checklist.

## Future: turning this into an app

- **PWA**: `public/manifest.json` is already set up. Add a service worker (e.g. `next-pwa`) for full offline and “Add to home screen.”
- **Native app**: Extract `src/types`, `src/lib`, and store logic into a shared package. Build a React Native or Expo app that imports that package and uses the same APIs; point `storage` to AsyncStorage or your backend.
- **Backend**: Add an API (e.g. Next.js route handlers or a separate service) and replace `storage` with API calls; keep the same types and streak logic.

## Tech stack

- **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**
- **Zustand** for state, **date-fns** for dates
- **Supabase** (optional): auth + PostgreSQL for production
- Fonts: Outfit (UI), Fraunces (headings)
