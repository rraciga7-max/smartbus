import React from 'react';
import type { UserRole } from '../types';


interface HeaderProps {
  title?: string;
  userRole?: UserRole;
  showBack?: boolean;
  onBack?: () => void;
  onToggleNotifications?: () => void;
  onRoleChange?: (role: UserRole) => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Admin Dashboard',
  userRole = 'admin',
  showBack = false,
  onBack,
  onToggleNotifications,
  onRoleChange,
  unreadNotificationsCount = 1,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-variant/40 pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left Side: Back button or Logo + Title */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack || (() => window.history.back())}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors active:scale-95"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-on-surface">arrow_back</span>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-surface-variant flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                directions_bus
              </span>
            </div>
          )}
          <span className="font-title-lg text-title-lg font-bold text-primary tracking-tight">
            {title}
          </span>
        </div>

        {/* Right Side: Role Selector, Notifications & Avatar */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Quick Role Switcher pill (Desktop/Tablet) */}
          {onRoleChange && (
            <div className="hidden sm:flex items-center bg-surface-container rounded-full p-1 border border-surface-variant/60 text-label-sm">
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-3 py-1 rounded-full transition-all ${
                  userRole === 'admin'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => onRoleChange('driver')}
                className={`px-3 py-1 rounded-full transition-all ${
                  userRole === 'driver'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Driver
              </button>
              <button
                onClick={() => onRoleChange('passenger')}
                className={`px-3 py-1 rounded-full transition-all ${
                  userRole === 'passenger'
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Passenger
              </button>
            </div>
          )}

          {/* Notifications Button */}
          <button
            onClick={onToggleNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors active:scale-95"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
              notifications
            </span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface animate-pulse" />
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2">
            <img
              alt="Profile Avatar"
              className="w-9 h-9 rounded-full object-cover border border-outline-variant shadow-sm"
              src={
                userRole === 'driver'
                  ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5DlfNaxxn7vbJtvODVUddcLA8qNvbugVyQwEyzYjZGmkQ2430nzjfjBmbbjRgBVIODOc-QwacG8q2c-gJUWT_bc3c3sUra1A4bkFEyKPu6GJ-TwE4S9o0NBB7d6Ax6NOnbxiBGdgJa4ApBLbh6Kk05flzQOPJWuUe9dKbBFFRi88TD_vKyU_DNr3nxEztAQ71tlpnVFy40d96FkydQkA9tfHNabGXnHYF-iddVR6Lq3kIMIst5LMng'
                  : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5DlfNaxxn7vbJtvODVUddcLA8qNvbugVyQwEyzYjZGmkQ2430nzjfjBmbbjRgBVIODOc-QwacG8q2c-gJUWT_bc3c3sUra1A4bkFEyKPu6GJ-TwE4S9o0NBB7d6Ax6NOnbxiBGdgJa4ApBLbh6Kk05flzQOPJWuUe9dKbBFFRi88TD_vKyU_DNr3nxEztAQ71tlpnVFy40d96FkydQkA9tfHNabGXnHYF-iddVR6Lq3kIMIst5LMng'
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};
