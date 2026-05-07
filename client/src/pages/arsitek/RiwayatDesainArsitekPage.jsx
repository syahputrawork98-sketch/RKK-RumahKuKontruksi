import React from "react";
import { FiClock, FiCheckCircle, FiXCircle, FiSearch } from "react-icons/fi";

const RiwayatDesainArsitekPage = () => {
    const history = [
        { id: "DR-001", customer: "Bpk. Budi", type: "Rumah Klasik", date: "20 April 2026", status: "converted", files: 12, revisions: 3 },
        { id: "DR-000", customer: "Ibu Ani", type: "Renovasi Dapur", date: "15 April 2026", status: "cancelled", files: 2, revisions: 0 },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Riwayat Desain</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar desain yang telah selesai di-handover atau dibatalkan.</p>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari riwayat desain..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">ID & Tipe</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Tanggal Selesai</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-center">Data</th>
                                <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Status Akhir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((h) => (
                                <tr key={h.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-[var(--dashboard-primary)]">{h.id}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tighter">{h.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-sm font-bold">{h.customer}</td>
                                    <td className="py-4 px-2 text-xs font-medium text-[var(--dashboard-text-soft)]">{h.date}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                            <div className="flex flex-col items-center">
                                                <span className="text-[var(--dashboard-text)] font-black">{h.files}</span>
                                                <span>Files</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-[var(--dashboard-text)] font-black">{h.revisions}</span>
                                                <span>Revs</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {h.status === "converted" ? (
                                                <>
                                                    <FiCheckCircle className="text-emerald-500" />
                                                    <span className="text-[10px] font-black uppercase text-emerald-500">Jadi Proyek</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiXCircle className="text-red-500" />
                                                    <span className="text-[10px] font-black uppercase text-red-500">Dibatalkan</span>
                                                </>
                                            )}
                                        </div>
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

export default RiwayatDesainArsitekPage;
