import React from 'react';
import { NavLink } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Fleet Visibility', value: '100%', description: 'Real-time CAN-bus & GPS telemetry precision' },
    { label: 'Operational Efficiency', value: '+35%', description: 'Reduction in route delays and empty deadhead km' },
    { label: 'Safety Monitoring Index', value: '99.4%', description: 'Driver compliance & proactive hazard detection' },
    { label: 'Predictive Maintenance', value: '85%', description: 'Failure prevention rate prior to route breakdown' },
    { label: 'Passenger Intelligence', value: '98%', description: 'ETA accuracy & occupancy forecasting confidence' },
  ];

  const timelineSteps = [
    {
      stage: 'Stage 1',
      title: 'Traditional Fleet Management',
      description: 'Paper logbooks, unmonitored fuel theft, reactive engine repairs after breakdowns occur, and zero passenger visibility.',
      badge: 'Legacy Era',
      badgeColor: 'bg-slate-500/10 text-slate-500 border-slate-500/20'
    },
    {
      stage: 'Stage 2',
      title: 'Connected Fleet',
      description: 'Basic 2G GPS tracking dongles, manual SMS driver dispatches, and disconnected OBD-II diagnostic tools.',
      badge: 'Basic Telematics',
      badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    {
      stage: 'Stage 3',
      title: 'Intelligent Fleet',
      description: 'High-speed CAN-bus IoT hardware, automated route scheduling, driver behavior monitoring, and digital work orders.',
      badge: 'Smart Transit',
      badgeColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
    },
    {
      stage: 'Stage 4',
      title: 'Smart Bus 360',
      description: 'Autonomous AI dispatch, real-time demand prediction heatmaps, fuel theft anomaly detection, and unified 360 operations.',
      badge: 'Enterprise AI Platform',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
    }
  ];

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 text-xs font-bold border border-primary/20">
          Our Company & Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Pioneering the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Intelligent Transit</span>
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant dark:text-slate-300">
          Smart Bus 360 was engineered to transform legacy transit networks into connected, safe, and highly efficient transportation ecosystems.
        </p>
      </div>

      {/* MISSION, VISION & WHY SMART BUS 360 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-indigo-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">Our Mission</h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
            To eliminate transit delays, prevent vehicle breakdowns, and ensure absolute passenger safety by powering fleet operators with actionable IoT telematics and real-time AI intelligence.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-purple-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">visibility</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">Our Vision</h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
            A world where public and private transportation operates with zero unplanned downtime, zero preventable accidents, and seamless multimodal passenger experiences across every city.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">Why Smart Bus 360</h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
            Unlike fragmented single-purpose GPS apps, Smart Bus 360 unifies fleet tracking, driver risk scoring, maintenance work orders, fuel auditing, and passenger ticketing into ONE enterprise system.
          </p>
        </div>
      </div>

      {/* THE PROBLEM WE SOLVE & HOW WE HELP */}
      <div className="rounded-[32px] sm:rounded-[36px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start min-w-0">
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <span className="px-3.5 py-1.5 rounded-full bg-error/10 text-error text-xs font-bold border border-error/20 inline-block">
            The Industry Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-white tracking-tight">
            The Problem Transit Operators Face Today
          </h2>
          <div className="space-y-4 text-xs text-on-surface-variant dark:text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[20px] mt-0.5 flex-shrink-0">cancel</span>
              <div>
                <strong>Unplanned Vehicle Breakdowns:</strong> Component failures during active passenger routes cause costly towing fees and severe brand damage.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[20px] mt-0.5 flex-shrink-0">cancel</span>
              <div>
                <strong>Unmonitored Fuel Theft & Siphoning:</strong> Disconnected fuel receipts mask fuel theft anomalies costing operators 15-22% of total operational expenditure.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-[20px] mt-0.5 flex-shrink-0">cancel</span>
              <div>
                <strong>Lack of Driver Behavior Visibility:</strong> Speeding, harsh braking, and driver fatigue go unmonitored until an accident occurs.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 border-t pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:border-surface-container lg:dark:border-slate-800 lg:pl-12 min-w-0">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 inline-block">
            The Smart Bus 360 Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface dark:text-white tracking-tight">
            How We Help Operators Succeed
          </h2>
          <div className="space-y-4 text-xs text-on-surface-variant dark:text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-500 text-[20px] mt-0.5 flex-shrink-0">check_circle</span>
              <div>
                <strong>Predictive Maintenance Alerts:</strong> Automated sensor algorithms detect oil degradation, brake wear, and battery dips 72 hours early.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-500 text-[20px] mt-0.5 flex-shrink-0">check_circle</span>
              <div>
                <strong>AI Fuel Anomaly Detection:</strong> Real-time fuel sensor correlation flags sudden tank drops or fuel siphoning instantly.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-500 text-[20px] mt-0.5 flex-shrink-0">check_circle</span>
              <div>
                <strong>Driver Safety Scoring & Coaching:</strong> Gamified safety scorecards motivate drivers to adopt fuel-efficient and safe driving habits.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KEY STATISTICS GRID */}
      <div className="space-y-8 min-w-0">
        <div className="text-center max-w-2xl mx-auto space-y-2 min-w-0">
          <h2 className="text-2xl font-extrabold text-on-surface dark:text-white">Measurable Operational Impact</h2>
          <p className="text-xs text-on-surface-variant dark:text-slate-400">Validated benchmarks across 120+ fleet deployments</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 min-w-0">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 text-center space-y-2">
              <div className="text-3xl font-black text-primary dark:text-indigo-400">{stat.value}</div>
              <div className="text-xs font-bold text-on-surface dark:text-slate-200">{stat.label}</div>
              <div className="text-[11px] text-on-surface-variant dark:text-slate-400 leading-tight">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROFESSIONAL TIMELINE SECTION */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-indigo-400 text-xs font-bold">
            Evolution of Transit Technology
          </span>
          <h2 className="text-3xl font-extrabold text-on-surface dark:text-white">The Journey to Smart Bus 360</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 space-y-3 relative shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-outline dark:text-slate-400">{step.stage}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${step.badgeColor}`}>
                  {step.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-on-surface dark:text-slate-100">{step.title}</h3>
              <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <NavLink
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all"
        >
          <span>Join the Smart Bus 360 Network</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </NavLink>
      </div>
    </div>
  );
};
