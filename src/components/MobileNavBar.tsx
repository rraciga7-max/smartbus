import React from 'react';
import { NavLink } from 'react-router-dom';
import type { UserRole } from '../types';


interface MobileNavBarProps {
  userRole: UserRole;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ userRole }) => {
  const getNavItems = () => {
    switch (userRole) {
      case 'driver':
        return [
          { path: '/driver', label: 'Console', icon: 'dashboard' },
          { path: '/tracking', label: 'Route', icon: 'location_on' },
          { path: '/routes', label: 'Stops', icon: 'route' },
          { path: '/maintenance', label: 'Alerts', icon: 'notifications' },
        ];
      case 'passenger':
        return [
          { path: '/passenger', label: 'Home', icon: 'home' },
          { path: '/tracking', label: 'Track', icon: 'directions_bus' },
          { path: '/tickets', label: 'Tickets', icon: 'confirmation_number' },
          { path: '/routes', label: 'Routes', icon: 'route' },
        ];
      case 'admin':
      default:
        return [
          { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { path: '/buses', label: 'Buses', icon: 'directions_bus' },
          { path: '/tracking', label: 'Tracking', icon: 'location_on' },
          { path: '/routes', label: 'Routes', icon: 'route' },
          { path: '/maintenance', label: 'Maintenance', icon: 'build' },
        ];
    }
  };

  const items = getNavItems();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-variant/40 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 flex items-center justify-around px-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full gap-0.5 transition-colors ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
            <span className="font-label-sm text-[11px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
