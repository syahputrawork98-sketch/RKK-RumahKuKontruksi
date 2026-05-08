import React from "react";
import { FiRepeat } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const RevisiDesainArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const revisions = [];

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
                description="Pilih akun Arsitek untuk melihat permintaan revisi."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Revisi Desain</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Daftar permintaan revisi desain.</p>
            </div>

            <div className="dashboard-card min-h-[400px] flex items-center justify-center text-center">
                <RoleDataState 
                    type="empty"
                    title="Tidak Ada Revisi"
                    description="Belum ada permintaan revisi untuk desain yang Anda kerjakan di database."
                />
            </div>
        </div>
    );
};

export default RevisiDesainArsitekPage;
