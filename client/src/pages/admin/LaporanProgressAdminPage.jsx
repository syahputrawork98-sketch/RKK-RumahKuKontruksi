import React from "react";
import { FiActivity, FiFileText, FiClock } from "react-icons/fi";

const LaporanProgressAdminPage = () => {
    const reports = [
        { id: 1, project: "PRJ-001", stage: "Pekerjaan Dinding", reportedBy: "Mandor Ahmad", date: "2026-05-06", progress: "85%", status: "Verified" },
        { id: 2, project: "PRJ-002", stage: "Galian Tanah", reportedBy: "Mandor Hendra", date: "2026-05-06", progress: "100%", status: "Pending" },
        { id: 3, project: "PRJ-003", stage: "Pemasangan Atap", reportedBy: "Mandor Yusuf", date: "2026-05-05", progress: "40%", status: "Verified" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Laporan Progress</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Monitoring laporan aktivitas harian dan mingguan dari lapangan.</p>
            </div>

            <div className="dashboard-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek / Tahap</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Pelapor</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Progres</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Tanggal</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(r => (
                                <tr key={r.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[var(--dashboard-primary)]">{r.project}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase">{r.stage}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-xs font-bold">{r.reportedBy}</td>
                                    <td className="py-4 px-2">
                                        <span className="text-sm font-black text-blue-600">{r.progress}</span>
                                    </td>
                                    <td className="py-4 px-2 text-xs text-[var(--dashboard-text-soft)] font-bold">{r.date}</td>
                                    <td className="py-4 px-2 text-right">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            r.status === "Verified" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                                        }`}>
                                            {r.status}
                                        </span>
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

export default LaporanProgressAdminPage;
