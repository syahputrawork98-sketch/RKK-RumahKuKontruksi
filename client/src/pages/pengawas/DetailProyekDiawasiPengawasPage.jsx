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
    FiTag,
    FiX,
    FiActivity
} from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import DailyMonitoringTab from "../../components/common/DailyMonitoringTab";

const DetailProyekDiawasiPengawasPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { selectedSupervisorId } = useSupervisorPersona();
    const [activeTab, setActiveTab] = useState("overview");
    const [project, setProject] = useState(null);
    const [rabPlan, setRabPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // Stage Completion Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStage, setSelectedStage] = useState(null);
    const [completionNote, setCompletionNote] = useState("");

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

    const handleOpenModal = (stage) => {
        setSelectedStage(stage);
        setCompletionNote("");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStage(null);
        setCompletionNote("");
    };

    const handleCompleteStage = async () => {
        if (!selectedStage || !selectedSupervisorId) return;
        
        try {
            setIsActionLoading(true);
            setError(null);
            setSuccessMsg(null);

            const response = await projectService.updateProjectStage(projectId, selectedStage.id, {
                actorRole: 'pengawas',
                actorId: selectedSupervisorId,
                status: 'Selesai',
                note: completionNote
            });

            if (response.success) {
                setSuccessMsg(`Tahapan "${selectedStage.title}" berhasil ditandai selesai secara lokal.`);
                
                // Refresh project data to get updated stages
                const projectRes = await projectService.getProjectById(projectId);
                if (projectRes.success) {
                    setProject(projectRes.data);
                }
                
                handleCloseModal();
                // Scroll to top to see success message
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err) {
            console.error("Failed to complete stage:", err);
            setError(err.response?.data?.message || "Gagal memperbarui tahapan.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "rab", label: "RAB / Scope", icon: FiFileText },
        { id: "tahapan", label: "Tahapan", icon: FiLayers },
        { id: "harian", label: "Harian Lapangan", icon: FiFileText },
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
            {project.status === 'Selesai' && (
                <div className="bg-purple-600 text-white p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-600/20 animate-slideDown">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <FiCheckCircle size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Proyek Selesai Secara Lokal</h3>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mt-0.5">Seluruh Tahapan Telah Ditutup</p>
                        </div>
                    </div>
                    <div className="text-right max-w-xs">
                        <p className="text-[10px] font-black uppercase tracking-tighter leading-relaxed">
                            Proyek telah ditutup oleh Admin. Seluruh akses verifikasi lapangan telah dihentikan. Data tersimpan sebagai riwayat pengawasan resmi.
                        </p>
                    </div>
                </div>
            )}
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
                                : project.status === 'Selesai'
                                ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                            }`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{project.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => navigate("/pengawas/verifikasi-progres")}
                        disabled={project.status === 'Selesai'}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all 
                            ${project.status === 'Selesai' 
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                                : "bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
                            }`}
                    >
                        {project.status === 'Selesai' ? "Hold: Proyek Selesai" : "Verifikasi Progress"}
                    </button>
                </div>
            </div>
            
            {successMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-fadeIn">
                    <FiCheckCircle className="shrink-0" />
                    {successMsg}
                </div>
            )}

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

                                <div className="space-y-4 p-6 bg-blue-50/50 border border-blue-100 rounded-[2rem]">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Progress Resmi (Source of Truth)</h4>
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-600 text-white rounded-md">
                                            <FiCheckCircle size={10} />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Validated SOT</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-black uppercase">
                                            <span className="text-blue-900">Verified Progress</span>
                                            <span className="text-blue-600 text-xl leading-none">{project.verifiedProgress !== undefined && project.verifiedProgress !== null ? project.verifiedProgress : project.progress || 0}%</span>
                                        </div>
                                        <div className="w-full h-4 bg-white rounded-full overflow-hidden p-1 border border-blue-100 shadow-inner">
                                            <div className="h-full bg-linear-to-r from-blue-600 to-blue-400 rounded-full shadow-lg shadow-blue-500/20" style={{ width: `${project.verifiedProgress !== undefined && project.verifiedProgress !== null ? project.verifiedProgress : project.progress || 0}%` }} />
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-[9px] text-blue-400 font-bold italic uppercase tracking-tighter">
                                                Update Terakhir: {project.verifiedProgressUpdatedAt ? new Date(project.verifiedProgressUpdatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Belum ada verifikasi'}
                                            </p>
                                            <p className="text-[8px] font-black text-blue-700 uppercase tracking-widest">Hanya diubah via Verifikasi Progres</p>
                                        </div>
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
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">
                                            Visibility: Customer-Visible Preparation
                                        </span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1 italic">* Visibility control formal (Local Hold)</span>
                                    </div>
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
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase border ${
                                                                stage.status === 'Selesai' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                stage.status === 'Berjalan' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                                'bg-slate-100 text-slate-400 border-slate-200'
                                                            }`}>{stage.status}</span>
                                                            <span className="text-[9px] text-slate-300">•</span>
                                                            <span className="text-[9px] font-bold text-slate-400">{stage.progress || 0}%</span>
                                                            {stage.isVerified && (
                                                                <>
                                                                    <span className="text-[9px] text-slate-300">•</span>
                                                                    <span className="text-[8px] font-black text-emerald-600 flex items-center gap-1 uppercase">
                                                                        <FiCheckCircle size={10} /> Terverifikasi Lokal
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right hidden sm:block">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Deadline</p>
                                                        <p className="text-[10px] font-bold text-slate-700">{stage.endDate ? new Date(stage.endDate).toLocaleDateString('id-ID') : '-'}</p>
                                                    </div>
                                                    {stage.status !== 'Selesai' && project.status === 'Berjalan' && (
                                                        <button 
                                                            onClick={() => handleOpenModal(stage)}
                                                            className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.05] transition-all"
                                                        >
                                                            Tandai Selesai
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        
                                        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                                            <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-amber-800 uppercase tracking-tighter leading-tight">
                                                    Penyelesaian tahapan (Stage Completion) di sini bersifat lokal untuk pengawasan.
                                                </p>
                                                <p className="text-[10px] font-medium text-amber-700 leading-tight">
                                                    Penyelesaian ini membantu memantau timeline, namun tidak otomatis memperbarui progres resmi proyek. Untuk memperbarui progres SOT, silakan gunakan menu <button onClick={() => navigate("/pengawas/verifikasi-progres")} className="underline font-bold text-amber-900">Verifikasi Progres</button>.
                                                </p>
                                            </div>
                                        </div>
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
                        {activeTab === "harian" && (
                            <DailyMonitoringTab projectId={projectId} />
                        )}
                        {activeTab !== "overview" && activeTab !== "rab" && activeTab !== "tahapan" && activeTab !== "harian" && (
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

            {/* COMPLETION MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-black tracking-tight">Tandai Selesai Lokal</h3>
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mt-0.5">{selectedStage?.title}</p>
                            </div>
                            <button 
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex gap-3">
                                <FiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" />
                                <p className="text-[10px] font-black text-emerald-800 leading-relaxed uppercase tracking-tighter">
                                    Status tahapan ini akan berubah menjadi "Selesai" (100%) untuk memudahkan pemantauan jadwal & timeline.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Catatan / Bukti Pekerjaan (Opsional)</label>
                                <textarea 
                                    value={completionNote}
                                    onChange={(e) => setCompletionNote(e.target.value)}
                                    placeholder="Tuliskan catatan singkat mengenai penyelesaian tahapan ini..."
                                    className="w-full p-4 rounded-2xl bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] text-sm font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:outline-none min-h-[100px] transition-all"
                                />
                            </div>

                            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-3">
                                <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] font-black text-amber-800 leading-tight uppercase">
                                    Tindakan ini tidak mengubah progress resmi proyek.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                            <button 
                                onClick={handleCompleteStage}
                                disabled={isActionLoading}
                                className="flex-1 py-3.5 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {isActionLoading ? "Memproses..." : "Konfirmasi Selesai"}
                            </button>
                            <button 
                                onClick={handleCloseModal}
                                disabled={isActionLoading}
                                className="px-6 py-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-50"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailProyekDiawasiPengawasPage;
