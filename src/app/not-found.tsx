import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
        Page not found
      </h1>
      <p className="mt-3 text-stone-600 dark:text-stone-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-medium text-warmth-600 hover:underline"
      >
        Back to home
      </Link>
    </main>
  );
}
