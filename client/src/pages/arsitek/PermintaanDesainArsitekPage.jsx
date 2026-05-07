import React, { useState } from "react";
import { FiSearch, FiFilter, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const PermintaanDesainArsitekPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("aktif");

    const requests = [
        { id: "DR-005", customer: "Ibu Siti Aminah", type: "Rumah Minimalis", location: "Bandung, Jawa Barat", status: "assigned", deadline: "12 Mei 2026", progress: 0, revisions: 0 },
        { id: "DR-004", customer: "Bpk. Heru", type: "Ruko 3 Lantai", location: "Jakarta Selatan", status: "in_design", deadline: "10 Mei 2026", progress: 45, revisions: 1 },
        { id: "DR-003", customer: "PT. Global Jaya", type: "Interior Kantor", location: "Surabaya, Jawa Timur", status: "revision_requested", deadline: "08 Mei 2026", progress: 85, revisions: 2 },
        { id: "DR-002", customer: "Bpk. Ahmad", type: "Villa Tropis", location: "Bali", status: "ready_to_convert", deadline: "05 Mei 2026", progress: 100, revisions: 1 },
    ];

    const subtabs = [
        { id: "aktif", label: "Aktif" },
        { id: "waiting_review", label: "Menunggu Review" },
        { id: "revision", label: "Revisi Diminta" },
        { id: "ready", label: "Siap Handover" },
        { id: "riwayat", label: "Riwayat" },
    ];

    const getStatusLabel = (status) => {
        const mapping = {
            assigned: { text: "Ditugaskan", color: "bg-blue-500/10 text-blue-500" },
            in_design: { text: "Dalam Desain", color: "bg-emerald-500/10 text-emerald-500" },
            waiting_customer_review: { text: "Menunggu Review", color: "bg-amber-500/10 text-amber-500" },
            revision_requested: { text: "Revisi Diminta", color: "bg-red-500/10 text-red-500" },
            ready_to_convert: { text: "Siap Handover", color: "bg-purple-500/10 text-purple-500" },
            converted_to_project: { text: "Jadi Proyek", color: "bg-slate-500/10 text-slate-500" },
        };
        return mapping[status] || { text: status, color: "bg-slate-500/10 text-slate-500" };
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Permintaan Desain</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Kelola seluruh permintaan desain arsitektur dari tahap brief hingga handover.</p>
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

            <div className="dashboard-card">
                {/* FILTERS */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari ID, customer, atau lokasi..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                            <FiFilter />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Permintaan</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer & Lokasi</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Deadline</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Progres</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[var(--dashboard-primary)]">{req.id}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter">{req.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{req.customer}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">{req.location}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusLabel(req.status).color}`}>
                                            {getStatusLabel(req.status).text}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold">{req.deadline}</span>
                                            <span className="text-[9px] text-[var(--dashboard-text-soft)] font-bold uppercase">{req.revisions} Revisi</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 w-32">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)]">{req.progress}%</span>
                                            <div className="w-full h-1 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                                <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: `${req.progress}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <Link 
                                            to={`/arsitek/permintaan-desain/${req.id}`}
                                            className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                        >
                                            DETAIL
                                            <FiChevronRight />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PermintaanDesainArsitekPage;
