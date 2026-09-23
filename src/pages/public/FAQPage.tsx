import React, { useState } from 'react';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'fleet', name: 'Fleet Telematics' },
    { id: 'drivers', name: 'Driver Safety' },
    { id: 'routes', name: 'Routes & Dispatch' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'ai', name: 'AI & Machine Learning' },
    { id: 'security', name: 'Security & Compliance' },
    { id: 'billing', name: 'Billing & Enterprise' },
  ];

  const faqs = [
    {
      category: 'general',
      q: 'What is Smart Bus 360?',
      a: 'Smart Bus 360 is a complete, production-grade enterprise transit operations platform. It unifies IoT telematics, AI route optimization, driver safety scoring, passenger intelligence, maintenance work orders, and financial management in one real-time dashboard.'
    },
    {
      category: 'general',
      q: 'How fast can a transit operator onboard their fleet?',
      a: 'Fleet onboarding takes less than 24 hours. Our plug-and-play OBD-II telematics dongles connect to vehicle CAN-bus ports in under 5 minutes per bus, with automatic vehicle profile auto-discovery.'
    },
    {
      category: 'fleet',
      q: 'What GPS & CAN-bus telematics hardware is supported?',
      a: 'Smart Bus 360 supports standard J1939 and OBD-II CAN-bus protocols, as well as REST APIs and MQTT telemetry feeds from third-party GPS providers including Teltonika, CalAmp, Geotab, and Queclink.'
    },
    {
      category: 'fleet',
      q: 'How accurate is live vehicle tracking?',
      a: 'Live tracking operates with sub-second (50ms latency) streaming updates, providing real-time vector map rendering of bus speed, direction, door status, and ignition state.'
    },
    {
      category: 'drivers',
      q: 'How are driver safety scores calculated?',
      a: 'Driver safety scores (0-100) are computed dynamically using CAN-bus G-sensor telemetry. Algorithms evaluate over-speeding, harsh acceleration, sudden braking, sharp cornering, idling time, and fatigue warnings.'
    },
    {
      category: 'drivers',
      q: 'Can drivers access their own shift schedules and safety scorecards?',
      a: 'Yes! Drivers have access to the Driver App portal where they can view assigned trips, submit digital DVIR vehicle inspections, track their monthly safety scorecards, and report emergency incidents.'
    },
    {
      category: 'routes',
      q: 'How does AI route optimization handle traffic congestion?',
      a: 'Our AI Route Optimizer continuously analyzes live traffic speeds and slope telemetry to calculate alternative corridors, streaming real-time reroutes to driver dashboards and saving up to 18% fuel.'
    },
    {
      category: 'routes',
      q: 'Can we export route timetables into GTFS format?',
      a: 'Yes! Smart Bus 360 supports native General Transit Feed Specification (GTFS) export for integration with Google Maps, Transit app, and municipal passenger information displays.'
    },
    {
      category: 'maintenance',
      q: 'How does 72-hour predictive breakdown maintenance work?',
      a: 'Machine learning models analyze historical DTC fault codes, engine coolant temperatures, battery voltage drops, and oil pressure telemetry to calculate breakdown probabilities 72 hours before failure.'
    },
    {
      category: 'maintenance',
      q: 'Are digital pre-trip inspection checklists (DVIR) compliant with DOT/RTA standards?',
      a: 'Yes! Drivers complete mandatory digital DVIR checklists with photo upload proof. Any flagged defect automatically generates an urgent maintenance work order and locks vehicle assignment.'
    },
    {
      category: 'ai',
      q: 'What makes Smart Bus 360 AI Assistant different from generic chatbots?',
      a: 'SmartBus AI is deep-linked into your live fleet database. You can ask natural language questions like "Show buses with low battery in Depot 2" or "Reroute Route 21A around Hope College flyover" and get instant 1-click execution buttons.'
    },
    {
      category: 'ai',
      q: 'How does Fuel Anomaly Detection prevent fuel theft?',
      a: 'Fuel algorithms compare CAN-bus fuel tank sensor level drops against GPS distance traveled and engine idle times. Sudden drops when the bus is stationary trigger instant security alerts.'
    },
    {
      category: 'security',
      q: 'Is our transit operational data encrypted?',
      a: 'All data is encrypted in transit using TLS 1.3 and at rest using 256-bit AES encryption. Smart Bus 360 is SOC2 Type II and ISO 27001 certified with multi-region failover.'
    },
    {
      category: 'security',
      q: 'What user roles and permissions are supported?',
      a: 'We support 9 granular roles: Super Admin, Transport Manager, Fleet Manager, Dispatcher, Driver Manager, Maintenance Manager, Finance Manager, Safety Officer, and Driver.'
    },
    {
      category: 'billing',
      q: 'How is enterprise pricing structured?',
      a: 'Enterprise pricing is based on active bus fleet count with transparent monthly or annual billing. All software updates, cloud telemetry, and 24/7 technical support are included.'
    },
    {
      category: 'billing',
      q: 'Is there a free trial or live sandbox environment available?',
      a: 'Yes! You can explore the complete authenticated platform with interactive pre-populated mock data directly from our login page or by creating a free trial account.'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="py-12 lg:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 min-w-0">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 min-w-0">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 text-xs font-bold border border-primary/20 inline-block">
          Knowledge Base & Help Desk
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Questions</span>
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300">
          Search answers regarding platform features, CAN-bus telematics, driver scoring, AI models, and security.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-2xl mx-auto min-w-0">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400 text-[24px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g. telematics, fuel theft, driver scores)..."
          className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 text-on-surface dark:text-slate-100 text-xs sm:text-sm font-medium outline-none focus:border-primary shadow-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary text-on-primary shadow-md scale-105'
                : 'bg-surface-container dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FAQ ACCORDION LIST */}
      <div className="space-y-4 min-w-0">
        {filteredFaqs.length === 0 ? (
          <div className="py-12 text-center text-outline dark:text-slate-500 space-y-2">
            <span className="material-symbols-outlined text-4xl">search_off</span>
            <p className="text-sm font-medium">No questions found matching "{searchQuery}" in this category.</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 overflow-hidden shadow-sm transition-all min-w-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 font-bold text-on-surface dark:text-slate-100 hover:text-primary dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="text-sm sm:text-base lg:text-lg">{faq.q}</span>
                  <span className="w-8 h-8 rounded-xl bg-surface-container dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-on-surface-variant dark:text-slate-300">
                    <span className="material-symbols-outlined text-[20px]">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-on-surface-variant dark:text-slate-300 leading-relaxed border-t border-surface-container/60 dark:border-slate-800 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
