import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, FiSave, FiSend, FiAlertCircle, FiInfo, FiCheckCircle, 
    FiClock, FiUser, FiMessageSquare, FiActivity, FiTag
} from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import SupervisorReportStatusBadge from "../../components/ui/badges/SupervisorReportStatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DetailLaporanMingguanPengawasPage = () => {
    const { reportId } = useParams();
    const navigate = useNavigate();
    const { selectedSupervisorId } = useSupervisorPersona();

    // Data States
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form States (for editing)
    const [editMode, setEditMode] = useState(false);
    const [summary, setSummary] = useState("");
    const [qualityNotes, setQualityNotes] = useState("");
    const [safetyNotes, setSafetyNotes] = useState("");
    const [blockerNotes, setBlockerNotes] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [customerSummaryDraft, setCustomerSummaryDraft] = useState("");

    const fetchDetail = useCallback(async () => {
        try {
            setLoading(true);
            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReportById(reportId, {
                actorRole: "pengawas",
                actorId: selectedSupervisorId
            });
            if (response.success) {
                const data = response.data;
                setReport(data);
                setSummary(data.summary || "");
                setQualityNotes(data.qualityNotes || "");
                setSafetyNotes(data.safetyNotes || "");
                setBlockerNotes(data.blockerNotes || "");
                setRecommendation(data.recommendation || "");
                setCustomerSummaryDraft(data.customerSummaryDraft || "");
            }
        } catch (err) {
            console.error("Failed to fetch detail:", err);
            setError("Gagal memuat detail laporan.");
        } finally {
            setLoading(false);
        }
    }, [reportId, selectedSupervisorId]);

    useEffect(() => {
        if (selectedSupervisorId) fetchDetail();
    }, [fetchDetail, selectedSupervisorId]);

    const isEditable = report && (report.status === "draft" || report.status === "revision_requested");

    const handleSave = async () => {
        setActionLoading(true);
        setError(null);
        try {
            const response = await supervisorWeeklyReportService.updateSupervisorWeeklyReport(reportId, {
                actorRole: "pengawas",
                actorId: selectedSupervisorId,
                summary,
                qualityNotes,
                safetyNotes,
                blockerNotes,
                recommendation,
                customerSummaryDraft
            });
            if (response.success) {
                setEditMode(false);
                fetchDetail();
            }
        } catch (err) {
            setError(err.message || "Gagal menyimpan perubahan.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!summary && (!report.notes || report.notes.length === 0)) {
            setError("Minimal isi ringkasan atau satu catatan detail sebelum submit.");
            return;
        }

        if (!window.confirm("Kirim laporan ini ke Admin? Setelah terkirim, laporan tidak dapat diubah.")) return;

        setActionLoading(true);
        setError(null);
        try {
            const response = await supervisorWeeklyReportService.submitSupervisorWeeklyReport(reportId, {
                actorRole: "pengawas",
                actorId: selectedSupervisorId
            });
            if (response.success) {
                fetchDetail();
            }
        } catch (err) {
            setError(err.message || "Gagal mengirim laporan.");
        } finally {
            setActionLoading(false);
        }
    };

    if (!selectedSupervisorId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas"
                description="Pilih persona Pengawas untuk meninjau detail laporan mingguan."
            />
        );
    }
    
    if (loading) return <RoleDataState type="loading" />;
    
    if (error && !report) {
        return (
            <RoleDataState 
                type="error" 
                title="Gagal Memuat Detail"
                description={error}
                onRetry={fetchDetail}
            />
        );
    }
    
    if (!report) return <RoleDataState type="empty" title="Laporan Tidak Ditemukan" description="Laporan mingguan dengan ID ini tidak tersedia di database." />;

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/pengawas/laporan-mingguan")}
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
                            Periode: {new Date(report.weekStartDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(report.weekEndDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isEditable && (
                        <>
                            {!editMode ? (
                                <button 
                                    onClick={() => setEditMode(true)}
                                    className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs hover:bg-slate-900 transition-all"
                                >
                                    Edit Laporan
                                </button>
                            ) : (
                                <button 
                                    onClick={handleSave}
                                    disabled={actionLoading}
                                    className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 disabled:opacity-50 transition-all"
                                >
                                    <FiSave /> Simpan
                                </button>
                            )}
                            <button 
                                onClick={handleSubmit}
                                disabled={actionLoading || editMode}
                                className="flex items-center gap-2 px-6 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl font-bold text-xs shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.05] disabled:opacity-50 transition-all"
                            >
                                <FiSend /> Kirim ke Admin
                            </button>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-center">
                    <FiAlertCircle className="text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-700">{error}</p>
                </div>
            )}

            {report.status === "revision_requested" && report.adminNote && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-widest">
                        <FiMessageSquare /> Catatan Revisi dari Admin
                    </div>
                    <p className="text-sm font-medium text-amber-800 italic">"{report.adminNote}"</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Summary Card */}
                    <div className="dashboard-card p-6 space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4 flex items-center gap-2">
                            <FiFileText /> Ringkasan Evaluasi
                        </h3>
                        {editMode ? (
                            <textarea 
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium h-32 outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                            />
                        ) : (
                            <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {report.summary || <span className="italic text-slate-400">Tidak ada ringkasan umum.</span>}
                            </p>
                        )}
                    </div>

                    {/* Specific Evaluations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="dashboard-card p-5 space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1">
                                <FiCheckCircle /> Kualitas (Quality)
                            </h4>
                            {editMode ? (
                                <textarea value={qualityNotes} onChange={(e) => setQualityNotes(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-20 outline-none" />
                            ) : (
                                <p className="text-xs font-medium text-slate-600">{report.qualityNotes || "-"}</p>
                            )}
                        </div>
                        <div className="dashboard-card p-5 space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-1">
                                <FiAlertCircle /> Keselamatan (Safety)
                            </h4>
                            {editMode ? (
                                <textarea value={safetyNotes} onChange={(e) => setSafetyNotes(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-20 outline-none" />
                            ) : (
                                <p className="text-xs font-medium text-slate-600">{report.safetyNotes || "-"}</p>
                            )}
                        </div>
                        <div className="dashboard-card p-5 space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center gap-1">
                                <FiActivity /> Kendala (Blockers)
                            </h4>
                            {editMode ? (
                                <textarea value={blockerNotes} onChange={(e) => setBlockerNotes(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-20 outline-none" />
                            ) : (
                                <p className="text-xs font-medium text-slate-600">{report.blockerNotes || "-"}</p>
                            )}
                        </div>
                        <div className="dashboard-card p-5 space-y-3">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1">
                                <FiTag /> Rekomendasi
                            </h4>
                            {editMode ? (
                                <textarea value={recommendation} onChange={(e) => setRecommendation(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs h-20 outline-none" />
                            ) : (
                                <p className="text-xs font-medium text-slate-600">{report.recommendation || "-"}</p>
                            )}
                        </div>
                    </div>

                    {/* Customer Draft Card */}
                    <div className="dashboard-card p-6 bg-amber-50/20 border-dashed border-2 border-amber-200">
                        <h3 className="text-xs font-black uppercase tracking-widest text-amber-800 border-b border-amber-100 pb-3 mb-4 flex items-center gap-2">
                            <FiUser /> Draft Ringkasan Konsumen (Internal)
                        </h3>
                        {editMode ? (
                            <textarea 
                                value={customerSummaryDraft}
                                onChange={(e) => setCustomerSummaryDraft(e.target.value)}
                                className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm font-medium h-24 outline-none focus:ring-2 focus:ring-amber-500/20"
                                placeholder="Tuliskan draf yang akan dipublish ke konsumen..."
                            />
                        ) : (
                            <div className="bg-white p-4 rounded-xl border border-amber-100">
                                <p className="text-sm font-medium text-amber-900 italic leading-relaxed">
                                    "{report.customerSummaryDraft || "Belum ada draf ringkasan konsumen."}"
                                </p>
                            </div>
                        )}
                        <p className="text-[10px] text-amber-600 font-bold mt-2 italic">
                            * Ringkasan ini hanya akan dipublish setelah disetujui Admin.
                        </p>
                    </div>

                    {/* Additional Notes Detail */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4">
                            Catatan Detail Tambahan
                        </h3>
                        {report.notes?.length === 0 ? (
                            <p className="text-xs text-slate-400 italic text-center py-4">Tidak ada catatan detail tambahan.</p>
                        ) : (
                            <div className="space-y-4">
                                {report.notes?.map((note) => (
                                    <div key={note.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4">
                                        <div className="flex-shrink-0">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                                                note.severity === 'critical' ? 'bg-red-500 text-white' :
                                                note.severity === 'high' ? 'bg-red-100 text-red-600' :
                                                note.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                                                'bg-blue-100 text-blue-600'
                                            }`}>
                                                {note.severity}
                                            </span>
                                        </div>
                                        <div>
                                             <div className="flex items-center gap-2 mb-1">
                                                 <p className="text-[10px] font-black uppercase text-slate-400">{note.type}</p>
                                                 {note.stage && (
                                                     <span className="text-[9px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                         Stage: {note.stage.title}
                                                     </span>
                                                 )}
                                                 {note.rabItem && (
                                                     <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                         RAB: {note.rabItem.description}
                                                     </span>
                                                 )}
                                             </div>
                                             <p className="text-xs font-bold text-slate-700">{note.content}</p>
                                             {note.progress !== null && (
                                                 <p className="text-[9px] font-black text-blue-600 uppercase mt-1 italic tracking-tighter">Reported Progress (Snapshot): {note.progress}%</p>
                                             )}
                                         </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Progress Snapshot */}
                    <div className="dashboard-card p-6 bg-linear-to-br from-blue-600 to-blue-800 text-white border-none shadow-xl shadow-blue-500/20 overflow-hidden relative">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
                            <FiActivity /> Snapshot Progres SOT
                        </h3>
                        <div className="text-center py-4 relative z-10">
                            <span className="text-6xl font-black">{report.verifiedProgressSnapshot}%</span>
                            <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-80">Verified Physical Progress</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-2 relative z-10">
                            <div className="flex items-start gap-2">
                                <FiInfo className="mt-0.5 flex-shrink-0" />
                                <p className="text-[10px] font-bold leading-tight opacity-90 italic">
                                    PENTING: Nilai ini adalah snapshot saat laporan disusun. Persetujuan laporan ini bersifat administratif dan TIDAK mengubah Progres Fisik Utama (SOT).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Attached Journals */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4 border-b pb-2">
                            Jurnal Terlampir
                        </h3>
                        {report.journals?.length === 0 ? (
                            <p className="text-xs text-slate-400 italic">Tidak ada jurnal dilampirkan.</p>
                        ) : (
                            <div className="space-y-3">
                                {report.journals?.map((link) => (
                                    <div key={link.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-700">{link.weeklyJournal?.foreman?.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-1 uppercase font-medium tracking-tighter">
                                            {new Date(link.weeklyJournal?.weekStartDate).toLocaleDateString()} - {new Date(link.weeklyJournal?.weekEndDate).toLocaleDateString()}
                                        </p>
                                        <div className="mt-2 text-[9px] font-black text-emerald-600 uppercase">
                                            Verified: {link.weeklyJournal?.verifiedProgressSnapshot}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Review Logs */}
                    <div className="dashboard-card p-6">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4 border-b pb-2 flex items-center gap-2">
                            <FiClock /> Riwayat Aktivitas
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
                                        <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg mt-2 font-medium italic border border-amber-100">
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

export default DetailLaporanMingguanPengawasPage;
