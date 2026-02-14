"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";

export function Hydration({ children }: { children: React.ReactNode }) {
  const hydrate = useAppStore((s) => s.hydrate);
  useEffect(() => {
    void hydrate("guest");
  }, [hydrate]);
  return <>{children}</>;
}
