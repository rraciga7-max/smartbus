import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const AIRouteOptimizerPage: React.FC = () => {
  const { routes, updateRoute, showToast } = useData();
  const [selectedRouteId, setSelectedRouteId] = useState(routes[0]?.id || '');
  const [mode, setMode] = useState<'fastest' | 'lowest_fuel' | 'highest_coverage' | 'lowest_congestion' | 'balanced'>('balanced');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  const handleApplyOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      updateRoute(selectedRoute.id, {
        distanceKm: Number((selectedRoute.distanceKm * 0.91).toFixed(1)),
        avgDurationMins: Math.round(selectedRoute.avgDurationMins * 0.85)
      });
      showToast(`Optimized route configuration applied to Route ${selectedRoute.code}! Saved 1.3 km and 6 mins per trip.`, 'success');
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">AI Route Telemetry Optimizer</h2>
        <p className="text-xs text-outline dark:text-slate-400">Algorithmic corridor optimization based on traffic, fuel economy, and passenger density</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Inputs Panel */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
          <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3">
            Route Optimization Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Select Route</label>
            <select
              value={selectedRouteId}
              onChange={(e) => setSelectedRouteId(e.target.value)}
              className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
            >
              {routes.map(r => (
                <option key={r.id} value={r.id}>Route {r.code} — {r.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-2">Optimization Strategy Mode</label>
            <div className="flex flex-col gap-2">
              {[
                { id: 'fastest', label: 'Fastest Transit Time', desc: 'Prioritizes express arterial bypasses' },
                { id: 'lowest_fuel', label: 'Lowest Fuel / Energy', desc: 'Minimizes stop-and-go acceleration events' },
                { id: 'highest_coverage', label: 'Highest Passenger Coverage', desc: 'Maximizes stop density near tech hubs' },
                { id: 'lowest_congestion', label: 'Lowest Congestion', desc: 'Bypasses construction bottlenecks' },
                { id: 'balanced', label: 'Balanced AI Pareto Optimal', desc: 'Optimal trade-off across speed & fuel' }
              ].map(m => (
                <div
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all text-xs ${
                    mode === m.id
                      ? 'bg-primary/10 border-primary text-primary dark:text-indigo-400 font-bold'
                      : 'bg-surface-container/40 dark:bg-slate-800/40 border-transparent text-on-surface dark:text-slate-300'
                  }`}
                >
                  <p className="font-bold">{m.label}</p>
                  <p className="text-[10px] opacity-75 font-normal">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Comparison Matrix */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-surface-container dark:border-slate-800 pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-primary dark:text-indigo-400">ROUTE {selectedRoute.code}</span>
              <h3 className="font-bold text-base text-on-surface dark:text-slate-100">Current vs AI Optimized Route Comparison</h3>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full">
              Mode: {mode.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Current Route Stats */}
            <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 flex flex-col gap-2">
              <span className="font-bold text-outline dark:text-slate-400 uppercase text-[10px]">Current Baseline Corridor</span>
              <div className="flex justify-between">
                <span>Distance:</span>
                <span className="font-bold text-on-surface dark:text-slate-100">{selectedRoute.distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Duration:</span>
                <span className="font-bold text-on-surface dark:text-slate-100">{selectedRoute.avgDurationMins} mins</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Consumption:</span>
                <span className="font-bold text-on-surface dark:text-slate-100">3.2 L / trip</span>
              </div>
              <div className="flex justify-between">
                <span>Passenger Coverage:</span>
                <span className="font-bold text-on-surface dark:text-slate-100">82% Density</span>
              </div>
            </div>

            {/* AI Optimized Route Stats */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex flex-col gap-2">
              <span className="font-bold uppercase text-[10px]">✨ AI Optimized Corridor</span>
              <div className="flex justify-between">
                <span>Distance:</span>
                <span className="font-bold">{(selectedRoute.distanceKm * 0.91).toFixed(1)} km (-9%)</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Duration:</span>
                <span className="font-bold">{Math.round(selectedRoute.avgDurationMins * 0.85)} mins (-15%)</span>
              </div>
              <div className="flex justify-between">
                <span>Fuel Consumption:</span>
                <span className="font-bold">2.7 L / trip (-0.5L)</span>
              </div>
              <div className="flex justify-between">
                <span>Passenger Coverage:</span>
                <span className="font-bold">94% Density (+12%)</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleApplyOptimization}
            disabled={isOptimizing}
            className="w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">alt_route</span>
            <span>{isOptimizing ? 'Applying Route Changes...' : 'Apply AI Optimized Corridor to Active Schedule'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
