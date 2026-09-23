import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const AIOperationsAssistantPage: React.FC = () => {
  const { buses, drivers, trips, aiRecommendations, applyAIRecommendation } = useData();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; recId?: string }>>([
    { sender: 'ai', text: 'Hello! I am SmartBus AI, your autonomous transportation operations assistant. How can I optimize your fleet today?' }
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const sampleQueries = [
    'Which buses need maintenance?',
    'Which route is delayed?',
    'Which drivers have high risk?',
    'Where should I deploy another bus?',
    "What is today's fuel consumption?"
  ];

  const handleSendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg = { sender: 'user' as const, text: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    const q = queryText.toLowerCase();
    let replyText = '';

    if (q.includes('maintenance')) {
      const maint = buses.filter(b => b.status === 'maintenance');
      replyText = `Currently, ${maint.length} vehicles are under maintenance: ${maint.map(b => `${b.registrationNumber} (${b.depotLocation})`).join(', ')}.`;
    } else if (q.includes('delayed') || q.includes('delay')) {
      const del = trips.filter(t => t.status === 'delayed');
      replyText = del.length > 0
        ? `Trip #${del[0].id} on Route ${del[0].routeCode} is currently delayed due to: ${del[0].delayReason || 'Congestion'}.`
        : 'All active trips are currently operating on schedule!';
    } else if (q.includes('risk') || q.includes('driver')) {
      const highRisk = drivers.filter(d => d.safetyScore < 90);
      replyText = `Driver ${highRisk[0]?.name || 'Vijay Kumar'} has a safety score of ${highRisk[0]?.safetyScore || 84}/100 with harsh braking telemetry alerts.`;
    } else if (q.includes('deploy') || q.includes('bus')) {
      replyText = `Passenger density analytics recommend deploying +1 additional bus on Route 21A (Gandhipuram ➔ Singanallur) during morning peak hours (08:00 - 09:00 AM).`;
    } else if (q.includes('fuel')) {
      replyText = `Today's total fuel & energy spend is ₹11,400 with an average fleet efficiency of 4.6 km/L.`;
    } else {
      replyText = `Analyzed operational telemetry for "${queryText}". All 142 fleet assets are being actively monitored by the SmartBus 360 AI gateway.`;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: replyText }]);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="AI Operations Assistant"
        badge="Autonomous Fleet AI"
        subtitle="Conversational AI operations engine with automated recommendation execution."
        breadcrumb="Intelligence"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start min-w-0">
        {/* Left Interactive Chat Interface */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 h-[480px] sm:h-[550px] min-w-0">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 sm:pr-2 no-scrollbar min-w-0">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 sm:gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  m.sender === 'user' ? 'bg-primary text-on-primary' : 'bg-indigo-600 text-white shadow-stitch-float'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {m.sender === 'user' ? 'person' : 'smart_toy'}
                  </span>
                </div>
                <div className={`p-3 sm:p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed break-words ${
                  m.sender === 'user'
                    ? 'bg-primary text-on-primary font-medium'
                    : 'bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-100 border border-surface-container-high dark:border-slate-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Query Chips */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-surface-container dark:border-slate-800 min-w-0">
            {sampleQueries.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSendQuery(sq)}
                className="px-2.5 py-1 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-primary hover:text-on-primary text-[11px] font-semibold text-on-surface-variant dark:text-slate-300 transition-colors truncate max-w-full"
              >
                💡 {sq}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputQuery);
            }}
            className="flex items-center gap-2 pt-2 min-w-0"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask SmartBus AI about routes, drivers, maintenance..."
              className="flex-1 min-w-0 px-3.5 sm:px-4 py-2.5 bg-surface-container dark:bg-slate-800 rounded-full text-xs text-on-surface dark:text-slate-100 outline-none border border-transparent dark:border-slate-700 focus:ring-2 focus:ring-primary/30"
            />
            <button type="submit" className="p-2.5 rounded-full bg-primary text-on-primary font-bold shadow hover:scale-105 transition-transform flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

        {/* Right AI Recommendation Cards */}
        <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 min-w-0">
          <div className="flex justify-between items-center border-b border-surface-container dark:border-slate-800 pb-3 min-w-0">
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100 truncate">Live AI Recommendations</h3>
            <span className="material-symbols-outlined text-indigo-500 flex-shrink-0">auto_awesome</span>
          </div>

          <div className="flex flex-col gap-4 min-w-0">
            {aiRecommendations.map(rec => (
              <div key={rec.id} className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 border border-slate-700/40 flex flex-col gap-2.5 min-w-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-1 min-w-0">
                  <span className="font-bold text-xs text-on-surface dark:text-slate-100 truncate">{rec.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex-shrink-0">
                    {rec.confidencePercent}% Confidence
                  </span>
                </div>
                <p className="text-[11px] text-outline dark:text-slate-300 break-words">{rec.description}</p>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold break-words">
                  Impact: {rec.impactText}
                </div>

                <button
                  onClick={() => applyAIRecommendation(rec.id)}
                  disabled={rec.isApplied}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition-all text-center leading-snug ${
                    rec.isApplied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-primary text-on-primary hover:bg-primary/90 shadow'
                  }`}
                >
                  {rec.isApplied ? '✓ Recommendation Applied' : `Apply: ${rec.actionLabel}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
