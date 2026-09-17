import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const DepotManagementPage: React.FC = () => {
  const { depots, buses } = useData();
  const [selectedDepotId, setSelectedDepotId] = useState(depots[0]?.id || '');

  const activeDepot = depots.find(d => d.id === selectedDepotId) || depots[0];
  const parkedBuses = buses.filter(b => b.depotLocation.includes(activeDepot.name) || b.depotLocation.includes(activeDepot.location));

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Depot Operations & Fuel Facilities</h2>
        <p className="text-xs text-outline dark:text-slate-400">Terminal parking capacity, workshop maintenance queues, and fuel inventory tracking</p>
      </div>

      {/* Depot Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {depots.map(dep => (
          <div
            key={dep.id}
            onClick={() => setSelectedDepotId(dep.id)}
            className={`p-5 rounded-[24px] border cursor-pointer transition-all ${
              selectedDepotId === dep.id
                ? 'bg-primary text-on-primary border-primary shadow-xl scale-102'
                : 'bg-surface-container-lowest dark:bg-slate-900 border-surface-container dark:border-slate-800 text-on-surface dark:text-slate-100 hover:border-primary/50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedDepotId === dep.id ? 'opacity-80' : 'text-outline dark:text-slate-400'}`}>
                  {dep.code}
                </span>
                <h3 className="font-bold text-base mt-0.5">{dep.name}</h3>
              </div>
              <span className="material-symbols-outlined text-2xl">warehouse</span>
            </div>

            <div className="mt-4 flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="opacity-80">Utilization:</span>
                <span className="font-bold">{dep.utilizationPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden bg-black/20">
                <div className="h-full bg-emerald-400" style={{ width: `${dep.utilizationPercent}%` }}></div>
              </div>
              <div className="flex justify-between text-[11px] pt-1">
                <span>{dep.busesParked} / {dep.totalCapacity} Buses Parked</span>
                <span>{dep.availableBays} Bays Free</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Depot Detail Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Details Panel */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container dark:border-slate-800 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-primary dark:text-indigo-400">{activeDepot.code}</span>
              <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">{activeDepot.name} Detail</h3>
              <p className="text-xs text-outline dark:text-slate-400">{activeDepot.location} • Staff On Duty: {activeDepot.activeStaff}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full">
                Fuel Storage: {activeDepot.fuelAvailabilityL.toLocaleString()} Litres
              </span>
            </div>
          </div>

          {/* Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Maintenance Bays</span>
              <p className="text-lg font-bold text-amber-500 mt-1">{activeDepot.maintenanceBays} Active Bays</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Incoming Buses</span>
              <p className="text-lg font-bold text-blue-500 mt-1">{activeDepot.incomingBusesCount} En-Route</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Outgoing Buses</span>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">{activeDepot.outgoingBusesCount} Scheduled</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Available Bays</span>
              <p className="text-lg font-bold text-primary dark:text-indigo-400 mt-1">{activeDepot.availableBays} Free</p>
            </div>
          </div>

          {/* Parking Utilization Chart Simulation */}
          <div className="p-5 rounded-2xl bg-surface-container-low dark:bg-slate-800/40 border border-surface-container dark:border-slate-800 flex flex-col gap-3">
            <h4 className="font-bold text-xs text-on-surface dark:text-slate-200">Hourly Bay Utilization Profile (Today)</h4>
            <div className="flex items-end justify-between gap-2 h-32 pt-4 px-2">
              {[45, 60, 85, 90, 70, 55, 40, 65, 80, 75, 70, 65].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-primary/20 dark:bg-indigo-950 rounded-t-md relative flex items-end justify-center" style={{ height: '100px' }}>
                    <div className="w-full bg-primary dark:bg-indigo-500 rounded-t-md transition-all duration-300" style={{ height: `${val}%` }}></div>
                  </div>
                  <span className="text-[9px] font-bold text-outline dark:text-slate-400">{idx * 2}:00</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Parked Vehicles Roster */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
          <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3">
            Buses Allocated to {activeDepot.code}
          </h3>

          <div className="flex flex-col gap-2.5">
            {parkedBuses.length === 0 ? (
              <p className="text-xs text-outline dark:text-slate-400 text-center py-8">No buses currently parked at this facility.</p>
            ) : (
              parkedBuses.map(b => (
                <div key={b.id} className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-on-surface dark:text-slate-100">{b.registrationNumber}</span>
                    <p className="text-[11px] text-outline dark:text-slate-400">{b.model} • Driver: {b.driverName}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                    {b.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
