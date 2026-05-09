import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiInfo } from "react-icons/fi";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import StatusBadge from "../../components/common/StatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const LaporanMingguanPengawasAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("submitted");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchReports = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const params = {
                actorRole: "admin",
                actorId: selectedAdminId,
            };
            
            if (statusFilter !== "all") {
                params.status = statusFilter;
            }

            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReports(params);
            if (response.success) {
                setReports(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch reports:", err);
            setError("Gagal memuat daftar laporan Pengawas.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId, statusFilter]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const filteredReports = reports.filter(r => {
        const matchesSearch = 
            r.supervisor?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.project?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    if (!selectedAdminId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Admin Persona"
                description="Pilih akun Admin untuk meninjau laporan mingguan dari seluruh Pengawas proyek."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Review Laporan Pengawas</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">
                        Tinjau evaluasi mingguan dari Pengawas sebelum dijadikan arsip resmi.
                    </p>
                </div>
            </div>

            {/* Info Review */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3 items-start text-indigo-700">
                <FiInfo className="mt-0.5 flex-shrink-0" />
                <div className="text-[11px] font-medium leading-relaxed">
                    <p className="font-bold uppercase tracking-widest text-[10px] mb-1">Panduan Review Admin:</p>
                    <ul className="list-disc ml-4 space-y-1">
                        <li>Laporan Pengawas adalah evaluasi kualitatif, bukan update progres fisik.</li>
                        <li>Menyetujui laporan ini <strong>TIDAK</strong> akan mengubah progres resmi proyek.</li>
                        <li>Gunakan laporan ini untuk memantau kendala dan kualitas di lapangan.</li>
                    </ul>
                </div>
            </div>

            {/* Search */}
            <div className="relative">
                <FiChevronRight className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90" />
                <input 
                    type="text" 
                    placeholder="Cari pengawas atau proyek..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-800/20"
                />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['all', 'submitted', 'under_admin_review', 'approved', 'published', 'revision_requested', 'rejected'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            statusFilter === status 
                            ? "bg-slate-800 text-white" 
                            : "bg-white border border-[var(--dashboard-border)] text-[var(--dashboard-text-soft)] hover:border-slate-800"
                        }`}
                    >
                        {status === 'submitted' ? 'Menunggu Review' : status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
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
                ) : filteredReports.length === 0 ? (
                    <RoleDataState 
                        type="empty"
                        title={searchQuery ? "Hasil Pencarian Kosong" : "Belum Ada Laporan"}
                        description={searchQuery ? `Tidak ditemukan laporan dari pengawas atau proyek dengan kata kunci "${searchQuery}".` : "Laporan mingguan yang diajukan Pengawas akan muncul di sini."}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] bg-slate-50/50">
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Pengawas / Proyek</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Periode</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] text-center">Snapshot SOT</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Status</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="border-b border-[var(--dashboard-border)] hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">{report.supervisor?.name}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-medium">{report.project?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold">
                                                {new Date(report.weekStartDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {new Date(report.weekEndDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="text-sm font-black text-blue-600">
                                                {report.verifiedProgressSnapshot}%
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <StatusBadge type="report" status={report.status} />
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Link 
                                                to={`/admin/laporan-mingguan-pengawas/${report.id}`}
                                                className="inline-flex items-center gap-1 text-[10px] font-black text-slate-800 hover:underline tracking-widest bg-slate-100 px-3 py-1 rounded-lg"
                                            >
                                                TINJAU <FiChevronRight />
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

export default LaporanMingguanPengawasAdminPage;
