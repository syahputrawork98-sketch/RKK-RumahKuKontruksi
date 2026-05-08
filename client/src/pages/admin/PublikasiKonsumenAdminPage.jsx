import React, { useState, useEffect } from "react";
import { 
    FiSend, FiCheckCircle, FiClock, FiSearch, 
    FiUser, FiCalendar, FiActivity, FiInfo, FiEye,
    FiAlertCircle, FiX
} from "react-icons/fi";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import RoleDataState from "../../components/common/RoleDataState";
import SupervisorReportStatusBadge from "../../components/ui/badges/SupervisorReportStatusBadge";

const PublikasiKonsumenAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("reviewed");
    const [showConfirmModal, setShowConfirmModal] = useState({ show: false, reportId: null });
    const [showPreviewModal, setShowPreviewModal] = useState({ show: false, report: null });
    const [successMessage, setSuccessMessage] = useState("");

    const fetchReports = async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const params = {
                actorRole: "admin",
                actorId: selectedAdminId,
            };
            
            if (statusFilter !== "all") {
                params.status = statusFilter;
            }

            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReports(params);
            if (response.success) {
                setReports(Array.isArray(response.data) ? response.data : []);
            }
        } catch (err) {
            console.error("Failed to fetch reports for publication:", err);
            setError("Gagal memuat data laporan untuk publikasi.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [selectedAdminId, statusFilter]);

    const handlePublishRequest = (reportId, summary) => {
        if (!selectedAdminId) return;
        if (!summary || summary.length < 20) {
            setError("Ringkasan Konsumen minimal 20 karakter sebelum dipublish.");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setShowConfirmModal({ show: true, reportId });
    };

    const executePublish = async () => {
        const { reportId } = showConfirmModal;
        setShowConfirmModal({ show: false, reportId: null });
        
        setActionLoading(true);
        setError(null);
        try {
            const response = await supervisorWeeklyReportService.publishSupervisorWeeklyReport(reportId, {
                actorRole: "admin",
                actorId: selectedAdminId,
            });
            if (response.success) {
                setSuccessMessage("Laporan berhasil dipublikasikan ke Konsumen.");
                fetchReports();
                setTimeout(() => setSuccessMessage(""), 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Gagal mempublikasikan laporan.");
        } finally {
            setActionLoading(false);
        }
    };

    const handlePreview = (report) => {
        setShowPreviewModal({ show: true, report });
    };

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    const filteredReports = (reports || []).filter(r => 
        (r.project?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
        (r.project?.projectCode || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && reports.length === 0) {
        return <RoleDataState type="loading" message="Memuat data publikasi..." />;
    }

    return (
        <div className="animate-fadeIn space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Publikasi Konsumen</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">
                        Kelola informasi yang ditampilkan pada Timeline Konsumen.
                    </p>
                </div>
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Cari proyek..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 pr-4 py-2.5 rounded-xl bg-white border border-[var(--dashboard-border)] text-sm font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:outline-none w-full md:w-64 transition-all"
                    />
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
                    <FiCheckCircle className="text-emerald-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-emerald-700">{successMessage}</p>
                    <button onClick={() => setSuccessMessage("")} className="ml-auto text-emerald-400 hover:text-emerald-600"><FiX /></button>
                </div>
            )}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 items-start text-amber-800">
                <FiInfo className="mt-0.5 flex-shrink-0" />
                <div className="text-[11px] font-medium leading-relaxed">
                    <p className="font-bold uppercase tracking-widest text-[10px] mb-1 italic">Aturan Publikasi:</p>
                    <ul className="list-disc ml-4 space-y-1">
                        <li>Hanya laporan dengan status <strong>Reviewed</strong> yang dapat dipublikasikan.</li>
                        <li>Pastikan <strong>Customer Summary Draft</strong> sudah diperiksa dan layak baca oleh konsumen.</li>
                        <li>Internal notes, quality notes teknis, dan catatan mandor tidak akan tampil di sisi konsumen.</li>
                    </ul>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                    { id: 'reviewed', label: 'Siap Publish' },
                    { id: 'published', label: 'Sudah Publish' },
                    { id: 'all', label: 'Semua Laporan' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setStatusFilter(tab.id)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                            statusFilter === tab.id 
                            ? "bg-slate-800 text-white shadow-lg" 
                            : "bg-white border border-[var(--dashboard-border)] text-slate-400 hover:border-slate-800"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredReports.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
                        <p className="text-sm font-bold text-slate-400 italic">Tidak ada laporan yang menunggu publikasi.</p>
                    </div>
                ) : (
                    filteredReports.map((report) => (
                        <div key={report.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between md:justify-start gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter mb-0.5">{report.project?.projectCode}</span>
                                            <h3 className="text-lg font-black text-slate-800 leading-tight">{report.project?.name}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                                    <FiCalendar /> {new Date(report.weekStartDate).toLocaleDateString()} - {new Date(report.weekEndDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                                    <FiActivity /> Progress: <span className="text-blue-600">{report.verifiedProgressSnapshot}%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <SupervisorReportStatusBadge status={report.status} />
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                                        <span className="absolute -top-2 left-4 bg-white px-2 text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 rounded">Draft Ringkasan</span>
                                        <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                                            "{report.customerSummaryDraft || "Belum ada ringkasan yang disiapkan."}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-end gap-3 md:w-48">
                                    <button 
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                                        onClick={() => handlePreview(report)}
                                    >
                                        <FiEye /> Preview
                                    </button>
                                    
                                    {report.status === 'reviewed' && (
                                        <button 
                                            onClick={() => handlePublishRequest(report.id, report.customerSummaryDraft)}
                                            disabled={actionLoading || !report.customerSummaryDraft}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
                                        >
                                            <FiSend /> Publish
                                        </button>
                                    )}

                                    {report.status === 'published' && (
                                        <div className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100">
                                            <FiCheckCircle /> Aktif
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Preview Modal */}
            {showPreviewModal.show && showPreviewModal.report && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={() => setShowPreviewModal({ show: false, report: null })}></div>
                    <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-scaleIn overflow-hidden">
                        <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Preview Tampilan Konsumen</p>
                                <h3 className="text-lg font-black">{showPreviewModal.report.project?.name}</h3>
                            </div>
                            <button onClick={() => setShowPreviewModal({ show: false, report: null })} className="p-2 hover:bg-white/10 rounded-full transition-all">
                                <FiX />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Update Progress</span>
                                    <span className="text-2xl font-black text-blue-800">{showPreviewModal.report.verifiedProgressSnapshot}%</span>
                                </div>
                                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600" style={{ width: `${showPreviewModal.report.verifiedProgressSnapshot}%` }}></div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ringkasan Proyek</span>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    "{showPreviewModal.report.customerSummaryDraft}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t pt-4">
                                <div className="flex items-center gap-1"><FiCalendar /> {new Date(showPreviewModal.report.weekEndDate).toLocaleDateString()}</div>
                                <div className="flex items-center gap-1"><FiCheckCircle className="text-emerald-500" /> Official Update</div>
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 border-t flex justify-end gap-3">
                            <button 
                                onClick={() => setShowPreviewModal({ show: false, report: null })}
                                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                            >
                                Tutup
                            </button>
                            {showPreviewModal.report.status === 'reviewed' && (
                                <button 
                                    onClick={() => {
                                        setShowPreviewModal({ show: false, report: null });
                                        handlePublishRequest(showPreviewModal.report.id, showPreviewModal.report.customerSummaryDraft);
                                    }}
                                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    Publish Sekarang
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal.show && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={() => setShowConfirmModal({ show: false, reportId: null })}></div>
                    <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scaleIn text-center space-y-6">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                            <FiSend size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800">Publikasikan Laporan?</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                Ringkasan laporan ini akan dapat dilihat oleh Konsumen pada timeline mereka.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => setShowConfirmModal({ show: false, reportId: null })}
                                className="py-3 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={executePublish}
                                className="py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                            >
                                Ya, Publish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublikasiKonsumenAdminPage;
