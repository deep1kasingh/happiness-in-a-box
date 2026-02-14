import type { User } from "@/types";
import { getSupabaseClient } from "@/lib/supabase/client";

export type AuthResult = { ok: true; user: User } | { ok: false; error: string };

export async function supabaseSignUp(email: string, password: string): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase().trim(),
    password,
    options: { emailRedirectTo: undefined },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { ok: false, error: "An account with this email already exists." };
    }
    return { ok: false, error: error.message };
  }

  const user = data.user;
  if (!user?.email) return { ok: false, error: "Could not create account." };

  return {
    ok: true,
    user: { id: user.id, email: user.email },
  };
}

export async function supabaseSignIn(email: string, password: string): Promise<AuthResult> {
  const supabase = getSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase is not configured." };

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login")) {
      return { ok: false, error: "Invalid email or password." };
    }
    return { ok: false, error: error.message };
  }

  const user = data.user;
  if (!user?.email) return { ok: false, error: "Could not sign in." };

  return {
    ok: true,
    user: { id: user.id, email: user.email },
  };
}

export async function supabaseGetSession(): Promise<{ user: User } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user?.email) return null;

  return {
    user: { id: session.user.id, email: session.user.email },
  };
}

export async function supabaseSignOut(): Promise<void> {
  const supabase = getSupabaseClient();
  if (supabase) await supabase.auth.signOut();
}
