import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

interface RouteDetailsModalProps {
  routeId: string | null;
  onClose: () => void;
}

export const RouteDetailsModal: React.FC<RouteDetailsModalProps> = ({ routeId, onClose }) => {
  const { routes, buses } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'stops' | 'buses' | 'performance' | 'demand'>('overview');

  if (!routeId) return null;
  const route = routes.find(r => r.id === routeId || r.code === routeId);
  if (!route) return null;

  const assignedBuses = buses.filter(b => b.routeId === route.id || b.routeName.includes(route.code));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Route Header */}
        <div className="p-6 border-b border-surface-container/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/40 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg border border-amber-500/20">
              {route.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">{route.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                  {route.status}
                </span>
              </div>
              <p className="text-xs text-outline dark:text-slate-400 mt-0.5">
                {route.origin} ➔ {route.destination} • {route.distanceKm} km • {route.avgDurationMins} mins
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-surface-container/60 dark:border-slate-800 overflow-x-auto no-scrollbar bg-surface-container-lowest dark:bg-slate-900">
          {[
            { id: 'overview', label: 'Overview', icon: 'alt_route' },
            { id: 'stops', label: 'Stops & Timelines', icon: 'place' },
            { id: 'buses', label: 'Assigned Buses & Drivers', icon: 'directions_bus' },
            { id: 'performance', label: 'Performance Metrics', icon: 'analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Active Fleet</span>
                  <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">{route.activeBusesCount} Buses</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Headway Frequency</span>
                  <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">Every {route.frequencyMins} mins</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">On-Time %</span>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{route.onTimeRatePercent || 95.2}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Daily Passengers</span>
                  <p className="text-2xl font-bold text-primary dark:text-indigo-400 mt-1">{(route.dailyPassengers || 8450).toLocaleString()}</p>
                </div>
              </div>

              {/* Simulated Map Visualiser */}
              <div className="p-6 rounded-2xl bg-surface-container dark:bg-slate-800 text-center relative overflow-hidden border border-surface-container-high dark:border-slate-700">
                <span className="material-symbols-outlined text-4xl text-primary/40 dark:text-indigo-400/40 mb-1">map</span>
                <p className="text-xs font-bold text-on-surface dark:text-slate-200">Interactive Line Transit Corridor — Route {route.code}</p>
                <div className="flex items-center justify-between mt-6 max-w-lg mx-auto relative">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/30 -translate-y-1/2 z-0"></div>
                  {route.stops.map((st, i) => (
                    <div key={st.id} className="relative z-10 flex flex-col items-center">
                      <div className="w-5 h-5 rounded-full bg-primary text-on-primary font-bold text-[10px] flex items-center justify-center shadow-md">
                        {i + 1}
                      </div>
                      <span className="text-[10px] font-bold text-on-surface dark:text-slate-300 mt-1">{st.name}</span>
                      <span className="text-[9px] text-outline dark:text-slate-400">{st.scheduledTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stops' && (
            <div className="flex flex-col gap-2">
              {route.stops.map((stop, idx) => (
                <div key={stop.id} className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="font-bold text-sm text-on-surface dark:text-slate-100">{stop.name}</span>
                      <p className="text-xs text-outline dark:text-slate-400">Lat: {stop.lat} • Lng: {stop.lng}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-on-surface dark:text-slate-200">{stop.scheduledTime}</span>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">~{stop.passengerBoardingAvg} boardings/bus</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'buses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assignedBuses.map(b => (
                <div key={b.id} className="p-4 rounded-2xl border border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-on-surface dark:text-slate-100">{b.registrationNumber}</span>
                    <p className="text-xs text-outline dark:text-slate-400">{b.model} • Driver: {b.driverName}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 capitalize">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Average Delay</span>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{route.avgDelayMins || 2.5} mins</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Daily Revenue</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">₹{(route.dailyRevenue || 295750).toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Fuel Consumed</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">{route.dailyFuelUsageLitres || 340} Litres</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
