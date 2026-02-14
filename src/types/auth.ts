/**
 * Auth types. Shared between web and future app.
 * Replace login/register with real API calls when you add a backend.
 */
export interface User {
  id: string;
  email: string;
  /** Set by server; optional for mock */
  displayName?: string;
}

export interface AuthSession {
  user: User;
  /** In a real app: JWT or session token */
  token?: string;
  expiresAt?: string;
}
