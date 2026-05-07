import React from "react";
import { 
    FiLayers, 
    FiList, 
    FiActivity, 
    FiFileText,
    FiShoppingCart,
    FiAlertTriangle,
    FiUsers
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
} from "@client/components/ui/dashboard";

const DashboardMandor = () => {
    const stats = [
        { label: "Proyek Aktif", value: 2, icon: FiLayers, color: "#1A4D2E" },
        { label: "Tugas Hari Ini", value: 8, icon: FiList, color: "#0EA5E9" },
        { label: "Progress Hari Ini", value: "15%", icon: FiActivity, color: "#16A34A" },
        { label: "Request Material", value: 3, icon: FiShoppingCart, color: "#F59E0B" },
        { label: "Kendala Lapangan", value: 1, icon: FiAlertTriangle, color: "#E11428" },
    ];

    const priorityTasks = [
        { id: 1, task: "Pemasangan Keramik KM Utama", project: "PRJ-001", priority: "high", status: "unfinished" },
        { id: 2, task: "Pengecoran Kolom Lt. 2", project: "PRJ-002", priority: "high", status: "unfinished" },
        { id: 3, task: "Instalasi Pipa Air Bersih", project: "PRJ-001", priority: "medium", status: "done" },
    ];

    const recentActivities = [
        { id: 1, text: "Anda menandai selesai tugas 'Instalasi Pipa' (PRJ-001)", time: "30 menit lalu" },
        { id: 2, text: "Request material 'Semen' diajukan (PRJ-002)", time: "2 jam lalu" },
        { id: 3, text: "Kendala 'Cuaca Hujan' dilaporkan (PRJ-001)", time: "4 jam lalu" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Tugas Prioritas Hari Ini</h3>
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-3">
                            {priorityTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] group hover:border-[var(--dashboard-primary)]/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-12 rounded-full ${task.priority === "high" ? "bg-red-500" : "bg-blue-500"}`} />
                                        <div>
                                            <p className="text-sm font-bold">{task.task}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{task.project}</span>
                                                <span className={`text-[9px] font-black uppercase ${task.status === "done" ? "text-emerald-500" : "text-amber-500"}`}>
                                                    {task.status === "done" ? "Selesai" : "Belum Selesai"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-[var(--dashboard-border)] group-hover:bg-[var(--dashboard-primary)] group-hover:text-white transition-all">
                                        {task.status === "done" ? <FiActivity /> : <FiList />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-linear-to-br from-emerald-600 to-teal-800 text-white p-6 relative overflow-hidden">
                            <h3 className="font-bold text-xs uppercase tracking-widest opacity-80 mb-2">Laporan Harian</h3>
                            <p className="text-2xl font-black mb-1">Belum Dikirim</p>
                            <p className="text-[10px] opacity-70">Kamis, 07 Mei 2026</p>
                            <button className="mt-4 px-4 py-2 bg-white text-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Kirim Sekarang</button>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
                        </div>
                        <div className="dashboard-card p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)]">Ringkasan Tim</h3>
                                <FiUsers className="text-[var(--dashboard-primary)]" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black">12</span>
                                <span className="text-xs mb-1 font-bold text-[var(--dashboard-text-soft)] uppercase">Tukang Aktif</span>
                            </div>
                            <div className="mt-4 flex gap-1">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="flex-1 h-1.5 bg-emerald-500 rounded-full" />
                                ))}
                                {[1, 2].map(i => (
                                    <div key={i} className="flex-1 h-1.5 bg-slate-200 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={recentActivities} title="Logbook Harian" />
                    
                    <div className="dashboard-card">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-text-soft)]">Kendala Aktif</h3>
                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <FiAlertTriangle className="text-red-500" />
                                <span className="text-xs font-black text-red-500 uppercase">PRJ-001: Material Telat</span>
                            </div>
                            <p className="text-[10px] font-medium leading-relaxed italic text-red-800">
                                "Semen belum sampai, pekerjaan plester terhambat. Sudah koordinasi dengan pengawas."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMandor;
