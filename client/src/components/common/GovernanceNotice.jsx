import React from "react";
import { FiShield, FiAlertCircle } from "react-icons/fi";

const GovernanceNotice = ({ roleName = "Pengguna" }) => {
  return (
    <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
          <FiShield size={20} />
        </div>
        <div>
          <h4 className="text-sm font-black uppercase tracking-widest text-indigo-900">Governance Profil Lokal</h4>
          <p className="text-[10px] font-bold text-indigo-700/70">Local Profile Governance v1</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-3">
          <FiAlertCircle className="text-indigo-500 shrink-0 mt-0.5" size={14} />
          <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
            Setiap persona ({roleName}) hanya diperbolehkan mengelola data profil miliknya sendiri dalam lingkungan simulasi lokal ini.
          </p>
        </div>
        
        <div className="flex gap-3">
          <FiAlertCircle className="text-indigo-500 shrink-0 mt-0.5" size={14} />
          <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
            Perubahan pada field identitas rill, data perusahaan, atau sertifikat penting akan diarahkan ke alur **Review & Approval Admin/Superadmin** pada tahap pengembangan berikutnya (Planned Workflow).
          </p>
        </div>
        
        <div className="pt-2">
          <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-black uppercase text-indigo-700 tracking-tighter italic">Status: Local Simulation Phase / Hold Governance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceNotice;
