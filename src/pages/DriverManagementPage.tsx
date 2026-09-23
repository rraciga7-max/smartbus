import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import type { Driver } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Drawer } from '../components/common/Drawer';
import { Modal } from '../components/common/Modal';
import { MobileFilterSheet } from '../components/common/MobileFilterSheet';
import { PageHeader } from '../components/common/PageHeader';

export const DriverManagementPage: React.FC = () => {
  const { drivers, addDriver, updateDriver, deleteDriver } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'on_duty' | 'off_duty' | 'on_break' | 'on_leave'>('all');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Driver Form State
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');
  const [assignedRouteName, setAssignedRouteName] = useState('Route 21A: Gandhipuram ➔ Singanallur');

  const filteredDrivers = useMemo(() => {
    return drivers.filter(d => {
      const matchesStatus = activeStatusFilter === 'all' || d.status === activeStatusFilter;
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.assignedRouteName && d.assignedRouteName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (d.phone && d.phone.includes(searchQuery));
      return matchesStatus && matchesSearch;
    });
  }, [drivers, searchQuery, activeStatusFilter]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !licenseNumber) return;
    addDriver({
      name,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      licenseNumber,
      licenseExpiry: '2029-06-30',
      experienceYears: Number(experienceYears),
      safetyScore: 95,
      phone,
      status: 'on_duty',
      assignedRouteName,
      totalTripsCompleted: 10,
      qualifications: ['Heavy Passenger Vehicle', 'First Aid Certified']
    });
    setIsAddModalOpen(false);
    setName('');
    setLicenseNumber('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDriver) return;
    updateDriver(selectedDriver.id, {
      name,
      licenseNumber,
      phone,
      experienceYears: Number(experienceYears),
      assignedRouteName
    });
    setIsEditModalOpen(false);
  };

  const openEditModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setName(driver.name);
    setLicenseNumber(driver.licenseNumber);
    setPhone(driver.phone);
    setExperienceYears(driver.experienceYears.toString());
    setAssignedRouteName(driver.assignedRouteName || '');
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Standard Mobile Page Header */}
      <PageHeader
        title="Driver Roster & Qualifications"
        description="Manage fleet personnel, license validation, assigned vehicles, and safety performance."
        primaryAction={{
          label: 'Register Driver',
          icon: 'person_add',
          onClick: () => {
            setName('');
            setLicenseNumber('');
            setPhone('');
            setIsAddModalOpen(true);
          }
        }}
        search={{
          value: searchQuery,
          onChange: setSearchQuery,
          placeholder: 'Search drivers by name, license, or route...',
          onClear: () => setSearchQuery('')
        }}
        filter={{
          label: 'Filters',
          activeCount: activeStatusFilter !== 'all' ? 1 : 0,
          onClick: () => setIsFilterSheetOpen(true)
        }}
      >
        {/* Desktop Quick Status Filters */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {(['all', 'on_duty', 'off_duty', 'on_break', 'on_leave'] as const).map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveStatusFilter(status)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] ${
                activeStatusFilter === status
                  ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
              }`}
            >
              {status === 'all' && `All (${drivers.length})`}
              {status === 'on_duty' && `On Duty (${drivers.filter(d => d.status === 'on_duty').length})`}
              {status === 'off_duty' && `Off Duty (${drivers.filter(d => d.status === 'off_duty').length})`}
              {status === 'on_break' && `On Break (${drivers.filter(d => d.status === 'on_break').length})`}
              {status === 'on_leave' && `On Leave (${drivers.filter(d => d.status === 'on_leave').length})`}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Mobile Filter Sheet */}
      <MobileFilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        onReset={() => setActiveStatusFilter('all')}
        activeFilterCount={activeStatusFilter !== 'all' ? 1 : 0}
        title="Filter Drivers"
      >
        <div className="space-y-3">
          <label className="text-xs font-bold text-outline dark:text-slate-400 uppercase tracking-wider block">
            Duty Status
          </label>
          <div className="flex flex-col gap-2">
            {[
              { id: 'all', label: `All Drivers (${drivers.length})` },
              { id: 'on_duty', label: `On Duty (${drivers.filter(d => d.status === 'on_duty').length})` },
              { id: 'off_duty', label: `Off Duty (${drivers.filter(d => d.status === 'off_duty').length})` },
              { id: 'on_break', label: `On Break (${drivers.filter(d => d.status === 'on_break').length})` },
              { id: 'on_leave', label: `On Leave (${drivers.filter(d => d.status === 'on_leave').length})` },
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setActiveStatusFilter(opt.id as any);
                  setIsFilterSheetOpen(false);
                }}
                className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-colors ${
                  activeStatusFilter === opt.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200'
                }`}
              >
                <span>{opt.label}</span>
                {activeStatusFilter === opt.id && (
                  <span className="material-symbols-outlined text-[18px]">check</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </MobileFilterSheet>

      {/* Driver List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            onClick={() => setSelectedDriver(driver)}
            className="card-responsive bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 group min-w-0"
          >
            <div className="min-w-0">
              {/* Profile Top Info */}
              <div className="flex items-start justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-primary/10 dark:border-indigo-400/20 shadow-sm flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors truncate">
                      {driver.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 font-mono truncate">{driver.licenseNumber}</p>
                    <div className="mt-1">
                      <StatusBadge status={driver.status} type="driver" />
                    </div>
                  </div>
                </div>

                {/* Safety Score Meter */}
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[10px] text-outline dark:text-slate-400 uppercase font-semibold">Safety</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 filled">star</span>
                    <span className="font-extrabold text-base sm:text-lg text-on-surface dark:text-slate-100">{driver.safetyScore}%</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-surface-container dark:bg-slate-800 my-3"></div>

              {/* Assignment & Qualifications */}
              <div className="flex flex-col gap-2 text-xs min-w-0">
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="text-outline dark:text-slate-400 flex-shrink-0">Assigned Route</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200 truncate text-right">{driver.assignedRouteName || 'Unassigned'}</span>
                </div>
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="text-outline dark:text-slate-400 flex-shrink-0">Assigned Bus</span>
                  <span className="font-semibold text-primary dark:text-indigo-400 truncate text-right">{driver.assignedBusPlate || 'Depot Reserve'}</span>
                </div>
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="text-outline dark:text-slate-400 flex-shrink-0">Phone</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200 truncate text-right">{driver.phone}</span>
                </div>
                <div className="flex justify-between items-center gap-2 min-w-0">
                  <span className="text-outline dark:text-slate-400 flex-shrink-0">Experience</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200 text-right">{driver.experienceYears} Years</span>
                </div>
              </div>

              {/* Qualification Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {driver.qualifications.slice(0, 2).map((q, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 text-[11px] font-semibold truncate max-w-full">
                    {q}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-3 border-t border-surface-container dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs min-w-0" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setSelectedDriver(driver)}
                className="px-3 py-1.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 font-semibold text-xs hover:bg-surface-container-high transition-colors flex items-center gap-1 min-h-[36px]"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                <span>View</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(driver)}
                  className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary dark:text-indigo-400 font-semibold text-xs hover:bg-primary/20 transition-colors flex items-center gap-1 min-h-[36px]"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteDriver(driver.id)}
                  className="p-2 rounded-xl text-on-surface-variant dark:text-slate-400 hover:bg-error/10 hover:text-error transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                  title="Delete driver"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-12 text-center flex flex-col items-center justify-center border border-surface-container dark:border-slate-800">
          <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-500 mb-2">badge</span>
          <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">No drivers found</h3>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-sm mt-1 mb-4">Try adjusting your search query.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-5 py-2.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold text-sm hover:bg-primary/20 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Driver Detail Drawer */}
      <Drawer
        isOpen={selectedDriver !== null}
        onClose={() => setSelectedDriver(null)}
        title={selectedDriver?.name || 'Driver Profile'}
        subtitle={selectedDriver?.licenseNumber}
      >
        {selectedDriver && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low dark:bg-slate-800">
              <img
                src={selectedDriver.avatar}
                alt={selectedDriver.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 dark:border-indigo-400/30"
              />
              <div>
                <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">{selectedDriver.name}</h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 font-mono">{selectedDriver.phone}</p>
                <div className="mt-1">
                  <StatusBadge status={selectedDriver.status} type="driver" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-slate-800 text-center">
                <span className="text-xs text-outline dark:text-slate-400 uppercase font-semibold">Safety Index</span>
                <p className="text-3xl font-extrabold text-primary dark:text-indigo-400 mt-1">{selectedDriver.safetyScore}%</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-slate-800 text-center">
                <span className="text-xs text-outline dark:text-slate-400 uppercase font-semibold">Trips Logged</span>
                <p className="text-3xl font-extrabold text-on-surface dark:text-slate-100 mt-1">{selectedDriver.totalTripsCompleted}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 flex flex-col gap-3 text-sm">
              <h4 className="font-bold text-on-surface dark:text-slate-100">License & Credentials</h4>
              <div className="flex justify-between">
                <span className="text-outline dark:text-slate-400">License Number</span>
                <span className="font-mono text-on-surface dark:text-slate-200">{selectedDriver.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline dark:text-slate-400">Expiry Date</span>
                <span className="font-semibold text-on-surface dark:text-slate-200">{selectedDriver.licenseExpiry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline dark:text-slate-400">Driving Experience</span>
                <span className="font-semibold text-on-surface dark:text-slate-200">{selectedDriver.experienceYears} Years</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-on-surface dark:text-slate-100 text-sm mb-2">Certifications & Training</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDriver.qualifications.map((q, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 text-xs font-bold">
                    ✓ {q}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
              <button
                onClick={() => {
                  openEditModal(selectedDriver);
                }}
                className="flex-1 py-3 rounded-full bg-primary dark:bg-indigo-600 text-on-primary font-bold text-label-md hover:bg-primary/90"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  deleteDriver(selectedDriver.id);
                  setSelectedDriver(null);
                }}
                className="px-4 py-3 rounded-full bg-error-container dark:bg-rose-950/60 text-on-error-container dark:text-rose-300 font-bold text-label-md hover:bg-error-container/80"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Driver Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Driver to Roster"
      >
        <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh V."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">License Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. TN-38-2020-0019284"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Phone Contact</label>
              <input
                type="text"
                placeholder="+91 98421 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Experience (Years)</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Assigned Route Line</label>
            <input
              type="text"
              value={assignedRouteName}
              onChange={(e) => setAssignedRouteName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
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
              Save Driver
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Driver Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Driver Profile"
      >
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">License Number</label>
            <input
              type="text"
              required
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Experience (Yrs)</label>
              <input
                type="number"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
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
