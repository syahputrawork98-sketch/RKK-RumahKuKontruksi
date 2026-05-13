import React from "react";
import { FiLock, FiAlertTriangle, FiInfo } from "react-icons/fi";

const AdminHoldStatePage = ({ title, description }) => {
    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        {title.toUpperCase()} <span className="text-neutral-400 uppercase text-sm font-bold">[SIMULASI]</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-neutral-50 px-4 py-2 rounded-xl border border-neutral-200">
                    <FiLock className="text-neutral-400" size={14} />
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Local Dev Scope</span>
                </div>
            </div>

            {/* HOLD CONTENT */}
            <div className="dashboard-card py-24 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400 mb-6 border border-dashed border-neutral-200">
                    <FiAlertTriangle size={40} />
                </div>
                <h2 className="text-xl font-black text-[var(--dashboard-text)] mb-3">Akses Terbatas pada Simulasi Lokal</h2>
                <p className="text-sm text-[var(--dashboard-text-soft)] max-w-md leading-relaxed italic mb-8">
                    Halaman ini berkaitan dengan alur operasional tingkat lanjut (validasi legal, marketplace, atau payment gateway). Di fase <strong>Local Development</strong>, akses ke fitur ini dibatasi untuk memastikan stabilitas data inti proyek.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                    <div className="px-6 py-3 bg-neutral-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-black/10">
                        Menunggu Integrasi v2
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        Status: Queue for Future Implementation
                    </p>
                </div>
            </div>

            {/* INFO BOX */}
            <div className="p-6 bg-[var(--dashboard-primary-soft)] border border-[var(--dashboard-primary)]/10 rounded-2xl flex gap-4 items-start">
                <FiInfo className="text-[var(--dashboard-primary)] shrink-0 mt-1" size={20} />
                <div>
                    <p className="text-xs font-bold text-[var(--dashboard-primary)] mb-1 uppercase tracking-tight">Informasi Admin</p>
                    <p className="text-xs text-[var(--dashboard-primary)]/80 leading-relaxed font-medium">
                        Fitur ini dijadwalkan untuk aktif setelah modul RAB dan Progress Lapangan dinyatakan stabil 100%. Silakan gunakan menu <strong>Data Master</strong> dan <strong>Monitoring Lapangan</strong> yang sudah tersedia.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminHoldStatePage;
