import React, { useState } from 'react';
import { mockTicket } from '../data/mockData';

export const TicketPage: React.FC = () => {
  const [ticket] = useState(mockTicket);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Ticket ${ticket.ticketNumber} downloaded successfully as PDF!`);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pb-28 md:pb-12">
      <div className="flex flex-col w-full max-w-xl mx-auto p-margin-mobile md:p-margin-desktop gap-lg pb-safe">
        {/* Boarding Pass Main Card from Stitch */}
        <div className="bg-surface-container rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center relative overflow-hidden border border-surface-variant">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-tertiary/5 rounded-full blur-xl pointer-events-none" />

          <div className="text-center mb-4 z-10">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Boarding Pass
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Ready for ticket scanning & boarding
            </p>
          </div>

          {/* QR Code Container matching Stitch SVG */}
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm mb-6 relative z-10 w-48 h-48 flex items-center justify-center border border-surface-variant">
            <svg
              fill="none"
              height="140"
              viewBox="0 0 140 140"
              width="140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="white" height="140" width="140" />
              <path className="text-on-surface" d="M10 10H40V40H10V10ZM20 20V30H30V20H20Z" fill="currentColor" />
              <path className="text-on-surface" d="M100 10H130V40H100V10ZM110 20V30H120V20H110Z" fill="currentColor" />
              <path className="text-on-surface" d="M10 100H40V130H10V100ZM20 110V120H30V110H20Z" fill="currentColor" />
              <path className="text-on-surface" d="M50 10H90V20H50V10Z" fill="currentColor" />
              <path className="text-on-surface" d="M50 30H70V40H50V30Z" fill="currentColor" />
              <path className="text-on-surface" d="M80 30H90V50H80V30Z" fill="currentColor" />
              <path className="text-on-surface" d="M10 50H30V60H10V50Z" fill="currentColor" />
              <path className="text-on-surface" d="M40 50H70V70H40V50Z" fill="currentColor" />
              <path className="text-on-surface" d="M80 60H130V70H80V60Z" fill="currentColor" />
              <path className="text-on-surface" d="M10 70H20V90H10V70Z" fill="currentColor" />
              <path className="text-on-surface" d="M30 70H60V90H30V70Z" fill="currentColor" />
              <path className="text-on-surface" d="M70 70H90V80H70V70Z" fill="currentColor" />
              <path className="text-on-surface" d="M100 70H110V90H100V70Z" fill="currentColor" />
              <path className="text-on-surface" d="M120 70H130V100H120V70Z" fill="currentColor" />
              <path className="text-on-surface" d="M50 90H80V100H50V90Z" fill="currentColor" />
              <path className="text-on-surface" d="M90 90H110V110H90V90Z" fill="currentColor" />
              <path className="text-on-surface" d="M50 110H70V130H50V110Z" fill="currentColor" />
              <path className="text-on-surface" d="M80 110H90V130H80V110Z" fill="currentColor" />
              <path className="text-on-surface" d="M100 120H130V130H100V120Z" fill="currentColor" />
              <path className="text-on-surface" d="M100 100H110V110H100V100Z" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none animate-pulse-subtle" />
          </div>

          {/* Bus Number & Paid Pill Bar */}
          <div className="w-full flex justify-between items-center bg-surface-container-high rounded-xl p-4 mb-4 z-10 border border-surface-variant">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">Bus No.</p>
              <p className="font-title-lg text-title-lg font-bold text-on-surface">{ticket.busNumber}</p>
            </div>
            <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              <span className="font-label-sm text-label-sm text-primary font-bold">
                ₹{ticket.fareINR} Paid
              </span>
            </div>
          </div>

          {/* Stop Hierarchy from Stitch */}
          <div className="w-full space-y-4 z-10 relative pl-2">
            <div className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
                <div className="w-0.5 h-10 bg-surface-variant my-1" />
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant font-semibold">From</p>
                <p className="font-body-lg text-body-lg text-on-surface font-bold">{ticket.fromStop}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 relative -mt-3">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-tertiary ring-4 ring-tertiary/20" />
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant font-semibold">To</p>
                <p className="font-body-lg text-body-lg text-on-surface font-bold">{ticket.toStop}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details Card from Stitch */}
        <div className="bg-surface-container rounded-2xl p-5 shadow-sm border border-surface-variant">
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-4">
            Trip & Passenger Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span> Date
              </p>
              <p className="font-body-md text-body-md text-on-surface font-bold mt-0.5">
                {ticket.date}
              </p>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span> Time
              </p>
              <p className="font-body-md text-body-md text-on-surface font-bold mt-0.5">
                {ticket.time}
              </p>
            </div>
            <div className="col-span-2">
              <p className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">pin_drop</span> Boarding Point
              </p>
              <p className="font-body-md text-body-md text-on-surface font-bold mt-0.5">
                {ticket.boardingPoint}
              </p>
            </div>
          </div>
        </div>

        {/* Download Ticket Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-primary text-on-primary font-title-lg text-title-lg font-bold py-4 rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-primary-container"
        >
          <span className={`material-symbols-outlined ${downloading ? 'animate-bounce' : ''}`}>
            download
          </span>
          {downloading ? 'Generating PDF...' : 'Download Digital Pass'}
        </button>
      </div>
    </div>
  );
};
