import React from 'react';
import { useSuperadminPersona } from '../../../context/SuperadminPersonaContext';
import { FiShield, FiChevronDown } from 'react-icons/fi';

const SuperadminSwitcher = () => {
  const { 
    superadmins, 
    selectedSuperadmin, 
    selectedSuperadminId, 
    selectSuperadmin,
    loading,
    error 
  } = useSuperadminPersona();

  if (loading) {
    return (
      <div className="px-4 py-1.5 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-lg animate-pulse">
        <span className="text-xs text-rose-400">Loading Superadmins...</span>
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
    <div className="relative group px-4 py-1.5 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-lg flex items-center gap-3 transition-all hover:border-rose-400">
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-1.5 mb-0.5">
          <FiShield className="text-rose-600 dark:text-rose-400 text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Superadmin Dev Persona
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Login Sebagai: <span className="text-rose-600 dark:text-rose-400">{selectedSuperadmin?.name || 'Pilih...'}</span>
          </span>
          <FiChevronDown className="text-slate-400 group-hover:text-rose-500 transition-colors" />
        </div>
      </div>

      <select 
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={selectedSuperadminId || ''}
        onChange={(e) => selectSuperadmin(e.target.value)}
      >
        <option value="" disabled>Pilih Superadmin...</option>
        {superadmins.map(sa => (
          <option key={sa.id} value={sa.id}>
            {sa.name} — {sa.role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SuperadminSwitcher;
