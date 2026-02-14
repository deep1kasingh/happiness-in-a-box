"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";
import { useAuthStore } from "@/store/use-auth-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateApp = useAppStore((s) => s.hydrate);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await hydrateAuth();
      if (cancelled) return;
      const u = useAuthStore.getState().user;
      await hydrateApp(u?.id ?? "guest");
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateAuth, hydrateApp]);

  useEffect(() => {
    const bucket = user?.id ?? "guest";
    hydrateApp(bucket);
  }, [user?.id, hydrateApp]);

  return <>{children}</>;
}
