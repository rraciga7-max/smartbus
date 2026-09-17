import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LogoutConfirmModal: React.FC = () => {
  const { isLogoutModalOpen, closeLogoutModal, confirmLogout } = useAuth();
  const navigate = useNavigate();

  if (!isLogoutModalOpen) return null;

  const handleConfirm = () => {
    confirmLogout();
    navigate('/', { replace: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[28px] max-w-md w-full p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-error/10 text-error flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[28px]">logout</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Sign out of Smart Bus 360?</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">
              You will be signed out of the Operations Platform.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-surface-container-low dark:bg-slate-800/60 rounded-2xl border border-surface-container/60 dark:border-slate-700/50 text-xs text-on-surface-variant dark:text-slate-300 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">info</span>
          <span>Your active session will be ended. Unsaved dispatch logs will remain in temporary storage.</span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-surface-container/60 dark:border-slate-800">
          <button
            onClick={closeLogoutModal}
            className="px-4 py-2.5 rounded-xl border border-outline/30 text-on-surface dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-error text-on-error hover:bg-error/90 text-xs font-bold shadow-md shadow-error/20 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
