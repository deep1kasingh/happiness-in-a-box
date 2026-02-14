import type { DayCompletion, StreakInfo } from "@/types";
import { toDateString, parseDateString, subDays } from "@/lib/dates";

/**
 * Pure streak logic — no UI or storage. Safe to reuse in web and native.
 */
export function computeStreak(
  pathId: string,
  completions: DayCompletion[],
  upToDate: Date = new Date()
): StreakInfo {
  const pathCompletions = completions
    .filter((c) => c.pathId === pathId && c.fullDayCompleted)
    .map((c) => c.date)
    .sort()
    .filter((d) => d <= toDateString(upToDate));

  const uniqueDates = Array.from(new Set(pathCompletions));
  if (uniqueDates.length === 0) {
    return {
      pathId,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      streakEndDate: null,
    };
  }

  const lastDate = uniqueDates[uniqueDates.length - 1];
  const today = toDateString(upToDate);
  const yesterday = toDateString(subDays(upToDate, 1));

  // Current streak: only count if user did it today or yesterday (streak is "live")
  let currentStreak = 0;
  if (lastDate === today || lastDate === yesterday) {
    currentStreak = 1;
    for (let i = uniqueDates.length - 2; i >= 0; i--) {
      const prev = parseDateString(uniqueDates[i]);
      const next = parseDateString(uniqueDates[i + 1]);
      const diff = (next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diff) === 1) currentStreak++;
      else break;
    }
  }

  // Longest streak
  let longestStreak = 1;
  let run = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prev = parseDateString(uniqueDates[i - 1]);
    const next = parseDateString(uniqueDates[i]);
    const diff = (next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diff) === 1) {
      run++;
      longestStreak = Math.max(longestStreak, run);
    } else {
      run = 1;
    }
  }

  const streakEndDate = uniqueDates[uniqueDates.length - 1];

  return {
    pathId,
    currentStreak,
    longestStreak,
    lastActivityDate: lastDate,
    streakEndDate,
  };
}
