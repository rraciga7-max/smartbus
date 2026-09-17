import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { ToastContainer } from '../common/Toast';
import { LogoutConfirmModal } from '../common/LogoutConfirmModal';
import { SessionExpiryModal } from '../common/SessionExpiryModal';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 text-on-background dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-primary/20 selection:text-primary">
      <PublicHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <ToastContainer />
      <LogoutConfirmModal />
      <SessionExpiryModal />
    </div>
  );
};
