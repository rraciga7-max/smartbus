import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'command' | 'ai' | 'telemetry'>('command');

  return (
    <div className="space-y-24 pb-16 overflow-x-clip">
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[600px] bg-gradient-to-b from-primary/10 via-indigo-500/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950/80 text-primary dark:text-indigo-400 border border-primary/20 text-xs font-extrabold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span>⚡ Next-Generation IoT & AI Transit Infrastructure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-on-surface dark:text-white tracking-tight leading-[1.1]">
            Intelligent Fleet Management for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-blue-500">Smarter Transportation</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-on-surface-variant dark:text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Manage your buses, drivers, routes and operations from one intelligent platform. Unify IoT telemetry, predictive AI, and real-time passenger analytics into zero-friction transit control.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NavLink
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary text-on-primary font-black text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </NavLink>

            <NavLink
              to="/features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-outline/30 text-on-surface dark:text-slate-100 font-bold text-base hover:bg-surface-container dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">explore</span>
              <span>Explore Features</span>
            </NavLink>

            <NavLink
              to="/app/dashboard"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-surface-container-high dark:bg-slate-800 text-primary dark:text-indigo-400 font-extrabold text-base hover:bg-surface-container-highest dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
              <span>Open Operations Platform</span>
            </NavLink>
          </div>

          {/* Floating Live System Metrics Bar */}
          <div className="pt-8 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto p-3 sm:p-4 bg-surface-container-lowest/80 dark:bg-slate-900/80 backdrop-blur-xl border border-surface-container dark:border-slate-800 rounded-3xl shadow-2xl min-w-0">
              <div className="p-2 sm:p-3 text-center border-r border-surface-container dark:border-slate-800 min-w-0">
                <div className="text-xl sm:text-3xl font-black text-primary dark:text-indigo-400 truncate">128</div>
                <div className="text-[10px] sm:text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mt-0.5 truncate">Total Buses</div>
              </div>
              <div className="p-2 sm:p-3 text-center md:border-r border-surface-container dark:border-slate-800 min-w-0">
                <div className="text-xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                  96
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mt-0.5 truncate">Active On Route</div>
              </div>
              <div className="p-2 sm:p-3 text-center border-r border-surface-container dark:border-slate-800 min-w-0">
                <div className="text-xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 truncate">248</div>
                <div className="text-[10px] sm:text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mt-0.5 truncate">Trips Today</div>
              </div>
              <div className="p-2 sm:p-3 text-center min-w-0">
                <div className="text-xl sm:text-3xl font-black text-indigo-600 dark:text-purple-400 truncate">18,420</div>
                <div className="text-[10px] sm:text-xs font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mt-0.5 truncate">Riders Today</div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO LIVE SYSTEM PREVIEW MOCKUP */}
        <div className="mt-12 relative max-w-6xl mx-auto min-w-0">
          <div className="rounded-[32px] overflow-hidden border-2 border-surface-container dark:border-slate-800 shadow-2xl bg-surface-container-lowest dark:bg-slate-900 min-w-0">
            {/* Header Mockup Bar */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-surface-container dark:bg-slate-850 border-b border-surface-container dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-3 h-3 rounded-full bg-error inline-block flex-shrink-0"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block flex-shrink-0"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block flex-shrink-0"></span>
                <span className="ml-2 text-xs font-bold text-on-surface dark:text-slate-300 truncate">smartbus360-live-command-center</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                <button
                  onClick={() => setActiveTab('command')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'command' ? 'bg-primary text-on-primary' : 'text-on-surface-variant dark:text-slate-400'
                  }`}
                >
                  Command Center
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'ai' ? 'bg-primary text-on-primary' : 'text-on-surface-variant dark:text-slate-400'
                  }`}
                >
                  AI Operations
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'telemetry' ? 'bg-primary text-on-primary' : 'text-on-surface-variant dark:text-slate-400'
                  }`}
                >
                  Live Telemetry
                </button>
              </div>
            </div>

            {/* Visual Content Frame */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-surface-container-lowest dark:bg-slate-950 min-w-0">
              {/* Radar Simulation / Map */}
              <div className="lg:col-span-2 relative min-h-[300px] sm:min-h-[320px] rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 sm:p-6 text-white min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 z-10 min-w-0">
                  <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700 text-[11px] sm:text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
                    <span>Live GPS Feed • 50ms</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono text-indigo-400 font-bold truncate">GRID-COIMBATORE-S4</span>
                </div>

                {/* Grid Visual */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                {/* Simulated Bus Pins */}
                <div className="absolute top-1/3 left-6 sm:left-1/4 flex items-center gap-1.5 sm:gap-2 bg-indigo-600 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg animate-bounce max-w-[80%] truncate">
                  <span className="material-symbols-outlined text-[14px] flex-shrink-0">directions_bus</span>
                  <span className="truncate">BUS-1024 • 42 km/h</span>
                </div>

                <div className="absolute bottom-1/3 right-4 sm:right-1/3 flex items-center gap-1.5 sm:gap-2 bg-emerald-600 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg max-w-[80%] truncate">
                  <span className="material-symbols-outlined text-[14px] flex-shrink-0">directions_bus</span>
                  <span className="truncate">BUS-1088 • On Time</span>
                </div>

                <div className="z-10 pt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 min-w-0">
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-xs text-slate-400 font-medium block truncate">Active Dispatch Corridor</span>
                    <h4 className="text-base sm:text-lg font-bold text-white truncate">Gandhipuram Main Bus Station → Singanallur</h4>
                  </div>
                  <NavLink to="/tracking" className="w-full sm:w-auto text-center px-4 py-2 bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold rounded-xl shadow-md flex-shrink-0">
                    Open Full Map ➔
                  </NavLink>
                </div>
              </div>

              {/* Side Live Feed Panel */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-900 border border-surface-container dark:border-slate-800">
                  <span className="text-xs font-bold text-primary dark:text-indigo-400 uppercase tracking-wider">AI Recommendation</span>
                  <h4 className="text-sm font-bold text-on-surface dark:text-slate-100 mt-1">Route 21A Traffic Reroute</h4>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1">
                    Congestion detected at Hope College flyover. Re-routing 4 active buses saves 14 mins per trip.
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">+18% Efficiency</span>
                    <NavLink to="/ai-assistant" className="text-xs text-primary dark:text-indigo-400 font-bold hover:underline">Apply AI Action ➔</NavLink>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-900 border border-surface-container dark:border-slate-800">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Driver Safety Score</span>
                  <h4 className="text-sm font-bold text-on-surface dark:text-slate-100 mt-1">Rajesh Kumar (Driver #402)</h4>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">98/100</div>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400">Zero harsh braking, 100% route compliance today.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUE PROPOSITIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-on-surface dark:text-white tracking-tight">
            Built for Modern Transit Operators
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-slate-400">
            Four pillars of intelligence powering public transport networks, private charter fleets, and corporate transit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 space-y-4 hover:border-primary/40 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-indigo-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">radar</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Real-Time Telemetry</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Sub-second GPS tracking, CAN-bus engine diagnostics, live speed governor alerts, and geo-fenced depot boundaries.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 space-y-4 hover:border-primary/40 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-purple-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">psychology</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Predictive AI Engine</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Predict mechanical breakdowns 72 hours before occurrence, forecast passenger demand peaks, and optimize route timing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 space-y-4 hover:border-primary/40 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">shield</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Driver Safety & Risk</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Continuous safety scoring, distraction detection, license compliance validation, and automated fatigue warnings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 space-y-4 hover:border-primary/40 transition-colors shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">payments</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Financial & Fuel Control</h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              Automated fuel theft anomaly detection, digital ticket auditing, work order expense tracking, and vendor procurement.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
        <div className="rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-primary via-indigo-900 to-slate-950 p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 min-w-0">
          <div className="space-y-4 max-w-2xl min-w-0">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 inline-block">
              Transform Your Fleet Operations Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to experience zero-friction transit management?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Join leading transit authorities and private bus operators using Smart Bus 360 to increase reliability and slash fuel costs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full md:w-auto flex-shrink-0">
            <NavLink
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-extrabold text-sm shadow-xl transition-all text-center"
            >
              Start Free Enterprise Trial
            </NavLink>
            <NavLink
              to="/contact"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-white/30 text-white hover:bg-white/10 font-bold text-sm transition-all text-center"
            >
              Contact Sales Desk
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
