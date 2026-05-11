import React from 'react';
import { FiShield } from "react-icons/fi";
import { 
    hasConstructionIntent, 
    isMandorPreparationReady,
    hasHistoryAction
} from "../../../utils/designRequestHistory";
import CandidateCard from "../shared/CandidateCard";
import HoldStateCard from "../shared/HoldStateCard";
import ChecklistItem from "../shared/ChecklistItem";

const ConstructionReadinessPreparationPanel = ({ 
    history, 
    supervisors, 
    selectedSupervisorIds, 
    toggleSupervisorSelection, 
    readinessNote, 
    setReadinessNote, 
    onSubmit, 
    submitting 
}) => {
    const hasIntent = hasConstructionIntent(history);
    const isMandorReady = isMandorPreparationReady(history);
    const isReadyForPrep = hasIntent && isMandorReady;

    if (!isReadyForPrep) {
        let holdMessage = "Tersedia setelah Mandor Selection Preparation selesai dilakukan.";
        if (!hasIntent) {
            holdMessage = "Tersedia setelah Konsumen memilih 'Continue to Construction Preparation'.";
        }

        return (
            <HoldStateCard 
                title="Readiness Prep" 
                icon={FiShield} 
                message={holdMessage} 
            />
        );
    }

    return (
        <div className="p-6 bg-white border border-blue-200 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 text-white rounded-lg"><FiShield size={14} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-900">Construction Readiness</h4>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[8px] font-black uppercase rounded">Preparation Layer</span>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-3">
                <h5 className="text-[9px] font-black text-blue-800 uppercase tracking-widest">Readiness Checklist</h5>
                <div className="space-y-2">
                    <ChecklistItem isDone={hasIntent} label="Customer Decision: Continue to Construction" />
                    <ChecklistItem isDone={isMandorReady} label="Mandor Selection Preparation: Shortlisted" />
                    <ChecklistItem isDone={selectedSupervisorIds.length > 0} label="Supervisor Candidate Prepared" />
                    <ChecklistItem isDone={hasHistoryAction(history, 'admin_curated_instruction')} label="Project Planning Instruction Exists" />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Pilih Kandidat Pengawas</label>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                    {supervisors.length > 0 ? supervisors.map(s => (
                        <CandidateCard 
                            key={s.id}
                            candidate={s}
                            isSelected={selectedSupervisorIds.includes(s.id)}
                            onToggle={toggleSupervisorSelection}
                            typeColor="blue"
                            avatarLetter="P"
                        />
                    )) : (
                        <p className="text-[10px] text-gray-400 italic text-center py-4">Memuat data Pengawas...</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Readiness Note</label>
                <textarea
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none min-h-[80px]"
                    placeholder="Tulis catatan kesiapan teknis atau kriteria pengawas..."
                    value={readinessNote}
                    onChange={(e) => setReadinessNote(e.target.value)}
                />
            </div>

            <button
                onClick={onSubmit}
                disabled={submitting || (selectedSupervisorIds.length === 0 && !readinessNote.trim())}
                className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
                {submitting ? "Menyimpan..." : "Simpan Readiness Prep"}
            </button>
        </div>
    );
};

export default ConstructionReadinessPreparationPanel;
