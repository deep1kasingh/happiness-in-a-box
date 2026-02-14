"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getPathBySlug, getTasksForPath } from "@/features/paths/data";
import { useAppStore } from "@/store/use-app-store";
import { todayString } from "@/lib/dates";
import { StreakBadge } from "@/components/streak/StreakBadge";
import { TaskCard } from "@/components/task/TaskCard";
import { ProgressRing } from "@/components/motivation/ProgressRing";
import { MotivationMessage } from "@/components/motivation/MotivationMessage";
import { JournalEditor } from "@/components/journal/JournalEditor";

export default function PathPage() {
  const params = useParams();
  const slug = params.slug as string;
  const path = getPathBySlug(slug);
  const tasks = path ? getTasksForPath(path.id) : [];
  const today = todayString();

  // Subscribe to completions so UI updates when tasks are toggled (selectors alone are stable refs)
  const completions = useAppStore((s) => s.completions);
  const hydrated = useAppStore((s) => s.hydrated);
  const getStreak = useAppStore((s) => s.getStreak);
  const isTaskDone = useAppStore((s) => s.isTaskDone);
  const setTaskCompleted = useAppStore((s) => s.setTaskCompleted);
  const todayProgress = useAppStore((s) => s.todayProgress);

  if (!path) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <p className="text-stone-600 dark:text-stone-400">Path not found.</p>
        <Link href="/" className="mt-4 inline-block text-warmth-600 hover:underline">
          Back home
        </Link>
      </div>
    );
  }

  const streak = getStreak(path.id);
  const progress = todayProgress(path.id, tasks.length);
  const isJournalingPath = path.id === "path-journaling";

  return (
    <div className="mx-auto min-h-dvh max-w-lg px-4 pb-12 pt-6">
        <header className="mb-6 flex items-center gap-4">
          <Link
            href="/"
            className="rounded-full p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-700 dark:hover:text-stone-300"
            aria-label="Back to paths"
          >
            ←
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
              {path.icon} {path.name}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400">Today&apos;s practice</p>
          </div>
        </header>

        {hydrated && (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <StreakBadge streak={streak} />
              <ProgressRing completed={progress.completed} total={progress.total} />
            </div>

            <div className="mb-6">
              <MotivationMessage streak={streak} />
            </div>

            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Tasks
              </h2>
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li key={task.id} className="space-y-2">
                    <TaskCard
                      task={task}
                      completed={isTaskDone(path.id, task.id, today)}
                      onToggle={() => {
                        const currentlyDone = isTaskDone(path.id, task.id, today);
                        setTaskCompleted(path.id, task.id, today, !currentlyDone, tasks.length);
                      }}
                    />
                    {isJournalingPath && (
                      <JournalEditor
                        taskId={task.id}
                        taskTitle={task.title}
                        date={today}
                        placeholder={task.description}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {!hydrated && (
          <div className="flex items-center justify-center py-12 text-stone-500">
            Loading…
          </div>
        )}
      </div>
  );
}
