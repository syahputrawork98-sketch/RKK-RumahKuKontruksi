import React, { useState } from "react";
import { FiCamera, FiFilter, FiMaximize2, FiCalendar } from "react-icons/fi";

const DokumentasiLapanganPengawasPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("terbaru");

    const documentations = [
        { id: 1, project: "PRJ-001", stage: "Pasang Keramik", date: "07 Mei 2026", uploader: "Mandor Ahmad", url: "https://placehold.co/400x300?text=Keramik+PRJ001" },
        { id: 2, project: "PRJ-003", stage: "Finishing Cat", date: "07 Mei 2026", uploader: "Anda (Pengawas)", url: "https://placehold.co/400x300?text=Cat+PRJ003" },
        { id: 3, project: "PRJ-002", stage: "Pondasi", date: "05 Mei 2026", uploader: "Mandor Hendra", url: "https://placehold.co/400x300?text=Pondasi+PRJ002" },
        { id: 4, project: "PRJ-001", stage: "Instalasi Listrik", date: "04 Mei 2026", uploader: "Mandor Ahmad", url: "https://placehold.co/400x300?text=Listrik+PRJ001" },
    ];

    const subtabs = [
        { id: "terbaru", label: "Foto Terbaru" },
        { id: "tahapan", label: "Per Tahapan" },
        { id: "review", label: "Menunggu Review" },
        { id: "arsip", label: "Arsip" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Dokumentasi Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Koleksi bukti visual perkembangan pekerjaan fisik di lapangan.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiCamera /> Ambil Foto Baru
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold italic truncate">Oleh: {doc.uploader}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DokumentasiLapanganPengawasPage;
