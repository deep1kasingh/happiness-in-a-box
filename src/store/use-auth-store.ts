"use client";

import { create } from "zustand";
import type { User } from "@/types";
import { storage } from "@/lib/storage";
import { authApi, getSessionForHydrate, signOutAuth } from "@/features/auth/api";

export interface AuthState {
  user: User | null;
  hydrated: boolean;
  error: string | null;
}

export interface AuthActions {
  hydrate: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  hydrated: false,
  error: null,

  hydrate: async () => {
    const session = await getSessionForHydrate();
    if (session?.user) {
      set({ user: session.user, hydrated: true });
    } else {
      set({ hydrated: true });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const result = await authApi.login({ email, password });
      if (!result.ok) {
        set({ error: result.error });
        return false;
      }
      if (
        typeof process !== "undefined" &&
        process.env.NEXT_PUBLIC_USE_SUPABASE !== "true"
      ) {
        storage.setAuthSession({ user: result.user, token: result.token });
      }
      set({ user: result.user, error: null });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      set({ error: message });
      return false;
    }
  },

  register: async (email, password) => {
    set({ error: null });
    try {
      const result = await authApi.register({ email, password });
      if (!result.ok) {
        set({ error: result.error });
        return false;
      }
      if (
        typeof process !== "undefined" &&
        process.env.NEXT_PUBLIC_USE_SUPABASE !== "true"
      ) {
        storage.setAuthSession({ user: result.user, token: result.token });
      }
      set({ user: result.user, error: null });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Try again.";
      set({ error: message });
      return false;
    }
  },

  logout: async () => {
    await signOutAuth();
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
