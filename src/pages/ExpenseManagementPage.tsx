import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageHeader } from '../components/common/PageHeader';

export const ExpenseManagementPage: React.FC = () => {
  const { expenses, addExpense } = useData();

  const [category, setCategory] = useState<'Fuel' | 'Maintenance' | 'Driver Payroll' | 'Operations' | 'Parts' | 'Other'>('Operations');
  const [amount, setAmount] = useState('15000');
  const [description, setDescription] = useState('Central Depot Water & Utility Bill');
  const [vendorName, setVendorName] = useState('Coimbatore Smart City Utilities');

  const totalActual = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = expenses.reduce((sum, e) => sum + e.budgetAmount, 0);
  const variance = totalBudget - totalActual;

  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      category,
      amount: Number(amount),
      budgetAmount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      description,
      vendorName,
      status: 'paid'
    });
    setDescription('');
    setAmount('');
  };

  return (
    <div className="flex flex-col gap-6 min-w-0">
      <PageHeader
        title="Expense Management"
        badge="Cost Control"
        subtitle="Budget vs actual expenditure audit across fuel, maintenance, payroll, and parts."
        breadcrumb="Finance"
      />

      {/* Variance KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-w-0">
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Total Budget Allocated</span>
          <p className="text-xl sm:text-2xl font-black text-on-surface dark:text-slate-100 mt-1 truncate">₹{totalBudget.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase truncate block">Actual Expenditure</span>
          <p className="text-xl sm:text-2xl font-black text-primary dark:text-indigo-400 mt-1 truncate">₹{totalActual.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm min-w-0">
          <span className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400 truncate block">Budget Variance</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 truncate">
            +₹{variance.toLocaleString()} <span className="text-xs font-normal text-slate-400">(Under)</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start min-w-0">
        {/* Expense Creation Form */}
        <form onSubmit={handleAddExpenseSubmit} className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4 min-w-0">
          <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3">
            Record Operational Expense
          </h3>

          <div>
            <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Expense Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
            >
              <option value="Fuel">Fuel</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Driver Payroll">Driver Payroll</option>
              <option value="Operations">Operations</option>
              <option value="Parts">Spare Parts</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Vendor / Payee Name</label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-outline dark:text-slate-400 uppercase mb-1">Expense Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-surface-container dark:bg-slate-800 rounded-xl text-xs font-bold text-on-surface dark:text-slate-100"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-lg hover:bg-primary/90">
            Submit Expense Entry
          </button>
        </form>

        {/* Expenses List Container */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-4 sm:p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md min-w-0">
          <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3 mb-4 truncate">
            Expense Audit Trail Log
          </h3>

          {/* Mobile View: Cards */}
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {expenses.map(e => (
              <div key={e.id} className="p-4 rounded-2xl bg-surface-container/40 dark:bg-slate-800/40 border border-surface-container/60 dark:border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-indigo-400">
                    {e.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-outline dark:text-slate-400">{e.id}</span>
                </div>
                <div>
                  <p className="font-semibold text-xs text-on-surface dark:text-slate-100">{e.description}</p>
                  <span className="text-[11px] text-outline dark:text-slate-400 block">{e.vendorName} • {e.date}</span>
                </div>
                <div className="pt-2 border-t border-surface-container/40 dark:border-slate-700/40 flex justify-between items-center text-xs">
                  <span className="text-outline dark:text-slate-400">Amount:</span>
                  <span className="font-black text-sm text-on-surface dark:text-slate-100">₹{e.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden sm:block table-container no-scrollbar">
          <table className="w-full text-left border-collapse text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
                <th className="py-3 px-4">Date & ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
              {expenses.map(e => (
                <tr key={e.id} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-primary dark:text-indigo-400">
                    {e.id}
                    <span className="block text-[10px] text-outline dark:text-slate-400 font-normal">{e.date}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-200">{e.category}</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-300">{e.description}</td>
                  <td className="py-3.5 px-4 text-outline dark:text-slate-400">{e.vendorName}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-on-surface dark:text-slate-100">
                    ₹{e.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};
