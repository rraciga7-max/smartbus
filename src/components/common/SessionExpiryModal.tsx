import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SessionExpiryModal: React.FC = () => {
  const { isSessionExpired, dismissSessionExpired } = useAuth();
  const navigate = useNavigate();

  if (!isSessionExpired) return null;

  const handleReLogin = () => {
    dismissSessionExpired();
    navigate('/login', { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[28px] max-w-md w-full p-6 shadow-2xl space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]">timer_off</span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">Session Expired</h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 leading-relaxed">
            Your security token has expired due to session timeout or inactivity. Please sign in again to continue accessing platform operations.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleReLogin}
            className="w-full py-3 rounded-2xl bg-primary text-on-primary hover:bg-primary/90 font-bold text-sm shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">lock_reset</span>
            <span>Sign In Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
