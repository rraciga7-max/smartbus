import React from 'react';
import { NavLink } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const tabs = [
    { label: 'Dashboard', icon: 'dashboard', path: '/app/dashboard' },
    { label: 'Buses', icon: 'directions_bus', path: '/app/buses' },
    { label: 'Track', icon: 'near_me', path: '/app/tracking' },
    { label: 'Tickets', icon: 'confirmation_number', path: '/app/passengers' },
    { label: 'Alerts', icon: 'notifications', path: '/app/notifications' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe bg-surface/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-surface-container/60 dark:border-slate-800 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 flex items-center justify-around px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors relative ${
                isActive 
                  ? 'text-primary dark:text-indigo-400 font-bold' 
                  : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-full transition-all ${isActive ? 'bg-primary-container/30 dark:bg-indigo-500/20' : ''}`}>
                  <span className={`material-symbols-outlined text-[24px] ${isActive ? 'filled' : ''}`}>
                    {tab.icon}
                  </span>
                </div>
                <span className="text-[11px] font-medium tracking-tight mt-0.5">{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
