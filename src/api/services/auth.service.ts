/**
 * Authentication API Service
 */
import { apiClient } from '../client';
import { AuthResult, HealthStatus, LoginPayload, RegisterPayload, User } from '../types';

export class AuthService {
  /**
   * Log in user with email/username and password.
   */
  async login(credentials: LoginPayload): Promise<AuthResult> {
    const res = await apiClient.post<any>('/auth/login', credentials, { skipAuth: true });
    
    // Support access_token, token, and nested data structures from FastAPI & standards
    const token = (res as any).access_token || res.data?.token || res.token || (res.data as any)?.access_token;
    const user = res.data?.user || res.user || (res.data as any) || res;

    if (!token) {
      throw new Error('Malformed login response: access token missing');
    }

    return { token, user };
  }

  /**
   * Register a new user in the system.
   */
  async register(payload: RegisterPayload): Promise<AuthResult> {
    const res = await apiClient.post<any>('/auth/register', payload, { skipAuth: true });

    const token = (res as any).access_token || res.data?.token || res.token || (res.data as any)?.access_token;
    const user = res.data?.user || res.user || (res.data as any) || res;

    if (!token) {
      // If token not directly returned, perform immediate login
      return await this.login({ email: payload.email, password: payload.password });
    }

    return { token, user };
  }

  /**
   * Retrieve active user profile.
   */
  async getProfile(): Promise<User> {
    const res = await apiClient.get<any>('/users/me');
    const user = res.data?.user || res.user || res.data || res;

    if (!user) {
      throw new Error('User profile missing in response');
    }

    return user;
  }

  /**
   * Terminate user session.
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network failures on logout
    }
  }

  /**
   * Ping backend health endpoint.
   */
  async checkHealth(): Promise<HealthStatus> {
    const res = await apiClient.get<HealthStatus>('/health', { skipAuth: true });
    return res.data || { status: 'healthy', database: 'ok', timestamp: new Date().toISOString() };
  }
}

export const authService = new AuthService();
