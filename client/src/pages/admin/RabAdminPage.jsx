import React from "react";
import { FiFileText, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const RabAdminPage = () => {
    const rabList = [
        { id: 1, prjKode: "PRJ-001", prjName: "Renovasi Rumah Budi", total: "Rp 750.000.000", status: "Approved", categories: 8 },
        { id: 2, prjKode: "PRJ-002", prjName: "Ruko Maria", total: "Rp 1.200.000.000", status: "Draft", categories: 12 },
        { id: 3, prjKode: "PRJ-003", prjName: "Gudang Maju Jaya", total: "Rp 3.500.000.000", status: "Review", categories: 15 },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">RAB Proyek</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Manajemen Rencana Anggaran Biaya seluruh proyek.</p>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari proyek..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Total RAB</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Kategori</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rabList.map((rab) => (
                                <tr key={rab.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[var(--dashboard-primary)]">{rab.prjKode}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold">{rab.prjName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className="text-sm font-black text-emerald-600">{rab.total}</span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className="text-xs font-bold">{rab.categories} Pekerjaan</span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                            rab.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" :
                                            rab.status === "Draft" ? "bg-slate-500/10 text-slate-500" : "bg-amber-500/10 text-amber-500"
                                        }`}>
                                            {rab.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <Link 
                                            to={`/admin/rab/${rab.prjKode}`}
                                            className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                        >
                                            DETAIL RAB
                                            <FiChevronRight />
                                        </Link>
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

export default RabAdminPage;
