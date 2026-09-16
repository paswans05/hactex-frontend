/**
 * Hactex — Company Profile Setup Page (/company/setup)
 * Smart workspace onboarding & profile completeness flow:
 * 1. Checks whether company data is already filled.
 * 2. If already filled (100%), shows verified details without repeating the form.
 * 3. Shows completion percentage (e.g. 75%) and progress checklist.
 * 4. If data is partially missing, shows ONLY the fields that still need to be completed.
 * 5. If no company exists, shows initial creation form with dynamic live completion tracker.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  KeyRound,
  Check,
  Edit3,
  Globe,
  Phone,
  Mail,
  MapPin,
  Copy,
  ShieldCheck,
  Percent,
  ListChecks,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { companyService } from '../../api';
import type { Company } from '../../api/types';
import { setAuth, getUser, getToken } from '../../lib/auth';
import { useCompany } from '../../context/CompanyContext';

interface FieldConfig {
  key: keyof Company | string;
  label: string;
  category: 'Core' | 'Contact' | 'Location' | 'Operational';
  placeholder?: string;
  type?: string;
  description?: string;
}

const REQUIRED_PROFILE_FIELDS: FieldConfig[] = [
  { key: 'name', label: 'Company Name', category: 'Core', placeholder: 'e.g. Apex Broiler Farms Ltd' },
  { key: 'company_code', label: 'Unique Company Key', category: 'Core', placeholder: 'e.g. H7K9P2X4M8', description: '10-digit unique workspace key' },
  { key: 'legal_name', label: 'Legal / Entity Name', category: 'Core', placeholder: 'e.g. Apex Broiler Farms Pvt Ltd' },
  { key: 'email', label: 'Official Company Email', category: 'Contact', placeholder: 'info@company.com', type: 'email' },
  { key: 'phone', label: 'Company Phone / Support', category: 'Contact', placeholder: '+91 9876543210', type: 'tel' },
  { key: 'address', label: 'Farm / Facility Address', category: 'Location', placeholder: 'Plot No. 12, Agro Industrial Park' },
  { key: 'city', label: 'City', category: 'Location', placeholder: 'Bengaluru' },
  { key: 'state', label: 'State / Province', category: 'Location', placeholder: 'Karnataka' },
];

export const CompanySetup: React.FC = () => {
  const navigate = useNavigate();
  const { setCompany } = useCompany();
  const currentUser = getUser();

  // Loading & Check state
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [existingCompany, setExistingCompany] = useState<Company | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showExistingSummary, setShowExistingSummary] = useState(false);

  // Form State (used for both initial creation, missing-fields update, and edit mode)
  const [formData, setFormData] = useState({
    name: '',
    legal_name: '',
    company_code: '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
  });

  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const generateRandomKey = (): string => {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const digits = '23456789';
    const all = letters + digits;
    let res = '';
    for (let i = 0; i < 6; i++) res += all.charAt(Math.floor(Math.random() * all.length));
    for (let i = 0; i < 2; i++) res += letters.charAt(Math.floor(Math.random() * letters.length));
    for (let i = 0; i < 2; i++) res += digits.charAt(Math.floor(Math.random() * digits.length));
    return res.split('').sort(() => 0.5 - Math.random()).join('');
  };

  // 1. Check if company data already exists for the user on mount
  useEffect(() => {
    let isMounted = true;

    const checkCompanyStatus = async () => {
      setCheckingExisting(true);
      try {
        const res = await companyService.getCurrentCompany();
        if (isMounted && res.success && res.data) {
          const comp = res.data;
          setExistingCompany(comp);
          setCompany(comp);
          setFormData({
            name: comp.name || '',
            legal_name: comp.legal_name || comp.name || '',
            company_code: comp.company_code || '',
            email: comp.email || currentUser?.email || '',
            phone: comp.phone || currentUser?.phone || '',
            address: comp.address || '',
            city: comp.city || '',
            state: comp.state || '',
            country: comp.country || 'India',
            currency: comp.currency || 'INR',
            timezone: comp.timezone || 'Asia/Kolkata',
          });
        }
      } catch {
        // If 404, company does not exist yet -> show initial setup form
        if (isMounted) {
          setExistingCompany(null);
          setFormData((prev) => ({
            ...prev,
            company_code: generateRandomKey(),
          }));
        }
      } finally {
        if (isMounted) {
          setCheckingExisting(false);
        }
      }
    };

    checkCompanyStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  // Completion calculation based on the 8 required fields
  const completionStats = useMemo(() => {
    const activeData = existingCompany ? { ...existingCompany, ...formData } : formData;

    const completed: string[] = [];
    const missing: FieldConfig[] = [];

    REQUIRED_PROFILE_FIELDS.forEach((field) => {
      const val = (activeData as any)[field.key];
      if (val !== undefined && val !== null && String(val).trim().length > 0) {
        completed.push(field.key);
      } else {
        missing.push(field);
      }
    });

    const total = REQUIRED_PROFILE_FIELDS.length;
    const percentage = Math.round((completed.length / total) * 100);

    return {
      percentage,
      completedKeys: completed,
      missingFields: missing,
      total,
      isFullyComplete: missing.length === 0,
    };
  }, [existingCompany, formData]);

  const regenerateKey = async () => {
    try {
      setIsGeneratingKey(true);
      const res = await companyService.generateCompanyCode();
      if (res.success && res.data?.code) {
        setFormData((prev) => ({ ...prev, company_code: res.data.code }));
      } else {
        setFormData((prev) => ({ ...prev, company_code: generateRandomKey() }));
      }
    } catch {
      setFormData((prev) => ({ ...prev, company_code: generateRandomKey() }));
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Submission handler (handles either initial create OR updating missing fields/edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validation
    if (!formData.name.trim() || formData.name.length < 2) {
      setError('Please provide a valid company name (at least 2 characters).');
      return;
    }
    if (!formData.company_code.trim() || formData.company_code.length < 2) {
      setError('Please provide a unique company code.');
      return;
    }

    try {
      setLoading(true);

      if (existingCompany) {
        // UPDATE existing company (e.g. completing missing fields or full edit)
        const updatePayload: Partial<Company> = {
          name: formData.name.trim(),
          legal_name: formData.legal_name.trim() || formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          country: formData.country.trim(),
          currency: formData.currency,
          timezone: formData.timezone,
        };

        const res = await companyService.updateCurrentCompany(updatePayload);
        if (res.success && res.data) {
          setExistingCompany(res.data);
          setCompany(res.data);
          setIsEditMode(false);
          setSuccessMsg('Company profile details saved successfully! Profile completeness updated.');

          // If fully complete, forward after a short delay
          const remainingMissing = REQUIRED_PROFILE_FIELDS.filter(
            (f) => !res.data[f.key as keyof Company] || !String(res.data[f.key as keyof Company]).trim()
          );
          if (remainingMissing.length === 0) {
            setTimeout(() => {
              navigate('/dashboards', { replace: true });
            }, 1200);
          }
        } else {
          setError(res.error || 'Failed to update company profile.');
        }
      } else {
        // CREATE new company workspace
        const res = await companyService.setupCompany({
          company: {
            name: formData.name.trim(),
            legal_name: formData.legal_name.trim() || formData.name.trim(),
            company_code: formData.company_code.trim().toUpperCase(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            country: formData.country.trim(),
            currency: formData.currency,
            timezone: formData.timezone,
          },
        });

        if (res.success && res.data) {
          const { token, user, company } = res.data;
          const activeToken = token || getToken() || '';
          const activeUser = user || currentUser;
          if (activeUser && activeToken) {
            setAuth(activeToken, activeUser, company);
          }
          if (company) {
            setCompany(company);
            setExistingCompany(company);
          }
          setSuccessMsg('Company workspace created successfully! Setting up your dashboard...');
          setTimeout(() => {
            navigate('/dashboards', { replace: true });
          }, 1000);
        } else {
          setError(res.error || 'Failed to setup company. Please verify details and try again.');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred while saving company details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading Skeleton while checking company data
  if (checkingExisting) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-center items-center py-16 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto mb-4 animate-pulse">
            <Building2 className="w-6 h-6 animate-bounce" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Checking Company Profile</h2>
          <p className="text-xs text-slate-500 mb-6 font-medium">Verifying your registered organization and completeness status...</p>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full w-2/3 animate-[pulse_1s_infinite] rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Company Setup & Profile
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            {existingCompany
              ? completionStats.isFullyComplete
                ? 'Your Company Profile '
                : 'Complete Your '
              : 'Set Up Your '}
            <span className="text-emerald-700">
              {existingCompany && completionStats.isFullyComplete
                ? 'is Ready'
                : 'Company Profile'}
            </span>
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-lg mx-auto font-medium">
            {existingCompany
              ? completionStats.isFullyComplete
                ? 'All mandatory enterprise profile details are verified. Your workspace is fully operational.'
                : 'Your organization is registered! Please complete the missing required fields below to achieve 100% profile setup.'
              : 'Configure your poultry enterprise or farm organization details. Your flock and hatchery data will be isolated under this profile.'}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-800 flex items-start gap-3 shadow-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 flex items-start gap-3 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">{successMsg}</div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* COMPLETION PERCENTAGE CARD (Shown whenever company data exists or in progress) */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-6 bg-white rounded-2xl border-2 border-slate-900/15 p-6 shadow-sm overflow-hidden relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-black text-lg ${
                  completionStats.percentage === 100
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}
              >
                {completionStats.percentage}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-slate-900 text-base">Company Completion Status</h2>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      completionStats.percentage === 100
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {completionStats.percentage === 100 ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        100% Completed
                      </>
                    ) : (
                      <>
                        <Percent className="w-3.5 h-3.5 text-amber-700" />
                        {completionStats.percentage}% Completed
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {completionStats.percentage === 100
                    ? 'All required enterprise identity & facility fields are completed.'
                    : `${completionStats.completedKeys.length} of ${completionStats.total} required fields completed (${completionStats.missingFields.length} pending)`}
                </p>
              </div>
            </div>

            {/* Quick Actions in Header */}
            {existingCompany && (
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer bg-slate-50"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isEditMode ? 'Cancel Edit' : 'Edit All Details'}
                </button>
                <Link
                  to="/dashboards"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Visual Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  completionStats.percentage === 100
                    ? 'bg-emerald-600'
                    : completionStats.percentage >= 70
                    ? 'bg-emerald-500'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${Math.max(completionStats.percentage, 5)}%` }}
              />
            </div>
          </div>

          {/* Quick Field Badges */}
          <div className="mt-4 pt-3 flex flex-wrap items-center gap-2">
            {REQUIRED_PROFILE_FIELDS.map((f) => {
              const isFilled = completionStats.completedKeys.includes(f.key as string);
              return (
                <span
                  key={f.key as string}
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md border ${
                    isFilled
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-300'
                  }`}
                >
                  {isFilled ? (
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                  {f.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STATE 1: EXISTING COMPANY IS 100% COMPLETE (AND NOT IN EDIT MODE) */}
        {/* ------------------------------------------------------------- */}
        {existingCompany && completionStats.isFullyComplete && !isEditMode && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border-2 border-slate-900/15 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg">{existingCompany.name}</h2>
                    <p className="text-xs text-slate-500 font-medium">{existingCompany.legal_name || existingCompany.name}</p>
                  </div>
                </div>

                {/* Company Code Badge */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-xl">
                  <KeyRound className="w-4 h-4 text-emerald-700" />
                  <span className="font-mono font-bold text-sm tracking-wider uppercase text-slate-900">
                    {existingCompany.company_code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(existingCompany.company_code)}
                    className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copy Company Code"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Verified Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Official Email
                  </div>
                  <div className="font-semibold text-slate-800 text-sm truncate">
                    {existingCompany.email || '—'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Phone / Support
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {existingCompany.phone || '—'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Facility Location
                  </div>
                  <div className="font-semibold text-slate-800 text-sm truncate">
                    {[existingCompany.city, existingCompany.state, existingCompany.country].filter(Boolean).join(', ') || '—'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Street / Farm Address
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {existingCompany.address || '—'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Currency & Timezone
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">
                    {existingCompany.currency} • {existingCompany.timezone}
                  </div>
                </div>
              </div>

              {/* Action Call to Action */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-slate-600" />
                  Modify Profile Details
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/dashboards')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Continue to Workspace Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STATE 2: COMPANY EXISTS BUT DATA IS MISSING (SHOW ONLY MISSING FIELDS) */}
        {/* ------------------------------------------------------------- */}
        {existingCompany && !completionStats.isFullyComplete && !isEditMode && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Existing Saved Details Collapsible / Summary */}
            <div className="bg-white rounded-2xl border-2 border-slate-900/15 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{existingCompany.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Code: <span className="font-mono font-bold text-emerald-800">{existingCompany.company_code}</span> • Saved Profile
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowExistingSummary(!showExistingSummary)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {showExistingSummary ? 'Hide Existing Details' : 'View Existing Details'}
                  {showExistingSummary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {showExistingSummary && (
                <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {REQUIRED_PROFILE_FIELDS.map((f) => {
                    const val = (existingCompany as any)[f.key];
                    const hasVal = val && String(val).trim().length > 0;
                    return (
                      <div key={f.key as string} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                          {f.label}
                        </div>
                        <div className={hasVal ? 'font-semibold text-slate-800' : 'text-amber-600 font-medium italic'}>
                          {hasVal ? String(val) : 'Missing — please fill below'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MISSING FIELDS FORM CARD: SHOWS ONLY MISSING FIELDS! */}
            <div className="bg-white rounded-2xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                  <ListChecks className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-base">
                    Pending Required Fields ({completionStats.missingFields.length})
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Provide the missing enterprise information below to complete 100% of your setup.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                {completionStats.missingFields.map((field) => (
                  <div key={field.key as string}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      {field.label} *
                    </label>
                    <input
                      type={field.type || 'text'}
                      required
                      placeholder={field.placeholder || ''}
                      value={(formData as any)[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key as string, e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 placeholder-slate-400 text-sm bg-slate-50/50"
                    />
                    {field.description && (
                      <p className="mt-1 text-[11px] text-slate-500 font-medium">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/dashboards" className="text-xs text-slate-500 font-medium hover:text-slate-800">
                  Skip for now & go to Dashboard
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving Remaining Fields...
                    </>
                  ) : (
                    <>
                      Save Details & Complete Profile
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STATE 3: FULL FORM (BRAND NEW REGISTRATION OR FULL EDIT MODE) */}
        {/* ------------------------------------------------------------- */}
        {(!existingCompany || isEditMode) && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border-2 border-slate-900/15 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-base">
                      {isEditMode ? 'Edit Company Profile' : 'Company Profile Details'}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Organization and facility operational details
                    </p>
                  </div>
                </div>

                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1 rounded-lg border border-slate-300"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Broiler Farms Ltd"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 placeholder-slate-400 text-sm bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Legal / Registered Entity Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Broiler Farms Private Limited"
                    value={formData.legal_name}
                    onChange={(e) => handleInputChange('legal_name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 placeholder-slate-400 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Unique Company Key (10-Digit) *
                      </label>
                      {!existingCompany && (
                        <button
                          type="button"
                          onClick={regenerateKey}
                          disabled={isGeneratingKey}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                          title="Generate fresh 10-digit unique key"
                        >
                          <RefreshCw className={`w-3 h-3 ${isGeneratingKey ? 'animate-spin' : ''}`} />
                          Regenerate
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        disabled={!!existingCompany}
                        maxLength={10}
                        placeholder="e.g. H7K9P2X4M8"
                        value={formData.company_code}
                        onChange={(e) =>
                          handleInputChange(
                            'company_code',
                            e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
                          )
                        }
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-mono font-bold tracking-wider uppercase text-slate-900 text-sm ${
                          existingCompany ? 'bg-slate-100 cursor-not-allowed opacity-80' : 'bg-slate-50/50'
                        }`}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500 font-medium">
                      {existingCompany
                        ? 'Unique company workspace key (immutable identifier).'
                        : 'Auto-generated 10-digit mixed alphanumeric key for workspace isolation.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Operating Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    >
                      <option value="INR">INR (₹) - Indian Rupee</option>
                      <option value="USD">USD ($) - US Dollar</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="GBP">GBP (£) - British Pound</option>
                      <option value="AED">AED (د.إ) - UAE Dirham</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Official Company Email
                    </label>
                    <input
                      type="email"
                      placeholder="info@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Company Phone / Support
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Farm / Facility Address
                  </label>
                  <input
                    type="text"
                    placeholder="Plot No. 12, Agro Industrial Park"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Bengaluru"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      placeholder="Karnataka"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Operating Timezone
                    </label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                      <option value="UTC">UTC (+0:00)</option>
                      <option value="Asia/Dubai">Asia/Dubai (+4:00)</option>
                      <option value="America/New_York">America/New York (EST -5:00)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Want to skip for now?{' '}
                <Link to="/dashboards" className="font-bold text-emerald-700 hover:underline">
                  Go to Dashboard
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {existingCompany ? 'Updating Profile...' : 'Saving Company Profile...'}
                  </>
                ) : (
                  <>
                    {existingCompany ? 'Save Changes' : 'Save Profile & Launch Dashboard'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanySetup;
