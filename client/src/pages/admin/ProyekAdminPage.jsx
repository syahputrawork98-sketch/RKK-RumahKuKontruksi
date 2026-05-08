import React, { useState, useEffect, useCallback } from "react";
import { FiPlus, FiSearch, FiFilter, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import StatusBadge from "../../components/common/StatusBadge";

const ProyekAdminPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("all");
    const { selectedAdminId } = useAdminPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProjects = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await projectService.getProjects({ adminId: selectedAdminId });
            setProjects(response.data || []);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Gagal memuat daftar proyek. Pastikan server backend berjalan.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("berjalan")) return "bg-emerald-500/10 text-emerald-500";
        if (s?.includes("persiapan") || s?.includes("plan")) return "bg-blue-500/10 text-blue-500";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500";
        if (s?.includes("stop") || s?.includes("terhenti")) return "bg-red-500/10 text-red-500";
        return "bg-slate-500/10 text-slate-500";
    };

    const subtabs = [
        { id: "all", label: "Semua", count: projects.length },
        { id: "active", label: "Aktif", count: projects.filter(p => p.status?.toLowerCase().includes('active') || p.status?.toLowerCase().includes('ongoing') || p.status?.toLowerCase().includes('berjalan')).length },
        { id: "persiapan", label: "Persiapan", count: projects.filter(p => p.status?.toLowerCase().includes('persiapan') || p.status?.toLowerCase().includes('plan')).length },
        { id: "selesai", label: "Selesai", count: projects.filter(p => p.status?.toLowerCase().includes('finish') || p.status?.toLowerCase().includes('selesai')).length },
    ];

    const filteredProjects = projects.filter(prj => {
        const matchesSearch = prj.projectCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             prj.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             prj.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;

        const s = prj.status?.toLowerCase();
        if (activeSubtab === "active") return s.includes('active') || s.includes('ongoing') || s.includes('berjalan');
        if (activeSubtab === "persiapan") return s.includes('persiapan') || s.includes('plan');
        if (activeSubtab === "selesai") return s.includes('finish') || s.includes('selesai');
        return true;
    });

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat daftar proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjects} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Manajemen Proyek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar seluruh proyek konstruksi yang sedang ditangani.</p>
                </div>
                <Link 
                    to="/admin/proyek/create"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus size={18} />
                    Buat Proyek Baru
                </Link>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                        <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${activeSubtab === tab.id ? 'bg-[var(--dashboard-primary)]/10 text-[var(--dashboard-primary)]' : 'bg-slate-100 text-slate-500'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            <div className="dashboard-card">
                {/* FILTERS */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari kode proyek, nama, atau customer..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 italic">
                            Filter otomatis via tab
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    {filteredProjects.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)]">
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer / Tipe</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Progress</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Nilai Proyek</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((prj) => (
                                    <tr key={prj.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <span className="text-sm font-black text-[var(--dashboard-primary)]">{prj.projectCode}</span>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{prj.customer?.name || "-"}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-medium">{prj.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <StatusBadge type="project" status={prj.status} />
                                        </td>
                                        <td className="py-4 px-2 w-48">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex justify-between items-center text-[10px] font-bold">
                                                    <span>{prj.verifiedProgress || 0}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[var(--dashboard-primary)] transition-all duration-500" 
                                                        style={{ width: `${prj.verifiedProgress || 0}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className="text-sm font-bold text-[var(--dashboard-text)]">
                                                {prj.budgetTotal ? `Rp ${parseFloat(prj.budgetTotal).toLocaleString("id-ID")}` : "-"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <Link 
                                                to={`/admin/proyek/${prj.id}`}
                                                className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                            >
                                                DETAIL
                                                <FiChevronRight />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <RoleDataState type="empty" message="Tidak ada proyek yang ditemukan." />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProyekAdminPage;
