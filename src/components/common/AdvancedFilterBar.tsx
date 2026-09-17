import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

interface FilterState {
  status: string;
  route: string;
  depot: string;
  priority: string;
  dateRange: string;
}

interface AdvancedFilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  statusOptions?: string[];
  priorityOptions?: string[];
}

export const AdvancedFilterBar: React.FC<AdvancedFilterBarProps> = ({ onFilterChange, statusOptions, priorityOptions }) => {
  const { routes, depots } = useData();
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    route: 'all',
    depot: 'all',
    priority: 'all',
    dateRange: 'today'
  });

  const [savedFilters, setSavedFilters] = useState<string[]>(['Morning Peak Hours', 'High Maintenance Risk']);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectChange = (key: keyof FilterState, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const reset = { status: 'all', route: 'all', depot: 'all', priority: 'all', dateRange: 'today' };
    setFilters(reset);
    onFilterChange(reset);
  };

  const handleSaveFilter = () => {
    const name = prompt('Enter a name for this filter preset:');
    if (name) {
      setSavedFilters(prev => [...prev, name]);
    }
  };

  return (
    <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-4 border border-surface-container dark:border-slate-800 shadow-stitch-sm mb-6 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary dark:text-indigo-400 text-[20px]">tune</span>
          <span className="font-bold text-sm text-on-surface dark:text-slate-100">Advanced Fleet Filters</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-indigo-400 font-semibold">
            Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold text-primary dark:text-indigo-400 flex items-center gap-1 hover:underline"
          >
            <span>{isExpanded ? 'Collapse Filters' : 'Expand All Filters'}</span>
            <span className="material-symbols-outlined text-[16px]">{isExpanded ? 'expand_less' : 'expand_more'}</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-xs font-semibold text-on-surface-variant dark:text-slate-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Primary Filter Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
        {/* Status Filter */}
        <div>
          <label className="block text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-surface-container dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-xs font-semibold text-on-surface dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Statuses</option>
            {statusOptions ? (
              statusOptions.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)
            ) : (
              <>
                <option value="active">Active / In Transit</option>
                <option value="idle">Idle</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="emergency">Emergency Alert</option>
              </>
            )}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-1">
            Priority Level
          </label>
          <select
            value={filters.priority}
            onChange={(e) => handleSelectChange('priority', e.target.value)}
            className="w-full px-3 py-2 bg-surface-container dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-xs font-semibold text-on-surface dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Priorities</option>
            {priorityOptions ? (
              priorityOptions.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)
            ) : (
              <>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </>
            )}
          </select>
        </div>

        {/* Route Filter */}
        <div>
          <label className="block text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-1">
            Route Line
          </label>
          <select
            value={filters.route}
            onChange={(e) => handleSelectChange('route', e.target.value)}
            className="w-full px-3 py-2 bg-surface-container dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-xs font-semibold text-on-surface dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Routes</option>
            {routes.map(r => (
              <option key={r.id} value={r.code}>Route {r.code} — {r.name}</option>
            ))}
          </select>
        </div>

        {/* Depot Filter */}
        <div>
          <label className="block text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-1">
            Depot Hub
          </label>
          <select
            value={filters.depot}
            onChange={(e) => handleSelectChange('depot', e.target.value)}
            className="w-full px-3 py-2 bg-surface-container dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-xs font-semibold text-on-surface dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Depots</option>
            {depots.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-[11px] font-bold text-outline dark:text-slate-400 uppercase tracking-wider mb-1">
            Time Window
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleSelectChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 bg-surface-container dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-xl text-xs font-semibold text-on-surface dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="today">Today (Realtime)</option>
            <option value="yesterday">Yesterday</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Expanded Filters & Preset Actions */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-surface-container/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-outline dark:text-slate-400">Saved Presets:</span>
            {savedFilters.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => alert(`Preset "${preset}" applied!`)}
                className="px-2.5 py-1 rounded-lg bg-surface-container dark:bg-slate-800 text-[11px] font-semibold text-on-surface dark:text-slate-300 hover:bg-primary hover:text-on-primary transition-colors"
              >
                ⭐ {preset}
              </button>
            ))}
          </div>

          <button
            onClick={handleSaveFilter}
            className="px-3 py-1 bg-primary/10 text-primary dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors"
          >
            + Save Current Filter
          </button>
        </div>
      )}
    </div>
  );
};
