import React, { useState } from "react";
import { FiPlus, FiShoppingCart, FiSearch, FiFilter, FiChevronRight } from "react-icons/fi";

const RequestMaterialMandorPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("draft");

    const materialRequests = [
        { id: "REQ-012", project: "PRJ-001", item: "Semen Gresik", qty: 50, unit: "Sak", priority: "high", status: "draft", reason: "Kurang untuk plester lt. 1" },
        { id: "REQ-013", project: "PRJ-002", item: "Pasir Pasang", qty: 2, unit: "Rit", priority: "high", status: "requested", reason: "Stok habis untuk pondasi" },
    ];

    const subtabs = [
        { id: "draft", label: "Draft" },
        { id: "requested", label: "Diajukan" },
        { id: "processing", label: "Diproses" },
        { id: "received", label: "Diterima" },
        { id: "riwayat", label: "Riwayat" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Request Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pengajuan kebutuhan logistik dan material ke Pengawas/Admin.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiPlus /> Buat Request Baru
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

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari material atau ID request..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                        <FiFilter /> Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Material / Qty</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Alasan Kebutuhan</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materialRequests.map((req) => (
                                <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{req.item}</span>
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{req.qty} {req.unit}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-xs font-bold text-[var(--dashboard-text)] uppercase">{req.project}</td>
                                    <td className="py-4 px-2 text-[10px] font-medium italic text-[var(--dashboard-text-soft)] leading-relaxed max-w-[200px]">
                                        "{req.reason}"
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                            req.status === "requested" ? "bg-blue-500/10 text-blue-500" : "bg-slate-500/10 text-slate-500"
                                        }`}>
                                            {req.status === "requested" ? "Diajukan" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <button className="inline-flex items-center gap-1 text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase tracking-widest">
                                            Detail <FiChevronRight />
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

export default RequestMaterialMandorPage;
