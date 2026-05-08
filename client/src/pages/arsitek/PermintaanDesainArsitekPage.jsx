import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const PermintaanDesainArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [activeSubtab, setActiveSubtab] = useState("aktif");

    // In this phase (Local Development CRUD Integration), 
    // the DesignRequest model and API are not yet implemented.
    // We display an empty state to remain "honest" with the database.
    const requests = [];

    const subtabs = [
        { id: "aktif", label: "Aktif" },
        { id: "waiting_review", label: "Menunggu Review" },
        { id: "revision", label: "Revisi Diminta" },
        { id: "ready", label: "Siap Handover" },
        { id: "riwayat", label: "Riwayat" },
    ];

    if (personaLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk mengelola permintaan desain."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Permintaan Desain</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Manajemen brief dan progres desain arsitektur.</p>
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

            <div className="dashboard-card min-h-[400px] flex flex-col">
                {/* FILTERS */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            disabled
                            type="text" 
                            placeholder="Cari ID, customer, atau lokasi..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-50 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button disabled className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-black uppercase tracking-widest opacity-50 cursor-not-allowed">
                            <FiFilter />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <RoleDataState 
                        type="empty"
                        title="Antrean Desain Kosong"
                        description="Saat ini belum ada permintaan desain yang masuk atau ditugaskan kepada Anda di database."
                    />
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl max-w-md">
                        <p className="text-[10px] font-bold text-amber-700 uppercase leading-relaxed">
                            Info: Fitur "Permintaan Desain" masih dalam tahap Hold (Local CRUD Integration) 
                            karena schema DesignRequest belum diimplementasikan di backend.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermintaanDesainArsitekPage;
