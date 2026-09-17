import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { buses, drivers, routes, trips, maintenanceRecords, incidents, setSelectedBusId, setSelectedDriverId, setSelectedRouteId, setSelectedTripId } = useData();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else navigate('#search'); // triggers open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, navigate]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingBuses = q ? buses.filter(b => b.registrationNumber.toLowerCase().includes(q) || b.model.toLowerCase().includes(q) || b.driverName.toLowerCase().includes(q)) : [];
  const matchingDrivers = q ? drivers.filter(d => d.name.toLowerCase().includes(q) || d.licenseNumber.toLowerCase().includes(q) || d.phone.includes(q)) : [];
  const matchingRoutes = q ? routes.filter(r => r.code.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.origin.toLowerCase().includes(q) || r.destination.toLowerCase().includes(q)) : [];
  const matchingTrips = q ? trips.filter(t => t.id.toLowerCase().includes(q) || t.busNumber.toLowerCase().includes(q) || t.driverName.toLowerCase().includes(q) || t.routeCode.toLowerCase().includes(q)) : [];
  const matchingMaintenance = q ? maintenanceRecords.filter(m => m.busRegistration.toLowerCase().includes(q) || m.serviceType.toLowerCase().includes(q)) : [];
  const matchingIncidents = q ? incidents.filter(i => i.busRegistration.toLowerCase().includes(q) || i.type.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)) : [];

  const totalResults = matchingBuses.length + matchingDrivers.length + matchingRoutes.length + matchingTrips.length + matchingMaintenance.length + matchingIncidents.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-start justify-center pt-3 sm:pt-16 px-2.5 sm:px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] sm:rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[80vh] my-auto sm:my-0">
        {/* Search Bar Input Header */}
        <div className="p-3 sm:p-4 border-b border-surface-container/80 dark:border-slate-800 flex items-center gap-2.5 sm:gap-3">
          <span className="material-symbols-outlined text-primary dark:text-indigo-400 text-[22px] sm:text-[24px]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search buses, drivers, routes, trips, incidents... (Esc to close)"
            className="flex-1 bg-transparent text-on-surface dark:text-slate-100 text-sm sm:text-base outline-none placeholder:text-outline/60 dark:placeholder:text-slate-500 font-medium h-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800"
              aria-label="Clear search"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-surface-container dark:bg-slate-800 text-xs font-semibold rounded-xl text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high"
          >
            Esc
          </button>
        </div>

        {/* Search Results Body */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 flex flex-col gap-4 no-scrollbar">
          {!q ? (
            <div className="py-8 text-center text-outline dark:text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-2 text-primary/40 dark:text-indigo-400/40">saved_search</span>
              <p className="text-sm font-medium">Type to search across the entire Smart Bus 360 platform</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <button onClick={() => setQuery('TN 38')} className="text-[11px] px-2.5 py-1 bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high rounded-lg text-on-surface dark:text-slate-300">Try "TN 38"</button>
                <button onClick={() => setQuery('Rajesh')} className="text-[11px] px-2.5 py-1 bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high rounded-lg text-on-surface dark:text-slate-300">Try "Rajesh"</button>
                <button onClick={() => setQuery('21A')} className="text-[11px] px-2.5 py-1 bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high rounded-lg text-on-surface dark:text-slate-300">Try "21A"</button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-outline dark:text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-2">sentiment_dissatisfied</span>
              <p className="text-sm font-medium">No operational records found matching "{query}"</p>
            </div>
          ) : (
            <>
              {/* Buses */}
              {matchingBuses.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-2 block">
                    Buses ({matchingBuses.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {matchingBuses.map(b => (
                      <div
                        key={b.id}
                        onClick={() => {
                          setSelectedBusId(b.id);
                          onClose();
                          navigate('/buses');
                        }}
                        className="p-3 rounded-2xl bg-surface-container/40 dark:bg-slate-800/50 hover:bg-surface-container dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                            <span className="material-symbols-outlined text-[18px]">directions_bus</span>
                          </div>
                          <div>
                            <span className="font-bold text-sm text-on-surface dark:text-slate-100">{b.registrationNumber}</span>
                            <p className="text-xs text-outline dark:text-slate-400">{b.model} • Driver: {b.driverName}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drivers */}
              {matchingDrivers.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-2 block">
                    Drivers ({matchingDrivers.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {matchingDrivers.map(d => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setSelectedDriverId(d.id);
                          onClose();
                          navigate('/drivers');
                        }}
                        className="p-3 rounded-2xl bg-surface-container/40 dark:bg-slate-800/50 hover:bg-surface-container dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={d.avatar} alt={d.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-sm text-on-surface dark:text-slate-100">{d.name}</span>
                            <p className="text-xs text-outline dark:text-slate-400">{d.licenseNumber} • Safety Score: {d.safetyScore}/100</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 capitalize">
                          {d.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Routes */}
              {matchingRoutes.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-2 block">
                    Routes ({matchingRoutes.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {matchingRoutes.map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setSelectedRouteId(r.id);
                          onClose();
                          navigate('/routes');
                        }}
                        className="p-3 rounded-2xl bg-surface-container/40 dark:bg-slate-800/50 hover:bg-surface-container dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
                            {r.code}
                          </div>
                          <div>
                            <span className="font-bold text-sm text-on-surface dark:text-slate-100">{r.name}</span>
                            <p className="text-xs text-outline dark:text-slate-400">{r.distanceKm} km • {r.totalStops} stops • {r.activeBusesCount} buses</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-primary dark:text-indigo-400">View Route ➔</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trips */}
              {matchingTrips.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-2 block">
                    Trips ({matchingTrips.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {matchingTrips.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedTripId(t.id);
                          onClose();
                          navigate('/trips');
                        }}
                        className="p-3 rounded-2xl bg-surface-container/40 dark:bg-slate-800/50 hover:bg-surface-container dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                            <span className="material-symbols-outlined text-[18px]">departure_board</span>
                          </div>
                          <div>
                            <span className="font-bold text-sm text-on-surface dark:text-slate-100">{t.id} — Route {t.routeCode}</span>
                            <p className="text-xs text-outline dark:text-slate-400">{t.busNumber} • {t.driverName} • {t.currentStop}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-indigo-400">
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
