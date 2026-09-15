/**
 * Unified HTTP API Client
 * Provides centralized error handling, bearer token injection, and typed responses.
 */
import { ApiResponse } from './types';

export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: string[];
  data?: any;

  constructor(message: string, status: number, code?: string, errors?: string[], data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
    this.data = data;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  skipAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    try {
      return localStorage.getItem('at:auth_token');
    } catch {
      return null;
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // If endpoint already starts with /api and baseUrl is /api, avoid doubling
    const fullPath = cleanEndpoint.startsWith(this.baseUrl)
      ? cleanEndpoint
      : `${this.baseUrl}${cleanEndpoint}`;

    const url = new URL(fullPath, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.pathname + url.search;
  }

  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { params, skipAuth, headers = {}, ...customConfig } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(headers as Record<string, string>),
    };

    if (!skipAuth) {
      const token = this.getToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = this.buildUrl(endpoint, params);

    try {
      const response = await fetch(url, {
        headers: requestHeaders,
        ...customConfig,
      });

      let responseData: any = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        responseData = { message: text };
      }

      if (!response.ok) {
        const errorMessage = responseData.error || responseData.message || `Request failed with status ${response.status}`;
        
        // Handle token expiration / unauthorized
        if (response.status === 401) {
          window.dispatchEvent(new CustomEvent('at:auth-unauthorized'));
        }

        throw new ApiError(
          errorMessage,
          response.status,
          responseData.code,
          responseData.errors,
          responseData
        );
      }

      return responseData as ApiResponse<T>;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        (error as Error).message || 'Network error: could not connect to server',
        0
      );
    }
  }

  get<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T = any>(endpoint: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T = any>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient('/api');
