import React, { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiCheckCircle, FiActivity } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import projectStageService from "../../services/projectStageService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const MandorJadwalInfoPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [stages, setStages] = useState([]);

    useEffect(() => {
        if (selectedForemanId) {
            fetchJadwalData();
        }
    }, [selectedForemanId]);

    const fetchJadwalData = async () => {
        try {
            setLoading(true);
            const projRes = await projectService.getProjects({ foremanId: selectedForemanId });
            const activeProj = projRes.data?.find(p => p.status === "Berjalan") || projRes.data?.[0];
            
            if (activeProj) {
                setProject(activeProj);
                const stagesRes = await projectStageService.getStagesByProject(activeProj.id);
                setStages(stagesRes.data || []);
            }
            setLoading(false);
        } catch (err) {
            setError(err.message || "Gagal memuat data jadwal");
            setLoading(false);
        }
    };

    if (!selectedForemanId) {
        return <RolePersonaEmptyState title="Pilih Persona Mandor" description="Pilih mandor untuk melihat jadwal kerja." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat jadwal kerja..." />;
    if (error) return <RoleDataState type="error" title={error} onRetry={fetchJadwalData} />;
    if (!project) return <RoleDataState type="empty" title="Tidak Ada Proyek Aktif" description="Anda tidak memiliki proyek aktif yang ditugaskan saat ini." />;

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("finish") || s?.includes("selesai") || s?.includes("completed")) {
            return <span className="px-3 py-1 bg-purple-50 text-purple-600 text-[10px] font-black uppercase rounded-full border border-purple-100 flex items-center gap-1.5"><FiCheckCircle /> Selesai</span>;
        }
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("berjalan") || s?.includes("in_progress")) {
            return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-100 flex items-center gap-1.5"><FiActivity className="animate-pulse" /> Sedang Berjalan</span>;
        }
        return <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] font-black uppercase rounded-full border border-slate-100 flex items-center gap-1.5"><FiClock /> Belum Dimulai</span>;
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Jadwal Kerja Mandor</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Urutan tahapan pekerjaan dan target pencapaian di lapangan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="dashboard-card border-emerald-100 bg-emerald-50/20">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Proyek</p>
                    <p className="text-lg font-black text-emerald-600">{project.status}</p>
                </div>
                <div className="dashboard-card border-blue-100 bg-blue-50/20">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Progress Terverifikasi</p>
                    <p className="text-lg font-black text-blue-600">{project.verifiedProgress || 0}%</p>
                </div>
                <div className="dashboard-card border-slate-100 bg-slate-50/20">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Tahapan</p>
                    <p className="text-lg font-black text-slate-700">{stages.length} Kategori</p>
                </div>
            </div>

            <div className="space-y-4 relative before:absolute before:left-8 md:before:left-12 before:top-4 before:bottom-4 before:w-1 before:bg-slate-100">
                {stages.map((stg, index) => (
                    <div key={stg.id} className="relative pl-20 md:pl-28">
                        {/* Timeline Node */}
                        <div className={`absolute left-5 md:left-9 top-6 w-6 h-6 rounded-full bg-white border-4 transition-all z-10 ${
                            stg.status?.toLowerCase().includes('finish') ? 'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 
                            stg.status?.toLowerCase().includes('in_progress') ? 'border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse' : 
                            'border-slate-200'
                        }`} />
                        
                        <div className="dashboard-card group hover:border-[var(--dashboard-primary)]/30 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Tahap {index + 1}</span>
                                        {getStatusBadge(stg.status)}
                                    </div>
                                    <h4 className="text-base font-black text-slate-800">{stg.title}</h4>
                                    <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                        <div className="flex items-center gap-1"><FiCalendar /> Start: {stg.startDate ? new Date(stg.startDate).toLocaleDateString('id-ID') : "-"}</div>
                                        <div className="flex items-center gap-1"><FiCalendar /> End: {stg.endDate ? new Date(stg.endDate).toLocaleDateString('id-ID') : "-"}</div>
                                    </div>
                                </div>
                                <div className="md:w-32">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Progress</span>
                                        <span className="text-xs font-black text-blue-600">{stg.progress || 0}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <div 
                                            className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                                            style={{ width: `${stg.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {stages.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 ml-20 md:ml-28">
                        <p className="text-sm font-bold text-slate-400 italic">Belum ada tahapan kerja yang didefinisikan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MandorJadwalInfoPage;
