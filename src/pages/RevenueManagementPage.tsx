import React from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const RevenueManagementPage: React.FC = () => {
  const { revenues } = useData();

  const totalTodayRev = revenues.reduce((sum, r) => sum + r.totalRevenue, 0);
  const monthlyEstRev = totalTodayRev * 30;

  const chartData = revenues.map(r => ({
    route: r.routeCode,
    tickets: r.ticketSalesRevenue,
    passes: r.passRevenue,
    total: r.totalRevenue
  }));

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Revenue & Fare Collections"
        badge={`₹${totalTodayRev.toLocaleString()} Today`}
        subtitle="Realtime ticket sales, pass subscription earnings, and route yield breakdown."
        breadcrumb="Finance"
      />

      {/* KPI Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 min-w-0">
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Today's Revenue</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 truncate">₹{totalTodayRev.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Est. Monthly</span>
          <p className="text-xl sm:text-2xl font-black text-primary dark:text-indigo-400 mt-1 truncate">₹{monthlyEstRev.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Yield Per Bus</span>
          <p className="text-xl sm:text-2xl font-bold text-on-surface dark:text-slate-100 mt-1 truncate">₹2,310 / day</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Pass Share</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-500 mt-1 truncate">17.2% Total</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 min-w-0">
        <h3 className="font-bold text-base text-on-surface dark:text-slate-100 truncate">Route Fare Collection Breakdown</h3>
        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="route" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', color: '#fff', border: '1px solid #334155' }} />
              <Bar dataKey="tickets" fill="#10b981" radius={[8, 8, 0, 0]} name="Ticket Sales" />
              <Bar dataKey="passes" fill="#6366f1" radius={[8, 8, 0, 0]} name="Pass Subscriptions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
