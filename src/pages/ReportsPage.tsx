import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { PageHeader } from '../components/common/PageHeader';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

export const ReportsPage: React.FC = () => {
  const { showToast } = useData();
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  const fleetUtilizationTrend = [
    { label: 'Week 1', utilization: 86, passengers: 12400, cost: 42000 },
    { label: 'Week 2', utilization: 91, passengers: 14800, cost: 45000 },
    { label: 'Week 3', utilization: 88, passengers: 13900, cost: 41000 },
    { label: 'Week 4', utilization: 95, passengers: 18450, cost: 48000 },
  ];

  const fuelBreakdownData = [
    { name: 'Diesel Fleet', value: 70, color: isDark ? '#818cf8' : '#00288e' },
    { name: 'Electric (EV)', value: 20, color: '#10B981' },
    { name: 'CNG Buses', value: 10, color: '#F59E0B' },
  ];

  const handleExportCSV = () => {
    showToast('Fleet Operations Report exported successfully (CSV generated).');
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Fleet Analytics & Reports"
        badge="Performance Hub"
        subtitle="Comprehensive operational insights, passenger trend graphs & cost tracking."
        breadcrumb="Intelligence"
        actions={[
          {
            label: 'Export Report',
            icon: 'download',
            onClick: handleExportCSV,
            variant: 'primary'
          }
        ]}
      />

      {/* Time Range Selector */}
      <div className="flex items-center justify-between gap-3 bg-surface-container-lowest dark:bg-slate-900 p-3 rounded-2xl border border-surface-container/60 dark:border-slate-800">
        <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase tracking-wider">Analysis Range</span>
        <div className="flex gap-1 bg-surface-container dark:bg-slate-800 p-1 rounded-full text-xs font-bold">
          {(['week', 'month', 'quarter'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3.5 py-1 rounded-full capitalize transition-colors ${
                timeRange === t 
                  ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-sm' 
                  : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Utilization & Ridership Area Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">Weekly Utilization & Ridership Trends</h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              +12.4% vs previous period
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fleetUtilizationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="utilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? "#818cf8" : "#00288e"} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={isDark ? "#818cf8" : "#00288e"} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#edeef0"} />
                <XAxis dataKey="label" stroke={isDark ? "#94a3b8" : "#757684"} fontSize={12} tickLine={false} />
                <YAxis stroke={isDark ? "#94a3b8" : "#757684"} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#191c1e', borderRadius: '16px', color: '#fff', border: isDark ? '1px solid #334155' : 'none' }}
                />
                <Area type="monotone" dataKey="passengers" stroke={isDark ? "#818cf8" : "#00288e"} strokeWidth={3} fillOpacity={1} fill="url(#utilGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Fuel Type Distribution */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4">
          <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">Fleet Energy Mix</h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400">Breakdown of propulsion technologies</p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fuelBreakdownData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={45}>
                  {fuelBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-surface-container dark:border-slate-800 text-xs font-semibold">
            {fuelBreakdownData.map(item => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-on-surface dark:text-slate-200">{item.name}</span>
                </div>
                <span className="text-outline dark:text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driver Safety & On-Time Performance Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Route Operational Efficiency Summary</h3>

        <div className="table-container no-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[550px]">
            <thead>
              <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Route Name</th>
                <th className="py-3 px-4">On-Time Rate</th>
                <th className="py-3 px-4">Daily Passengers</th>
                <th className="py-3 px-4">Avg Speed</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 font-medium">
              <tr className="hover:bg-surface-container-low dark:hover:bg-slate-800/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-primary dark:text-indigo-400">Route 21A: Gandhipuram ➔ Singanallur</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">98.2%</td>
                <td className="py-3.5 px-4 text-on-surface dark:text-slate-200">6,420</td>
                <td className="py-3.5 px-4 text-on-surface dark:text-slate-200">38 km/h</td>
                <td className="py-3.5 px-4"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">Optimal</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low dark:hover:bg-slate-800/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-primary dark:text-indigo-400">Route 12D: Peelamedu ➔ Hope College</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">96.0%</td>
                <td className="py-3.5 px-4 text-on-surface dark:text-slate-200">4,180</td>
                <td className="py-3.5 px-4 text-on-surface dark:text-slate-200">42 km/h</td>
                <td className="py-3.5 px-4"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">Optimal</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low dark:hover:bg-slate-800/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-primary dark:text-indigo-400">Route 45B: Ukkadam ➔ Marudhamalai</td>
                <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-bold">92.5%</td>
                <td className="py-3.5 px-4 text-on-surface dark:text-slate-200">5,100</td>
                <td className="py-3.5 px-4 text-on-surface dark:text-slate-200">32 km/h</td>
                <td className="py-3.5 px-4"><span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold">Moderate Peak</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
