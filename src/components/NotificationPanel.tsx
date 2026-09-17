import React from 'react';
import type { NotificationItem } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="bg-surface w-full max-w-sm h-full shadow-2xl flex flex-col border-l border-surface-variant animate-slideLeft">
        <div className="p-4 border-b border-surface-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="text-label-sm text-primary font-semibold hover:underline"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] block mb-2 opacity-40">
                notifications_off
              </span>
              <p className="font-body-md">No new notifications</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-[16px] border transition-all ${
                  item.category === 'critical'
                    ? 'bg-error-container/30 border-error/30 text-on-surface'
                    : 'bg-surface-container-lowest border-surface-variant text-on-surface'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="font-title-md text-label-md font-bold truncate">{item.title}</span>
                  <span className="font-label-sm text-[11px] text-on-surface-variant opacity-70">
                    {item.timestamp}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

