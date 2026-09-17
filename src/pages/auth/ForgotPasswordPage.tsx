import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid work email address');
      return;
    }

    setError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 700));
    setIsLoading(false);
    setIsSubmitted(true);
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
          Forgot Your Password?
        </h2>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">
          Enter your registered work email to receive password reset instructions
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[32px] p-8 shadow-2xl space-y-6">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface dark:text-white">Reset Link Transmitted</h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-300">
                Password reset instructions have been sent to <strong>{email}</strong>. Please check your inbox and spam folder.
              </p>
              <div className="pt-2">
                <NavLink
                  to="/reset-password"
                  className="block w-full py-3 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md mb-2"
                >
                  Proceed to Reset Password Form (Demo)
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-xs text-primary dark:text-indigo-400 font-bold hover:underline"
                >
                  ← Back to Login
                </NavLink>
              </div>
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
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">Work Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@smartbus360.com"
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold text-on-surface dark:text-slate-100 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <NavLink to="/login" className="text-xs font-bold text-outline hover:text-on-surface dark:text-slate-400 dark:hover:text-slate-200">
                  ← Back to Sign In
                </NavLink>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
