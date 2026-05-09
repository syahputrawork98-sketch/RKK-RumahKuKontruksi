import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiCalendar, FiDollarSign, FiType, FiFileText } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import designRequestService from "../../services/designRequestService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailPermintaanDesainArsitekPage = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequest = async () => {
        try {
            setLoading(true);
            const res = await designRequestService.getDesignRequestById(requestId);
            setRequest(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching request detail:", err);
            setError("Data tidak ditemukan atau terjadi kesalahan server.");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedArchitectId) {
            fetchRequest();
        }
    }, [requestId, selectedArchitectId]);

    if (personaLoading || (loading && selectedArchitectId)) {
        return <RoleDataState type="loading" message="Memuat detail brief..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk melihat detail permintaan desain."
            />
        );
    }

    if (error || !request) {
        return (
            <div className="space-y-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-primary)] transition-colors">
                    <FiArrowLeft /> Kembali
                </button>
                <RoleDataState type="error" message={error || "Data tidak ditemukan"} onRetry={fetchRequest} />
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate("/arsitek/permintaan-desain")}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">{request.title}</h2>
                    <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-widest italic">Local Simulation Brief Detail</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* BRIEF CONTENT */}
                    <div className="dashboard-card">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1 h-4 bg-[var(--dashboard-primary)] rounded-full"></div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-soft)]">Informasi Proyek</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FiType size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Tipe Bangunan</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">{request.buildingType || "-"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><FiMapPin size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Lokasi</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">{request.location || "-"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><FiDollarSign size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Estimasi Budget</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">
                                            {request.estimatedBudget ? `Rp ${Number(request.estimatedBudget).toLocaleString("id-ID")}` : "-"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><FiCalendar size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Tanggal Masuk</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">
                                            {new Date(request.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-[var(--dashboard-border-soft)]">
                            <div className="flex items-center gap-2 mb-4">
                                <FiFileText className="text-[var(--dashboard-primary)]" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Deskripsi / Brief</h4>
                            </div>
                            <p className="text-sm text-[var(--dashboard-text)] leading-relaxed bg-[var(--dashboard-surface-soft)] p-6 rounded-2xl border border-[var(--dashboard-border-soft)] whitespace-pre-wrap">
                                {request.description || "Tidak ada deskripsi tambahan."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* CUSTOMER INFO */}
                    <div className="dashboard-card border-t-4 border-t-[var(--dashboard-primary)]">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Informasi Konsumen</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                {request.customer?.name?.[0] || request.customer?.companyName?.[0] || "?"}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[var(--dashboard-text)]">{request.customer?.name || request.customer?.companyName}</p>
                                <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tight">{request.customer?.customerType}</p>
                            </div>
                        </div>
                    </div>

                    {/* STATUS TRACKING */}
                    <div className="dashboard-card">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Status Pengerjaan</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border-soft)]">
                                <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">Status Saat Ini</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100">
                                    {request.status.replace('_', ' ')}
                                </span>
                            </div>
                            
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 italic text-[10px] text-amber-700">
                                Info: Anda dapat mengubah status ke "In Review" atau "Approved" melalui halaman daftar antrean desain.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPermintaanDesainArsitekPage;
