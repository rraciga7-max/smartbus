import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRoutes } from '../data/mockData';

export const RouteDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const route = mockRoutes[0]; // Route 12B Singanallur Exp
  const [isConnecting, setIsConnecting] = useState(false);

  const handleTrackLive = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      navigate('/tracking');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-28 md:pb-12">
      {/* Container */}
      <div className="flex flex-col w-full gap-md px-margin-mobile md:px-margin-desktop pt-md relative">
        {/* Header / Map Preview Card from Stitch */}
        <div className="bg-surface-container-lowest rounded-[24px] shadow-sm flex flex-col overflow-hidden relative group border border-surface-variant">
          {/* Simulated Map Visual */}
          <div
            className="w-full h-[200px] md:h-[260px] bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZQfbsZOUQgp5CdOkbHTK54CD1uf8d7MEKzgt2BQ6UYz_NZ9qVNbQcXjm5YHzz5DXUeZL7dQDRasWEM8MjKkQhRxzMOU9FwYq7YT4lUKJu7eChFVk4g-VtsGAQElkzvi16CV5LsEMdlcOUqvZ3wPW96WcL3Eu8Mn8wRMQj-M2jx4ZQwecugQ4lWWGuIarElUqqyBRgw6xWccyiiwyM_Mziumvq4CYP3po3h-XV62yfT7Ww3R5XYzoE2w')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
          </div>

          {/* Overlay Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
            <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-xl p-3 shadow-md border-none flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[16px]">route</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  Route {route.routeCode}
                </span>
              </div>
              <h2 className="font-title-lg text-title-lg font-bold text-on-surface">
                {route.routeName}
              </h2>
            </div>

            <div className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,40,142,0.6)]" />
              <span className="font-label-md text-label-md text-primary font-bold tracking-wide">
                LIVE
              </span>
            </div>
          </div>

          {/* Trip Summary Bar */}
          <div className="bg-surface-container-lowest px-4 py-3 flex justify-between items-center z-10 border-t border-surface-variant">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Est. Arrival</span>
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                {route.estimatedArrival}
              </span>
            </div>
            <div className="w-px h-8 bg-surface-variant" />
            <div className="flex flex-col items-end">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Status</span>
              <span className="font-label-md text-label-md text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-0.5 font-bold">
                {route.status}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Card - Stops & Schedule */}
        <div className="bg-surface-container-lowest rounded-[24px] shadow-sm p-5 flex flex-col gap-4 border border-surface-variant">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface">
              Stops & Schedule
            </h3>
            <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>
          </div>

          <div className="flex flex-col w-full relative">
            {/* Stop 1: Past */}
            <div className="flex gap-4 relative group">
              <div className="w-[72px] flex-shrink-0 text-right pt-0.5">
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">08:00 AM</span>
              </div>
              <div className="flex flex-col items-center relative w-6">
                <div className="w-3 h-3 rounded-full bg-primary/30 mt-1 mb-1 relative z-10" />
                <div className="absolute top-4 bottom-[-16px] w-0.5 bg-primary/20 z-0" />
              </div>
              <div className="flex-1 pb-6">
                <p className="font-body-md text-body-md text-on-surface-variant">Gandhipuram</p>
              </div>
            </div>

            {/* Stop 2: Past */}
            <div className="flex gap-4 relative group">
              <div className="w-[72px] flex-shrink-0 text-right pt-0.5">
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">08:15 AM</span>
              </div>
              <div className="flex flex-col items-center relative w-6">
                <div className="w-3 h-3 rounded-full bg-primary/30 mt-1 mb-1 relative z-10" />
                <div className="absolute top-4 bottom-[-16px] w-0.5 bg-primary/20 z-0" />
              </div>
              <div className="flex-1 pb-6">
                <p className="font-body-md text-body-md text-on-surface-variant">Lakshmi Mills</p>
              </div>
            </div>

            {/* Stop 3: CURRENT (Peelamedu) */}
            <div className="flex gap-4 relative">
              <div className="w-[72px] flex-shrink-0 text-right pt-3">
                <span className="font-label-md text-label-md text-primary font-bold">08:30 AM</span>
              </div>
              <div className="flex flex-col items-center relative w-6">
                {/* Animated Current Dot with Halo */}
                <div className="w-5 h-5 rounded-full bg-primary mt-2.5 mb-1 relative z-10 flex items-center justify-center shadow-md">
                  <div className="absolute w-9 h-9 rounded-full bg-primary/20 animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-on-primary" />
                </div>
                <div className="absolute top-7 bottom-[-16px] w-0.5 bg-surface-variant z-0" />
              </div>

              <div className="flex-1 pb-6">
                <div className="bg-primary/5 rounded-[16px] p-3.5 -mt-1 ml-1 relative overflow-hidden border border-primary/20 shadow-xs">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <p className="font-title-lg text-title-lg font-bold text-primary">Peelamedu</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="material-symbols-outlined text-[16px] text-primary animate-bounce">
                      directions_bus
                    </span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                      Approaching
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stop 4: Future */}
            <div className="flex gap-4 relative group">
              <div className="w-[72px] flex-shrink-0 text-right pt-0.5">
                <span className="font-label-md text-label-md text-on-surface-variant opacity-60">08:45 AM</span>
              </div>
              <div className="flex flex-col items-center relative w-6">
                <div className="w-3 h-3 rounded-full bg-surface-variant mt-1 mb-1 relative z-10" />
                <div className="absolute top-4 bottom-[-16px] w-0.5 bg-surface-variant z-0" />
              </div>
              <div className="flex-1 pb-6">
                <p className="font-body-md text-body-md text-on-surface opacity-80">Hope College</p>
              </div>
            </div>

            {/* Stop 5: Destination */}
            <div className="flex gap-4 relative group">
              <div className="w-[72px] flex-shrink-0 text-right pt-0.5">
                <span className="font-label-md text-label-md text-on-surface-variant opacity-60">09:00 AM</span>
              </div>
              <div className="flex flex-col items-center relative w-6">
                <div className="w-4 h-4 rounded-full bg-surface-variant mt-0.5 mb-1 relative z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-body-md text-body-md font-semibold text-on-surface opacity-90">
                  Singanallur
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Final Destination
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button from Stitch */}
        <div className="pt-2">
          <button
            onClick={handleTrackLive}
            disabled={isConnecting}
            className="w-full bg-primary text-on-primary font-title-lg text-title-lg h-[56px] rounded-[16px] shadow-[0_8px_24px_rgba(0,40,142,0.25)] flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:shadow-[0_12px_32px_rgba(0,40,142,0.3)] overflow-hidden relative group"
          >
            <span className={`material-symbols-outlined ${isConnecting ? 'animate-spin' : 'group-hover:animate-pulse'}`}>
              {isConnecting ? 'satellite_alt' : 'my_location'}
            </span>
            <span>{isConnecting ? 'Connecting Satellite...' : 'Track Live Bus'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
