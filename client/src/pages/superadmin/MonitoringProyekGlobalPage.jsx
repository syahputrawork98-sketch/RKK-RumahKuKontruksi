import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiLayers, 
    FiMapPin, 
    FiUser, 
    FiUserCheck, 
    FiShield, 
    FiActivity,
    FiFilter,
    FiEye,
    FiInfo
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const MonitoringProyekGlobalPage = ({ mode = "all" }) => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const isActiveProject = (status) => {
        const s = (status || "").toLowerCase();
        return s === "active" || s === "ongoing" || s === "berjalan";
    };

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await projectService.getProjects();
            if (response.success) {
                let data = response.data || [];
                if (mode === "active") {
                    data = data.filter(p => isActiveProject(p.status));
                }
                setProjects(data);
            }
        } catch (err) {
            console.error("MonitoringProyekGlobalPage: Error fetching projects:", err);
            setError("Gagal memuat data monitoring proyek.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchProjects();
        }
    }, [selectedSuperadminId, mode]);

    const getStatusBadge = (status) => {
        const s = (status || "").toLowerCase();
        if (isActiveProject(s)) {
            return "bg-emerald-50 text-emerald-600 border-emerald-100";
        }
        if (s === "finished" || s === "selesai") {
            return "bg-blue-50 text-blue-600 border-blue-100";
        }
        if (s === "on_hold" || s === "hold") {
            return "bg-amber-50 text-amber-600 border-amber-100";
        }
        return "bg-gray-50 text-gray-600 border-gray-100";
    };

    const filteredProjects = (projects || []).filter(p => {
        const matchesSearch = 
            (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.projectCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.customer?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === "all" || (p.status || "").toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk memonitor data proyek." />;
    }

    if (loading) return <RoleDataState type="loading" message={mode === "active" ? "Menganalisis proyek aktif..." : "Menganalisis status proyek global..."} />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjects} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        {mode === "active" ? (
                            <>LIST <span className="text-emerald-600 uppercase">Proyek Aktif (Lokal)</span></>
                        ) : (
                            <>MONITORING <span className="text-blue-600 uppercase">Proyek Global (Simulasi)</span></>
                        )}
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        {mode === "active" 
                            ? "Daftar seluruh proyek konstruksi yang sedang berjalan dalam masa pelaksanaan." 
                            : "Visualisasi status konstruksi seluruh proyek dalam sistem (Local CRUD Monitoring)."}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 shadow-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Local Monitoring Mode</span>
                </div>
            </div>

            {/* GLOBAL SUMMARY BAR */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><FiLayers size={14} /></div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Proyek</p>
                    </div>
                    <h4 className="text-2xl font-black text-slate-800">{projects.length}</h4>
                </div>
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600"><FiActivity size={14} /></div>
                        <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Aktif / Berjalan</p>
                    </div>
                    <h4 className="text-2xl font-black text-emerald-700">{projects.filter(p => isActiveProject(p.status)).length}</h4>
                </div>
                <div className="p-5 bg-blue-50 border border-blue-100 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600"><FiClock size={14} /></div>
                        <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Draft / Persiapan</p>
                    </div>
                    <h4 className="text-2xl font-black text-blue-700">{projects.filter(p => (p.status || "").toLowerCase().includes("plan") || (p.status || "").toLowerCase().includes("draft") || (p.status || "").toLowerCase().includes("persiapan")).length}</h4>
                </div>
                <div className="p-5 bg-purple-50 border border-purple-100 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-purple-100/50 flex items-center justify-center text-purple-600"><FiCheckCircle size={14} /></div>
                        <p className="text-[10px] font-black uppercase text-purple-600 tracking-widest">Selesai / Histori</p>
                    </div>
                    <h4 className="text-2xl font-black text-purple-700">{projects.filter(p => (p.status || "").toLowerCase().includes("selesai") || (p.status || "").toLowerCase().includes("finish")).length}</h4>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                    <input 
                        type="text" 
                        placeholder="Cari nama, kode, atau konsumen..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                {mode === "all" && (
                    <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-[var(--dashboard-border)]">
                        <FiFilter className="text-[var(--dashboard-text-soft)]" />
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="text-xs font-bold text-[var(--dashboard-text)] bg-transparent border-none focus:ring-0 cursor-pointer"
                        >
                            <option value="all">Semua Status</option>
                            <option value="active">Berjalan</option>
                            <option value="finished">Selesai</option>
                            <option value="hold">On Hold</option>
                        </select>
                    </div>
                )}
            </div>

            {/* TABLE */}
            <div className="dashboard-card overflow-hidden">
                {filteredProjects.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)] bg-gray-50/50">
                                    <th className="py-4 px-6">Identitas Proyek</th>
                                    <th className="py-4 px-6">Tim Operasional</th>
                                    <th className="py-4 px-6 text-center">Status & Progres</th>
                                    <th className="py-4 px-6 text-right">Informasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((p) => (
                                    <tr key={p.id} className="border-b border-[var(--dashboard-border)] hover:bg-blue-50/20 transition-colors">
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded uppercase tracking-tighter">
                                                        {p.projectCode || "N/A"}
                                                    </span>
                                                    <span className="text-sm font-black text-[var(--dashboard-text)]">{p.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-[var(--dashboard-text-soft)] font-bold">
                                                    <FiUser className="shrink-0" size={12} />
                                                    <span>{p.customer?.name || p.customer?.companyName || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-[var(--dashboard-text-soft)] mt-1">
                                                    <FiMapPin className="shrink-0" size={12} />
                                                    <span className="truncate max-w-[200px]">{p.location || "-"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                                        <FiShield size={12} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] uppercase font-black text-blue-600 opacity-60 leading-none mb-0.5">Admin</span>
                                                        <span className="text-[10px] font-bold">{p.admin?.name || "Belum Ditunjuk"}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                                                        <FiUserCheck size={12} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] uppercase font-black text-emerald-600 opacity-60 leading-none mb-0.5">Pengawas</span>
                                                        <span className="text-[10px] font-bold">{p.supervisor?.name || "Belum Ditunjuk"}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                                                        <FiLayers size={12} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] uppercase font-black text-amber-600 opacity-60 leading-none mb-0.5">Mandor</span>
                                                        <span className="text-[10px] font-bold">{p.foreman?.name || "Belum Ditunjuk"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest ${getStatusBadge(p.status)}`}>
                                                    {(p.status || "draft").replace('_', ' ')}
                                                </span>
                                                <div className="w-32">
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <span className="text-[9px] font-black uppercase text-slate-400">Progres</span>
                                                        <span className="text-[10px] font-black text-blue-600">{p.verifiedProgress || p.progress || 0}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                                                        <div 
                                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                                                            style={{ width: `${p.verifiedProgress || p.progress || 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-right">
                                            <button className="p-2 text-slate-300 hover:text-blue-500 transition-colors" title="Detail Read-Only">
                                                <FiEye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <RoleDataState 
                        type="empty" 
                        title="Tidak Ada Data Proyek" 
                        message={searchQuery || statusFilter !== "all" 
                            ? "Coba ganti kata kunci atau filter status untuk hasil lain."
                            : "Belum ada proyek yang terdaftar di database sistem lokal."} 
                    />
                )}
            </div>

            {/* AUDIT NOTICE */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FiInfo className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-black text-lg tracking-tight mb-1">Pusat Monitoring Audit Proyek (Lokal)</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                        Halaman ini adalah pusat monitoring simulasi untuk Superadmin dalam fase pengembangan. Seluruh data operasional dikelola secara eksklusif oleh persona <strong>Admin</strong> dan <strong>Pengawas</strong> melalui sinkronisasi database lokal `localhost`.
                    </p>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Fase Status</p>
                    <p className="text-xs font-black text-emerald-400">Local Integration v1</p>
                </div>
            </div>
        </div>
    );
};

export default MonitoringProyekGlobalPage;
