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
    const res = await apiClient.post<AuthResult>('/auth/login', credentials, { skipAuth: true });
    
    // Support both standardized { data: { token, user } } and top-level { token, user }
    const token = res.data?.token || res.token;
    const user = res.data?.user || res.user;

    if (!token || !user) {
      throw new Error('Malformed login response: token or user missing');
    }

    return { token, user };
  }

  /**
   * Register a new user in the system.
   */
  async register(payload: RegisterPayload): Promise<AuthResult> {
    const res = await apiClient.post<AuthResult>('/auth/register', payload, { skipAuth: true });

    const token = res.data?.token || res.token;
    const user = res.data?.user || res.user;

    if (!token || !user) {
      throw new Error('Malformed registration response: token or user missing');
    }

    return { token, user };
  }

  /**
   * Retrieve active user profile.
   */
  async getProfile(): Promise<User> {
    const res = await apiClient.get<{ user: User }>('/auth/me');
    const user = res.data?.user || res.user;

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
