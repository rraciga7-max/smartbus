import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import type { MaintenancePriority } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';

export const MaintenancePage: React.FC = () => {
  const { maintenanceRecords, addMaintenanceRecord, updateMaintenanceStatus, buses } = useData();
  const [activePriorityFilter, setActivePriorityFilter] = useState<'all' | MaintenancePriority>('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // Form state
  const [busId, setBusId] = useState('bus-1');
  const [serviceType, setServiceType] = useState('Routine Engine Oil Change');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<MaintenancePriority>('medium');
  const [dueDate, setDueDate] = useState('2026-09-10');
  const [estimatedCost, setEstimatedCost] = useState('5000');
  const [technicianName, setTechnicianName] = useState('Karthik S. (Master Tech)');

  const filteredRecords = maintenanceRecords.filter(r => 
    activePriorityFilter === 'all' || r.priority === activePriorityFilter
  );

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bus = buses.find(b => b.id === busId) || buses[0];
    addMaintenanceRecord({
      busId,
      busRegistration: bus.registrationNumber,
      busModel: bus.model,
      serviceType,
      description: description || 'Scheduled routine fleet maintenance inspection.',
      priority,
      status: 'scheduled',
      dueDate,
      estimatedCost: Number(estimatedCost),
      technicianName
    });
    setIsScheduleModalOpen(false);
    setDescription('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-1">
          <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider">Critical Tasks</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-error dark:text-rose-400">
              {maintenanceRecords.filter(r => r.priority === 'high' || r.priority === 'critical').length}
            </span>
            <span className="text-xs font-bold text-error dark:text-rose-400 flex items-center">
              <span className="material-symbols-outlined text-[14px]">warning</span> Action Req.
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-1">
          <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider">Scheduled (7d)</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-on-surface dark:text-slate-100">{maintenanceRecords.length}</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-1">
          <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider">In Progress</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400">
            {maintenanceRecords.filter(r => r.status === 'in_progress').length}
          </span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-1">
          <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider">Est. Cost (Total)</span>
          <span className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-indigo-400">
            ₹{maintenanceRecords.reduce((sum, r) => sum + r.estimatedCost, 0).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Maintenance Action Orders</h2>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {(['all', 'high', 'medium', 'low'] as const).map(p => (
              <button
                key={p}
                onClick={() => setActivePriorityFilter(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-colors ${
                  activePriorityFilter === p
                    ? 'bg-primary dark:bg-indigo-600 text-on-primary'
                    : 'bg-surface-container dark:bg-slate-900 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-primary dark:bg-indigo-600 text-on-primary font-bold text-label-md hover:bg-primary/90 dark:hover:bg-indigo-500 transition-colors shadow-md flex items-center gap-2 flex-shrink-0 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">build</span>
            Schedule Service
          </button>
        </div>
      </div>

      {/* Maintenance Cards List */}
      <div className="flex flex-col gap-4">
        {filteredRecords.map((record) => {
          let stripBg = 'bg-error';
          if (record.priority === 'medium') stripBg = 'bg-amber-500';
          if (record.priority === 'low') stripBg = 'bg-slate-400';

          return (
            <div
              key={record.id}
              className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 relative overflow-hidden flex flex-col gap-4 group hover:shadow-lg transition-all"
            >
              {/* Vertical Priority Strip */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${stripBg}`}></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-on-surface dark:text-slate-100">{record.busRegistration}</span>
                    <StatusBadge status={record.priority} type="priority" />
                    <span className="text-xs text-on-surface-variant dark:text-slate-400 font-medium">• {record.busModel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-outline dark:text-slate-400 font-semibold">Due: <strong className="text-error dark:text-rose-400">{record.dueDate}</strong></span>
                  <span className="px-3 py-1 rounded-full bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 text-xs font-bold capitalize">
                    {record.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-surface-container/80 dark:bg-slate-800"></div>

              {/* Service Description */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-outline dark:text-slate-400 uppercase font-semibold tracking-wider">Required Service Work</span>
                <div className="flex items-center gap-2 text-primary dark:text-indigo-400 font-bold text-base">
                  <span className="material-symbols-outlined text-[20px]">build_circle</span>
                  {record.serviceType}
                </div>
                <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs mt-1">{record.description}</p>
              </div>

              {/* Technician & Action */}
              <div className="pt-3 border-t border-surface-container/40 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-outline dark:text-slate-400">engineering</span>
                  <span className="font-semibold text-on-surface dark:text-slate-200">{record.technicianName}</span>
                  <span className="text-outline dark:text-slate-400">• Est. ₹{record.estimatedCost}</span>
                </div>

                <div className="flex gap-2">
                  {record.status === 'scheduled' && (
                    <button
                      onClick={() => updateMaintenanceStatus(record.id, 'in_progress')}
                      className="px-3 py-1.5 rounded-full bg-amber-500 text-white font-bold text-xs"
                    >
                      Start Service
                    </button>
                  )}
                  {record.status === 'in_progress' && (
                    <button
                      onClick={() => updateMaintenanceStatus(record.id, 'completed')}
                      className="px-3 py-1.5 rounded-full bg-success dark:bg-emerald-600 text-on-success font-bold text-xs"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecords.length === 0 && (
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-12 text-center flex flex-col items-center justify-center border border-surface-container dark:border-slate-800">
          <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-500 mb-2">build</span>
          <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">No maintenance tasks found</h3>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-sm mt-1 mb-4">No service orders match the selected priority filter.</p>
          <button
            onClick={() => setActivePriorityFilter('all')}
            className="px-5 py-2.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold text-sm hover:bg-primary/20 transition-colors"
          >
            Show All Service Orders
          </button>
        </div>
      )}

      {/* Schedule Service Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Fleet Maintenance"
      >
        <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Select Bus *</label>
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            >
              {buses.map(b => (
                <option key={b.id} value={b.id}>
                  {b.registrationNumber} ({b.model})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Service Type Title *</label>
            <input
              type="text"
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical Urgent</option>
              </select>
            </div>

            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Target Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Estimated Cost (₹)</label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Assigned Technician</label>
              <input
                type="text"
                value={technicianName}
                onChange={(e) => setTechnicianName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Issue Description & Notes</label>
            <textarea
              rows={3}
              placeholder="Provide details about symptoms or parts to replace..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-semibold text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary dark:bg-indigo-600 hover:bg-primary/90 dark:hover:bg-indigo-500 text-on-primary font-bold text-label-md"
            >
              Confirm Work Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
