import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const SolutionsPage: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<string>('public');

  const solutions = [
    {
      id: 'public',
      title: 'Public Transportation',
      subtitle: 'Municipal Transit Authorities & City Bus Corporations',
      icon: 'directions_bus',
      requirements: 'High-density urban bus fleets (100–2,000+ buses), strict timetable schedules, GTFS passenger feeds, multi-depot management.',
      problems: 'Frequent traffic delays, overcrowding at bus stops during rush hours, high deadhead fuel waste, and lack of real-time passenger visibility.',
      solution: 'Smart Bus 360 provides city-wide live telemetry, GTFS transit integration, AI passenger demand forecasting, and automated schedule adherence alerts.',
      benefits: ['+32% On-Time Arrival Reliability', '24% Deadhead Fuel Cost Reduction', 'Real-Time Passenger App Feed Integration']
    },
    {
      id: 'private',
      title: 'Private Bus Operators',
      subtitle: 'Intercity Luxury Express & Regional Charter Lines',
      icon: 'departure_board',
      requirements: 'Luxury sleeper coaches, long-distance intercity routes, driver shift pairing, fuel theft audits, and passenger booking QR scanning.',
      problems: 'Unmonitored fuel theft during long night trips, driver fatigue accidents, unexpected highway mechanical breakdowns, and unverified ticket passenger lists.',
      solution: 'Continuous CAN-bus fuel level correlation, automated driver fatigue warnings, 72-hour predictive breakdown maintenance, and digital ticket verification.',
      benefits: ['Zero Unmonitored Fuel Theft', '85% Predictive Breakdown Prevention', 'Automated Seat & Revenue Reconciliation']
    },
    {
      id: 'school',
      title: 'School Transportation',
      icon: 'school',
      subtitle: 'K-12 School Districts & University Campus Shuttles',
      iconSymbol: 'school',
      requirements: 'Geo-fenced school pickup zones, parent live bus tracking apps, child RFID student boarding badges, and speed governor enforcement.',
      problems: 'Anxious parents demanding live bus ETAs, unauthorized stop deviations, driver over-speeding in school zones, and missing student check-in logs.',
      solution: 'Geo-fenced parent notification alerts, speed governor alerts (<40 km/h in school zones), RFID student boarding verification, and 1-touch SOS emergency button.',
      benefits: ['100% Parent Peace of Mind', 'Zero Speed Governor Violations', 'Automated RFID Child Boarding Alerts']
    },
    {
      id: 'corporate',
      title: 'Corporate Transportation',
      subtitle: 'Tech Campus Employee Shuttles & Industrial Transit',
      iconSymbol: 'corporate_fare',
      requirements: 'Fixed employee shift pickup routes, seat reservation apps, fleet utilization reports for HR/Facilities, and vendor SLA compliance tracking.',
      problems: 'Low employee shuttle occupancy leading to wasted transport budget, vendor billing disputes, late employee arrivals impacting shifts, and unmonitored vendor quality.',
      solution: 'Dynamic employee seat allocation, automated vendor SLA audit logs, route optimization for employee home pickups, and live facility manager control board.',
      benefits: ['28% Reduction in Transport Overhead', '100% Vendor SLA Transparency', 'Automated Shift Roster Sync']
    },
    {
      id: 'tour',
      title: 'Tour & Travel Operators',
      subtitle: 'Holiday Sightseeing Coaches & Custom Charter Fleets',
      iconSymbol: 'tour',
      requirements: 'Flexible tourist itineraries, multi-day driver allowances, luggage bay sensor checks, and VIP customer comfort monitoring.',
      problems: 'Unplanned engine overheating on remote mountain routes, driver route unfamiliarity, unpredictable fuel consumption, and customer complaints.',
      solution: 'Live engine temperature monitoring alerts, turn-by-turn driver navigation, automated tour itinerary schedules, and customer feedback QR portals.',
      benefits: ['Zero Overheating Engine Stalls', 'Seamless Multi-Day Itinerary Tracking', '4.9/5 Customer Satisfaction Rating']
    },
    {
      id: 'fleet',
      title: 'Fleet Management Companies',
      subtitle: 'Third-Party Logistics (3PL) & Vehicle Leasing Enterprises',
      iconSymbol: 'warehouse',
      requirements: 'Multi-tenant client dashboards, vehicle lease wear-and-tear analytics, automated preventative maintenance scheduling, and asset resale valuation logs.',
      problems: 'Disputed vehicle lease returns due to unmonitored abuse, delayed service maintenance leading to asset devaluation, and complex multi-client billing.',
      solution: 'Immutable digital vehicle history ledgers, automated preventative maintenance triggers based on actual CAN-bus odometer km, and multi-tenant portal access.',
      benefits: ['+15% Vehicle Resale Asset Value', 'Automated Lease Maintenance Triggers', 'Multi-Tenant RBAC Security']
    }
  ];

  const currentSolution = solutions.find(s => s.id === selectedSolution) || solutions[0];

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 text-xs font-bold border border-primary/20">
          Tailored Industry Vertical Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Solutions for Every <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Transit Operator</span>
        </h1>
        <p className="text-base text-on-surface-variant dark:text-slate-300">
          Tailored transit intelligence built for city authorities, private luxury coaches, school districts, and corporate fleets.
        </p>
      </div>

      {/* SOLUTION CATEGORY BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {solutions.map((sol) => {
          const isSelected = selectedSolution === sol.id;
          return (
            <button
              key={sol.id}
              onClick={() => setSelectedSolution(sol.id)}
              className={`p-4 rounded-3xl text-left border transition-all flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary shadow-xl scale-105 font-bold z-10'
                  : 'bg-surface-container-lowest dark:bg-slate-900 border-surface-container dark:border-slate-800 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">{sol.iconSymbol || sol.icon}</span>
              <span className="text-xs font-bold truncate mt-2">{sol.title}</span>
            </button>
          );
        })}
      </div>

      {/* DETAILED SOLUTION CARD */}
      <div className="p-8 sm:p-12 rounded-[36px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-container dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-on-surface dark:text-white">{currentSolution.title}</h2>
            <p className="text-sm font-semibold text-primary dark:text-indigo-400">{currentSolution.subtitle}</p>
          </div>
          <NavLink
            to="/register"
            className="px-6 py-3 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <span>Request {currentSolution.title} Demo</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fleet Requirements */}
          <div className="p-6 rounded-3xl bg-surface-container/40 dark:bg-slate-800/40 border border-surface-container dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">
              <span className="material-symbols-outlined text-primary text-[20px]">directions_bus</span>
              <span>Fleet Requirements</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              {currentSolution.requirements}
            </p>
          </div>

          {/* Operational Problems */}
          <div className="p-6 rounded-3xl bg-error/5 dark:bg-error/10 border border-error/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-error uppercase tracking-wider">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <span>Operational Friction</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              {currentSolution.problems}
            </p>
          </div>

          {/* Smart Bus 360 Solution */}
          <div className="p-6 rounded-3xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>Smart Bus 360 Solution</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 leading-relaxed">
              {currentSolution.solution}
            </p>
          </div>
        </div>

        {/* Tangible Benefits Pills */}
        <div className="pt-4 border-t border-surface-container dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">Expected Measurable Benefits:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentSolution.benefits.map((b, bIdx) => (
              <div key={bIdx} className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 text-xs font-bold text-primary dark:text-indigo-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500 text-[18px]">trending_up</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
