import React, { useState } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiMapPin, FiUsers, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProyekAktifMandorPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("today");

    const projects = [
        { id: "PRJ-001", name: "Renovasi Rumah Budi", customer: "Budi Santoso", location: "Bandung", status: "active", progress: 65, currentStage: "Keramik", targetToday: "Selesai KM Utama", pengawas: "Fauzi", workers: 8 },
        { id: "PRJ-002", name: "Ruko Maria Ulfa", customer: "Maria Ulfa", location: "Jakarta", status: "needs_update", progress: 12, currentStage: "Pondasi", targetToday: "Cek Galian", pengawas: "Bambang", workers: 4 },
    ];

    const subtabs = [
        { id: "today", label: "Aktif Hari Ini" },
        { id: "needs_update", label: "Butuh Update" },
        { id: "delayed", label: "Terlambat" },
        { id: "completed", label: "Selesai" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Proyek Aktif</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar proyek dalam eksekusi tim lapangan harian.</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((prj) => (
                    <div key={prj.id} className="dashboard-card group hover:border-[var(--dashboard-primary)]/50 transition-all p-0 overflow-hidden">
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{prj.id}</span>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                            prj.status === "active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                        }`}>
                                            {prj.status === "active" ? "Aktif" : "Butuh Update"}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black leading-tight">{prj.name}</h3>
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase mt-0.5">{prj.customer}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase">Progress</p>
                                    <p className="text-2xl font-black text-[var(--dashboard-primary)]">{prj.progress}%</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[var(--dashboard-surface-soft)] rounded-xl text-[var(--dashboard-text-soft)]">
                                        <FiMapPin size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Lokasi</p>
                                        <p className="text-xs font-bold">{prj.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[var(--dashboard-surface-soft)] rounded-xl text-[var(--dashboard-text-soft)]">
                                        <FiUsers size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Pekerja</p>
                                        <p className="text-xs font-bold">{prj.workers} Orang</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-dashed border-[var(--dashboard-border)]">
                                <div className="flex items-center gap-2 mb-1 text-[var(--dashboard-primary)]">
                                    <FiClock size={12} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Target Hari Ini</span>
                                </div>
                                <p className="text-xs font-bold italic">"{prj.targetToday}"</p>
                            </div>
                        </div>

                        <div className="p-4 bg-[var(--dashboard-surface-soft)] border-t border-[var(--dashboard-border)] flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-tighter">Pengawas: {prj.pengawas}</span>
                            <Link 
                                to={`/mandor/proyek-aktif/${prj.id}`}
                                className="flex items-center gap-1 text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase tracking-widest"
                            >
                                Detail <FiChevronRight />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProyekAktifMandorPage;
