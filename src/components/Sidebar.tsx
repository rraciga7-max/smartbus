import React from 'react';
import { NavLink } from 'react-router-dom';
import type { UserRole } from '../types';


interface SidebarProps {
  userRole: UserRole;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ userRole, isCollapsed, onToggleCollapse }) => {
  const getNavItems = () => {
    switch (userRole) {
      case 'driver':
        return [
          { path: '/driver', label: 'Driver Console', icon: 'dashboard' },
          { path: '/tracking', label: 'Route Map', icon: 'location_on' },
          { path: '/routes', label: 'Route Stops', icon: 'route' },
          { path: '/maintenance', label: 'Report Issue', icon: 'report_problem' },
        ];
      case 'passenger':
        return [
          { path: '/passenger', label: 'Passenger Home', icon: 'home' },
          { path: '/tracking', label: 'Track Bus', icon: 'directions_bus' },
          { path: '/tickets', label: 'My Tickets', icon: 'confirmation_number' },
          { path: '/routes', label: 'All Routes', icon: 'route' },
        ];
      case 'admin':
      default:
        return [
          { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { path: '/buses', label: 'Bus Fleet', icon: 'directions_bus' },
          { path: '/routes', label: 'Routes & Stops', icon: 'route' },
          { path: '/tracking', label: 'Live Map', icon: 'location_on' },
          { path: '/maintenance', label: 'Maintenance & Alerts', icon: 'build' },
          { path: '/driver', label: 'Driver Console', icon: 'badge' },
          { path: '/passenger', label: 'Passenger View', icon: 'groups' },
          { path: '/tickets', label: 'Ticket Boarding Pass', icon: 'confirmation_number' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`hidden md:flex flex-col fixed top-16 bottom-0 left-0 z-30 bg-surface border-r border-surface-variant transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Badge */}
      <div className="p-4 border-b border-surface-variant flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-label-md">
              360
            </div>
            <div className="flex flex-col">
              <span className="font-title-lg text-title-lg font-bold text-primary leading-tight">
                Smart Bus
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                Fleet Platform
              </span>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors mx-auto"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all font-body-md ${
                isActive
                  ? 'bg-primary text-on-primary font-semibold shadow-sm shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px] flex-shrink-0">
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className="truncate font-label-md">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Role Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-surface-variant bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md uppercase">
              {userRole[0]}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-title-md text-label-md font-bold text-on-surface capitalize truncate">
                {userRole} Mode
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant truncate">
                Connected to TN Depot
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
