/**
 * DEMO-ONLY client-side authentication store.
 *
 * ⚠️  NOT PRODUCTION-READY — see the security disclaimer below.
 *
 * This module provides a real sign-up / sign-in gate so that the dashboard is
 * only accessible after submitting a valid form.  Accounts are registered
 * locally and a session is held in sessionStorage (clears when the tab closes).
 * Credentials are compared with a djb2 hash — trivially reversible and NOT a
 * substitute for server-side hashing.
 *
 * What a production deployment actually needs
 * ────────────────────────────────────────────
 *   1. A backend (Node/Next.js/Edge, or a BaaS like Supabase / Firebase Auth).
 *   2. Passwords hashed server-side with bcrypt or argon2 — never in the client.
 *   3. Credentials exchanged only over HTTPS.
 *   4. Sessions issued as HttpOnly cookies or server-verified signed JWTs.
 *   5. CSRF protection and rate-limiting on every auth endpoint.
 *   6. A proper database, not localStorage.
 *
 * Drop-in BaaS options that handle all of the above:
 *   • Supabase Auth  — supabase.com/docs/guides/auth
 *   • Firebase Auth  — firebase.google.com/docs/auth
 *   • Clerk          — clerk.com
 *   • Auth.js        — authjs.dev
 */

export interface AuthUser {
  email: string;
  name: string;
}

const SESSION_KEY = 'cc_session';
const USERS_KEY   = 'cc_demo_users';

type UserRecord = {name: string; ph: string};
type Registry   = Record<string, UserRecord>;

function getRegistry(): Registry {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? '{}') as Registry;
  } catch {
    return {};
  }
}

/** Djb2 integer hash — NOT cryptographically secure.  Demo credential gating only. */
function djb2(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
}

function writeSession(user: AuthUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

/** Create a new account.  Returns the user on success or an error string. */
export function register(
  name: string,
  email: string,
  password: string,
): {user?: AuthUser; error?: string} {
  const reg = getRegistry();
  const key = email.toLowerCase().trim();
  if (reg[key]) {
    return {error: 'An account with this email already exists.'};
  }
  reg[key] = {name: name.trim(), ph: djb2(password)};
  localStorage.setItem(USERS_KEY, JSON.stringify(reg));
  const user: AuthUser = {email: key, name: name.trim()};
  writeSession(user);
  return {user};
}

/** Sign in to an existing account.  Returns the user on success or an error string. */
export function login(
  email: string,
  password: string,
): {user?: AuthUser; error?: string} {
  const reg = getRegistry();
  const key = email.toLowerCase().trim();
  const record = reg[key];
  if (!record || record.ph !== djb2(password)) {
    return {error: 'Incorrect email or password.'};
  }
  const user: AuthUser = {email: key, name: record.name};
  writeSession(user);
  return {user};
}

/** Destroy the active session. */
export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

/** Return the currently signed-in user, or null if there is no session. */
export function getSession(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}
