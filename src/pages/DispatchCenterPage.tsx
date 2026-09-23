import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const DispatchCenterPage: React.FC = () => {
  const { trips, buses, drivers, reassignTrip, updateTripStatus, showToast } = useData();
  const [selectedConflictTrip, setSelectedConflictTrip] = useState<any | null>(null);
  const [reassignModalTripId, setReassignModalTripId] = useState<string | null>(null);
  const [selectedBusId, setSelectedBusId] = useState<string>('');
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');

  const unassignedTrips = trips.filter(t => t.status === 'scheduled' && (!t.busNumber || t.busNumber === 'Unassigned'));
  const assignedTrips = trips.filter(t => t.status === 'scheduled' && t.busNumber && t.busNumber !== 'Unassigned');
  const inProgressTrips = trips.filter(t => t.status === 'in_transit');
  const delayedTrips = trips.filter(t => t.status === 'delayed');
  const completedTrips = trips.filter(t => t.status === 'completed');

  const handleOpenReassign = (trip: any) => {
    setReassignModalTripId(trip.id);
    setSelectedBusId(buses[0]?.id || '');
    setSelectedDriverId(drivers[0]?.id || '');
  };

  const handleConfirmReassign = () => {
    if (!reassignModalTripId) return;

    // Conflict Check
    const targetBus = buses.find(b => b.id === selectedBusId);
    const targetDriver = drivers.find(d => d.id === selectedDriverId);

    if (targetBus?.status === 'maintenance') {
      setSelectedConflictTrip({
        tripId: reassignModalTripId,
        type: 'BUS_UNAVAILABLE',
        title: 'BUS UNAVAILABLE FOR DISPATCH',
        message: `Bus ${targetBus.registrationNumber} is currently undergoing maintenance at ${targetBus.depotLocation}.`,
        targetBusId: selectedBusId,
        targetDriverId: selectedDriverId
      });
      return;
    }

    if (targetDriver?.status === 'on_break' || targetDriver?.status === 'off_duty') {
      setSelectedConflictTrip({
        tripId: reassignModalTripId,
        type: 'DRIVER_CONFLICT',
        title: 'DRIVER CONFLICT DETECTED',
        message: `Driver ${targetDriver.name} is currently marked ${targetDriver.status.toUpperCase()}.`,
        targetBusId: selectedBusId,
        targetDriverId: selectedDriverId
      });
      return;
    }

    reassignTrip(reassignModalTripId, selectedBusId, selectedDriverId);
    setReassignModalTripId(null);
  };

  const handleResolveConflictOverride = () => {
    if (selectedConflictTrip) {
      // Force change status to active and perform reassign
      reassignTrip(selectedConflictTrip.tripId, selectedConflictTrip.targetBusId, selectedConflictTrip.targetDriverId);
      showToast(`Conflict resolved by override. Driver/Bus reassigned.`);
      setSelectedConflictTrip(null);
      setReassignModalTripId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Header & Quick Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Fleet Operations Dispatch Board</h2>
          <p className="text-xs text-outline dark:text-slate-400 mt-0.5">Live trip assignment, driver pairing, and conflict resolution center</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
            {inProgressTrips.length} Trips In Transit
          </span>
          <span className="px-3 py-1.5 bg-amber-500/10 text-amber-600 text-xs font-bold rounded-full">
            {delayedTrips.length} Delayed
          </span>
        </div>
      </div>

      {/* Dispatch Board Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-w-0">
        {/* Column 1: Unassigned / Pending */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 border border-surface-container dark:border-slate-800 flex flex-col gap-3 min-w-0">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-800">
            <span className="font-bold text-xs text-on-surface dark:text-slate-200">Unassigned Trips</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 text-[11px] font-bold">
              {unassignedTrips.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[200px] min-w-0">
            {unassignedTrips.length === 0 ? (
              <p className="text-[11px] text-outline dark:text-slate-500 text-center py-8">All trips assigned!</p>
            ) : (
              unassignedTrips.map(t => (
                <div key={t.id} className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 border border-slate-700/40 flex flex-col gap-2 shadow-sm min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-mono text-[11px] font-bold text-primary dark:text-indigo-400 truncate">{t.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-500/20 text-slate-300 flex-shrink-0">Pending</span>
                  </div>
                  <span className="font-bold text-xs text-on-surface dark:text-slate-100 truncate">{t.routeName}</span>
                  <p className="text-[11px] text-outline dark:text-slate-400">Dep: {t.departureTime}</p>
                  <button
                    onClick={() => handleOpenReassign(t)}
                    className="mt-1 py-2 px-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary/90 min-h-[40px]"
                  >
                    Assign Bus & Driver
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Scheduled & Assigned */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 border border-surface-container dark:border-slate-800 flex flex-col gap-3 min-w-0">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-800">
            <span className="font-bold text-xs text-on-surface dark:text-slate-200">Scheduled & Ready</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[11px] font-bold">
              {assignedTrips.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[200px] min-w-0">
            {assignedTrips.map(t => (
              <div key={t.id} className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 border border-slate-700/40 flex flex-col gap-2 shadow-sm min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-mono text-[11px] font-bold text-primary dark:text-indigo-400 truncate">{t.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 flex-shrink-0">Scheduled</span>
                </div>
                <span className="font-bold text-xs text-on-surface dark:text-slate-100 truncate">{t.routeName}</span>
                <div className="text-[11px] text-outline dark:text-slate-400">
                  <p className="truncate">Bus: <strong className="text-on-surface dark:text-slate-200">{t.busNumber}</strong></p>
                  <p>Driver: <strong className="text-on-surface dark:text-slate-200">{t.driverName}</strong></p>
                </div>
                <div className="flex gap-1.5 mt-1">
                  <button
                    onClick={() => handleOpenReassign(t)}
                    className="flex-1 py-1 bg-surface-container-high dark:bg-slate-700 text-on-surface dark:text-slate-200 font-bold text-[11px] rounded-lg"
                  >
                    Reassign
                  </button>
                  <button
                    onClick={() => updateTripStatus(t.id, 'in_transit')}
                    className="flex-1 py-1 bg-emerald-600 text-white font-bold text-[11px] rounded-lg"
                  >
                    Start Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: In Progress */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 border border-surface-container dark:border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-800">
            <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">In Transit</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
              {inProgressTrips.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[300px]">
            {inProgressTrips.map(t => (
              <div key={t.id} className="p-3.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 flex flex-col gap-2 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{t.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 animate-pulse">Live</span>
                </div>
                <span className="font-bold text-xs text-on-surface dark:text-slate-100">{t.routeName}</span>
                <p className="text-[11px] text-outline dark:text-slate-400">{t.busNumber} • {t.driverName}</p>
                <div className="w-full h-1.5 bg-surface-container-high dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${t.progressPercent}%` }}></div>
                </div>
                <button
                  onClick={() => updateTripStatus(t.id, 'completed')}
                  className="mt-1 py-1 bg-emerald-600 text-white font-bold text-[11px] rounded-lg"
                >
                  Mark Completed
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Delayed */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 border border-surface-container dark:border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-800">
            <span className="font-bold text-xs text-amber-500">Delayed Trips</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-bold">
              {delayedTrips.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[300px]">
            {delayedTrips.map(t => (
              <div key={t.id} className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col gap-2 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[11px] font-bold text-amber-600">{t.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-600">Delayed</span>
                </div>
                <span className="font-bold text-xs text-on-surface dark:text-slate-100">{t.routeName}</span>
                <p className="text-[11px] font-bold text-rose-500">{t.delayReason || 'Congestion / Engine check'}</p>
                <button
                  onClick={() => handleOpenReassign(t)}
                  className="py-1 bg-amber-500 text-white font-bold text-[11px] rounded-lg"
                >
                  Reassign Driver / Bus
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Column 5: Completed */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 border border-surface-container dark:border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-surface-container dark:border-slate-800">
            <span className="font-bold text-xs text-slate-400">Completed</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 text-[11px] font-bold">
              {completedTrips.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[300px]">
            {completedTrips.map(t => (
              <div key={t.id} className="p-3 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 text-xs">
                <span className="font-bold text-on-surface dark:text-slate-200">{t.id} — {t.routeCode}</span>
                <p className="text-outline dark:text-slate-400 text-[11px] mt-0.5">{t.busNumber} • {t.driverName}</p>
                <span className="text-[10px] text-emerald-600 font-bold block mt-1">✓ Completed on time</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reassign Modal */}
      {reassignModalTripId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 w-full max-w-md shadow-2xl flex flex-col gap-4">
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100">Assign / Reassign Vehicle & Driver</h3>
            <p className="text-xs text-outline dark:text-slate-400">Select an available bus and duty driver for Trip #{reassignModalTripId}.</p>

            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 mb-1 uppercase">Select Bus</label>
              <select
                value={selectedBusId}
                onChange={(e) => setSelectedBusId(e.target.value)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              >
                {buses.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.registrationNumber} ({b.model}) — Status: {b.status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 mb-1 uppercase">Select Driver</label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              >
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.licenseNumber}) — Status: {d.status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 justify-end mt-2">
              <button
                onClick={() => setReassignModalTripId(null)}
                className="px-4 py-2 bg-surface-container dark:bg-slate-800 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReassign}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-xl shadow"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Resolution Modal */}
      {selectedConflictTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in zoom-in-95 duration-150">
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border-2 border-error/40 w-full max-w-lg shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3 text-error">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h3 className="font-bold text-base">{selectedConflictTrip.title}</h3>
            </div>

            <p className="text-xs text-on-surface dark:text-slate-200 leading-relaxed font-semibold bg-error/10 p-3 rounded-xl border border-error/20">
              {selectedConflictTrip.message}
            </p>

            <p className="text-xs text-outline dark:text-slate-400">
              Proceeding without resolution may result in operational safety flags or duplicate driver scheduling.
            </p>

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setSelectedConflictTrip(null)}
                className="px-4 py-2 bg-surface-container dark:bg-slate-800 text-xs font-bold rounded-xl"
              >
                Back & Choose Different Bus/Driver
              </button>
              <button
                onClick={handleResolveConflictOverride}
                className="px-4 py-2 bg-error text-on-error font-bold text-xs rounded-xl shadow"
              >
                Resolve Conflict & Force Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
