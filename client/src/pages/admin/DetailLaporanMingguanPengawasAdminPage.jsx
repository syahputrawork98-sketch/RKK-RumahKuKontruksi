import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, FiCheck, FiX, FiRefreshCw, FiAlertCircle, FiInfo, 
    FiUser, FiMessageSquare, FiFileText, FiClock, FiSend, FiActivity
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
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState({ show: false, action: null, title: "", message: "" });
    
    // Form States
    const [adminNote, setAdminNote] = useState("");
    const [customerSummaryDraft, setCustomerSummaryDraft] = useState("");

    const fetchDetail = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReportById(reportId, {
                actorRole: "admin",
                actorId: selectedAdminId
            });
            if (response.success) {
                setReport(response.data);
                setAdminNote(response.data.adminNote || "");
                setCustomerSummaryDraft(response.data.customerSummaryDraft || "");
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

    const handleActionRequest = (action) => {
        if (!selectedAdminId) return;

        // Validation before showing modal
        if (["request_revision", "reject"].includes(action) && !adminNote) {
            setError("Catatan review wajib diisi untuk revisi atau penolakan.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (["reviewed", "approve"].includes(action) && customerSummaryDraft && customerSummaryDraft.length < 20) {
            setError("Ringkasan Konsumen minimal 20 karakter sebelum ditandai Reviewed.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        let title = "";
        let message = "";

        switch (action) {
            case "start_admin_review":
                title = "Mulai Review";
                message = "Tandai laporan ini sedang dalam proses peninjauan Admin?";
                break;
            case "reviewed":
            case "approve":
                title = "Setujui Laporan";
                message = "Apakah Anda yakin laporan ini sudah valid? Menyetujui laporan ini akan memperbarui progres resmi proyek.";
                break;
            case "request_revision":
                title = "Minta Revisi";
                message = "Kirim permintaan perbaikan ke Pengawas dengan catatan yang Anda berikan?";
                break;
            case "reject":
                title = "Tolak Laporan";
                message = "Apakah Anda yakin ingin menolak laporan ini secara permanen?";
                break;
            case "publish":
                title = "Publikasikan";
                message = "Publikasikan ringkasan laporan ini ke Timeline Konsumen?";
                break;
        }

        setShowConfirmModal({ show: true, action, title, message });
    };

    const executeAction = async () => {
        const { action } = showConfirmModal;
        setShowConfirmModal({ ...showConfirmModal, show: false });
        
        setActionLoading(true);
        setError(null);
        setSuccessMessage("");
        
        try {
            let response;
            if (action === "publish") {
                response = await supervisorWeeklyReportService.publishSupervisorWeeklyReport(reportId, {
                    actorRole: "admin",
                    actorId: selectedAdminId
                });
            } else {
                response = await supervisorWeeklyReportService.reviewSupervisorWeeklyReport(reportId, {
                    actorRole: "admin",
                    actorId: selectedAdminId,
                    action,
                    adminNote,
                    customerSummaryDraft
                });
            }

            if (response.success) {
                setSuccessMessage(action === "publish" ? "Laporan berhasil dipublikasikan." : "Status laporan berhasil diperbarui.");
                fetchDetail();
                setTimeout(() => setSuccessMessage(""), 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Gagal melakukan aksi.");
        } finally {
            setActionLoading(false);
        }
    };

    if (!selectedAdminId) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 animate-fadeIn">
                <FiInfo size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Pilih Admin persona terlebih dahulu di Topbar.</p>
            </div>
        );
    }

    if (loading) return <RoleDataState type="loading" />;
    
    if (report && report.project?.adminId !== selectedAdminId) {
        return (
            <div className="p-8 text-center space-y-6 bg-white rounded-3xl border border-red-100 animate-fadeIn max-w-md mx-auto my-20 shadow-xl shadow-red-500/5">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                    <FiAlertCircle size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-800">Akses Ditolak</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Forbidden Access</p>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                        Anda tidak memiliki izin untuk meninjau laporan ini. Proyek terkait bukan di bawah tanggung jawab persona Anda.
                    </p>
                </div>
                <button 
                    onClick={() => navigate("/admin/laporan-mingguan-pengawas")} 
                    className="w-full py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-slate-800/20"
                >
                    Kembali ke Daftar Laporan
                </button>
            </div>
        );
    }

    if (!report) return <RoleDataState type="empty" title="Laporan Tidak Ditemukan" description="Laporan mingguan dengan ID ini tidak tersedia atau Anda tidak memiliki akses." />;

    const canReview = report.status === "submitted" || report.status === "under_admin_review" || report.status === "approved" || report.status === "reviewed";

    return (
        <div className="animate-fadeIn space-y-6 text-slate-800">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/laporan-mingguan-pengawas")}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-800"
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
                    {report.status === 'submitted' && (
                        <button 
                            onClick={() => handleActionRequest('start_admin_review')}
                            disabled={actionLoading}
                            className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 disabled:opacity-50 transition-all shadow-lg shadow-slate-800/20"
                        >
                            Mulai Review
                        </button>
                    )}
                    {(report.status === 'reviewed' || report.status === 'approved') && (
                        <button 
                            onClick={() => handleActionRequest('publish')}
                            disabled={actionLoading}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                        >
                            <FiSend /> Publish Laporan
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-center animate-shake">
                    <FiAlertCircle className="text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-700">{error}</p>
                    <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600"><FiX /></button>
                </div>
            )}

            {successMessage && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3 items-center animate-fadeIn">
                    <FiCheck className="text-emerald-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-emerald-700">{successMessage}</p>
                    <button onClick={() => setSuccessMessage("")} className="ml-auto text-emerald-400 hover:text-emerald-600"><FiX /></button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Evaluation Details */}
                    <div className="dashboard-card p-6 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 flex items-center gap-2">
                                <FiFileText /> Ringkasan Evaluasi Lapangan
                            </h3>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                "{report.summary || "Tidak ada ringkasan umum."}"
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            <div className="space-y-2">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1"><FiCheck className="text-[12px]"/> Kualitas (Quality)</h4>
                                <p className="text-xs font-bold text-slate-600 bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/50 min-h-[60px]">{report.qualityNotes || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1"><FiAlertCircle className="text-[12px]"/> Keselamatan (Safety)</h4>
                                <p className="text-xs font-bold text-slate-600 bg-amber-50/30 p-3 rounded-xl border border-amber-100/50 min-h-[60px]">{report.safetyNotes || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1"><FiX className="text-[12px]"/> Kendala (Blockers)</h4>
                                <p className="text-xs font-bold text-slate-600 bg-red-50/30 p-3 rounded-xl border border-red-100/50 min-h-[60px]">{report.blockerNotes || "-"}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1"><FiMessageSquare className="text-[12px]"/> Rekomendasi</h4>
                                <p className="text-xs font-bold text-slate-600 bg-indigo-50/30 p-3 rounded-xl border border-indigo-100/50 min-h-[60px]">{report.recommendation || "-"}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Attached Journals */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4 flex items-center gap-2">
                            <FiActivity /> Dasar Laporan (Jurnal Mandor)
                        </h3>
                        {report.journals?.length === 0 ? (
                            <p className="text-xs text-slate-400 italic text-center py-4">Tidak ada jurnal yang ditautkan.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {report.journals?.map((link) => (
                                    <div key={link.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[var(--dashboard-primary)] transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Mandor: {link.weeklyJournal?.foreman?.name}</span>
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700">Snap Progress: {link.weeklyJournal?.verifiedProgressSnapshot}%</p>
                                        <div className="mt-2 text-[9px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            {link.weeklyJournal?.activities?.length || 0} Aktivitas Lapangan
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Detailed Notes / Progress Updates */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4 flex items-center gap-2">
                            <FiFileText /> Catatan Detail & Update Progres
                        </h3>
                        {report.notes?.length === 0 ? (
                            <p className="text-xs text-slate-400 italic text-center py-4">Tidak ada catatan detail tambahan.</p>
                        ) : (
                            <div className="space-y-4">
                                {report.notes?.map((note) => (
                                    <div key={note.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                                    note.type === 'progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'
                                                }`}>
                                                    {note.type}
                                                </span>
                                                {note.severity && (
                                                    <span className={`text-[9px] font-bold uppercase ${
                                                        note.severity === 'critical' ? 'text-red-600' : 'text-slate-400'
                                                    }`}>
                                                        {note.severity}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{note.content}</p>
                                            {note.projectStageId && (
                                                <p className="text-[10px] text-slate-400 font-medium italic">
                                                    Linked to stage ID: {note.projectStageId}
                                                </p>
                                            )}
                                        </div>
                                        {note.progress !== null && (
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase text-blue-600">Reported Progress</p>
                                                <p className="text-2xl font-black text-blue-900">{note.progress}%</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Action / Info */}
                <div className="space-y-6">
                    {/* Progress Snapshot Sidebar */}
                    <div className="dashboard-card p-6 bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-white/10 pb-2">
                            Progress Snapshot
                        </h3>
                        <div className="text-center py-4">
                            <span className="text-6xl font-black text-white">{report.verifiedProgressSnapshot}%</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                                <span>Status Lapangan</span>
                                <span className="text-emerald-400">Verified</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${report.verifiedProgressSnapshot}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Review Panel Sidebar */}
                    {canReview && (
                        <div className="dashboard-card p-6 bg-white border-2 border-slate-800 space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800 border-b pb-3 flex items-center gap-2">
                                <FiCheck /> Panel Kendali Admin
                            </h3>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Catatan Internal Admin</label>
                                <textarea 
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold h-24 outline-none focus:ring-2 focus:ring-slate-800/20"
                                    placeholder="Masukkan feedback untuk Pengawas atau catatan internal..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Ringkasan Konsumen</label>
                                <textarea 
                                    value={customerSummaryDraft}
                                    onChange={(e) => setCustomerSummaryDraft(e.target.value)}
                                    className="w-full bg-amber-50/50 border border-amber-100 rounded-xl px-4 py-3 text-xs font-bold h-24 outline-none focus:ring-2 focus:ring-amber-500/20 italic"
                                    placeholder="Ringkasan yang akan dilihat Konsumen jika laporan dipublish..."
                                />
                            </div>

                            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex gap-2">
                                <FiInfo size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                <p className="text-[9px] text-blue-700 font-bold leading-relaxed">
                                    MEMUTUSKAN 'APPROVE' AKAN MEMPERBARUI PROGRESS RESMI (SOURCE OF TRUTH) PROYEK BERDASARKAN DATA LAPORAN INI.
                                </p>
                            </div>

                             <div className="grid grid-cols-2 gap-2 pt-2">
                                {report.status !== 'approved' && report.status !== 'published' && (
                                    <button 
                                        onClick={() => handleActionRequest('approve')}
                                        disabled={actionLoading}
                                        className="col-span-2 flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-slate-800/30 disabled:opacity-50"
                                    >
                                        <FiCheck /> Approve Laporan
                                    </button>
                                )}
                                {(report.status === 'submitted' || report.status === 'under_admin_review') && (
                                    <>
                                        <button 
                                            onClick={() => handleActionRequest('request_revision')}
                                            disabled={actionLoading}
                                            className="flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-amber-500 text-amber-600 rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all disabled:opacity-50"
                                        >
                                            <FiRefreshCw /> Revisi
                                        </button>
                                        <button 
                                            onClick={() => handleActionRequest('reject')}
                                            disabled={actionLoading}
                                            className="flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-red-500 text-red-600 rounded-xl font-bold text-[9px] uppercase tracking-widest transition-all disabled:opacity-50"
                                        >
                                            <FiX /> Tolak
                                        </button>
                                    </>
                                )}
                                {(report.status === 'approved' || report.status === 'reviewed') && (
                                     <button 
                                        onClick={() => handleActionRequest('publish')}
                                        disabled={actionLoading}
                                        className="col-span-2 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/30 disabled:opacity-50"
                                    >
                                        <FiSend /> Publish ke Konsumen
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Activity History Sidebar */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4 border-b pb-2 flex items-center gap-2">
                            <FiClock /> Timeline Review
                        </h3>
                        <div className="space-y-6 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {report.reviewLogs?.map((log) => (
                                <div key={log.id} className="relative pl-6">
                                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300 group-hover:border-slate-800"></div>
                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{log.action.replace(/_/g, ' ')}</p>
                                    <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                                        {log.actorRole === 'admin' ? 'Admin' : 'Pengawas'}
                                    </p>
                                    <p className="text-[9px] text-slate-400 font-medium">
                                        {new Date(log.createdAt).toLocaleString('id-ID')}
                                    </p>
                                    {log.note && (
                                        <div className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-2 font-medium italic border border-amber-100 leading-tight">
                                            "{log.note}"
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            {showConfirmModal.show && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={() => setShowConfirmModal({ ...showConfirmModal, show: false })}></div>
                    <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scaleIn text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-800">
                            <FiAlertCircle size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800">{showConfirmModal.title}</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">{showConfirmModal.message}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setShowConfirmModal({ ...showConfirmModal, show: false })}
                                className="py-3 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={executeAction}
                                className="py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-slate-800/20"
                            >
                                Ya, Lanjutkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailLaporanMingguanPengawasAdminPage;
