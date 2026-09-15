/**
 * Common API Response and Entity Type Definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: string[];
  code?: string;
  token?: string;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email?: string | null;
  role: string;
  active: boolean;
  is_admin: boolean;
  hatchery_id?: number | null;
}

export interface LoginPayload {
  login?: string;
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  username?: string;
}

export interface AuthResult {
  token: string;
  user: User;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded';
  database: string;
  timestamp: string;
}
