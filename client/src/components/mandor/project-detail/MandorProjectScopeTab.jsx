import React from "react";
import { FiLayers, FiAlertCircle } from "react-icons/fi";
import { formatDateShort } from "./MandorProjectDetailUIHelpers";

const MandorProjectScopeTab = ({ stages }) => {
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan") || s?.includes("berjalan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Rencana Tahapan Pekerjaan (Scope)</h3>
            </div>

            {stages.length > 0 ? (
                <div className="space-y-3">
                    {stages.map((stg) => (
                        <div key={stg.id} className="p-5 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-blue-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 uppercase">#{stg.order}</span>
                                    <h4 className="text-sm font-black group-hover:text-blue-600 transition-colors">{stg.title}</h4>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusColor(stg.status)}`}>
                                    {stg.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Durasi</span>
                                    <span className="text-xs font-bold">{stg.durationDays || 0} Hari</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Jadwal</span>
                                    <span className="text-xs font-bold text-slate-600">{formatDateShort(stg.startDate)} - {formatDateShort(stg.endDate)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Site Progress</span>
                                        <span className="text-[10px] font-black text-blue-600">{stg.progress || 0}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-500 rounded-full transition-all duration-700" 
                                            style={{ width: `${stg.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-[var(--dashboard-border)] rounded-[3rem]">
                    <FiLayers size={48} className="text-slate-200 mb-4" />
                    <p className="text-sm font-bold text-slate-400">Belum ada tahapan pekerjaan yang diinput Admin.</p>
                </div>
            )}

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase">
                    Tahapan di atas diatur oleh Admin. Anda hanya dapat melaporkan progres melalui menu "Jurnal Mingguan" yang nanti akan diverifikasi oleh Pengawas.
                </p>
            </div>
        </div>
    );
};

export default MandorProjectScopeTab;
