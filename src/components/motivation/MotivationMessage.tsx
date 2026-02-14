"use client";

import { STREAK_MILESTONES } from "@/features/motivation/data";
import type { StreakInfo } from "@/types";

interface MotivationMessageProps {
  streak: StreakInfo;
}

export function MotivationMessage({ streak }: MotivationMessageProps) {
  const next = STREAK_MILESTONES.find((m) => m.value > streak.currentStreak);
  const justUnlocked = STREAK_MILESTONES.find((m) => m.value === streak.currentStreak);

  if (justUnlocked && streak.currentStreak > 0) {
    return (
      <div className="rounded-2xl border-2 border-warmth-200 bg-warmth-50/80 p-4 dark:border-warmth-800 dark:bg-warmth-900/20">
        <p className="font-display font-semibold text-warmth-800 dark:text-warmth-200">
          {justUnlocked.icon} {justUnlocked.title}
        </p>
        <p className="mt-1 text-sm text-warmth-700 dark:text-warmth-300">
          {justUnlocked.rewardMessage}
        </p>
      </div>
    );
  }

  if (next) {
    const remaining = next.value - streak.currentStreak;
    return (
      <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-800/30">
        <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
          {next.icon} {remaining} more day{remaining !== 1 ? "s" : ""} to &quot;{next.title}&quot;
        </p>
      </div>
    );
  }

  if (streak.currentStreak === 0 && streak.longestStreak === 0) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4 dark:border-stone-700 dark:bg-stone-800/30">
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Complete all tasks today to start your first streak.
        </p>
      </div>
    );
  }

  return null;
}
