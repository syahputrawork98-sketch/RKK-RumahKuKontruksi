import React from "react";
import { FiLock, FiAlertTriangle, FiInfo } from "react-icons/fi";

const ArsitekHoldStatePage = ({ title, description }) => {
    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        {title.toUpperCase()} <span className="text-amber-600 uppercase">[HOLD]</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
                    <FiLock className="text-amber-500" size={14} />
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em]">Fase Local CRUD</span>
                </div>
            </div>

            {/* HOLD CONTENT */}
            <div className="dashboard-card py-24 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 border border-dashed border-amber-200 animate-pulse">
                    <FiAlertTriangle size={40} />
                </div>
                <h2 className="text-xl font-black text-[var(--dashboard-text)] mb-3">Modul Desain Ditangguhkan</h2>
                <p className="text-sm text-[var(--dashboard-text-soft)] max-w-md leading-relaxed italic mb-8">
                    Halaman ini berkaitan dengan alur manajemen desain tingkat lanjut (upload file produksi, revisi berbayar, atau final handover). Di fase <strong>Local Development CRUD Integration</strong>, akses ke fitur ini dibatasi untuk menjaga integritas data brief dan kontrak awal.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                    <div className="px-6 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[var(--dashboard-primary)]/20">
                        Menunggu Integrasi Storage & Workflow v2
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        Status: Design Workflow Queue
                    </p>
                </div>
            </div>

            {/* INFO BOX */}
            <div className="p-6 bg-[var(--dashboard-primary-soft)] border border-[var(--dashboard-primary)]/10 rounded-2xl flex gap-4 items-start">
                <FiInfo className="text-[var(--dashboard-primary)] shrink-0 mt-1" size={20} />
                <div>
                    <p className="text-xs font-bold text-[var(--dashboard-primary)] mb-1 uppercase tracking-tight">Informasi Arsitek</p>
                    <p className="text-xs text-[var(--dashboard-primary)]/80 leading-relaxed font-medium">
                        Fitur ini dijadwalkan untuk aktif setelah modul Brief Desain dan Kontrak Arsitek dinyatakan stabil 100%. Silakan gunakan menu <strong>Peluang Desain</strong> dan <strong>Permintaan Desain</strong> yang sudah tersedia.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArsitekHoldStatePage;
