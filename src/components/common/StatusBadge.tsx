import React from 'react';
import type { BusStatus, DriverStatus, TripStatus, MaintenancePriority, MaintenanceStatus } from '../../types';

interface StatusBadgeProps {
  status: BusStatus | DriverStatus | TripStatus | MaintenancePriority | MaintenanceStatus | string;
  type?: 'bus' | 'driver' | 'trip' | 'priority' | 'maintenance' | 'generic';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'generic' }) => {
  const normalized = status.toLowerCase();

  let bgColor = 'bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-300';
  let dotColor = 'bg-outline dark:bg-slate-400';
  let label = status;
  let icon: string | null = null;

  if (type === 'bus' || normalized === 'active' || normalized === 'on_duty' || normalized === 'completed' || normalized === 'in_transit') {
    if (normalized === 'active' || normalized === 'on_duty') {
      bgColor = 'bg-success-container/70 dark:bg-emerald-950/60 text-[#065F46] dark:text-emerald-300';
      dotColor = 'bg-success animate-pulse';
      label = 'Active';
    } else if (normalized === 'idle' || normalized === 'on_break') {
      bgColor = 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300';
      dotColor = 'bg-amber-500';
      label = normalized === 'idle' ? 'Idle' : 'On Break';
      icon = 'local_parking';
    } else if (normalized === 'maintenance' || normalized === 'suspended') {
      bgColor = 'bg-error-container dark:bg-rose-950/60 text-on-error-container dark:text-rose-300';
      dotColor = 'bg-error';
      label = 'Maintenance';
      icon = 'build';
    } else if (normalized === 'out_of_service' || normalized === 'off_duty') {
      bgColor = 'bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-400';
      dotColor = 'bg-outline dark:bg-slate-500';
      label = 'Off Duty';
    }
  }

  if (type === 'trip') {
    if (normalized === 'in_transit') {
      bgColor = 'bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400';
      dotColor = 'bg-primary dark:bg-indigo-400 animate-ping';
      label = 'In Transit';
    } else if (normalized === 'scheduled') {
      bgColor = 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300';
      dotColor = 'bg-sky-500';
      label = 'Scheduled';
    } else if (normalized === 'completed') {
      bgColor = 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300';
      dotColor = 'bg-emerald-600';
      label = 'Completed';
    } else if (normalized === 'delayed') {
      bgColor = 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300';
      dotColor = 'bg-amber-600';
      label = 'Delayed';
    }
  }

  if (type === 'priority') {
    if (normalized === 'critical' || normalized === 'high') {
      bgColor = 'bg-error/10 dark:bg-rose-950/60 text-error dark:text-rose-400 font-bold';
      label = normalized.toUpperCase();
    } else if (normalized === 'medium') {
      bgColor = 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold';
      label = 'MEDIUM';
    } else {
      bgColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
      label = 'LOW';
    }
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-label-sm font-semibold tracking-wider ${bgColor}`}>
        {label}
      </span>
    );
  }

  return (
    <div className={`px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 ${bgColor}`}>
      {icon ? (
        <span className="material-symbols-outlined text-[14px]">{icon}</span>
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      )}
      <span className="text-label-sm uppercase tracking-wider font-semibold">{label}</span>
    </div>
  );
};
