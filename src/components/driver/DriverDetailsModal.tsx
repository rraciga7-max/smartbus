import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

interface DriverDetailsModalProps {
  driverId: string | null;
  onClose: () => void;
}

export const DriverDetailsModal: React.FC<DriverDetailsModalProps> = ({ driverId, onClose }) => {
  const { drivers, trips } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'qualifications' | 'performance' | 'safety' | 'attendance' | 'trips' | 'documents'>('overview');

  if (!driverId) return null;
  const driver = drivers.find(d => d.id === driverId);
  if (!driver) return null;

  const driverTrips = trips.filter(t => t.driverName === driver.name || t.driverId === driver.id);
  const safety = driver.safetyMetrics || {
    overspeedEvents: 1,
    harshBrakingEvents: 2,
    harshAccelerationEvents: 0,
    harshCorneringEvents: 1,
    idleTimeHours: 4.2,
    incidentsCount: 0,
    complaintsCount: 0
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] shadow-2xl border border-surface-container dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Driver Profile Header */}
        <div className="p-6 border-b border-surface-container/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/40 dark:bg-slate-800/30">
          <div className="flex items-center gap-4">
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">{driver.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                  driver.status === 'on_duty' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  driver.status === 'on_break' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-slate-500/10 text-slate-400'
                }`}>
                  {driver.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-outline dark:text-slate-400 mt-0.5">Emp ID: {driver.id} • License: {driver.licenseNumber}</p>
              <p className="text-xs font-semibold text-primary dark:text-indigo-400 mt-0.5">Assigned Bus: {driver.assignedBusPlate || 'Unassigned'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider font-bold text-outline dark:text-slate-400">Safety Rating</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{driver.safetyScore}/100</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Driver Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-surface-container/60 dark:border-slate-800 overflow-x-auto no-scrollbar bg-surface-container-lowest dark:bg-slate-900">
          {[
            { id: 'overview', label: 'Overview', icon: 'person' },
            { id: 'qualifications', label: 'Qualifications', icon: 'school' },
            { id: 'performance', label: 'Performance', icon: 'military_tech' },
            { id: 'safety', label: 'Safety Telemetry', icon: 'security' },
            { id: 'attendance', label: 'Attendance', icon: 'event_available' },
            { id: 'trips', label: 'Trip Roster', icon: 'departure_board' },
            { id: 'documents', label: 'Documents & Expiry', icon: 'badge' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-3 px-3 border-b-2 text-xs font-bold whitespace-nowrap transition-colors ${
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

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 flex flex-col gap-2 text-xs">
                <span className="font-bold text-outline dark:text-slate-400 uppercase">Contact & Info</span>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Phone:</span>
                  <span className="font-semibold text-on-surface dark:text-slate-100">{driver.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Email:</span>
                  <span className="font-semibold text-on-surface dark:text-slate-100">{driver.email || 'driver@smartbus360.in'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Experience:</span>
                  <span className="font-semibold text-on-surface dark:text-slate-100">{driver.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Joined Date:</span>
                  <span className="font-semibold text-on-surface dark:text-slate-100">{driver.joiningDate || '2018-04-12'}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 flex flex-col gap-2 text-xs">
                <span className="font-bold text-outline dark:text-slate-400 uppercase">Assigned Duty</span>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Assigned Bus:</span>
                  <span className="font-bold text-primary dark:text-indigo-400">{driver.assignedBusPlate || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Assigned Route:</span>
                  <span className="font-semibold text-on-surface dark:text-slate-100">{driver.assignedRouteName || 'Route 21A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline dark:text-slate-400">Emergency Contact:</span>
                  <span className="font-semibold text-on-surface dark:text-slate-100">{driver.emergencyContact || '+91 98421 99000'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qualifications' && (
            <div className="flex flex-col gap-2">
              {driver.qualifications.map((q, i) => (
                <div key={i} className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-500">verified</span>
                  <span className="font-bold text-xs text-on-surface dark:text-slate-100">{q}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 text-center">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Total Trips</span>
                <p className="text-2xl font-bold text-on-surface dark:text-slate-100 mt-1">{driver.totalTripsCompleted}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 text-center">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">On-Time Rate</span>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{driver.onTimeRatePercent || 97.5}%</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 text-center">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Passenger Rating</span>
                <p className="text-2xl font-bold text-amber-500 mt-1">{driver.passengerRating || 4.8} / 5⭐</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 text-center">
                <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase">Safety Score</span>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{driver.safetyScore}</p>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400">Overspeed Events</span>
                <p className="text-xl font-bold text-amber-500 mt-1">{safety.overspeedEvents}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400">Harsh Braking</span>
                <p className="text-xl font-bold text-amber-500 mt-1">{safety.harshBrakingEvents}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400">Harsh Acceleration</span>
                <p className="text-xl font-bold text-emerald-500 mt-1">{safety.harshAccelerationEvents}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400">Harsh Cornering</span>
                <p className="text-xl font-bold text-emerald-500 mt-1">{safety.harshCorneringEvents}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400">Idle Fuel Time</span>
                <p className="text-xl font-bold text-on-surface dark:text-slate-100 mt-1">{safety.idleTimeHours} hrs</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800">
                <span className="text-xs font-bold text-outline dark:text-slate-400">Incidents Logged</span>
                <p className="text-xl font-bold text-emerald-500 mt-1">{safety.incidentsCount}</p>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span className="text-xs font-bold uppercase">Present Days</span>
                <p className="text-2xl font-bold mt-1">{driver.attendancePresent || 24} Days</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-600">
                <span className="text-xs font-bold uppercase">Absent</span>
                <p className="text-2xl font-bold mt-1">{driver.attendanceAbsent || 0} Days</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-600">
                <span className="text-xs font-bold uppercase">Approved Leave</span>
                <p className="text-2xl font-bold mt-1">{driver.attendanceLeave || 1} Day</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600">
                <span className="text-xs font-bold uppercase">Overtime</span>
                <p className="text-2xl font-bold mt-1">{driver.overtimeHours || 12} hrs</p>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="flex flex-col gap-2">
              {driverTrips.length === 0 ? (
                <p className="text-xs text-outline dark:text-slate-400 text-center py-6">No active trips assigned for this driver.</p>
              ) : (
                driverTrips.map(t => (
                  <div key={t.id} className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-on-surface dark:text-slate-100">{t.id} — Route {t.routeCode}</span>
                      <p className="text-outline dark:text-slate-400">Bus: {t.busNumber} • {t.departureTime} ➔ {t.arrivalTime}</p>
                    </div>
                    <span className="font-bold text-primary dark:text-indigo-400 capitalize">{t.status}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="flex flex-col gap-3">
              {(driver.documents || [
                { type: 'Driving License', documentNumber: driver.licenseNumber, issueDate: '2015-11-20', expiryDate: driver.licenseExpiry, status: 'valid' }
              ]).map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-surface-container dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-on-surface dark:text-slate-100">{doc.type}</span>
                    <p className="text-xs text-outline dark:text-slate-400">{doc.documentNumber} • Expiry: {doc.expiryDate}</p>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase ${
                    doc.status === 'valid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    {doc.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
