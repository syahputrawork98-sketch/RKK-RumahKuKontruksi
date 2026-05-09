import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiLayers, 
    FiCheckCircle, 
    FiCamera, 
    FiShoppingCart, 
    FiAlertCircle, 
    FiMapPin, 
    FiUser, 
    FiClock,
    FiFileText,
    FiTag
} from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailProyekDiawasiPengawasPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { selectedSupervisorId } = useSupervisorPersona();
    const [activeTab, setActiveTab] = useState("overview");
    const [project, setProject] = useState(null);
    const [rabPlan, setRabPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedSupervisorId || !projectId) {
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
                    setProject(projectRes.data);
                    setRabPlan(rabRes.data);
                } else {
                    setError("Proyek tidak ditemukan.");
                }
            } catch (err) {
                console.error("Failed to fetch project detail:", err);
                setError("Gagal mengambil detail proyek.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [projectId, selectedSupervisorId]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "rab", label: "RAB / Scope", icon: FiFileText },
        { id: "tahapan", label: "Tahapan", icon: FiLayers },
        { id: "checklist", label: "Checklist", icon: FiCheckCircle },
        { id: "dokumentasi", label: "Dokumentasi", icon: FiCamera },
        { id: "material", label: "Material", icon: FiShoppingCart },
        { id: "catatan", label: "Catatan Lapangan", icon: FiAlertCircle },
    ];

    if (!selectedSupervisorId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Pengawas untuk melihat detail proyek ini."
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
                    onClick={() => navigate("/pengawas/proyek")}
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
                    onClick={() => navigate("/pengawas/proyek")}
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
                        onClick={() => navigate("/pengawas/proyek")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{project.projectCode}</h2>
                            <span className={`px-3 py-0.5 text-[10px] font-black uppercase rounded-full border ${
                                project.status === 'Berjalan' 
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                            }`}>
                                Proyek {project.status}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{project.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate("/pengawas/verifikasi-progres")}
                        className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
                    >
                        Verifikasi Progress
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
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Info Lokasi & Mandor</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <FiMapPin className="text-[var(--dashboard-text-soft)] mt-0.5" />
                                                <span className="text-sm font-bold leading-relaxed">{project.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiUser className="text-[var(--dashboard-primary)]" />
                                                <span className="text-sm font-black uppercase tracking-tighter">Mandor: {project.foreman?.name || 'Belum Ditugaskan'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Status Pengerjaan</h4>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Tahapan Berjalan</p>
                                            <p className="text-sm font-black text-emerald-600">{project.stages?.find(s => s.status === 'Berjalan')?.name || 'Belum Dimulai'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Deadline Estimasi</p>
                                            <p className="text-sm font-black text-red-500">{project.estimatedEndDate ? new Date(project.estimatedEndDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Progres Resmi (Source of Truth)</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-black uppercase">
                                            <span>Terverifikasi</span>
                                            <span>{project.verifiedProgress !== undefined && project.verifiedProgress !== null ? project.verifiedProgress : project.progress || 0}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-0.5 border border-[var(--dashboard-border)]">
                                            <div className="h-full bg-linear-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full" style={{ width: `${project.verifiedProgress !== undefined && project.verifiedProgress !== null ? project.verifiedProgress : project.progress || 0}%` }} />
                                        </div>
                                        <p className="text-[9px] text-[var(--dashboard-text-soft)] font-bold italic mt-1 uppercase">
                                            Update Terakhir: {project.verifiedProgressUpdatedAt ? new Date(project.verifiedProgressUpdatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Belum ada verifikasi'}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3">
                                    <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-medium leading-relaxed italic text-blue-800 uppercase tracking-tighter">
                                        "Informasi laporan harian dan progres teknis detail sedang disinkronisasi dari database operasional."
                                    </p>
                                </div>
                            </div>
                        )}
                        {activeTab === "rab" && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Rencana Anggaran Biaya & Scope Pekerjaan</h3>
                                    {rabPlan && (
                                        <span className="text-[10px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                                            Total: {formatCurrency(rabPlan.totalAmount)}
                                        </span>
                                    )}
                                </div>

                                {!rabPlan ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                        <FiFileText size={48} className="text-slate-300" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-black uppercase tracking-widest text-slate-400">RAB Belum Tersedia</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase italic">Hubungi Admin untuk inisiasi data anggaran & scope.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {rabPlan.categories?.map(cat => (
                                            <div key={cat.id} className="border border-[var(--dashboard-border)] rounded-2xl overflow-hidden shadow-sm">
                                                <div className="p-4 bg-[var(--dashboard-surface-soft)] border-b border-[var(--dashboard-border)] flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[var(--dashboard-primary)] font-black text-[10px] border border-[var(--dashboard-border)] shadow-xs">
                                                            {cat.code}
                                                        </div>
                                                        <span className="text-xs font-black uppercase tracking-tight">{cat.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-black text-emerald-600">{formatCurrency(cat.subtotal)}</span>
                                                </div>
                                                <div className="p-0 overflow-x-auto">
                                                    <table className="w-full text-left">
                                                        <thead className="bg-slate-50">
                                                            <tr className="text-[9px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b border-[var(--dashboard-border)]">
                                                                <th className="py-2 px-4">Item Pekerjaan</th>
                                                                <th className="py-2 px-4 text-center">Vol</th>
                                                                <th className="py-2 px-4 text-center">Sat</th>
                                                                <th className="py-2 px-4 text-right">Progress</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100">
                                                            {cat.items?.map(item => (
                                                                <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                                                                    <td className="py-3 px-4 text-[11px] font-bold text-slate-700">{item.description}</td>
                                                                    <td className="py-3 px-4 text-[11px] text-center font-black">{parseFloat(item.volume)}</td>
                                                                    <td className="py-3 px-4 text-[11px] text-center uppercase text-slate-400 font-bold">{item.unit}</td>
                                                                    <td className="py-3 px-4 text-right">
                                                                        <div className="flex items-center justify-end gap-2">
                                                                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                                                <div className="h-full bg-emerald-500" style={{ width: `${item.progress || 0}%` }} />
                                                                            </div>
                                                                            <span className="text-[9px] font-black">{item.progress || 0}%</span>
                                                                        </div>
                                                                    </td>
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
                        {activeTab === "tahapan" && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Tahapan & Jadwal Proyek</h3>
                                </div>

                                {project.stages?.length > 0 ? (
                                    <div className="space-y-3">
                                        {project.stages.sort((a,b) => a.order - b.order).map(stage => (
                                            <div key={stage.id} className="p-4 bg-white border border-[var(--dashboard-border)] rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border ${
                                                        stage.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        stage.status === 'Berjalan' ? 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse' :
                                                        'bg-slate-50 text-slate-400 border-slate-100'
                                                    }`}>
                                                        {stage.order}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{stage.title}</h4>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase">{stage.status}</span>
                                                            <span className="text-[9px] text-slate-300">•</span>
                                                            <span className="text-[9px] font-bold text-slate-400">{stage.progress || 0}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Deadline</p>
                                                    <p className="text-[10px] font-bold text-slate-700">{stage.endDate ? new Date(stage.endDate).toLocaleDateString('id-ID') : '-'}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                        <FiLayers size={48} className="text-slate-300" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-black uppercase tracking-widest text-slate-400">Belum Ada Tahapan</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase italic">Jadwal tahapan belum ditentukan oleh Admin.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab !== "overview" && activeTab !== "rab" && activeTab !== "tahapan" && (
                            <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-4">
                                <div className="p-6 bg-[var(--dashboard-surface-soft)] rounded-full text-[var(--dashboard-text-soft)] opacity-30">
                                    <FiActivity size={48} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text)]">Modul {activeTab} Belum Tersedia</p>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase italic tracking-tighter">Dalam tahap pengembangan backend (Local Development CRUD Integration)</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Verifikasi Mendatang</h3>
                        <div className="space-y-4">
                            <div className="p-8 text-center bg-[var(--dashboard-surface-soft)] rounded-2xl border-2 border-dashed border-[var(--dashboard-border)]">
                                <FiClock size={24} className="mx-auto text-[var(--dashboard-text-soft)] opacity-30 mb-2" />
                                <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest leading-relaxed">
                                    Belum ada jadwal verifikasi progres terdekat.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Tim Terlibat</h3>
                        <div className="space-y-4">
                            {project.foreman && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[var(--dashboard-primary)]/10 flex items-center justify-center text-[var(--dashboard-primary)] font-black text-[10px]">
                                        {project.foreman.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">{project.foreman.name}</p>
                                        <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Mandor</p>
                                    </div>
                                </div>
                            )}
                            {project.admin && (
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-500 font-black text-[10px]">
                                        {project.admin.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">{project.admin.name}</p>
                                        <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Admin</p>
                                    </div>
                                </div>
                            )}
                            {!project.foreman && !project.admin && (
                                <p className="text-[10px] font-bold italic text-slate-400">Belum ada tim yang ditugaskan.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProyekDiawasiPengawasPage;
