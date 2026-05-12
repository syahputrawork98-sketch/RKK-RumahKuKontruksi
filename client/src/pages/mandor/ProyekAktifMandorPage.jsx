import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiMapPin, FiUsers, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const ProyekAktifMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("today");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const subtabs = [
        { id: "today", label: "Aktif Hari Ini" },
        { id: "needs_update", label: "Butuh Update" },
        { id: "delayed", label: "Terlambat" },
        { id: "completed", label: "Selesai" },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            if (!selectedForemanId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const response = await projectService.getProjects({ foremanId: selectedForemanId });
                if (response.success) {
                    setProjects(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Gagal memuat daftar proyek aktif.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [selectedForemanId]);

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Mandor untuk melihat proyek aktif yang sedang Anda kerjakan."
            />
        );
    }

    if (loading && projects.length === 0 && !error) {
        return <RoleDataState type="loading" message="Memuat proyek aktif..." />;
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    const filteredProjects = projects.filter(prj => {
        const today = new Date();
        const deadline = prj.estimatedEndDate ? new Date(prj.estimatedEndDate) : null;
        const lastUpdate = prj.verifiedProgressUpdatedAt ? new Date(prj.verifiedProgressUpdatedAt) : null;
        const diffDays = lastUpdate ? Math.ceil((today - lastUpdate) / (1000 * 60 * 60 * 24)) : 999;

        if (activeSubtab === "today") return prj.status?.toLowerCase() === 'active' || prj.status?.toLowerCase() === 'ongoing' || prj.status?.toLowerCase() === 'berjalan';
        if (activeSubtab === "needs_update") return diffDays > 7 && (prj.verifiedProgress ?? 0) < 100;
        if (activeSubtab === "delayed") return deadline && deadline < today && (prj.verifiedProgress ?? 0) < 100;
        if (activeSubtab === "completed") return prj.status?.toLowerCase() === 'selesai' || prj.status?.toLowerCase() === 'completed' || (prj.verifiedProgress ?? 0) >= 100;
        return true;
    });

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Proyek Aktif</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar proyek dalam eksekusi tim lapangan harian.</p>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => {
                    const count = projects.filter(p => {
                        const t = new Date();
                        const d = p.estimatedEndDate ? new Date(p.estimatedEndDate) : null;
                        const lu = p.verifiedProgressUpdatedAt ? new Date(p.verifiedProgressUpdatedAt) : null;
                        const df = lu ? Math.ceil((t - lu) / (1000 * 60 * 60 * 24)) : 999;
                        if (tab.id === "today") return p.status?.toLowerCase() === 'active' || p.status?.toLowerCase() === 'ongoing' || p.status?.toLowerCase() === 'berjalan';
                        if (tab.id === "needs_update") return df > 7 && (p.verifiedProgress ?? 0) < 100;
                        if (tab.id === "delayed") return d && d < t && (p.verifiedProgress ?? 0) < 100;
                        if (tab.id === "completed") return p.status?.toLowerCase() === 'selesai' || p.status?.toLowerCase() === 'completed' || (p.verifiedProgress ?? 0) >= 100;
                        return true;
                    }).length;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSubtab(tab.id)}
                            className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                                activeSubtab === tab.id 
                                ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                                : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                            }`}
                        >
                            {tab.label}
                            <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${activeSubtab === tab.id ? 'bg-[var(--dashboard-primary)]/10 text-[var(--dashboard-primary)]' : 'bg-slate-100 text-slate-500'}`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.length > 0 ? filteredProjects.map((prj) => {
                    const statusMapping = {
                        'Berjalan': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
                        'Active': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
                        'Ongoing': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
                        'Selesai': { text: "Selesai", color: "bg-slate-500/10 text-slate-500" },
                        'Completed': { text: "Selesai", color: "bg-slate-500/10 text-slate-500" },
                    };
                    const statusLabel = statusMapping[prj.status] || { text: prj.status, color: "bg-amber-500/10 text-amber-500" };

                    return (
                        <div key={prj.id} className="dashboard-card group hover:border-[var(--dashboard-primary)]/50 transition-all p-0 overflow-hidden">
                            <div className="p-5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{prj.projectCode}</span>
                                            <StatusBadge type="project" status={prj.status} />
                                        </div>
                                        <h3 className="text-lg font-black leading-tight">{prj.name}</h3>
                                        <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase mt-0.5">{prj.customer?.name || 'No Customer'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase">Progress Resmi</p>
                                        <p className="text-2xl font-black text-[var(--dashboard-primary)]">{prj.verifiedProgress ?? 0}%</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[var(--dashboard-surface-soft)] rounded-xl text-[var(--dashboard-text-soft)]">
                                            <FiMapPin size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Lokasi</p>
                                            <p className="text-xs font-bold">{prj.location || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[var(--dashboard-surface-soft)] rounded-xl text-[var(--dashboard-text-soft)]">
                                            <FiUsers size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Estimasi Selesai</p>
                                            <p className="text-xs font-bold">{prj.estimatedEndDate ? new Date(prj.estimatedEndDate).toLocaleDateString('id-ID') : '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-blue-500/5 border border-dashed border-blue-500/10 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1 text-blue-600">
                                        <FiClock size={12} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Update Terakhir</span>
                                    </div>
                                    <p className="text-xs font-bold italic text-blue-500">
                                        {prj.verifiedProgressUpdatedAt ? `Terverifikasi pada ${new Date(prj.verifiedProgressUpdatedAt).toLocaleDateString('id-ID')}` : "Belum ada verifikasi progres resmi"}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-[var(--dashboard-surface-soft)] border-t border-[var(--dashboard-border)] flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-tighter">Pengawas: {prj.supervisor?.name || 'Belum Ditugaskan'}</span>
                                <Link 
                                    to={`/mandor/proyek-aktif/${prj.id}`}
                                    className="flex items-center gap-1 text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase tracking-widest"
                                >
                                    Detail Proyek <FiChevronRight />
                                </Link>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="col-span-full">
                        <RoleDataState 
                            type="empty" 
                            title="Tidak Ada Proyek" 
                            message={`Tidak ada proyek dalam kategori "${subtabs.find(t => t.id === activeSubtab)?.label}" saat ini.`} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProyekAktifMandorPage;
