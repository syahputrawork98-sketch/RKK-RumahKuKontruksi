import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FiSearch, 
    FiLayers, 
    FiInfo, 
    FiChevronRight,
    FiActivity,
    FiCamera,
    FiImage
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";

const TeknisGambarKerjaPage = () => {
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
            console.error("TeknisGambarKerjaPage: Error fetching projects:", err);
            setError("Gagal memuat daftar gambar kerja proyek.");
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.projectCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!selectedSupervisorId) {
        return <RoleDataState type="empty" message="Pilih persona Pengawas untuk mengakses gambar kerja." />;
    }

    if (loading) return <RoleDataState type="loading" message="Mempersiapkan akses arsip gambar kerja..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        ARSIP <span className="text-blue-600 uppercase">Gambar Kerja (Technical)</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Akses referensi visual dan gambar teknik terbaru untuk menunjang akurasi pengawasan lapangan. (Read-Only)
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <FiLayers className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Visual Reference</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari proyek untuk akses gambar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                />
            </div>

            {/* DRAWING LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((p) => (
                        <div key={p.id} className="dashboard-card group hover:border-blue-200 transition-all cursor-pointer overflow-hidden" onClick={() => navigate(`/pengawas/proyek/${p.id}`)}>
                            <div className="aspect-video bg-slate-100 relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 group-hover:text-blue-200 transition-colors">
                                    <FiImage size={48} />
                                    <p className="text-[9px] font-black uppercase tracking-widest mt-2">Technical Archive</p>
                                </div>
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">Blueprint</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest block mb-1">{p.projectCode}</span>
                                <h3 className="text-sm font-black text-[var(--dashboard-text)] group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h3>
                                
                                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded-md border border-amber-100">
                                        <FiActivity size={10} />
                                        <span className="text-[8px] font-black uppercase tracking-widest">Hold: Integration</span>
                                    </div>
                                    <button className="text-[9px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Lihat Gambar <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center dashboard-card border-dashed">
                        <FiCamera size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Arsip Gambar Kosong</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic">
                            Belum ada gambar kerja yang terdaftar di database lokal.
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
                    <h4 className="font-black text-lg tracking-tight mb-1 text-blue-400 uppercase">Integritas Gambar Kerja Lapangan</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium uppercase tracking-tighter">
                        Seluruh gambar yang tampil di halaman ini adalah referensi visual dari database lokal. Pengawas menggunakan data ini hanya untuk verifikasi kesesuaian fisik di lapangan. <strong>Final Technical Approval</strong> tetap berada pada otoritas Arsitek dan Admin melalui sistem manajemen dokumen terpisah.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeknisGambarKerjaPage;
