import { create } from "zustand";
import { storage } from "@/lib/storage";
import type { JournalEntry } from "@/lib/storage";

interface JournalState {
  entries: JournalEntry[];
  currentBucket: string;
  hydrated: boolean;
}

interface JournalActions {
  hydrate: (userBucket: string) => void;
  persist: () => void;
  saveEntry: (date: string, taskId: string, content: string) => void;
  getEntry: (date: string, taskId: string) => JournalEntry | undefined;
  getEntriesForDate: (date: string) => JournalEntry[];
}

export const useJournalStore = create<JournalState & JournalActions>((set, get) => ({
  entries: [],
  currentBucket: "guest",
  hydrated: false,

  hydrate: (userBucket: string) => {
    const bucket = userBucket || "guest";
    const data = storage.getJournal(bucket);
    set({
      entries: data?.entries ?? [],
      currentBucket: bucket,
      hydrated: true,
    });
  },

  persist: () => {
    const { entries, currentBucket } = get();
    storage.setJournal(currentBucket, { entries, version: 1 });
  },

  saveEntry: (date: string, taskId: string, content: string) => {
    set((state) => {
      const next = state.entries.filter(
        (e) => !(e.date === date && e.taskId === taskId)
      );
      if (content.trim()) {
        next.push({
          date,
          taskId,
          content,
          updatedAt: new Date().toISOString(),
        });
      }
      return { entries: next };
    });
    get().persist();
  },

  getEntry: (date: string, taskId: string) => {
    return get().entries.find((e) => e.date === date && e.taskId === taskId);
  },

  getEntriesForDate: (date: string) => {
    return get().entries.filter((e) => e.date === date);
  },
}));
