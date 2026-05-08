import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DesainAktifArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const activeDesigns = [];

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
                description="Pilih akun Arsitek untuk melihat desain yang sedang aktif."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Desain Aktif</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Daftar desain yang sedang dalam proses pengerjaan.</p>
            </div>

            <div className="dashboard-card min-h-[400px] flex items-center justify-center text-center">
                <RoleDataState 
                    type="empty"
                    title="Tidak Ada Desain Aktif"
                    description="Anda belum memiliki proyek desain yang sedang berjalan di database."
                />
            </div>
        </div>
    );
};

export default DesainAktifArsitekPage;
