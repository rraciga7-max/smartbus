import React, { useEffect } from 'react';

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onApply?: () => void;
  activeFilterCount?: number;
  children: React.ReactNode;
  title?: string;
}

export const MobileFilterSheet: React.FC<MobileFilterSheetProps> = ({
  isOpen,
  onClose,
  onReset,
  onApply,
  activeFilterCount = 0,
  children,
  title = "Filter Records"
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Overlay Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />

      {/* Bottom Sheet Modal Container */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest dark:bg-slate-900 rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 overflow-hidden z-10 animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[85vh]">
        {/* Drag handle pill */}
        <div className="w-12 h-1.5 bg-surface-container-high dark:bg-slate-700 rounded-full mx-auto my-2.5 flex-shrink-0 sm:hidden" />

        {/* Sheet Header */}
        <div className="px-5 py-3.5 border-b border-surface-container dark:border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-indigo-400 text-[22px]">tune</span>
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100">{title}</h3>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-extrabold">
                {activeFilterCount} Active
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
            aria-label="Close filters"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter Controls Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-on-surface dark:text-slate-200 flex-1">
          {children}
        </div>

        {/* Sheet Footer Actions */}
        <div className="p-4 border-t border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-outline/30 text-on-surface dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              if (onApply) onApply();
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary/90 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
