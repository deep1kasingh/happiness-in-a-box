/**
 * Task = A single daily activity within a path (e.g. "10 mins exercise").
 * Shared between web and future app.
 */
export type TaskId = string;

export type TaskUnit = "minutes" | "reps" | "count" | "check" | "journal";

export interface Task {
  id: TaskId;
  pathId: string;
  /** Display title */
  title: string;
  /** Optional longer description or instructions */
  description?: string;
  /** Duration or quantity */
  durationMinutes?: number;
  unit?: TaskUnit;
  /** Order within path */
  order: number;
  /** Optional link to guide / video (for app: deep link or web URL) */
  guideUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
