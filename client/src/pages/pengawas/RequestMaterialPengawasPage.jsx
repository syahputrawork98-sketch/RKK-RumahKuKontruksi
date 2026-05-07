import React from "react";
import { FiShoppingCart, FiSearch, FiFilter, FiPlus } from "react-icons/fi";

const RequestMaterialPengawasPage = () => {
    const materialRequests = [
        { id: "REQ-012", project: "PRJ-001", item: "Semen Gresik", qty: 50, unit: "Sak", priority: "High", status: "Diproses", requester: "Mandor Ahmad" },
        { id: "REQ-013", project: "PRJ-002", item: "Pasir Pasang", qty: 2, unit: "Rit", priority: "Medium", status: "Diajukan", requester: "Mandor Hendra" },
        { id: "REQ-011", project: "PRJ-003", item: "Cat Jotun Interior", qty: 10, unit: "Pail", priority: "Low", status: "Diterima", requester: "Mandor Yusuf" },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Diajukan": return "bg-blue-500/10 text-blue-500";
            case "Diproses": return "bg-amber-500/10 text-amber-500";
            case "Diterima": return "bg-emerald-500/10 text-emerald-500";
            case "Ditolak": return "bg-red-500/10 text-red-500";
            default: return "bg-slate-500/10 text-slate-500";
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Request Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pantau status permintaan logistik dan material proyek.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiPlus /> Buat Request Baru
                </button>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari ID request atau material..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                        <FiFilter /> Filter Status
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">ID & Proyek</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Material / Qty</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-center">Prioritas</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Requester</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materialRequests.map((req) => (
                                <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{req.id}</span>
                                            <span className="text-xs font-bold">{req.project}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{req.item}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-black uppercase tracking-tighter">{req.qty} {req.unit}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-center">
                                        <span className={`text-[9px] font-black uppercase ${
                                            req.priority === "High" ? "text-red-500" : "text-blue-500"
                                        }`}>
                                            {req.priority}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${getStatusStyle(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">{req.requester}</td>
                                    <td className="py-4 px-2 text-right">
                                        <button className="text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase">Detail</button>
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

export default RequestMaterialPengawasPage;
