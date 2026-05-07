import React, { useState } from "react";
import { FiCheckCircle, FiXCircle, FiInfo, FiSearch } from "react-icons/fi";

const VerifikasiProgresPengawasPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("waiting");

    const verificationRequests = [
        { id: 1, project: "PRJ-001 - Renovasi Budi", stage: "Tahap 2: Keramik", submittedProgress: "100%", submittedDate: "07 Mei 2026", requester: "Ahmad (Mandor)", status: "waiting_verification" },
        { id: 2, project: "PRJ-002 - Ruko Maria", stage: "Tahap 1: Pondasi", submittedProgress: "85%", submittedDate: "06 Mei 2026", requester: "Hendra (Mandor)", status: "needs_revision" },
    ];

    const subtabs = [
        { id: "waiting", label: "Menunggu Verifikasi" },
        { id: "verified", label: "Terverifikasi" },
        { id: "needs_revision", label: "Perlu Perbaikan" },
        { id: "riwayat", label: "Riwayat" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Progres</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Tinjau dan validasi capaian progres fisik yang diajukan oleh Mandor.</p>
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
                {verificationRequests.map((req) => (
                    <div key={req.id} className="dashboard-card group">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{req.project}</span>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                        req.status === "waiting_verification" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                                    }`}>
                                        {req.status === "waiting_verification" ? "Menunggu Review" : "Perlu Perbaikan"}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold">{req.stage}</h4>
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter">Diajukan oleh: {req.requester}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase">Progres Fisik</p>
                                        <p className="text-xl font-black text-[var(--dashboard-primary)]">{req.submittedProgress}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase">Tanggal Pengajuan</p>
                                        <p className="text-sm font-bold">{req.submittedDate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-56 flex flex-col justify-center gap-2">
                                <button className="w-full py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                                    <FiCheckCircle /> Verifikasi Selesai
                                </button>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-red-500/10 text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-red-500 hover:text-white transition-all">
                                        <FiXCircle /> Tolak
                                    </button>
                                    <button className="py-2 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-soft)] border border-[var(--dashboard-border)] rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1 hover:bg-[var(--dashboard-border)] transition-all">
                                        <FiInfo /> Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VerifikasiProgresPengawasPage;
