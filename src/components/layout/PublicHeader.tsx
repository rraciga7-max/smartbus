import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export const PublicHeader: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, openLogoutModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'AI', path: '/ai' },
    { label: 'Security', path: '/safety' },
  ];

  const mobileNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'AI & Intelligence', path: '/ai' },
    { label: 'Security', path: '/safety' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-surface-container/60 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[26px]">directions_bus</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl text-primary dark:text-indigo-400 tracking-tight leading-none">
              SMART BUS <span className="text-on-surface dark:text-slate-100 font-black">360</span>
            </span>
            <span className="text-[10px] text-outline dark:text-slate-400 uppercase tracking-widest font-bold mt-0.5">
              Intelligent Fleet Platform
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-primary/10 dark:bg-indigo-950/80 text-primary dark:text-indigo-400 font-extrabold'
                    : 'text-on-surface-variant dark:text-slate-300 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Theme toggle"
          >
            <span className="material-symbols-outlined text-[22px] text-amber-500 dark:text-indigo-400">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/app/dashboard')}
                className="px-4 py-2.5 rounded-2xl bg-primary text-on-primary hover:bg-primary/90 font-bold text-xs shadow-md shadow-primary/20 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                <span className="hidden sm:inline">Operations Platform</span>
              </button>
              
              <button
                onClick={openLogoutModal}
                className="p-2.5 rounded-2xl text-on-surface-variant dark:text-slate-400 hover:bg-error/10 hover:text-error transition-colors"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <NavLink
                to="/login"
                className="px-4 py-2.5 rounded-2xl border border-outline/30 text-on-surface dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800 text-xs font-bold transition-all"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-5 py-2.5 rounded-2xl bg-primary text-on-primary hover:bg-primary/90 text-xs font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </NavLink>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center text-on-surface dark:text-slate-100 hover:bg-surface-container dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {!isAuthenticated && (
            <div className="pt-4 border-t border-surface-container dark:border-slate-800 flex flex-col gap-2">
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl text-center border border-outline/30 text-on-surface dark:text-slate-100 font-bold text-sm"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl text-center bg-primary text-on-primary font-bold text-sm shadow-md"
              >
                Get Started Free
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
