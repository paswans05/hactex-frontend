/*
 * Hactex React — Authentication client & token storage.
 * Integrates with unified src/api client and authService.
 */

import { authService, ApiError, User, AuthResult } from '../api';

export type AuthUser = User;

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
 * Direct fetch wrapper that automatically adds Authorization: Bearer <token>
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
 * Log in with email or username + password using the unified authService.
 */
export async function login(identifier: string, password: string): Promise<AuthResponse> {
  try {
    const result: AuthResult = await authService.login({ login: identifier, password });
    setAuth(result.token, result.user);
    return {
      success: true,
      token: result.token,
      user: result.user,
      message: 'Login successful.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err instanceof ApiError ? err.message : (err?.message || 'Invalid email or password.'),
    };
  }
}

/**
 * Register a new user account using the unified authService.
 */
export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const result: AuthResult = await authService.register({ name, email, password });
    setAuth(result.token, result.user);
    return {
      success: true,
      token: result.token,
      user: result.user,
      message: 'Registration successful.',
    };
  } catch (err: any) {
    return {
      success: false,
      error: err instanceof ApiError ? err.message : (err?.message || 'Failed to create account.'),
    };
  }
}

/**
 * Log out and clear stored authentication.
 */
export async function logout(): Promise<void> {
  try {
    await authService.logout();
  } finally {
    clearAuth();
  }
}
