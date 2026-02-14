"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Something went wrong
      </h1>
      <p className="mt-3 text-stone-600 dark:text-stone-400">
        An unexpected error occurred. You can try again or head back home.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-xl bg-warmth-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-warmth-600 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-sm font-medium text-warmth-600 hover:underline"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
