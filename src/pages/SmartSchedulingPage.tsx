import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const SmartSchedulingPage: React.FC = () => {
  const { buses, drivers, showToast } = useData();

  const [isOptimizing, setIsOptimizing] = useState(false);

  const rosterMatrix = [
    { driver: drivers[0]?.name || 'Rajesh K.', bus: buses[0]?.registrationNumber || 'TN 38 AB 1234', time: '06:00 - 14:00', status: 'assigned', conflict: false },
    { driver: drivers[1]?.name || 'Senthil Kumar', bus: buses[1]?.registrationNumber || 'TN 38 BZ 5678', time: '07:00 - 15:00', status: 'assigned', conflict: false },
    { driver: drivers[2]?.name || 'Murugan P.', bus: buses[2]?.registrationNumber || 'TN 58 AB 1024', time: '08:00 - 16:00', status: 'conflict', conflict: true, reason: 'Bus under maintenance' },
    { driver: drivers[3]?.name || 'Vijay Kumar', bus: buses[3]?.registrationNumber || 'TN 38 CD 9012', time: '14:00 - 22:00', status: 'assigned', conflict: false }
  ];

  const handleAutoOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      showToast('AI Smart Scheduling optimization complete! 1 conflict resolved & shift hours balanced.', 'success');
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Smart Scheduling"
        badge="AI Roster Engine"
        subtitle="Automated shift scheduling with AI conflict resolution & driver rest compliance."
        breadcrumb="Operations"
        actions={[
          {
            label: isOptimizing ? 'AI Optimizing...' : 'Auto-Optimize Roster',
            icon: 'auto_awesome',
            onClick: handleAutoOptimize,
            variant: 'primary'
          }
        ]}
      />

      {/* Roster Container */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3 mb-4 truncate">
          Today's Driver-Vehicle Shift Allocations
        </h3>

        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {rosterMatrix.map((r, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 border border-surface-container/60 dark:border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-on-surface dark:text-slate-100">{r.driver}</span>
                {r.conflict ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-[10px] uppercase">
                    ⚠️ {r.reason}
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                    ✓ Valid
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary dark:text-indigo-400">{r.bus}</span>
                <span className="text-outline dark:text-slate-400 font-mono text-[11px]">{r.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block table-container no-scrollbar">
          <table className="w-full text-left border-collapse text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
                <th className="py-3 px-4">Driver Name</th>
                <th className="py-3 px-4">Assigned Vehicle</th>
                <th className="py-3 px-4">Shift Time Window</th>
                <th className="py-3 px-4">Shift Status</th>
                <th className="py-3 px-4 text-right">Conflict Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
              {rosterMatrix.map((r, idx) => (
                <tr key={idx} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">{r.driver}</td>
                  <td className="py-3.5 px-4 font-semibold text-primary dark:text-indigo-400">{r.bus}</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-300 font-mono">{r.time}</td>
                  <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-200 capitalize">{r.status}</td>
                  <td className="py-3.5 px-4 text-right">
                    {r.conflict ? (
                      <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-[10px] uppercase">
                        ⚠️ {r.reason}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                        ✓ Valid Roster
                      </span>
                    )}
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
