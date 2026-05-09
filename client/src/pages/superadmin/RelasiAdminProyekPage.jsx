import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiLink, 
    FiUser, 
    FiShield, 
    FiActivity,
    FiInfo,
    FiAlertCircle
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const RelasiAdminProyekPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchData();
        }
    }, [selectedSuperadminId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await projectService.getProjects();
            if (response.success) {
                setProjects(response.data || []);
            }
        } catch (err) {
            console.error("RelasiAdminProyekPage: Error fetching projects:", err);
            setError("Gagal memuat data relasi proyek.");
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = (projects || []).filter(p => 
        (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.projectCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.admin?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk melihat relasi admin." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memetakan relasi Admin-Proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        RELASI <span className="text-blue-600 uppercase">Admin-Proyek</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Pemetaan tanggung jawab Admin Operasional terhadap proyek konstruksi aktif.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Read-Only View</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari admin atau nama proyek..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
            </div>

            {/* TABLE */}
            <div className="dashboard-card overflow-hidden">
                {filteredProjects.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)] bg-gray-50/50">
                                    <th className="py-4 px-6">Admin Penanggung Jawab</th>
                                    <th className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <FiLink size={10} />
                                            <span>Relasi</span>
                                        </div>
                                    </th>
                                    <th className="py-4 px-6">Proyek Terkait</th>
                                    <th className="py-4 px-6">Status Proyek</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((p) => (
                                    <tr key={p.id} className="border-b border-[var(--dashboard-border)] hover:bg-blue-50/20 transition-colors">
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                                                    <FiShield size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-[var(--dashboard-text)]">
                                                        {p.admin?.name || "Belum Ditunjuk"}
                                                    </span>
                                                    <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-widest">
                                                        {p.admin?.email || "Email N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-center">
                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400">
                                                <FiActivity size={14} className="animate-pulse" />
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-[var(--dashboard-text)]">{p.name}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[9px] font-black uppercase text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                                        {p.projectCode || "N/A"}
                                                    </span>
                                                    <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold">
                                                        {p.customer?.name || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest bg-emerald-50 text-emerald-600 border-emerald-100">
                                                {(p.status || "active").replace('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center flex flex-col items-center justify-center">
                        <FiLink size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Tidak Ada Data Relasi</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic">
                            {searchQuery ? "Admin atau proyek tidak ditemukan." : "Belum ada pemetaan admin-proyek di database."}
                        </p>
                    </div>
                )}
            </div>

            {/* AUDIT NOTICE */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FiInfo className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-black text-lg tracking-tight mb-1">Audit Penugasan Operasional</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                        Penugasan Admin terhadap proyek dilakukan oleh sistem berdasarkan kapasitas beban kerja yang tersedia. Superadmin memonitor relasi ini untuk memastikan akuntabilitas tanggung jawab setiap Admin terhadap portofolio proyek yang dikelola.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RelasiAdminProyekPage;
