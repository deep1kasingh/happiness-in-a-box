"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/features/auth/api";
import { storage } from "@/lib/storage";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCreateAccount() {
    setMessage(null);
    setLoading(true);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setMessage("Please enter your email.");
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const result = await authApi.register({ email: trimmedEmail, password });

      if (!result.ok) {
        setMessage(result.error);
        setLoading(false);
        return;
      }

      if (process.env.NEXT_PUBLIC_USE_SUPABASE !== "true") {
        storage.setAuthSession({
          user: result.user,
          token: undefined,
        });
      }
      window.location.href = "/";
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200"
        >
          {message}
        </div>
      )}
      <div>
        <label htmlFor="register-email" className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-500 focus:border-warmth-500 focus:outline-none focus:ring-2 focus:ring-warmth-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-400"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="register-password" className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-500 focus:border-warmth-500 focus:outline-none focus:ring-2 focus:ring-warmth-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-400"
          placeholder="At least 6 characters"
        />
      </div>
      <div>
        <label htmlFor="register-confirm" className="mb-1 block text-sm font-medium text-stone-700 dark:text-stone-300">
          Confirm password
        </label>
        <input
          id="register-confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          minLength={6}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-500 focus:border-warmth-500 focus:outline-none focus:ring-2 focus:ring-warmth-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-400"
          placeholder="••••••••"
        />
      </div>
      <button
        type="button"
        onClick={handleCreateAccount}
        disabled={loading}
        className="w-full rounded-xl bg-warmth-500 px-4 py-3 font-semibold text-white transition hover:bg-warmth-600 focus:outline-none focus:ring-2 focus:ring-warmth-500 focus:ring-offset-2 disabled:opacity-70 dark:focus:ring-offset-stone-900"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>
      <p className="text-center text-sm text-stone-600 dark:text-stone-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-warmth-600 hover:underline dark:text-warmth-400">
          Log in
        </Link>
      </p>
    </div>
  );
}
