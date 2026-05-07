import React from "react";
import { FiFileText, FiPlus, FiChevronRight, FiCheckCircle } from "react-icons/fi";

const LaporanMingguanPengawasPage = () => {
    const reports = [
        { id: 1, week: "Minggu 18", period: "01 Mei - 07 Mei 2026", project: "PRJ-001 - Renovasi Budi", progress: "+12%", status: "submitted" },
        { id: 2, week: "Minggu 18", period: "01 Mei - 07 Mei 2026", project: "PRJ-003 - Gudang PT. MJ", progress: "+5%", status: "draft" },
        { id: 3, week: "Minggu 17", period: "24 Apr - 30 Apr 2026", project: "PRJ-001 - Renovasi Budi", progress: "+8%", status: "approved" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "submitted": return "bg-blue-500/10 text-blue-500";
            case "draft": return "bg-slate-500/10 text-slate-500";
            case "approved": return "bg-emerald-500/10 text-emerald-500";
            case "revision": return "bg-red-500/10 text-red-500";
            default: return "bg-slate-500/10 text-slate-500";
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Laporan Mingguan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Rangkuman progres, kendala, dan rencana kerja mingguan.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiPlus /> Buat Laporan Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="dashboard-card p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] mb-1">Draft</span>
                    <span className="text-2xl font-black">1</span>
                </div>
                <div className="dashboard-card p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-black uppercase text-blue-500 mb-1">Terkirim</span>
                    <span className="text-2xl font-black">1</span>
                </div>
                <div className="dashboard-card p-4 flex flex-col items-center justify-center text-center border-emerald-500/30">
                    <span className="text-[10px] font-black uppercase text-emerald-500 mb-1">Disetujui</span>
                    <span className="text-2xl font-black">12</span>
                </div>
                <div className="dashboard-card p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-black uppercase text-red-500 mb-1">Revisi</span>
                    <span className="text-2xl font-black">0</span>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Minggu / Periode</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Capaian Progres</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{report.week}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">{report.period}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-xs font-bold text-[var(--dashboard-text)]">{report.project}</td>
                                    <td className="py-4 px-2 text-sm font-black text-emerald-600">{report.progress}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${getStatusStyle(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <button className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline">
                                            DETAIL <FiChevronRight />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LaporanMingguanPengawasPage;
