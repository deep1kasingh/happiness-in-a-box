"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/use-auth-store";

export function AuthLinks() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (user) {
    return (
      <div className="flex shrink-0 items-center gap-2 text-sm">
        <span className="max-w-[120px] truncate text-stone-500 dark:text-stone-400" title={user.email}>
          {user.email}
        </span>
        <button
          type="button"
          onClick={() => void logout()}
          className="text-stone-500 underline hover:text-stone-700 dark:hover:text-stone-300"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="shrink-0 text-sm text-stone-500 dark:text-stone-400">
      <Link href="/login" className="hover:underline">
        Log in
      </Link>
      <span className="mx-1.5">·</span>
      <Link href="/register" className="hover:underline">
        Sign up
      </Link>
    </div>
  );
}
