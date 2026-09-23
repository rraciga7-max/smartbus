import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const AuditLogPage: React.FC = () => {
  const { auditLogs, showToast } = useData();
  const [query, setQuery] = useState('');

  const filteredLogs = auditLogs.filter(l =>
    l.userName.toLowerCase().includes(query.toLowerCase()) ||
    l.module.toLowerCase().includes(query.toLowerCase()) ||
    l.action.toLowerCase().includes(query.toLowerCase()) ||
    l.entity.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Enterprise Audit Log & Event History</h2>
          <p className="text-xs text-outline dark:text-slate-400 mt-0.5">Immutable administrative trail of all user actions, dispatch overrides, and system events</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search audit trail..."
            className="flex-1 sm:flex-none px-3.5 py-2.5 bg-surface-container dark:bg-slate-800 rounded-2xl text-xs font-medium text-on-surface dark:text-slate-100 outline-none border border-transparent dark:border-slate-700 min-h-[44px]"
          />
          <button
            onClick={() => showToast('Audit logs exported to CSV file successfully.')}
            className="w-full sm:w-auto px-4 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-2xl shadow min-h-[44px]"
          >
            Export Audit CSV
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        <div className="table-container no-scrollbar">
        <table className="w-full text-left border-collapse text-xs min-w-[750px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4">Timestamp & User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Module</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Entity Details</th>
              <th className="py-3 px-4">IP Address</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">
                  {log.userName}
                  <span className="block text-[10px] text-outline dark:text-slate-400 font-normal">{log.timestamp}</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-primary dark:text-indigo-400">{log.userRole}</td>
                <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-200">{log.module}</td>
                <td className="py-3.5 px-4 font-semibold text-on-surface dark:text-slate-100">{log.action}</td>
                <td className="py-3.5 px-4 text-outline dark:text-slate-300">{log.entity}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-outline dark:text-slate-400">{log.ipAddress}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                    log.status === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
