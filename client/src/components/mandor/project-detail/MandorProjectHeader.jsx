import React from "react";
import { FiArrowLeft, FiClock } from "react-icons/fi";

const MandorProjectHeader = ({ project, onBack }) => {
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan") || s?.includes("berjalan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black tracking-tight">{project.projectCode}</h2>
                        <span className={`px-3 py-0.5 text-[10px] font-black uppercase rounded-full border ${getStatusColor(project.status)}`}>
                            {project.status}
                        </span>
                    </div>
                    <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{project.name}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <FiClock className="animate-spin-slow" /> Construction Phase
                    </span>
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tighter">Site Op: ACTIVE</span>
                </div>
            </div>
        </div>
    );
};

export default MandorProjectHeader;
