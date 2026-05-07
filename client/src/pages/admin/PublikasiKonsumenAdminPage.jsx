import React, { useState, useEffect } from "react";
import { 
    FiSend, FiCheckCircle, FiClock, FiSearch, 
    FiUser, FiCalendar, FiActivity, FiInfo, FiEye 
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

    // Filter states
    const [statusFilter, setStatusFilter] = useState("reviewed");

    const fetchReports = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = {
                actorRole: "admin",
                actorId: selectedAdminId || "admin-1",
            };
            
            if (statusFilter !== "all") {
                params.status = statusFilter;
            }

            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReports(params);
            if (response.success) {
                setReports(response.data);
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

    const handlePublish = async (reportId) => {
        if (!window.confirm("Apakah Anda yakin ingin mempublikasikan ringkasan laporan ini ke Konsumen?")) return;

        setActionLoading(true);
        try {
            const response = await supervisorWeeklyReportService.publishSupervisorWeeklyReport(reportId, {
                actorRole: "admin",
                actorId: selectedAdminId || "admin-1",
            });
            if (response.success) {
                alert("Laporan berhasil dipublikasikan ke Konsumen.");
                fetchReports();
            }
        } catch (err) {
            alert(err.message || "Gagal mempublikasikan laporan.");
        } finally {
            setActionLoading(false);
        }
    };

    const filteredReports = reports.filter(r => 
        r.project?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.project?.projectCode.toLowerCase().includes(searchTerm.toLowerCase())
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

            {/* Warning/Info */}
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
                                        onClick={() => window.location.href = `/admin/laporan-mingguan-pengawas/${report.id}`}
                                    >
                                        <FiEye /> Detail
                                    </button>
                                    
                                    {report.status === 'reviewed' && (
                                        <button 
                                            onClick={() => handlePublish(report.id)}
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
        </div>
    );
};

export default PublikasiKonsumenAdminPage;
