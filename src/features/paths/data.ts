import type { Path } from "@/types";
import type { Task } from "@/types";

const NOW = new Date().toISOString();

export const PATHS: Path[] = [
  {
    id: "path-happiness",
    slug: "happiness",
    name: "Happiness",
    description: "Daily practices for mind, body and breath — exercise, yoga, Sudarshan Kriya and meditation.",
    order: 0,
    icon: "☀️",
    color: "warmth",
    taskIds: ["task-exercise", "task-yoga", "task-sudarshan-kriya", "task-meditation"],
    active: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "path-journaling",
    slug: "journaling",
    name: "Journaling",
    description: "Reflect on your day, capture gratitude, and build clarity through daily writing.",
    order: 1,
    icon: "📝",
    color: "calm",
    taskIds: ["task-morning-journal", "task-gratitude", "task-evening-reflection"],
    active: true,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

export const TASKS_BY_PATH: Record<string, Task[]> = {
  "path-happiness": [
    {
      id: "task-exercise",
      pathId: "path-happiness",
      title: "Exercise",
      description: "Any form of movement — run, walk, stretch, or gym.",
      durationMinutes: 10,
      unit: "minutes",
      order: 0,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
    {
      id: "task-yoga",
      pathId: "path-happiness",
      title: "Yoga",
      description: "10 minutes of yoga asanas.",
      durationMinutes: 10,
      unit: "minutes",
      order: 1,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
    {
      id: "task-sudarshan-kriya",
      pathId: "path-happiness",
      title: "Sudarshan Kriya",
      description: "25 minutes of rhythmic breathing practice.",
      durationMinutes: 25,
      unit: "minutes",
      order: 2,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
    {
      id: "task-meditation",
      pathId: "path-happiness",
      title: "Meditation",
      description: "20 minutes of meditation.",
      durationMinutes: 20,
      unit: "minutes",
      order: 3,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
  ],
  "path-journaling": [
    {
      id: "task-morning-journal",
      pathId: "path-journaling",
      title: "Morning Journal",
      description: "Write freely for a few minutes — set intentions, clear your mind, or capture dreams.",
      durationMinutes: 5,
      unit: "minutes",
      order: 0,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
    {
      id: "task-gratitude",
      pathId: "path-journaling",
      title: "Gratitude",
      description: "Write down three things you're grateful for today.",
      unit: "check",
      order: 1,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
    {
      id: "task-evening-reflection",
      pathId: "path-journaling",
      title: "Evening Reflection",
      description: "Reflect on your day — what went well, what you learned, how you felt.",
      durationMinutes: 5,
      unit: "minutes",
      order: 2,
      active: true,
      createdAt: NOW,
      updatedAt: NOW,
    },
  ],
};

export function getTasksForPath(pathId: string): Task[] {
  return TASKS_BY_PATH[pathId] ?? [];
}

export function getPathBySlug(slug: string): Path | undefined {
  return PATHS.find((p) => p.slug === slug && p.active);
}

export function getPathById(id: string): Path | undefined {
  return PATHS.find((p) => p.id === id);
}
