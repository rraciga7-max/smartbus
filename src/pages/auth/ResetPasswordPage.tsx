import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const ResetPasswordPage: React.FC = () => {
  const { showToast } = useData();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    setIsLoading(false);
    setIsSuccess(true);
    showToast('Password updated successfully. Please sign in.', 'success');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary/20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <NavLink to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[28px]">directions_bus</span>
          </div>
          <span className="font-black text-2xl text-primary dark:text-indigo-400 tracking-tight">
            SMART BUS <span className="text-on-surface dark:text-slate-100 font-extrabold">360</span>
          </span>
        </NavLink>

        <h2 className="text-2xl font-black text-on-surface dark:text-white tracking-tight">
          Reset Account Password
        </h2>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">
          Enter a new secure password for your Smart Bus 360 account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[32px] p-8 shadow-2xl space-y-6">
          {isSuccess ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface dark:text-white">Password Updated Successfully!</h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-300">
                Your password has been reset. You may now log in with your new credentials.
              </p>
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="w-full py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-2xl bg-error/10 text-error text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">New Password *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">Confirm New Password *</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none"
                />
              </div>

              {/* Strength Indicator */}
              {password && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-outline dark:text-slate-400">Strength:</span>
                    <span className="font-bold text-on-surface dark:text-slate-200">
                      {strengthScore <= 1 ? 'Weak' : strengthScore === 2 ? 'Fair' : strengthScore === 3 ? 'Strong' : 'Enterprise Grade'}
                    </span>
                  </div>
                  <div className="flex gap-1 h-1.5 w-full bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full flex-1 ${strengthScore >= 1 ? 'bg-error' : 'opacity-20'}`}></div>
                    <div className={`h-full flex-1 ${strengthScore >= 2 ? 'bg-amber-500' : 'opacity-20'}`}></div>
                    <div className={`h-full flex-1 ${strengthScore >= 3 ? 'bg-blue-500' : 'opacity-20'}`}></div>
                    <div className={`h-full flex-1 ${strengthScore >= 4 ? 'bg-emerald-500' : 'opacity-20'}`}></div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
