import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import type { Route } from '../types';
import { Modal } from '../components/common/Modal';

export const RouteManagementPage: React.FC = () => {
  const { routes, addRoute } = useData();
  const [selectedRoute, setSelectedRoute] = useState<Route>(routes[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distanceKm] = useState('15');
  const [frequencyMins, setFrequencyMins] = useState('10');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;
    addRoute({
      code,
      name,
      origin,
      destination,
      distanceKm: Number(distanceKm),
      avgDurationMins: 45,
      totalStops: 10,
      status: 'active',
      activeBusesCount: 1,
      frequencyMins: Number(frequencyMins),
      stops: [
        { id: 'st-new-1', name: origin || 'Start Station', lat: 11.0168, lng: 76.9558, scheduledTime: '08:00', passengerBoardingAvg: 30 },
        { id: 'st-new-2', name: destination || 'End Terminal', lat: 10.9980, lng: 77.0250, scheduledTime: '08:45', passengerBoardingAvg: 40 }
      ]
    });
    setIsAddModalOpen(false);
    setCode('');
    setName('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mobile Page Header (Point 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight">
            Transit Routes & Stop Timelines
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-1">
            Manage active route corridors, frequency, and stop schedules.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-primary dark:bg-indigo-600 text-on-primary font-bold text-xs sm:text-sm hover:bg-primary/90 dark:hover:bg-indigo-500 transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 min-h-[44px] flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
          <span>Create New Route</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Selector List */}
        <div className="flex flex-col gap-3">
          <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">Route Directory</h3>
          <div className="flex flex-col gap-3">
            {routes.map((r) => {
              const isSelected = selectedRoute.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRoute(r)}
                  className={`p-4 rounded-[24px] cursor-pointer transition-all duration-200 border ${
                    isSelected 
                      ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-lg shadow-primary/20 dark:shadow-indigo-500/20 border-primary dark:border-indigo-500' 
                      : 'bg-surface-container-lowest dark:bg-slate-900 hover:bg-surface-container-low dark:hover:bg-slate-800 text-on-surface dark:text-slate-100 border-surface-container/60 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-label-sm font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400'
                    }`}>
                      Route {r.code}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-white/80' : 'text-outline dark:text-slate-400'}`}>
                      {r.distanceKm} km
                    </span>
                  </div>

                  <h4 className="font-bold text-base line-clamp-1">{r.name}</h4>
                  
                  <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-xs opacity-90">
                    <span>{r.totalStops} Stops</span>
                    <span>Every {r.frequencyMins} mins</span>
                    <span className="font-bold">{r.activeBusesCount} Buses</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Route Stop Sequence Timeline View */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container dark:border-slate-800 min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="px-3 py-1 rounded-full bg-primary dark:bg-indigo-600 text-on-primary text-label-sm font-extrabold flex-shrink-0">
                  Route {selectedRoute.code}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-on-surface dark:text-slate-100 truncate min-w-0">{selectedRoute.name}</h3>
              </div>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs mt-1 truncate">
                {selectedRoute.origin} ➔ {selectedRoute.destination} ({selectedRoute.distanceKm} km • ~{selectedRoute.avgDurationMins} mins)
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-3 py-1.5 rounded-full bg-success-container dark:bg-emerald-950/60 text-[#065F46] dark:text-emerald-300 font-bold text-xs">
                Active Operational
              </span>
            </div>
          </div>

          {/* Stop Timeline */}
          <div className="flex flex-col gap-1">
            <h4 className="text-title-lg font-bold text-on-surface dark:text-slate-100 mb-2">Stop Sequence & Timings</h4>
            <div className="relative pl-6 space-y-6">
              {/* Vertical Connecting Line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-1 bg-primary/20 dark:bg-indigo-500/30 rounded-full"></div>

              {selectedRoute.stops.map((stop, index) => (
                <div key={stop.id} className="relative flex items-center justify-between group">
                  {/* Circle Marker */}
                  <div className="absolute -left-[23px] w-6 h-6 rounded-full bg-surface-container-lowest dark:bg-slate-900 border-4 border-primary dark:border-indigo-500 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-indigo-500"></div>
                  </div>

                  {/* Stop Information */}
                  <div className="flex-1 pl-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-on-surface dark:text-slate-100 text-base">{stop.name}</span>
                      {index === 0 && <span className="text-[10px] bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 px-2 py-0.5 rounded-full font-bold">ORIGIN</span>}
                      {index === selectedRoute.stops.length - 1 && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">TERMINAL</span>}
                    </div>
                    <span className="text-xs text-on-surface-variant dark:text-slate-400">Estimated Boarding: {stop.passengerBoardingAvg} passengers/hr</span>
                  </div>

                  {/* Scheduled Time */}
                  <div className="text-right flex-shrink-0">
                    <span className="px-3 py-1 rounded-full bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 font-mono font-bold text-xs">
                      {stop.scheduledTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Route Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Route Line"
      >
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Route Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. 18B"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>

            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Route Title Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Saravanampatti ➔ Town Hall"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Origin Terminal</label>
              <input
                type="text"
                placeholder="Saravanampatti"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Destination Terminal</label>
              <input
                type="text"
                placeholder="Town Hall"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Frequency (Mins between buses)</label>
            <input
              type="number"
              value={frequencyMins}
              onChange={(e) => setFrequencyMins(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-semibold text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary dark:bg-indigo-600 hover:bg-primary/90 dark:hover:bg-indigo-500 text-on-primary font-bold text-label-md"
            >
              Save Route
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
