# Happiness in a Box

Daily wellness tracking web app. Users follow "paths" (e.g., Happiness) containing ordered tasks, track streaks, and get milestone-based motivation.

## Tech Stack

Next.js 14 (App Router) · React 18 · TypeScript (strict) · Zustand · Tailwind CSS · Optional Supabase backend

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — ESLint (next/core-web-vitals)

No test framework is configured.

## Architecture

```
src/
  app/                  # Next.js App Router pages and layouts
    path/[slug]/        # Dynamic path detail page
  components/           # React UI components (auth, layout, motivation, streak, task)
  features/             # Domain modules (auth, paths, motivation)
  lib/                  # Framework-agnostic utilities (dates, streak, storage, supabase/)
  store/                # Zustand store (use-app-store.ts)
  types/                # TypeScript interfaces (path, task, streak, motivation, auth)
```

## Key Patterns

- **Storage abstraction**: `src/lib/storage.ts` wraps localStorage; swappable for other backends
- **Dual mode**: localStorage by default, Supabase when `NEXT_PUBLIC_USE_SUPABASE=true`
- **Pure utilities**: `src/lib/streak.ts` and `src/lib/dates.ts` are pure functions, reusable across platforms
- **Zustand persistence**: Store auto-persists completions to localStorage (or syncs via Supabase)
- **Framework-agnostic types**: `src/types/` contains no React dependencies

## Conventions

- Path alias: `@/*` maps to `./src/*`
- Custom Tailwind colors: `warmth` (orange), `calm` (teal)
- Fonts: Outfit (UI text), Fraunces (headings)
- Strict TypeScript with `isolatedModules`
- ESLint extends `next/core-web-vitals`
