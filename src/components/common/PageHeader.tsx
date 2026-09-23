import React from 'react';

export interface PageHeaderAction {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | string;
}

export interface PageHeaderSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export interface PageHeaderFilter {
  onClick: () => void;
  activeCount?: number;
  label?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  breadcrumb?: string;
  badge?: string;
  badgeColor?: string;
  primaryAction?: PageHeaderAction;
  secondaryAction?: PageHeaderAction;
  actions?: PageHeaderAction[];
  search?: PageHeaderSearch;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filter?: PageHeaderFilter;
  onFilterClick?: () => void;
  isFilterActive?: boolean;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  subtitle,
  breadcrumb,
  badge,
  badgeColor = 'bg-primary/10 text-primary dark:text-indigo-400',
  primaryAction,
  secondaryAction,
  actions,
  search,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  filter,
  onFilterClick,
  isFilterActive,
  children
}) => {
  const displayDesc = description || subtitle;

  // Resolve search object from explicit or shorthand
  const resolvedSearch: PageHeaderSearch | undefined = search || (
    searchValue !== undefined && onSearchChange ? {
      value: searchValue,
      onChange: onSearchChange,
      placeholder: searchPlaceholder || 'Search...',
      onClear: () => onSearchChange('')
    } : undefined
  );

  // Resolve filter object from explicit or shorthand
  const resolvedFilter: PageHeaderFilter | undefined = filter || (
    onFilterClick ? {
      onClick: onFilterClick,
      activeCount: isFilterActive ? 1 : 0
    } : undefined
  );

  // Resolve action buttons
  const allActions: PageHeaderAction[] = actions && actions.length > 0 ? actions : [
    ...(secondaryAction ? [secondaryAction] : []),
    ...(primaryAction ? [primaryAction] : [])
  ];

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-5 min-w-0 w-full">
      {/* Breadcrumb if provided */}
      {breadcrumb && (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider">
          <span>Platform</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary dark:text-indigo-400">{breadcrumb}</span>
        </div>
      )}

      {/* Top Row: Title, Description, Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex-shrink-0 ${badgeColor}`}>
                {badge}
              </span>
            )}
          </div>
          {displayDesc && (
            <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {displayDesc}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {allActions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
            {allActions.map((act, idx) => {
              const isOutline = act.variant === 'outline' || act.variant === 'secondary';
              const isDanger = act.variant === 'danger';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={act.onClick}
                  className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px] active:scale-95 ${
                    isDanger
                      ? 'bg-error text-on-error hover:bg-error/90'
                      : isOutline
                      ? 'bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-200 hover:bg-surface-container-high dark:hover:bg-slate-700 border border-surface-container-high dark:border-slate-700'
                      : 'bg-primary dark:bg-indigo-600 text-on-primary hover:bg-primary/90 dark:hover:bg-indigo-500 shadow-primary/20'
                  }`}
                >
                  {act.icon && (
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{act.icon}</span>
                  )}
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Optional Search and Filter Bar Row */}
      {(resolvedSearch || resolvedFilter) && (
        <div className="flex items-center gap-2 sm:gap-3 w-full min-w-0 pt-1">
          {resolvedSearch && (
            <div className="relative flex-1 min-w-0">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400 text-[20px] pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={resolvedSearch.value}
                onChange={(e) => resolvedSearch.onChange(e.target.value)}
                placeholder={resolvedSearch.placeholder || 'Search records...'}
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container-high dark:border-slate-800 text-xs sm:text-sm text-on-surface dark:text-slate-100 placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-indigo-500/40 transition-all shadow-sm min-h-[44px]"
              />
              {resolvedSearch.value && (
                <button
                  type="button"
                  onClick={resolvedSearch.onClear || (() => resolvedSearch.onChange(''))}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-outline hover:text-on-surface dark:hover:text-slate-200 transition-colors"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px] leading-none">close</span>
                </button>
              )}
            </div>
          )}

          {resolvedFilter && (
            <button
              type="button"
              onClick={resolvedFilter.onClick}
              className={`px-3.5 sm:px-4 py-2.5 rounded-2xl border font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 flex-shrink-0 min-h-[44px] transition-all ${
                resolvedFilter.activeCount && resolvedFilter.activeCount > 0
                  ? 'bg-primary/10 border-primary text-primary dark:text-indigo-400 font-extrabold'
                  : 'bg-surface-container-lowest dark:bg-slate-900 border-surface-container-high dark:border-slate-800 text-on-surface dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span className="hidden xs:inline">{resolvedFilter.label || 'Filters'}</span>
              {resolvedFilter.activeCount !== undefined && resolvedFilter.activeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                  {resolvedFilter.activeCount}
                </span>
              )}
            </button>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
