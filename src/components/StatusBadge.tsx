import React from 'react';
import type { BusStatus } from '../types';


interface StatusBadgeProps {
  status: BusStatus | 'On Time' | 'Delayed' | 'Completed' | 'HIGH' | 'MEDIUM' | 'LOW';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'active':
      return (
        <div className={`bg-[#10B981]/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 ${className}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-label-sm text-[#10B981] font-bold uppercase tracking-wider">Active</span>
        </div>
      );
    case 'idle':
      return (
        <div className={`bg-[#F59E0B]/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 ${className}`}>
          <span className="material-symbols-outlined text-[14px] text-[#F59E0B]">local_parking</span>
          <span className="text-label-sm text-[#F59E0B] font-bold uppercase tracking-wider">Idle</span>
        </div>
      );
    case 'maintenance':
      return (
        <div className={`bg-error-container px-2.5 py-1 rounded-full flex items-center gap-1.5 ${className}`}>
          <span className="material-symbols-outlined text-[14px] text-on-error-container">build</span>
          <span className="text-label-sm text-on-error-container font-bold uppercase tracking-wider">Maintenance</span>
        </div>
      );
    case 'HIGH':
      return (
        <span className={`px-2 py-0.5 rounded-full bg-error/10 text-error text-label-sm font-bold tracking-wider ${className}`}>
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className={`px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#D97706] text-label-sm font-bold tracking-wider ${className}`}>
          MEDIUM
        </span>
      );
    case 'LOW':
      return (
        <span className={`px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm font-bold tracking-wider ${className}`}>
          LOW
        </span>
      );
    case 'On Time':
      return (
        <div className={`bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-label-sm text-primary font-bold tracking-wide">ON TIME</span>
        </div>
      );
    default:
      return (
        <span className={`px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-medium ${className}`}>
          {status}
        </span>
      );
  }
};
