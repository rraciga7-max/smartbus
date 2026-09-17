import React, { useState } from 'react';
import { useData } from '../context/DataContext';

export const UserRoleManagementPage: React.FC = () => {
  const { userRoles } = useData();

  const allRoles = [
    'Super Admin',
    'Transport Manager',
    'Fleet Manager',
    'Dispatcher',
    'Maintenance Manager',
    'Driver Manager',
    'Finance Manager',
    'Safety Officer',
    'Driver'
  ];

  const [matrix, setMatrix] = useState<Record<string, { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean; approve: boolean }>>({
    'Super Admin': { view: true, create: true, edit: true, delete: true, export: true, approve: true },
    'Transport Manager': { view: true, create: true, edit: true, delete: false, export: true, approve: true },
    'Fleet Manager': { view: true, create: true, edit: true, delete: false, export: true, approve: false },
    'Dispatcher': { view: true, create: true, edit: true, delete: false, export: true, approve: false },
    'Maintenance Manager': { view: true, create: true, edit: true, delete: false, export: true, approve: true },
    'Driver Manager': { view: true, create: true, edit: true, delete: false, export: true, approve: false },
    'Finance Manager': { view: true, create: true, edit: true, delete: true, export: true, approve: true },
    'Safety Officer': { view: true, create: true, edit: true, delete: false, export: true, approve: true },
    'Driver': { view: true, create: false, edit: false, delete: false, export: false, approve: false }
  });

  const togglePermission = (role: string, perm: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'approve') => {
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [perm]: !prev[role][perm]
      }
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-on-surface dark:text-slate-100">Enterprise Users & Role Access Matrix</h2>
        <p className="text-xs text-outline dark:text-slate-400">Configure RBAC security policies across 9 enterprise role tiers and granular permission flags</p>
      </div>

      {/* Role Permission Matrix Table */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md overflow-x-auto">
        <h3 className="font-bold text-base text-on-surface dark:text-slate-100 border-b border-surface-container dark:border-slate-800 pb-3 mb-4">
          Role Permission Matrix (View, Create, Edit, Delete, Export, Approve)
        </h3>

        <table className="w-full text-left border-collapse text-xs min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-container dark:border-slate-800 text-outline dark:text-slate-400 uppercase font-bold">
              <th className="py-3 px-4">Enterprise Role</th>
              <th className="py-3 px-4 text-center">View</th>
              <th className="py-3 px-4 text-center">Create</th>
              <th className="py-3 px-4 text-center">Edit</th>
              <th className="py-3 px-4 text-center">Delete</th>
              <th className="py-3 px-4 text-center">Export</th>
              <th className="py-3 px-4 text-center">Approve</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/60 dark:divide-slate-800 text-xs">
            {allRoles.map(role => {
              const perms = matrix[role] || { view: true, create: false, edit: false, delete: false, export: false, approve: false };

              return (
                <tr key={role} className="hover:bg-surface-container/40 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-bold text-on-surface dark:text-slate-100">{role}</td>
                  {(['view', 'create', 'edit', 'delete', 'export', 'approve'] as const).map(p => (
                    <td key={p} className="py-3.5 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={perms[p]}
                        onChange={() => togglePermission(role, p)}
                        className="w-4 h-4 rounded text-primary cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Accounts List */}
      <div className="bg-surface-container-lowest dark:bg-slate-900 rounded-[28px] p-6 border border-surface-container dark:border-slate-800 shadow-stitch-md flex flex-col gap-4">
        <h3 className="font-bold text-base text-on-surface dark:text-slate-100">Registered System Users</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {userRoles.map(usr => (
            <div key={usr.id} className="p-4 rounded-2xl bg-surface-container dark:bg-slate-800 flex items-center gap-3">
              <img src={usr.avatar} alt={usr.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <span className="font-bold text-sm text-on-surface dark:text-slate-100">{usr.name}</span>
                <p className="text-xs font-semibold text-primary dark:text-indigo-400">{usr.role}</p>
                <p className="text-[11px] text-outline dark:text-slate-400">{usr.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
