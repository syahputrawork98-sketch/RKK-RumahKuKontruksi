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
                    <h1 className="dashboard-title text-4xl">Log Aktivitas Sistem</h1>
                    <p className="dashboard-subtitle text-lg">Pantau seluruh aktivitas operasional user dan sistem secara transparan (Audit Trail).</p>
                </div>
                <button className="dashboard-primary-button flex items-center gap-2 !bg-[var(--dashboard-surface)] !text-[var(--dashboard-text)] border border-[var(--dashboard-border)] shadow-sm opacity-50 cursor-not-allowed">
                    <FiDownload size={18} />
                    <span>Ekspor Log</span>
                </button>
            </div>

            {/* HOLD STATE CARD */}
            <div className="dashboard-card flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-[var(--dashboard-border)]">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-6">
                    <FiLock size={40} />
                </div>
                <h2 className="text-xl font-bold text-neutral-700 mb-2">Modul Audit Log Ditahan</h2>
                <p className="text-sm text-neutral-500 max-w-md mb-6">
                    Sistem pencatatan aktivitas otomatis (Audit Trail) saat ini belum tersedia pada fase **Local Development CRUD Integration**.
                </p>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Status: Hold (Future Sprint)</span>
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
