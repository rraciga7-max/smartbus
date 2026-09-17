import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PassengerHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [destinationSearch, setDestinationSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/tracking');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-24 md:pb-12">
      <div className="flex flex-col w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop gap-lg pt-md">
        {/* Search Destination Bar from Stitch */}
        <form onSubmit={handleSearch} className="relative w-full mt-sm">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-10 text-[22px]">
            search
          </span>
          <input
            type="text"
            value={destinationSearch}
            onChange={(e) => setDestinationSearch(e.target.value)}
            className="w-full bg-surface-container h-14 pl-12 pr-14 rounded-full font-body-lg text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-shadow border border-transparent focus:border-primary/20"
            placeholder="Where do you want to go?"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </form>

        {/* Nearby Buses Section from Stitch */}
        <section className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-title-lg font-bold text-on-background">
              Nearby Buses
            </h2>
            <button
              onClick={() => navigate('/tracking')}
              className="font-label-md text-label-md text-primary font-bold hover:underline"
            >
              View Map
            </button>
          </div>

          <div className="flex flex-col gap-sm">
            {/* Bus Card 1 (Route 12 Singanallur - 40% Full) */}
            <div
              onClick={() => navigate('/tickets')}
              className="bg-surface rounded-[24px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-variant flex flex-col gap-3 relative overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-title-lg text-title-lg font-bold shadow-sm">
                    12
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-lg text-title-lg font-bold text-on-surface">
                      Singanallur
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      Arriving in 5m
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    directions_bus
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-semibold mt-1">
                    40% Full
                  </span>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="w-full bg-surface-container-highest rounded-full h-2 mt-1 overflow-hidden relative z-10">
                <div className="bg-primary h-full rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            {/* Bus Card 2 (Route 45 Gandhipuram - 80% Full) */}
            <div
              onClick={() => navigate('/tickets')}
              className="bg-surface rounded-[24px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-surface-variant flex flex-col gap-3 relative overflow-hidden group hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary-container/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center font-title-lg text-title-lg font-bold border border-surface-variant shadow-sm">
                    45
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-lg text-title-lg font-bold text-on-surface">
                      Gandhipuram
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant font-medium">
                      Arriving in 12m
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                    directions_bus
                  </span>
                  <span className="font-label-md text-label-md text-tertiary-container font-semibold mt-1">
                    80% Full
                  </span>
                </div>
              </div>

              <div className="w-full bg-surface-container-highest rounded-full h-2 mt-1 overflow-hidden relative z-10">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Favorite Routes Section from Stitch */}
        <section className="flex flex-col gap-sm mb-lg">
          <h2 className="font-title-lg text-title-lg font-bold text-on-background">
            Favourite Routes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
            <button
              onClick={() => navigate('/routes')}
              className="bg-surface rounded-[16px] p-3.5 border border-surface-variant shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col items-start gap-2 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">home</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-label-md text-label-md font-bold text-on-surface">Home</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Route 12 • 45</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/routes')}
              className="bg-surface rounded-[16px] p-3.5 border border-surface-variant shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col items-start gap-2 hover:bg-surface-container-low transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-full bg-secondary-container/60 text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">work</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-label-md text-label-md font-bold text-on-surface">Office</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Route 3A IT Park</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/routes')}
              className="bg-surface rounded-[16px] p-3.5 border border-surface-variant shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center gap-1 hover:bg-surface-container-low transition-colors min-h-[96px] border-dashed"
            >
              <span className="material-symbols-outlined text-outline">add</span>
              <span className="font-label-sm text-label-sm text-outline font-semibold">Add New</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
