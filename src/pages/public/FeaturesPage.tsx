import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const FeaturesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'fleet', name: 'Fleet Intelligence' },
    { id: 'driver', name: 'Driver Intelligence' },
    { id: 'route', name: 'Route Intelligence' },
    { id: 'trip', name: 'Trip Management' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'passenger', name: 'Passenger Intelligence' },
    { id: 'safety', name: 'Safety & Emergency' },
    { id: 'ai', name: 'AI Operations' },
  ];

  const featureCards = [
    {
      category: 'fleet',
      title: 'Real-Time Fleet Tracking',
      icon: 'near_me',
      description: 'Sub-second GPS location, CAN-bus speed, door status, and live route deviation alerts on interactive vector maps.',
      link: '/tracking',
      benefits: ['50ms Telemetry Latency', 'Live Geo-fencing', 'Ignition Monitoring']
    },
    {
      category: 'fleet',
      title: 'Vehicle Health Diagnostics',
      icon: 'directions_bus',
      description: 'Continuous CAN-bus OBD-II sensor polling for engine temperature, battery voltage, oil pressure, and brake wear.',
      link: '/buses',
      benefits: ['Real-time DTC Codes', 'Battery Drain Warning', 'Tire Pressure Telemetry']
    },
    {
      category: 'fleet',
      title: 'Fleet Utilization & Analytics',
      icon: 'analytics',
      description: 'Interactive heatmaps analyzing active vs idle bus time, deadhead mileage, and peak asset efficiency across depots.',
      link: '/dashboard',
      benefits: ['Peak Hours Audit', 'Deadhead Mileage Reduction', 'Depot Asset Matrix']
    },

    {
      category: 'driver',
      title: 'Driver Profiles & Roster',
      icon: 'badge',
      description: 'Complete digital records for all drivers including contact details, duty roster history, medical checks, and vehicle assignments.',
      link: '/drivers',
      benefits: ['Digital Document Vault', 'Shift Duty Log', 'Emergency Contact Sync']
    },
    {
      category: 'driver',
      title: 'License & Certification Compliance',
      icon: 'verified',
      description: 'Automated expiration tracking for commercial driver licenses, heavy vehicle endorsements, and mandatory safety badges.',
      link: '/compliance',
      benefits: ['30-Day Expiry Warning', 'Regulatory Audit Trail', 'Instant Suspend Safeguard']
    },
    {
      category: 'driver',
      title: 'Driver Safety Scoring & Risk',
      icon: 'minor_crash',
      description: 'AI safety scores evaluated continuously using telematics data for harsh acceleration, sharp cornering, over-speeding, and braking.',
      link: '/driver-risk',
      benefits: ['Safety Scorecards (0-100)', 'Distraction Alert Sync', 'Reward Leaderboards']
    },

    {
      category: 'route',
      title: 'Route Management & Geometry',
      icon: 'alt_route',
      description: 'Manage complex transit corridors, bus stop sequences, fare zones, and precise turn-by-turn route shapes.',
      link: '/routes',
      benefits: ['Waypoints & Bus Stops', 'Fare Zone Mapping', 'GTFS Export Support']
    },
    {
      category: 'route',
      title: 'AI Route Optimization',
      icon: 'route',
      description: 'Machine learning algorithms calculate optimal routes considering real-time traffic jams, road closures, and weather hazards.',
      link: '/route-optimizer',
      benefits: ['18% Fuel Savings', 'Traffic Congestion Bypass', 'Multi-Stop Sequencing']
    },
    {
      category: 'route',
      title: 'Smart Scheduling & Dispatch',
      icon: 'calendar_month',
      description: 'Automated timetable generation, driver shift pairing, and real-time dispatch queue management.',
      link: '/scheduling',
      benefits: ['Automated Shift Generator', 'Driver Rest Time Guard', 'Dispatch Board Sync']
    },

    {
      category: 'trip',
      title: 'Live Trip Management',
      icon: 'departure_board',
      description: 'Monitor all active trips in real time, view live passenger count, current stop progress, and delay alerts.',
      link: '/trips',
      benefits: ['Real-time Progress Bar', 'Live Passenger Load', 'Driver-to-Control Radio']
    },
    {
      category: 'trip',
      title: 'Dispatch Center',
      icon: 'hub',
      description: 'Centralized dispatch control board allowing instant bus reassignment, trip cancellation, or emergency relief bus dispatch.',
      link: '/dispatch',
      benefits: ['1-Click Bus Swap', 'Relief Driver Dispatch', 'Delay Mitigation Protocol']
    },

    {
      category: 'maintenance',
      title: 'Service Management & Work Orders',
      icon: 'build',
      description: 'Digital work order lifecycle from breakdown report to spare parts check, mechanic assignment, and sign-off.',
      link: '/maintenance',
      benefits: ['Parts Inventory Sync', 'Mechanic Duty Assignment', 'Cost History Per Bus']
    },
    {
      category: 'maintenance',
      title: 'Daily Vehicle Inspection (DVIR)',
      icon: 'fact_check',
      description: 'Mobile-friendly pre-trip and post-trip inspection checklists filled by drivers before pulling out of depot.',
      link: '/inspection',
      benefits: ['Photo Proof Upload', 'Instant Defect Flag', 'Compliance Sign-off']
    },

    {
      category: 'passenger',
      title: 'Passenger Intelligence & Heatmaps',
      icon: 'groups',
      description: 'AI-driven passenger volume analysis, stop-wise boarding/alighting heatmaps, and bus crowding indicators.',
      link: '/passenger-intelligence',
      benefits: ['Stop Crowding Index', 'Peak Demand Heatmap', 'APC Camera Integration']
    },
    {
      category: 'passenger',
      title: 'Demand Forecasting',
      icon: 'trending_up',
      description: 'Predict passenger surges days in advance using historical transit trends, weather feeds, and event calendars.',
      link: '/demand-forecasting',
      benefits: ['Surge Day Predictions', 'Fleet Scaling Suggestion', 'Ticket Revenue Forecast']
    },

    {
      category: 'safety',
      title: 'Emergency SOS & Incident Response',
      icon: 'warning_amber',
      description: 'Instant driver SOS button alert triggering live video streaming, nearest emergency team dispatch, and GPS lock.',
      link: '/emergency',
      benefits: ['1-Touch SOS Button', 'Nearest Depot Relief', 'Automated Police/Medical Alert']
    },
    {
      category: 'safety',
      title: 'Incident Management Center',
      icon: 'report_problem',
      description: 'Track accidents, passenger disputes, breakdowns, and traffic collisions with full evidence logging and insurance reporting.',
      link: '/incidents',
      benefits: ['Evidence Attachment', 'Root-Cause Analysis', 'Insurance Claim Export']
    },

    {
      category: 'ai',
      title: 'AI Operations Assistant',
      icon: 'smart_toy',
      description: 'Interactive natural language AI assistant capable of answering complex operational queries and recommending actions.',
      link: '/ai-assistant',
      benefits: ['Natural Language Query', 'Autonomous Reroutes', 'Instant Fleet Digest']
    },
    {
      category: 'ai',
      title: 'Fuel Anomaly Detection',
      icon: 'local_gas_station',
      description: 'Cross-references CAN-bus fuel tank levels with mileage and GPS stop data to flag fuel siphoning and theft anomalies.',
      link: '/fuel',
      benefits: ['Theft Alert (<3 mins)', 'Fuel Station Sync', 'Fuel Theft Prevention']
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? featureCards 
    : featureCards.filter(f => f.category === activeCategory);

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 text-xs font-bold border border-primary/20">
          Complete Modular Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Smart Bus 360 <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Platform Features</span>
        </h1>
        <p className="text-base text-on-surface-variant dark:text-slate-300">
          Explore our end-to-end suite of transit intelligence, IoT telematics, AI operations, and driver safety modules.
        </p>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-105'
                : 'bg-surface-container dark:bg-slate-900 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FEATURE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-[30px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 hover:border-primary/50 transition-all flex flex-col justify-between space-y-6 shadow-sm group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">{feat.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 text-on-surface-variant dark:text-slate-400">
                  {feat.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-on-surface dark:text-slate-100 group-hover:text-primary dark:group-hover:text-indigo-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-2 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Key Bullet Benefits */}
              <div className="space-y-1.5 pt-2">
                {feat.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-[11px] text-on-surface dark:text-slate-300 font-medium">
                    <span className="material-symbols-outlined text-emerald-500 text-[14px]">check_circle</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container/60 dark:border-slate-800">
              <NavLink
                to={feat.link}
                className="w-full py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary text-primary dark:text-indigo-400 text-xs font-extrabold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Launch Feature Module</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
