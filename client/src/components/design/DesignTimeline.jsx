import React from 'react';
import { FiUser, FiPenTool, FiShield, FiClock, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';

const DesignTimeline = ({ history = [], majorCount = 0, minorCount = 0 }) => {
  const getRoleConfig = (role) => {
    switch (role?.toLowerCase()) {
      case 'customer':
      case 'konsumen':
        return {
          icon: <FiUser />,
          color: 'bg-teal-500',
          textColor: 'text-teal-700',
          bgColor: 'bg-teal-50',
          label: 'Konsumen'
        };
      case 'architect':
      case 'arsitek':
        return {
          icon: <FiPenTool />,
          color: 'bg-indigo-500',
          textColor: 'text-indigo-700',
          bgColor: 'bg-indigo-50',
          label: 'Arsitek'
        };
      case 'admin':
        return {
          icon: <FiShield />,
          color: 'bg-slate-800',
          textColor: 'text-slate-800',
          bgColor: 'bg-slate-100',
          label: 'Admin'
        };
      default:
        return {
          icon: <FiClock />,
          color: 'bg-neutral-400',
          textColor: 'text-neutral-600',
          bgColor: 'bg-neutral-50',
          label: 'Sistem'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Revision Limits Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl border-2 ${majorCount >= 3 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Revisi Besar (Major)</span>
            <span className={`text-xs font-black ${majorCount >= 3 ? 'text-red-600' : 'text-slate-800'}`}>{majorCount}/3</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${majorCount >= 3 ? 'bg-red-500' : 'bg-indigo-500'}`} 
              style={{ width: `${Math.min(100, (majorCount / 3) * 100)}%` }} 
            />
          </div>
          {majorCount >= 3 && (
            <p className="text-[9px] font-bold text-red-600 mt-2 flex items-center gap-1 italic">
              <FiAlertCircle size={10} /> Limit tercapai. Hold per keputusan Admin.
            </p>
          )}
        </div>

        <div className={`p-4 rounded-2xl border-2 ${minorCount >= 5 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Revisi Kecil (Minor)</span>
            <span className={`text-xs font-black ${minorCount >= 5 ? 'text-red-600' : 'text-slate-800'}`}>{minorCount}/5</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${minorCount >= 5 ? 'bg-red-500' : 'bg-teal-500'}`} 
              style={{ width: `${Math.min(100, (minorCount / 5) * 100)}%` }} 
            />
          </div>
          {minorCount >= 5 && (
            <p className="text-[9px] font-bold text-red-600 mt-2 flex items-center gap-1 italic">
              <FiAlertCircle size={10} /> Limit tercapai. Hold per keputusan Admin.
            </p>
          )}
        </div>
      </div>

      {/* History Thread */}
      <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {history.length === 0 ? (
          <div className="pl-10 py-4 italic text-slate-400 text-xs font-medium uppercase tracking-widest">
            Belum ada aktivitas timeline desain.
          </div>
        ) : (
          history.map((log, idx) => {
            const config = getRoleConfig(log.actorRole);
            const isRevision = log.action.startsWith('revision_');
            
            return (
              <div key={log.id || idx} className="relative pl-10 animate-fadeIn">
                {/* Role Marker */}
                <div className={`absolute left-0 top-0 w-8 h-8 rounded-full ${config.color} text-white flex items-center justify-center shadow-lg z-10`}>
                  {config.icon}
                </div>

                <div className={`p-5 rounded-3xl border ${
                  isRevision ? 'border-amber-200 bg-amber-50/30' : 
                  log.action === 'admin_curated_instruction' ? 'border-indigo-200 bg-indigo-50/50 ring-2 ring-indigo-500/10 shadow-lg' :
                  log.action === 'admin_released_design_to_customer' ? 'border-teal-400 bg-teal-50 ring-2 ring-teal-500/10 shadow-md' :
                  log.action === 'customer_design_approved' ? 'border-emerald-600 bg-emerald-600 text-white shadow-xl' :
                  log.action === 'architect_started_work' ? 'border-emerald-200 bg-emerald-50/30' :
                  log.action === 'architect_ready_for_review' ? 'border-indigo-600 bg-indigo-600 text-white shadow-xl' :
                  'border-slate-100 bg-white'
                } shadow-sm group hover:border-indigo-200 transition-all`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${config.textColor} ${config.bgColor} px-2 py-0.5 rounded-md`}>
                        {config.label}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 mt-1">
                        {log.actorName || 'User RKK'}
                        {log.action === 'admin_curated_instruction' && (
                          <span className="ml-2 text-[9px] font-black text-indigo-600 uppercase border border-indigo-200 px-2 py-0.5 rounded-full bg-white">
                            Instruksi Terkurasi
                          </span>
                        )}
                        {log.action === 'admin_released_design_to_customer' && (
                          <span className="ml-2 text-[9px] font-black text-teal-600 uppercase border border-teal-200 px-2 py-0.5 rounded-full bg-white">
                            Release ke Konsumen
                          </span>
                        )}
                        {log.action === 'customer_design_approved' && (
                          <span className="ml-2 text-[9px] font-black text-white uppercase border border-white/20 px-2 py-0.5 rounded-full bg-white/10">
                            Persetujuan Desain
                          </span>
                        )}
                        {log.action === 'architect_ready_for_review' && (
                          <span className="ml-2 text-[9px] font-black text-white uppercase border border-white/20 px-2 py-0.5 rounded-full bg-white/10">
                            Siap Review
                          </span>
                        )}
                        {log.action === 'customer_post_design_decision' && (
                          <span className="ml-2 text-[9px] font-black text-indigo-600 uppercase border border-indigo-200 px-2 py-0.5 rounded-full bg-indigo-50">
                            Keputusan Pasca Desain
                          </span>
                        )}
                        {log.action === 'admin_mandor_selection_preparation' && (
                          <span className="ml-2 text-[9px] font-black text-emerald-600 uppercase border border-emerald-200 px-2 py-0.5 rounded-full bg-emerald-50">
                            Persiapan Seleksi Mandor
                          </span>
                        )}
                      </h4>
                    </div>
                    <div className="text-right">
                      <p className={`text-[10px] font-bold ${log.action === 'customer_design_approved' ? 'text-emerald-100' : 'text-slate-400'}`}>{new Date(log.createdAt).toLocaleDateString('id-ID')}</p>
                      <p className={`text-[9px] font-medium ${log.action === 'customer_design_approved' ? 'text-emerald-200' : 'text-slate-400'}`}>{new Date(log.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <FiMessageSquare className={`mt-1 flex-shrink-0 ${log.action === 'architect_ready_for_review' ? 'text-indigo-200' : 'text-slate-300'}`} size={14} />
                      <p className={`text-xs font-bold leading-relaxed whitespace-pre-wrap italic ${log.action === 'architect_ready_for_review' ? 'text-white' : 'text-slate-600'}`}>
                        "{log.note || 'Melakukan pembaruan pada desain.'}"
                      </p>
                    </div>

                    {isRevision && (
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-amber-200 text-amber-800`}>
                          {log.metadata?.revisionType === 'major' ? 'Revisi Besar' : 'Revisi Kecil'}
                        </span>
                      </div>
                    )}

                    {log.action === 'customer_post_design_decision' && log.metadata?.decision && (
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 border border-indigo-200`}>
                          Jalur: {log.metadata.decision === 'continue_to_construction_preparation' ? 'Continue to Construction' : 'Design/RAB Only'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
        <p className="text-[10px] text-indigo-700 font-bold leading-relaxed uppercase flex items-center gap-2">
          <FiInfo size={14} className="shrink-0" /> 
          <span>Local Simulation: Revision limits (3 Major / 5 Minor) are part of the v1 workflow for design quality control.</span>
        </p>
      </div>
    </div>
  );
};

export default DesignTimeline;
