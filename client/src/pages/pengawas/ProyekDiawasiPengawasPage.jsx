import React, { useState } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiMapPin, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProyekDiawasiPengawasPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("aktif");

    const projects = [
        { id: "PRJ-001", name: "Renovasi Rumah Budi", customer: "Budi Santoso", location: "Bandung, Jabar", status: "active", progress: 65, currentStage: "Pasang Keramik", mandor: "Ahmad" },
        { id: "PRJ-002", name: "Ruko Maria Ulfa", customer: "Maria Ulfa", location: "Jakarta Selatan", status: "needs_verification", progress: 12, currentStage: "Pondasi", mandor: "Hendra" },
        { id: "PRJ-003", name: "Gudang PT. MJ", customer: "PT. Maju Jaya", location: "Surabaya", status: "active", progress: 92, currentStage: "Finishing Cat", mandor: "Yusuf" },
    ];

    const subtabs = [
        { id: "aktif", label: "Aktif" },
        { id: "needs_verification", label: "Butuh Verifikasi" },
        { id: "delayed", label: "Terlambat" },
        { id: "completed", label: "Selesai" },
    ];

    const getStatusLabel = (status) => {
        const mapping = {
            active: { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
            needs_verification: { text: "Butuh Verifikasi", color: "bg-amber-500/10 text-amber-500" },
            delayed: { text: "Terlambat", color: "bg-red-500/10 text-red-500" },
            completed: { text: "Selesai", color: "bg-blue-500/10 text-blue-500" },
        };
        return mapping[status] || { text: status, color: "bg-slate-500/10 text-slate-500" };
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Proyek Diawasi</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Monitoring progres harian dan kendala lapangan pada proyek yang ditugaskan.</p>
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
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari nama proyek atau customer..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                        <FiFilter /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Lokasi & Mandor</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Tahapan Saat Ini</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Progress</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((prj) => (
                                <tr key={prj.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{prj.id}</span>
                                            <span className="text-sm font-bold">{prj.name}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">{prj.customer}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--dashboard-text-soft)]">
                                                <FiMapPin size={10} /> {prj.location}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--dashboard-primary)] uppercase tracking-tighter">
                                                <FiUser size={10} /> Mandor {prj.mandor}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-bold">{prj.currentStage}</span>
                                            <span className={`w-fit px-2 py-0.5 rounded text-[8px] font-black uppercase ${getStatusLabel(prj.status).color}`}>
                                                {getStatusLabel(prj.status).text}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 w-32">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)]">{prj.progress}%</span>
                                            <div className="w-full h-1 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                                <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: `${prj.progress}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <Link 
                                            to={`/pengawas/proyek/${prj.id}`}
                                            className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                        >
                                            DETAIL <FiChevronRight />
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

export default ProyekDiawasiPengawasPage;
