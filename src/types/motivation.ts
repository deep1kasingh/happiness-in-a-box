/**
 * Motivation / gamification types.
 * Can be extended for badges, levels, reminders.
 */
export type MilestoneType = "streak" | "total_days" | "path_complete";

export interface Milestone {
  id: string;
  type: MilestoneType;
  /** e.g. 3, 7, 30 for streak days */
  value: number;
  title: string;
  description: string;
  /** Optional reward or message */
  rewardMessage?: string;
  icon?: string;
}

export interface UserMotivationState {
  /** Milestone ID -> unlocked at ISO date */
  unlockedMilestones: Record<string, string>;
  /** Optional: reminder preferences for future app */
  reminderEnabled?: boolean;
  reminderTime?: string; // HH:mm
}
