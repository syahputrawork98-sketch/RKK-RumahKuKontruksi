import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiX, FiRefreshCw, FiPlay, FiInfo, FiAlertCircle, FiMessageSquare } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import weeklyJournalService from "../../services/weeklyJournalService";
import WeeklyJournalStatusBadge from "../../components/weekly-journals/WeeklyJournalStatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";

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
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto py-20">
                <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl text-center space-y-4">
                    <FiAlertCircle size={48} className="mx-auto text-rose-500" />
                    <h3 className="text-lg font-black text-slate-800">{error}</h3>
                    <button 
                        onClick={fetchJournal}
                        className="px-8 py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    if (!journal) return <div className="text-center py-20">Jurnal tidak ditemukan.</div>;

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
                        <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4">
                            <div className="flex items-center gap-2">
                                <FiInfo className="text-[var(--dashboard-primary)]" />
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Ringkasan Aktivitas Mandor</span>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 bg-[var(--dashboard-surface-soft)] rounded-lg">
                                Periode: {new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}
                            </span>
                        </div>

                        <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap bg-[var(--dashboard-surface-soft)] p-4 rounded-xl border border-slate-100">
                            {journal.summary || <span className="italic text-slate-400">Mandor tidak memberikan ringkasan.</span>}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest mb-1">Progress Klaim Mandor</p>
                                <p className="text-3xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress || 0}%</p>
                            </div>
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest mb-1">Kendala yang Dilaporkan</p>
                                <p className="text-sm font-bold text-slate-600">{journal.blockerNote || "Tidak ada kendala."}</p>
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
                                    <p className="text-2xl font-black text-amber-600">{journal.project?.verifiedProgress || 0}%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Klaim Mandor</p>
                                    <p className="text-2xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress || 0}%</p>
                                </div>
                            </div>
                            <div className="p-3 bg-white rounded-xl border border-[var(--dashboard-border)]">
                                <p className="text-[9px] font-bold text-slate-400 italic leading-tight">
                                    Persetujuan jurnal mandor adalah verifikasi administratif terhadap aktivitas, bukan pembaruan otomatis progres resmi.
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
                                        {log.action === 'submit' ? "Dikirim oleh Mandor" : `Action: ${log.action}`}
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
