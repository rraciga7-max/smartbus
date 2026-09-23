import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import type { Bus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';

export const LiveTrackingPage: React.FC = () => {
  const { buses, routes } = useData();
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [simulatedBuses, setSimulatedBuses] = useState<Bus[]>(buses);

  // GPS Simulation interval
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setSimulatedBuses(prev => prev.map(bus => {
        if (bus.status !== 'active') return bus;
        // Simulate micro movement lat/lng
        const deltaLat = (Math.random() - 0.5) * 0.002;
        const deltaLng = (Math.random() - 0.5) * 0.002;
        const newSpeed = Math.floor(30 + Math.random() * 25);
        return {
          ...bus,
          lat: bus.lat + deltaLat,
          lng: bus.lng + deltaLng,
          speedKmH: newSpeed
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Map Control Header */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 sm:p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-2xl bg-primary dark:bg-indigo-600 text-on-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">near_me</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-title-lg font-bold text-on-surface dark:text-slate-100 truncate">Live Fleet GPS Tracker</h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs truncate">Simulating real-time transit telemetry & passenger loads</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-4 py-2 rounded-full text-label-md font-bold transition-all flex items-center gap-2 ${
              isSimulating 
                ? 'bg-success dark:bg-emerald-600 text-on-success' 
                : 'bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSimulating ? 'pause' : 'play_arrow'}
            </span>
            {isSimulating ? 'GPS Live (Active)' : 'GPS Simulation Paused'}
          </button>
        </div>
      </div>

      {/* Main Interactive Simulated Map Canvas Area */}
      <div className="relative w-full h-[380px] sm:h-[520px] rounded-[32px] overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl min-w-0">
        {/* Map Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Map Vector Graphic Simulated Roads & City Hubs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Simulated Route 21A Line */}
          <path
            d="M 120 180 Q 280 120 450 260 T 780 320"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeDasharray="6 6"
            className="animate-pulse"
          />
          {/* Simulated Route 12D Line */}
          <path
            d="M 200 400 Q 380 300 620 420"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="4"
          />
          {/* Simulated Route 45B Line */}
          <path
            d="M 100 320 C 300 200, 500 480, 850 150"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="4"
          />
        </svg>

        {/* Floating City Landmarks */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md text-slate-200 text-[10px] sm:text-xs font-semibold border border-slate-700 pointer-events-none">
          📍 Gandhipuram Central Hub
        </div>
        <div className="absolute bottom-16 sm:bottom-12 right-4 sm:right-12 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md text-slate-200 text-[10px] sm:text-xs font-semibold border border-slate-700 pointer-events-none">
          📍 Singanallur Terminal
        </div>
        <div className="hidden sm:block absolute top-12 right-24 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md text-slate-200 text-xs font-semibold border border-slate-700 pointer-events-none">
          📍 Peelamedu Tech Park
        </div>

        {/* Interactive Bus Markers overlay on Map Canvas */}
        <div className="absolute inset-0 p-4 sm:p-8 flex items-center justify-around flex-wrap">
          {simulatedBuses.map((bus, idx) => {
            const isSelected = selectedBus?.id === bus.id;
            let markerBg = 'bg-success text-on-success ring-success/30';
            if (bus.status === 'maintenance') markerBg = 'bg-error text-on-error ring-error/30';
            if (bus.status === 'idle') markerBg = 'bg-amber-500 text-white ring-amber-500/30';

            return (
              <div
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                style={{
                  transform: `translate(${(idx % 3) * 16 - 8}px, ${(idx % 2) * 30 - 15}px)`
                }}
                className={`relative cursor-pointer transition-all duration-500 transform hover:scale-110 z-10 ${
                  isSelected ? 'scale-125 z-20' : ''
                }`}
              >
                {/* Bus Marker Pulse */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${markerBg} flex flex-col items-center justify-center shadow-2xl ring-4 transition-all`}>
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">directions_bus</span>
                  <span className="text-[8px] sm:text-[9px] font-extrabold truncate max-w-[36px] sm:max-w-[40px]">
                    {bus.registrationNumber.split(' ').pop()}
                  </span>
                </div>

                {/* Info Tooltip on hover/selected */}
                <div className="hidden sm:flex absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-xl whitespace-nowrap border border-slate-700 shadow-xl flex-col items-center">
                  <span className="font-bold">{bus.registrationNumber}</span>
                  <span className="text-[10px] text-emerald-400">{bus.speedKmH} km/h • {bus.currentPassengers} Riders</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Legend Footer Overlay */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-auto bg-slate-900/90 backdrop-blur-md p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-700/80 flex flex-wrap items-center gap-2 sm:gap-4 text-slate-300 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
            <span>Active ({simulatedBuses.filter(b => b.status === 'active').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Idle ({simulatedBuses.filter(b => b.status === 'idle').length})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
            <span>Maint. ({simulatedBuses.filter(b => b.status === 'maintenance').length})</span>
          </div>
        </div>
      </div>

      {/* Route Quick Selector Cards */}
      <div className="flex flex-col gap-3">
        <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">Active Route Dispatch Corridors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {routes.map(r => (
            <div key={r.id} className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col justify-between gap-2 min-w-0">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold text-label-sm">
                    Route {r.code}
                  </span>
                  <span className="text-label-sm text-outline dark:text-slate-400 font-medium">{r.distanceKm} km</span>
                </div>
                <h4 className="font-bold text-on-surface dark:text-slate-100 text-base line-clamp-1">{r.name}</h4>
                <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs mt-1">{r.totalStops} Stops • Every {r.frequencyMins} mins</p>
              </div>
              <div className="pt-2 border-t border-surface-container dark:border-slate-800 flex items-center justify-between text-xs text-on-surface dark:text-slate-200">
                <span>Active Buses: <strong className="text-primary dark:text-indigo-400">{r.activeBusesCount}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">On Time</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Bus Telematics Drawer */}
      <Drawer
        isOpen={selectedBus !== null}
        onClose={() => setSelectedBus(null)}
        title={selectedBus?.registrationNumber || 'Bus Telematics'}
        subtitle={selectedBus?.routeName}
      >
        {selectedBus && (
          <div className="flex flex-col gap-6">
            {/* Live Speedometer & Passenger Load */}
            <div className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-[24px] p-5 shadow-lg flex items-center justify-between">
              <div>
                <span className="text-label-sm opacity-80 uppercase tracking-wider block">Live Speed</span>
                <p className="text-4xl font-extrabold mt-1">{selectedBus.speedKmH} <span className="text-lg font-normal">km/h</span></p>
              </div>
              <div className="text-right">
                <span className="text-label-sm opacity-80 uppercase tracking-wider block">Occupancy</span>
                <p className="text-2xl font-bold mt-1">{selectedBus.currentPassengers} / {selectedBus.capacity}</p>
                <span className="text-xs text-emerald-300 font-semibold">
                  {Math.round((selectedBus.currentPassengers / selectedBus.capacity) * 100)}% Full
                </span>
              </div>
            </div>

            {/* Status & Driver */}
            <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
              <div>
                <span className="text-label-sm text-outline uppercase tracking-wider block mb-1">Status</span>
                <StatusBadge status={selectedBus.status} type="bus" />
              </div>
              <div className="text-right">
                <span className="text-label-sm text-outline uppercase tracking-wider block mb-1">Driver</span>
                <span className="font-bold text-on-surface">{selectedBus.driverName}</span>
              </div>
            </div>

            {/* GPS Telemetry coordinates */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-2 text-sm">
              <span className="font-bold text-on-surface mb-1">GPS Telematics Data</span>
              <div className="flex justify-between">
                <span className="text-outline">Latitude</span>
                <span className="font-mono text-on-surface">{selectedBus.lat.toFixed(4)}° N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Longitude</span>
                <span className="font-mono text-on-surface">{selectedBus.lng.toFixed(4)}° E</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Depot Base</span>
                <span className="font-semibold text-on-surface">{selectedBus.depotLocation}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBus(null)}
              className="w-full py-3 rounded-full bg-surface-container hover:bg-surface-container-high font-bold text-on-surface text-label-md"
            >
              Close Telematics
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
};
