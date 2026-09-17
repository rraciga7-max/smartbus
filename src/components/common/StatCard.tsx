import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: string;
  colorVariant?: 'primary' | 'secondary' | 'error' | 'success' | 'surface';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon,
  colorVariant = 'surface',
  onClick
}) => {
  let iconBg = 'bg-primary/10 text-primary dark:bg-indigo-500/20 dark:text-indigo-400';
  let valueColor = 'text-on-surface dark:text-slate-100';

  if (colorVariant === 'primary') {
    iconBg = 'bg-primary text-on-primary dark:bg-indigo-600 dark:text-white';
    valueColor = 'text-primary dark:text-indigo-400';
  } else if (colorVariant === 'error') {
    iconBg = 'bg-error-container text-on-error-container dark:bg-rose-950/60 dark:text-rose-300';
    valueColor = 'text-error dark:text-rose-400';
  } else if (colorVariant === 'success') {
    iconBg = 'bg-success-container text-[#065F46] dark:bg-emerald-950/60 dark:text-emerald-300';
    valueColor = 'text-success dark:text-emerald-400';
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 sm:p-5 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 hover:shadow-xl dark:hover:border-slate-700 transition-all duration-200 ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-label-sm text-outline dark:text-slate-400 uppercase tracking-wider font-medium">{title}</span>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${iconBg}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${valueColor}`}>{value}</span>
        {change && (
          <span className={`text-label-sm font-semibold flex items-center ${isPositive ? 'text-success dark:text-emerald-400' : 'text-error dark:text-rose-400'}`}>
            <span className="material-symbols-outlined text-[16px] mr-0.5">
              {isPositive ? 'arrow_upward' : 'arrow_downward'}
            </span>
            {change}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-body-md text-on-surface-variant/80 dark:text-slate-400 mt-1 text-xs sm:text-sm">{subtitle}</p>
      )}
    </div>
  );
};
