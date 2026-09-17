import React from 'react';
import { useLocation } from 'react-router-dom';

export const LegalPages: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let pageTitle = 'Privacy Policy';
  if (path === '/terms') pageTitle = 'Terms of Service';
  if (path === '/security') pageTitle = 'Security Architecture & Compliance';

  return (
    <div className="py-12 lg:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-surface-container dark:border-slate-800 pb-6 space-y-2">
        <span className="text-xs font-mono font-bold text-outline dark:text-slate-500 uppercase">LEGAL & COMPLIANCE DCO-360</span>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface dark:text-white tracking-tight">{pageTitle}</h1>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">Last updated: September 2026 • Version 4.2 Enterprise</p>
      </div>

      <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6 text-xs text-on-surface-variant dark:text-slate-300 leading-relaxed">
        {path === '/security' ? (
          <>
            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">1. Data Security Standards</h2>
            <p>Smart Bus 360 enforces 256-bit AES encryption for all stored telemetry records and TLS 1.3 for active GPS data in transit. Our cloud infrastructure is SOC2 Type II and ISO 27001 certified.</p>

            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">2. Role-Based Access Control (RBAC)</h2>
            <p>Strict access boundaries ensure that driver telemetry, ticket revenue data, and executive command functions are strictly isolated per user role permissions.</p>

            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">3. Immutable Audit Trails</h2>
            <p>Every dispatch override, bus assignment change, and driver license modification is logged permanently in an append-only audit ledger with user IP and timestamp verification.</p>
          </>
        ) : path === '/terms' ? (
          <>
            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">1. Enterprise Platform License</h2>
            <p>Smart Bus 360 grants subscriber transit operators a non-exclusive, non-transferable license to access our fleet operations platform, AI route optimization modules, and telematics APIs.</p>

            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">2. Uptime Service Level Agreement (SLA)</h2>
            <p>We guarantee a 99.99% operational uptime SLA for critical emergency response, GPS tracking, and dispatch control interfaces.</p>

            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">3. Hardware & Telematics Integration</h2>
            <p>Operators are responsible for maintaining hardware connectivity of connected CAN-bus dongles and driver devices according to platform specifications.</p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">1. Information We Collect</h2>
            <p>We collect vehicle CAN-bus diagnostics, GPS telematics coordinates, driver duty logs, passenger ticketing metadata, and operator account details necessary to deliver platform operations.</p>

            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">2. How Telemetry Data Is Processed</h2>
            <p>Telemetry data is processed in real time to calculate driver safety scores, predict vehicle maintenance needs, optimize transit routes, and alert dispatchers to emergency events.</p>

            <h2 className="text-lg font-bold text-on-surface dark:text-slate-100">3. Data Ownership & Retention</h2>
            <p>Transit authorities and fleet operators retain 100% ownership of their operational data. Data is retained securely for the duration of the enterprise agreement.</p>
          </>
        )}
      </div>
    </div>
  );
};
