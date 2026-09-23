import React from 'react';
import { useData } from '../context/DataContext';

export const DriverRiskAnalyticsPage: React.FC = () => {
  const { drivers, showToast } = useData();

  const getRiskLevel = (score: number) => {
    if (score >= 95) return { level: 'Low Risk', class: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
    if (score >= 90) return { level: 'Medium Risk', class: 'bg-blue-500/10 text-blue-500' };
    if (score >= 85) return { level: 'High Risk', class: 'bg-amber-500/10 text-amber-500' };
    return { level: 'Critical Risk', class: 'bg-rose-500/10 text-rose-500 font-extrabold' };
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Header */}
      <div className="min-w-0">
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100 truncate">Driver Risk & Safety Telemetry Analytics</h2>
        <p className="text-xs text-outline dark:text-slate-400 truncate">Behavioral safety scores, harsh braking events, overspeeding telemetry, and coaching plans</p>
      </div>

      {/* Driver Risk Rankings Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        <div className="table-container no-scrollbar">
        <table className="w-full text-left border-collapse text-xs min-w-[800px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4">Driver Name</th>
              <th className="py-3 px-4">Safety Score</th>
              <th className="py-3 px-4">Risk Category</th>
              <th className="py-3 px-4">Overspeeding</th>
              <th className="py-3 px-4">Harsh Braking</th>
              <th className="py-3 px-4">Idle Fuel Time</th>
              <th className="py-3 px-4">Coaching Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {drivers.map(drv => {
              const risk = getRiskLevel(drv.safetyScore);
              const sm = drv.safetyMetrics || { overspeedEvents: 1, harshBrakingEvents: 2, idleTimeHours: 4.2 };

              return (
                <tr key={drv.id} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold">
                    <div className="flex items-center gap-3">
                      <img src={drv.avatar} alt={drv.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="text-on-surface dark:text-slate-100">{drv.name}</span>
                        <p className="text-[11px] text-outline dark:text-slate-400">{drv.licenseNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-sm text-on-surface dark:text-slate-100">{drv.safetyScore} / 100</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${risk.class}`}>
                      {risk.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-amber-500">{sm.overspeedEvents} Events</td>
                  <td className="py-3.5 px-4 font-semibold text-amber-500">{sm.harshBrakingEvents} Events</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-300">{sm.idleTimeHours} hrs</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => showToast(`Personalized defensive driving coaching assigned to ${drv.name}.`)}
                      className="px-3 py-1 bg-primary/10 text-primary dark:text-indigo-400 font-bold text-[11px] rounded-lg hover:bg-primary/20"
                    >
                      Assign Coaching Module
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
