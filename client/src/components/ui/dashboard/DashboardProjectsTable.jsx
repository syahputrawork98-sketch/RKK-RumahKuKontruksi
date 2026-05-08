// client/src/components/ui/dashboard/DashboardProjectsTable.jsx

import React from "react";

export const DashboardProjectsTable = ({ projects }) => (
    <div className="mt-8 dashboard-table-card">
        <div className="p-6 border-b border-[var(--dashboard-border-soft)] flex items-center justify-between bg-[var(--dashboard-surface)]">
            <h2 className="dashboard-title !text-lg">Ringkasan Proyek Terbaru</h2>
            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">
                Lihat Semua Proyek
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-muted)] border-b border-[var(--dashboard-border-soft)]">
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Kode</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Nama Proyek</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Progress</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                        <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Nilai</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-[var(--dashboard-border-soft)]">
                    {projects.map((p) => (
                        <tr key={p.kode} className="hover:bg-[var(--dashboard-surface-soft)] transition-colors">
                            <td className="px-6 py-4">
                                <span className="font-mono text-xs font-bold text-[var(--dashboard-text-muted)] bg-[var(--dashboard-surface-soft)] px-2 py-1 rounded">
                                    {p.kode}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-[var(--dashboard-text)]">{p.name}</td>

                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-24 bg-[var(--dashboard-surface-soft)] h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-[var(--dashboard-primary)] h-1.5 transition-all duration-500"
                                            style={{ width: `${p.progress}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-[var(--dashboard-text-muted)]">{p.progress}%</span>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <span className={`
                                    px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                    ${(p.status === "active" || p.status === "Berjalan") ? "bg-emerald-100 text-emerald-700" : 
                                      p.status === "Selesai" ? "bg-blue-100 text-blue-700" : 
                                      "bg-orange-100 text-orange-700"}
                                `}>
                                    {p.status}
                                </span>
                            </td>

                            <td className="px-6 py-4 font-bold text-[var(--dashboard-text)]">{p.nilai}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
