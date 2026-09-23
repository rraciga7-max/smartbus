import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const DemandForecastingPage: React.FC = () => {
  const { addTrip, showToast } = useData();
  const [forecastHorizon, setForecastHorizon] = useState<'tomorrow' | '7days' | '30days'>('tomorrow');

  const forecasts = [
    {
      id: 'fc-1',
      routeCode: '21A',
      routeName: 'Gandhipuram ➔ Singanallur',
      timeSlot: '08:00 AM - 09:00 AM',
      insightText: 'Route 21A is expected to experience a 32% increase in passenger demand due to IT park morning shift schedule.',
      recommendation: 'Deploy +1 Additional EV Bus from Central Depot',
      confidencePercent: 94,
      expectedPassengers: 1250,
      currentCapacity: 950,
      capacityGap: 300,
      extraBusId: 'bus-3'
    },
    {
      id: 'fc-2',
      routeCode: '45B',
      routeName: 'Ukkadam ➔ Marudhamalai',
      timeSlot: '05:00 PM - 07:00 PM',
      insightText: 'Festival evening demand predicted for Marudhamalai Temple stop.',
      recommendation: 'Extend Route 45B frequency from 20 mins to 10 mins',
      confidencePercent: 89,
      expectedPassengers: 980,
      currentCapacity: 720,
      capacityGap: 260,
      extraBusId: 'bus-6'
    }
  ];

  const handleApplyRecommendation = (fc: typeof forecasts[0]) => {
    addTrip({
      routeCode: fc.routeCode,
      routeName: fc.routeName,
      busNumber: 'TN 38 CD 9012 (Extra Unit)',
      driverName: 'Arun Kumar',
      departureTime: '08:05 AM',
      arrivalTime: '08:48 AM',
      status: 'scheduled',
      passengerCount: 0,
      maxCapacity: 50,
      etaMins: 43,
      currentStop: 'Central Depot (Preparing)',
      progressPercent: 0
    });
    showToast(`Additional bus scheduled for ${fc.routeCode}! Capacity gap of ${fc.capacityGap} seats resolved.`, 'success');
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Demand Forecasting"
        badge="ML Ridership Predictor"
        subtitle="Machine learning capacity planning & ridership peak forecasting."
        breadcrumb="Intelligence"
      />

      {/* Horizon Picker */}
      <div className="flex items-center justify-between gap-3 bg-surface-container-lowest dark:bg-slate-900 p-3 rounded-2xl border border-surface-container/60 dark:border-slate-800">
        <span className="text-xs font-bold text-outline dark:text-slate-400 uppercase tracking-wider">Forecast Horizon</span>
        <div className="flex bg-surface-container dark:bg-slate-800 p-1 rounded-full text-xs font-bold">
          {(['tomorrow', '7days', '30days'] as const).map(h => (
            <button
              key={h}
              onClick={() => setForecastHorizon(h)}
              className={`px-3 py-1 rounded-full uppercase transition-all ${
                forecastHorizon === h ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant dark:text-slate-300'
              }`}
            >
              {h === 'tomorrow' ? 'Tomorrow' : h === '7days' ? '7 Days' : '30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* AI Insight Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        {forecasts.map(fc => (
          <div key={fc.id} className="p-4 sm:p-6 rounded-[28px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-surface-container dark:border-slate-800 pb-3 min-w-0">
              <div className="min-w-0 flex-1">
                <span className="font-mono text-xs font-bold text-primary dark:text-indigo-400 block truncate">ROUTE {fc.routeCode}</span>
                <h3 className="font-bold text-base text-on-surface dark:text-slate-100 truncate">{fc.routeName}</h3>
                <span className="text-xs font-semibold text-outline dark:text-slate-400 block truncate">{fc.timeSlot}</span>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-full border border-emerald-500/20 flex-shrink-0">
                {fc.confidencePercent}% Confidence
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container/50 dark:bg-slate-800/50 text-xs flex flex-col gap-1 min-w-0">
              <span className="font-bold text-outline dark:text-slate-400 uppercase text-[10px]">AI Predictive Insight</span>
              <p className="font-semibold text-on-surface dark:text-slate-200">{fc.insightText}</p>
            </div>

            {/* Capacity Gap Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs text-center min-w-0">
              <div className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800 min-w-0">
                <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Expected Demand</span>
                <p className="font-bold text-on-surface dark:text-slate-100 mt-1 truncate">{fc.expectedPassengers} Riders</p>
              </div>
              <div className="p-3 rounded-2xl bg-surface-container dark:bg-slate-800 min-w-0">
                <span className="text-[10px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Current Capacity</span>
                <p className="font-bold text-on-surface dark:text-slate-100 mt-1 truncate">{fc.currentCapacity} Seats</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 font-bold min-w-0">
                <span className="text-[10px] uppercase block truncate">Capacity Deficit</span>
                <p className="font-extrabold text-base mt-0.5 truncate">-{fc.capacityGap} Seats</p>
              </div>
            </div>

            <button
              onClick={() => handleApplyRecommendation(fc)}
              className="w-full py-3 px-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-center leading-snug"
            >
              <span className="material-symbols-outlined text-[18px] flex-shrink-0">add_task</span>
              <span>{fc.recommendation}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
