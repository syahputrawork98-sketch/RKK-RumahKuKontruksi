import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FiSearch, 
    FiCalendar, 
    FiInfo, 
    FiChevronRight,
    FiActivity,
    FiClock,
    FiLayers
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";

const TeknisJadwalPage = () => {
    const navigate = useNavigate();
    const { selectedSupervisorId } = useSupervisorPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedSupervisorId) {
            fetchData();
        }
    }, [selectedSupervisorId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await projectService.getProjects({ supervisorId: selectedSupervisorId });
            if (response.success) {
                setProjects(response.data || []);
            }
        } catch (err) {
            console.error("TeknisJadwalPage: Error fetching projects:", err);
            setError("Gagal memuat jadwal proyek.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const filteredProjects = projects.filter(p => 
        (p.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.projectCode || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!selectedSupervisorId) {
        return <RoleDataState type="empty" message="Pilih persona Pengawas untuk memonitor jadwal proyek." />;
    }

    if (loading) return <RoleDataState type="loading" message="Menganalisis jadwal dan timeline proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        JADWAL / <span className="text-blue-600 uppercase">Kurva S (Lokal)</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Monitoring timeline, tahapan, dan estimasi penyelesaian proyek secara lokal. (Read-Only)
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <FiCalendar className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Timeline Monitoring</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari proyek untuk monitor jadwal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                />
            </div>

            {/* SCHEDULE LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((p) => {
                        const activeStage = (p.stages || []).find(s => s.status === 'Berjalan') || (p.stages || [])[0];
                        return (
                            <div key={p.id} className="dashboard-card group hover:border-blue-200 transition-all cursor-pointer overflow-hidden" onClick={() => navigate(`/pengawas/proyek/${p.id}`)}>
                                <div className="p-1 bg-blue-50 border-b border-blue-100 flex justify-between items-center px-4">
                                    <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">{p.projectCode}</span>
                                    <FiActivity size={12} className="text-blue-300" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-sm font-black text-[var(--dashboard-text)] mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h3>
                                    
                                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Tahapan Aktif</span>
                                            <span className="text-[10px] font-black text-blue-600 uppercase truncate max-w-[120px]">{activeStage?.name || "Belum Dimulai"}</span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: `${p.verifiedProgress ?? 0}%` }} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                                <FiClock size={10} />
                                                <span>Mulai</span>
                                            </div>
                                            <p className="text-[11px] font-black text-[var(--dashboard-text)]">{formatDate(p.startDate)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                                <FiCalendar size={10} className="text-red-400" />
                                                <span>Deadline</span>
                                            </div>
                                            <p className="text-[11px] font-black text-red-500">{formatDate(p.estimatedEndDate)}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 mt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                                            <FiLayers size={10} />
                                            <span className="text-[8px] font-black uppercase tracking-widest">{p.stages?.length || 0} Stages</span>
                                        </div>
                                        <button className="text-[9px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Buka Jadwal <FiChevronRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center dashboard-card border-dashed">
                        <FiCalendar size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Jadwal Tidak Ditemukan</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic">
                            Belum ada jadwal proyek yang dialokasikan ke Anda.
                        </p>
                    </div>
                )}
            </div>

            {/* INFO BOX */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FiInfo className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-black text-lg tracking-tight mb-1 text-blue-400 uppercase">Monitoring Timeline Lokal</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium uppercase tracking-tighter">
                        Panel jadwal ini adalah representasi visual dari tahapan proyek di database. Pengawas memantau deviasi waktu tanpa otorisasi untuk mengubah baseline jadwal resmi. Gunakan menu <strong>Tahapan</strong> di detail proyek untuk menandai penyelesaian tahapan secara lokal.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeknisJadwalPage;
