"use client";

import type { StreakInfo } from "@/types";

interface StreakBadgeProps {
  streak: StreakInfo;
  compact?: boolean;
}

export function StreakBadge({ streak, compact }: StreakBadgeProps) {
  return (
    <div
      className={
        compact
          ? "inline-flex items-center gap-1.5 rounded-full bg-warmth-100 px-2.5 py-1 text-sm text-warmth-800 dark:bg-warmth-900/40 dark:text-warmth-200"
          : "rounded-2xl bg-gradient-to-br from-warmth-100 to-warmth-50 p-4 dark:from-warmth-900/30 dark:to-warmth-950/30"
      }
    >
      <span className={compact ? "text-base" : "text-2xl"} aria-hidden>🔥</span>
      <div className={compact ? "" : "mt-1"}>
        <div className="font-display font-semibold text-warmth-800 dark:text-warmth-200">
          {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""} streak
        </div>
        {!compact && (
          <p className="mt-0.5 text-sm text-warmth-600 dark:text-warmth-400">
            Longest: {streak.longestStreak} days
          </p>
        )}
      </div>
    </div>
  );
}
