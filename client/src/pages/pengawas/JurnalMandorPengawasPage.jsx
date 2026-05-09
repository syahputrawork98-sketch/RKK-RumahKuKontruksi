import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiCalendar, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import weeklyJournalService from "../../services/weeklyJournalService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const JurnalMandorPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    const statusOptions = [
        { id: "all", label: "Semua" },
        { id: "submitted", label: "Perlu Review" },
        { id: "under_review", label: "Sedang Direview" },
        { id: "approved", label: "Disetujui" },
        { id: "revision_requested", label: "Revisi" },
    ];

    useEffect(() => {
        const fetchJournals = async () => {
            if (!selectedSupervisorId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const response = await weeklyJournalService.getWeeklyJournals({ 
                    actorRole: "pengawas", 
                    actorId: selectedSupervisorId,
                    supervisorId: selectedSupervisorId,
                    status: filterStatus === "all" ? undefined : filterStatus
                });
                if (response.success) {
                    setJournals(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch journals for supervisor:", err);
                setError("Gagal memuat daftar jurnal mandor.");
            } finally {
                setLoading(false);
            }
        };

        fetchJournals();
    }, [selectedSupervisorId, filterStatus]);

    if (!selectedSupervisorId && !loading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Pengawas untuk melihat dan mereview jurnal mingguan dari Mandor."
            />
        );
    }

    if (loading && journals.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Jurnal Mandor</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Review aktivitas mingguan dan klaim progres dari tim Mandor.</p>
                </div>
            </div>

            {/* FILTERS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {statusOptions.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => setFilterStatus(opt.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            filterStatus === opt.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {journals.length > 0 ? journals.map((journal) => (
                    <Link 
                        key={journal.id} 
                        to={`/pengawas/jurnal-mandor/${journal.id}`}
                        className="dashboard-card group hover:border-[var(--dashboard-primary)]/50 transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-2xl text-[var(--dashboard-primary)] group-hover:bg-[var(--dashboard-primary)] group-hover:text-white transition-all">
                                <FiCalendar size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{journal.project?.projectCode}</span>
                                    <StatusBadge type="journal" status={journal.status} />
                                </div>
                                <h3 className="text-lg font-black leading-tight group-hover:text-[var(--dashboard-primary)] transition-colors">{journal.project?.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <p className="text-xs font-bold text-[var(--dashboard-text-soft)] flex items-center gap-1">
                                        <FiUser size={12} /> {journal.foreman?.name || "Mandor"}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400">
                                        {new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                            <div className="text-left md:text-right">
                                <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Klaim Mandor (Non-Resmi)</p>
                                <p className="text-xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress || 0}%</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="hidden md:block text-right">
                                    <p className="text-[8px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Dikirim pada</p>
                                    <p className="text-[10px] font-bold">{journal.submittedAt ? new Date(journal.submittedAt).toLocaleDateString('id-ID') : "-"}</p>
                                </div>
                                <FiChevronRight className="text-[var(--dashboard-text-soft)] group-hover:text-[var(--dashboard-primary)] group-hover:translate-x-1 transition-all" size={20} />
                            </div>
                        </div>
                    </Link>
                )) : (
                    <div className="py-20 text-center text-slate-400 font-medium italic border-2 border-dashed border-slate-100 rounded-2xl">
                        Tidak ada jurnal mandor untuk status ini.
                    </div>
                )}
            </div>
        </div>
    );
};

export default JurnalMandorPengawasPage;
