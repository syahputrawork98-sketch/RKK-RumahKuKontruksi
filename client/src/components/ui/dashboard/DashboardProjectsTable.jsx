// client/src/components/ui/dashboard/DashboardProjectsTable.jsx

import React from "react";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import StatusBadge from "../../common/StatusBadge";

export const DashboardProjectsTable = ({ projects = [] }) => {
    const formatCurrency = (val) => {
        if (!val) return "-";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="dashboard-table-card overflow-hidden">
            <div className="p-6 border-b border-[var(--dashboard-border-soft)] flex items-center justify-between bg-[var(--dashboard-surface)]">
                <h2 className="dashboard-title !text-lg">Monitoring Proyek Lapangan</h2>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 tracking-tighter">
                    Local DB Snapshot
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-muted)] border-b border-[var(--dashboard-border-soft)]">
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[9px]">ID/Kode</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[9px]">Nama Proyek / Client</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[9px]">Verified Progress (SOT)</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[9px]">Status</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[9px]">Nilai Kontrak</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-[9px] text-right">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[var(--dashboard-border-soft)]">
                        {projects.length > 0 ? (
                            projects.map((p) => (
                                <tr key={p.id} className="hover:bg-[var(--dashboard-surface-soft)] transition-all group">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-[10px] font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                            {p.projectCode || "PRJ-???"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-black text-[var(--dashboard-text)] text-sm">{p.name}</span>
                                            <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mt-0.5">{p.customer?.name || "No Client"}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-20 bg-[var(--dashboard-surface-soft)] h-1.5 rounded-full overflow-hidden border border-[var(--dashboard-border-soft)]">
                                                <div
                                                    className="bg-gradient-to-r from-blue-600 to-emerald-400 h-1.5 transition-all duration-1000"
                                                    style={{ width: `${p.verifiedProgress || 0}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-blue-600">{p.verifiedProgress || 0}%</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <StatusBadge type="project" status={p.status} />
                                    </td>

                                    <td className="px-6 py-4 font-black text-[var(--dashboard-text)] text-xs font-mono">{formatCurrency(p.budgetTotal)}</td>
                                    
                                    <td className="px-6 py-4 text-right">
                                        <Link 
                                            to={`/admin/proyek/${p.id}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                                        >
                                            Detail <FiExternalLink size={10} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[var(--dashboard-text-soft)] italic text-xs">
                                    Belum ada data proyek aktif dari database.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
