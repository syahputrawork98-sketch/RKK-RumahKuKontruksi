import React from 'react';
import { FiActivity } from "react-icons/fi";
import { getLatestCustomerPostDesignDecision } from "../../../utils/designRequestHistory";

const PostDesignDecisionMonitorPanel = ({ history }) => {
    const latestDecision = getLatestCustomerPostDesignDecision(history);
    const decision = latestDecision?.metadata?.decision;

    if (!decision) {
        return (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-[2rem] opacity-60">
                <div className="flex items-center gap-2 mb-2">
                    <FiActivity className="text-gray-400" size={16} />
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Decision Monitor (Hold)</h4>
                </div>
                <p className="text-[9px] text-gray-400 font-bold italic leading-relaxed">
                    Menunggu keputusan akhir dari Konsumen setelah desain disetujui.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white border border-emerald-200 rounded-[2rem] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg"><FiActivity size={14} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-900">Post-Design Decision</h4>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase rounded">Customer Action</span>
            </div>
            
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Keputusan Konsumen:</p>
                <p className="text-sm font-black text-emerald-900">
                    {decision === 'continue_to_construction_preparation' ? 'Lanjut ke Persiapan Konstruksi' : 'Hanya Selesai Desain/RAB'}
                </p>
                <p className="text-[10px] text-emerald-600 mt-2 font-medium">
                    Diterima pada: {new Date(latestDecision.createdAt).toLocaleString('id-ID')}
                </p>
            </div>

            {decision === 'continue_to_construction_preparation' && (
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-[9px] text-indigo-800 font-bold leading-relaxed uppercase italic">
                        Hint: Proses tender Mandor dan assignment Pengawas untuk proyek ini akan ditangani pada batch pengembangan berikutnya.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PostDesignDecisionMonitorPanel;
