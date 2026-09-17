import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const VehicleInspectionPage: React.FC = () => {
  const { buses, drivers, inspectionReports, addInspectionReport } = useData();

  const [selectedBusId, setSelectedBusId] = useState(buses[0]?.id || '');
  const [selectedDriverId, setSelectedDriverId] = useState(drivers[0]?.id || '');

  const [items, setItems] = useState<Array<{ id: string; name: string; category: string; status: 'pass' | 'warning' | 'fail'; isCritical: boolean }>>([
    { id: 'i-1', name: 'Brake System & Hydraulic Fluids', category: 'Safety', status: 'pass', isCritical: true },
    { id: 'i-2', name: 'Tyre Pressure & Tread Depth', category: 'Wheels', status: 'pass', isCritical: true },
    { id: 'i-3', name: 'Headlights & Turn Signal Indicators', category: 'Electrical', status: 'pass', isCritical: false },
    { id: 'i-4', name: 'Engine Oil & Coolant Level', category: 'Engine', status: 'pass', isCritical: true },
    { id: 'i-5', name: 'Emergency Exits & Glass Hammers', category: 'Safety', status: 'pass', isCritical: true },
    { id: 'i-6', name: 'Fire Extinguisher Pressure Charge', category: 'Safety', status: 'pass', isCritical: true },
    { id: 'i-7', name: 'First Aid Kit Completeness', category: 'Safety', status: 'pass', isCritical: false },
    { id: 'i-8', name: 'GPS Telematics & Speed Governor', category: 'Electronics', status: 'pass', isCritical: true },
    { id: 'i-9', name: 'Automatic Doors & Pneumatic Seal', category: 'Doors', status: 'pass', isCritical: false },
    { id: 'i-10', name: 'Cabin AC System & Air Filters', category: 'Comfort', status: 'pass', isCritical: false }
  ]);

  const hasCriticalFail = items.some(i => i.isCritical && i.status === 'fail');

  const handleStatusChange = (id: string, status: 'pass' | 'warning' | 'fail') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const handleSubmitInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const bus = buses.find(b => b.id === selectedBusId);
    const driver = drivers.find(d => d.id === selectedDriverId);
    if (!bus || !driver) return;

    addInspectionReport({
      busId: bus.id,
      busRegistration: bus.registrationNumber,
      driverId: driver.id,
      driverName: driver.name,
      timestamp: new Date().toLocaleString(),
      overallStatus: hasCriticalFail ? 'unsafe' : 'safe',
      items
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Daily Pre-Trip Vehicle Inspection</h2>
        <p className="text-xs text-outline dark:text-slate-400">Driver & Technician 10-Point Safety Audit Checklist</p>
      </div>

      {/* Critical Failure Warning Banner */}
      {hasCriticalFail && (
        <div className="p-5 rounded-2xl bg-error text-on-error shadow-2xl flex items-center justify-between border-2 border-error animate-pulse">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl">block</span>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">VEHICLE UNSAFE — DO NOT DISPATCH</h3>
              <p className="text-xs opacity-90">One or more critical safety items failed. Vehicle will be automatically locked out from dispatch.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-surface text-on-surface font-extrabold text-xs rounded-xl">
            STATUS: LOCKOUT
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Form: Checklist Selection */}
        <form onSubmit={handleSubmitInspection} className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Select Bus Plate</label>
              <select
                value={selectedBusId}
                onChange={(e) => setSelectedBusId(e.target.value)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              >
                {buses.map(b => (
                  <option key={b.id} value={b.id}>{b.registrationNumber} ({b.model})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Inspecting Driver / Tech</label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              >
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.licenseNumber})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="flex flex-col gap-3 pt-2">
            <span className="font-bold text-xs text-on-surface dark:text-slate-200 border-b border-surface-container dark:border-slate-800 pb-2">
              10-Point Safety Audit Checklist
            </span>
            {items.map(item => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  {item.isCritical && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 uppercase">Critical</span>
                  )}
                  <span className="font-bold text-xs text-on-surface dark:text-slate-100">{item.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(['pass', 'warning', 'fail'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(item.id, st)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold uppercase transition-all ${
                        item.status === st
                          ? st === 'pass' ? 'bg-emerald-600 text-white shadow-md' :
                            st === 'warning' ? 'bg-amber-500 text-white shadow-md' : 'bg-rose-600 text-white shadow-md'
                          : 'bg-surface-container dark:bg-slate-800 text-outline dark:text-slate-400 hover:text-on-surface'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-lg hover:bg-primary/90 mt-2"
          >
            Submit Inspection Report & Update Bus Status
          </button>
        </form>

        {/* Right Summary Sidebar */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
          <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3">
            Recent Inspection Log History
          </h3>

          <div className="flex flex-col gap-3">
            {inspectionReports.map(rep => (
              <div key={rep.id} className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface dark:text-slate-100">{rep.busRegistration}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                    rep.overallStatus === 'safe' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {rep.overallStatus.toUpperCase()}
                  </span>
                </div>
                <p className="text-[11px] text-outline dark:text-slate-400">Driver: {rep.driverName} • {rep.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
