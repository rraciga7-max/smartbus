import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../types';


interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [identifier, setIdentifier] = useState('admin@fleet.gov');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setIdentifier('admin@fleet.gov');
    } else if (role === 'driver') {
      setIdentifier('suresh.driver@fleet.gov');
    } else {
      setIdentifier('+91 98421 10240');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
    if (selectedRole === 'admin') {
      navigate('/dashboard');
    } else if (selectedRole === 'driver') {
      navigate('/driver');
    } else {
      navigate('/passenger');
    }
  };

  return (
    <div className="relative min-h-screen bg-surface flex flex-col items-center justify-center p-margin-mobile font-body-md text-on-surface overflow-hidden">
      {/* Decorative Background Elements from Stitch */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary-fixed/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="flex flex-col items-center w-full max-w-md my-auto relative z-10 pb-safe">
        {/* Header / Logo Section */}
        <div className="flex flex-col items-center mb-8 w-full text-center">
          <div className="w-24 h-24 mb-6 rounded-2xl bg-white shadow-sm flex items-center justify-center overflow-hidden border border-surface-variant">
            <span className="material-symbols-outlined text-primary text-[56px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              directions_bus
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2 font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Log in to manage your fleet operations.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-surface-variant flex flex-col gap-6">
          {/* Role Selector (Bento style toggle) */}
          <div className="flex flex-col gap-2">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest p-1 rounded-xl border border-surface-variant/50">
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`py-3 px-2 rounded-lg font-label-md font-semibold transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'admin'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: selectedRole === 'admin' ? "'FILL' 1" : "'FILL' 0" }}>
                  admin_panel_settings
                </span>
                Admin
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('driver')}
                className={`py-3 px-2 rounded-lg font-label-md font-semibold transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'driver'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: selectedRole === 'driver' ? "'FILL' 1" : "'FILL' 0" }}>
                  badge
                </span>
                Driver
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('passenger')}
                className={`py-3 px-2 rounded-lg font-label-md font-semibold transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'passenger'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: selectedRole === 'passenger' ? "'FILL' 1" : "'FILL' 0" }}>
                  groups
                </span>
                Passenger
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="identifier">
                Email or Phone Number
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-surface-container-lowest border border-surface-variant font-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40"
                  placeholder="admin@fleet.gov"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-end">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <a href="#" className="font-label-md text-label-md text-primary font-medium hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 pl-12 pr-12 rounded-xl bg-surface-container-lowest border border-surface-variant font-body-lg text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/40"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface p-1 rounded-full"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full h-14 bg-primary text-on-primary rounded-xl font-title-lg text-title-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-[0.98] shadow-md relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sign In As {selectedRole.toUpperCase()}
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-body-md text-body-md text-on-surface-variant">Having trouble?</span>
            <a href="#" className="font-body-md text-body-md text-primary font-medium hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
