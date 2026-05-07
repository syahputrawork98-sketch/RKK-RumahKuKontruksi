import React from 'react';
import { useArchitectPersona } from '../../../context/ArchitectPersonaContext';
import { FiDatabase, FiChevronDown } from 'react-icons/fi';

const ArchitectSwitcher = () => {
  const { 
    architects, 
    selectedArchitect, 
    selectedArchitectId, 
    setSelectedArchitectId,
    loading 
  } = useArchitectPersona();

  if (loading) return null;

  return (
    <div className="relative group px-4 py-1.5 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg flex items-center gap-3 transition-all hover:border-purple-400">
      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-1.5 mb-0.5">
          <FiDatabase className="text-purple-600 dark:text-purple-400 text-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Dev Database Mode
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Mode Arsitek: <span className="text-purple-600 dark:text-purple-400">{selectedArchitect?.name || 'Pilih...'}</span>
          </span>
          <FiChevronDown className="text-slate-400 group-hover:text-purple-500 transition-colors" />
        </div>
      </div>

      <select 
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={selectedArchitectId || ''}
        onChange={(e) => setSelectedArchitectId(e.target.value)}
      >
        <option value="" disabled>Pilih Arsitek...</option>
        {architects.map(a => (
          <option key={a.id} value={a.id}>
            {a.name} — {a.specialization}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ArchitectSwitcher;
