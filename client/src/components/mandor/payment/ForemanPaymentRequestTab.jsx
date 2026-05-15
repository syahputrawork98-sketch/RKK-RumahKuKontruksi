import React from "react";
import { FiFileText, FiClock, FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo, FiLayers, FiCalendar } from "react-icons/fi";

const ForemanPaymentRequestTab = ({ requests = [], onCreateClick, canRequest }) => {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'eligible': return 'bg-emerald-500 text-white border-transparent';
            case 'partial': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'hold': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'correction_required': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'paid_simulated': return 'bg-slate-900 text-white border-transparent';
            case 'archived': return 'bg-slate-200 text-slate-500 border-slate-300';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    const getRecommendationBadge = (rec) => {
        if (!rec) return { label: 'Menunggu Review', style: 'text-slate-400 italic' };
        switch (rec.toLowerCase()) {
            case 'eligible': return { label: 'Layak Dibayar', style: 'text-emerald-600 font-black' };
            case 'partial': return { label: 'Partial / Sebagian', style: 'text-amber-600 font-black' };
            case 'not_eligible': return { label: 'Belum Layak', style: 'text-rose-600 font-black' };
            default: return { label: 'Menunggu Review', style: 'text-slate-400' };
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-1">Daftar Pengajuan Operasional</h4>
                    <p className="text-xs font-bold text-slate-500 ml-2">Total {requests.length} data ditemukan</p>
                </div>
                <button 
                    disabled={!canRequest}
                    onClick={onCreateClick}
                    className={`w-full md:w-auto px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 ${canRequest ? 'bg-blue-600 text-white shadow-blue-500/20 hover:scale-[1.02]' : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'}`}
                >
                    <FiFileText /> Buat Pengajuan Baru
                </button>
            </div>

            {/* Request List */}
            <div className="grid grid-cols-1 gap-6">
                {requests.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center bg-white border border-slate-100 rounded-[2.5rem]">
                        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                            <FiFileText size={64} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Belum Ada Pengajuan</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Data pengajuan akan muncul setelah Jurnal Mingguan direview.</p>
                    </div>
                ) : (
                    requests.map(req => {
                        const rec = getRecommendationBadge(req.supervisorRecommendation);
                        return (
                            <div key={req.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:border-blue-500/30 transition-all group">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center text-xl shadow-sm border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                                                    <FiFileText />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-slate-800 tracking-tight">
                                                        {req.period ? `Minggu ke-${req.weekNumber || '?'} (${req.period})` : (req.title || 'Pengajuan Operasional')}
                                                    </h3>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{req.project?.name || req.projectName || 'Project RKK'} • <span className="text-blue-600">{req.documentCode || req.id.substring(0,8).toUpperCase()}</span></p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 border rounded-full text-[8px] font-black uppercase tracking-widest ${getStatusStyle(req.status)}`}>
                                                {(req.status || 'pending').replace(/_/g, ' ')}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Diajukan</p>
                                                <p className="text-lg font-black text-slate-900 tracking-tight">{formatCurrency(req.totalAmount || req.amount)}</p>
                                            </div>
                                            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rekomendasi Pengawas</p>
                                                <p className={`text-[10px] uppercase tracking-widest mt-2 flex items-center gap-2 ${rec.style}`}>
                                                    <FiCheckCircle size={12} /> {rec.label}
                                                </p>
                                            </div>
                                            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 overflow-hidden">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Catatan Admin</p>
                                                <p className="text-[10px] font-bold text-slate-500 mt-1 truncate">{req.adminNote || "-"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-48 flex flex-col justify-center gap-2">
                                        {(req.status === 'correction_required') && (
                                            <button className="w-full py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all">
                                                Perbaiki Data
                                            </button>
                                        )}
                                        <button className="w-full py-3 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Info Path */}
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-4 items-start shadow-sm">
                <FiInfo className="text-blue-500 shrink-0 mt-1" size={24} />
                <div className="space-y-1">
                    <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">Alur Pembayaran Mandor</h4>
                    <p className="text-[10px] text-blue-600 leading-relaxed font-bold uppercase italic tracking-tighter">
                        Review Jurnal {">"} Eligibility Terbentuk {">"} Verifikasi Admin {">"} Transfer Manual {">"} Update Status Lunas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForemanPaymentRequestTab;
