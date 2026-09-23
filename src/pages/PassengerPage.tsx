import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import type { PassengerTicket } from '../types';
import { Modal } from '../components/common/Modal';
import { PageHeader } from '../components/common/PageHeader';

export const PassengerPage: React.FC = () => {
  const { tickets, bookTicket } = useData();
  const [selectedTicket, setSelectedTicket] = useState<PassengerTicket | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  // Booking Form State
  const [passengerName, setPassengerName] = useState('Ananya Ramakrishnan');
  const [busNumber, setBusNumber] = useState('TN 38 AB 1234');
  const [routeName, setRouteName] = useState('Route 21A: Gandhipuram ➔ Singanallur');
  const [fromStop, setFromStop] = useState('Gandhipuram Stand');
  const [toStop, setToStop] = useState('Singanallur Terminal');
  const [fareAmount, setFareAmount] = useState('35');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issued = bookTicket({
      passengerName,
      busNumber,
      routeName,
      fromStop,
      toStop,
      fareAmount: Number(fareAmount),
      seatNumber: `Seat ${Math.floor(1 + Math.random() * 40)}A`
    });
    setSelectedTicket(issued);
    setIsBookModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Commuter Passes & Tickets"
        badge="Digital Ticketing"
        subtitle="Contactless QR tickets, real-time fare calculation & live seat tracking."
        breadcrumb="Operations"
        actions={[
          {
            label: 'Book Ticket',
            icon: 'confirmation_number',
            onClick: () => setIsBookModalOpen(true),
            variant: 'primary'
          }
        ]}
      />

      {/* Issued Digital Ticket View (Matching Stitch Screen 2 & 4) */}
      <div className="flex flex-col gap-4 min-w-0">
        <h3 className="text-title-lg font-bold text-on-surface dark:text-slate-100">Your Active Digital Passes & Tickets</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 min-w-0">
          {tickets.map((tkt) => (
            <div
              key={tkt.id}
              onClick={() => setSelectedTicket(tkt)}
              className="bg-surface-container-lowest dark:bg-slate-900 rounded-[32px] p-4 sm:p-6 shadow-stitch-card border border-surface-container/60 dark:border-slate-800 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between gap-5 sm:gap-6 relative overflow-hidden group min-w-0"
            >
              {/* Ticket Top */}
              <div className="flex items-start justify-between gap-2 border-b border-dashed border-surface-container dark:border-slate-800 pb-4 min-w-0">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-outline dark:text-slate-400 font-extrabold uppercase tracking-wider block">Pass ID: #{tkt.id}</span>
                  <h4 className="text-lg sm:text-xl font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors mt-0.5 truncate">
                    {tkt.passengerName}
                  </h4>
                  <p className="text-xs text-primary dark:text-indigo-400 font-semibold mt-1 truncate">{tkt.routeName}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-success-container dark:bg-emerald-950/60 text-[#065F46] dark:text-emerald-300 font-bold text-xs flex-shrink-0">
                  {tkt.status.toUpperCase()}
                </span>
              </div>

              {/* Stop Origin ➔ Destination */}
              <div className="flex items-center justify-between gap-2 text-sm min-w-0">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] text-outline dark:text-slate-400 uppercase font-semibold block truncate">Boarding</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 truncate">{tkt.fromStop}</p>
                </div>
                <span className="material-symbols-outlined text-primary dark:text-indigo-400 text-[20px] flex-shrink-0">arrow_forward</span>
                <div className="min-w-0 flex-1 text-right">
                  <span className="text-[10px] text-outline dark:text-slate-400 uppercase font-semibold block truncate">Alighting</span>
                  <p className="font-bold text-on-surface dark:text-slate-100 truncate">{tkt.toStop}</p>
                </div>
              </div>

              {/* QR Code Section (Simulated Canvas QR) */}
              <div className="bg-surface-container-low dark:bg-slate-800/60 p-4 rounded-2xl flex items-center justify-between gap-4 min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-outline dark:text-slate-400 font-semibold truncate">Seat Number</span>
                  <span className="text-lg font-extrabold text-on-surface dark:text-slate-100 truncate">{tkt.seatNumber}</span>
                  <span className="text-xs font-bold text-primary dark:text-indigo-400 mt-1 truncate">₹{tkt.fareAmount} Paid</span>
                </div>

                {/* QR Code Icon Visual */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white p-2 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-sm flex-shrink-0">
                  <span className="material-symbols-outlined text-[40px] text-slate-800">qr_code_2</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Ticket Modal (Full Ticket View - Stitch Screen 4) */}
      <Modal
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        title="Digital Transit Ticket"
      >
        {selectedTicket && (
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="w-full bg-surface-container-low p-6 rounded-[24px] border border-surface-container flex flex-col items-center gap-4">
              <span className="text-xs text-outline font-mono">TICKET TOKEN: {selectedTicket.qrCodeToken}</span>
              
              {/* Simulated Large QR Code */}
              <div className="w-44 h-44 bg-white p-4 rounded-2xl border-2 border-primary/20 shadow-md flex items-center justify-center">
                <span className="material-symbols-outlined text-[120px] text-primary">qr_code_2</span>
              </div>
              <p className="text-xs text-on-surface-variant">Scan QR code at bus entry validator</p>
            </div>

            <div className="w-full flex flex-col gap-3 text-left text-sm">
              <div className="flex justify-between border-b border-surface-container pb-2">
                <span className="text-outline">Passenger Name</span>
                <span className="font-bold text-on-surface">{selectedTicket.passengerName}</span>
              </div>
              <div className="flex justify-between border-b border-surface-container pb-2">
                <span className="text-outline">Bus Number</span>
                <span className="font-bold text-primary">{selectedTicket.busNumber}</span>
              </div>
              <div className="flex justify-between border-b border-surface-container pb-2">
                <span className="text-outline">Fare Paid</span>
                <span className="font-bold text-emerald-600 text-base">₹{selectedTicket.fareAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Booking Time</span>
                <span className="font-semibold text-on-surface">{selectedTicket.bookingTime}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTicket(null)}
              className="w-full py-3 rounded-full bg-primary text-on-primary font-bold text-label-md hover:bg-primary/90"
            >
              Done / Back To Passes
            </button>
          </div>
        )}
      </Modal>

      {/* Book Ticket Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Issue Passenger Ticket"
      >
        <form onSubmit={handleBookSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Passenger Name *</label>
            <input
              type="text"
              required
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div>
            <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Route Line</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">From Stop</label>
              <input
                type="text"
                value={fromStop}
                onChange={(e) => setFromStop(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">To Stop</label>
              <input
                type="text"
                value={toStop}
                onChange={(e) => setToStop(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Bus Registration</label>
              <input
                type="text"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="text-label-md font-semibold text-on-surface dark:text-slate-200 block mb-1">Fare (₹)</label>
              <input
                type="number"
                value={fareAmount}
                onChange={(e) => setFareAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-surface-container dark:bg-slate-800 text-body-md text-on-surface dark:text-slate-100 border border-outline/30 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-5 py-2.5 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-slate-200 font-semibold text-label-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary dark:bg-indigo-600 hover:bg-primary/90 dark:hover:bg-indigo-500 text-on-primary font-bold text-label-md"
            >
              Generate QR Pass
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
