import React from 'react';
import { NavLink } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest dark:bg-slate-950 border-t border-surface-container/80 dark:border-slate-800/80 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-[24px]">directions_bus</span>
              </div>
              <span className="font-extrabold text-xl text-primary dark:text-indigo-400 tracking-tight">
                SMART BUS <span className="text-on-surface dark:text-slate-100">360</span>
              </span>
            </NavLink>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed max-w-sm">
              Smart Bus 360 is the leading enterprise transit operations platform unifying IoT telematics, AI route optimization, driver safety scoring, and real-time passenger intelligence.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                SOC2 Type II & ISO 27001 Certified
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
              <li><NavLink to="/features" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Platform Features</NavLink></li>
              <li><NavLink to="/ai" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">AI & Intelligence</NavLink></li>
              <li><NavLink to="/how-it-works" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">How It Works</NavLink></li>
              <li><NavLink to="/safety" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Safety & Security</NavLink></li>
              <li><NavLink to="/system-health" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">System Architecture</NavLink></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
              <li><NavLink to="/solutions" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Public Transit</NavLink></li>
              <li><NavLink to="/solutions" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Private Fleet Operators</NavLink></li>
              <li><NavLink to="/solutions" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">School Transportation</NavLink></li>
              <li><NavLink to="/solutions" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Corporate Shuttles</NavLink></li>
              <li><NavLink to="/solutions" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Tour & Travel Operators</NavLink></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
              <li><NavLink to="/about" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">About Us</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Contact Sales</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Technical Support</NavLink></li>
              <li><NavLink to="/faq" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">FAQ</NavLink></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant dark:text-slate-400 font-medium">
              <li><NavLink to="/privacy" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Terms of Service</NavLink></li>
              <li><NavLink to="/security" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Security Architecture</NavLink></li>
              <li><NavLink to="/privacy" className="hover:text-primary dark:hover:text-indigo-400 transition-colors">Cookie Preferences</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-container dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant dark:text-slate-400">
          <p>© {new Date().getFullYear()} Smart Bus 360 Inc. All rights reserved. Built for Next-Gen Transit Operators.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer">Twitter / X</span>
            <span className="hover:text-primary cursor-pointer">LinkedIn</span>
            <span className="hover:text-primary cursor-pointer">GitHub</span>
            <span className="hover:text-primary cursor-pointer">YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
