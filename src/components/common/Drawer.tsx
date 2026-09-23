import React, { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-surface-container-lowest dark:bg-slate-900 shadow-2xl border-l border-surface-container dark:border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-surface-container/80 dark:border-slate-800 flex items-start justify-between bg-surface-container-lowest dark:bg-slate-900">
            <div className="min-w-0 pr-2">
              <h2 className="text-lg sm:text-xl font-bold text-on-surface dark:text-slate-100 truncate">{title}</h2>
              {subtitle && <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-0.5 truncate">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Close drawer"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto text-on-surface dark:text-slate-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
