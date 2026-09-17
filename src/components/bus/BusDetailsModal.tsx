import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

interface BusDetailsModalProps {
  busId: string | null;
  onClose: () => void;
}

export const BusDetailsModal: React.FC<BusDetailsModalProps> = ({ busId, onClose }) => {
  const { buses, trips, maintenanceRecords, fuelRecords, incidents, showToast } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'tracking' | 'performance' | 'maintenance' | 'fuel' | 'documents' | 'trips' | 'incidents'>('overview');

  if (!busId) return null;
  const bus = buses.find(b => b.id === busId);
  if (!bus) return null;

  const busTrips = trips.filter(t => t.busNumber === bus.registrationNumber || t.busId === bus.id);
  const busMaintenance = maintenanceRecords.filter(m => m.busRegistration === bus.registrationNumber || m.busId === bus.id);
  const busFuel = fuelRecords.filter(f => f.busRegistration === bus.registrationNumber || f.busId === bus.id);
  const busIncidents = incidents.filter(i => i.busRegistration === bus.registrationNumber || i.busId === bus.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-surface-container/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/40 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-xl shadow-stitch-float">
              <span className="material-symbols-outlined text-[28px]">directions_bus</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">{bus.registrationNumber}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                  bus.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  bus.status === 'maintenance' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                  bus.status === 'emergency' ? 'bg-error/10 text-error' : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {bus.status}
                </span>
              </div>
              <p className="text-xs text-outline dark:text-slate-400 mt-0.5">{bus.model} • Depot: {bus.depotLocation}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider font-bold text-outline dark:text-slate-400">Health Score</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{bus.healthScore || 94}%</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-surface-container/60 dark:border-slate-800 overflow-x-auto no-scrollbar bg-surface-container-lowest dark:bg-slate-900">
          {[
            { id: 'overview', label: 'Overview', icon: 'dashboard' },
            { id: 'tracking', label: 'Live Tracking', icon: 'near_me' },
            { id: 'performance', label: 'Performance', icon: 'monitoring' },
            { id: 'maintenance', label: 'Maintenance', icon: 'build' },
            { id: 'fuel', label: 'Fuel Log', icon: 'local_gas_station' },
            { id: 'documents', label: 'Documents', icon: 'description' },
            { id: 'trips', label: 'Trips', icon: 'departure_board' },
            { id: 'incidents', label: 'Incidents', icon: 'report_problem' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Seating Capacity</span>
                  <p className="text-xl font-bold text-on-surface dark:text-slate-100 mt-1">{bus.capacity} Seats</p>
                  <span className="text-[11px] text-primary dark:text-indigo-400 font-semibold">{bus.currentPassengers} Boarded</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Odometer Mileage</span>
                  <p className="text-xl font-bold text-on-surface dark:text-slate-100 mt-1">{(bus.mileageKm || 142850).toLocaleString()} km</p>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Service Verified</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Fuel / Charge Level</span>
                  <p className="text-xl font-bold text-on-surface dark:text-slate-100 mt-1">{bus.fuelLevelPercent}%</p>
                  <div className="w-full h-1.5 bg-surface-container-high dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${bus.fuelLevelPercent}%` }}></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                  <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">GPS Status</span>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 capitalize">{bus.gpsStatus || 'Connected'}</p>
                  <span className="text-[11px] text-outline dark:text-slate-400">Updated 10s ago</span>
                </div>
              </div>

              {/* Component Health Diagnostics */}
              <div className="p-5 rounded-2xl border border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900">
                <h3 className="font-bold text-sm text-on-surface dark:text-slate-100 mb-4">Telemetry Health Score Diagnostics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-on-surface dark:text-slate-300">Engine & Powertrain</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{bus.engineHealthPercent || 92}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${bus.engineHealthPercent || 92}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-on-surface dark:text-slate-300">Hydraulic Brake Pads</span>
                      <span className="text-amber-500">{bus.brakeHealthPercent || 88}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${bus.brakeHealthPercent || 88}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-on-surface dark:text-slate-300">Tyre Tread & Pressure</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{bus.tyreHealthPercent || 95}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${bus.tyreHealthPercent || 95}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-on-surface dark:text-slate-300">24V Auxiliary Battery</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{bus.batteryLevelPercent || 98}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${bus.batteryLevelPercent || 98}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tracking' && (
            <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 text-center py-12">
              <span className="material-symbols-outlined text-5xl text-primary dark:text-indigo-400 mb-2">near_me</span>
              <h4 className="font-bold text-base text-on-surface dark:text-slate-100">Live GPS Coordinates</h4>
              <p className="text-xs text-outline dark:text-slate-400 mt-1">Latitude: {bus.lat} • Longitude: {bus.lng}</p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">Current Speed: {bus.speedKmH} km/h on {bus.routeName}</p>
              <button
                onClick={() => {
                  onClose();
                  showToast(`Tracking ${bus.registrationNumber} on live map.`);
                }}
                className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-xs shadow-md"
              >
                Track Vehicle On Main Map ➔
              </button>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Trips Completed</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">1,420 Trips</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Average Occupancy</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">84%</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Fuel Mileage</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">4.6 km/L</p>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Vehicle Registration (RC)', docNo: `RC-${bus.registrationNumber.replace(/\s/g, '')}`, expiry: '2030-10-15', status: 'valid' },
                { title: 'Comprehensive Insurance', docNo: 'INS-ICICI-991823', expiry: '2027-04-20', status: 'valid' },
                { title: 'Vehicle Fitness Certificate', docNo: 'FC-TN38-2025-901', expiry: '2026-10-01', status: 'valid' },
                { title: 'Pollution Under Control (PUC)', docNo: 'PUC-2026-8812', expiry: '2026-09-05', status: 'expiring_soon' }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-on-surface dark:text-slate-100">{doc.title}</span>
                    <p className="text-xs text-outline dark:text-slate-400">{doc.docNo} • Expires: {doc.expiry}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${doc.status === 'valid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="flex flex-col gap-2">
              {busTrips.length === 0 ? (
                <p className="text-xs text-outline dark:text-slate-400 text-center py-6">No recent trip records found for this bus.</p>
              ) : (
                busTrips.map(t => (
                  <div key={t.id} className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-on-surface dark:text-slate-100">{t.id} — Route {t.routeCode}</span>
                      <p className="text-outline dark:text-slate-400">{t.departureTime} ➔ {t.arrivalTime} • Driver: {t.driverName}</p>
                    </div>
                    <span className="font-bold text-primary dark:text-indigo-400 capitalize">{t.status}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="flex flex-col gap-2">
              {busMaintenance.length === 0 ? (
                <p className="text-xs text-outline dark:text-slate-400 text-center py-6">No active maintenance work orders for this bus.</p>
              ) : (
                busMaintenance.map(m => (
                  <div key={m.id} className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-on-surface dark:text-slate-100">{m.serviceType}</span>
                      <p className="text-xs text-outline dark:text-slate-400">{m.description}</p>
                      <p className="text-xs font-semibold text-primary dark:text-indigo-400 mt-1">Tech: {m.technicianName} • Est: ₹{m.estimatedCost.toLocaleString()}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 capitalize">
                      {m.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'fuel' && (
            <div className="flex flex-col gap-2">
              {busFuel.length === 0 ? (
                <p className="text-xs text-outline dark:text-slate-400 text-center py-6">No fuel records logged for this bus.</p>
              ) : (
                busFuel.map(f => (
                  <div key={f.id} className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-on-surface dark:text-slate-100">{f.date} — {f.litres} Litres ({f.fuelType})</span>
                      <p className="text-outline dark:text-slate-400">{f.stationName} • Odometer: {f.odometerKm.toLocaleString()} km</p>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{f.cost.toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="flex flex-col gap-2">
              {busIncidents.length === 0 ? (
                <p className="text-xs text-outline dark:text-slate-400 text-center py-6">No previous safety incidents reported for this vehicle.</p>
              ) : (
                busIncidents.map(inc => (
                  <div key={inc.id} className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-rose-500 uppercase">{inc.type.replace('_', ' ')} Incident (#{inc.id})</span>
                      <p className="text-outline dark:text-slate-400">{inc.timestamp} • Location: {inc.location}</p>
                    </div>
                    <span className="font-bold text-amber-500 uppercase">{inc.status}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
