import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import type { TripStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';
import { MobileFilterSheet } from '../components/common/MobileFilterSheet';
import { PageHeader } from '../components/common/PageHeader';

export const TripManagementPage: React.FC = () => {
  const { trips, addTrip, updateTripStatus } = useData();
  const [activeTab, setActiveTab] = useState<'all' | TripStatus>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [routeCode, setRouteCode] = useState('21A');
  const [routeName, setRouteName] = useState('Gandhipuram ➔ Singanallur');
  const [busNumber, setBusNumber] = useState('TN 38 AB 1234');
  const [driverName, setDriverName] = useState('Rajesh K.');
  const [departureTime, setDepartureTime] = useState('09:00 AM');
  const [arrivalTime, setArrivalTime] = useState('09:45 AM');

  const filteredTrips = useMemo(() => {
    return trips.filter(t => {
      const matchesTab = activeTab === 'all' || t.status === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        t.id.toLowerCase().includes(q) ||
        t.routeCode.toLowerCase().includes(q) ||
        t.routeName.toLowerCase().includes(q) ||
        t.busNumber.toLowerCase().includes(q) ||
        t.driverName.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [trips, activeTab, searchQuery]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrip({
      routeCode,
      routeName,
      busNumber,
      driverName,
      departureTime,
      arrivalTime,
      status: 'scheduled',
      passengerCount: 0,
      maxCapacity: 50,
      etaMins: 45,
      currentStop: 'Depot Dispatch',
      progressPercent: 0
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Standard Mobile Page Header */}
      <PageHeader
        title="Active Trips & Schedule Logs"
        description="Monitor live departures, passenger loads, and on-time status across active routes."
        primaryAction={{
          label: 'Dispatch New Trip',
          icon: 'departure_board',
          onClick: () => setIsAddModalOpen(true)
        }}
        search={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: 'Search trips by ID, route, bus, driver...',
          onClear: () => setSearchQuery('')
        }}
        filter={{
          label: 'Filters',
          activeCount: activeTab !== 'all' ? 1 : 0,
          onClick: () => setIsFilterSheetOpen(true)
        }}
      >
        {/* Desktop Filter Tabs */}
        <div className="hidden sm:flex gap-2 overflow-x-auto no-scrollbar py-1">
          {(['all', 'in_transit', 'scheduled', 'completed', 'delayed'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize whitespace-nowrap transition-all min-h-[40px] ${
                activeTab === tab
                  ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        onReset={() => setActiveTab('all')}
        activeFilterCount={activeTab !== 'all' ? 1 : 0}
        title="Filter Trips"
      >
        <div className="space-y-3">
          <label className="text-xs font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
            Trip Status
          </label>
          <div className="flex flex-col gap-2">
            {(['all', 'in_transit', 'scheduled', 'completed', 'delayed'] as const).map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setIsFilterSheetOpen(false);
                }}
                className={`w-full p-3 rounded-xl text-left text-xs font-bold capitalize flex items-center justify-between transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200'
                }`}
              >
                <span>{tab.replace('_', ' ')}</span>
                {activeTab === tab && (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </MobileFilterSheet>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            className="card-responsive bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col justify-between gap-4 min-w-0"
          >
            <div className="min-w-0">
              {/* Trip Code & Status */}
              <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-extrabold text-xs flex-shrink-0">
                      {trip.routeCode}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 truncate min-w-0">{trip.routeName}</h3>
                  </div>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 truncate">
                    Bus: <strong className="text-on-surface dark:text-slate-200">{trip.busNumber}</strong> • Driver: {trip.driverName}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <StatusBadge status={trip.status} type="trip" />
                </div>
              </div>

              {/* Progress Bar for In Transit */}
              {trip.status === 'in_transit' && (
                <div className="my-3">
                  <div className="flex justify-between text-xs text-outline dark:text-slate-400 mb-1 font-semibold">
                    <span>Current Stop: {trip.currentStop}</span>
                    <span className="text-primary dark:text-indigo-400 font-bold">{trip.etaMins} mins ETA</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-primary dark:bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${trip.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="h-px w-full bg-surface-container dark:bg-slate-800 my-3"></div>

              {/* Departure & Arrival Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-outline dark:text-slate-400 uppercase">Departure</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 text-sm mt-0.5">{trip.departureTime}</p>
                </div>
                <div className="text-right">
                  <span className="text-outline dark:text-slate-400 uppercase">Est. Arrival</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 text-sm mt-0.5">{trip.arrivalTime}</p>
                </div>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-3 border-t border-surface-container dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface-variant dark:text-slate-400">
                Load: {trip.passengerCount} / {trip.maxCapacity} Passengers
              </span>

              <div className="flex gap-2">
                {trip.status === 'scheduled' && (
                  <button
                    onClick={() => updateTripStatus(trip.id, 'in_transit')}
                    className="px-3 py-1.5 rounded-full bg-primary dark:bg-indigo-600 text-on-primary font-bold text-xs hover:bg-primary/90"
                  >
                    Start Trip
                  </button>
                )}
                {trip.status === 'in_transit' && (
                  <button
                    onClick={() => updateTripStatus(trip.id, 'completed')}
                    className="px-3 py-1.5 rounded-full bg-success dark:bg-emerald-600 text-on-success font-bold text-xs hover:bg-success/90"
                  >
                    Complete Trip
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-12 text-center flex flex-col items-center justify-center border border-surface-container dark:border-slate-800">
          <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-500 mb-2">departure_board</span>
          <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">No trips found</h3>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-sm mt-1 mb-4">No trips match the selected status filter.</p>
          <button
            onClick={() => setActiveTab('all')}
            className="px-5 py-2.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold text-sm hover:bg-primary/20 transition-colors"
          >
            Show All Trips
          </button>
        </div>
      )}

      {/* Add Trip Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Trip Departure"
      >
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Route Code</label>
              <input
                type="text"
                value={routeCode}
                onChange={(e) => setRouteCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Bus Registration</label>
              <input
                type="text"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Route Title</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Assigned Driver</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Departure Time</label>
              <input
                type="text"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Est Arrival Time</label>
              <input
                type="text"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-semibold text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary dark:bg-indigo-600 hover:bg-primary/90 dark:hover:bg-indigo-500 text-on-primary font-bold text-label-md"
            >
              Dispatch Trip
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
