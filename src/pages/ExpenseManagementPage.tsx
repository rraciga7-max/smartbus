import React, { useState } from 'react';
import { useData } from '../context/DataContext';

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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Enterprise Expense & Cost Management</h2>
        <p className="text-xs text-outline dark:text-slate-400">Budget vs actual expenditure audit across fuel, maintenance, payroll, and parts</p>
      </div>

      {/* Variance KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Total Budget Allocated</span>
          <p className="text-2xl font-black text-on-surface dark:text-slate-100 mt-1">₹{totalBudget.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Actual Expenditure</span>
          <p className="text-2xl font-black text-primary dark:text-indigo-400 mt-1">₹{totalActual.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-surface-container dark:border-slate-800 shadow-stitch-sm">
          <span className="text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">Budget Variance</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            +₹{variance.toLocaleString()} <span className="text-xs font-normal text-slate-400">(Under Budget)</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Expense Creation Form */}
        <form onSubmit={handleAddExpenseSubmit} className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
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

        {/* Expenses List Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md overflow-x-auto">
          <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3 mb-4">
            Expense Audit Trail Log
          </h3>

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
  );
};
