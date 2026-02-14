import type { User } from "@/types";
import { storage } from "@/lib/storage";
import * as supabaseAuth from "./supabase-auth";

function isSupabaseEnabled(): boolean {
  return (
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_USE_SUPABASE === "true" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type AuthResult = { ok: true; user: User; token?: string } | { ok: false; error: string };

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export const authApi = {
  async register({ email, password }: RegisterInput): Promise<AuthResult> {
    const normalized = email.toLowerCase().trim();
    if (!normalized || !password || password.length < 6) {
      return { ok: false, error: "Email and password (min 6 characters) are required." };
    }

    if (isSupabaseEnabled()) {
      return supabaseAuth.supabaseSignUp(normalized, password);
    }

    if (!isBrowser()) {
      return { ok: false, error: "Please try again." };
    }
    const users = storage.getAuthUsers();
    if (users[normalized]) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const user: User = { id: generateId(), email: normalized };
    storage.setAuthUser(normalized, { id: user.id, email: user.email, password });
    return { ok: true, user };
  },

  async login({ email, password }: LoginInput): Promise<AuthResult> {
    const normalized = email.toLowerCase().trim();
    if (!normalized || !password) {
      return { ok: false, error: "Email and password are required." };
    }

    if (isSupabaseEnabled()) {
      return supabaseAuth.supabaseSignIn(normalized, password);
    }

    if (!isBrowser()) {
      return { ok: false, error: "Please try again." };
    }
    const users = storage.getAuthUsers();
    const stored =
      users[normalized] ??
      Object.values(users).find((u) => u.email.toLowerCase().trim() === normalized);
    if (!stored) {
      return { ok: false, error: "No account found with this email. Please sign up first." };
    }
    if (stored.password !== password) {
      return { ok: false, error: "Incorrect password." };
    }
    const user: User = { id: stored.id, email: stored.email };
    return { ok: true, user };
  },
};

export async function getSessionForHydrate(): Promise<{ user: User } | null> {
  if (isSupabaseEnabled()) {
    return supabaseAuth.supabaseGetSession();
  }
  if (typeof window === "undefined") return null;
  const session = storage.getAuthSession();
  return session?.user ? { user: session.user } : null;
}

export async function signOutAuth(): Promise<void> {
  if (isSupabaseEnabled()) {
    await supabaseAuth.supabaseSignOut();
  } else if (typeof window !== "undefined") {
    storage.setAuthSession(null);
  }
}
