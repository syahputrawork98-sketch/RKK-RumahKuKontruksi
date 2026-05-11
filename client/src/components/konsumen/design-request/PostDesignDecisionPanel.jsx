import React from 'react';
import { FiCheckCircle, FiList } from "react-icons/fi";

const PostDesignDecisionPanel = ({ 
    selectedRequest, 
    onPostDesignDecision, 
    submitting 
}) => {
    const hasCustomerApproval = selectedRequest.history?.some(h => h.action === 'customer_design_approved');
    const latestDecision = (selectedRequest.history || [])
        .filter(h => h.action === 'customer_post_design_decision')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    if (!hasCustomerApproval) return null;

    return (
        <div className="pt-8 border-t border-gray-100 space-y-6">
            <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 text-center">
                <FiCheckCircle className="text-emerald-600 text-3xl mx-auto mb-2" />
                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-tight">Desain Telah Disetujui Lokal</h4>
                <p className="text-[9px] text-emerald-600 font-bold mt-1 uppercase tracking-tighter italic">
                    Persetujuan Anda telah dicatat dalam riwayat simulasi.
                </p>
            </div>

            <div className="p-6 bg-white border border-indigo-100 rounded-[2rem] shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                    <FiList className="text-indigo-600" size={16} />
                    <h4 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Keputusan Pasca Desain</h4>
                </div>
                
                {!latestDecision ? (
                    <div className="space-y-3">
                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed italic">
                            Silakan pilih langkah selanjutnya untuk pengajuan ini:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            <button
                                onClick={() => onPostDesignDecision('design_only_completed')}
                                disabled={submitting}
                                className="py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200"
                            >
                                Design/RAB Only Completed
                            </button>
                            <button
                                onClick={() => onPostDesignDecision('continue_to_construction_preparation')}
                                disabled={submitting}
                                className="py-3 px-4 bg-indigo-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                            >
                                Continue to Construction Preparation
                            </button>
                        </div>
                        <p className="text-[8px] text-indigo-400 font-bold italic leading-tight text-center pt-2">
                            * Keputusan ini membantu Admin dalam memproses pengajuan Anda berikutnya.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                            <p className="text-[9px] font-black text-indigo-800 uppercase tracking-widest">Keputusan Anda:</p>
                            <p className="text-xs font-black text-indigo-600 mt-1">
                                {latestDecision.metadata?.decision === 'design_only_completed' 
                                    ? "Design/RAB Only Completed" 
                                    : "Continue to Construction Preparation"}
                            </p>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold italic text-center">
                            Tercatat pada: {new Date(latestDecision.createdAt).toLocaleString('id-ID')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostDesignDecisionPanel;
