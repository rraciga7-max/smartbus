import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col justify-center items-center px-4 py-12 text-center selection:bg-primary/20">
      <div className="max-w-md w-full bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[32px] p-8 sm:p-10 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[28px]">directions_bus</span>
          </div>
          <span className="font-black text-2xl text-primary dark:text-indigo-400 tracking-tight">
            SMART BUS <span className="text-on-surface dark:text-slate-100 font-extrabold">360</span>
          </span>
        </div>

        {/* 404 Display */}
        <div>
          <div className="text-6xl font-black text-primary dark:text-indigo-400 tracking-tighter">404</div>
          <h1 className="text-xl font-bold text-on-surface dark:text-slate-100 mt-2">Route Off-Grid • Page Not Found</h1>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 leading-relaxed">
            The operational endpoint or URL path you requested does not exist or has been relocated within the Smart Bus 360 transit grid.
          </p>
        </div>

        {/* Diagnostic Code Box */}
        <div className="p-3 bg-surface-container dark:bg-slate-800/80 rounded-2xl text-[11px] font-mono text-outline dark:text-slate-400 border border-surface-container dark:border-slate-700">
          STATUS: 404_ROUTE_NOT_FOUND • DISPATCH_ERR_04
        </div>

        {/* Navigation Action Buttons */}
        <div className="space-y-3 pt-2">
          {isAuthenticated ? (
            <NavLink
              to="/command-center"
              className="block w-full py-3.5 rounded-2xl bg-primary text-on-primary font-black text-xs shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Return to Operations Command Center ➔
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className="block w-full py-3.5 rounded-2xl bg-primary text-on-primary font-black text-xs shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
            >
              Go to Public Home Page ➔
            </NavLink>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 rounded-xl border border-outline/30 text-on-surface dark:text-slate-300 font-bold text-xs hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
            >
              ← Go Back
            </button>
            <NavLink
              to="/faq"
              className="flex-1 py-2.5 rounded-xl border border-outline/30 text-on-surface dark:text-slate-300 font-bold text-xs hover:bg-surface-container dark:hover:bg-slate-800 transition-colors text-center"
            >
              Help & FAQ
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
