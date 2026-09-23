import React from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const PassengerIntelligencePage: React.FC = () => {
  const { fleetSummary } = useData();

  const heatmapMatrix = [
    { time: '06:00 - 08:00', r21a: 'Normal', r12d: 'Low', r45b: 'High', r7c: 'Normal' },
    { time: '08:00 - 10:00', r21a: 'Overcrowded', r12d: 'High', r45b: 'Overcrowded', r7c: 'High' },
    { time: '10:00 - 16:00', r21a: 'Normal', r12d: 'Low', r45b: 'Normal', r7c: 'Normal' },
    { time: '16:00 - 19:00', r21a: 'Overcrowded', r12d: 'High', r45b: 'High', r7c: 'Overcrowded' },
    { time: '19:00 - 22:00', r21a: 'Normal', r12d: 'Low', r45b: 'Normal', r7c: 'Low' }
  ];

  const getHeatmapColor = (demand: string) => {
    switch (demand) {
      case 'Overcrowded': return 'bg-rose-500/20 text-rose-500 border-rose-500/30 font-extrabold';
      case 'High': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold';
      case 'Normal': return 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold';
      default: return 'bg-slate-500/10 text-slate-400 font-normal';
    }
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Passenger Intelligence"
        badge="Demand Analytics"
        subtitle="Ridership trends, peak hour crowding telemetry, and route heatmaps."
        breadcrumb="Intelligence"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 min-w-0">
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Passengers Today</span>
          <p className="text-xl sm:text-2xl font-bold text-primary dark:text-indigo-400 mt-1 truncate">{(fleetSummary.totalPassengersToday).toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Peak Demand Hour</span>
          <p className="text-base sm:text-xl font-bold text-on-surface dark:text-slate-100 mt-1 truncate">08:00 - 09:30 AM</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Avg Occupancy</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 truncate">82%</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-rose-500 uppercase truncate block">Overcrowded Trips</span>
          <p className="text-xl sm:text-2xl font-bold text-rose-500 mt-1 truncate">4 Trips</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Ridership Growth</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 truncate">+14.2% MoM</p>
        </div>
      </div>

      {/* Demand Heatmap: Routes x Time Window */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 min-w-0">
          <div className="min-w-0">
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100 truncate">Passenger Demand Heatmap</h3>
            <p className="text-xs text-outline dark:text-slate-400 truncate">Identifies congestion zones to trigger additional bus deployment</p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            <span className="px-2 py-0.5 rounded bg-slate-500/10 text-slate-400 text-[11px]">Low</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 text-[11px]">Normal</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 text-[11px]">High</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-500 font-bold text-[11px]">Overcrowded</span>
          </div>
        </div>

        <div className="table-container no-scrollbar">
        <table className="w-full text-center border-collapse text-xs min-w-[600px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4 text-left">Time Window</th>
              <th className="py-3 px-4">Route 21A (Gandhipuram)</th>
              <th className="py-3 px-4">Route 12D (Peelamedu)</th>
              <th className="py-3 px-4">Route 45B (Ukkadam)</th>
              <th className="py-3 px-4">Route 7C (Airport Express)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {heatmapMatrix.map((row, idx) => (
              <tr key={idx}>
                <td className="py-3.5 px-4 text-left font-bold text-on-surface dark:text-slate-200">{row.time}</td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1.5 rounded-xl block border ${getHeatmapColor(row.r21a)}`}>{row.r21a}</span>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1.5 rounded-xl block border ${getHeatmapColor(row.r12d)}`}>{row.r12d}</span>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1.5 rounded-xl block border ${getHeatmapColor(row.r45b)}`}>{row.r45b}</span>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1.5 rounded-xl block border ${getHeatmapColor(row.r7c)}`}>{row.r7c}</span>
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
