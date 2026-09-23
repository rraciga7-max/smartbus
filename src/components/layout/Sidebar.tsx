import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
  badgeColor?: string;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const { notifications, emergencies } = useData();
  const { user, currentRole } = useAuth();
  const unreadCount = notifications.filter(n => !n.read).length;
  const activeEmergencyCount = emergencies.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen && onCloseMobile) {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, onCloseMobile]);

  const navCategories: NavCategory[] = [
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Dashboard', icon: 'dashboard', path: '/app/dashboard' },
        { label: 'Command Center', icon: 'dashboard_customize', path: '/app/command-center' },
        { label: 'Buses', icon: 'directions_bus', path: '/app/buses' },
        { label: 'Drivers', icon: 'badge', path: '/app/drivers' },
        { label: 'Routes', icon: 'alt_route', path: '/app/routes' },
        { label: 'Trips', icon: 'departure_board', path: '/app/trips' },
        { label: 'Dispatch', icon: 'hub', path: '/app/dispatch' },
      ]
    },
    {
      title: 'FLEET',
      items: [
        { label: 'Maintenance', icon: 'build_circle', path: '/app/maintenance' },
        { label: 'Inspections', icon: 'fact_check', path: '/app/inspections' },
        { label: 'Fuel', icon: 'local_gas_station', path: '/app/fuel' },
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { label: 'Analytics', icon: 'analytics', path: '/app/reports' },
        { label: 'AI Insights', icon: 'smart_toy', path: '/app/ai-assistant' },
        { label: 'Demand Forecast', icon: 'trending_up', path: '/app/demand-forecast' },
        { label: 'Route Optimization', icon: 'route', path: '/app/route-optimizer' },
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { label: 'Revenue', icon: 'payments', path: '/app/revenue' },
        { label: 'Expenses', icon: 'receipt_long', path: '/app/expenses' },
      ]
    },
    {
      title: 'SAFETY & COMPLIANCE',
      items: [
        { label: 'Incidents', icon: 'report_problem', path: '/app/incidents' },
        { label: 'Safety', icon: 'warning_amber', path: '/app/emergency', badge: activeEmergencyCount, badgeColor: 'bg-error text-on-error' },
        { label: 'Compliance', icon: 'verified', path: '/app/compliance' },
      ]
    },
    {
      title: 'ADMIN & SYSTEM',
      items: [
        { label: 'Users', icon: 'manage_accounts', path: '/app/users' },
        { label: 'Notifications', icon: 'notifications', path: '/app/notifications', badge: unreadCount },
        { label: 'Audit Logs', icon: 'history', path: '/app/audit-logs' },
        { label: 'Settings', icon: 'settings', path: '/app/settings' },
      ]
    }
  ];

  const { openLogoutModal } = useAuth();

  const renderNavContent = (isMobile: boolean = false) => (
    <div className="flex-1 py-3 px-2 overflow-y-auto no-scrollbar flex flex-col gap-4">
      {navCategories.map((category, catIdx) => (
        <div key={catIdx} className="flex flex-col gap-1">
          {(!isCollapsed || isMobile) && (
            <span className="px-3 text-[10px] font-extrabold text-outline dark:text-slate-500 uppercase tracking-wider mb-1">
              {category.title}
            </span>
          )}
          {category.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={isMobile ? onCloseMobile : undefined}
              title={isCollapsed && !isMobile ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-2xl text-body-md font-medium transition-all duration-200 group relative ${
                  isCollapsed && !isMobile ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20'
                    : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800/80 hover:text-on-surface dark:hover:text-slate-100'
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px] flex-shrink-0">
                {item.icon}
              </span>
              {(!isCollapsed || isMobile) && <span className="truncate text-xs font-semibold">{item.label}</span>}

              {item.badge && item.badge > 0 ? (
                <span
                  className={`flex items-center justify-center font-bold rounded-full ${
                    isCollapsed && !isMobile
                      ? 'absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-[9px] ' + (item.badgeColor || 'bg-error text-on-error') + ' shadow-sm z-10'
                      : 'ml-auto px-2 py-0.5 text-[10px] rounded-full ' + (item.badgeColor || 'bg-error text-on-error')
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </div>
      ))}

      {/* Website Home & Sign Out Action Section */}
      <div className="pt-2 border-t border-surface-container/60 dark:border-slate-800 flex flex-col gap-1 mt-auto">
        <NavLink
          to="/"
          onClick={isMobile ? onCloseMobile : undefined}
          title={isCollapsed && !isMobile ? "Website Home" : undefined}
          className={`flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-2xl text-xs font-bold text-primary dark:text-indigo-400 hover:bg-primary/10 dark:hover:bg-indigo-950/50 transition-colors ${
            isCollapsed && !isMobile ? 'justify-center' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[20px] text-primary dark:text-indigo-400 flex-shrink-0">
            language
          </span>
          {(!isCollapsed || isMobile) && <span>Website Home</span>}
        </NavLink>

        <button
          onClick={() => {
            if (isMobile && onCloseMobile) onCloseMobile();
            openLogoutModal();
          }}
          title={isCollapsed && !isMobile ? "Sign Out" : undefined}
          className={`flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-2xl text-xs font-bold text-error hover:bg-error/10 transition-colors w-full text-left ${
            isCollapsed && !isMobile ? 'justify-center' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[20px] text-error flex-shrink-0">
            logout
          </span>
          {(!isCollapsed || isMobile) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen z-40 bg-surface-container-lowest dark:bg-slate-900 border-r border-surface-container/80 dark:border-slate-800/80 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Logo & Header */}
        <div
          className={`h-16 flex items-center border-b border-surface-container/60 dark:border-slate-800/80 transition-all px-3 relative ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <NavLink
            to="/"
            title="Go to Public Website Home"
            className="flex items-center gap-3 overflow-visible min-w-0 group cursor-pointer flex-shrink-0"
          >
            <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-2xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-stitch-float group-hover:scale-105 transition-transform overflow-visible">
              <span className="material-symbols-outlined text-[24px] leading-none select-none">directions_bus</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate min-w-0">
                <span className="font-bold text-base text-primary dark:text-indigo-400 leading-tight tracking-tight truncate">Smart Bus 360</span>
                <span className="text-[10px] text-outline dark:text-slate-400 uppercase tracking-wider font-semibold truncate">Operations Platform</span>
              </div>
            )}
          </NavLink>

          {/* Toggle Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className={`rounded-full flex items-center justify-center transition-all border shadow-sm ${
              isCollapsed
                ? 'w-7 h-7 bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 border-surface-container-high dark:border-slate-700 absolute -right-3.5 top-1/2 -translate-y-1/2 z-50 hover:scale-110'
                : 'w-7 h-7 bg-surface-container/50 dark:bg-slate-800/50 hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 border-transparent'
            }`}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Navigation Items */}
        {renderNavContent(false)}

        {/* User Footer Profile */}
        <div className="p-3 border-t border-surface-container/60 dark:border-slate-800">
          <NavLink
            to="/app/profile"
            title={isCollapsed ? `${user?.name || 'Alexander Pierce'} • ${currentRole}` : undefined}
            className={`flex items-center gap-3 p-2 rounded-2xl hover:bg-surface-container dark:hover:bg-slate-800 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
              alt="Profile Avatar"
              className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-on-surface dark:text-slate-200 truncate">{user?.name || 'Alexander Pierce'}</span>
                <span className="text-[10px] text-on-surface-variant dark:text-slate-400 truncate">{currentRole}</span>
              </div>
            )}
          </NavLink>
        </div>
      </aside>

      {/* Mobile Off-Canvas Drawer Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onCloseMobile}
          />

          {/* Off-Canvas Slide Drawer */}
          <aside className="relative w-80 max-w-[85vw] h-full bg-surface-container-lowest dark:bg-slate-900 border-r border-surface-container dark:border-slate-800 shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Mobile Sidebar Header */}
            <div className="h-16 px-4 flex items-center justify-between gap-2 border-b border-surface-container/60 dark:border-slate-800 flex-shrink-0">
              <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-2xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-stitch-float overflow-visible">
                  <span className="material-symbols-outlined text-[24px] leading-none select-none">directions_bus</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-base text-primary dark:text-indigo-400 leading-tight tracking-tight truncate">Smart Bus 360</span>
                  <span className="text-[10px] text-outline dark:text-slate-400 uppercase tracking-wider font-semibold truncate">Operations Platform</span>
                </div>
              </NavLink>

              <button
                onClick={onCloseMobile}
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors flex-shrink-0"
                aria-label="Close sidebar"
              >
                <span className="material-symbols-outlined text-[22px] leading-none">close</span>
              </button>
            </div>

            {/* Navigation items for Mobile */}
            {renderNavContent(true)}

            {/* Mobile Footer Profile */}
            <div className="p-3 border-t border-surface-container/60 dark:border-slate-800 flex-shrink-0">
              <NavLink
                to="/app/profile"
                onClick={onCloseMobile}
                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              >
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
                  alt="Profile Avatar"
                  className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                />
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold text-on-surface dark:text-slate-200 truncate">{user?.name || 'Alexander Pierce'}</span>
                  <span className="text-[10px] text-on-surface-variant dark:text-slate-400 truncate">{currentRole}</span>
                </div>
              </NavLink>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};


