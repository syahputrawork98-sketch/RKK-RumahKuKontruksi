import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiChevronRight, FiAlertCircle, FiInfo } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import SupervisorReportStatusBadge from "../../components/ui/badges/SupervisorReportStatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const LaporanMingguanPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    const fetchReports = useCallback(async () => {
        if (!selectedSupervisorId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const params = {
                actorRole: "pengawas",
                actorId: selectedSupervisorId,
                supervisorId: selectedSupervisorId
            };
            
            if (statusFilter !== "all") {
                params.status = statusFilter;
            }

            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReports(params);
            if (response.success) {
                setReports(response.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch reports:", err);
            setError("Gagal memuat daftar laporan.");
        } finally {
            setLoading(false);
        }
    }, [selectedSupervisorId, statusFilter]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    if (!selectedSupervisorId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas"
                description="Silakan pilih persona Pengawas terlebih dahulu melalui Persona Switcher untuk melihat daftar laporan mingguan."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Laporan Mingguan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">
                        Rangkuman evaluasi mingguan untuk manajemen (Admin).
                    </p>
                </div>
                <Link 
                    to="/pengawas/laporan-mingguan/create"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus /> Buat Laporan Baru
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-center">
                    <FiAlertCircle className="text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-700">{error}</p>
                </div>
            )}

            {/* Warning SOT */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
                <FiInfo className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-xs font-bold text-blue-700">Penting: Progress Snapshot Terverifikasi</p>
                    <p className="text-[11px] text-blue-600 mt-0.5">
                        Sumber progres resmi tetap berasal dari <strong>Verifikasi Progres (SOT)</strong>. Laporan mingguan mengambil snapshot progres terakhir yang sudah diverifikasi dan tidak mengubah progres resmi secara otomatis.
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['all', 'draft', 'submitted', 'under_admin_review', 'revision_requested', 'approved', 'rejected'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            statusFilter === status 
                            ? "bg-[var(--dashboard-primary)] text-white" 
                            : "bg-white border border-[var(--dashboard-border)] text-[var(--dashboard-text-soft)] hover:border-[var(--dashboard-primary)]"
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="dashboard-card overflow-hidden min-h-[300px]">
                {loading ? (
                    <RoleDataState type="loading" />
                ) : error ? (
                    <RoleDataState 
                        type="error" 
                        title="Gagal Memuat Laporan"
                        description={error}
                        onRetry={fetchReports}
                    />
                ) : reports.length === 0 ? (
                    <RoleDataState 
                        type="empty"
                        title={statusFilter !== 'all' ? "Tidak Ada Laporan dengan Status Ini" : "Belum Ada Laporan"}
                        description={statusFilter !== 'all' ? `Belum ada laporan mingguan dengan status "${statusFilter}".` : "Daftar laporan mingguan yang Anda buat akan muncul di sini."}
                        onRetry={statusFilter !== 'all' ? () => setStatusFilter('all') : null}
                        retryLabel="Lihat Semua Status"
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] bg-slate-50/50">
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Periode</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Proyek</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] text-center">Progress SOT</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Status</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id} className="border-b border-[var(--dashboard-border)] hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">
                                                    {new Date(report.weekStartDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(report.weekEndDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)]">
                                                    Dibuat: {new Date(report.createdAt).toLocaleDateString('id-ID')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">{report.project?.name}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] uppercase tracking-tighter">{report.project?.projectCode}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="text-sm font-black text-emerald-600">
                                                {report.verifiedProgressSnapshot}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <SupervisorReportStatusBadge status={report.status} />
                                                {report.status === 'draft' && (
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--dashboard-primary)] opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--dashboard-primary)]"></span>
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Link 
                                                to={`/pengawas/laporan-mingguan/${report.id}`}
                                                className="inline-flex items-center gap-1 text-[10px] font-black text-[var(--dashboard-primary)] hover:underline tracking-widest"
                                            >
                                                DETAIL <FiChevronRight />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LaporanMingguanPengawasPage;
