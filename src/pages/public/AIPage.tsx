import React from 'react';
import { NavLink } from 'react-router-dom';

export const AIPage: React.FC = () => {
  const aiModules = [
    {
      title: 'AI Operations Assistant',
      icon: 'smart_toy',
      tagline: 'Autonomous conversational AI dispatcher',
      problem: 'Operators lose critical minutes digging through complex tables during active transit incidents and peak rush-hour delays.',
      aiAnalysis: 'Natural language processing (LLM) engine ingests live telemetry, active driver logs, and weather sensors in real-time.',
      prediction: 'Identifies operational bottlenecks, schedule gaps, and driver fatigue risks automatically.',
      recommendation: 'Proposes 1-click autonomous reroutes, bus swaps, and driver shift adjustments directly to dispatchers.',
      businessImpact: 'Saves 2.5 hours per dispatcher daily and reduces peak-hour resolution time by 75%.'
    },
    {
      title: 'Predictive Maintenance Engine',
      icon: 'build_circle',
      tagline: '72-Hour early breakdown warning algorithm',
      problem: 'Component failures during active passenger routes cause expensive towing charges, passenger stranding, and route disruption.',
      aiAnalysis: 'Deep learning models process 40+ CAN-bus diagnostic parameters (oil pressure, coolant temp, battery voltage, brake pad wear).',
      prediction: 'Calculates breakdown probability for every vehicle 72 hours prior to mechanical failure.',
      recommendation: 'Generates automated maintenance work orders and reserves spare parts at the nearest depot.',
      businessImpact: 'Prevents 85% of unexpected roadside breakdowns and lowers spare parts inventory holding by 20%.'
    },
    {
      title: 'Demand Forecasting',
      icon: 'trending_up',
      tagline: 'Stop-level passenger surge prediction model',
      problem: 'Transit fleets suffer from over-crowded buses on heavy corridors while empty buses run on low-demand routes.',
      aiAnalysis: 'Time-series forecasting models analyze 24 months of ticket scans, weather forecasts, holiday calendars, and city events.',
      prediction: 'Predicts exact hourly passenger boarding volume per bus stop up to 7 days in advance.',
      recommendation: 'Recommends dynamic headway spacing and deploys extra relief buses to high-demand corridors.',
      businessImpact: '+28% ticket revenue capture and 98% passenger satisfaction rating.'
    },
    {
      title: 'AI Route Optimizer',
      icon: 'alt_route',
      tagline: 'Dynamic traffic rerouting & fuel saver',
      problem: 'Static timetables fail when traffic jams, road construction, or monsoon rains block key transit corridors.',
      aiAnalysis: 'Multi-variable graph neural networks evaluate live traffic speeds, road slope, stop dwell times, and fuel burn rates.',
      prediction: 'Detects upcoming traffic bottlenecks 15 minutes before the bus reaches the congestion zone.',
      recommendation: 'Calculates alternative turns saving minutes and streams reroute instructions to driver dashboard.',
      businessImpact: '18% fuel expenditure savings and 14-minute average trip duration reduction.'
    },
    {
      title: 'Driver Risk Analytics',
      icon: 'minor_crash',
      tagline: 'Continuous telematic safety scoring',
      problem: 'Unmonitored aggressive driving (speeding, tailgating, harsh braking) causes high accident rates and excessive tire/brake wear.',
      aiAnalysis: 'Computer vision & G-sensor telemetry evaluate driver steering smoothness, acceleration spikes, and eye-gaze fatigue.',
      prediction: 'Identifies high-risk driver behavior trends before accidents occur.',
      recommendation: 'Provides automated driver coaching micro-modules and safety scorecards after every shift.',
      businessImpact: '42% reduction in preventable accidents and 15% lower vehicle brake/tire wear.'
    },
    {
      title: 'Fuel Anomaly & Theft Detection',
      icon: 'local_gas_station',
      tagline: 'Real-time fuel siphoning protection',
      problem: 'Fuel theft and unauthorized siphoning at depots or night parking lots cost operators up to 20% of fuel budgets.',
      aiAnalysis: 'Correlation algorithms cross-reference CAN-bus fuel tank sensor drops against GPS movement, ignition state, and fuel pump receipts.',
      prediction: 'Flags suspicious fuel level drops within 3 minutes of occurrence.',
      recommendation: 'Triggers instant security SMS alerts with exact GPS location, fuel volume lost, and vehicle ID.',
      businessImpact: 'Eliminates unmonitored fuel theft anomalies and delivers 100% fuel receipt audit accountability.'
    }
  ];

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 min-w-0">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4 min-w-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-purple-400 text-xs font-bold border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Next-Gen Machine Learning & Telematics AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Smart Bus 360 <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-primary">AI Engine</span>
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300">
          Autonomous transit intelligence predicting breakdowns, optimizing routes, and protecting fuel assets in real-time.
        </p>
      </div>

      {/* AI MODULE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 min-w-0">
        {aiModules.map((mod, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-8 rounded-[28px] sm:rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6 hover:border-indigo-500/40 transition-all flex flex-col justify-between min-w-0"
          >
            <div className="space-y-4 min-w-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[28px]">{mod.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-purple-400 border border-indigo-500/20">
                  {mod.tagline}
                </span>
              </div>

              <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">{mod.title}</h3>

              {/* 5-Step Breakdown */}
              <div className="space-y-3 pt-2 text-xs min-w-0">
                <div className="p-3.5 rounded-2xl bg-error/5 dark:bg-error/10 border border-error/10 min-w-0">
                  <div className="font-bold text-error uppercase text-[10px] tracking-wider mb-1">🚨 Problem</div>
                  <div className="text-on-surface-variant dark:text-slate-300 leading-relaxed">{mod.problem}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-slate-800/60 min-w-0">
                  <div className="font-bold text-primary dark:text-indigo-400 uppercase text-[10px] tracking-wider mb-1">🧠 AI Analysis</div>
                  <div className="text-on-surface-variant dark:text-slate-300 leading-relaxed">{mod.aiAnalysis}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-500/5 dark:bg-purple-950/20 border border-purple-500/20 min-w-0">
                  <div className="font-bold text-purple-600 dark:text-purple-400 uppercase text-[10px] tracking-wider mb-1">🔮 Prediction</div>
                  <div className="text-on-surface-variant dark:text-slate-300 leading-relaxed">{mod.prediction}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 min-w-0">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] tracking-wider mb-1">💡 Recommendation & Impact</div>
                  <div className="text-on-surface-variant dark:text-slate-300 leading-relaxed">
                    <strong>Recommendation:</strong> {mod.recommendation}
                  </div>
                  <div className="mt-2 text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] flex-shrink-0">trending_up</span>
                    <span className="leading-snug">{mod.businessImpact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA BANNER */}
      <div className="text-center pt-8">
        <NavLink
          to="/ai-assistant"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          <span>Explore Smart Bus 360 AI Assistant</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </NavLink>
      </div>
    </div>
  );
};
