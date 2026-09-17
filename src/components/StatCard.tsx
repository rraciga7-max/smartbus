import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  iconName: string;
  badgeText?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'error';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  iconName,
  badgeText,
  variant = 'primary',
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          cardBg: 'bg-error-container text-on-error-container',
          circleBg: 'bg-error/10',
          iconBg: 'bg-error/20',
          iconColor: 'text-error',
          badgeStyle: 'text-error bg-error/20',
          borderStyle: 'border-error/20',
          valueColor: 'text-on-error-container',
          titleColor: 'text-error font-medium',
        };
      case 'secondary':
        return {
          cardBg: 'bg-surface-container text-on-surface',
          circleBg: 'bg-secondary/5',
          iconBg: 'bg-secondary/10',
          iconColor: 'text-secondary',
          badgeStyle: 'text-secondary bg-secondary/10',
          borderStyle: 'border-surface-variant',
          valueColor: 'text-on-surface',
          titleColor: 'text-on-surface-variant',
        };
      case 'tertiary':
        return {
          cardBg: 'bg-surface-container text-on-surface',
          circleBg: 'bg-tertiary/5',
          iconBg: 'bg-tertiary/10',
          iconColor: 'text-tertiary',
          badgeStyle: 'text-tertiary bg-tertiary/10',
          borderStyle: 'border-surface-variant',
          valueColor: 'text-on-surface',
          titleColor: 'text-on-surface-variant',
        };
      case 'primary':
      default:
        return {
          cardBg: 'bg-surface-container text-on-surface',
          circleBg: 'bg-primary/5',
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          badgeStyle: 'text-primary bg-primary/10',
          borderStyle: 'border-surface-variant',
          valueColor: 'text-on-surface',
          titleColor: 'text-on-surface-variant',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      onClick={onClick}
      className={`${styles.cardBg} rounded-xl p-md flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all cursor-pointer min-h-[140px]`}
    >
      <div className={`absolute -right-4 -top-4 w-16 h-16 ${styles.circleBg} rounded-full group-hover:scale-150 transition-transform duration-500`} />
      <div className="flex items-start justify-between mb-sm relative z-10">
        <div className={`w-9 h-9 rounded-full ${styles.iconBg} flex items-center justify-center`}>
          <span className={`material-symbols-outlined ${styles.iconColor} text-[20px]`}>{iconName}</span>
        </div>
        {badgeText && (
          <span className={`font-label-sm text-label-sm ${styles.badgeStyle} px-2 py-0.5 rounded-full font-bold uppercase tracking-wider`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className={`relative z-10 mt-auto pt-sm border-t ${styles.borderStyle}`}>
        <div className={`font-display-lg text-display-lg ${styles.valueColor} mb-xs font-bold leading-none`}>
          {value}
        </div>
        <div className={`font-label-md text-label-md ${styles.titleColor}`}>{title}</div>
      </div>
    </div>
  );
};
