import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

export const SafetyPage: React.FC = () => {
  const safetyPillars = [
    {
      title: 'Driver Safety & Behavior',
      icon: 'shield',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Continuous driver risk scoring, speed governor telemetry enforcement, fatigue monitoring, and harsh driving prevention.',
      highlights: ['Speed Governor Limit Enforcement', 'Distraction Alert Sync', 'Harsh Acceleration & Braking Penalty', 'Gamified Driver Leaderboard']
    },
    {
      title: 'Vehicle Operational Safety',
      icon: 'directions_bus',
      color: 'text-primary bg-primary/10 border-primary/20',
      description: 'Mandatory pre-trip DVIR checklists, live CAN-bus tire pressure telemetry, brake wear sensors, and battery health checks.',
      highlights: ['Mandatory Digital DVIR Check', 'CAN-bus OBD-II Fault Warnings', 'Tire Pressure Telemetry', 'Brake Pad Wear Sensors']
    },
    {
      title: 'Emergency SOS Response',
      icon: 'warning_amber',
      color: 'text-error bg-error/10 border-error/20',
      description: '1-Touch physical SOS driver button triggering instant control room alert, emergency contact broadcast, and nearest relief bus dispatch.',
      highlights: ['Sub-Second Emergency Panic Button', 'Automated Geo-Location Broadcast', 'Relief Bus Dispatch Desk', 'Live Control Room Video Lock']
    },
    {
      title: 'Incident Management',
      icon: 'report_problem',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'End-to-end evidence logging for collisions, traffic disputes, and passenger safety incidents with insurance report exports.',
      highlights: ['Collision Telemetry Snapshot', 'Photo & Video Evidence Vault', 'Root Cause Investigation Log', 'Insurance Claim Export']
    },
    {
      title: 'Regulatory & License Compliance',
      icon: 'verified',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Automated monitoring of commercial driver licenses, vehicle fitness certificates, emission permits, and speed governor audits.',
      highlights: ['Driver License Expiry Alerts', 'Vehicle Pollution & Fitness Sync', 'Automated Audit Reporting', 'Regulatory Non-Compliance Lock']
    },
    {
      title: 'Enterprise Data Security',
      icon: 'lock',
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      description: 'Bank-grade enterprise security architecture protecting transit operational data with strict RBAC, audit logs, and SOC2 compliance.',
      highlights: ['256-bit AES Data Encryption', 'Role-Based Access Control (RBAC)', 'Immutable Security Audit Logs', 'ISO 27001 & SOC2 Type II Certified']
    }
  ];

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          Zero-Compromise Security Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Safety, Compliance & <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-primary">Enterprise Security</span>
        </h1>
        <p className="text-base text-on-surface-variant dark:text-slate-300">
          Built from the ground up to protect passenger lives, vehicle assets, driver safety, and sensitive transit data.
        </p>
      </div>

      {/* PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {safetyPillars.map((p, idx) => (
          <div
            key={idx}
            className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${p.color}`}>
                <span className="material-symbols-outlined text-[28px]">{p.icon}</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">{p.title}</h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-surface-container dark:border-slate-800">
                {p.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-on-surface dark:text-slate-200">
                    <span className="material-symbols-outlined text-emerald-500 text-[16px]">check_circle</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ENTERPRISE TRUST & DATA GOVERNANCE CARD */}
      <div className="p-8 sm:p-12 rounded-[36px] bg-slate-950 border border-slate-800 text-white space-y-8 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
            ENTERPRISE GOVERNANCE & PRIVACY
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">Enterprise Trust & Data Sovereignty</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Smart Bus 360 enforces end-to-end encryption in transit (TLS 1.3) and at rest (AES-256). Detailed audit logs capture every operator action, route override, and ticket transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Role-Based Access Control</span>
            <p className="text-xs text-slate-400">Strict permission boundaries for Super Admins, Fleet Managers, Dispatchers, Drivers, and Maintenance Crews.</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Immutable Audit Logging</span>
            <p className="text-xs text-slate-400">Every dispatch change, driver reassignment, and maintenance work order is permanently logged with IP & timestamp.</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Real-Time Security Monitoring</span>
            <p className="text-xs text-slate-400">Automated intrusion detection, rate limiting, and 99.99% uptime guarantee with multi-region failover.</p>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <RouterLink
            to="/compliance"
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-extrabold text-xs shadow-lg transition-all"
          >
            Launch Compliance & Security Center ➔
          </RouterLink>
        </div>
      </div>
    </div>
  );
};
