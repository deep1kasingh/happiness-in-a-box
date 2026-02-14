"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";
import { useAuthStore } from "@/store/use-auth-store";
import { useJournalStore } from "@/store/use-journal-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateApp = useAppStore((s) => s.hydrate);
  const hydrateJournal = useJournalStore((s) => s.hydrate);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await hydrateAuth();
      if (cancelled) return;
      const u = useAuthStore.getState().user;
      const bucket = u?.id ?? "guest";
      await hydrateApp(bucket);
      hydrateJournal(bucket);
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateAuth, hydrateApp, hydrateJournal]);

  useEffect(() => {
    const bucket = user?.id ?? "guest";
    hydrateApp(bucket);
    hydrateJournal(bucket);
  }, [user?.id, hydrateApp, hydrateJournal]);

  return <>{children}</>;
}
