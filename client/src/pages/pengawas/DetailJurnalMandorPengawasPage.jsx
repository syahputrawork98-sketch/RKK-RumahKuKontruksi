import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiX, FiRefreshCw, FiPlay, FiInfo, FiAlertCircle, FiMessageSquare, FiActivity } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import weeklyJournalService from "../../services/weeklyJournalService";
import WeeklyJournalStatusBadge from "../../components/weekly-journals/WeeklyJournalStatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailJurnalMandorPengawasPage = () => {
    const { journalId } = useParams();
    const navigate = useNavigate();
    const { selectedSupervisorId } = useSupervisorPersona();
    
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [reviewNote, setReviewNote] = useState("");

    const fetchJournal = useCallback(async () => {
        if (!selectedSupervisorId) return;
        try {
            setLoading(true);
            const response = await weeklyJournalService.getWeeklyJournalById(journalId, {
                actorRole: "pengawas",
                actorId: selectedSupervisorId
            });
            if (response.success) {
                setJournal(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch journal detail for supervisor:", err);
            setError("Gagal memuat detail jurnal mandor.");
        } finally {
            setLoading(false);
        }
    }, [journalId, selectedSupervisorId]);

    useEffect(() => {
        fetchJournal();
    }, [journalId, selectedSupervisorId, fetchJournal]);

    const handleAction = async (action) => {
        if ((action === 'request_revision' || action === 'reject') && !reviewNote) {
            alert("Catatan review wajib diisi untuk revisi atau penolakan.");
            return;
        }

        const confirmMsg = {
            'approve': "Setujui jurnal ini?",
            'reject': "Tolak jurnal ini?",
            'request_revision': "Minta revisi pada mandor?",
            'start_review': "Mulai proses review jurnal?"
        };

        if (!window.confirm(confirmMsg[action])) return;

        try {
            setSubmitting(true);
            const response = await weeklyJournalService.reviewWeeklyJournal(journalId, {
                actorRole: "pengawas",
                actorId: selectedSupervisorId,
                action,
                note: reviewNote
            });
            if (response.success) {
                setReviewNote("");
                fetchJournal();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Gagal melakukan aksi review.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!selectedSupervisorId && !loading) {
        return <RolePersonaEmptyState description="Pilih akun Pengawas untuk mereview jurnal mandor." />;
    }

    if (loading && !journal) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--dashboard-primary)] border-t-transparent"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat detail jurnal...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10">
                <RoleDataState 
                    type="error"
                    title="Gagal Memuat Jurnal"
                    description={error}
                    onRetry={fetchJournal}
                />
            </div>
        );
    }

    if (!journal) {
        return (
            <div className="p-10">
                <RoleDataState 
                    type="empty"
                    title="Jurnal Tidak Ditemukan"
                    description="Jurnal yang Anda cari tidak tersedia atau Anda tidak memiliki akses."
                />
            </div>
        );
    }

    const isPendingReview = journal.status === 'submitted' || journal.status === 'under_review';

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/pengawas/jurnal-mandor")}
                        className="p-2 hover:bg-[var(--dashboard-surface-soft)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <WeeklyJournalStatusBadge status={journal.status} />
                            <span className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">{journal.project?.projectCode}</span>
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-tight">Review Jurnal: {journal.foreman?.name}</h2>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* MAIN CONTENT */}
                    <div className="dashboard-card p-6 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--dashboard-border)] pb-4">
                            <div className="flex items-center gap-2">
                                <FiInfo className="text-[var(--dashboard-primary)]" />
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Ringkasan Aktivitas Mandor</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-tighter">
                                        Visibility: Customer-Visible Preparation
                                    </span>
                                    <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter mt-1 italic">* Visibility control formal (Local Hold)</span>
                                </div>
                                <span className="text-xs font-bold px-3 py-1 bg-[var(--dashboard-surface-soft)] rounded-lg">
                                    Periode: {new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-xl">
                            <p className="text-[10px] text-emerald-700 font-bold italic mb-2 uppercase tracking-tight flex items-center gap-2">
                                <FiActivity size={12} /> Transparansi Konsumen:
                            </p>
                            <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap">
                                {journal.summary || <span className="italic text-slate-400">Mandor tidak memberikan ringkasan.</span>}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Klaim Progres Mandor</p>
                                    <span className="text-[8px] font-black px-1.5 py-0.5 bg-amber-500 text-white rounded uppercase tracking-tighter">Non-Resmi</span>
                                </div>
                                <p className="text-3xl font-black text-amber-600">{journal.claimedProgress || 0}%</p>
                                <p className="text-[8px] font-bold text-amber-500 uppercase mt-1 italic leading-tight">
                                    * Klaim administratif untuk keperluan laporan & opname mingguan.
                                </p>
                            </div>
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest mb-1">Kendala yang Dilaporkan</p>
                                <p className="text-sm font-bold text-slate-600">{journal.blockerNote || "Tidak ada kendala lapangan yang dilaporkan."}</p>
                            </div>
                        </div>
                    </div>

                    {/* ACTIVITIES */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Detail Aktivitas Lapangan</h3>
                        {journal.activities?.map((activity, idx) => (
                            <div key={idx} className="dashboard-card p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-primary)] rounded">ITEM {idx + 1}</span>
                                            {activity.location && <span className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">LOKASI: {activity.location}</span>}
                                        </div>
                                        <h4 className="text-base font-black text-slate-800">{activity.workTitle}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Klaim Item</p>
                                        <p className="text-lg font-black text-[var(--dashboard-primary)]">{activity.progressClaim || 0}%</p>
                                    </div>
                                </div>

                                {/* CONTEXT CHIPS */}
                                {(activity.projectStage || activity.rabItem) && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {activity.projectStage && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-lg">
                                                <span className="text-[8px] font-black text-blue-600 uppercase">Tahapan:</span>
                                                <span className="text-[9px] font-bold text-blue-700">{activity.projectStage.name}</span>
                                            </div>
                                        )}
                                        {activity.rabItem && (
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
                                                <span className="text-[8px] font-black text-emerald-600 uppercase">RAB:</span>
                                                <span className="text-[9px] font-bold text-emerald-700">[{activity.rabItem.category?.code || '??'}] {activity.rabItem.description}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <p className="text-xs font-medium text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">
                                    {activity.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* SOT VS CLAIM CARD */}
                    <div className="dashboard-card p-5 space-y-4 bg-[var(--dashboard-surface-soft)]">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b border-[var(--dashboard-border)] pb-2">Perbandingan Progress</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Resmi (SOT)</p>
                                    <p className="text-2xl font-black text-amber-600">{journal.project?.verifiedProgress ?? 0}%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Klaim Mandor</p>
                                    <p className="text-2xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress ?? 0}%</p>
                                </div>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-[var(--dashboard-border)]">
                                <p className="text-[9px] font-bold text-slate-400 italic leading-tight uppercase">
                                    Persetujuan jurnal mandor adalah verifikasi administratif aktivitas, BUKAN mekanisme pembaruan progres resmi lapangan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS SECTION */}
                    {isPendingReview && (
                        <div className="dashboard-card p-6 space-y-6 border-2 border-[var(--dashboard-primary)]/20 shadow-xl shadow-[var(--dashboard-primary)]/5">
                            <div className="flex items-center gap-2 text-[var(--dashboard-primary)]">
                                <FiMessageSquare />
                                <span className="text-xs font-black uppercase tracking-widest">Panel Review</span>
                            </div>

                            {journal.status === 'submitted' && (
                                <button 
                                    onClick={() => handleAction('start_review')}
                                    disabled={submitting}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-primary)] text-[var(--dashboard-primary)] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all"
                                >
                                    <FiPlay /> Mulai Review
                                </button>
                            )}

                            {journal.status === 'under_review' && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Catatan Review</label>
                                        <textarea 
                                            placeholder="Tulis alasan revisi atau catatan persetujuan..."
                                            value={reviewNote}
                                            onChange={(e) => setReviewNote(e.target.value)}
                                            className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all min-h-[100px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        <button 
                                            onClick={() => handleAction('approve')}
                                            disabled={submitting}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <FiCheck /> Approve Jurnal
                                        </button>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button 
                                                onClick={() => handleAction('request_revision')}
                                                disabled={submitting}
                                                className="flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-amber-500/20"
                                            >
                                                <FiRefreshCw /> Minta Revisi
                                            </button>
                                            <button 
                                                onClick={() => handleAction('reject')}
                                                disabled={submitting}
                                                className="flex items-center justify-center gap-2 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-rose-500/20"
                                            >
                                                <FiX /> Tolak Jurnal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* REVIEW LOGS */}
                    <div className="dashboard-card p-5 space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b border-[var(--dashboard-border)] pb-2">Riwayat Review</h3>
                        <div className="space-y-4">
                            {journal.reviewLogs?.length > 0 ? journal.reviewLogs.map((log, idx) => (
                                <div key={idx} className="relative pl-4 border-l-2 border-[var(--dashboard-border)] space-y-1">
                                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[var(--dashboard-primary)]"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--dashboard-primary)]">{log.newStatus}</span>
                                        <span className="text-[8px] font-bold text-slate-400">{new Date(log.createdAt).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-600 leading-tight">
                                        {log.action === 'submit' ? "Dikirim oleh Mandor" : 
                                         log.action === 'start_review' ? "Mulai Proses Review" :
                                         log.action === 'approve' ? "Disetujui oleh Pengawas" :
                                         log.action === 'request_revision' ? "Revisi Diminta" :
                                         log.action === 'reject' ? "Ditolak oleh Pengawas" :
                                         `Aksi: ${log.action}`}
                                    </p>

                                    {log.note && <p className="text-[10px] font-medium text-slate-500 italic bg-white p-2 rounded border border-slate-100">"{log.note}"</p>}
                                </div>
                            )) : (
                                <p className="text-[10px] font-bold italic text-slate-400">Belum ada riwayat review.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailJurnalMandorPengawasPage;
