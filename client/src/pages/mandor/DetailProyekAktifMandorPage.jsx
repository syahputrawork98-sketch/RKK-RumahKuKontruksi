import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiList, 
    FiActivity, 
    FiUsers, 
    FiShoppingCart, 
    FiCamera, 
    FiAlertTriangle, 
    FiMapPin, 
    FiClock 
} from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailProyekAktifMandorPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { selectedForemanId } = useForemanPersona();
    const [activeTab, setActiveTab] = useState("overview");
    const [project, setProject] = useState(null);
    const [rabPlan, setRabPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedForemanId || !projectId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                
                const [projectRes, rabRes] = await Promise.all([
                    projectService.getProjectById(projectId),
                    rabService.getRabByProject(projectId).catch(() => ({ data: null }))
                ]);

                if (projectRes.success) {
                    const projectData = projectRes.data;
                    // Validate that project belongs to this foreman
                    if (projectData.foremanId !== selectedForemanId) {
                        setError("Proyek ini tidak ditugaskan kepada Anda.");
                    } else {
                        setProject(projectData);
                        setRabPlan(rabRes.data);
                    }
                } else {
                    setError("Proyek tidak ditemukan.");
                }
            } catch (err) {
                console.error("Failed to fetch project detail:", err);
                setError("Gagal mengambil detail proyek dari database.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [projectId, selectedForemanId]);

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "scope", label: "Scope Pekerjaan", icon: FiList },
        { id: "tugas", label: "Tugas Hari Ini", icon: FiList },
        { id: "progress", label: "Progress", icon: FiActivity },
        { id: "tim", label: "Tim Lapangan", icon: FiUsers },
        { id: "material", label: "Material", icon: FiShoppingCart },
        { id: "dokumentasi", label: "Dokumentasi", icon: FiCamera },
        { id: "kendala", label: "Kendala", icon: FiAlertTriangle },
    ];

    if (!selectedForemanId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Mandor untuk melihat detail eksekusi proyek ini."
            />
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="animate-fadeIn">
                <button 
                    onClick={() => navigate("/mandor/proyek-aktif")}
                    className="mb-6 p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all inline-flex items-center gap-2 text-xs font-bold"
                >
                    <FiArrowLeft size={16} /> KEMBALI
                </button>
                <RoleDataState 
                    type="error"
                    title={error}
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="animate-fadeIn">
                <button 
                    onClick={() => navigate("/mandor/proyek-aktif")}
                    className="mb-6 p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all inline-flex items-center gap-2 text-xs font-bold"
                >
                    <FiArrowLeft size={16} /> KEMBALI
                </button>
                <RoleDataState 
                    type="empty"
                    title="Proyek Tidak Ditemukan"
                    description="Proyek yang Anda cari tidak tersedia atau Anda tidak memiliki akses ke proyek ini."
                />
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/mandor/proyek-aktif")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{project.projectCode}</h2>
                            <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                                Eksekusi Lapangan
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{project.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate("/mandor/jurnal-mingguan/create")}
                        className="px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                    >
                        Lapor Progres
                    </button>
                    <button className="px-5 py-2.5 bg-slate-400 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-400/20 cursor-not-allowed opacity-70">
                        Lapor Kendala (Hold)
                    </button>
                </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 border-b border-[var(--dashboard-border)]">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                            ${activeTab === tab.id 
                                ? "bg-[var(--dashboard-primary)] text-white shadow-lg shadow-[var(--dashboard-primary)]/20 translate-y-0.5" 
                                : "text-[var(--dashboard-text-soft)] hover:bg-[var(--dashboard-surface-soft)] hover:text-[var(--dashboard-text)]"}
                        `}
                    >
                        <tab.icon />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card min-h-[400px]">
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Info Lapangan</h4>
                                            <div className="flex items-center gap-3">
                                                <FiMapPin className="text-[var(--dashboard-text-soft)]" />
                                                <span className="text-sm font-bold">{project.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiUsers className="text-[var(--dashboard-primary)]" />
                                                <span className="text-sm font-black uppercase tracking-tighter">Pengawas: {project.supervisor?.name || 'Belum Ditugaskan'}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FiClock className="text-amber-500" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Target Hari Ini</span>
                                            </div>
                                            {/* TODO: replace with real target data from daily task backend */}
                                            <p className="text-xs font-bold leading-relaxed italic text-slate-400">"Belum ada target tugas hari ini"</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6 text-right">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Deadline Estimasi</p>
                                            <p className="text-lg font-black text-red-500">{project.estimatedEndDate ? new Date(project.estimatedEndDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Tahapan Berjalan</p>
                                            <p className="text-sm font-black text-[var(--dashboard-primary)] uppercase">{project.stages?.find(s => s.status === 'Berjalan')?.name || 'Belum Dimulai'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-[var(--dashboard-border)]">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Progress Akumulatif (Resmi)</h4>
                                        <span className="text-2xl font-black">{project.verifiedProgress || 0}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-1 border border-[var(--dashboard-border)] shadow-inner">
                                        <div className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${project.verifiedProgress || 0}%` }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "scope" && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Scope Pekerjaan & Item Lapangan</h3>
                                </div>

                                {!rabPlan ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                        <FiActivity size={48} className="text-slate-300" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-black uppercase tracking-widest text-slate-400">Data Pekerjaan Belum Tersedia</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase italic">Hubungi Pengawas/Admin untuk inisiasi daftar pekerjaan.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {rabPlan.categories?.map(cat => (
                                            <div key={cat.id} className="border border-[var(--dashboard-border)] rounded-2xl overflow-hidden shadow-sm">
                                                <div className="p-4 bg-[var(--dashboard-surface-soft)] border-b border-[var(--dashboard-border)] flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[var(--dashboard-primary)] font-black text-[10px] border border-[var(--dashboard-border)]">
                                                        {cat.code}
                                                    </div>
                                                    <span className="text-xs font-black uppercase tracking-tight">{cat.name}</span>
                                                </div>
                                                <div className="p-0 overflow-x-auto">
                                                    <table className="w-full text-left">
                                                        <thead className="bg-slate-50">
                                                            <tr className="text-[9px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b border-[var(--dashboard-border)]">
                                                                <th className="py-2 px-4">Item Pekerjaan</th>
                                                                <th className="py-2 px-4 text-center">Vol</th>
                                                                <th className="py-2 px-4 text-center">Sat</th>
                                                                <th className="py-2 px-4 text-right">Lokasi</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100">
                                                            {cat.items?.map(item => (
                                                                <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                                                                    <td className="py-3 px-4 text-[11px] font-bold text-slate-700">{item.description}</td>
                                                                    <td className="py-3 px-4 text-[11px] text-center font-black">{parseFloat(item.volume)}</td>
                                                                    <td className="py-3 px-4 text-[11px] text-center uppercase text-slate-400 font-bold">{item.unit}</td>
                                                                    <td className="py-3 px-4 text-[10px] text-right text-slate-500 italic">{item.location || '-'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab !== "overview" && activeTab !== "scope" && (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-[var(--dashboard-text-soft)] italic opacity-50">
                                <p className="text-sm font-bold">Modul {activeTab.toUpperCase()} sedang disiapkan...</p>
                                <p className="text-[10px] mt-2 tracking-widest">Foreman Role Dashboard v1.0</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card border-dashed opacity-70">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Tim Lapangan (Hold)</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-[10px] font-black uppercase">Tukang Batu</span>
                                <span className="text-xs font-black">0</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-[10px] font-black uppercase">Tukang Kayu</span>
                                <span className="text-xs font-black">0</span>
                            </div>
                        </div>
                        <p className="text-[9px] mt-4 text-slate-400 italic">Data tim harian belum tersedia di schema saat ini.</p>
                    </div>
                    
                    <div className="dashboard-card bg-slate-100 dark:bg-slate-800 border-dashed text-slate-400">
                        <h3 className="font-black text-xs uppercase tracking-widest mb-4 opacity-80">Logbook Harian (Hold)</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 opacity-30">
                                <div className="w-5 h-5 rounded border-2 border-slate-300" />
                                <span className="text-xs font-bold uppercase">Absensi Tim</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-30">
                                <div className="w-5 h-5 rounded border-2 border-slate-300" />
                                <span className="text-xs font-bold uppercase">Laporan Foto</span>
                            </div>
                        </div>
                        <p className="text-[9px] mt-6 italic">Modul daily logbook sedang dipersiapkan.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProyekAktifMandorPage;
