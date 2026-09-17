import React from 'react';
import { useData } from '../../context/DataContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success' 
              ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-primary/25' 
              : toast.type === 'error' 
                ? 'bg-error dark:bg-rose-700 text-on-error shadow-error/25' 
                : 'bg-inverse-surface dark:bg-slate-800 text-inverse-on-surface dark:text-slate-100 shadow-black/20 border border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[22px]">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            <span className="text-body-md font-medium text-sm sm:text-base">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors ml-3 flex-shrink-0"
            aria-label="Dismiss toast"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
