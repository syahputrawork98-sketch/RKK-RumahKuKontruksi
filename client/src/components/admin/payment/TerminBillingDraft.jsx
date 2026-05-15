import React from "react";
import { FiCheckCircle, FiClock, FiAlertCircle, FiArrowRight, FiFilePlus } from "react-icons/fi";

const TerminBillingDraft = ({ projectId, projectProgress = 45, projectValue = 1250000000, onCreateDraft }) => {
    // Stage data (can be derived from settings or props)
    const stages = [
        { id: 1, name: "Down Payment (DP)", targetProgress: 0, paymentPercent: 30, status: "PAID" },
        { id: 2, name: "Pekerjaan Struktur Selesai", targetProgress: 40, paymentPercent: 30, status: "READY" },
        { id: 3, name: "Pekerjaan Finishing Selesai", targetProgress: 85, paymentPercent: 30, status: "PENDING" },
        { id: 4, name: "Serah Terima Kunci (Retensi)", targetProgress: 100, paymentPercent: 10, status: "PENDING" }
    ];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 gap-4">
                {stages.map((stage, index) => {
                    const isEligible = projectProgress >= stage.targetProgress;
                    const amount = (stage.paymentPercent / 100) * projectValue;
                    
                    return (
                        <div key={stage.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black shadow-sm border ${stage.status === 'PAID' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                    {index + 1}
                                </div>
                                
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nama Termin</p>
                                        <p className="text-sm font-black text-slate-800">{stage.name}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Progres</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                                                <div className="h-full bg-blue-600" style={{ width: `${stage.targetProgress}%` }}></div>
                                            </div>
                                            <p className="text-xs font-bold text-slate-600">{stage.targetProgress}%</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pembayaran</p>
                                        <p className="text-xs font-bold text-slate-900">{stage.paymentPercent}% - {formatCurrency(amount)}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Kelayakan</p>
                                        <div className="flex items-center gap-2">
                                            {stage.status === 'PAID' ? (
                                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tight flex items-center gap-1.5">
                                                    <FiCheckCircle /> Sudah Terbayar
                                                </span>
                                            ) : isEligible ? (
                                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-tight flex items-center gap-1.5 animate-pulse">
                                                    <FiAlertCircle /> Siap Ditagihkan
                                                </span>
                                            ) : (
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                                                    <FiClock /> Menunggu Progress
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    {stage.status !== 'PAID' && (
                                        <button 
                                            disabled={!isEligible}
                                            onClick={() => onCreateDraft({
                                                type: 'TERMIN',
                                                itemName: stage.name,
                                                amount: amount,
                                                stageId: stage.id
                                            })}
                                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isEligible ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-105' : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'}`}
                                        >
                                            <FiFilePlus /> Buat Draft
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TerminBillingDraft;
