import React from 'react';
import { useSupervisorPersona } from '../../../context/SupervisorPersonaContext';
import { FiDatabase, FiChevronDown, FiUser } from 'react-icons/fi';

const SupervisorSwitcher = () => {
  const { 
    supervisors, 
    selectedSupervisor, 
    selectedSupervisorId, 
    setSelectedSupervisorId,
    isLoading 
  } = useSupervisorPersona();

  if (isLoading) return null;

  return (
    <div className="relative group px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 rounded-lg flex items-center gap-3 transition-all hover:border-teal-400">
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-1.5 mb-0.5">
          <FiDatabase className="text-teal-600 dark:text-teal-400 text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Dev Database Mode
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Mode Pengawas: <span className="text-teal-600 dark:text-teal-400">{selectedSupervisor?.name || 'Pilih...'}</span>
          </span>
          <FiChevronDown className="text-slate-400 group-hover:text-teal-500 transition-colors" />
        </div>
      </div>

      <select 
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={selectedSupervisorId}
        onChange={(e) => setSelectedSupervisorId(e.target.value)}
      >
        {supervisors.map(s => (
          <option key={s.id} value={s.id}>
            {s.name} — {s._count?.projects || 0} Proyek
          </option>
        ))}
      </select>
    </div>
  );
};

export default SupervisorSwitcher;
