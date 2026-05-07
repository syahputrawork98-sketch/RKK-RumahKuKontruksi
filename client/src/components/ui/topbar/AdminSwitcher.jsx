import React from 'react';
import { useAdminPersona } from '../../../context/AdminPersonaContext';
import { FiMonitor, FiChevronDown } from 'react-icons/fi';

const AdminSwitcher = () => {
  const { 
    admins, 
    selectedAdmin, 
    selectedAdminId, 
    selectAdmin,
    loading,
    error 
  } = useAdminPersona();

  if (loading) {
    return (
      <div className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg animate-pulse">
        <span className="text-xs text-indigo-400">Loading Admins...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-1.5 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block leading-none mb-1">Error</span>
        <span className="text-xs text-red-500 font-medium">{error}</span>
      </div>
    );
  }

  return (
    <div className="relative group px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg flex items-center gap-3 transition-all hover:border-indigo-400">
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-1.5 mb-0.5">
          <FiMonitor className="text-indigo-600 dark:text-indigo-400 text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Admin Dev Persona
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Login Sebagai: <span className="text-indigo-600 dark:text-indigo-400">{selectedAdmin?.name || 'Pilih...'}</span>
          </span>
          <FiChevronDown className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
      </div>

      <select 
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={selectedAdminId || ''}
        onChange={(e) => selectAdmin(e.target.value)}
      >
        <option value="" disabled>Pilih Admin...</option>
        {admins.map(a => (
          <option key={a.id} value={a.id}>
            {a.name} — {a.role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdminSwitcher;
