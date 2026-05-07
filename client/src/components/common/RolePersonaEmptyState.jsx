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
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
        {title}
      </h2>
      <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>{actionLabel}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RolePersonaEmptyState;
