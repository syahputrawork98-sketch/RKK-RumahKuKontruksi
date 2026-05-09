import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiActivity, 
    FiUser, 
    FiHardHat, 
    FiShield, 
    FiMapPin, 
    FiClock,
    FiInfo,
    FiChevronRight
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const LaporanProgresGlobalPage = () => {
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
            console.error("LaporanProgresGlobalPage: Error fetching projects:", err);
            setError("Gagal memuat data progres global.");
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = (projects || []).filter(p => 
        (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.projectCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.customer?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return "Belum ada update";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk memonitor progres proyek." />;
    }

    if (loading) return <RoleDataState type="loading" message="Menganalisis progres seluruh proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        LAPORAN <span className="text-blue-600 uppercase">Progres Global</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Monitoring real-time capaian fisik seluruh proyek konstruksi aktif. (Read-Only)
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Audit Mode</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari proyek atau konsumen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
            </div>

            {/* PROGRESS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((p) => (
                        <div key={p.id} className="dashboard-card group hover:border-blue-200 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-1 inline-block tracking-tighter">
                                        {p.projectCode || "PRJ-???"}
                                    </span>
                                    <h3 className="text-sm font-black text-[var(--dashboard-text)] line-clamp-1">{p.name}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-blue-600 leading-none">{p.verifiedProgress || p.progress || 0}%</p>
                                    <p className="text-[8px] uppercase font-bold text-gray-400 tracking-widest mt-1">Verified</p>
                                </div>
                            </div>

                            {/* PROGRESS BAR */}
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-100 mb-6">
                                <div 
                                    className="h-full bg-blue-500 rounded-full transition-all duration-1000 group-hover:bg-blue-600"
                                    style={{ width: `${p.verifiedProgress || p.progress || 0}%` }}
                                />
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-2 text-[var(--dashboard-text-soft)]">
                                        <FiUser size={12} />
                                        <span className="font-medium">Konsumen:</span>
                                    </div>
                                    <span className="font-bold text-[var(--dashboard-text)] truncate max-w-[120px]">
                                        {p.customer?.name || p.customer?.companyName || "N/A"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-2 text-[var(--dashboard-text-soft)]">
                                        <FiHardHat size={12} />
                                        <span className="font-medium">Pengawas:</span>
                                    </div>
                                    <span className="font-bold text-[var(--dashboard-text)]">{p.supervisor?.name || "-"}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px]">
                                    <div className="flex items-center gap-2 text-[var(--dashboard-text-soft)]">
                                        <FiClock size={12} />
                                        <span className="font-medium">Update:</span>
                                    </div>
                                    <span className="font-bold text-[var(--dashboard-text)]">{formatDate(p.verifiedProgressUpdatedAt || p.updatedAt)}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-600">
                                    <FiActivity size={10} />
                                    <span>{p.status || "Ongoing"}</span>
                                </div>
                                <button className="p-1.5 bg-gray-50 text-gray-400 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-all">
                                    <FiChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center dashboard-card border-dashed">
                        <FiActivity size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Data Progres Belum Tersedia</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic max-w-sm">
                            {searchQuery ? "Proyek tidak ditemukan dengan kata kunci tersebut." : "Belum ada catatan progres konstruksi yang terverifikasi di sistem."}
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
                    <h4 className="font-black text-lg tracking-tight mb-1">Audit Integritas Progres Lapangan</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                        Seluruh data progres yang tampil di halaman ini telah melalui proses verifikasi lapangan oleh <strong>Pengawas Proyek</strong> dan disetujui secara sistem oleh <strong>Admin Operasional</strong>. Superadmin memonitor data ini untuk audit berkala tanpa otorisasi modifikasi langsung.
                    </p>
                </div>
                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 shrink-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Update Policy</p>
                    <p className="text-xs font-black text-emerald-400 italic">Database Driven</p>
                </div>
            </div>
        </div>
    );
};

export default LaporanProgresGlobalPage;
