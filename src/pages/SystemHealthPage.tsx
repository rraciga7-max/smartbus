import React from 'react';
import { useData } from '../context/DataContext';

export const SystemHealthPage: React.FC = () => {
  const { systemHealth } = useData();

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Header */}
      <div className="min-w-0">
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100 truncate">Infrastructure & System Health Monitoring</h2>
        <p className="text-xs text-outline dark:text-slate-400 truncate">Realtime monitoring of GPS gateways, core REST APIs, databases, auth, and telematics synchronization</p>
      </div>

      {/* Services Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0">
        {systemHealth.map(sys => (
          <div key={sys.id} className="p-5 rounded-[24px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm flex flex-col gap-3 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline dark:text-slate-400 truncate block">{sys.type}</span>
                <h3 className="font-bold text-base text-on-surface dark:text-slate-100 mt-0.5 truncate">{sys.name}</h3>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 mt-1"></span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-surface-container dark:border-slate-800">
              <div>
                <span className="text-outline dark:text-slate-400 text-[10px] uppercase font-bold">Uptime %</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{sys.uptimePercent}%</p>
              </div>
              <div>
                <span className="text-outline dark:text-slate-400 text-[10px] uppercase font-bold">Latency</span>
                <p className="font-bold text-on-surface dark:text-slate-100">{sys.responseTimeMs} ms</p>
              </div>
            </div>

            <span className="text-[10px] font-semibold text-outline dark:text-slate-400">Last Sync: {sys.lastSyncTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
