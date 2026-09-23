import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

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
      <PageHeader
        title="Audit Logs"
        badge="Immutable Trail"
        subtitle="Administrative trail of all user actions, dispatch overrides, and system events."
        breadcrumb="Administration"
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Search audit trail..."
        actions={[
          {
            label: 'Export CSV',
            icon: 'download',
            onClick: () => showToast('Audit logs exported to CSV file successfully.'),
            variant: 'primary'
          }
        ]}
      />

      {/* Audit Log Container */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {filteredLogs.map(log => (
            <div key={log.id} className="p-4 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 border border-surface-container/60 dark:border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-on-surface dark:text-slate-100">{log.userName}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                  log.status === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {log.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary dark:text-indigo-400">{log.module} • {log.action}</span>
                <span className="text-outline dark:text-slate-400 text-[11px]">{log.userRole}</span>
              </div>
              <p className="text-xs text-outline dark:text-slate-300">{log.entity}</p>
              <div className="pt-2 border-t border-surface-container/40 dark:border-slate-700/40 flex justify-between text-[11px] text-outline dark:text-slate-400">
                <span>{log.timestamp}</span>
                <span className="font-mono">{log.ipAddress}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block table-container no-scrollbar">
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
