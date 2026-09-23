import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
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

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative w-[calc(100vw-1rem)] sm:w-full ${maxWidthClasses} bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-surface-container dark:border-slate-800 my-auto z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[88vh]`}>
        {/* Header */}
        <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-surface-container/80 dark:border-slate-800 flex-shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 truncate pr-2">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors flex-shrink-0 min-h-[44px] min-w-[44px]"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto text-on-surface dark:text-slate-200 flex-1 no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

