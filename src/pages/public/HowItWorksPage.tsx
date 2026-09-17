import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const HowItWorksPage: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const steps = [
    {
      number: 1,
      title: 'Connect Your Fleet',
      subtitle: 'Plug-and-play IoT Telematics & CAN-bus OBD-II hardware installation',
      description: 'Install low-latency Smart Bus 360 IoT dongles or connect existing GPS telematics feeds into our cloud platform within minutes.',
      icon: 'power_plug',
      details: [
        'Plug OBD-II / J1939 CAN-bus telemetry module into bus dashboard',
        'Automatic vehicle profile auto-discovery & DTC code sync',
        'Pairs with driver smartphone app & passenger counter cameras'
      ],
      previewTag: 'Zero Downtime Onboarding'
    },
    {
      number: 2,
      title: 'Monitor Operations',
      subtitle: 'Centralized 360 Command Center & live telemetry tracking',
      description: 'Stream sub-second bus coordinates, engine RPM, vehicle health, driver safety scores, and active trip timelines into a unified console.',
      icon: 'radar',
      details: [
        'Live 50ms GPS map rendering with color-coded speed indicators',
        'Real-time geo-fence alerts for depot entry/exit and route deviation',
        'Instant emergency SOS broadcast button with automated video lock'
      ],
      previewTag: 'Sub-Second Real-Time Telemetry'
    },
    {
      number: 3,
      title: 'Analyze Performance',
      subtitle: 'Continuous data harvesting across fuel, drivers, and work orders',
      description: 'Harvest operational telemetry to identify deadhead km waste, driver harsh braking patterns, fuel siphoning anomalies, and depot turnaround time.',
      icon: 'insights',
      details: [
        'Driver safety scorecards (0-100) generated automatically per shift',
        'Fuel theft detection algorithms comparing tank level drop vs distance',
        'Maintenance expense breakdown per vehicle make & model'
      ],
      previewTag: '100% Operational Transparency'
    },
    {
      number: 4,
      title: 'Predict Problems',
      subtitle: 'AI machine learning algorithms forecasting breakdowns & surges',
      description: 'Predict mechanical component failures 72 hours early, forecast passenger surge hours by stop, and identify accident-prone road stretches.',
      icon: 'psychology',
      details: [
        'Predictive brake pad, battery, and alternator failure notifications',
        'Passenger demand forecasting model utilizing weather & event data',
        'High-risk driver behavior warnings prior to safety incidents'
      ],
      previewTag: 'Proactive Zero-Failure Operations'
    },
    {
      number: 5,
      title: 'Optimize Operations',
      subtitle: 'Autonomous AI dispatch, smart schedules & route optimization',
      description: 'Let Smart Bus 360 recommendation models optimize timetables, re-route buses around traffic jams, and automate driver shift pairings.',
      icon: 'auto_mode',
      details: [
        '1-Click AI route optimization saving up to 24% fuel expenditure',
        'Smart shift roster pairing considering driver rest rules & fatigue',
        'Automated dispatch board balancing bus loads during peak hours'
      ],
      previewTag: 'Autonomous Dispatch Recommendations'
    },
    {
      number: 6,
      title: 'Improve Passenger Experience',
      subtitle: 'Accurate ETAs, live bus occupancy, and comfortable rides',
      description: 'Deliver sub-minute ETA predictions to passenger mobile apps, provide real-time seat availability indicators, and ensure smooth on-time transit.',
      icon: 'sentiment_very_satisfied',
      details: [
        'Hyper-accurate arrival ETAs factoring live traffic congestion',
        'Passenger occupancy indicators (Seats Available / Standing / Full)',
        'Digital QR code ticket scanning & automated passenger feedback'
      ],
      previewTag: 'World-Class Passenger Loyalty'
    }
  ];

  const currentStep = steps.find(s => s.number === selectedStep) || steps[0];

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE TITLE */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 text-xs font-bold border border-primary/20">
          6-Step Operational Pipeline
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          How <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Smart Bus 360</span> Works
        </h1>
        <p className="text-base text-on-surface-variant dark:text-slate-300">
          From hardware telemetry connection to autonomous AI dispatch and passenger satisfaction.
        </p>
      </div>

      {/* STEP PROCESS TIMELINE PIPELINE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step) => {
          const isSelected = selectedStep === step.number;
          return (
            <button
              key={step.number}
              onClick={() => setSelectedStep(step.number)}
              className={`p-4 rounded-3xl text-left border transition-all flex flex-col justify-between h-32 relative ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary shadow-xl scale-105 z-10 font-bold'
                  : 'bg-surface-container-lowest dark:bg-slate-900 border-surface-container dark:border-slate-800 text-on-surface dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary dark:text-indigo-400'}`}>
                  0{step.number}
                </span>
                <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
              </div>
              <div className="text-xs font-extrabold truncate mt-2">{step.title}</div>
            </button>
          );
        })}
      </div>

      {/* DETAILED INTERACTIVE STEP DISPLAY CARD */}
      <div className="p-8 sm:p-12 rounded-[36px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-primary text-on-primary font-black text-sm flex items-center justify-center shadow-md">
              0{currentStep.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
              {currentStep.previewTag}
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-black text-on-surface dark:text-white tracking-tight">
              {currentStep.title}
            </h2>
            <h3 className="text-sm font-semibold text-primary dark:text-indigo-400 mt-1">
              {currentStep.subtitle}
            </h3>
            <p className="text-xs text-on-surface-variant dark:text-slate-300 mt-3 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-on-surface dark:text-slate-200 uppercase tracking-wider">Key Step Highlights:</span>
            {currentStep.details.map((detail, dIdx) => (
              <div key={dIdx} className="flex items-start gap-3 text-xs text-on-surface-variant dark:text-slate-300 font-medium">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={() => setSelectedStep(prev => (prev % 6) + 1)}
              className="px-6 py-3 rounded-2xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <span>Next Step: 0{((currentStep.number % 6) + 1)}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">{currentStep.icon}</span>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">STEP-0{currentStep.number}-PREVIEW</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live Pipeline Status</span>
              <div className="text-sm font-bold text-white">{currentStep.title} • Active</div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(currentStep.number / 6) * 100}%` }}></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/50 space-y-2">
              <span className="text-[10px] font-bold text-indigo-300 uppercase">Smart Bus 360 Engine Output</span>
              <p className="text-xs text-slate-300 font-mono">
                {currentStep.number === 1 && '>> IoT Telemetry handshake verified. CAN-bus polling active.'}
                {currentStep.number === 2 && '>> Streaming 128 buses live coordinates to Command Center.'}
                {currentStep.number === 3 && '>> Harvesting fuel & driver safety score telemetry...'}
                {currentStep.number === 4 && '>> AI Alert: Alternator risk on BUS-1042 in 48 hrs.'}
                {currentStep.number === 5 && '>> Autonomous reroute applied: 18 mins saved on Route 21A.'}
                {currentStep.number === 6 && '>> Passenger ETAs broadcasted. On-time rating: 99.4%.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <NavLink
              to="/register"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-xs text-center block text-white shadow-lg"
            >
              Experience Step 0{currentStep.number} Live in Platform ➔
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
