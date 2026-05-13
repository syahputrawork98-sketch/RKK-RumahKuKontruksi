import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiFileText, 
    FiUser, 
    FiUserCheck, 
    FiShield, 
    FiActivity,
    FiInfo,
    FiCheckCircle,
    FiClock
} from "react-icons/fi";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const AuditLaporanPengawasPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchData();
        }
    }, [selectedSuperadminId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await supervisorWeeklyReportService.getSupervisorWeeklyReports();
            if (response.status === 200) {
                setReports(response.data || []);
            }
        } catch (err) {
            console.error("AuditLaporanPengawasPage: Error fetching reports:", err);
            setError("Gagal memuat data laporan pengawas.");
        } finally {
            setLoading(false);
        }
    };

    const filteredReports = (reports || []).filter(r => 
        (r.project?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.supervisor?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status) => {
        const s = (status || "").toLowerCase();
        if (s === "published" || s === "reviewed") return "text-emerald-500 bg-emerald-50 border-emerald-100";
        if (s === "rejected") return "text-rose-500 bg-rose-50 border-rose-100";
        if (s === "submitted") return "text-blue-500 bg-blue-50 border-blue-100";
        return "text-amber-500 bg-amber-50 border-amber-100";
    };

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengaudit laporan." />;
    }

    if (loading) return <RoleDataState type="loading" message="Menganalisis laporan mingguan global..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        MONITORING <span className="text-blue-600 uppercase">Laporan Pengawas</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Review konsistensi laporan mingguan pengawas terhadap progres lapangan secara lokal (Read-Only).
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <FiCheckCircle className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Local Monitoring Mode</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari proyek atau nama pengawas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
            </div>

            {/* TABLE */}
            <div className="dashboard-card overflow-hidden">
                {filteredReports.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)] bg-gray-50/50">
                                    <th className="py-4 px-6">Periode Laporan</th>
                                    <th className="py-4 px-6">Proyek & Pengawas</th>
                                    <th className="py-4 px-6 text-center">Snapshot Progres</th>
                                    <th className="py-4 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map((r) => (
                                    <tr key={r.id} className="border-b border-[var(--dashboard-border)] hover:bg-blue-50/20 transition-colors">
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black text-[var(--dashboard-text)]">
                                                    {new Date(r.weekStartDate).toLocaleDateString("id-ID")} - {new Date(r.weekEndDate).toLocaleDateString("id-ID")}
                                                </span>
                                                <div className="flex items-center gap-2 text-[9px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-widest">
                                                    <FiClock size={10} />
                                                    <span>Diperbarui: {new Date(r.updatedAt).toLocaleDateString("id-ID")}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-[var(--dashboard-text)]">{r.project?.name || "N/A"}</span>
                                                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-[var(--dashboard-text-soft)] font-bold">
                                                    <FiUserCheck size={12} className="text-emerald-500" />
                                                    <span>{r.supervisor?.name || "-"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs font-black text-blue-600">{r.verifiedProgressSnapshot || 0}%</span>
                                                <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                    <div className="h-full bg-blue-500" style={{ width: `${r.verifiedProgressSnapshot || 0}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border tracking-widest ${getStatusColor(r.status)}`}>
                                                {(r.status || "draft").replace('_', ' ')}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center flex flex-col items-center justify-center">
                        <FiFileText size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Tidak Ada Laporan</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic">
                            Belum ada laporan mingguan pengawas yang masuk ke sistem.
                        </p>
                    </div>
                )}
            </div>

            {/* INFO */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FiInfo className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-black text-lg tracking-tight mb-1">Kualitas & Kepatuhan Pelaporan</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                        Halaman audit ini memastikan setiap pengawas memberikan laporan yang valid dan tepat waktu dalam lingkungan Local Development. Superadmin memantau konsistensi snapshot progres terhadap jurnal harian mandor sebagai bagian dari tata kelola (governance) data lokal.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuditLaporanPengawasPage;
