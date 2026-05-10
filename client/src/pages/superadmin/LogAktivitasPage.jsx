import React, { useState } from "react";
import { FiSearch, FiFilter, FiDownload, FiInfo, FiUser, FiClock, FiActivity, FiLock } from "react-icons/fi";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const LogAktivitasPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [search, setSearch] = useState("");

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengakses log aktivitas." />;
    }

    return (
        <div className="animate-fadeIn">
            {/* HEADER */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="dashboard-title text-4xl">Pusat Audit & Approval Lokal</h1>
                    <p className="dashboard-subtitle text-lg italic font-medium text-amber-600 underline decoration-amber-200">Rencana alur Audit Trail dan Profile Change Approval. *Fase Local CRUD - Feature Hold*</p>
                </div>
                <button className="dashboard-primary-button flex items-center gap-2 !bg-[var(--dashboard-surface)] !text-[var(--dashboard-text)] border border-[var(--dashboard-border)] shadow-sm opacity-50 cursor-not-allowed">
                    <FiDownload size={18} />
                    <span>Ekspor History Lokal</span>
                </button>
            </div>

            {/* HOLD STATE CARD */}
            <div className="dashboard-card flex flex-col items-center justify-center py-24 text-center border-dashed border-2 border-[var(--dashboard-border)] bg-slate-50/50">
                <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-8 shadow-inner border border-neutral-200">
                    <FiLock size={48} />
                </div>
                <h2 className="text-2xl font-black text-neutral-800 mb-3 tracking-tighter uppercase">Modul Audit & Approval Ditahan</h2>
                <p className="text-sm text-neutral-500 max-w-lg mb-8 leading-relaxed">
                    Sistem pencatatan aktivitas otomatis (**Audit Log**) dan alur persetujuan perubahan identitas (**Profile Change Approval**) saat ini belum diaktifkan pada fase **Local Development CRUD Integration**.
                </p>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 px-6 py-2.5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse"></span>
                        <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Status: Hold (Future Sprint)</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">* Tidak ada perubahan database yang dicatat dalam log simulasi saat ini.</p>
                </div>
            </div>

            {/* PLACEHOLDER FOR FUTURE UI */}
            <div className="mt-10 opacity-30 pointer-events-none grayscale">
                <div className="dashboard-card p-6 mb-8 flex items-center justify-between">
                    <div className="h-10 w-64 bg-neutral-200 rounded-xl"></div>
                    <div className="h-10 w-32 bg-neutral-200 rounded-xl"></div>
                </div>
                <div className="dashboard-table-card h-64 bg-neutral-100"></div>
            </div>
        </div>
    );
};

export default LogAktivitasPage;
