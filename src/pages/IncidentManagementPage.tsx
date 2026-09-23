import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const IncidentManagementPage: React.FC = () => {
  const { incidents, resolveIncident } = useData();
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  const selectedIncident = incidents.find(i => i.id === selectedIncidentId);

  const openCount = incidents.filter(i => i.status === 'open').length;
  const criticalCount = incidents.filter(i => i.severity === 'critical').length;
  const investigatingCount = incidents.filter(i => i.status === 'investigating').length;
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length;

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIncidentId && resolutionText) {
      resolveIncident(selectedIncidentId, resolutionText);
      setSelectedIncidentId(null);
      setResolutionText('');
    }
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Incident Management"
        badge={`${incidents.length} Incidents Logged`}
        subtitle="Tracking accidents, breakdowns, emergencies, and safety protocol investigations."
        breadcrumb="Safety"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 min-w-0">
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase truncate block">Open Incidents</span>
          <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">{openCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-xs font-bold text-rose-500 uppercase truncate block">Critical Severity</span>
          <p className="text-2xl font-bold text-rose-500 mt-1">{criticalCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-xs font-bold text-amber-500 uppercase truncate block">Under Investigation</span>
          <p className="text-2xl font-bold text-amber-500 mt-1">{investigatingCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase truncate block">Resolved</span>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{resolvedCount}</p>
        </div>
      </div>

      {/* Incident Log Container */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {incidents.map(inc => (
            <div key={inc.id} className="p-4 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 border border-surface-container/60 dark:border-slate-800 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-primary dark:text-indigo-400">{inc.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                  inc.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {inc.status}
                </span>
              </div>
              <div>
                <span className="font-bold text-sm text-on-surface dark:text-slate-100">{inc.busRegistration}</span>
                <p className="text-xs text-outline dark:text-slate-400">{inc.driverName} • {inc.location}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-container/40 dark:border-slate-700/40">
                <div>
                  <span className="font-bold text-xs text-on-surface dark:text-slate-200 capitalize">{inc.type.replace('_', ' ')}</span>
                  <span className={`block text-[10px] font-bold uppercase ${
                    inc.severity === 'critical' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {inc.severity} Severity
                  </span>
                </div>
                <button
                  onClick={() => setSelectedIncidentId(inc.id)}
                  className="px-3.5 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-sm min-h-[36px]"
                >
                  Details ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block table-container no-scrollbar">
        <table className="w-full text-left border-collapse text-xs min-w-[750px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4">Incident ID</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Bus & Driver</th>
              <th className="py-3 px-4">Type & Severity</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {incidents.map(inc => (
              <tr key={inc.id} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-4 font-mono font-bold text-primary dark:text-indigo-400">{inc.id}</td>
                <td className="py-3.5 px-4 text-outline dark:text-slate-400">{inc.timestamp}</td>
                <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">
                  {inc.busRegistration}
                  <span className="block text-[11px] font-normal text-outline dark:text-slate-400">{inc.driverName}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-on-surface dark:text-slate-200 capitalize">{inc.type.replace('_', ' ')}</span>
                  <span className={`block text-[10px] font-bold uppercase ${
                    inc.severity === 'critical' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {inc.severity} Severity
                  </span>
                </td>
                <td className="py-3.5 px-4 text-outline dark:text-slate-300">{inc.location}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                    inc.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {inc.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedIncidentId(inc.id)}
                    className="px-3 py-1 bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary font-bold text-xs rounded-xl transition-colors"
                  >
                    Details ➔
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 w-full max-w-2xl shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-surface-container dark:border-slate-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-primary dark:text-indigo-400">{selectedIncident.id}</span>
                <h3 className="font-bold text-base text-on-surface dark:text-slate-100 capitalize mt-0.5">{selectedIncident.type.replace('_', ' ')} Incident Report</h3>
              </div>
              <button onClick={() => setSelectedIncidentId(null)} className="p-1 text-outline hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-surface-container dark:bg-slate-800 p-4 rounded-2xl">
              <div>
                <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Bus Involved</span>
                <p className="font-bold text-on-surface dark:text-slate-100">{selectedIncident.busRegistration}</p>
              </div>
              <div>
                <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Driver Duty</span>
                <p className="font-bold text-on-surface dark:text-slate-100">{selectedIncident.driverName}</p>
              </div>
              <div>
                <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Passengers Onboard</span>
                <p className="font-bold text-on-surface dark:text-slate-100">{selectedIncident.passengerCount} Boarded</p>
              </div>
              <div>
                <span className="text-outline dark:text-slate-400 font-bold uppercase text-[10px]">Assigned Response Team</span>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{selectedIncident.assignedTeam}</p>
              </div>
            </div>

            <div className="text-xs">
              <span className="font-bold text-outline dark:text-slate-400 uppercase text-[10px]">Incident Description</span>
              <p className="font-semibold text-on-surface dark:text-slate-200 mt-1">{selectedIncident.description}</p>
            </div>

            <div className="text-xs">
              <span className="font-bold text-outline dark:text-slate-400 uppercase text-[10px]">Actions Taken</span>
              <ul className="list-disc list-inside mt-1 flex flex-col gap-1 text-on-surface-variant dark:text-slate-300">
                {selectedIncident.actionsTaken.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

            {selectedIncident.status !== 'resolved' ? (
              <form onSubmit={handleResolveSubmit} className="flex flex-col gap-2 pt-2 border-t border-surface-container dark:border-slate-800">
                <label className="text-xs font-bold text-outline dark:text-slate-400">Add Resolution Summary to Close Incident</label>
                <textarea
                  rows={3}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="Enter resolution notes, vehicle clearance status, and passenger outcome..."
                  className="w-full p-3 bg-surface-container dark:bg-slate-800 rounded-xl text-xs text-on-surface dark:text-slate-100 outline-none"
                  required
                />
                <button type="submit" className="py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow">
                  Mark Incident Resolved
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs">
                <span className="font-bold block">✓ RESOLUTION RECORDED</span>
                <p className="mt-0.5">{selectedIncident.resolutionText}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
