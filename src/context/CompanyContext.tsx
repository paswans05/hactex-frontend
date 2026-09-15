/**
 * Multi-Tenant Company Context
 * Manages active company state, metadata, and synchronization across the application.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Company } from '../api/types';
import { companyService } from '../api';
import { getCompany, isAuthenticated } from '../lib/auth';

interface CompanyContextType {
  company: Company | null;
  loading: boolean;
  refreshCompany: () => Promise<void>;
  updateCompany: (data: Partial<Company>) => Promise<boolean>;
  setCompany: (comp: Company | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [company, setCompanyState] = useState<Company | null>(() => getCompany());
  const [loading, setLoading] = useState<boolean>(false);

  const refreshCompany = useCallback(async () => {
    if (!isAuthenticated()) {
      setCompanyState(null);
      return;
    }
    try {
      setLoading(true);
      const res = await companyService.getCurrentCompany();
      if (res.success && res.data) {
        setCompanyState(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch current company:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleAuthChange = (e: any) => {
      if (e.detail?.company) {
        setCompanyState(e.detail.company);
      } else if (!e.detail?.token) {
        setCompanyState(null);
      } else {
        refreshCompany();
      }
    };

    window.addEventListener('at:auth-change', handleAuthChange);

    // Initial load if authenticated
    if (isAuthenticated()) {
      refreshCompany();
    }

    return () => {
      window.removeEventListener('at:auth-change', handleAuthChange);
    };
  }, [refreshCompany]);

  const updateCompany = async (data: Partial<Company>): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await companyService.updateCurrentCompany(data);
      if (res.success && res.data) {
        setCompanyState(res.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update company:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const setCompany = (comp: Company | null) => {
    setCompanyState(comp);
  };

  return (
    <CompanyContext.Provider value={{ company, loading, refreshCompany, updateCompany, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export function useCompany(): CompanyContextType {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
