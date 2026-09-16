/**
 * Company-Scoped User Management API Service
 */
import { apiClient } from '../client';
import type { ApiResponse, User, Role, CreateUserPayload, UpdateUserPayload } from '../types';

export interface UserFilterParams {
  search?: string;
  role?: string;
  status?: string;
}

export const userService = {
  /**
   * List all users belonging to the active company.
   */
  async listUsers(params?: UserFilterParams): Promise<ApiResponse<User[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.role) query.set('role', params.role);
    if (params?.status) query.set('status', params.status);

    const qs = query.toString();
    const endpoint = `/users${qs ? `?${qs}` : ''}`;
    const res = await apiClient.get<any>(endpoint);
    
    // Normalize paginated items array if present
    if (res.success && res.data) {
      const items = Array.isArray(res.data) ? res.data : (res.data.items || []);
      return {
        ...res,
        data: items,
        total: res.data.total ?? items.length,
      };
    }
    return res;
  },

  /**
   * Get single user details by UUID.
   */
  async getUser(userId: string | number): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`/users/${userId}`);
  },

  /**
   * Create a new company user (Admin only).
   */
  async createUser(payload: CreateUserPayload): Promise<ApiResponse<User>> {
    return apiClient.post<User>('/users', payload);
  },

  /**
   * Update user details (Admin or self).
   */
  async updateUser(userId: string | number, payload: UpdateUserPayload): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`/users/${userId}`, payload);
  },

  /**
   * Change user status (ACTIVE, INACTIVE, SUSPENDED) (Admin only).
   */
  async changeStatus(userId: string | number, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'): Promise<ApiResponse<User>> {
    return apiClient.patch<User>(`/users/${userId}/status`, { status });
  },

  /**
   * Delete user from company (Admin only).
   */
  async deleteUser(userId: string | number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/users/${userId}`);
  },

  /**
   * List available roles for company users.
   */
  async listRoles(): Promise<ApiResponse<Role[]>> {
    return apiClient.get<Role[]>('/roles');
  },
};
