import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiCheckCircle, FiChevronRight, FiClock, FiUser, FiLayers } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import { getFieldIssues, updateFieldIssueStatus } from "../../services/fieldIssues.service";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const KendalaLapanganPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    const fetchData = async () => {
        if (!selectedSupervisorId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            // On the backend, we filter by supervisorId if we want, 
            // but usually we want to see issues for projects this supervisor is assigned to.
            // For now, let's just get all and filter locally or use the existing service.
            const data = await getFieldIssues({ supervisorId: selectedSupervisorId });
            setIssues(data.data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat data kendala");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedSupervisorId]);

    const handleUpdateStatus = async (id, status) => {
        const resolutionNote = prompt("Tambahkan catatan tindak lanjut / resolusi:");
        if (resolutionNote === null) return; // Cancelled

        try {
            await updateFieldIssueStatus(id, { status, resolutionNote });
            setIssues(issues.map(issue => issue.id === id ? { ...issue, status, resolutionNote } : issue));
        } catch (err) {
            alert("Gagal memperbarui status: " + err.message);
        }
    };

    if (!selectedSupervisorId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas"
                description="Pilih pengawas untuk melihat daftar kendala lapangan dari proyek yang diawasi."
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
        if (activeTab === "open") return issue.status === "open";
        if (activeTab === "resolved") return issue.status === "resolved";
        return true;
    });

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Kendala & Rekomendasi</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pantau kendala yang dilaporkan mandor dan berikan arahan teknis.</p>
                </div>
            </div>

            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {[
                    { id: "all", label: "Semua Kendala" },
                    { id: "open", label: "Perlu Tindakan" },
                    { id: "resolved", label: "Selesai" },
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
                        <div key={issue.id} className="dashboard-card group hover:border-[var(--dashboard-primary)]/30 transition-all">
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
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                            <FiUser size={12} className="text-[var(--dashboard-primary)]" />
                                            <span>Pelapor: Mandor {issue.foreman?.name || 'Unknown'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                            <FiClock size={12} className="text-[var(--dashboard-primary)]" />
                                            <span>Dilaporkan: {new Date(issue.createdAt).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>

                                    {issue.resolutionNote && (
                                        <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Catatan Resolusi / Arahan:</p>
                                            <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">"{issue.resolutionNote}"</p>
                                        </div>
                                    )}
                                </div>

                                <div className="md:w-56 flex flex-col justify-center gap-2">
                                    <div className={`text-center py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                        issue.status === 'open' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                    }`}>
                                        Status: {issue.status.replace('_', ' ')}
                                    </div>
                                    
                                    {issue.status === 'open' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(issue.id, 'resolved')}
                                            className="w-full py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                        >
                                            <FiCheckCircle /> Berikan Solusi
                                        </button>
                                    )}

                                    <button className="w-full py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2">
                                        Detail Proyek <FiChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <RoleDataState 
                        type="empty"
                        title="Tidak Ada Kendala"
                        description="Belum ada laporan kendala lapangan yang masuk."
                    />
                )}
            </div>
        </div>
    );
};

export default KendalaLapanganPengawasPage;
