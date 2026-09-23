import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';


export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: 'Transport Manager' as UserRole,
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute password strength score (0 to 4)
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);

  const getStrengthLabel = () => {
    if (!formData.password) return { label: 'Empty', color: 'bg-slate-300 dark:bg-slate-700' };
    if (strengthScore <= 1) return { label: 'Weak', color: 'bg-error' };
    if (strengthScore === 2) return { label: 'Fair', color: 'bg-amber-500' };
    if (strengthScore === 3) return { label: 'Strong', color: 'bg-blue-500' };
    return { label: 'Enterprise Grade', color: 'bg-emerald-500' };
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Work email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address format';
    }
    if (!formData.company.trim()) errs.company = 'Company / Authority is required';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!formData.terms) errs.terms = 'You must accept the Terms of Service & Privacy Policy';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const ok = await register({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      role: formData.role
    });

    setIsLoading(false);

    if (ok) {
      setIsSuccess(true);
      showToast('Account created successfully! Welcome to Smart Bus 360', 'success');
      setTimeout(() => {
        navigate('/app/dashboard', { replace: true });
      }, 1500);
    }
  };

  const strengthInfo = getStrengthLabel();

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary/20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center space-y-3">
        <NavLink to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[28px]">directions_bus</span>
          </div>
          <span className="font-black text-2xl text-primary dark:text-indigo-400 tracking-tight">
            SMART BUS <span className="text-on-surface dark:text-slate-100 font-extrabold">360</span>
          </span>
        </NavLink>

        <h2 className="text-2xl font-black text-on-surface dark:text-white tracking-tight">
          Create Your Enterprise Account
        </h2>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">
          Unlock complete access to IoT telematics, AI operations, and driver safety modules
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-2xl sm:rounded-[32px] p-5 sm:p-10 shadow-2xl space-y-6">
          {isSuccess ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h3 className="text-2xl font-extrabold text-on-surface dark:text-white">Account Created Successfully!</h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 max-w-sm mx-auto">
                Setting up your transit operations workspace... Redirecting to <strong>Command Center</strong>.
              </p>
              <div className="w-32 h-1.5 bg-surface-container dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Vance"
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all ${
                      errors.name ? 'border-error' : 'border-transparent focus:border-primary'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-error font-semibold">{errors.name}</p>}
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Work Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="david@citytransit.com"
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all ${
                      errors.email ? 'border-error' : 'border-transparent focus:border-primary'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-error font-semibold">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Company / Transit Authority *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Metro Transit Systems"
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all ${
                      errors.company ? 'border-error' : 'border-transparent focus:border-primary'
                    }`}
                  />
                  {errors.company && <p className="text-[11px] text-error font-semibold">{errors.company}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 902-1240"
                    className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">Primary Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none"
                >
                  <option value="Super Admin">Super Admin / Executive Director</option>
                  <option value="Transport Manager">Transport Manager</option>
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Dispatcher">Operations Dispatcher</option>
                  <option value="Maintenance Manager">Maintenance Manager</option>
                  <option value="Safety Officer">Safety & Compliance Officer</option>
                  <option value="Finance Manager">Finance Manager</option>
                  <option value="Driver">Bus Driver</option>
                </select>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all ${
                      errors.password ? 'border-error' : 'border-transparent focus:border-primary'
                    }`}
                  />
                  {errors.password && <p className="text-[11px] text-error font-semibold">{errors.password}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Confirm Password *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••••••"
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all ${
                      errors.confirmPassword ? 'border-error' : 'border-transparent focus:border-primary'
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-[11px] text-error font-semibold">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Password Strength Meter */}
              {formData.password && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-outline dark:text-slate-400 font-medium">Password Strength:</span>
                    <span className="font-bold text-on-surface dark:text-slate-200">{strengthInfo.label}</span>
                  </div>
                  <div className="flex gap-1 h-1.5 w-full bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 1 ? strengthInfo.color : 'opacity-20'}`}></div>
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 2 ? strengthInfo.color : 'opacity-20'}`}></div>
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 3 ? strengthInfo.color : 'opacity-20'}`}></div>
                    <div className={`h-full flex-1 transition-all ${strengthScore >= 4 ? strengthInfo.color : 'opacity-20'}`}></div>
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="space-y-1 pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={e => setFormData({ ...formData, terms: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary mt-0.5"
                  />
                  <span className="text-xs text-on-surface-variant dark:text-slate-300">
                    I agree to the <NavLink to="/terms" className="text-primary font-bold hover:underline">Terms of Service</NavLink>, <NavLink to="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</NavLink>, and security compliance rules.
                  </span>
                </label>
                {errors.terms && <p className="text-[11px] text-error font-semibold">{errors.terms}</p>}
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Smart Bus 360 Account</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="text-center text-xs text-on-surface-variant dark:text-slate-400 pt-2">
                Already have an enterprise account?{' '}
                <NavLink to="/login" className="font-extrabold text-primary dark:text-indigo-400 hover:underline">
                  Sign In
                </NavLink>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
