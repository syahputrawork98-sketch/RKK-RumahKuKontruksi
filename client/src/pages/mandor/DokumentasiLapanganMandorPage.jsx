import React, { useState } from "react";
import { FiCamera, FiMaximize2, FiCalendar } from "react-icons/fi";

const DokumentasiLapanganMandorPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("today");

    const documentations = [
        { id: 1, project: "PRJ-001", stage: "Pasang Keramik", date: "07 Mei 2026", note: "KM Utama Selesai", url: "https://placehold.co/400x300?text=Keramik+Harian" },
        { id: 2, project: "PRJ-001", stage: "Pasang Keramik", date: "07 Mei 2026", note: "Persiapan Ruang Tamu", url: "https://placehold.co/400x300?text=Persiapan+Tamu" },
        { id: 3, project: "PRJ-002", stage: "Pondasi", date: "07 Mei 2026", note: "Cek Galian Sloof", url: "https://placehold.co/400x300?text=Galian+Pondasi" },
    ];

    const subtabs = [
        { id: "today", label: "Foto Hari Ini" },
        { id: "stage", label: "Per Tahapan" },
        { id: "review", label: "Menunggu Review" },
        { id: "archive", label: "Arsip" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Dokumentasi Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Unggah bukti visual pekerjaan harian untuk keperluan logbook dan verifikasi.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiCamera /> Ambil & Unggah Foto
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentations.map((doc) => (
                    <div key={doc.id} className="dashboard-card p-0 overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden bg-slate-200">
                            <img src={doc.url} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="Field Doc" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                <button className="p-3 bg-white rounded-full text-[var(--dashboard-primary)] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                                    <FiMaximize2 size={20} />
                                </button>
                            </div>
                            <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 bg-black/60 text-white text-[8px] font-black uppercase rounded backdrop-blur-sm border border-white/20">
                                    {doc.project}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)]">
                                <span>{doc.stage}</span>
                                <div className="flex items-center gap-1 text-[var(--dashboard-text-soft)]">
                                    <FiCalendar size={10} /> {doc.date}
                                </div>
                            </div>
                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold italic truncate leading-relaxed">"{doc.note}"</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DokumentasiLapanganMandorPage;
