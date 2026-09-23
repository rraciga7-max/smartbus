import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, updatePreferences, changePassword, terminateSession, terminateAllOtherSessions, openLogoutModal } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useData();

  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');

  // Personal Info Form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [company, setCompany] = useState(user?.company || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Password Change Form
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  if (!user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, company, avatar });
    showToast('Personal information updated successfully', 'success');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass) {
      setPassMsg('Please enter your current password');
      return;
    }
    if (newPass.length < 6) {
      setPassMsg('New password must be at least 6 characters');
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg('New passwords do not match');
      return;
    }

    setPassMsg('');
    await changePassword(currentPass, newPass);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    showToast('Account password changed successfully', 'success');
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 min-w-0">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 rounded-[24px] sm:rounded-[28px] shadow-sm min-w-0">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-primary/30 shadow-md flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-extrabold text-on-surface dark:text-slate-100 truncate">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-indigo-400 text-xs font-bold uppercase">
                {user.role}
              </span>
              <span className="text-xs text-outline dark:text-slate-400 truncate">• {user.company}</span>
            </div>
          </div>
        </div>

        <button
          onClick={openLogoutModal}
          className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-2xl bg-error/10 text-error hover:bg-error hover:text-on-error font-bold text-xs transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-surface-container dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'profile'
              ? 'bg-primary text-on-primary shadow-md'
              : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800'
          }`}
        >
          Personal Information
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'preferences'
              ? 'bg-primary text-on-primary shadow-md'
              : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800'
          }`}
        >
          Preferences
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 ${
            activeTab === 'security'
              ? 'bg-primary text-on-primary shadow-md'
              : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800'
          }`}
        >
          Security & Active Sessions
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6 max-w-3xl">
          <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Personal Information</h3>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface dark:text-slate-200">Profile Photo URL</label>
            <input
              type="text"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface dark:text-slate-200">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface dark:text-slate-200">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface dark:text-slate-200">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface dark:text-slate-200">Company / Transit Authority</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800/60 flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-400">
            <span>Account Created: <strong>{user.createdAt}</strong></span>
            <span>Assigned Role: <strong>{user.role}</strong></span>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-primary text-on-primary font-extrabold text-xs shadow-md hover:bg-primary/90 transition-all"
          >
            Save Personal Changes
          </button>
        </form>
      )}

      {activeTab === 'preferences' && (
        <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6 max-w-3xl">
          <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Application Preferences</h3>

          {/* Theme Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-on-surface dark:text-slate-200">System Theme Mode</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 ${
                  theme === 'light'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container dark:bg-slate-800 border-transparent text-on-surface-variant dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">light_mode</span>
                <span>Light Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container dark:bg-slate-800 border-transparent text-on-surface-variant dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">dark_mode</span>
                <span>Dark Mode</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 ${
                  theme === 'system'
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-surface-container dark:bg-slate-800 border-transparent text-on-surface-variant dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">desktop_windows</span>
                <span>System Default</span>
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4 pt-4 border-t border-surface-container dark:border-slate-800">
            <h4 className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">Alert Notifications</h4>
            
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-on-surface dark:text-slate-100">Platform In-App Notifications</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400">Receive real-time alerts for delay anomalies and dispatch changes</p>
              </div>
              <input
                type="checkbox"
                checked={user.preferences.notifications}
                onChange={e => updatePreferences({ notifications: e.target.checked })}
                className="w-5 h-5 accent-primary"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-on-surface dark:text-slate-100">Emergency SMS Escalations</span>
                <p className="text-[11px] text-on-surface-variant dark:text-slate-400">Send high-priority SMS messages when a driver triggers SOS button</p>
              </div>
              <input
                type="checkbox"
                checked={user.preferences.smsAlerts}
                onChange={e => updatePreferences({ smsAlerts: e.target.checked })}
                className="w-5 h-5 accent-primary"
              />
            </label>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-8 max-w-3xl">
          {/* CHANGE PASSWORD */}
          <form onSubmit={handleChangePassword} className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Change Password</h3>

            {passMsg && (
              <div className="p-3 rounded-2xl bg-error/10 text-error text-xs font-semibold">
                {passMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface dark:text-slate-200">Current Password</label>
              <input
                type="password"
                value={currentPass}
                onChange={e => setCurrentPass(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface dark:text-slate-200">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none text-on-surface dark:text-slate-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary/90 transition-all"
            >
              Update Password
            </button>
          </form>

          {/* ACTIVE SESSIONS */}
          <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">Active Login Sessions</h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">Devices currently authorized to access your account</p>
              </div>

              <button
                onClick={() => {
                  terminateAllOtherSessions();
                  showToast('Terminated all other active sessions', 'info');
                }}
                className="px-4 py-2 rounded-xl bg-error/10 text-error hover:bg-error hover:text-on-error text-xs font-bold transition-all"
              >
                Logout From All Other Devices
              </button>
            </div>

            <div className="space-y-3">
              {user.activeSessions.map((session) => (
                <div key={session.id} className="p-4 rounded-2xl bg-surface-container/50 dark:bg-slate-800/60 border border-surface-container dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[24px]">
                      {session.device.includes('Mac') || session.device.includes('Chrome') ? 'desktop_windows' : 'smartphone'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-on-surface dark:text-slate-100">{session.device}</span>
                        {session.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                            Current Session
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-outline dark:text-slate-400 mt-0.5">
                        {session.location} • IP: {session.ip} • {session.lastActive}
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <button
                      onClick={() => {
                        terminateSession(session.id);
                        showToast(`Terminated session ${session.id}`, 'info');
                      }}
                      className="text-xs text-error font-semibold hover:underline"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
