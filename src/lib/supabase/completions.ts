import type { DayCompletion } from "@/types";
import { getSupabaseClient } from "./client";

export async function fetchCompletions(userId: string): Promise<DayCompletion[]> {
  if (typeof window === "undefined") return [];
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("day_completions")
    .select("path_id, date, completed_tasks, full_day_completed")
    .eq("user_id", userId)
    .order("date", { ascending: true });

  if (error) return [];

  return (data ?? []).map((row) => ({
    pathId: row.path_id,
    date: row.date,
    completedTasks: (row.completed_tasks as Record<string, string | true>) ?? {},
    fullDayCompleted: Boolean(row.full_day_completed),
  }));
}

export async function saveCompletions(
  userId: string,
  completions: DayCompletion[]
): Promise<void> {
  if (typeof window === "undefined") return;
  const supabase = getSupabaseClient();
  if (!supabase) return;
  if (completions.length === 0) return;

  const rows = completions.map((c) => ({
    user_id: userId,
    path_id: c.pathId,
    date: c.date,
    completed_tasks: c.completedTasks,
    full_day_completed: c.fullDayCompleted,
    updated_at: new Date().toISOString(),
  }));

  await supabase.from("day_completions").upsert(rows, {
    onConflict: "user_id,path_id,date",
  });
}
