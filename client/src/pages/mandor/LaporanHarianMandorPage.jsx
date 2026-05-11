import React, { useState, useEffect } from "react";
import { FiPlus, FiFileText, FiCloud, FiUsers, FiChevronRight } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import dailyReportService from "../../services/dailyReportService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const LaporanHarianMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("draft");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        const fetchReports = async () => {
            try {
                setLoading(true);
                const data = await dailyReportService.getAllReports({ foremanId: selectedForemanId });
                setReports(data.data || []);
            } catch (err) {
                setError(err.message || "Gagal memuat data laporan harian");
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, [selectedForemanId]);

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat daftar laporan harian."
            />
        );
    }

    if (loading && reports.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title={error} onRetry={() => window.location.reload()} />;
    }

    const filteredReports = reports.filter(report => {
        if (activeSubtab === "draft") return report.status === "draft";
        if (activeSubtab === "submitted") return report.status === "submitted" || report.status === "reviewed";
        if (activeSubtab === "needs_revision") return report.status === "rejected";
        return true;
    });

    const subtabs = [
        { id: "draft", label: "Draft" },
        { id: "submitted", label: "Dikirim / Direview" },
        { id: "needs_revision", label: "Perlu Revisi" }
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Laporan Harian / Logbook</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pencatatan aktivitas, pemakaian sumber daya, dan kondisi lapangan harian.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiPlus /> Buat Laporan Hari Ini
                </button>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredReports.length === 0 ? (
                    <RoleDataState type="empty" title="Tidak ada laporan" description="Tidak ada laporan harian dengan status ini." />
                ) : filteredReports.map((report) => (
                    <div key={report.id} className="dashboard-card hover:border-[var(--dashboard-primary)]/30 transition-all">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{report.projectId}</span>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded tracking-tighter border border-slate-200">
                                            Logbook
                                        </span>
                                    </div>
                                    <span className="text-xs font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">{new Date(report.date).toLocaleDateString("id-ID")}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Ringkasan Pekerjaan</p>
                                    <h4 className="text-sm font-bold leading-relaxed">"{report.activitySummary}"</h4>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg"><FiUsers size={12} /></div>
                                        <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">{report.workerCount} Pekerja</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg"><FiCloud size={12} /></div>
                                        <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">Cuaca: {report.weatherSummary}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-48 flex flex-col justify-center gap-2">
                                <span className={`w-full py-1 rounded text-center text-[8px] font-black uppercase tracking-[0.2em] border ${
                                    report.status !== "draft" ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" : "bg-slate-500/5 text-slate-500 border-slate-500/20"
                                }`}>
                                    {report.status !== "draft" ? "Sudah Terkirim" : "Status: Draft"}
                                </span>
                                <button className="w-full py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2">
                                    <FiFileText /> Edit Detail <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LaporanHarianMandorPage;
