import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";

const AdminProjectHeader = ({ project, onBack, isReady }) => {
    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan") || s?.includes("berjalan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("persiapan") || s?.includes("plan") || s?.includes("planning")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        if (s?.includes("stop") || s?.includes("terhenti")) return "bg-red-500/10 text-red-500 border-red-500/20";
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
                {(!['active', 'ongoing', 'Berjalan'].includes(project.status)) && isReady && (
                    <Link 
                        to="/admin/proyek/aktivasi"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 mr-2 animate-pulse"
                    >
                        Aktifkan Proyek
                    </Link>
                )}
                <Link 
                    to={`/admin/proyek/edit/${project.id}`}
                    className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold hover:bg-[var(--dashboard-border)] transition-all"
                >
                    Edit Proyek
                </Link>
                <button disabled title="Menu tambahan (Hold)" className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-300 cursor-not-allowed">
                    <FiMoreVertical />
                </button>
            </div>
        </div>
    );
};

export default AdminProjectHeader;
