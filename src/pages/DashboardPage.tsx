import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { fleetSummary, buses, maintenanceRecords, addBus } = useData();
  const { isDark } = useTheme();
  const [isAddBusModalOpen, setIsAddBusModalOpen] = useState(false);

  // New Bus Form State
  const [regNum, setRegNum] = useState('');
  const [model, setModel] = useState('Volvo 9400 B11R');
  const [capacity, setCapacity] = useState('50');
  const [routeId, setRouteId] = useState('route-1');

  const chartData = [
    { time: '06:00', passengers: 1200, utilization: 45 },
    { time: '08:00', passengers: 4800, utilization: 92 },
    { time: '10:00', passengers: 3200, utilization: 78 },
    { time: '12:00', passengers: 2100, utilization: 60 },
    { time: '14:00', passengers: 2900, utilization: 72 },
    { time: '16:00', passengers: 4200, utilization: 88 },
    { time: '18:00', passengers: 5100, utilization: 96 },
    { time: '20:00', passengers: 2600, utilization: 65 },
  ];

  const handleAddBusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNum) return;
    addBus({
      registrationNumber: regNum,
      model,
      capacity: Number(capacity),
      currentPassengers: 0,
      status: 'idle',
      routeId,
      routeName: 'Route 21A: Gandhipuram ➔ Singanallur',
      driverId: 'drv-3',
      driverName: 'Unassigned',
      speedKmH: 0,
      fuelLevelPercent: 100,
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDue: '2026-10-01',
      lat: 11.0168,
      lng: 76.9558,
      depotLocation: 'Central Depot'
    });
    setIsAddBusModalOpen(false);
    setRegNum('');
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 min-w-0">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight">
              Operations Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase">
              Live
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-1">
            Real-time transit command, fleet load telemetry, and maintenance surveillance.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsAddBusModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-primary dark:bg-indigo-600 text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 dark:hover:bg-indigo-500 transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add New Bus</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/tracking')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[20px]">near_me</span>
            <span>Live Map</span>
          </button>
        </div>
      </div>

      {/* Welcome / Overview Banner */}
      <div className="bg-gradient-to-r from-primary via-primary-container to-primary/90 dark:from-indigo-950 dark:via-indigo-900 dark:to-slate-900 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 text-on-primary shadow-stitch-float relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 border border-primary/20 dark:border-indigo-500/20 min-w-0">
        <div className="z-10 min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/15 backdrop-blur-md text-label-sm font-semibold mb-2 max-w-full">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse flex-shrink-0"></span>
            <span className="truncate text-xs">Live Telematics Online • Central Control Depot</span>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight">Active Fleet Operations</h2>
          <p className="text-on-primary/80 text-body-md mt-1 max-w-xl text-xs sm:text-sm">
            Managing {fleetSummary.totalBuses} transit buses across active urban corridors with high punctuality.
          </p>
        </div>
      </div>

      {/* KPI Cards: 1 column on mobile, 2 columns on tablet, 4 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 min-w-0">
        <StatCard
          title="Total Fleet"
          value={fleetSummary.totalBuses}
          subtitle={`${fleetSummary.activeBuses} Active • ${fleetSummary.idleBuses} Idle`}
          icon="directions_bus"
          onClick={() => navigate('/app/buses')}
        />
        <StatCard
          title="Fleet Utilization"
          value={`${fleetSummary.fleetUtilizationPercent}%`}
          change="+4.2%"
          isPositive={true}
          icon="insights"
          colorVariant="primary"
          onClick={() => navigate('/app/reports')}
        />
        <StatCard
          title="Maintenance Alert"
          value={fleetSummary.maintenanceBuses}
          subtitle="Requires Action"
          change="3 High Priority"
          isPositive={false}
          icon="build"
          colorVariant="error"
          onClick={() => navigate('/app/maintenance')}
        />
        <StatCard
          title="On-Time Rate"
          value={`${fleetSummary.onTimeRatePercent}%`}
          change="+0.8%"
          isPositive={true}
          icon="schedule"
          colorVariant="success"
          onClick={() => navigate('/app/trips')}
        />
      </div>

      {/* Fleet Status & Active Trips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 min-w-0">
        {/* Fleet Status Breakdown */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Fleet Status Overview</h3>
            <span className="text-xs text-outline dark:text-slate-400 font-medium">Real-time</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-success-container/30 dark:bg-emerald-950/40 border border-success/20 dark:border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse flex-shrink-0"></div>
                <span className="font-semibold text-on-surface dark:text-slate-200 text-xs sm:text-sm">Active In Service</span>
              </div>
              <span className="font-extrabold text-base sm:text-lg text-[#065F46] dark:text-emerald-400">{fleetSummary.activeBuses}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0"></div>
                <span className="font-semibold text-on-surface dark:text-slate-200 text-xs sm:text-sm">Standby / Idle</span>
              </div>
              <span className="font-extrabold text-base sm:text-lg text-amber-800 dark:text-amber-400">{fleetSummary.idleBuses}</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded-2xl bg-error-container/40 dark:bg-rose-950/40 border border-error/20 dark:border-rose-500/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-error flex-shrink-0"></div>
                <span className="font-semibold text-on-surface dark:text-slate-200 text-xs sm:text-sm">In Maintenance</span>
              </div>
              <span className="font-extrabold text-base sm:text-lg text-error dark:text-rose-400">{fleetSummary.maintenanceBuses}</span>
            </div>
          </div>

          <div className="mt-auto pt-2 border-t border-surface-container/60 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/app/buses')}
              className="w-full py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-primary dark:text-indigo-400 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              Manage All Buses
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Active Fleet Highlights */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Active Fleet Highlights</h3>
            <button 
              type="button"
              onClick={() => navigate('/app/buses')}
              className="text-xs sm:text-sm text-primary dark:text-indigo-400 font-semibold hover:underline"
            >
              View All ➔
            </button>
          </div>

          <div className="flex flex-col gap-3 min-w-0">
            {buses.slice(0, 3).map(bus => (
              <div
                key={bus.id}
                onClick={() => navigate('/app/buses')}
                className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-low dark:bg-slate-800/60 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer border border-surface-container/60 dark:border-slate-700/60 flex items-center justify-between gap-3 min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-2xl bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">directions_bus</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-on-surface dark:text-slate-100 text-xs sm:text-sm truncate">{bus.registrationNumber}</span>
                      <StatusBadge status={bus.status} type="bus" />
                    </div>
                    <p className="text-on-surface-variant dark:text-slate-400 text-xs mt-0.5 truncate">{bus.routeName}</p>
                  </div>
                </div>

                <div className="text-right hidden sm:block flex-shrink-0">
                  <span className="text-[10px] text-outline dark:text-slate-400 uppercase font-semibold">Driver</span>
                  <p className="font-semibold text-on-surface dark:text-slate-200 text-xs sm:text-sm">{bus.driverName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Chart & Urgent Maintenance Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 min-w-0">
        {/* Hourly Passenger & Fleet Load Area Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Hourly Passenger & Fleet Load</h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-xs">Real-time rider volume vs vehicle capacity percentage</p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-surface-container dark:bg-slate-800 text-xs font-semibold text-primary dark:text-indigo-400">
              Today's Live Load
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPassengers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isDark ? "#818cf8" : "#00288e"} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={isDark ? "#818cf8" : "#00288e"} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#edeef0"} />
                <XAxis dataKey="time" stroke={isDark ? "#94a3b8" : "#757684"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#94a3b8" : "#757684"} fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0f172a' : '#191c1e', 
                    borderRadius: '16px', 
                    color: '#fff', 
                    border: isDark ? '1px solid #334155' : 'none' 
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="passengers" stroke={isDark ? "#818cf8" : "#00288e"} strokeWidth={3} fillOpacity={1} fill="url(#colorPassengers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Urgent Maintenance Tasks (Alerts) */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Urgent Maintenance Tasks</h3>
            <button 
              type="button"
              onClick={() => navigate('/app/maintenance')}
              className="text-xs sm:text-sm text-primary dark:text-indigo-400 font-semibold hover:underline"
            >
              View All ➔
            </button>
          </div>

          <div className="flex flex-col gap-3 min-w-0">
            {maintenanceRecords.slice(0, 2).map(record => (
              <div
                key={record.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-error-container/20 dark:bg-rose-950/30 border-l-4 border-error flex flex-col gap-2 min-w-0"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-on-surface dark:text-slate-100 text-xs sm:text-sm">{record.busRegistration}</span>
                  <StatusBadge status={record.priority} type="priority" />
                </div>
                <p className="font-semibold text-on-surface dark:text-slate-200 text-xs truncate">{record.serviceType}</p>
                <div className="flex items-center justify-between text-[11px] text-outline dark:text-slate-400 pt-1">
                  <span>Due: {record.dueDate}</span>
                  <span className="text-error dark:text-rose-400 font-bold">Action Needed</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-2 border-t border-surface-container/60 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/app/maintenance')}
              className="w-full py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              Open Service Center
              <span className="material-symbols-outlined text-[18px]">build</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Bus Modal */}
      <Modal
        isOpen={isAddBusModalOpen}
        onClose={() => setIsAddBusModalOpen(false)}
        title="Register New Fleet Bus"
      >
        <form onSubmit={handleAddBusSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Registration Plate Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. TN 38 BZ 9999"
              value={regNum}
              onChange={(e) => setRegNum(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Bus Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="Volvo 9400 B11R">Volvo 9400 B11R</option>
                <option value="Scania Metrolink HD">Scania Metrolink HD</option>
                <option value="Tata Starbus EV 12m">Tata Starbus EV 12m</option>
                <option value="Ashok Leyland Lynx">Ashok Leyland Lynx</option>
              </select>
            </div>

            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Seating Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Assigned Route</label>
            <select
              value={routeId}
              onChange={(e) => setRouteId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="route-1">Route 21A: Gandhipuram ➔ Singanallur</option>
              <option value="route-2">Route 12D: Peelamedu ➔ Hope College</option>
              <option value="route-3">Route 45B: Ukkadam ➔ Marudhamalai</option>
              <option value="route-4">Route 7C: RS Puram ➔ Airport</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddBusModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-semibold text-label-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary dark:bg-indigo-600 hover:bg-primary/90 dark:hover:bg-indigo-500 text-on-primary font-bold text-label-md transition-colors shadow-md active:scale-95"
            >
              Save Bus
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
