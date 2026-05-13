import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FiSearch, 
    FiFileText, 
    FiInfo, 
    FiChevronRight,
    FiActivity,
    FiDollarSign,
    FiPieChart
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";

const TeknisRabBaselinePage = () => {
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
            console.error("TeknisRabBaselinePage: Error fetching projects:", err);
            setError("Gagal memuat data anggaran proyek.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!selectedSupervisorId) {
        return <RoleDataState type="empty" message="Pilih persona Pengawas untuk memonitor RAB proyek." />;
    }

    if (loading) return <RoleDataState type="loading" message="Menganalisis acuan anggaran proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        RAB & <span className="text-blue-600 uppercase">Scope Baseline</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Acuan anggaran dan lingkup pekerjaan (scope) proyek sebagai dasar verifikasi progres lapangan. (Read-Only)
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <FiPieChart className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Technical Reference</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari kode atau nama proyek..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                />
            </div>

            {/* PROJECT LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((p) => (
                        <div key={p.id} className="dashboard-card group hover:border-blue-200 transition-all cursor-pointer overflow-hidden" onClick={() => navigate(`/pengawas/proyek/${p.id}`)}>
                            <div className="p-1 bg-blue-50 border-b border-blue-100 flex justify-between items-center px-4">
                                <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">{p.projectCode}</span>
                                <FiActivity size={12} className="text-blue-300" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-sm font-black text-[var(--dashboard-text)] mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h3>
                                <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter mb-6">{p.location}</p>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-[var(--dashboard-text-soft)]">
                                            <FiDollarSign size={14} className="text-emerald-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-tighter leading-none">Total Anggaran</span>
                                        </div>
                                        <span className="text-xs font-black text-emerald-600 leading-none">{formatCurrency(p.budgetTotal)}</span>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Baseline Set</span>
                                        </div>
                                        <button className="text-[9px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Buka RAB <FiChevronRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center dashboard-card border-dashed">
                        <FiFileText size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Proyek Tidak Ditemukan</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic">
                            {searchQuery ? "Tidak ada proyek yang cocok dengan pencarian Anda." : "Anda belum ditugaskan ke proyek manapun."}
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
                    <h4 className="font-black text-lg tracking-tight mb-1 text-blue-400 uppercase">Prinsip Read-Only Baseline</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium uppercase tracking-tighter">
                        Data RAB dan Scope di halaman ini bersifat <strong>Read-Only</strong> untuk acuan pengawasan. Pengawas tidak dapat mengubah anggaran, harga satuan, atau volume kontrak. Perubahan progres resmi hanya dapat dilakukan melalui menu <strong>Verifikasi Progres</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeknisRabBaselinePage;
