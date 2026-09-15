/*
 * Hactex React — Authentication client & token storage.
 * Integrates with unified src/api client, authService, and browser cookies.
 */

import { authService, ApiError, User, Company, AuthResult } from '../api';
import { setCookie, getCookie, deleteCookie } from './cookies';

export type AuthUser = User;

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  token?: string;
  user?: AuthUser;
  company?: Company;
}

const TOKEN_KEY = 'at:auth_token';
const USER_KEY = 'at:auth_user';
const COMPANY_KEY = 'at:auth_company';
export const COOKIE_TOKEN_KEY = 'hactex_token';
export const COOKIE_USER_KEY = 'hactex_user';
export const COOKIE_COMPANY_KEY = 'hactex_company';

export function getToken(): string | null {
  try {
    // 1. Check browser cookie first
    const cookieToken = getCookie(COOKIE_TOKEN_KEY);
    if (cookieToken) {
      return cookieToken;
    }
    // 2. Fall back to localStorage
    const localToken = localStorage.getItem(TOKEN_KEY);
    if (localToken) {
      // Sync to cookie for consistent session persistence
      setCookie(COOKIE_TOKEN_KEY, localToken, 7);
      return localToken;
    }
    return null;
  } catch {
    return null;
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);

    const cookieUser = getCookie(COOKIE_USER_KEY);
    if (cookieUser) return JSON.parse(cookieUser);

    return null;
  } catch {
    return null;
  }
}

export function getCompany(): Company | null {
  try {
    const raw = localStorage.getItem(COMPANY_KEY);
    if (raw) return JSON.parse(raw);

    const cookieCompany = getCookie(COOKIE_COMPANY_KEY);
    if (cookieCompany) {
      try {
        return JSON.parse(cookieCompany);
      } catch {
        // If cookie holds just the UUID string
        return { id: cookieCompany, name: getUser()?.company_name || 'Hactex Farm', company_code: getUser()?.company_code || '', status: 'ACTIVE' } as Company;
      }
    }

    const u = getUser();
    if (u?.company_id) {
      return { id: u.company_id, name: u.company_name || 'Hactex Farm', company_code: u.company_code || '', status: 'ACTIVE' } as Company;
    }

    return null;
  } catch {
    return null;
  }
}

export function setAuth(token: string, user: AuthUser, company?: Company | null): void {
  try {
    // Save in browser cookies (7-day duration)
    setCookie(COOKIE_TOKEN_KEY, token, 7);
    setCookie(COOKIE_USER_KEY, JSON.stringify(user), 7);
    if (company) {
      setCookie(COOKIE_COMPANY_KEY, JSON.stringify(company), 7);
      localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
    } else if (user.company_id) {
      const fallbackComp: Company = {
        id: user.company_id,
        name: user.company_name || 'Hactex Farm',
        company_code: user.company_code || '',
        status: 'ACTIVE'
      };
      setCookie(COOKIE_COMPANY_KEY, JSON.stringify(fallbackComp), 7);
      localStorage.setItem(COMPANY_KEY, JSON.stringify(fallbackComp));
    }

    // Also persist in localStorage for fast SPA access
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    window.dispatchEvent(new CustomEvent('at:auth-change', { detail: { token, user, company } }));
  } catch (e) {
    console.error('Failed to persist auth:', e);
  }
}

export function clearAuth(): void {
  try {
    // Clear cookies
    deleteCookie(COOKIE_TOKEN_KEY);
    deleteCookie(COOKIE_USER_KEY);
    deleteCookie(COOKIE_COMPANY_KEY);

    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(COMPANY_KEY);

    window.dispatchEvent(new CustomEvent('at:auth-change', { detail: { token: null, user: null, company: null } }));
  } catch (e) {
    console.error('Failed to clear auth:', e);
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

/**
 * Direct fetch wrapper that automatically adds Authorization: Bearer <token>
 * and passes credentials: 'include' for cookies.
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
    credentials: 'include',
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
    setAuth(result.token, result.user, result.company);
    return {
      success: true,
      token: result.token,
      user: result.user,
      company: result.company,
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
