import React from "react";
import { FiLayers, FiPlus, FiMessageSquare, FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDateShort } from "./ProjectDetailUIHelpers";

const AdminProjectStagesTab = ({ 
    project, 
    stages, 
    onAddStage, 
    onEditStage, 
    onDeleteStage, 
    onCommentClick 
}) => {
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan") || s?.includes("berjalan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("persiapan") || s?.includes("plan") || s?.includes("planning")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        if (s?.includes("stop") || s?.includes("terhenti")) return "bg-red-500/10 text-red-500 border-red-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Daftar Tahap Pekerjaan (Stages)</h3>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                            Visibility: Global Timeline Preparation
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1 italic">* Visibility control formal (Hold/Planned)</span>
                    </div>
                    <button 
                        onClick={onAddStage}
                        disabled={project.status === 'Selesai'}
                        className={`flex items-center gap-2 px-4 py-2 text-white rounded-xl text-xs font-bold shadow-lg transition-all ${
                            project.status === 'Selesai' 
                            ? "bg-slate-300 shadow-none cursor-not-allowed" 
                            : "bg-[var(--dashboard-primary)] shadow-[var(--dashboard-primary)]/20 hover:scale-105"
                        }`}
                    >
                        <FiPlus /> {project.status === 'Selesai' ? "Read-Only" : "Tambah Stage"}
                    </button>
                </div>
            </div>

            {stages.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Order</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Stage</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-center">Minggu</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stages.map((stg) => (
                                <tr key={stg.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-all">
                                    <td className="py-4 px-2 text-xs font-black text-[var(--dashboard-text-soft)]">#{stg.order}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black uppercase tracking-tight">{stg.code}</span>
                                            <span className="text-sm font-bold">{stg.title}</span>
                                            <div className="flex items-center gap-2 text-[9px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter mt-0.5">
                                                <span>{stg.durationDays || 0} Hari</span>
                                                <span>•</span>
                                                <span>{formatDateShort(stg.startDate)} - {formatDateShort(stg.endDate)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-xs font-bold text-center">W-{stg.week || 1}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${getStatusColor(stg.status)}`}>
                                            {stg.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button 
                                                onClick={() => onCommentClick(stg)}
                                                className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                                title="Timeline Konsumen"
                                            >
                                                <FiMessageSquare size={14} />
                                            </button>
                                            <button 
                                                onClick={() => onEditStage(stg)}
                                                disabled={project.status === 'Selesai'}
                                                className={`p-2 rounded-lg transition-all ${
                                                    project.status === 'Selesai' ? "text-slate-300 cursor-not-allowed" : "text-blue-500 hover:bg-blue-50"
                                                }`}
                                            >
                                                <FiEdit2 size={14} />
                                            </button>
                                            {!stg.isVerified && project.status !== 'Selesai' && (
                                                <button 
                                                    onClick={() => onDeleteStage(stg.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[var(--dashboard-border)] rounded-3xl">
                    <FiLayers size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                    <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">Belum ada tahapan pekerjaan.</p>
                    <button 
                        onClick={onAddStage}
                        disabled={project.status === 'Selesai'}
                        className={`mt-4 text-xs font-black uppercase tracking-widest transition-all ${
                            project.status === 'Selesai' ? "text-slate-300 cursor-not-allowed" : "text-[var(--dashboard-primary)] hover:underline"
                        }`}
                    >
                        {project.status === 'Selesai' ? "Mode Read-Only" : "Buat Stage Pertama"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminProjectStagesTab;
