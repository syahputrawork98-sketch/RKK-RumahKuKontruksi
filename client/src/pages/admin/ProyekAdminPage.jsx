import React from "react";
import { FiPlus, FiSearch, FiFilter, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProyekAdminPage = () => {
    const projects = [
        { id: 1, kode: "PRJ-001", customer: "Bpk. Budi Santoso", type: "Rumah Tinggal", status: "Pengerjaan", progress: 65, value: "Rp 750.000.000" },
        { id: 2, kode: "PRJ-002", customer: "Ibu Maria Ulfa", type: "Ruko 2 Lantai", status: "Persiapan", progress: 12, value: "Rp 1.200.000.000" },
        { id: 3, kode: "PRJ-003", customer: "PT. Maju Jaya", type: "Gudang Logistik", status: "Finishing", progress: 92, value: "Rp 3.500.000.000" },
        { id: 4, kode: "PRJ-004", customer: "Bpk. Rian Aditya", type: "Renovasi Atap", status: "Terhenti", progress: 45, value: "Rp 85.000.000" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Pengerjaan": return "bg-emerald-500/10 text-emerald-500";
            case "Persiapan": return "bg-blue-500/10 text-blue-500";
            case "Finishing": return "bg-purple-500/10 text-purple-500";
            case "Terhenti": return "bg-red-500/10 text-red-500";
            default: return "bg-slate-500/10 text-slate-500";
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Manajemen Proyek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar seluruh proyek konstruksi yang sedang ditangani.</p>
                </div>
                <Link 
                    to="/admin/proyek/create"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus size={18} />
                    Buat Proyek Baru
                </Link>
            </div>

            <div className="dashboard-card">
                {/* FILTERS */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari kode proyek atau nama customer..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                            <FiFilter />
                            Filter Status
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer / Tipe</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Progress</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Nilai Proyek</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((prj) => (
                                <tr key={prj.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <span className="text-sm font-black text-[var(--dashboard-primary)]">{prj.kode}</span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{prj.customer}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-medium">{prj.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusColor(prj.status)}`}>
                                            {prj.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 w-48">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center text-[10px] font-bold">
                                                <span>{prj.progress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[var(--dashboard-primary)] transition-all duration-500" 
                                                    style={{ width: `${prj.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className="text-sm font-bold text-[var(--dashboard-text)]">{prj.value}</span>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <Link 
                                            to={`/admin/proyek/${prj.kode}`}
                                            className="inline-flex items-center gap-1 text-xs font-black text-[var(--dashboard-primary)] hover:underline"
                                        >
                                            DETAIL
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

export default ProyekAdminPage;
