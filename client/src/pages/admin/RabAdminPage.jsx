import React, { useState, useEffect } from "react";
import { FiFileText, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";

const RabAdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await projectService.getProjects();
            setProjects(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching projects for RAB:", err);
            setError("Gagal memuat data proyek untuk RAB.");
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter(prj => 
        prj.projectCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prj.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <RoleDataState type="loading" message="Memuat data RAB proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjects} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">RAB Proyek</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Manajemen Rencana Anggaran Biaya seluruh proyek.</p>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari proyek berdasarkan kode atau nama..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {filteredProjects.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)]">
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Total Estimasi</th>
                                    <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((prj) => (
                                    <tr key={prj.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-[var(--dashboard-primary)]">{prj.projectCode}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold">{prj.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className="text-sm font-black text-emerald-600">
                                                {prj.budget ? `Rp ${prj.budget.toLocaleString("id-ID")}` : "-"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-right">
                                            <Link 
                                                to={`/admin/rab/${prj.id}`}
                                                className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                            >
                                                DETAIL RAB
                                                <FiChevronRight />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
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
