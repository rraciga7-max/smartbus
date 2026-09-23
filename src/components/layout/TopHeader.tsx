import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth, type UserRole } from '../../context/AuthContext';

import { GlobalSearchModal } from '../common/GlobalSearchModal';

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { notifications, emergencies, markAllNotificationsAsRead, isGlobalSearchOpen, setIsGlobalSearchOpen } = useData();
  const { isDark, toggleTheme } = useTheme();
  const { user, currentRole, setCurrentRole, openLogoutModal } = useAuth();
  
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSwitcherDropdown, setShowSwitcherDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const switcherRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.read);
  const activeEmergencies = emergencies.length;

  const availableRoles: UserRole[] = [
    'Super Admin',
    'Transport Manager',
    'Fleet Manager',
    'Dispatcher',
    'Driver Manager',
    'Maintenance Manager',
    'Finance Manager',
    'Safety Officer',
    'Driver'
  ];

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotificationPopover(false);
      }
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setShowSwitcherDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumb = (path: string) => {
    if (path.includes('/dashboard')) return { group: 'Overview', page: 'Operations Dashboard' };
    if (path.includes('/command-center')) return { group: 'Overview', page: 'Command Center' };
    if (path.includes('/buses')) return { group: 'Fleet', page: 'Buses' };
    if (path.includes('/drivers')) return { group: 'Fleet', page: 'Drivers' };
    if (path.includes('/routes')) return { group: 'Fleet', page: 'Routes' };
    if (path.includes('/trips')) return { group: 'Fleet', page: 'Trips' };
    if (path.includes('/dispatch')) return { group: 'Fleet', page: 'Dispatch' };
    if (path.includes('/tracking')) return { group: 'Fleet', page: 'Live Tracking' };
    if (path.includes('/depots')) return { group: 'Fleet', page: 'Depot Operations' };
    if (path.includes('/scheduling')) return { group: 'Fleet', page: 'Smart Schedule' };
    if (path.includes('/inspections') || path.includes('/inspection')) return { group: 'Maintenance', page: 'Inspections' };
    if (path.includes('/maintenance')) return { group: 'Maintenance', page: 'Maintenance Work Orders' };
    if (path.includes('/emergency')) return { group: 'Safety & Compliance', page: 'Emergency Response' };
    if (path.includes('/ai-assistant') || path.includes('/ai-insights')) return { group: 'Intelligence', page: 'AI Insights' };
    if (path.includes('/route-optimizer')) return { group: 'Intelligence', page: 'Route Optimization' };
    if (path.includes('/passenger-intelligence')) return { group: 'Intelligence', page: 'Passenger Intelligence' };
    if (path.includes('/demand-forecast')) return { group: 'Intelligence', page: 'Demand Forecast' };
    if (path.includes('/driver-risk')) return { group: 'Intelligence', page: 'Driver Risk' };
    if (path.includes('/revenue')) return { group: 'Finance', page: 'Revenue' };
    if (path.includes('/expenses')) return { group: 'Finance', page: 'Expenses' };
    if (path.includes('/fuel')) return { group: 'Finance', page: 'Fuel' };
    if (path.includes('/vendors')) return { group: 'Finance', page: 'Vendors' };
    if (path.includes('/incidents')) return { group: 'Safety & Compliance', page: 'Incidents' };
    if (path.includes('/compliance')) return { group: 'Safety & Compliance', page: 'Compliance' };
    if (path.includes('/notifications')) return { group: 'System', page: 'Notifications' };
    if (path.includes('/users')) return { group: 'System', page: 'Users' };
    if (path.includes('/settings')) return { group: 'System', page: 'Settings' };
    if (path.includes('/audit-logs')) return { group: 'System', page: 'Audit Logs' };
    if (path.includes('/profile')) return { group: 'System', page: 'Profile' };
    if (path.includes('/reports') || path.includes('/analytics')) return { group: 'Intelligence', page: 'Analytics' };
    return { group: 'Operations', page: 'Operations Dashboard' };
  };

  const breadcrumb = getBreadcrumb(location.pathname);
  const currentDateStr = new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <>
      <header className="sticky top-0 w-full z-30 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-stitch-sm border-b border-surface-container/50 dark:border-slate-800/80 pt-safe transition-colors">
        <div className="h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Title, Switcher & Breadcrumb */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-on-surface-variant dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Open navigation menu"
              title="Open navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* Platform Switcher Dropdown */}
            <div className="relative" ref={switcherRef}>
              <button
                onClick={() => {
                  setShowSwitcherDropdown(!showSwitcherDropdown);
                  setShowNotificationPopover(false);
                  setShowProfileDropdown(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-surface-container dark:hover:bg-slate-800 transition-colors text-left"
                title="Switch Experience"
              >
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-black text-primary dark:text-indigo-400 uppercase tracking-wider">
                    <span>Smart Bus 360</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-xs sm:text-sm text-on-surface dark:text-slate-100 tracking-tight truncate">
                      Operations Platform
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline dark:text-slate-400">
                      arrow_drop_down
                    </span>
                  </div>
                </div>
              </button>

              {/* Switcher Dropdown Menu */}
              {showSwitcherDropdown && (
                <div className="absolute left-0 mt-2 w-64 max-w-[calc(100vw-24px)] bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] shadow-2xl border border-surface-container dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider">
                    Switch Area
                  </div>
                  <button
                    onClick={() => {
                      setShowSwitcherDropdown(false);
                      navigate('/app/dashboard');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-primary/10 text-primary dark:text-indigo-400 text-xs font-bold transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[18px]">dashboard</span>
                      <span>Operations Platform</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </button>

                  <button
                    onClick={() => {
                      setShowSwitcherDropdown(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 text-xs font-semibold transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px] text-indigo-500">language</span>
                    <span>Public Website Home</span>
                  </button>
                </div>
              )}
            </div>

            {/* Breadcrumb Separator & Route Title */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-outline dark:text-slate-400 border-l border-surface-container-high dark:border-slate-800 pl-3">
              <span className="font-semibold text-outline/80 dark:text-slate-500">{breadcrumb.group}</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-bold text-on-surface dark:text-slate-200 truncate max-w-[180px] lg:max-w-none">{breadcrumb.page}</span>
            </div>
            
            {/* System Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online • {currentDateStr}</span>
            </div>
          </div>

          {/* Global Search Bar (Trigger) */}
          <div
            onClick={() => setIsGlobalSearchOpen(true)}
            className="hidden md:flex flex-1 max-w-md items-center justify-between px-3.5 py-2 bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700/80 rounded-full cursor-pointer text-body-md text-on-surface-variant dark:text-slate-400 border border-transparent dark:border-slate-700 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="text-xs font-medium">Search buses, drivers, routes, trips...</span>
            </div>
            <kbd className="px-2 py-0.5 bg-surface dark:bg-slate-900 rounded-md text-[10px] font-bold text-outline dark:text-slate-400 border border-surface-container-high dark:border-slate-800">
              Ctrl+K
            </kbd>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Emergency Indicator Button */}
            {activeEmergencies > 0 ? (
              <button
                onClick={() => navigate('/emergency')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-error text-on-error font-bold text-xs rounded-full shadow-lg shadow-error/30 animate-pulse hover:scale-105 transition-transform"
                title="Active Emergencies - Immediate Attention Required!"
              >
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span className="hidden sm:inline">{activeEmergencies} Emergency</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/emergency')}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-300 hover:bg-error/10 hover:text-error transition-colors"
                title="Emergency Control Center"
              >
                <span className="material-symbols-outlined text-[20px]">warning_amber</span>
              </button>
            )}

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsGlobalSearchOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              aria-label="Search"
              title="Search"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="material-symbols-outlined text-[20px] text-amber-500 dark:text-indigo-400">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Notifications Button & Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotificationPopover(!showNotificationPopover);
                  setShowProfileDropdown(false);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors relative"
                aria-label="Notifications"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-surface dark:ring-slate-900"></span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotificationPopover && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-24px)] bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] shadow-2xl border border-surface-container dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container/60 dark:border-slate-800">
                    <span className="font-bold text-on-surface dark:text-slate-100 text-sm">Notifications ({unreadNotifications.length} unread)</span>
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-primary dark:text-indigo-400 font-semibold hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="py-2 max-h-80 overflow-y-auto no-scrollbar flex flex-col gap-2">
                    {notifications.slice(0, 5).map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setShowNotificationPopover(false);
                          if (n.actionUrl) navigate(n.actionUrl);
                        }}
                        className={`p-3 rounded-2xl cursor-pointer transition-colors ${
                          n.read 
                            ? 'bg-surface-container-lowest dark:bg-slate-900 hover:bg-surface-container-low dark:hover:bg-slate-800/60' 
                            : 'bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-on-surface dark:text-slate-200 text-xs">{n.title}</span>
                          <span className="text-outline dark:text-slate-400 text-[10px] whitespace-nowrap">{n.timestamp}</span>
                        </div>
                        <p className="text-on-surface-variant dark:text-slate-400 text-[11px] mt-1 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-surface-container/60 dark:border-slate-800 text-center">
                    <button
                      onClick={() => {
                        setShowNotificationPopover(false);
                        navigate('/notifications');
                      }}
                      className="text-xs text-primary dark:text-indigo-400 font-bold hover:underline"
                    >
                      View Notification Center
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown Menu */}
            <div className="relative pl-2 border-l border-surface-container dark:border-slate-800" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotificationPopover(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 transition-colors focus:outline-none min-h-[44px] min-w-[44px]"
                aria-label="User Menu"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'}
                  alt={user?.name || 'User Avatar'}
                  className="w-9 h-9 rounded-full object-cover border-2 border-primary/30 dark:border-indigo-400/40 shadow-sm"
                />
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-slate-400 hidden sm:inline">
                  {showProfileDropdown ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Profile Dropdown Content */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Overview */}
                  <div className="flex items-center gap-3 pb-3 border-b border-surface-container/60 dark:border-slate-800">
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'}
                      alt={user?.name || 'User Avatar'}
                      className="w-11 h-11 rounded-2xl object-cover border border-primary/30"
                    />
                    <div className="truncate">
                      <h4 className="font-extrabold text-on-surface dark:text-slate-100 text-xs sm:text-sm truncate">
                        {user?.name || 'Alexander Pierce'}
                      </h4>
                      <p className="text-[11px] text-on-surface-variant dark:text-slate-400 truncate">
                        {user?.email || 'alexander@smartbus360.com'}
                      </p>
                      <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-indigo-400 text-[10px] font-extrabold uppercase">
                        {currentRole}
                      </div>
                    </div>
                  </div>

                  {/* Role Selector */}
                  <div className="py-3 border-b border-surface-container/60 dark:border-slate-800 space-y-1">
                    <label className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider block px-2">
                      Active Role Context
                    </label>
                    <select
                      value={currentRole}
                      onChange={(e) => setCurrentRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 rounded-xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-bold text-on-surface dark:text-slate-200 outline-none cursor-pointer"
                    >
                      {availableRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown Navigation Actions */}
                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/app/profile');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-primary dark:text-indigo-400">person</span>
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/app/notifications');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-amber-500">notifications</span>
                      <span>Notifications</span>
                      {unreadNotifications.length > 0 && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-error text-on-error text-[10px] font-bold">
                          {unreadNotifications.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/app/profile?tab=preferences');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-indigo-500">tune</span>
                      <span>Preferences</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/app/profile?tab=security');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-emerald-500">security</span>
                      <span>Security & Sessions</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate('/faq');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 hover:text-on-surface dark:hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px] text-blue-500">help</span>
                      <span>Help & Support FAQ</span>
                    </button>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-2 border-t border-surface-container/60 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        openLogoutModal();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-error/10 text-error hover:bg-error hover:text-on-error text-xs font-bold transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isGlobalSearchOpen} onClose={() => setIsGlobalSearchOpen(false)} />
    </>
  );
};

