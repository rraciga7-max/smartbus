import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-surface-variant w-full max-w-sm flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[24px]">warning</span>
        </div>
        <div className="text-center">
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-1">{title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[16px] bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 rounded-[16px] bg-error text-on-error font-label-md font-semibold hover:bg-error/90 transition-colors shadow-sm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
