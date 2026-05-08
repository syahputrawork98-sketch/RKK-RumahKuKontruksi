import React from "react";
import { FiSearch } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const RiwayatDesainArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const history = [];

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
                description="Pilih akun Arsitek untuk melihat riwayat desain."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Riwayat Desain</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Daftar desain yang telah selesai atau dibatalkan.</p>
            </div>

            <div className="dashboard-card min-h-[400px] flex flex-col">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            disabled
                            type="text" 
                            placeholder="Cari riwayat desain..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm opacity-50 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center text-center p-8">
                    <RoleDataState 
                        type="empty"
                        title="Riwayat Kosong"
                        description="Belum ada data riwayat pengerjaan desain di database."
                    />
                </div>
            </div>
        </div>
    );
};

export default RiwayatDesainArsitekPage;
