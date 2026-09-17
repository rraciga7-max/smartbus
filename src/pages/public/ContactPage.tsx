import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'Sales Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }
    if (!formData.company.trim()) newErrors.company = 'Company / Authority name is required';
    if (!formData.message.trim()) newErrors.message = 'Please provide details of your request';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate network submission
    await new Promise(resolve => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast('Your message has been sent successfully to Smart Bus 360 Sales Team!', 'success');
  };

  return (
    <div className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-indigo-950 text-primary dark:text-indigo-400 text-xs font-bold border border-primary/20">
          Get in Touch With Operations Specialists
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-on-surface dark:text-white tracking-tight">
          Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">Smart Bus 360</span>
        </h1>
        <p className="text-base text-on-surface-variant dark:text-slate-300">
          Have questions about fleet integration, AI route optimization, enterprise pricing, or custom hardware support?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT COLUMN: CONTACT CHANNELS & ASSISTANCE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-[32px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">Global Assistance Desk</h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">storefront</span>
                </div>
                <div>
                  <span className="font-bold text-on-surface dark:text-slate-200">Enterprise Sales</span>
                  <p className="text-on-surface-variant dark:text-slate-400 mt-0.5">sales@smartbus360.com</p>
                  <p className="text-[11px] text-outline dark:text-slate-500 mt-1">Mon–Fri 8 AM – 8 PM EST</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">support_agent</span>
                </div>
                <div>
                  <span className="font-bold text-on-surface dark:text-slate-200">24/7 Technical Support</span>
                  <p className="text-on-surface-variant dark:text-slate-400 mt-0.5">support@smartbus360.com</p>
                  <p className="text-[11px] text-outline dark:text-slate-500 mt-1">24/7 SLA Telematics Support Desk</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">call</span>
                </div>
                <div>
                  <span className="font-bold text-on-surface dark:text-slate-200">Emergency Hotline</span>
                  <p className="text-on-surface-variant dark:text-slate-400 mt-0.5">+1 (800) 555-BUS360</p>
                  <p className="text-[11px] text-outline dark:text-slate-500 mt-1">Priority Operations Escalation</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container dark:border-slate-800">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary dark:text-indigo-400 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="material-symbols-outlined text-[20px]">help_outline</span>
                  <span>Have quick technical questions?</span>
                </div>
                <NavLink to="/faq" className="text-xs font-black underline hover:opacity-80">
                  Explore FAQ ➔
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-[36px] bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-xl space-y-6">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="text-2xl font-extrabold text-on-surface dark:text-white">Message Delivered</h3>
                <p className="text-xs text-on-surface-variant dark:text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>! Your inquiry regarding <strong>{formData.subject}</strong> has been assigned ticket ID <strong>#SB360-REQ-{Math.floor(1000 + Math.random() * 9000)}</strong>. Our team will contact you within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', company: '', phone: '', subject: 'Sales Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl border border-outline/30 text-xs font-bold text-primary dark:text-indigo-400 hover:bg-surface-container dark:hover:bg-slate-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-on-surface dark:text-slate-100">Send an Enterprise Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface dark:text-slate-200">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-medium outline-none transition-all ${
                        errors.name ? 'border-error text-error' : 'border-transparent focus:border-primary'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-error font-semibold">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface dark:text-slate-200">Work Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@citytransit.gov"
                      className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-medium outline-none transition-all ${
                        errors.email ? 'border-error text-error' : 'border-transparent focus:border-primary'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-error font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface dark:text-slate-200">Company / Transit Authority *</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Metropolitan Transit Board"
                      className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-medium outline-none transition-all ${
                        errors.company ? 'border-error text-error' : 'border-transparent focus:border-primary'
                      }`}
                    />
                    {errors.company && <p className="text-[11px] text-error font-semibold">{errors.company}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface dark:text-slate-200">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-medium outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Inquiry Category</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border border-transparent focus:border-primary text-xs font-semibold outline-none"
                  >
                    <option value="Sales Inquiry">Enterprise Sales & Fleet Pricing</option>
                    <option value="Technical Support">Technical & Hardware Support</option>
                    <option value="API Integration">API Integration & Telemetry</option>
                    <option value="Partnership">Channel Partnership & Dealer Program</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface dark:text-slate-200">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your fleet size, current telematics provider, and operational goals..."
                    className={`w-full px-4 py-3 rounded-2xl bg-surface-container dark:bg-slate-800 border text-xs font-medium outline-none transition-all ${
                      errors.message ? 'border-error text-error' : 'border-transparent focus:border-primary'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-error font-semibold">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-primary text-on-primary font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
