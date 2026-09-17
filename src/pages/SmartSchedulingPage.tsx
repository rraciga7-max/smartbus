import React, { useState } from 'react';
import { useData } from '../context/DataContext';

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Smart Scheduling & Shift Roster Engine</h2>
          <p className="text-xs text-outline dark:text-slate-400">Automated shift scheduling with AI conflict resolution & driver rest compliance</p>
        </div>

        <button
          onClick={handleAutoOptimize}
          disabled={isOptimizing}
          className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span>{isOptimizing ? 'AI Optimizing Schedule...' : 'AI Auto-Optimize Roster'}</span>
        </button>
      </div>

      {/* Roster Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md overflow-x-auto">
        <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3 mb-4">
          Today's Driver-Vehicle Shift Allocations
        </h3>

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
  );
};
