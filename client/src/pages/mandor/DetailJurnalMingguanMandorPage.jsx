import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiSave, FiSend, FiEdit2, FiInfo, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import weeklyJournalService from "../../services/weeklyJournalService";
import WeeklyJournalStatusBadge from "../../components/weekly-journals/WeeklyJournalStatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailJurnalMingguanMandorPage = () => {
    const { journalId } = useParams();
    const navigate = useNavigate();
    const { selectedForemanId } = useForemanPersona();
    
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        summary: "",
        claimedProgress: 0,
        blockerNote: "",
        activities: []
    });

    const fetchJournal = async () => {
        if (!selectedForemanId || !journalId || journalId === 'create' || journalId === 'baru') return;
        try {
            setLoading(true);
            const response = await weeklyJournalService.getWeeklyJournalById(journalId, {
                actorRole: "mandor",
                actorId: selectedForemanId
            });
            if (response.success) {
                setJournal(response.data);
                setEditData({
                    summary: response.data.summary || "",
                    claimedProgress: response.data.claimedProgress || 0,
                    blockerNote: response.data.blockerNote || "",
                    activities: response.data.activities || []
                });
            }
        } catch (err) {
            console.error("Failed to fetch journal detail:", err);
            setError("Gagal memuat detail jurnal.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJournal();
    }, [journalId, selectedForemanId]);

    const handleUpdate = async () => {
        try {
            setSubmitting(true);
            const response = await weeklyJournalService.updateWeeklyJournal(journalId, {
                ...editData,
                actorRole: "mandor",
                actorId: selectedForemanId
            });
            if (response.success) {
                setIsEditing(false);
                fetchJournal();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Gagal memperbarui jurnal.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitJournal = async () => {
        if (!window.confirm("Kirim jurnal ini ke Pengawas untuk direview? Setelah dikirim, Anda tidak dapat mengeditnya kecuali diminta revisi.")) return;
        try {
            setSubmitting(true);
            const response = await weeklyJournalService.submitWeeklyJournal(journalId, {
                actorRole: "mandor",
                actorId: selectedForemanId
            });
            if (response.success) {
                fetchJournal();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Gagal mengirim jurnal.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!selectedForemanId && !loading) {
        return <RolePersonaEmptyState description="Pilih akun Mandor untuk melihat detail jurnal." />;
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

    const isProjectFinished = journal.project?.status === 'Selesai' || journal.project?.status === 'completed';
    const canEdit = !isProjectFinished && (journal.status === 'draft' || journal.status === 'revision_requested');
    const canSubmit = canEdit;
    const canSeeReviewHistory = journal.reviewLogs?.length > 0;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/mandor/jurnal-mingguan")}
                        className="p-2 hover:bg-[var(--dashboard-surface-soft)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <WeeklyJournalStatusBadge status={journal.status} />
                            <span className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">{journal.project?.projectCode}</span>
                        </div>
                        <h2 className="text-2xl font-extrabold tracking-tight">{journal.project?.name}</h2>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {canEdit && !isEditing && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-black uppercase tracking-widest hover:border-[var(--dashboard-primary)] transition-all"
                        >
                            <FiEdit2 /> Edit Draft
                        </button>
                    )}
                    {isEditing && (
                        <button 
                            onClick={handleUpdate}
                            disabled={submitting}
                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            <FiSave /> {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    )}
                    {canSubmit && !isEditing && (
                        <button 
                            onClick={handleSubmitJournal}
                            disabled={submitting}
                            className="flex items-center gap-2 px-8 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                        >
                            <FiSend /> {submitting ? "Mengirim..." : "Submit Jurnal"}
                        </button>
                    )}
                </div>
            </div>

            {/* REVISION ALERT */}
            {journal.status === 'revision_requested' && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-600">
                        <FiAlertCircle size={18} />
                        <h4 className="text-sm font-black uppercase tracking-widest">Revisi Diminta</h4>
                    </div>
                    {journal.reviewLogs?.[0] && (
                        <p className="text-xs font-bold text-rose-800 leading-relaxed italic bg-white/50 p-3 rounded-xl">
                            "{journal.reviewLogs[0].note}"
                        </p>
                    )}
                </div>
            )}

            {/* PROJECT FINISHED ALERT */}
            {(journal.project?.status === 'Selesai' || journal.project?.status === 'completed') && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-amber-600">
                        <FiInfo size={18} />
                        <h4 className="text-sm font-black uppercase tracking-widest">Proyek Selesai</h4>
                    </div>
                    <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase">
                        Proyek ini telah berstatus Selesai. Seluruh jurnal bersifat Read-Only (Hanya Baca).
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* MAIN INFO SECTION */}
                    <div className="dashboard-card p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-[var(--dashboard-border)] pb-4">
                            <div className="flex items-center gap-2">
                                <FiInfo className="text-[var(--dashboard-primary)]" />
                                <span className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Ringkasan Mingguan</span>
                            </div>
                            <span className="text-xs font-bold px-3 py-1 bg-[var(--dashboard-surface-soft)] rounded-lg">
                                {new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}
                            </span>
                        </div>

                        {isEditing ? (
                            <textarea 
                                value={editData.summary}
                                onChange={(e) => setEditData({...editData, summary: e.target.value})}
                                className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all min-h-[150px]"
                            />
                        ) : (
                            <p className="text-sm font-medium leading-relaxed text-slate-700 whitespace-pre-wrap bg-[var(--dashboard-surface-soft)] p-4 rounded-xl">
                                {journal.summary || <span className="italic text-slate-400">Tidak ada ringkasan.</span>}
                            </p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest mb-1">Klaim Progres Mandor (Non-Resmi)</p>
                                {isEditing ? (
                                    <input 
                                        type="number" 
                                        value={editData.claimedProgress}
                                        onChange={(e) => setEditData({...editData, claimedProgress: e.target.value})}
                                        className="w-full bg-white border border-[var(--dashboard-border)] rounded-lg px-3 py-2 text-lg font-black focus:outline-none focus:border-[var(--dashboard-primary)]"
                                    />
                                ) : (
                                    <p className="text-3xl font-black text-[var(--dashboard-primary)]">{journal.claimedProgress || 0}%</p>
                                )}
                                <p className="text-[9px] font-bold text-slate-400 mt-2 italic">* Klaim mandor bersifat administratif, bukan progres resmi (SOT).</p>
                            </div>
                            <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest mb-1">Kendala Lapangan</p>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        value={editData.blockerNote}
                                        onChange={(e) => setEditData({...editData, blockerNote: e.target.value})}
                                        className="w-full bg-white border border-[var(--dashboard-border)] rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)]"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-600">{journal.blockerNote || "Tidak ada kendala."}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ACTIVITIES SECTION */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Detail Aktivitas ({journal.activities?.length || 0})</h3>
                        {journal.activities?.map((activity, idx) => (
                            <div key={idx} className="dashboard-card p-5 group hover:border-[var(--dashboard-primary)] transition-all">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-primary)] rounded">ITEM {idx + 1}</span>
                                            {activity.location && <span className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">LOKASI: {activity.location}</span>}
                                        </div>
                                        <h4 className="text-base font-black text-slate-800">{activity.workTitle}</h4>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Item Progres</p>
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
                                        {activity.rabItem ? (
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
                                                <span className="text-[8px] font-black text-emerald-600 uppercase">RAB:</span>
                                                <span className="text-[9px] font-bold text-emerald-700">[{activity.rabItem.category?.code || '??'}] {activity.rabItem.description}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg">
                                                <span className="text-[8px] font-black text-slate-400 uppercase">RAB:</span>
                                                <span className="text-[9px] font-bold text-slate-400 italic">Belum terhubung ke Item RAB</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <p className="text-xs font-medium text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    {activity.description}
                                </p>
                                {activity.notes && (
                                    <p className="text-[10px] font-bold text-slate-400 mt-3 italic">Catatan: {activity.notes}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* PROGRESS SOT CARD */}
                    <div className="dashboard-card p-5 border-l-4 border-l-amber-500 space-y-4">
                        <div className="flex items-center gap-2 text-amber-600">
                            <FiAlertCircle />
                            <span className="text-xs font-black uppercase tracking-widest">Source of Truth</span>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-amber-50 rounded-xl">
                                <p className="text-[9px] font-black uppercase text-amber-700 tracking-widest mb-1">Progres Resmi (SOT)</p>
                                <p className="text-2xl font-black text-amber-600">{journal.project?.verifiedProgress ?? 0}%</p>
                            </div>
                            <p className="text-[10px] font-bold text-amber-700/70 leading-relaxed uppercase">
                                Progres resmi proyek hanya dapat diperbarui oleh Pengawas melalui menu Verifikasi Progres.
                            </p>
                        </div>
                    </div>

                    {/* REVIEW HISTORY */}
                    <div className="dashboard-card p-5 space-y-4">
                        <div className="flex items-center gap-2 text-[var(--dashboard-primary)]">
                            <FiCheckCircle />
                            <span className="text-xs font-black uppercase tracking-widest">Riwayat Review</span>
                        </div>
                        <div className="space-y-4">
                            {journal.reviewLogs?.length > 0 ? journal.reviewLogs.map((log, idx) => (
                                <div key={idx} className="relative pl-4 border-l-2 border-[var(--dashboard-border)] space-y-1">
                                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[var(--dashboard-primary)]"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[9px] font-black uppercase tracking-tighter text-[var(--dashboard-primary)]">{log.newStatus}</span>
                                        <span className="text-[8px] font-bold text-slate-400">{new Date(log.createdAt).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-600 leading-tight">
                                        {log.action === 'submit' ? "Dikirim oleh Mandor" : `Review oleh ${journal.supervisor?.name || "Pengawas"}`}
                                    </p>
                                    {log.note && <p className="text-[10px] font-medium text-slate-500 italic bg-slate-50 p-2 rounded">"{log.note}"</p>}
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

export default DetailJurnalMingguanMandorPage;
