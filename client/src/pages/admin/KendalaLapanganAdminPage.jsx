import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiCheckCircle, FiChevronRight, FiClock, FiUser, FiLayers, FiActivity, FiSearch, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import fieldIssueService from "../../services/fieldIssues.service";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

// Status mapping — Admin-friendly wording
const STATUS_MAP = {
    open:      { label: "Dilaporkan Mandor",      color: "bg-amber-50 text-amber-600 border-amber-200" },
    in_review: { label: "Dalam Review Pengawas",  color: "bg-blue-50 text-blue-600 border-blue-200" },
    resolved:  { label: "Resolved oleh Pengawas", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    closed:    { label: "Closed Administratif",   color: "bg-slate-100 text-slate-500 border-slate-200" },
    rejected:  { label: "Ditolak",                color: "bg-red-50 text-red-500 border-red-200" },
};

const getStatusDisplay = (status) =>
    STATUS_MAP[status?.toLowerCase()] || { label: status || "Tidak Diketahui", color: "bg-slate-100 text-slate-500 border-slate-200" };

const KendalaLapanganAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            // Admin sees all issues for monitoring
            const data = await fieldIssueService.getFieldIssues({});
            setIssues(data.data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat data kendala");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedAdminId]);

    const handleUpdateStatus = async (id, status) => {
        const issue = issues.find(i => i.id === id);
        
        // Guard: Admin close hanya setelah resolved oleh Pengawas
        if (status === 'closed' && issue?.status !== 'resolved') {
            alert("Kendala belum di-resolved oleh Pengawas. Penutupan administratif hanya dapat dilakukan setelah Pengawas menandai kendala sebagai resolved.");
            return;
        }
        
        const actionLabel = status === 'closed' ? 'Tutup Administratif' : 'Ubah Status';
        const resolutionNote = prompt(`Tambahkan catatan keputusan Admin untuk ${actionLabel} kendala ini (opsional):`);
        if (resolutionNote === null) return;

        try {
            await fieldIssueService.updateFieldIssueStatus(id, {
                status,
                resolutionNote: resolutionNote.trim() || `Ditutup secara administratif oleh Admin.`,
                adminId: selectedAdminId
            });
            setIssues(issues.map(issue => issue.id === id ? { ...issue, status, resolutionNote: resolutionNote.trim() || `Ditutup secara administratif.` } : issue));
        } catch (err) {
            alert("Gagal memperbarui status: " + err.message);
        }
    };

    if (!selectedAdminId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Admin"
                description="Pilih admin untuk memonitor seluruh kendala lapangan proyek."
            />
        );
    }

    if (loading && issues.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title={error} onRetry={() => fetchData()} />;
    }

    const filteredIssues = issues.filter(issue => {
        if (!issue) return false;
        
        // Tab Filter
        const matchesTab = 
            activeTab === "all" ||
            (activeTab === "open" && (issue.status === "open" || issue.status === "in_review")) ||
            (activeTab === "resolved" && (issue.status === "resolved" || issue.status === "closed"));
            
        if (!matchesTab) return false;

        // Search Filter
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
            (issue.title?.toLowerCase() || "").includes(q) ||
            (issue.project?.name?.toLowerCase() || "").includes(q) ||
            (issue.description?.toLowerCase() || "").includes(q) ||
            (issue.foreman?.name?.toLowerCase() || "").includes(q);
            
        return matchesSearch;
    });

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight uppercase">Monitoring <span className="text-[var(--dashboard-primary)]">Kendala Lapangan</span></h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">Pantau hambatan operasional di lapangan. Tutup kendala secara administratif setelah Pengawas memberi resolusi teknis.</p>
                </div>
                <div className="relative w-full md:w-80">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari kendala, proyek, pelapor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-800/20"
                    />
                </div>
            </div>

            {/* Role Guard Banner */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <div className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                    <strong>Peran Admin:</strong> Monitor seluruh kendala lapangan dari semua proyek. Lakukan <strong>penutupan administratif (closed)</strong> hanya setelah Pengawas menandai kendala sebagai <strong>resolved</strong>. Penyelesaian kendala <strong>tidak mengubah progres resmi proyek (SOT)</strong>.
                </div>
            </div>

            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {[
                    { id: "all", label: "Semua Laporan" },
                    { id: "open", label: "Aktif / Belum Selesai" },
                    { id: "resolved", label: "Selesai / Diarsipkan" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeTab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => (
                        <div key={issue.id} className="dashboard-card group">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{issue.project?.projectCode || 'PROYEK'}</span>
                                        <StatusBadge type="priority" status={issue.priority || 'NORMAL'} />
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                                            {issue.category || 'LAINNYA'}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase ${getStatusDisplay(issue.status).color}`}>
                                            {getStatusDisplay(issue.status).label}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold">{issue.title}</h4>
                                    <p className="text-xs font-medium text-[var(--dashboard-text-soft)] leading-relaxed italic border-l-2 border-red-100 pl-3">
                                        "{issue.description}"
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                            <FiUser size={12} className="text-blue-500" />
                                            <span>Mandor: {issue.foreman?.name || 'Unknown'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                            <FiCheckCircle size={12} className="text-emerald-500" />
                                            <span>Pengawas: {issue.supervisor?.name || 'Belum Ditugaskan'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                            <FiClock size={12} className="text-slate-400" />
                                            <span>{new Date(issue.createdAt).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>

                                    {issue.resolutionNote && (
                                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                                            <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Status Resolusi / Catatan:</p>
                                            <p className="text-xs font-medium text-blue-800 dark:text-blue-300">"{issue.resolutionNote}"</p>
                                        </div>
                                    )}
                                </div>

                                <div className="md:w-56 flex flex-col justify-center gap-2">
                                    <div className="text-center py-1">
                                        <StatusBadge type="issue" status={issue.status} />
                                    </div>
                                    
                                    {/* Admin close — guarded: only after resolved by Pengawas */}
                                    {issue.status === 'resolved' ? (
                                        <button 
                                            onClick={() => handleUpdateStatus(issue.id, 'closed')}
                                            className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                                        >
                                            <FiActivity /> Tutup Administratif
                                        </button>
                                    ) : issue.status === 'closed' ? (
                                        <div className="w-full py-2.5 bg-slate-100 text-slate-400 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-center cursor-not-allowed">
                                            Sudah Closed Administratif
                                        </div>
                                    ) : (
                                        <div 
                                            className="w-full py-2.5 bg-slate-50 text-slate-400 border border-dashed border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-center cursor-not-allowed"
                                            title="Penutupan administratif hanya tersedia setelah Pengawas menandai kendala sebagai resolved."
                                        >
                                            Menunggu Resolved Pengawas
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => issue.projectId ? navigate(`/admin/proyek/${issue.projectId}`) : alert("ID Proyek tidak tersedia.")}
                                        disabled={!issue.projectId}
                                        className={`w-full py-2.5 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                                            issue.projectId 
                                            ? "bg-[var(--dashboard-surface-soft)] border-[var(--dashboard-border)] hover:bg-[var(--dashboard-primary)] hover:text-white" 
                                            : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                                        }`}
                                    >
                                        Monitoring Proyek <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <RoleDataState 
                        type="empty"
                        title="Tidak Ada Kendala"
                        description="Belum ada laporan kendala lapangan yang tercatat di sistem. Kendala akan muncul setelah Mandor melaporkan masalah di proyek."
                    />
                )}
            </div>

            {/* Footer SOT Guard */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                    <strong>Catatan Governance:</strong> Penutupan kendala secara administratif (<strong>closed</strong>) bersifat koordinatif saja dan <strong>tidak mengubah progres resmi proyek (Project.verifiedProgress)</strong>. Progres resmi tetap mengikuti alur Verifikasi Progres Pengawas.
                </p>
            </div>
        </div>
    );
};

export default KendalaLapanganAdminPage;
