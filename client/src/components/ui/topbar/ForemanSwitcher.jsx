import React from 'react';
import { useForemanPersona } from '../../../context/ForemanPersonaContext';
import { FiDatabase, FiChevronDown, FiUser } from 'react-icons/fi';

const ForemanSwitcher = () => {
  const { 
    foremen, 
    selectedForeman, 
    selectedForemanId, 
    setSelectedForemanId,
    isLoading 
  } = useForemanPersona();

  if (isLoading) return null;

  return (
    <div className="relative group px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3 transition-all hover:border-blue-400">
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-1.5 mb-0.5">
          <FiDatabase className="text-blue-600 dark:text-blue-400 text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Dev Database Mode
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Mode Mandor: <span className="text-blue-600 dark:text-blue-400">{selectedForeman?.name || 'Pilih...'}</span>
          </span>
          <FiChevronDown className="text-slate-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>

      <select 
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={selectedForemanId || ''}
        onChange={(e) => setSelectedForemanId(e.target.value)}
      >
        <option value="" disabled>Pilih Mandor...</option>
        {foremen.map(f => (
          <option key={f.id} value={f.id}>
            {f.name} — {f._count?.projects || 0} Proyek
          </option>
        ))}
      </select>
    </div>
  );
};

export default ForemanSwitcher;
