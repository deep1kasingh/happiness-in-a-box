/**
 * Path = A life area / track (e.g. Happiness, Fitness).
 * Designed to be shared between web and future native app.
 */
export type PathId = string;

export interface Path {
  id: PathId;
  slug: string;
  name: string;
  description: string;
  /** Order for display; lower = first */
  order: number;
  /** Icon name or emoji for UI */
  icon: string;
  /** Hex or theme color key */
  color: string;
  /** Task IDs in order */
  taskIds: string[];
  /** Whether this path is active and shown to users */
  active: boolean;
  createdAt: string; // ISO
  updatedAt: string;
}
