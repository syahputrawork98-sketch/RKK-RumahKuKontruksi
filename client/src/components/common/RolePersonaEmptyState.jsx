import React from 'react';

/**
 * Reusable empty state component when a role persona (Supervisor/Foreman) is not selected.
 */
const RolePersonaEmptyState = ({ 
  title = "Pilih Persona Terlebih Dahulu", 
  description, 
  actionLabel, 
  onAction,
  icon = "👤" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fadeIn min-h-[60vh] bg-white rounded-[40px] border border-neutral-100 shadow-xl">
      <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center text-5xl mb-8 shadow-inner border border-neutral-100/50">
        <span className="drop-shadow-md">{icon}</span>
      </div>
      <h2 className="text-3xl font-black text-neutral-800 mb-3 tracking-tighter uppercase">
        {title}
      </h2>
      <p className="text-sm text-neutral-400 max-w-md mx-auto mb-10 leading-relaxed font-medium italic">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center gap-3 group"
        >
          <span>{actionLabel}</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RolePersonaEmptyState;
