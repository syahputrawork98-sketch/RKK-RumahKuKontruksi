import React, { useState } from "react";
import { FiUsers, FiUserPlus, FiActivity, FiTool } from "react-icons/fi";

const PenugasanTimAdminPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("sudah-ditugaskan");

    const assignments = [
        { id: 1, project: "PRJ-001 - Renovasi Budi", supervisor: "Budi (Senior)", foreman: "Ahmad (Mitra A)", status: "Active" },
        { id: 2, project: "PRJ-002 - Ruko Maria", supervisor: "Candra (Junior)", foreman: "Hendra (Mitra B)", status: "Pending" },
        { id: 3, project: "PRJ-003 - Gudang MJ", supervisor: "Budi (Senior)", foreman: "Yusuf (Mitra C)", status: "Active" },
    ];

    const subtabs = [
        { id: "belum-ditugaskan", label: "Belum Ditugaskan" },
        { id: "sudah-ditugaskan", label: "Sudah Ditugaskan" },
        { id: "kapasitas", label: "Kapasitas Tim" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Penugasan Tim</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Manajemen penugasan Pengawas dan Mandor pada setiap proyek.</p>
                </div>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-sm">Status Penugasan Aktif</h3>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20">
                                <FiUserPlus /> Tugaskan Tim Baru
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)]">
                                        <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                        <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Pengawas</th>
                                        <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Mandor</th>
                                        <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignments.map(a => (
                                        <tr key={a.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                            <td className="py-4 px-2 text-xs font-black">{a.project}</td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center text-purple-500"><FiActivity size={12} /></div>
                                                    <span className="text-xs font-bold">{a.supervisor}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-orange-500/10 flex items-center justify-center text-orange-500"><FiTool size={12} /></div>
                                                    <span className="text-xs font-bold">{a.foreman}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button className="text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase">Re-assign</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Availability</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-2">Pengawas (3/5 Active)</p>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500" style={{ width: "60%" }} />
                                </div>
                            </div>
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-2">Mandor (5/8 Active)</p>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500" style={{ width: "62.5%" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PenugasanTimAdminPage;
