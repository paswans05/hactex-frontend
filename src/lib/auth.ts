/*
 * Hactex React — Authentication client & token storage.
 * Manages JWT/timed auth tokens, user persistence, and API communication with Flask backend.
 */

export interface AuthUser {
  id: number;
  name: string;
  email: string | null;
  username: string;
  role: string;
  active: boolean;
  is_admin: boolean;
  hatchery_id: number | null;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: AuthUser;
}

const TOKEN_KEY = 'at:auth_token';
const USER_KEY = 'at:auth_user';

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuth(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('at:auth-change', { detail: { token, user } }));
  } catch (e) {
    console.error('Failed to persist auth:', e);
  }
}

export function clearAuth(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new CustomEvent('at:auth-change', { detail: { token: null, user: null } }));
  } catch (e) {
    console.error('Failed to clear auth:', e);
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

/**
 * Fetch wrapper that automatically adds Authorization: Bearer <token>
 */
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Log in with email or username + password.
 */
export async function login(identifier: string, password: string): Promise<AuthResponse> {
  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: identifier, password }),
    });

    const data: AuthResponse = await res.json();
    if (res.ok && data.success && data.token && data.user) {
      setAuth(data.token, data.user);
      return data;
    }
    return {
      success: false,
      error: data.error || 'Invalid email or password.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: 'Unable to connect to the authentication server. Please check your network or server status.',
    };
  }
}

/**
 * Register a new user account.
 */
export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const res = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    const data: AuthResponse = await res.json();
    if (res.ok && data.success && data.token && data.user) {
      setAuth(data.token, data.user);
      return data;
    }
    return {
      success: false,
      error: data.error || 'Failed to create account.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: 'Unable to connect to the authentication server. Please check your network or server status.',
    };
  }
}

/**
 * Log out and clear stored authentication.
 */
export async function logout(): Promise<void> {
  try {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // Ignore server error on logout
  } finally {
    clearAuth();
  }
}
