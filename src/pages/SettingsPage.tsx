import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useTheme, type Theme } from '../context/ThemeContext';
import { PageHeader } from '../components/common/PageHeader';

export const SettingsPage: React.FC = () => {
  const { showToast } = useData();
  const { theme, setTheme } = useTheme();

  const [depotName, setDepotName] = useState('Coimbatore Central Depot');
  const [gpsIntervalSecs, setGpsIntervalSecs] = useState('3');
  const [enableSoundAlerts, setEnableSoundAlerts] = useState(true);
  const [enableAutoSchedule, setEnableAutoSchedule] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('System configuration settings saved.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset local storage mock data back to defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl w-full min-w-0">
      <PageHeader
        title="Settings & System Config"
        badge="Enterprise Rules"
        subtitle="Manage telematics gateway parameters, theme rules, and depot preferences."
        breadcrumb="Administration"
      />

      <form onSubmit={handleSaveSettings} className="flex flex-col gap-6 min-w-0">
        {/* Theme Preferences */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-5 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Appearance & Theme Mode</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {[
              { id: 'light', label: 'Light Theme', icon: 'light_mode' },
              { id: 'dark', label: 'Dark Theme', icon: 'dark_mode' },
              { id: 'system', label: 'System Default', icon: 'desktop_windows' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id as Theme)}
                className={`p-3.5 sm:p-4 rounded-2xl border flex flex-row sm:flex-col items-center justify-center gap-2.5 transition-all min-h-[44px] ${
                  theme === t.id
                    ? 'bg-primary/10 dark:bg-indigo-500/20 border-primary dark:border-indigo-500 text-primary dark:text-indigo-400 font-bold shadow-sm'
                    : 'bg-surface-container-low dark:bg-slate-800/60 border-surface-container dark:border-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[22px] sm:text-[24px]">{t.icon}</span>
                <span className="text-xs font-semibold">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Depot & Hub Settings */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-5 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Depot & Headquarters Info</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Central Depot Name</label>
              <input
                type="text"
                value={depotName}
                onChange={(e) => setDepotName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Telematics Refresh Ping (Secs)</label>
              <input
                type="number"
                value={gpsIntervalSecs}
                onChange={(e) => setGpsIntervalSecs(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none min-h-[44px]"
              />
            </div>
          </div>
        </div>

        {/* System Rules & Toggles */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-5 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 flex flex-col gap-4 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-on-surface dark:text-slate-100">Automated Alert Rules</h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low dark:bg-slate-800/60 border border-transparent dark:border-slate-700/50 gap-3">
              <div className="min-w-0 flex-1">
                <span className="font-bold text-on-surface dark:text-slate-200 text-xs sm:text-sm block">Critical Maintenance Sound Notifications</span>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">Play audio ping when high priority brake or engine alerts occur</p>
              </div>
              <input
                type="checkbox"
                checked={enableSoundAlerts}
                onChange={(e) => setEnableSoundAlerts(e.target.checked)}
                className="w-5 h-5 accent-primary dark:accent-indigo-500 cursor-pointer flex-shrink-0"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low dark:bg-slate-800/60 border border-transparent dark:border-slate-700/50 gap-3">
              <div className="min-w-0 flex-1">
                <span className="font-bold text-on-surface dark:text-slate-200 text-xs sm:text-sm block">Automatic Schedule Dispatching</span>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 font-medium mt-0.5">Auto transition scheduled trips to In Transit at departure time</p>
              </div>
              <input
                type="checkbox"
                checked={enableAutoSchedule}
                onChange={(e) => setEnableAutoSchedule(e.target.checked)}
                className="w-5 h-5 accent-primary dark:accent-indigo-500 cursor-pointer flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-5 sm:p-6 shadow-stitch-card border border-error/30 dark:border-rose-900/50 flex flex-col gap-3 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-error dark:text-rose-400">Data Storage Options</h3>
          <p className="text-xs text-on-surface-variant dark:text-slate-400">Reset local state or purge cached fleet database mock entries.</p>
          
          <div>
            <button
              type="button"
              onClick={handleResetData}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-error-container dark:bg-rose-950/60 text-on-error-container dark:text-rose-300 font-bold text-xs sm:text-sm hover:bg-error-container/80 transition-colors min-h-[44px]"
            >
              Reset Mock Data To Defaults
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary dark:bg-indigo-600 text-on-primary font-bold text-sm hover:bg-primary/90 dark:hover:bg-indigo-500 transition-colors shadow-md active:scale-95 min-h-[44px]"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
