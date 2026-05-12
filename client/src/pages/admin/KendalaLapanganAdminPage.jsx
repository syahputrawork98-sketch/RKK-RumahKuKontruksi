import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiCheckCircle, FiChevronRight, FiClock, FiUser, FiLayers, FiActivity } from "react-icons/fi";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import fieldIssueService from "../../services/fieldIssues.service";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const KendalaLapanganAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

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
        const resolutionNote = prompt("Tambahkan catatan resolusi/keputusan Admin:");
        if (resolutionNote === null) return;

        try {
            await fieldIssueService.updateFieldIssueStatus(id, { status, resolutionNote, adminId: selectedAdminId });
            setIssues(issues.map(issue => issue.id === id ? { ...issue, status, resolutionNote } : issue));
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
        if (activeTab === "open") return issue.status === "open" || issue.status === "in_review";
        if (activeTab === "resolved") return issue.status === "resolved" || issue.status === "closed";
        return true;
    });

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Monitoring Kendala Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pantau seluruh hambatan proyek dan pastikan resolusi berjalan tepat waktu.</p>
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
                                        <StatusBadge type="priority" status={issue.priority} />
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                                            {issue.category}
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
                                    <div className={`text-center py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                                        issue.status === 'open' ? 'bg-red-50 text-red-600 border-red-200' : 
                                        issue.status === 'resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                        'bg-slate-50 text-slate-600 border-slate-200'
                                    }`}>
                                        Status: {issue.status.replace('_', ' ')}
                                    </div>
                                    
                                    {issue.status !== 'closed' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(issue.id, 'closed')}
                                            className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                                        >
                                            <FiActivity /> Tutup / Arsipkan
                                        </button>
                                    )}

                                    <button className="w-full py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2">
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
                        description="Belum ada laporan kendala lapangan yang tercatat di sistem."
                    />
                )}
            </div>
        </div>
    );
};

export default KendalaLapanganAdminPage;
