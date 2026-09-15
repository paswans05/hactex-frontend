/**
 * Common API Response and Entity Type Definitions
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
  error?: string;
  errors?: string[];
  code?: string;
  token?: string;
  user?: User;
  company?: Company;
}

export interface User {
  id: string | number;
  uuid?: string;
  name: string;
  username: string;
  email?: string | null;
  phone?: string | null;
  company_id?: string | null;
  company_name?: string | null;
  company_code?: string | null;
  role_id?: string | null;
  role: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  active: boolean;
  is_admin: boolean;
  last_login_at?: string | null;
  created_at?: string | null;
  hatchery_id?: number | null;
}

export interface Company {
  id: string;
  name: string;
  legal_name?: string | null;
  company_code: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  logo?: string | null;
  timezone?: string | null;
  currency?: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Role {
  id: string | number;
  uuid?: string;
  name: string;
  label?: string;
  description?: string;
  is_system: boolean;
  is_admin: boolean;
  active: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  module: string;
  action: string;
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
  role?: string;
  phone?: string;
}

export interface CompanySetupPayload {
  company: {
    name: string;
    legal_name?: string;
    company_code: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
    timezone?: string;
    currency?: string;
  };
  owner: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  };
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  username?: string;
  role?: string;
  phone?: string;
  status?: string;
  hatchery_id?: number | null;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  status?: string;
  hatchery_id?: number | null;
}

export interface AuthResult {
  token: string;
  user: User;
  company?: Company;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded';
  database: string;
  timestamp: string;
}
