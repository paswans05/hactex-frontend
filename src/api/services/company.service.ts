/**
 * Multi-Company / Multi-Tenant API Service
 */
import { apiClient } from '../client';
import type { ApiResponse, Company, CompanySetupPayload, AuthResult } from '../types';

export const companyService = {
  /**
   * Setup brand-new company along with its initial Owner/Admin.
   * Public onboarding flow.
   */
  async setupCompany(payload: CompanySetupPayload): Promise<ApiResponse<AuthResult>> {
    return apiClient.post<AuthResult>('/companies/setup', payload);
  },

  /**
   * Fetch current active company details.
   */
  async getCurrentCompany(): Promise<ApiResponse<Company>> {
    return apiClient.get<Company>('/companies/current');
  },

  /**
   * Update active company profile (Admin only).
   */
  async updateCurrentCompany(data: Partial<Company>): Promise<ApiResponse<Company>> {
    return apiClient.put<Company>('/companies/current', data);
  },

  /**
   * List all registered companies (Super Admin only).
   */
  async listCompanies(): Promise<ApiResponse<Company[]>> {
    return apiClient.get<Company[]>('/companies');
  },
};
