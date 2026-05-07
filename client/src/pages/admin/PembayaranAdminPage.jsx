import React from "react";
import { FiCreditCard, FiCheck, FiX, FiClock } from "react-icons/fi";

const PembayaranAdminPage = () => {
    const payments = [
        { id: 1, customer: "Bpk. Budi", project: "PRJ-001", termin: "Termin 2 (40%)", amount: "Rp 300.000.000", status: "Pending", date: "2026-05-01" },
        { id: 2, customer: "Ibu Maria", project: "PRJ-002", termin: "Down Payment (20%)", amount: "Rp 240.000.000", status: "Approved", date: "2026-04-28" },
        { id: 3, customer: "PT. Maju Jaya", project: "PRJ-003", termin: "Termin 3 (30%)", amount: "Rp 1.050.000.000", status: "Rejected", date: "2026-04-15" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Manajemen Pembayaran</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Validasi dan monitoring termin pembayaran konsumen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="dashboard-card border-l-4 border-amber-500 flex items-center justify-between p-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Menunggu Validasi</p>
                        <h4 className="text-2xl font-black mt-1">3</h4>
                    </div>
                    <FiClock className="text-amber-500 text-3xl opacity-20" />
                </div>
                <div className="dashboard-card border-l-4 border-emerald-500 flex items-center justify-between p-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Disetujui (Bulan Ini)</p>
                        <h4 className="text-2xl font-black mt-1">12</h4>
                    </div>
                    <FiCheck className="text-emerald-500 text-3xl opacity-20" />
                </div>
                <div className="dashboard-card border-l-4 border-blue-500 flex items-center justify-between p-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Total Omzet</p>
                        <h4 className="text-2xl font-black mt-1">Rp 4.2M</h4>
                    </div>
                    <FiCreditCard className="text-blue-500 text-3xl opacity-20" />
                </div>
            </div>

            <div className="dashboard-card">
                <h3 className="font-bold text-sm mb-6">Riwayat & Pengajuan Terbaru</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer / Proyek</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Termin</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Nominal</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Tanggal</th>
                                <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(p => (
                                <tr key={p.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{p.customer}</span>
                                            <span className="text-[10px] text-[var(--dashboard-primary)] font-black uppercase">{p.project}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-xs font-medium">{p.termin}</td>
                                    <td className="py-4 px-2 text-sm font-black">{p.amount}</td>
                                    <td className="py-4 px-2 text-xs text-[var(--dashboard-text-soft)] font-bold">{p.date}</td>
                                    <td className="py-4 px-2 text-right">
                                        {p.status === "Pending" ? (
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"><FiCheck /></button>
                                                <button className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><FiX /></button>
                                            </div>
                                        ) : (
                                            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                                p.status === "Approved" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                            }`}>
                                                {p.status}
                                            </span>
                                        )}
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

export default PembayaranAdminPage;
