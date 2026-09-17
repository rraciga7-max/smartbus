import React from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="bg-surface w-full max-w-md h-full shadow-2xl flex flex-col border-l border-surface-variant animate-slideLeft">
        <div className="px-6 py-4 border-b border-surface-variant flex items-center justify-between bg-surface-container-low">
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 font-body-md text-on-surface">
          {children}
        </div>
      </div>
    </div>
  );
};
