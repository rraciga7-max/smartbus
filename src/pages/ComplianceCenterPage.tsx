import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const ComplianceCenterPage: React.FC = () => {
  const { complianceRecords, showToast } = useData();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = complianceRecords.filter(c => filterStatus === 'all' || c.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'valid': return { label: 'Valid', class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
      case 'expiring_0_7': return { label: 'Expiring (0-7 Days)', class: 'bg-rose-500/10 text-rose-500 font-extrabold animate-pulse' };
      case 'expiring_8_30': return { label: 'Expiring (8-30 Days)', class: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold' };
      case 'expiring_31_90': return { label: 'Expiring (31-90 Days)', class: 'bg-blue-500/10 text-blue-500 font-semibold' };
      default: return { label: 'EXPIRED', class: 'bg-rose-600 text-white font-black' };
    }
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Compliance & Vault"
        badge="Audit Ready"
        subtitle="Tracking vehicle registration, fitness certificates, pollution permits, and driver licenses."
        breadcrumb="Safety"
      />

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {(['all', 'valid', 'expiring_0_7', 'expiring_8_30', 'expiring_31_90', 'expired'] as const).map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3.5 py-1.5 rounded-full capitalize transition-all text-xs font-bold whitespace-nowrap ${
              filterStatus === st ? 'bg-primary text-on-primary shadow' : 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Compliance Container */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {filtered.map(c => {
            const badge = getStatusBadge(c.status);
            return (
              <div key={c.id} className="p-4 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 border border-surface-container/60 dark:border-slate-800 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-on-surface dark:text-slate-100">{c.entityName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${badge.class}`}>
                    {badge.label}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-xs text-primary dark:text-indigo-400 block">{c.documentType}</span>
                  <p className="font-mono text-xs text-outline dark:text-slate-400">{c.documentNumber}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-outline dark:text-slate-400 pt-2 border-t border-surface-container/40 dark:border-slate-700/40">
                  <span>Expires: <strong className="text-on-surface dark:text-slate-200">{c.expiryDate}</strong></span>
                  <button
                    onClick={() => showToast(`Document renewal requested for ${c.documentType} (${c.documentNumber}).`)}
                    className="px-3 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-sm"
                  >
                    Renew
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block table-container no-scrollbar">
        <table className="w-full text-left border-collapse text-xs min-w-[750px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4">Entity & ID</th>
              <th className="py-3 px-4">Document Type</th>
              <th className="py-3 px-4">Document Number</th>
              <th className="py-3 px-4">Issue / Expiry Date</th>
              <th className="py-3 px-4">Compliance Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {filtered.map(c => {
              const badge = getStatusBadge(c.status);
              return (
                <tr key={c.id} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">{c.entityName}</td>
                  <td className="py-3.5 px-4 font-semibold text-primary dark:text-indigo-400">{c.documentType}</td>
                  <td className="py-3.5 px-4 font-mono text-outline dark:text-slate-300">{c.documentNumber}</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-400">{c.issueDate} ➔ {c.expiryDate}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase ${badge.class}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => showToast(`Document renewal requested for ${c.documentType} (${c.documentNumber}).`)}
                      className="px-3 py-1 bg-primary text-on-primary font-bold text-[11px] rounded-lg shadow"
                    >
                      Renew & Upload
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
