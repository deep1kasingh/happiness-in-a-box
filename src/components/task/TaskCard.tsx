"use client";

import type { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  completed: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function TaskCard({ task, completed, onToggle, disabled }: TaskCardProps) {
  const duration = task.durationMinutes
    ? `${task.durationMinutes} min`
    : task.unit === "check"
      ? ""
      : null;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={
        "group flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-warmth-400 focus:ring-offset-2 dark:focus:ring-offset-[var(--bg)] " +
        (completed
          ? "border-calm-300 bg-calm-50 dark:border-calm-700 dark:bg-calm-900/20"
          : "border-stone-200 bg-white hover:border-warmth-200 dark:border-stone-700 dark:bg-stone-800/50 dark:hover:border-warmth-800") +
        (disabled ? " cursor-not-allowed opacity-70" : "")
      }
    >
      <span
        className={
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition " +
          (completed
            ? "border-calm-500 bg-calm-500 text-white"
            : "border-stone-300 text-stone-500 group-hover:border-warmth-400 group-hover:text-warmth-600 dark:border-stone-600 dark:group-hover:border-warmth-500")
        }
        aria-hidden
      >
        {completed ? "✓" : ""}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-display font-semibold text-stone-900 dark:text-stone-100">
          {task.title}
        </div>
        {duration && (
          <div className="mt-0.5 text-sm font-medium text-warmth-600 dark:text-warmth-400">
            {duration}
          </div>
        )}
        {task.description && (
          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{task.description}</p>
        )}
      </div>
    </button>
  );
}
