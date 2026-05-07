import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, FiCheck, FiX, FiRefreshCw, FiAlertCircle, FiInfo, 
    FiUser, FiMessageSquare, FiFileText, FiClock
} from "react-icons/fi";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import SupervisorReportStatusBadge from "../../components/ui/badges/SupervisorReportStatusBadge";

const DetailLaporanMingguanPengawasAdminPage = () => {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const { selectedAdminId } = useAdminPersona();

    // Data States
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviewNote, setReviewNote] = useState("");

    const fetchDetail = useCallback(async () => {
        try {
            setLoading(true);
            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReportById(reportId, {
                actorRole: "admin",
                actorId: selectedAdminId || "admin-1"
            });
            if (response.success) {
                setReport(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch detail:", err);
            setError("Gagal memuat detail laporan.");
        } finally {
            setLoading(false);
        }
    }, [reportId, selectedAdminId]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const handleAction = async (action) => {
        if (["request_revision", "reject"].includes(action) && !reviewNote) {
            setError("Catatan review wajib diisi untuk revisi atau penolakan.");
            return;
        }

        if (!window.confirm(`Apakah Anda yakin ingin melakukan tindakan ini?`)) return;

        setActionLoading(true);
        setError(null);
        try {
            const response = await supervisorWeeklyReportService.reviewSupervisorWeeklyReport(reportId, {
                actorRole: "admin",
                actorId: selectedAdminId || "admin-1",
                action,
                note: reviewNote
            });
            if (response.success) {
                setReviewNote("");
                fetchDetail();
            }
        } catch (err) {
            setError(err.message || "Gagal melakukan review.");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-sm italic">Memuat detail laporan...</div>;
    if (!report) return <div className="p-12 text-center text-red-500 font-bold">Laporan tidak ditemukan.</div>;

    const canReview = report.status === "submitted" || report.status === "under_admin_review";

    return (
        <div className="animate-fadeIn space-y-6 text-slate-800">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/laporan-mingguan-pengawas")}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <FiArrowLeft className="text-xl" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black tracking-tight uppercase">{report.project?.projectCode}</h2>
                            <SupervisorReportStatusBadge status={report.status} />
                        </div>
                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mt-0.5">
                            Pengawas: {report.supervisor?.name} | Periode: {new Date(report.weekStartDate).toLocaleDateString('id-ID')} - {new Date(report.weekEndDate).toLocaleDateString('id-ID')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {canReview && report.status === 'submitted' && (
                        <button 
                            onClick={() => handleAction('start_admin_review')}
                            disabled={actionLoading}
                            className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs hover:bg-slate-900 disabled:opacity-50 transition-all"
                        >
                            Mulai Review
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-center">
                    <FiAlertCircle className="text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-700">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Evaluation Details */}
                    <div className="dashboard-card p-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 flex items-center gap-2">
                                <FiFileText /> Ringkasan Umum
                            </h3>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                                "{report.summary || "Tidak ada ringkasan umum."}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1">Kualitas (Quality)</h4>
                                <p className="text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[60px]">{report.qualityNotes || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">Keselamatan (Safety)</h4>
                                <p className="text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[60px]">{report.safetyNotes || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1">Kendala (Blockers)</h4>
                                <p className="text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[60px]">{report.blockerNotes || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1">Rekomendasi</h4>
                                <p className="text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-[60px]">{report.recommendation || "-"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Draft Review */}
                    <div className="dashboard-card p-6 bg-amber-50/20 border-dashed border-2 border-amber-200">
                        <div className="flex items-center gap-2 border-b border-amber-100 pb-3 mb-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-2">
                                <FiUser /> Draf Ringkasan Konsumen (Belum Publish)
                            </h3>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-amber-100">
                            <p className="text-sm font-medium text-amber-900 italic leading-relaxed">
                                "{report.customerSummaryDraft || "Belum ada draf ringkasan konsumen."}"
                            </p>
                        </div>
                        <p className="text-[10px] text-amber-600 font-bold mt-2 italic">
                            * Ringkasan ini hanya bersifat draf internal untuk bahan monitoring.
                        </p>
                    </div>

                    {/* Additional Notes */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4">
                            Catatan Detail Tambahan dari Lapangan
                        </h3>
                        {report.notes?.length === 0 ? (
                            <p className="text-xs text-slate-400 italic text-center py-4">Tidak ada catatan detail tambahan.</p>
                        ) : (
                            <div className="space-y-3">
                                {report.notes?.map((note) => (
                                    <div key={note.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                                            note.severity === 'critical' ? 'bg-red-500 text-white' :
                                            note.severity === 'high' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'
                                        }`}>
                                            {note.severity}
                                        </span>
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{note.type}</p>
                                            <p className="text-xs font-bold text-slate-700">{note.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Review Action Panel */}
                    {canReview && (
                        <div className="dashboard-card p-6 bg-slate-900 text-white space-y-4 shadow-2xl">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-3 flex items-center gap-2">
                                <FiCheck /> Panel Review Admin
                            </h3>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Catatan Review / Feedback</label>
                                <textarea 
                                    value={reviewNote}
                                    onChange={(e) => setReviewNote(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium h-24 outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="Wajib diisi jika meminta revisi atau menolak laporan..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                                <button 
                                    onClick={() => handleAction('approve')}
                                    disabled={actionLoading}
                                    className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                                >
                                    <FiCheck /> Approve
                                </button>
                                <button 
                                    onClick={() => handleAction('request_revision')}
                                    disabled={actionLoading}
                                    className="flex items-center justify-center gap-2 py-3 bg-amber-600 hover:bg-amber-700 rounded-xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                                >
                                    <FiRefreshCw /> Revisi
                                </button>
                                <button 
                                    onClick={() => handleAction('reject')}
                                    disabled={actionLoading}
                                    className="flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                                >
                                    <FiX /> Tolak
                                </button>
                            </div>
                            
                            <div className="flex gap-2 items-start text-[10px] text-slate-400 italic bg-slate-800/50 p-3 rounded-xl">
                                <FiInfo className="flex-shrink-0 mt-0.5" />
                                <p>Menyetujui laporan ini adalah tanda bahwa evaluasi Pengawas telah diterima. Ini <strong>TIDAK</strong> akan memicu update progres fisik atau publikasi konsumen.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Snapshot Card */}
                    <div className="dashboard-card p-6 bg-slate-100 border-slate-200">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200 pb-2">
                            Progress Terverifikasi
                        </h3>
                        <div className="text-center py-4">
                            <span className="text-5xl font-black text-slate-800">{report.verifiedProgressSnapshot}%</span>
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase text-center italic tracking-tighter">Project Progress Source of Truth</p>
                    </div>

                    {/* Attached Journals */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4 border-b pb-2">
                            Jurnal Mandor
                        </h3>
                        <div className="space-y-3">
                            {report.journals?.map((link) => (
                                <div key={link.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs font-bold text-slate-700">{link.weeklyJournal?.foreman?.name}</p>
                                    <p className="text-[9px] text-slate-400 mt-1 uppercase font-black">
                                        Verified: {link.weeklyJournal?.verifiedProgressSnapshot}%
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity History */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4 border-b pb-2 flex items-center gap-2">
                            <FiClock /> Riwayat Review
                        </h3>
                        <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {report.reviewLogs?.map((log) => (
                                <div key={log.id} className="relative pl-6">
                                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-200"></div>
                                    <p className="text-[10px] font-black uppercase text-slate-400">{log.action.replace(/_/g, ' ')}</p>
                                    <p className="text-xs font-bold text-slate-700 mt-0.5">
                                        {log.actorRole === 'admin' ? 'Admin' : 'Pengawas'}
                                    </p>
                                    <p className="text-[9px] text-slate-400 mt-1">
                                        {new Date(log.createdAt).toLocaleString()}
                                    </p>
                                    {log.note && (
                                        <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-2 font-medium italic border border-amber-100 leading-tight">
                                            "{log.note}"
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailLaporanMingguanPengawasAdminPage;
