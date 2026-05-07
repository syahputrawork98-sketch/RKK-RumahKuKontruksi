import React from "react";
import { 
    FiLayers, 
    FiCheckSquare, 
    FiCamera, 
    FiFileText,
    FiShoppingCart,
    FiActivity
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
} from "@client/components/ui/dashboard";

const DashboardPengawas = () => {
    const stats = [
        { label: "Proyek Diawasi", value: 3, icon: FiLayers, color: "#1A4D2E" },
        { label: "Butuh Verifikasi", value: 5, icon: FiCheckSquare, color: "#F59E0B" },
        { label: "Progres Rata-rata", value: "68%", icon: FiActivity, color: "#0EA5E9" },
        { label: "Dokumentasi Baru", value: 12, icon: FiCamera, color: "#16A34A" },
        { label: "Request Material", value: 2, icon: FiShoppingCart, color: "#E11428" },
    ];

    const priorityProjects = [
        { id: "PRJ-001", name: "Renovasi Rumah Budi", location: "Bandung", progress: 65, status: "active" },
        { id: "PRJ-002", name: "Ruko Maria Ulfa", location: "Jakarta", progress: 12, status: "needs_verification" },
        { id: "PRJ-003", name: "Gudang PT. MJ", location: "Surabaya", progress: 92, status: "active" },
    ];

    const recentActivities = [
        { id: 1, text: "Mandor Ahmad mengajukan verifikasi progres Tahap 2 (PRJ-001)", time: "10 menit lalu" },
        { id: 2, text: "Anda mengunggah 5 foto dokumentasi lapangan (PRJ-003)", time: "1 jam lalu" },
        { id: 3, text: "Request material 'Semen Gresik' disetujui Admin (PRJ-002)", time: "3 jam lalu" },
    ];

    const getStatusLabel = (status) => {
        const mapping = {
            active: { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
            needs_verification: { text: "Butuh Verifikasi", color: "bg-amber-500/10 text-amber-500" },
            delayed: { text: "Terlambat", color: "bg-red-500/10 text-red-500" },
            completed: { text: "Selesai", color: "bg-blue-500/10 text-blue-500" },
        };
        return mapping[status] || { text: status, color: "bg-slate-500/10 text-slate-500" };
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Prioritas Hari Ini</h3>
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-4">
                            {priorityProjects.map((prj) => (
                                <div key={prj.id} className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-[var(--dashboard-primary)]/30 transition-all flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{prj.id}</span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${getStatusLabel(prj.status).color}`}>
                                                {getStatusLabel(prj.status).text}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold">{prj.name}</h4>
                                        <p className="text-[10px] text-[var(--dashboard-text-soft)] font-medium mt-0.5 uppercase tracking-tighter">{prj.location}</p>
                                    </div>
                                    <div className="md:w-48 flex flex-col justify-center">
                                        <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                                            <span>Progress</span>
                                            <span>{prj.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: `${prj.progress}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-primary)] hover:text-white transition-all">Detail</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-slate-800 text-white p-6 relative overflow-hidden">
                            <h3 className="font-bold text-xs uppercase tracking-widest opacity-80 mb-2">Laporan Mingguan</h3>
                            <p className="text-2xl font-black mb-1">Belum Terkirim</p>
                            <p className="text-[10px] opacity-70">Minggu Ke-18: 3 Proyek</p>
                            <button className="mt-4 px-4 py-2 bg-[var(--dashboard-primary)] rounded-xl text-[10px] font-black uppercase tracking-widest">Buat Laporan</button>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
                        </div>
                        <div className="dashboard-card border-dashed border-2 p-6 flex flex-col items-center justify-center text-center">
                            <FiCheckSquare className="text-[var(--dashboard-text-soft)] mb-2" size={32} />
                            <p className="text-xs font-bold">5 Tahapan Menunggu Verifikasi</p>
                            <button className="mt-3 text-[10px] font-black text-[var(--dashboard-primary)] uppercase hover:underline">Periksa Sekarang</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={recentActivities} title="Aktivitas Lapangan" />
                    
                    <div className="dashboard-card">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-primary)]">Dokumentasi Terbaru</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-[var(--dashboard-surface-soft)] rounded-xl overflow-hidden border border-[var(--dashboard-border)] relative group">
                                    <img src={`https://placehold.co/200x200?text=Doc+${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt="Doc" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                        <span className="text-[8px] text-white font-black uppercase">PRJ-00{i}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPengawas;
