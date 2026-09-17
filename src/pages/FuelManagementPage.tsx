import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Modal } from '../components/common/Modal';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const FuelManagementPage: React.FC = () => {
  const { fuelRecords, addFuelRecord, buses, showToast } = useData();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  // Form state
  const [busId, setBusId] = useState('bus-1');
  const [litres, setLitres] = useState('110');
  const [cost, setCost] = useState('10450');
  const [odometerKm, setOdometerKm] = useState('143200');
  const [fuelType, setFuelType] = useState<'Diesel' | 'Electric' | 'CNG'>('Diesel');
  const [stationName, setStationName] = useState('IOCL Fuel Station - Gandhipuram');

  const totalFuelSpend = fuelRecords.reduce((sum, f) => sum + f.cost, 0);
  const avgMileage = (fuelRecords.reduce((sum, f) => sum + f.mileageKmpl, 0) / fuelRecords.length).toFixed(1);

  const chartData = fuelRecords.map(f => ({
    bus: f.busRegistration.split(' ').pop(),
    cost: f.cost,
    litres: f.litres
  }));

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bus = buses.find(b => b.id === busId) || buses[0];
    addFuelRecord({
      busId,
      busRegistration: bus.registrationNumber,
      date: new Date().toISOString().split('T')[0],
      litres: Number(litres),
      cost: Number(cost),
      odometerKm: Number(odometerKm),
      mileageKmpl: 4.8,
      fuelType,
      stationName
    });
    setIsLogModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Fuel Intelligence & Energy Spend</h2>
          <p className="text-xs text-outline dark:text-slate-400">Consumption analytics, efficiency ranking, and telemetry anomaly detection</p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-primary dark:bg-indigo-600 text-on-primary font-bold text-xs hover:bg-primary/90 transition-colors shadow-md flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">local_gas_station</span>
          Log Fuel Entry
        </button>
      </div>

      {/* AI Anomaly Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex flex-wrap items-center justify-between gap-3 shadow-stitch-sm">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-2xl">error_med</span>
          <div>
            <span className="font-bold text-xs uppercase tracking-wider">FUEL ANOMALY DETECTED — BUS TN 58 AB 1024</span>
            <p className="text-xs mt-0.5">Fuel usage is 19% higher than expected. Possible causes: High idling in RS Puram traffic, ECU calibration issue.</p>
          </div>
        </div>
        <button
          onClick={() => showToast('Investigation order dispatched for Bus TN 58 AB 1024 to Peelamedu workshop.')}
          className="px-3.5 py-1.5 bg-amber-500 text-white font-bold text-xs rounded-xl shadow hover:bg-amber-600 transition-colors"
        >
          Investigate Anomaly
        </button>
      </div>

      {/* Top Banner KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800">
          <span className="text-[11px] text-outline dark:text-slate-400 uppercase font-bold">Total Spend</span>
          <p className="text-2xl font-extrabold text-primary dark:text-indigo-400 mt-1">₹{totalFuelSpend.toLocaleString()}</p>
          <span className="text-xs text-outline dark:text-slate-400 mt-1 block">Logged across {fuelRecords.length} sessions</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800">
          <span className="text-[11px] text-outline dark:text-slate-400 uppercase font-bold">Avg Fleet Mileage</span>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{avgMileage} km/L</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">+0.3 km/L vs target</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800">
          <span className="text-[11px] text-outline dark:text-slate-400 uppercase font-bold">Total Litres Consumed</span>
          <p className="text-2xl font-extrabold text-on-surface dark:text-slate-100 mt-1">
            {fuelRecords.reduce((sum, f) => sum + f.litres, 0)} L
          </p>
          <span className="text-xs text-outline dark:text-slate-400 mt-1 block">100% verified fuel cards</span>
        </div>

        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800">
          <span className="text-[11px] text-outline dark:text-slate-400 uppercase font-bold">EV Charging Units</span>
          <p className="text-2xl font-extrabold text-indigo-500 mt-1">180 kWh</p>
          <span className="text-xs text-outline dark:text-slate-400 mt-1 block">Tata Starbus EV Fleet</span>
        </div>
      </div>

      {/* Fuel Consumption Chart */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4">
        <h3 className="text-base font-bold text-on-surface dark:text-slate-100">Fuel & Energy Spend Per Vehicle</h3>

        <div className="h-56 sm:h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="bus" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', color: '#fff', border: '1px solid #334155' }}
              />
              <Bar dataKey="cost" fill="#818cf8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fuel Log Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4">
        <h3 className="text-base font-bold text-on-surface dark:text-slate-100">Fueling Log & Telemetry Verification</h3>

        <div className="w-full overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-surface-container text-outline text-xs uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Bus Plate</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Fuel Type</th>
                <th className="py-3 px-4">Litres / Units</th>
                <th className="py-3 px-4">Cost (₹)</th>
                <th className="py-3 px-4">Efficiency</th>
                <th className="py-3 px-4">Station</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60 text-xs">
              {fuelRecords.map((f) => (
                <tr key={f.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">{f.busRegistration}</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-400">{f.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-indigo-400 font-bold text-[11px]">
                      {f.fuelType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{f.litres} L</td>
                  <td className="py-3.5 px-4 font-extrabold text-on-surface dark:text-slate-100">₹{f.cost.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{f.mileageKmpl} km/L</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-400">{f.stationName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Fuel Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title="Log Fuel or Charging Entry">
        <form onSubmit={handleLogSubmit} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="font-bold text-on-surface dark:text-slate-200 block mb-1">Select Bus</label>
            <select
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-transparent outline-none"
            >
              {buses.map(b => (
                <option key={b.id} value={b.id}>{b.registrationNumber} ({b.model})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-on-surface dark:text-slate-200 block mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-transparent outline-none"
              >
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-on-surface dark:text-slate-200 block mb-1">Litres / kWh</label>
              <input
                type="number"
                value={litres}
                onChange={(e) => setLitres(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-on-surface dark:text-slate-200 block mb-1">Total Cost (₹)</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-transparent outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-on-surface dark:text-slate-200 block mb-1">Odometer (KM)</label>
              <input
                type="number"
                value={odometerKm}
                onChange={(e) => setOdometerKm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-on-surface dark:text-slate-200 block mb-1">Fuel Station Name</label>
            <input
              type="text"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-transparent outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsLogModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold shadow"
            >
              Save Refill Log
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
