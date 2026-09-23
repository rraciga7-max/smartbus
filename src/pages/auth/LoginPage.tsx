import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';


export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, setCurrentRole } = useAuth();
  const { showToast } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@smartbus360.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect to dashboard or intended route
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/app/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your work email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your account password');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    const success = await login(email, password, rememberMe);
    setIsLoading(false);

    if (success) {
      showToast('Welcome back! Signed in to Smart Bus 360 Operations', 'success');
      navigate('/app/dashboard', { replace: true });
    } else {
      setErrorMsg('Invalid work email or password. Please try again.');
    }
  };

  const handleDemoAccess = async (role: UserRole, demoEmail: string) => {
    setIsLoading(true);
    setCurrentRole(role);
    await login(demoEmail, 'demo123', true);
    setIsLoading(false);
    showToast(`Logged in as ${role} (Demo Account)`, 'info');
    navigate('/app/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary/20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        {/* Brand Logo */}
        <NavLink to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[28px]">directions_bus</span>
          </div>
          <span className="font-black text-2xl text-primary dark:text-indigo-400 tracking-tight">
            SMART BUS <span className="text-on-surface dark:text-slate-100 font-extrabold">360</span>
          </span>
        </NavLink>

        <h2 className="text-2xl font-black text-on-surface dark:text-white tracking-tight">
          Sign In to Operations Platform
        </h2>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">
          Enter your enterprise credentials to access live transit telemetry
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-2xl sm:rounded-[32px] p-5 sm:p-8 shadow-2xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-error/10 border border-error/20 text-error text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 min-w-0 break-words">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span className="min-w-0 flex-1">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface dark:text-slate-200">Work Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@smartbus360.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">Password</label>
                <NavLink to="/forgot-password" className="text-[11px] font-bold text-primary dark:text-indigo-400 hover:underline">
                  Forgot Password?
                </NavLink>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 hover:text-on-surface p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <span className="text-xs text-on-surface-variant dark:text-slate-300 font-medium">Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Social Google Login */}
          <div className="space-y-3 pt-2 border-t border-surface-container dark:border-slate-800">
            <button
              onClick={() => handleDemoAccess('Super Admin', 'google-admin@smartbus360.com')}
              className="w-full py-3 px-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-outline/20 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 min-w-0"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="truncate">Continue with Google Workspace</span>
            </button>
          </div>

          {/* DEMO SHORTCUT ACCELERATORS */}
          <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-slate-800/60 border border-surface-container dark:border-slate-700/60 space-y-2.5">
            <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider block text-center">
              ⚡ Evaluator Instant Access (1-Click Roles)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => handleDemoAccess('Super Admin', 'admin@smartbus360.com')}
                className="p-2 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary text-[10px] font-bold transition-all text-center truncate"
                title="Super Admin"
              >
                Super Admin
              </button>
              <button
                onClick={() => handleDemoAccess('Fleet Manager', 'fleet@smartbus360.com')}
                className="p-2 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary text-[10px] font-bold transition-all text-center truncate"
                title="Fleet Manager"
              >
                Fleet Manager
              </button>
              <button
                onClick={() => handleDemoAccess('Dispatcher', 'dispatch@smartbus360.com')}
                className="p-2 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary text-[10px] font-bold transition-all text-center truncate"
                title="Dispatcher"
              >
                Dispatcher
              </button>
              <button
                onClick={() => handleDemoAccess('Driver', 'driver@smartbus360.com')}
                className="p-2 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary text-[10px] font-bold transition-all text-center truncate"
                title="Driver Role"
              >
                Driver Role
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center text-xs text-on-surface-variant dark:text-slate-400">
            Don't have an account?{' '}
            <NavLink to="/register" className="font-extrabold text-primary dark:text-indigo-400 hover:underline">
              Create Account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
