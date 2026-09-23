import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import type { NotificationCategory } from '../types';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useData();
  const [activeCategory, setActiveCategory] = useState<'all' | NotificationCategory>('all');

  const filteredNotifications = notifications.filter(n =>
    activeCategory === 'all' || n.category === activeCategory
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Fleet Notification Center</h2>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs">Real-time telematics alerts, maintenance warnings, and system logs</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllNotificationsAsRead}
            className="px-4 py-2 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-primary dark:text-indigo-400 font-bold text-label-md transition-colors"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['all', 'critical', 'maintenance', 'driver', 'trip', 'system'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-label-md font-semibold capitalize whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-primary dark:bg-indigo-600 text-on-primary shadow-sm'
                : 'bg-surface-container dark:bg-slate-900 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800 border border-transparent dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {filteredNotifications.map((n) => {
          let iconBg = 'bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400';
          if (n.category === 'maintenance' || n.category === 'critical') iconBg = 'bg-error-container dark:bg-rose-950/60 text-on-error-container dark:text-rose-300';
          if (n.category === 'driver') iconBg = 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300';

          return (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-4 sm:p-5 rounded-[24px] border transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 cursor-pointer min-w-0 ${
                n.read 
                  ? 'bg-surface-container-lowest dark:bg-slate-900 border-surface-container/60 dark:border-slate-800 opacity-80' 
                  : 'bg-surface-container-lowest dark:bg-slate-900 border-primary/30 dark:border-indigo-500/40 shadow-stitch-card ring-1 ring-primary/10 dark:ring-indigo-500/20'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px] leading-none">
                    {n.category === 'maintenance' ? 'build' : n.category === 'driver' ? 'badge' : 'notifications'}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <h3 className="font-bold text-on-surface dark:text-slate-100 text-sm sm:text-base">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2.5 h-2.5 bg-primary dark:bg-indigo-400 rounded-full flex-shrink-0"></span>
                    )}
                  </div>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-xs sm:text-sm mt-1">{n.message}</p>
                  <span className="text-[11px] text-outline dark:text-slate-500 font-semibold mt-2 block">{n.timestamp}</span>
                </div>
              </div>

              {/* Action Link & Delete */}
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-start pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container/40 dark:border-slate-800 w-full sm:w-auto justify-end" onClick={(e) => e.stopPropagation()}>
                {n.actionUrl && (
                  <button
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      navigate(n.actionUrl!);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 hover:bg-primary/20 text-primary dark:text-indigo-400 font-bold text-xs transition-colors min-h-[36px]"
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-1.5 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-outline dark:text-slate-400 hover:text-error dark:hover:text-rose-400 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                  title="Delete notification"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[24px] p-12 text-center flex flex-col items-center justify-center border border-surface-container dark:border-slate-800">
            <span className="material-symbols-outlined text-[48px] text-outline dark:text-slate-500 mb-2">notifications_off</span>
            <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">No notifications</h3>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 text-sm mt-1 mb-4">You are all caught up!</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-5 py-2.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary dark:text-indigo-400 font-bold text-sm hover:bg-primary/20 transition-colors"
            >
              Show All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
