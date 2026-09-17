import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const EmergencyResponsePage: React.FC = () => {
  const { emergencies, resolveEmergency, lockTripEmergency, showToast } = useData();
  const [activeActionModal, setActiveActionModal] = useState<{
    emergencyId: string;
    actionType: 'call' | 'notify' | 'dispatch' | 'escalate' | 'services' | 'lock' | 'resolve';
    title: string;
    description: string;
  } | null>(null);

  const activeEm = emergencies[0]; // Primary active emergency if available

  const handleConfirmAction = () => {
    if (!activeActionModal) return;
    const { actionType, emergencyId } = activeActionModal;

    if (actionType === 'resolve') {
      resolveEmergency(emergencyId);
      showToast(`Emergency alert #${emergencyId} resolved. Operations normal.`, 'success');
    } else if (actionType === 'lock') {
      lockTripEmergency(emergencyId);
      showToast(`Trip locked down. Emergency protocol initiated.`, 'info');
    } else if (actionType === 'services') {
      showToast(`Emergency Services (108 / Fire & Safety) contacted with GPS coordinates!`, 'error');
    } else {
      showToast(`Action "${activeActionModal.title}" executed successfully.`);
    }

    setActiveActionModal(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* High Visibility Emergency Command Header */}
      <div className="p-6 rounded-[28px] bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border-2 border-error/50 text-white shadow-2xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-error text-on-error flex items-center justify-center font-bold text-2xl shadow-lg shadow-error/40 animate-pulse">
            <span className="material-symbols-outlined text-[32px]">warning</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight text-white">EMERGENCY RESPONSE CENTER</h2>
              <span className="px-3 py-0.5 rounded-full bg-error text-on-error font-extrabold text-xs uppercase animate-bounce">
                CRITICAL PRIORITY
              </span>
            </div>
            <p className="text-xs text-rose-200 mt-1">High-priority incident intervention & emergency service dispatch console</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-rose-300">Active Emergencies</span>
            <span className="text-2xl font-black text-rose-400">{emergencies.length}</span>
          </div>
        </div>
      </div>

      {emergencies.length === 0 ? (
        <div className="p-12 rounded-[28px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-6xl text-emerald-500">check_circle</span>
          <h3 className="font-bold text-lg text-on-surface dark:text-slate-100">All Operations Normal</h3>
          <p className="text-xs text-outline dark:text-slate-400 max-w-md">No active emergency alerts or SOS signals in the system at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Emergency Map & Telemetry Panel */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Active Emergency Telemetry Banner */}
            <div className="p-6 rounded-[28px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-surface-container dark:border-slate-800 pb-3">
                <span className="font-bold text-sm text-error flex items-center gap-2">
                  <span className="material-symbols-outlined">report_problem</span>
                  INCIDENT #{activeEm.incidentId} — {activeEm.busRegistration}
                </span>
                <span className="text-xs font-bold text-outline dark:text-slate-400">{activeEm.timeAgo}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Driver</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 mt-0.5">{activeEm.driverName}</p>
                  <p className="text-[11px] text-primary dark:text-indigo-400 font-semibold">{activeEm.driverPhone}</p>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Passengers</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 mt-0.5">{activeEm.passengerCount} Boarded</p>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Nearest Depot</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 mt-0.5">{activeEm.nearestDepot}</p>
                </div>
                <div className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Support Unit</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{activeEm.nearestSupportTeam}</p>
                </div>
              </div>

              {/* High Vis Emergency Map */}
              <div className="relative w-full h-[360px] bg-slate-950 rounded-2xl overflow-hidden border-2 border-error/30 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="gridEm" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ef4444" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#gridEm)" />
                </svg>

                {/* Emergency Location Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-bounce">
                  <div className="w-12 h-12 rounded-full bg-error text-on-error flex items-center justify-center font-bold shadow-2xl ring-8 ring-error/30">
                    <span className="material-symbols-outlined text-[28px]">warning</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-xl border border-error mt-2">
                    {activeEm.busRegistration} ({activeEm.locationName})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Command Console */}
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3">
              Emergency Protocols & Interventions
            </h3>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setActiveActionModal({
                  emergencyId: activeEm.id,
                  actionType: 'call',
                  title: `Call Driver ${activeEm.driverName}`,
                  description: `Establish high-priority voice link to phone ${activeEm.driverPhone}.`
                })}
                className="w-full py-3 px-4 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high font-bold text-xs text-on-surface dark:text-slate-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">call</span>
                  Call Driver Direct
                </span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>

              <button
                onClick={() => setActiveActionModal({
                  emergencyId: activeEm.id,
                  actionType: 'dispatch',
                  title: 'Dispatch Support Vehicle',
                  description: `Deploy Mobile EV Support Unit Alpha from ${activeEm.nearestDepot}.`
                })}
                className="w-full py-3 px-4 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high font-bold text-xs text-on-surface dark:text-slate-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-500">local_shipping</span>
                  Dispatch Technical Support Unit
                </span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>

              <button
                onClick={() => setActiveActionModal({
                  emergencyId: activeEm.id,
                  actionType: 'services',
                  title: 'Contact Emergency Services (108)',
                  description: 'Alert police/ambulance control with exact GPS coordinates.'
                })}
                className="w-full py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 font-bold text-xs flex items-center justify-between hover:bg-amber-500/20"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">local_hospital</span>
                  Contact Emergency Services (108)
                </span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>

              <button
                onClick={() => setActiveActionModal({
                  emergencyId: activeEm.id,
                  actionType: 'lock',
                  title: 'Lock Trip Operations',
                  description: 'Halt vehicle remote start and trigger passenger safety protocol.'
                })}
                className="w-full py-3 px-4 rounded-xl bg-error/10 border border-error/30 text-error font-bold text-xs flex items-center justify-between hover:bg-error/20"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">lock</span>
                  Lock Trip Protocol
                </span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
              </button>

              <button
                onClick={() => setActiveActionModal({
                  emergencyId: activeEm.id,
                  actionType: 'resolve',
                  title: 'Resolve Emergency Incident',
                  description: 'Mark emergency resolved and restore normal fleet operations.'
                })}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg hover:bg-emerald-700 mt-2 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Resolve Incident & Close SOS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog Modal for Emergency Actions */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border-2 border-error/40 w-full max-w-md shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3 text-error">
              <span className="material-symbols-outlined text-3xl">error_med</span>
              <h3 className="font-bold text-base text-on-surface dark:text-slate-100">{activeActionModal.title}</h3>
            </div>

            <p className="text-xs font-semibold text-on-surface dark:text-slate-300 bg-surface-container dark:bg-slate-800 p-3 rounded-xl">
              {activeActionModal.description}
            </p>

            <p className="text-[11px] text-error font-bold uppercase tracking-wider">
              ⚠️ Confirmation required: This action will be logged in the permanent audit trail.
            </p>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setActiveActionModal(null)}
                className="px-4 py-2 bg-surface-container dark:bg-slate-800 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-error text-on-error font-bold text-xs rounded-xl shadow-lg"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
