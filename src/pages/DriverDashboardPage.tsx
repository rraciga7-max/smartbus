import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDrivers } from '../data/mockData';

export const DriverDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const driver = mockDrivers[0]; // M. Suresh
  const [tripStatus, setTripStatus] = useState<'not_started' | 'in_transit' | 'completed'>('not_started');
  const [passengerCount, setPassengerCount] = useState(24);

  const handleTripToggle = () => {
    if (tripStatus === 'not_started') {
      setTripStatus('in_transit');
    } else if (tripStatus === 'in_transit') {
      setTripStatus('completed');
    } else {
      setTripStatus('not_started');
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-24 md:pb-12">
      <div className="flex flex-col w-full gap-md px-margin-mobile md:px-margin-desktop pt-md max-w-4xl mx-auto">
        {/* Header / Driver Info Card from Stitch */}
        <div className="bg-surface-container rounded-2xl p-4 shadow-sm flex items-center justify-between border border-surface-variant">
          <div className="flex items-center gap-3">
            <img
              alt="Driver Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-surface shadow-sm"
              src={driver.avatar}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {driver.name}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">directions_bus</span>
                {driver.assignedBusNumber}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-surface-variant">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                tripStatus === 'in_transit'
                  ? 'bg-[#10B981] animate-pulse'
                  : tripStatus === 'completed'
                  ? 'bg-primary'
                  : 'bg-secondary'
              }`}
            />
            <span className="font-label-md text-label-md text-on-surface font-semibold capitalize">
              {tripStatus === 'in_transit' ? 'In Transit' : tripStatus === 'completed' ? 'Completed' : 'Not Started'}
            </span>
          </div>
        </div>

        {/* Route Info Card from Stitch */}
        <div className="bg-surface-container rounded-2xl p-5 shadow-sm flex flex-col gap-sm relative overflow-hidden border border-surface-variant">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
          <div className="flex flex-col gap-1 z-10">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Current Route
            </span>
            <div className="flex items-center gap-2">
              <span className="font-title-lg text-title-lg font-bold text-on-surface">Gandhipuram</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                arrow_right_alt
              </span>
              <span className="font-title-lg text-title-lg font-bold text-on-surface">Singanallur</span>
            </div>
          </div>

          <div className="h-px w-full bg-outline-variant/30 my-1 z-10" />

          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Next Stop</span>
              <span className="font-body-lg text-body-lg font-bold text-on-surface">Peelamedu</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid from Stitch */}
        <div className="grid grid-cols-2 gap-md">
          {/* Passenger Count Stat */}
          <div className="bg-surface-container rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2 relative overflow-hidden border border-surface-variant">
            <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-1 shadow-xs">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                groups
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPassengerCount(Math.max(0, passengerCount - 1))}
                className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-bold text-xs flex items-center justify-center"
              >
                -
              </button>
              <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
                {passengerCount}
              </span>
              <button
                onClick={() => setPassengerCount(passengerCount + 1)}
                className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface font-bold text-xs flex items-center justify-center"
              >
                +
              </button>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Boarded Passengers
            </span>
          </div>

          {/* Fuel Level Stat */}
          <div className="bg-surface-container rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2 border border-surface-variant">
            <div className="relative w-12 h-12 flex items-center justify-center mb-1">
              <svg className="w-14 h-14 absolute transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container-high"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-primary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="75, 100"
                  strokeWidth="3"
                />
              </svg>
              <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_gas_station
              </span>
            </div>
            <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
              75<span className="text-title-lg">%</span>
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Fuel Level</span>
          </div>
        </div>

        {/* Main Action Button from Stitch */}
        <button
          onClick={handleTripToggle}
          className={`w-full text-on-primary rounded-2xl py-5 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] font-bold text-title-lg ${
            tripStatus === 'in_transit'
              ? 'bg-[#10B981] hover:bg-[#059669]'
              : tripStatus === 'completed'
              ? 'bg-secondary hover:bg-secondary/90'
              : 'bg-primary hover:bg-primary-container'
          }`}
        >
          <span className="material-symbols-outlined text-[28px]">
            {tripStatus === 'in_transit' ? 'pause_circle' : tripStatus === 'completed' ? 'restart_alt' : 'play_circle'}
          </span>
          <span>
            {tripStatus === 'in_transit'
              ? 'Pause / In Transit'
              : tripStatus === 'completed'
              ? 'Reset Trip'
              : 'Start Trip'}
          </span>
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-md">
          <button
            onClick={() => navigate('/maintenance')}
            className="bg-surface-container hover:bg-surface-container-high transition-colors rounded-xl py-3.5 flex flex-col items-center justify-center gap-1 border border-outline-variant/30 text-on-surface font-semibold"
          >
            <span className="material-symbols-outlined text-on-surface-variant">report_problem</span>
            <span className="font-label-md text-label-md">Report Issue</span>
          </button>

          <button
            onClick={() => setTripStatus('completed')}
            disabled={tripStatus === 'not_started'}
            className={`rounded-xl py-3.5 flex flex-col items-center justify-center gap-1 border border-outline-variant/30 font-semibold transition-all ${
              tripStatus !== 'not_started'
                ? 'bg-surface-container text-error hover:bg-error-container/40'
                : 'bg-surface-container text-on-surface-variant opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined">stop_circle</span>
            <span className="font-label-md text-label-md">End Shift</span>
          </button>
        </div>
      </div>
    </div>
  );
};
