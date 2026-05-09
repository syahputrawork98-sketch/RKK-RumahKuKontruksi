import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiMapPin, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectService from "../../services/projectService";

import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const ProyekDiawasiPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [activeSubtab, setActiveSubtab] = useState("semua");
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const subtabs = [
        { id: "semua", label: "Semua" },
        { id: "aktif", label: "Aktif" },
        { id: "selesai", label: "Selesai" },
        { id: "deadline", label: "Mendekati Deadline" },
        { id: "tim_kurang", label: "Tim Belum Lengkap" },
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            if (!selectedSupervisorId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                const response = await projectService.getProjects({ supervisorId: selectedSupervisorId });
                if (response.success) {
                    setProjects(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Gagal memuat daftar proyek dari database.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [selectedSupervisorId]);

    const getStatusLabel = (status) => {
        const mapping = {
            'Berjalan': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
            'active': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
            'planning': { text: "Perencanaan", color: "bg-blue-500/10 text-blue-500" },
            'Selesai': { text: "Selesai", color: "bg-slate-500/10 text-slate-500" },
            'completed': { text: "Selesai", color: "bg-slate-500/10 text-slate-500" },
        };
        return mapping[status] || { text: status, color: "bg-slate-500/10 text-slate-500" };
    };

    // Filter projects by subtab and search query
    const filteredProjects = projects.filter(p => {
        const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (p.projectCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (p.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;

        const isAktif = p.status === "Berjalan" || p.status === "active";
        const isSelesai = p.status === "Selesai" || p.status === "completed";

        if (activeSubtab === "aktif") return isAktif;
        if (activeSubtab === "selesai") return isSelesai;
        
        if (activeSubtab === "deadline") {
            if (!p.estimatedEndDate) return false;
            const deadline = new Date(p.estimatedEndDate);
            const now = new Date();
            const diffDays = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
            return isAktif && diffDays <= 14 && diffDays >= 0; // Deadline within 2 weeks
        }

        if (activeSubtab === "tim_kurang") {
            return !p.foremanId || !p.adminId;
        }

        return true; // "semua"
    });

    if (!selectedSupervisorId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Pengawas untuk melihat proyek yang sedang Anda awasi."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Proyek Diawasi</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Monitoring progres harian dan kendala lapangan pada proyek yang ditugaskan.</p>
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

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari nama proyek atau customer..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                        <FiFilter /> Filter
                    </button>
                </div>

                {error ? (
                    <RoleDataState 
                        type="error"
                        title={error}
                        onRetry={() => window.location.reload()}
                    />
                ) : isLoading ? (
                    <div className="py-20 flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)]">
                                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Lokasi</th>
                                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Progress</th>
                                    <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.length > 0 ? filteredProjects.map((prj) => (
                                    <tr key={prj.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{prj.projectCode}</span>
                                                <span className="text-sm font-bold">{prj.name}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">{prj.customer?.name || 'No Customer'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                                <FiMapPin size={10} /> {prj.location}
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <StatusBadge type="project" status={prj.status} />
                                        </td>
                                        <td className="py-4 px-2 w-32">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-lg font-black text-blue-600 leading-none">
                                                        {prj.verifiedProgress ?? 0}%
                                                    </p>
                                                    <span className="text-[8px] font-bold text-slate-400 uppercase">Verified</span>
                                                </div>
                                                <div className="w-full h-1 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: `${prj.verifiedProgress ?? 0}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <Link 
                                                to={`/pengawas/proyek/${prj.id}`}
                                                className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                            >
                                                DETAIL <FiChevronRight />
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center text-slate-400 font-medium italic">
                                            Tidak ada proyek yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProyekDiawasiPengawasPage;
