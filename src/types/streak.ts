/**
 * Streak & completion types.
 * All dates are YYYY-MM-DD for timezone-safe comparison.
 */
export type DateString = string; // YYYY-MM-DD

export interface DayCompletion {
  date: DateString;
  pathId: string;
  /** Task ID -> completed at ISO timestamp (or true for just completed) */
  completedTasks: Record<string, string | true>;
  /** All required tasks for the path completed that day */
  fullDayCompleted: boolean;
}

export interface StreakInfo {
  pathId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: DateString | null;
  /** Consecutive days from lastActivityDate going back */
  streakEndDate: DateString | null;
}
