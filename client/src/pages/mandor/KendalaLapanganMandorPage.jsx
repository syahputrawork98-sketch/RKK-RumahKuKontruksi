import React, { useState } from "react";
import { FiAlertTriangle, FiPlus, FiClock, FiCheckCircle, FiChevronRight } from "react-icons/fi";

const KendalaLapanganMandorPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("active");

    const issues = [
        { id: 1, project: "PRJ-001", issue: "Material Semen Telat", category: "Logistik", priority: "high", date: "07 Mei 2026", status: "active", note: "Menunggu pengiriman dari gudang pusat." },
        { id: 2, project: "PRJ-001", issue: "Cuaca Hujan Lebat", category: "Alam", priority: "medium", date: "07 Mei 2026", status: "waiting_follow_up", note: "Pekerjaan outdoor dihentikan sementara." },
    ];

    const subtabs = [
        { id: "active", label: "Aktif" },
        { id: "follow_up", label: "Menunggu Tindak Lanjut" },
        { id: "resolved", label: "Selesai" },
        { id: "archive", label: "Riwayat" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Kendala Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Laporkan hambatan atau masalah teknis untuk mendapatkan bantuan segera.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all">
                    <FiPlus /> Lapor Kendala Baru
                </button>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {issues.map((issue) => (
                    <div key={issue.id} className="dashboard-card border-l-4 border-l-red-500">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{issue.project}</span>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                        issue.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                                    }`}>
                                        {issue.priority} Priority
                                    </span>
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                                        {issue.category}
                                    </span>
                                </div>
                                <h4 className="text-base font-bold text-red-600">{issue.issue}</h4>
                                <p className="text-xs font-medium text-[var(--dashboard-text-soft)] leading-relaxed italic">
                                    "{issue.note}"
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                    <div className="flex items-center gap-1">
                                        <FiClock /> Dilaporkan: {issue.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiCheckCircle /> Status: {issue.status === "active" ? "AKTIF" : "DITINDAKLANJUTI"}
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-48 flex flex-col justify-center gap-2">
                                <button className="w-full py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2">
                                    Detail Kendala <FiChevronRight />
                                </button>
                                <button className="w-full py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                                    Tandai Selesai
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KendalaLapanganMandorPage;
