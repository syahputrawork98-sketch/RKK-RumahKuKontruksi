import React from 'react';
import { FiShield } from "react-icons/fi";
import { getConstructionTransitionFlags } from "../../../utils/designRequestHistory";
import HoldStateCard from "../shared/HoldStateCard";
import InfoWarningBox from "../shared/InfoWarningBox";

const ConstructionTransitionReviewPanel = ({ 
    history, 
    finalReviewNote, 
    setFinalReviewNote, 
    onSubmit, 
    submitting 
}) => {
    const flags = getConstructionTransitionFlags(history);
    const isReadyForReview = flags.hasConstructionIntent && flags.isMandorReady && flags.isReadinessReady;

    if (!isReadyForReview) {
        return (
            <HoldStateCard 
                title="Transition Review" 
                icon={FiShield} 
                message="Tersedia setelah Intent, Mandor Prep, dan Readiness Prep selesai." 
            />
        );
    }

    return (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-800 text-white rounded-lg"><FiShield size={14} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Final Transition Review</h4>
                </div>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[8px] font-black uppercase rounded">Administrative Gate</span>
            </div>

            <InfoWarningBox type="info" message="Review ini menandakan bahwa semua persiapan transisi ke konstruksi telah diverifikasi oleh Admin." />

            <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Final Review Note</label>
                <textarea
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-500/20 resize-none min-h-[100px]"
                    placeholder="Tulis ringkasan review final sebelum project planning dimulai..."
                    value={finalReviewNote}
                    onChange={(e) => setFinalReviewNote(e.target.value)}
                />
            </div>

            <button
                onClick={onSubmit}
                disabled={submitting || !finalReviewNote.trim()}
                className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
                {submitting ? "Menyimpan..." : "Submit Final Transition Review"}
            </button>
        </div>
    );
};

export default ConstructionTransitionReviewPanel;
