import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailPermintaanDesainArsitekPage = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();

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
                description="Pilih akun Arsitek untuk melihat detail permintaan desain."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate("/arsitek/permintaan-desain")}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">{requestId}</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide italic">Detail Permintaan Desain</p>
                </div>
            </div>

            <div className="dashboard-card min-h-[400px] flex flex-col items-center justify-center text-center">
                <RoleDataState 
                    type="empty"
                    title="Data Tidak Ditemukan"
                    description={`Permintaan desain dengan ID ${requestId} tidak ditemukan di database.`}
                />
                <div className="mt-6 p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-lg">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Status Fitur</p>
                    <p className="text-xs font-medium leading-relaxed text-slate-600 italic">
                        "Halaman detail permintaan desain saat ini dalam status **HOLD**. 
                        Backend schema untuk manajemen desain sedang dalam tahap perencanaan 
                        dan belum tersedia di fase **Local CRUD Integration**."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetailPermintaanDesainArsitekPage;
