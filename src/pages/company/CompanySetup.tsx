/**
 * Hactex — Company Profile Setup Page (/company/setup)
 * Configures the organization / tenant profile.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, ArrowRight, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { companyService } from '../../api';
import { setAuth, getUser, getToken } from '../../lib/auth';
import { useCompany } from '../../context/CompanyContext';

export const CompanySetup: React.FC = () => {
  const navigate = useNavigate();
  const { setCompany } = useCompany();
  const currentUser = getUser();

  // Company Form State
  const [companyName, setCompanyName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [companyEmail, setCompanyEmail] = useState(currentUser?.email || '');
  const [companyPhone, setCompanyPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-generate company code suggestion based on name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCompanyName(val);
    if (!companyCode || companyCode.startsWith(val.slice(0, 3).toUpperCase())) {
      const codeSuggestion = val.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase();
      if (codeSuggestion.length >= 3) {
        setCompanyCode(codeSuggestion + '01');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Basic Validation
    if (!companyName.trim() || companyName.length < 2) {
      setError('Please provide a valid company name (at least 2 characters).');
      return;
    }
    if (!companyCode.trim() || companyCode.length < 2) {
      setError('Please provide a unique company code (e.g. HACTEX01).');
      return;
    }

    try {
      setLoading(true);
      const res = await companyService.setupCompany({
        company: {
          name: companyName.trim(),
          legal_name: legalName.trim() || companyName.trim(),
          company_code: companyCode.trim().toUpperCase(),
          email: companyEmail.trim(),
          phone: companyPhone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          currency,
          timezone,
        }
      });

      if (res.success && res.data) {
        setSuccessMsg('Company profile created successfully! Setting up your workspace...');
        const { token, user, company } = res.data;

        // Persist credentials & company context
        const activeToken = token || getToken() || '';
        const activeUser = user || currentUser;
        if (activeUser && activeToken) {
          setAuth(activeToken, activeUser, company);
        }
        if (company) {
          setCompany(company);
        }

        setTimeout(() => {
          navigate('/dashboards/sales', { replace: true });
        }, 1000);
      } else {
        setError(res.error || 'Failed to setup company. Please verify details and try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'A network error occurred during company setup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Company Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Set Up Your <span className="text-emerald-700">Company Profile</span>
          </h1>
          <p className="mt-2 text-slate-600 text-sm max-w-lg mx-auto font-medium">
            Configure your poultry enterprise or farm organization details. Your flock and hatchery data will be isolated under this profile.
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-800 flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-emerald-800 flex items-start gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">{successMsg}</div>
          </div>
        )}

        {/* Company Profile Form Card */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-slate-900/15 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">Company Profile</h2>
                <p className="text-xs text-slate-500 font-medium">Organization and facility operational details</p>
              </div>
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
                  value={companyName}
                  onChange={handleNameChange}
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
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 placeholder-slate-400 text-sm bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Company Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="APEX01"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-bold uppercase text-slate-900 text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Operating Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
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
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
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
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    value={state}
                    onChange={(e) => setState(e.target.value)}
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
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-300 focus:border-emerald-600 focus:outline-none font-medium text-slate-900 text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Operating Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
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
              <Link to="/dashboards/sales" className="font-bold text-emerald-700 hover:underline">
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
                  Saving Company Profile...
                </>
              ) : (
                <>
                  Save Profile & Launch Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
