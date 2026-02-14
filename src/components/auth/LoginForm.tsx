"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/use-auth-store";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    clearError();
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        window.location.href = "/";
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200"
        >
          {error}
        </div>
      )}
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-500 focus:border-warmth-500 focus:outline-none focus:ring-2 focus:ring-warmth-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-400"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-500 focus:border-warmth-500 focus:outline-none focus:ring-2 focus:ring-warmth-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-400"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-warmth-500 px-4 py-3 font-semibold text-white transition hover:bg-warmth-600 focus:outline-none focus:ring-2 focus:ring-warmth-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-stone-900"
      >
        {loading ? "Logging in…" : "Log in"}
      </button>
      <p className="text-center text-sm text-stone-600 dark:text-stone-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-warmth-600 hover:underline dark:text-warmth-400">
          Sign up
        </Link>
      </p>
    </form>
  );
}
