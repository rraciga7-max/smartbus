import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BusDetailsModal } from '../components/bus/BusDetailsModal';
import { DriverDetailsModal } from '../components/driver/DriverDetailsModal';

export const CommandCenterPage: React.FC = () => {
  const { buses, trips, fleetSummary, emergencies, setSelectedDriverId, showToast } = useData();
  const [selectedMapBusId, setSelectedMapBusId] = useState<string | null>('bus-1');
  const [activeFilterState, setActiveFilterState] = useState<'all' | 'active' | 'delayed' | 'emergency' | 'maintenance'>('all');
  const [busDetailModalId, setBusDetailModalId] = useState<string | null>(null);
  const [driverDetailModalId, setDriverDetailModalId] = useState<string | null>(null);

  const selectedBus = buses.find(b => b.id === selectedMapBusId) || buses[0];

  const getBusColorClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500 text-white shadow-emerald-500/40';
      case 'idle': return 'bg-blue-500 text-white shadow-blue-500/40';
      case 'maintenance': return 'bg-amber-500 text-white shadow-amber-500/40';
      case 'emergency': return 'bg-rose-600 text-white shadow-rose-600/50 animate-pulse';
      default: return 'bg-slate-400 text-white shadow-slate-400/40';
    }
  };

  const filteredBuses = buses.filter(b => {
    if (activeFilterState === 'active') return b.status === 'active';
    if (activeFilterState === 'delayed') return b.speedKmH === 0 && b.status === 'active';
    if (activeFilterState === 'emergency') return b.status === 'emergency';
    if (activeFilterState === 'maintenance') return b.status === 'maintenance';
    return true;
  });

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Emergency Active Alert Banner if any */}
      {emergencies.length > 0 && (
        <div className="p-4 rounded-2xl bg-error text-on-error shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse min-w-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="material-symbols-outlined text-2xl flex-shrink-0">warning</span>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-sm truncate block">CRITICAL OPERATIONS ALERT ({emergencies.length} Active Emergency)</span>
              <p className="text-xs opacity-90 truncate">{emergencies[0].busRegistration} — {emergencies[0].locationName}</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/emergency'}
            className="w-full sm:w-auto px-4 py-2 bg-surface text-on-surface font-bold text-xs rounded-xl shadow hover:scale-105 transition-transform text-center min-h-[44px]"
          >
            Open Emergency Command Center ➔
          </button>
        </div>
      )}

      {/* Real-time KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        {[
          { label: 'Total Fleet', value: fleetSummary.totalBuses, icon: 'directions_bus', color: 'text-primary dark:text-indigo-400' },
          { label: 'Active Buses', value: fleetSummary.activeBuses, icon: 'check_circle', color: 'text-emerald-500' },
          { label: 'In Transit', value: trips.filter(t => t.status === 'in_transit').length, icon: 'near_me', color: 'text-blue-500' },
          { label: 'At Depot', value: fleetSummary.idleBuses, icon: 'warehouse', color: 'text-slate-500' },
          { label: 'Maintenance', value: fleetSummary.maintenanceBuses, icon: 'build', color: 'text-amber-500' },
          { label: 'Emergency', value: fleetSummary.emergencyBuses || 1, icon: 'warning', color: 'text-error' },
          { label: 'Drivers Duty', value: fleetSummary.activeDrivers, icon: 'badge', color: 'text-indigo-500' },
          { label: 'Active Trips', value: fleetSummary.todayTrips, icon: 'departure_board', color: 'text-purple-500' },
          { label: 'Passengers Today', value: (fleetSummary.totalPassengersToday).toLocaleString(), icon: 'groups', color: 'text-emerald-600' }
        ].map((kpi, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider truncate">{kpi.label}</span>
              <span className={`material-symbols-outlined text-[18px] ${kpi.color}`}>{kpi.icon}</span>
            </div>
            <p className="text-lg font-bold text-on-surface dark:text-slate-100 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Main Operations Control Area: Interactive Map + Right Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Large Interactive Operations Map Simulation */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-5 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-indigo-400 text-[22px]">map</span>
              <h2 className="font-bold text-base text-on-surface dark:text-slate-100">Live Operations Telemetry Map</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                GPS Live Feed Active
              </span>
            </div>

            {/* Bus State Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold">
              {[
                { id: 'all', label: 'All', color: 'bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-300' },
                { id: 'active', label: 'Green (On Time)', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
                { id: 'delayed', label: 'Yellow (Delayed)', color: 'bg-amber-500/10 text-amber-600' },
                { id: 'emergency', label: 'Red (Emergency)', color: 'bg-rose-500/10 text-rose-600' },
                { id: 'maintenance', label: 'Gray (Offline)', color: 'bg-slate-500/10 text-slate-400' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilterState(f.id as any)}
                  className={`px-3 py-1 rounded-full border transition-all ${
                    activeFilterState === f.id ? 'border-primary shadow-sm font-black scale-105' : 'border-transparent'
                  } ${f.color}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Visual Surface */}
          <div className="relative w-full h-[520px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center group">
            {/* Grid overlay & Route Lines Canvas simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Simulated Route 21A Line */}
              <path d="M 100 120 Q 250 200 400 180 T 700 380" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="8 4" />
              {/* Simulated Route 7C Line */}
              <path d="M 150 420 Q 350 300 650 150" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="4 4" />
            </svg>

            {/* Simulated Depots & Geofences */}
            <div className="absolute top-12 left-16 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center gap-1.5 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              Central Depot & HQ (Bay 4)
            </div>

            <div className="absolute bottom-16 right-20 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center gap-1.5 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Airport Shuttle Hub Geofence
            </div>

            {/* Live Bus Marker Pins */}
            {filteredBuses.map((bus, idx) => {
              // Simulated map placements based on lat/lng or index
              const positions = [
                { top: '35%', left: '42%' },
                { top: '65%', left: '72%' },
                { top: '25%', left: '20%' },
                { top: '55%', left: '30%' },
                { top: '45%', left: '60%' },
                { top: '75%', left: '45%' },
                { top: '38%', left: '48%' }
              ];
              const pos = positions[idx % positions.length];

              return (
                <div
                  key={bus.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedMapBusId(bus.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-all duration-300 hover:scale-125 ${
                    selectedMapBusId === bus.id ? 'scale-125 ring-4 ring-white' : ''
                  }`}
                >
                  <div className={`px-2.5 py-1 rounded-full font-bold text-[11px] flex items-center gap-1.5 shadow-xl ${getBusColorClass(bus.status)}`}>
                    <span className="material-symbols-outlined text-[14px]">directions_bus</span>
                    <span>{bus.registrationNumber.split(' ')[2] || bus.registrationNumber}</span>
                  </div>
                </div>
              );
            })}

            {/* Map Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-slate-900/80 text-slate-300 text-[11px] font-bold rounded-lg border border-slate-800">
                Map Scale: 1:25,000 (Coimbatore Metropolitan)
              </span>
            </div>
          </div>
        </div>

        {/* Right-Side Detailed Vehicle Drawer */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-5 sticky top-24">
          <div className="flex items-center justify-between border-b border-surface-container/80 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary dark:text-indigo-400">readiness_score</span>
              <h3 className="font-bold text-base text-on-surface dark:text-slate-100">Live Vehicle Drawer</h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
              selectedBus.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
              selectedBus.status === 'emergency' ? 'bg-error/10 text-error animate-pulse' : 'bg-amber-500/10 text-amber-600'
            }`}>
              {selectedBus.status}
            </span>
          </div>

          {/* Vehicle Info Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container dark:bg-slate-800">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center text-lg">
              <span className="material-symbols-outlined text-[24px]">directions_bus</span>
            </div>
            <div>
              <h4 className="font-bold text-base text-on-surface dark:text-slate-100">{selectedBus.registrationNumber}</h4>
              <p className="text-xs text-outline dark:text-slate-400">{selectedBus.model}</p>
              <p className="text-xs font-semibold text-primary dark:text-indigo-400 mt-0.5">{selectedBus.routeName}</p>
            </div>
          </div>

          {/* Telemetry Metrics List */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Driver</span>
              <p className="font-bold text-on-surface dark:text-slate-100 mt-0.5">{selectedBus.driverName}</p>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Speed</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedBus.speedKmH} km/h</p>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Passenger Load</span>
              <p className="font-bold text-on-surface dark:text-slate-100 mt-0.5">{selectedBus.currentPassengers} / {selectedBus.capacity} Seats</p>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Fuel Level</span>
              <p className="font-bold text-on-surface dark:text-slate-100 mt-0.5">{selectedBus.fuelLevelPercent}%</p>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Engine Health</span>
              <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{selectedBus.engineHealthPercent || 92}% Score</p>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">ETA to Destination</span>
              <p className="font-bold text-primary dark:text-indigo-400 mt-0.5">{selectedBus.etaMins || 14} mins</p>
            </div>
          </div>

          {/* Drawer Operational Actions */}
          <div className="flex flex-col gap-2 pt-2 border-t border-surface-container/80 dark:border-slate-800">
            <button
              onClick={() => setBusDetailModalId(selectedBus.id)}
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              View Full Vehicle Profile
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setSelectedDriverId(selectedBus.driverId);
                  setDriverDetailModalId(selectedBus.driverId);
                }}
                className="py-2 px-3 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high text-on-surface dark:text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Contact Driver
              </button>
              <button
                onClick={() => showToast(`Alert sent to driver ${selectedBus.driverName} on Bus ${selectedBus.registrationNumber}.`)}
                className="py-2 px-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                Send Telemetry Alert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Profile Modal */}
      <BusDetailsModal busId={busDetailModalId} onClose={() => setBusDetailModalId(null)} />
      {/* Driver Profile Modal */}
      <DriverDetailsModal driverId={driverDetailModalId} onClose={() => setDriverDetailModalId(null)} />
    </div>
  );
};
