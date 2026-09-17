import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import type { Bus, BusStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';
import { Modal } from '../components/common/Modal';

export const BusManagementPage: React.FC = () => {
  const { buses, addBus, updateBus, deleteBus, changeBusStatus } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState<'all' | BusStatus>('all');
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form State
  const [regNum, setRegNum] = useState('');
  const [model, setModel] = useState('Volvo 9400 B11R');
  const [capacity, setCapacity] = useState('50');
  const [driverName, setDriverName] = useState('Rajesh K.');
  const [routeName, setRouteName] = useState('Route 21A: Gandhipuram ➔ Singanallur');

  const filteredBuses = useMemo(() => {
    return buses.filter(b => {
      const matchesFilter = activeFilter === 'all' || b.status === activeFilter;
      const matchesSearch = 
        b.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [buses, activeFilter, searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setSearchParams({});
  };

  const handleOpenEdit = (bus: Bus) => {
    setSelectedBus(bus);
    setRegNum(bus.registrationNumber);
    setModel(bus.model);
    setCapacity(bus.capacity.toString());
    setDriverName(bus.driverName);
    setRouteName(bus.routeName);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBus) return;
    updateBus(selectedBus.id, {
      registrationNumber: regNum,
      model,
      capacity: Number(capacity),
      driverName,
      routeName
    });
    setIsEditModalOpen(false);
    if (selectedBus) {
      setSelectedBus({
        ...selectedBus,
        registrationNumber: regNum,
        model,
        capacity: Number(capacity),
        driverName,
        routeName
      });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNum) return;
    addBus({
      registrationNumber: regNum,
      model,
      capacity: Number(capacity),
      currentPassengers: 0,
      status: 'active',
      routeId: 'route-1',
      routeName,
      driverId: 'drv-1',
      driverName,
      speedKmH: 0,
      fuelLevelPercent: 100,
      lastServiceDate: new Date().toISOString().split('T')[0],
      nextServiceDue: '2026-10-01',
      lat: 11.0168,
      lng: 76.9558,
      depotLocation: 'Central Depot'
    });
    setIsAddModalOpen(false);
    setRegNum('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sticky Header Filter & Search Bar */}
      <div className="sticky top-16 bg-background/95 dark:bg-slate-950/95 backdrop-blur-md z-20 pt-2 pb-4 flex flex-col gap-3 transition-colors">
        {/* Search Input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400 text-[22px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search buses by plate, route, or driver name..."
            className="w-full pl-12 pr-4 py-3 bg-surface-container dark:bg-slate-900 rounded-full text-body-md text-on-surface dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-indigo-500/30 transition-all shadow-sm border border-transparent dark:border-slate-800"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-label-md font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all' 
                ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-sm' 
                : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
            }`}
          >
            All Buses ({buses.length})
          </button>

          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-full text-label-md font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'active' 
                ? 'bg-success text-on-success shadow-sm' 
                : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
            }`}
          >
            Active ({buses.filter(b => b.status === 'active').length})
          </button>

          <button
            onClick={() => setActiveFilter('idle')}
            className={`px-4 py-2 rounded-full text-label-md font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'idle' 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
            }`}
          >
            Idle ({buses.filter(b => b.status === 'idle').length})
          </button>

          <button
            onClick={() => setActiveFilter('maintenance')}
            className={`px-4 py-2 rounded-full text-label-md font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'maintenance' 
                ? 'bg-error text-on-error shadow-sm' 
                : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
            }`}
          >
            Maintenance ({buses.filter(b => b.status === 'maintenance').length})
          </button>
        </div>
      </div>

      {/* Bus Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBuses.map((bus) => {
          let accentBg = 'bg-success';
          if (bus.status === 'maintenance') accentBg = 'bg-error';
          if (bus.status === 'idle') accentBg = 'bg-amber-500';

          return (
            <div
              key={bus.id}
              onClick={() => setSelectedBus(bus)}
              className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card relative overflow-hidden border border-surface-container/60 dark:border-slate-800 hover:shadow-xl transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              {/* Status Color Strip */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${accentBg}`}></div>

              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-on-surface dark:text-slate-100 tracking-tight group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">
                      {bus.registrationNumber}
                    </h3>
                    <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px]">alt_route</span>
                      {bus.routeName}
                    </p>
                  </div>
                  <StatusBadge status={bus.status} type="bus" />
                </div>

                <div className="h-px w-full bg-surface-container dark:bg-slate-800 my-3"></div>

                {/* Driver & Telematics */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider block mb-1">Assigned Driver</span>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                        {bus.driverName.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-on-surface dark:text-slate-200 truncate">{bus.driverName}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider block mb-1">Telematics Speed</span>
                    <span className="font-bold text-on-surface dark:text-slate-100">{bus.speedKmH} km/h</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-4 pt-3 border-t border-surface-container/40 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant dark:text-slate-400 font-medium">Cap: {bus.capacity} seats</span>
                
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleOpenEdit(bus)}
                    className="p-1.5 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-indigo-400 transition-colors"
                    title="Edit Bus"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => deleteBus(bus.id)}
                    className="p-1.5 rounded-full hover:bg-error-container/40 dark:hover:bg-rose-950/40 text-on-surface-variant dark:text-slate-400 hover:text-error dark:hover:text-rose-400 transition-colors"
                    title="Delete Bus"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBuses.length === 0 && (
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-12 text-center flex flex-col items-center justify-center border border-surface-container dark:border-slate-800">
          <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-500 mb-2">directions_bus</span>
          <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">No buses found</h3>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-sm mt-1 mb-4">Try adjusting your search query or status filter.</p>
          <button
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold text-sm hover:bg-primary/20 transition-colors"
          >
            Clear Filters & Search
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-primary dark:bg-indigo-600 text-on-primary rounded-full flex items-center justify-center shadow-stitch-float hover:scale-105 active:scale-95 transition-transform z-40 group"
        title="Add Bus"
        aria-label="Add Bus"
      >
        <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-300">add</span>
      </button>

      {/* Bus Detail Drawer */}
      <Drawer
        isOpen={selectedBus !== null}
        onClose={() => setSelectedBus(null)}
        title={selectedBus?.registrationNumber || 'Bus Telematics'}
        subtitle={selectedBus?.model}
      >
        {selectedBus && (
          <div className="flex flex-col gap-6">
            {/* Status & Change Action */}
            <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-slate-800 flex items-center justify-between">
              <div>
                <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider block mb-1">Current Telematics Status</span>
                <StatusBadge status={selectedBus.status} type="bus" />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    changeBusStatus(selectedBus.id, 'active');
                    setSelectedBus({ ...selectedBus, status: 'active' });
                  }}
                  className="px-3 py-1.5 rounded-full bg-success/10 text-success dark:text-emerald-400 font-bold text-label-sm hover:bg-success/20"
                >
                  Set Active
                </button>
                <button
                  onClick={() => {
                    changeBusStatus(selectedBus.id, 'maintenance');
                    setSelectedBus({ ...selectedBus, status: 'maintenance' });
                  }}
                  className="px-3 py-1.5 rounded-full bg-error/10 text-error dark:text-rose-400 font-bold text-label-sm hover:bg-error/20"
                >
                  Set Mnt
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-surface-container-low dark:bg-slate-800">
                <span className="text-label-sm text-outline dark:text-slate-400 uppercase">Live Passengers</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">{selectedBus.currentPassengers} / {selectedBus.capacity}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low dark:bg-slate-800">
                <span className="text-label-sm text-outline dark:text-slate-400 uppercase">Fuel Level</span>
                <p className="text-2xl font-bold text-primary dark:text-indigo-400 mt-1">{selectedBus.fuelLevelPercent}%</p>
              </div>
            </div>

            {/* Route & Driver */}
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-on-surface dark:text-slate-100 text-base">Assignment & Operational Details</h4>
              <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Assigned Route</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200">{selectedBus.routeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Primary Driver</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200">{selectedBus.driverName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Depot Bay Location</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200">{selectedBus.depotLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Next Service Due</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200">{selectedBus.nextServiceDue}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
              <button
                onClick={() => handleOpenEdit(selectedBus)}
                className="flex-1 py-3 rounded-full bg-primary dark:bg-indigo-600 text-on-primary font-bold text-label-md hover:bg-primary/90 transition-colors"
              >
                Edit Specification
              </button>
              <button
                onClick={() => {
                  deleteBus(selectedBus.id);
                  setSelectedBus(null);
                }}
                className="px-4 py-3 rounded-full bg-error-container dark:bg-rose-950/60 text-on-error-container dark:text-rose-300 font-bold text-label-md hover:bg-error-container/80 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Bus Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Bus To Fleet"
      >
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Registration Plate *</label>
            <input
              type="text"
              required
              placeholder="e.g. TN 38 BZ 8888"
              value={regNum}
              onChange={(e) => setRegNum(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Passenger Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Assigned Driver</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 focus:ring-2 focus:ring-primary/20 outline-none"
            />
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
              Add Bus
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Bus Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Bus Information"
      >
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Registration Plate</label>
            <input
              type="text"
              required
              value={regNum}
              onChange={(e) => setRegNum(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Driver Name</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-semibold text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary dark:bg-indigo-600 hover:bg-primary/90 dark:hover:bg-indigo-500 text-on-primary font-bold text-label-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
