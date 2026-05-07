import React, { useState, useEffect } from "react";
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
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectService from "../../services/projectService";

import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";

const DashboardPengawas = () => {
    const { selectedSupervisor, selectedSupervisorId, selectSupervisor, supervisors } = useSupervisorPersona();
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!selectedSupervisorId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const response = await projectService.getProjects({ supervisorId: selectedSupervisorId });
                if (response.success) {
                    setProjects(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedSupervisorId]);

    const stats = [
        { label: "Proyek Diawasi", value: projects.length, icon: FiLayers, color: "#1A4D2E" },
        { label: "Butuh Verifikasi", value: 0, icon: FiCheckSquare, color: "#F59E0B" },
        { label: "Progres Rata-rata", value: projects.length > 0 ? `${Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length)}%` : "0%", icon: FiActivity, color: "#0EA5E9" },
        { label: "Dokumentasi Baru", value: 0, icon: FiCamera, color: "#16A34A" },
        { label: "Request Material", value: 0, icon: FiShoppingCart, color: "#E11428" },
    ];

    // ... rest of the priorityProjects and recentActivities remain same for structure

    if (!selectedSupervisorId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas Terlebih Dahulu"
                description="Pilih akun Pengawas untuk melihat data proyek dan aktivitas pengawasan yang sedang berjalan."
                actionLabel="Pilih Pengawas"
                onAction={() => {
                    // This could open a modal or redirect to a persona picker
                    // For now, let's just use the first available if none is selected, 
                    // but the requirement is to show empty state.
                    console.log("Redirect to persona picker or show selection modal");
                }}
            />
        );
    }

    if (isLoading && projects.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader 
                title={`Halo, ${selectedSupervisor?.name || 'Pengawas'}`}
                subtitle={`Anda sedang mengawasi ${projects.length} proyek aktif hari ini.`}
            />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Prioritas Hari Ini</h3>
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-4">
                            {projects.length > 0 ? projects.slice(0, 3).map((prj) => {
                                const statusMapping = {
                                    active: { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
                                    needs_verification: { text: "Butuh Verifikasi", color: "bg-amber-500/10 text-amber-500" },
                                    delayed: { text: "Terlambat", color: "bg-red-500/10 text-red-500" },
                                    completed: { text: "Selesai", color: "bg-blue-500/10 text-blue-500" },
                                };
                                const prjStatus = prj.status === 'Berjalan' ? 'active' : prj.status === 'Selesai' ? 'completed' : 'needs_verification';
                                const statusLabel = statusMapping[prjStatus] || { text: prj.status, color: "bg-slate-500/10 text-slate-500" };

                                return (
                                    <div key={prj.id} className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-[var(--dashboard-primary)]/30 transition-all flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase">{prj.projectCode}</span>
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${statusLabel.color}`}>
                                                    {statusLabel.text}
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
                                            <a href={`/pengawas/proyek/${prj.id}`} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-primary)] hover:text-white transition-all">Detail</a>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="p-12 text-center text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                    Belum ada proyek yang ditugaskan ke Anda.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-slate-800 text-white p-6 relative overflow-hidden">
                            <h3 className="font-bold text-xs uppercase tracking-widest opacity-80 mb-2">Laporan Mingguan</h3>
                            <p className="text-2xl font-black mb-1">Belum Terkirim</p>
                            <p className="text-[10px] opacity-70">Minggu Ke-18: {projects.length} Proyek</p>
                            <button className="mt-4 px-4 py-2 bg-[var(--dashboard-primary)] rounded-xl text-[10px] font-black uppercase tracking-widest">Buat Laporan</button>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
                        </div>
                        <div className="dashboard-card border-dashed border-2 p-6 flex flex-col items-center justify-center text-center">
                            <FiCheckSquare className="text-[var(--dashboard-text-soft)] mb-2" size={32} />
                            <p className="text-xs font-bold">0 Tahapan Menunggu Verifikasi</p>
                            <button className="mt-3 text-[10px] font-black text-[var(--dashboard-primary)] uppercase hover:underline">Periksa Sekarang</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={[]} title="Aktivitas Lapangan" />
                    
                    <div className="dashboard-card">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-primary)]">Dokumentasi Terbaru</h3>
                        <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-2xl">
                            Belum ada dokumentasi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPengawas;
