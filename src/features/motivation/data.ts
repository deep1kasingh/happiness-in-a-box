import type { Milestone } from "@/types";

/** Milestones for streak and engagement. Easy to extend per path. */
export const STREAK_MILESTONES: Milestone[] = [
  { id: "streak-3", type: "streak", value: 3, title: "Getting started", description: "3-day streak", rewardMessage: "You're building a habit!", icon: "🌱" },
  { id: "streak-7", type: "streak", value: 7, title: "One week", description: "7-day streak", rewardMessage: "A full week of commitment.", icon: "⭐" },
  { id: "streak-14", type: "streak", value: 14, title: "Two weeks", description: "14-day streak", rewardMessage: "Habits are forming.", icon: "🔥" },
  { id: "streak-30", type: "streak", value: 30, title: "Monthly champion", description: "30-day streak", rewardMessage: "Incredible consistency!", icon: "🏆" },
  { id: "streak-100", type: "streak", value: 100, title: "Century", description: "100-day streak", rewardMessage: "You're a different person.", icon: "💯" },
];

export function getMilestonesForType(type: Milestone["type"]): Milestone[] {
  return STREAK_MILESTONES.filter((m) => m.type === type);
}
