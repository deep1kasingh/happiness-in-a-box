import Link from "next/link";
import { PATHS } from "@/features/paths/data";
import { AuthLinks } from "@/components/auth/AuthLinks";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-dvh max-w-lg px-4 pb-12 pt-8">
      <div className="mb-10 flex items-start justify-between gap-4">
        <header>
          <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Happiness in a Box
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Daily paths for mind, body and breath. Build streaks and grow.
          </p>
        </header>
        <AuthLinks />
      </div>

      <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Paths
          </h2>
          <ul className="space-y-3">
            {PATHS.filter((p) => p.active).map((path) => (
              <li key={path.id}>
                <Link
                  href={`/path/${path.slug}`}
                  className="flex items-center gap-4 rounded-2xl border-2 border-stone-200 bg-white p-4 transition hover:border-warmth-200 hover:shadow-md dark:border-stone-700 dark:bg-stone-800/50 dark:hover:border-warmth-800"
                >
                  <span className="text-3xl" aria-hidden>
                    {path.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-semibold text-stone-900 dark:text-stone-100">
                      {path.name}
                    </div>
                    <p className="mt-0.5 text-sm text-stone-600 dark:text-stone-400">
                      {path.description}
                    </p>
                  </div>
                  <span className="text-stone-400 dark:text-stone-500" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
      </section>
    </div>
  );
}
