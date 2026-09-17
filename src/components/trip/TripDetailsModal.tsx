import React from 'react';
import { useData } from '../../context/DataContext';

interface TripDetailsModalProps {
  tripId: string | null;
  onClose: () => void;
}

export const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ tripId, onClose }) => {
  const { trips } = useData();

  if (!tripId) return null;
  const trip = trips.find(t => t.id === tripId);
  if (!trip) return null;

  const events = trip.events || [
    { id: 'ev-1', timestamp: trip.departureTime, title: 'Boarding Completed', description: `${trip.passengerCount} passengers boarded`, type: 'boarding' },
    { id: 'ev-2', timestamp: trip.departureTime, title: 'Trip Departure', description: 'Left origin station on schedule', type: 'departure' },
    { id: 'ev-3', timestamp: 'In Progress', title: 'Approaching Stop', description: `Currently at ${trip.currentStop}`, type: 'stop' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-surface-container/80 dark:border-slate-800 flex items-center justify-between bg-surface-container-low/40 dark:bg-slate-800/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary dark:text-indigo-400">TRIP ID: {trip.id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                trip.status === 'in_transit' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                trip.status === 'delayed' ? 'bg-error/10 text-error' : 'bg-slate-500/10 text-slate-400'
              }`}>
                {trip.status.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-on-surface dark:text-slate-100 mt-1">Route {trip.routeCode} — {trip.routeName}</h2>
            <p className="text-xs text-outline dark:text-slate-400">Bus: {trip.busNumber} • Driver: {trip.driverName}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 no-scrollbar">
          {/* Key Trip Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Departure</span>
              <p className="text-sm font-bold text-on-surface dark:text-slate-100 mt-0.5">{trip.departureTime}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Expected Arrival</span>
              <p className="text-sm font-bold text-on-surface dark:text-slate-100 mt-0.5">{trip.arrivalTime}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">Passenger Load</span>
              <p className="text-sm font-bold text-primary dark:text-indigo-400 mt-0.5">{trip.passengerCount} / {trip.maxCapacity}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800">
              <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase">ETA to Destination</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{trip.etaMins} mins</p>
            </div>
          </div>

          {/* Delay Warning if applicable */}
          {trip.delayReason && (
            <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error flex items-start gap-3">
              <span className="material-symbols-outlined text-[22px]">warning</span>
              <div>
                <span className="font-bold text-xs uppercase tracking-wide">Trip Delay Reason Logged</span>
                <p className="text-xs font-semibold mt-0.5">{trip.delayReason}</p>
              </div>
            </div>
          )}

          {/* Progress Bar Timeline */}
          <div>
            <div className="flex justify-between text-xs font-bold text-on-surface dark:text-slate-200 mb-2">
              <span>Trip Progress</span>
              <span>{trip.progressPercent}% Completed</span>
            </div>
            <div className="w-full h-3 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-primary dark:bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${trip.progressPercent}%` }}></div>
            </div>
            <div className="flex justify-between text-[11px] text-outline dark:text-slate-400 mt-2 font-semibold">
              <span>Scheduled</span>
              <span>Started</span>
              <span className="text-primary dark:text-indigo-400 font-bold">Current: {trip.currentStop}</span>
              <span>Completed</span>
            </div>
          </div>

          {/* Detailed Trip Event Audit Timeline */}
          <div className="p-5 rounded-2xl border border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900">
            <h3 className="font-bold text-sm text-on-surface dark:text-slate-100 mb-4">Realtime Telemetry Event Log</h3>
            <div className="flex flex-col gap-4 relative">
              {events.map((ev, i) => (
                <div key={ev.id || i} className="flex items-start gap-3 relative">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary dark:text-indigo-400 flex items-center justify-center font-bold text-xs flex-shrink-0 z-10">
                    <span className="material-symbols-outlined text-[18px]">
                      {ev.type === 'boarding' ? 'groups' : ev.type === 'departure' ? 'departure_board' : ev.type === 'delay' ? 'warning' : 'place'}
                    </span>
                  </div>
                  <div className="flex-1 bg-surface-container/40 dark:bg-slate-800/40 p-3 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface dark:text-slate-100">{ev.title}</span>
                      <span className="text-[10px] text-outline dark:text-slate-400">{ev.timestamp}</span>
                    </div>
                    <p className="text-xs text-outline dark:text-slate-400 mt-1">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
