import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const VendorManagementPage: React.FC = () => {
  const { vendors, addVendor } = useData();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Fuel' | 'Spare Parts' | 'Maintenance' | 'Technology'>('Spare Parts');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contactPerson) {
      addVendor({
        name,
        category,
        contactPerson,
        phone,
        email,
        activeContracts: 1,
        totalSpend: 50000,
        performanceRating: 4.5,
        status: 'active'
      });
      setIsModalOpen(false);
      setName('');
      setContactPerson('');
    }
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-on-surface dark:text-slate-100 truncate">Vendor & Procurement Directory</h2>
          <p className="text-xs text-outline dark:text-slate-400 truncate">Managing fuel suppliers, spare parts distributors, maintenance partners, and tech vendors</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-full bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_business</span>
          Add Enterprise Vendor
        </button>
      </div>

      {/* Vendors Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
        <div className="table-container no-scrollbar">
        <table className="w-full text-left border-collapse text-xs min-w-[750px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4">Vendor Company</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Contact Person</th>
              <th className="py-3 px-4">Active Contracts</th>
              <th className="py-3 px-4">Total Spend (₹)</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {vendors.map(v => (
              <tr key={v.id} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">{v.name}</td>
                <td className="py-3.5 px-4 font-semibold text-primary dark:text-indigo-400">{v.category}</td>
                <td className="py-3.5 px-4 font-medium text-on-surface dark:text-slate-200">
                  {v.contactPerson}
                  <span className="block text-[10px] text-outline dark:text-slate-400">{v.phone} • {v.email}</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">{v.activeContracts} Contract(s)</td>
                <td className="py-3.5 px-4 font-extrabold text-on-surface dark:text-slate-100">₹{v.totalSpend.toLocaleString()}</td>
                <td className="py-3.5 px-4 font-bold text-amber-500">{v.performanceRating} / 5 ⭐</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase">
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <form onSubmit={handleAddVendorSubmit} className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 w-full max-w-md shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-base text-on-surface dark:text-slate-100">Register New Vendor</h3>

            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100 outline-none"
              >
                <option value="Fuel">Fuel</option>
                <option value="Spare Parts">Spare Parts</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Contact Person</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-surface-container dark:bg-slate-800 text-xs font-bold rounded-xl">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl shadow">
                Save Vendor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
