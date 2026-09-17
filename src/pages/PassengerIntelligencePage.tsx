import React from 'react';
import { useData } from '../context/DataContext';

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Passenger Intelligence & Demand Analytics</h2>
        <p className="text-xs text-outline dark:text-slate-400">Ridership trends, peak hour crowding telemetry, and route heatmaps</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Passengers Today</span>
          <p className="text-2xl font-bold text-primary dark:text-indigo-400 mt-1">{(fleetSummary.totalPassengersToday).toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Peak Demand Hour</span>
          <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">08:00 - 09:30 AM</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Average Occupancy</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">82%</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-rose-500 uppercase">Overcrowded Trips</span>
          <p className="text-2xl font-bold text-rose-500 mt-1">4 Trips</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Ridership Growth</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">+14.2% MoM</p>
        </div>
      </div>

      {/* Demand Heatmap: Routes x Time Window */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 overflow-x-auto">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100">Passenger Demand Heatmap (Routes × Time)</h3>
            <p className="text-xs text-outline dark:text-slate-400">Identifies congestion zones to trigger additional bus deployment</p>
          </div>

          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-slate-500/10 text-slate-400">Low</span>
            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-500">Normal</span>
            <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-500">High</span>
            <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-500 font-bold">Overcrowded</span>
          </div>
        </div>

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
  );
};
