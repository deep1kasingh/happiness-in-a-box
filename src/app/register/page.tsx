import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create account | Happiness in a Box",
  description: "Sign up for Happiness in a Box to save your progress and streaks.",
};

const RegisterForm = dynamic(
  () => import("@/components/auth/RegisterForm").then((m) => ({ default: m.RegisterForm })),
  { ssr: false, loading: () => <div className="text-stone-500">Loading form…</div> }
);

export default function RegisterPage() {
  return (
    <div className="mx-auto min-h-dvh max-w-md px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
      >
        ← Back
      </Link>
      <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
        Create account
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        Sign up to save your progress and streaks.
      </p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}
