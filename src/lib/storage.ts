/**
 * Persistence layer. Web: localStorage. Future app: can swap to AsyncStorage or API.
 * All access behind this module so we can change implementation later.
 */

const KEY_COMPLETIONS_PREFIX = "hib_completions_"; // + userId or "guest"
const KEY_JOURNAL_PREFIX = "hib_journal_"; // + userId or "guest"
const KEY_MOTIVATION = "hib_motivation";
const KEY_AUTH_SESSION = "hib_auth_session";
const KEY_AUTH_USERS = "hib_auth_users"; // mock: registered users (replace with API)

export interface StoredCompletions {
  completions: Array<{
    date: string;
    pathId: string;
    completedTasks: Record<string, string | true>;
    fullDayCompleted: boolean;
  }>;
  version: number;
}

export interface StoredMotivation {
  unlockedMilestones: Record<string, string>;
  reminderEnabled?: boolean;
  reminderTime?: string;
  version: number;
}

export interface StoredAuthSession {
  user: { id: string; email: string; displayName?: string };
  token?: string;
  expiresAt?: string;
  version: number;
}

export interface JournalEntry {
  date: string; // YYYY-MM-DD
  taskId: string; // e.g. "task-morning-journal"
  content: string; // the journal text
  updatedAt: string; // ISO timestamp
}

export interface StoredJournal {
  entries: JournalEntry[];
  version: number;
}

/** Mock only: keyed by email. Replace with real API. */
export type StoredAuthUsers = Record<string, { id: string; email: string; password: string }>;

const COMPLETIONS_VERSION = 1;
const JOURNAL_VERSION = 1;
const MOTIVATION_VERSION = 1;
const AUTH_SESSION_VERSION = 1;

function isClient(): boolean {
  return typeof window !== "undefined";
}

export const storage = {
  /** Pass "guest" when not logged in, or the user's id when logged in. Each has separate progress. */
  getCompletions(userBucket: string): StoredCompletions | null {
    if (!isClient()) return null;
    const key = KEY_COMPLETIONS_PREFIX + (userBucket || "guest");
    try {
      let raw = localStorage.getItem(key);
      if (!raw && (userBucket || "guest") === "guest") {
        const legacy = localStorage.getItem("hib_completions");
        if (legacy) {
          try {
            const data = JSON.parse(legacy) as StoredCompletions;
            if (data?.completions && data.version === COMPLETIONS_VERSION) {
              storage.setCompletions("guest", data);
              localStorage.removeItem("hib_completions");
              raw = localStorage.getItem(key);
            }
          } catch {
            // ignore
          }
        }
      }
      if (!raw) return null;
      const data = JSON.parse(raw) as StoredCompletions;
      return data.version === COMPLETIONS_VERSION ? data : null;
    } catch {
      return null;
    }
  },

  setCompletions(userBucket: string, data: StoredCompletions): void {
    if (!isClient()) return;
    const key = KEY_COMPLETIONS_PREFIX + (userBucket || "guest");
    try {
      localStorage.setItem(key, JSON.stringify({ ...data, version: COMPLETIONS_VERSION }));
    } catch {
      // ignore
    }
  },

  getJournal(userBucket: string): StoredJournal | null {
    if (!isClient()) return null;
    const key = KEY_JOURNAL_PREFIX + (userBucket || "guest");
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const data = JSON.parse(raw) as StoredJournal;
      return data.version === JOURNAL_VERSION ? data : null;
    } catch {
      return null;
    }
  },

  setJournal(userBucket: string, data: StoredJournal): void {
    if (!isClient()) return;
    const key = KEY_JOURNAL_PREFIX + (userBucket || "guest");
    try {
      localStorage.setItem(key, JSON.stringify({ ...data, version: JOURNAL_VERSION }));
    } catch {
      // ignore
    }
  },

  getMotivation(): StoredMotivation | null {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem(KEY_MOTIVATION);
      if (!raw) return null;
      const data = JSON.parse(raw) as StoredMotivation;
      return data.version === MOTIVATION_VERSION ? data : null;
    } catch {
      return null;
    }
  },

  setMotivation(data: StoredMotivation): void {
    if (!isClient()) return;
    try {
      localStorage.setItem(KEY_MOTIVATION, JSON.stringify({ ...data, version: MOTIVATION_VERSION }));
    } catch {
      // ignore
    }
  },

  getAuthSession(): StoredAuthSession | null {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem(KEY_AUTH_SESSION);
      if (!raw) return null;
      const data = JSON.parse(raw) as StoredAuthSession;
      return data.version === AUTH_SESSION_VERSION ? data : null;
    } catch {
      return null;
    }
  },

  setAuthSession(data: Omit<StoredAuthSession, "version"> | null): void {
    if (!isClient()) return;
    try {
      if (data === null) {
        localStorage.removeItem(KEY_AUTH_SESSION);
        return;
      }
      localStorage.setItem(
        KEY_AUTH_SESSION,
        JSON.stringify({ ...data, version: AUTH_SESSION_VERSION })
      );
    } catch {
      // ignore
    }
  },

  /** Mock: get registered users. Replace with API. */
  getAuthUsers(): StoredAuthUsers {
    if (!isClient()) return {};
    try {
      const raw = localStorage.getItem(KEY_AUTH_USERS);
      if (!raw) return {};
      return JSON.parse(raw) as StoredAuthUsers;
    } catch {
      return {};
    }
  },

  /** Mock: save registered user. Replace with API. */
  setAuthUser(email: string, payload: { id: string; email: string; password: string }): void {
    if (!isClient()) return;
    try {
      const users = storage.getAuthUsers();
      const next = { ...users, [email.toLowerCase().trim()]: payload };
      localStorage.setItem(KEY_AUTH_USERS, JSON.stringify(next));
    } catch {
      // ignore
    }
  },
};
