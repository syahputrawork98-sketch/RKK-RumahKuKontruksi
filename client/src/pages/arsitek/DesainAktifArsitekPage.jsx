import React, { useState, useEffect } from "react";
import { FiEdit3, FiActivity } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import designRequestService from "../../services/designRequestService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DesainAktifArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (!selectedArchitectId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await designRequestService.getAssignedRequests(selectedArchitectId);
            if (res.success) {
                // Filter only active ones (assigned, in_review)
                const active = (res.data || []).filter(d => !["approved", "rejected"].includes(d.status));
                setDesigns(active);
            }
        } catch (err) {
            console.error("Failed to fetch active designs:", err);
            setError("Gagal memuat data desain aktif.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedArchitectId]);

    if (personaLoading || loading) {
        return <RoleDataState type="loading" message="Menganalisis antrean desain..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk melihat desain yang sedang aktif."
            />
        );
    }

    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Desain Aktif</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Daftar desain yang sedang dalam proses pengerjaan (Local CRUD).</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                    <FiActivity className="text-emerald-500" size={14} />
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em]">Local Monitoring Mode</span>
                </div>
            </div>

            <div className="dashboard-card min-h-[400px]">
                {designs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {designs.map(design => (
                            <div key={design.id} className="p-6 border border-[var(--dashboard-border)] rounded-3xl hover:border-[var(--dashboard-primary)] transition-all group bg-white shadow-sm flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded uppercase tracking-tighter">
                                        {design.id.slice(-8).toUpperCase()}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                        design.status === 'assigned' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                        {design.status.replace('_', ' ')}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{design.title}</h3>
                                <p className="text-xs text-[var(--dashboard-text-soft)] mb-4 italic leading-relaxed line-clamp-2">
                                    {design.description || "Tidak ada deskripsi tambahan."}
                                </p>
                                <div className="mt-auto pt-4 border-t border-[var(--dashboard-border-soft)] flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase text-slate-400 leading-none mb-1">Customer</span>
                                        <span className="text-[10px] font-bold truncate max-w-[150px]">{design.customer?.name || "N/A"}</span>
                                    </div>
                                    <button className="p-2 text-slate-300 hover:text-[var(--dashboard-primary)] transition-colors">
                                        <FiEdit3 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RoleDataState 
                            type="empty"
                            title="Tidak Ada Desain Aktif"
                            description="Anda belum memiliki proyek desain yang sedang berjalan di database."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DesainAktifArsitekPage;
