import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in | Happiness in a Box",
  description: "Sign in to your Happiness in a Box account.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto min-h-dvh max-w-md px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
      >
        ← Back
      </Link>
      <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
        Log in
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        Sign in to your Happiness in a Box account.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
