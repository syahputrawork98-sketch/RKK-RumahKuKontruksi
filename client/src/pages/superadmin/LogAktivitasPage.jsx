import React, { useState } from "react";
import { FiSearch, FiFilter, FiDownload, FiInfo, FiUser, FiClock, FiActivity } from "react-icons/fi";

const LogAktivitasPage = () => {
    const [search, setSearch] = useState("");

    // Mock Audit Log Data
    const logs = [
        { id: 1, user: "Ahmad Admin", role: "Superadmin", activity: "Menghapus Proyek PRJ-001", module: "Proyek", time: "2 menit yang lalu", type: "danger" },
        { id: 2, user: "Siti Mandor", role: "Mandor", activity: "Mengunggah Laporan Harian PRJ-005", module: "Progres", time: "15 menit yang lalu", type: "success" },
        { id: 3, user: "Budi Pengawas", role: "Pengawas", activity: "Menyetujui Opname PRJ-002", module: "Pembayaran", time: "1 jam yang lalu", type: "primary" },
        { id: 4, user: "Dedi Admin", role: "Admin", activity: "Menambah User Mandor Baru", module: "User Management", time: "2 jam yang lalu", type: "success" },
        { id: 5, user: "System", role: "Automation", activity: "Backup Data Harian Selesai", module: "System", time: "3 jam yang lalu", type: "primary" },
        { id: 6, user: "Ahmad Admin", role: "Superadmin", activity: "Mengubah Pengaturan Pajak", module: "Pengaturan", time: "5 jam yang lalu", type: "warning" },
        { id: 7, user: "Budi Pengawas", role: "Pengawas", activity: "Revisi RAB PRJ-003", module: "RAB", time: "Kemarin, 14:20", type: "warning" },
        { id: 8, user: "Ahmad Admin", role: "Superadmin", activity: "Login ke Sistem", module: "Auth", time: "Kemarin, 08:00", type: "primary" },
    ];

    const getBadgeColor = (type) => {
        switch (type) {
            case "success": return "bg-emerald-100 text-emerald-700";
            case "danger": return "bg-red-100 text-red-700";
            case "warning": return "bg-amber-100 text-amber-700";
            default: return "bg-blue-100 text-blue-700";
        }
    };

    return (
        <div className="animate-fadeIn">
            {/* HEADER */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="dashboard-title text-4xl">Log Aktivitas Sistem</h1>
                    <p className="dashboard-subtitle text-lg">Pantau seluruh aktivitas operasional user dan sistem secara transparan (Audit Trail).</p>
                </div>
                <button className="dashboard-primary-button flex items-center gap-2 !bg-[var(--dashboard-surface)] !text-[var(--dashboard-text)] border border-[var(--dashboard-border)] shadow-sm">
                    <FiDownload size={18} />
                    <span>Ekspor Log</span>
                </button>
            </div>

            {/* FILTERS */}
            <div className="dashboard-card mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari aktivitas, user, atau modul..." 
                            className="w-full pl-11 pr-4 py-3 bg-[var(--dashboard-surface-soft)] border-none rounded-xl text-sm focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select className="px-4 py-3 bg-[var(--dashboard-surface-soft)] border-none rounded-xl text-sm font-bold text-[var(--dashboard-text)] focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 cursor-pointer">
                            <option>Semua Modul</option>
                            <option>Proyek</option>
                            <option>Pembayaran</option>
                            <option>User Management</option>
                        </select>
                        <button className="p-3 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text)] rounded-xl hover:bg-[var(--dashboard-border-soft)] transition-colors">
                            <FiFilter size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* LOG TABLE */}
            <div className="dashboard-table-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-muted)] border-b border-[var(--dashboard-border-soft)]">
                                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Waktu</th>
                                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">User / Role</th>
                                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Aktivitas</th>
                                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px]">Modul</th>
                                <th className="px-6 py-5 font-bold uppercase tracking-wider text-[10px] text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--dashboard-border-soft)]">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-[var(--dashboard-text-soft)]" />
                                            <span className="font-medium text-[var(--dashboard-text)] whitespace-nowrap">{log.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[var(--dashboard-primary-soft)] flex items-center justify-center text-[var(--dashboard-primary)]">
                                                <FiUser size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[var(--dashboard-text)] leading-none mb-1">{log.user}</span>
                                                <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">{log.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'danger' ? 'bg-red-500' : log.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                            <span className="text-[var(--dashboard-text)] font-medium">{log.activity}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(log.type)}`}>
                                            {log.module}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <button className="text-[var(--dashboard-primary)] hover:scale-110 transition-transform">
                                            <FiInfo size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINATION */}
            <div className="mt-8 flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--dashboard-text-muted)] uppercase">Menampilkan 8 dari 124 Log</p>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-lg text-xs font-bold text-[var(--dashboard-text-soft)] disabled:opacity-50" disabled>Sebelumnya</button>
                    <button className="px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-lg text-xs font-bold">Selanjutnya</button>
                </div>
            </div>
        </div>
    );
};

export default LogAktivitasPage;
