import { create } from "zustand";
import type { DayCompletion } from "@/types";
import { storage } from "@/lib/storage";
import { computeStreak } from "@/lib/streak";
import { todayString } from "@/lib/dates";
import * as supabaseCompletions from "@/lib/supabase/completions";

function isSupabaseEnabled(): boolean {
  return (
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_USE_SUPABASE === "true" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export interface AppState {
  completions: DayCompletion[];
  /** "guest" or userId – which bucket we're loading/saving */
  currentBucket: string;
  hydrated: boolean;
}

export interface AppActions {
  /** Pass "guest" when not logged in, or user.id when logged in. Loads that bucket's progress. */
  hydrate: (userBucket: string) => Promise<void>;
  persist: () => void;
  setTaskCompleted: (pathId: string, taskId: string, date: string, completed: boolean, totalTasksInPath: number) => void;
  getCompletion: (pathId: string, date: string) => DayCompletion | undefined;
  getStreak: (pathId: string) => ReturnType<typeof computeStreak>;
  isTaskDone: (pathId: string, taskId: string, date: string) => boolean;
  isDayComplete: (pathId: string, date: string) => boolean;
  todayProgress: (pathId: string, totalTasks: number) => { completed: number; total: number };
}

const ensureCompletion = (completions: DayCompletion[], pathId: string, date: string): DayCompletion => {
  let c = completions.find((x) => x.pathId === pathId && x.date === date);
  if (!c) {
    c = { date, pathId, completedTasks: {}, fullDayCompleted: false };
    completions.push(c);
  }
  return c;
};

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  completions: [],
  currentBucket: "guest",
  hydrated: false,

  hydrate: async (userBucket: string) => {
    const bucket = userBucket || "guest";
    if (isSupabaseEnabled() && bucket !== "guest") {
      const completions = await supabaseCompletions.fetchCompletions(bucket);
      set({ completions, currentBucket: bucket, hydrated: true });
    } else {
      const data = storage.getCompletions(bucket);
      if (data?.completions) {
        set({ completions: data.completions as DayCompletion[], currentBucket: bucket, hydrated: true });
      } else {
        set({ completions: [], currentBucket: bucket, hydrated: true });
      }
    }
  },

  persist: () => {
    const { completions, currentBucket } = get();
    if (isSupabaseEnabled() && currentBucket !== "guest") {
      supabaseCompletions.saveCompletions(currentBucket, completions).catch(() => {});
    } else {
      storage.setCompletions(currentBucket, { completions, version: 1 });
    }
  },

  setTaskCompleted: (pathId, taskId, date, completed, totalTasksInPath) => {
    set((state) => {
      const next = state.completions.slice();
      const c = ensureCompletion(next, pathId, date);
      const completedTasks = { ...c.completedTasks };
      if (completed) {
        completedTasks[taskId] = true;
      } else {
        delete completedTasks[taskId];
      }
      c.completedTasks = completedTasks;
      c.fullDayCompleted = totalTasksInPath > 0 && Object.keys(completedTasks).length >= totalTasksInPath;
      return { completions: next };
    });
    get().persist();
  },

  getCompletion: (pathId, date) => {
    return get().completions.find((c) => c.pathId === pathId && c.date === date);
  },

  getStreak: (pathId) => {
    return computeStreak(pathId, get().completions);
  },

  isTaskDone: (pathId, taskId, date) => {
    const c = get().getCompletion(pathId, date);
    return Boolean(c?.completedTasks[taskId]);
  },

  isDayComplete: (pathId, date) => {
    const c = get().getCompletion(pathId, date);
    return Boolean(c?.fullDayCompleted);
  },

  todayProgress: (pathId, totalTasks) => {
    const date = todayString();
    const c = get().getCompletion(pathId, date);
    const completed = c ? Object.keys(c.completedTasks).length : 0;
    return { completed, total: totalTasks };
  },
}));
