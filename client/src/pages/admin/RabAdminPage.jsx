import React, { useState, useEffect, useCallback } from "react";
import { FiFileText, FiChevronRight, FiSearch, FiFolder, FiCheckCircle, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const RabAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProjects = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const res = await projectService.getProjects({ adminId: selectedAdminId });
            setProjects(res.data || []);
        } catch (err) {
            console.error("Error fetching projects for RAB:", err);
            setError("Gagal memuat data proyek untuk RAB. Pastikan backend aktif.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusInfo = (project) => {
        const latestPlan = project.rabPlans?.[0];
        const planCount = project._count?.rabPlans || 0;

        if (planCount === 0) return { label: "BELUM ADA", color: "bg-slate-50 text-slate-400 border-slate-100", icon: <FiClock /> };
        
        if (latestPlan.status === 'active') return { label: "AKTIF", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <FiCheckCircle /> };
        if (latestPlan.status === 'approved') return { label: "FINAL", color: "bg-indigo-50 text-indigo-600 border-indigo-100", icon: <FiCheckCircle /> };
        if (latestPlan.status === 'draft') return { label: "DRAFT", color: "bg-amber-50 text-amber-600 border-amber-100", icon: <FiClock /> };
        if (latestPlan.totalAmount <= 0) return { label: "PERLU REVIEW", color: "bg-red-50 text-red-600 border-red-100", icon: <FiAlertCircle /> };
        
        return { label: latestPlan.status.toUpperCase(), color: "bg-slate-50 text-slate-400 border-slate-100", icon: <FiInfo /> };
    };

    const filteredProjects = projects.filter(prj => 
        prj.projectCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prj.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prj.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <RoleDataState type="loading" message="Menganalisis status RAB proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjects} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Rencana Anggaran Biaya (RAB)</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Manajemen anggaran dan item pekerjaan seluruh proyek.</p>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari proyek berdasarkan kode, nama, atau customer..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {filteredProjects.length > 0 ? (
                        <table className="w-full text-left border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">
                                    <th className="pb-2 px-4">Informasi Proyek</th>
                                    <th className="pb-2 px-4">Anggaran (Budget)</th>
                                    <th className="pb-2 px-4">Status RAB</th>
                                    <th className="pb-2 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((prj) => {
                                    const statusInfo = getStatusInfo(prj);
                                    return (
                                        <tr key={prj.id} className="group hover:bg-[var(--dashboard-surface-soft)] transition-all">
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)] group-hover:bg-transparent rounded-l-2xl border-y border-l border-[var(--dashboard-border)]">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white border border-[var(--dashboard-border)] flex items-center justify-center text-[var(--dashboard-primary)] shadow-sm group-hover:bg-[var(--dashboard-primary)] group-hover:text-white transition-all">
                                                        <FiFolder size={20} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-[var(--dashboard-primary)]">{prj.projectCode}</span>
                                                        <span className="text-sm font-extrabold text-slate-800">{prj.name}</span>
                                                        <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">{prj.customer?.name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)] group-hover:bg-transparent border-y border-[var(--dashboard-border)]">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-800">
                                                        {formatCurrency(prj.budgetTotal)}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">Total Proyek</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)] group-hover:bg-transparent border-y border-[var(--dashboard-border)]">
                                                <div className="flex items-center gap-2">
                                                    <span className={`flex items-center gap-1.5 px-3 py-1 border rounded-full text-[10px] font-black uppercase tracking-widest ${statusInfo.color}`}>
                                                        {statusInfo.icon}
                                                        {statusInfo.label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)] group-hover:bg-transparent rounded-r-2xl border-y border-r border-[var(--dashboard-border)] text-right">
                                                <Link 
                                                    to={`/admin/rab/${prj.id}`}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[var(--dashboard-border)] text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] rounded-xl shadow-sm hover:bg-[var(--dashboard-primary)] hover:text-white transition-all"
                                                >
                                                    KELOLA RAB
                                                    <FiChevronRight />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <RoleDataState type="empty" message="Tidak ada data proyek untuk ditampilkan." />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RabAdminPage;
