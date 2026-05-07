import React, { useState, useEffect } from "react";
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
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardMandor = () => {
    const { selectedForeman, selectedForemanId } = useForemanPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!selectedForemanId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                const response = await projectService.getProjects({ foremanId: selectedForemanId });
                if (response.success) {
                    setProjects(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Gagal mengambil data operasional dari database.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedForemanId]);

    const stats = [
        { label: "Proyek Aktif", value: projects.length, icon: FiLayers, color: "#1A4D2E" },
        // TODO: replace static/mock data after operational backend is implemented
        { label: "Tugas Hari Ini", value: 0, icon: FiList, color: "#0EA5E9" },
        { label: "Progres Terverifikasi", value: projects.length > 0 ? `${Math.round(projects.reduce((acc, p) => acc + (p.verifiedProgress || 0), 0) / projects.length)}%` : "0%", icon: FiActivity, color: "#16A34A" },
        { label: "Request Material", value: 0, icon: FiShoppingCart, color: "#F59E0B" },
        { label: "Kendala Lapangan", value: 0, icon: FiAlertTriangle, color: "#E11428" },
    ];

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor Terlebih Dahulu"
                description="Pilih akun Mandor untuk melihat proyek aktif dan pekerjaan lapangan yang sedang berjalan."
            />
        );
    }

    if (loading && projects.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    // TODO: replace mock data after operational backend is implemented
    const priorityTasks = [];
    const recentActivities = [];

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader 
                title={`Halo, ${selectedForeman?.name || 'Mandor'}`}
                subtitle={`Anda memiliki ${projects.length} proyek aktif yang perlu dipantau.`}
            />

            <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl flex items-center gap-3">
                <FiInfo className="text-blue-500 text-xs" />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Progres resmi proyek (SOT) sepenuhnya berasal dari hasil verifikasi Pengawas di lapangan.
                </p>
            </div>
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Tugas Prioritas Hari Ini</h3>
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-3">
                            {priorityTasks.length > 0 ? priorityTasks.map((task) => (
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
                            )) : (
                                <div className="p-12 text-center text-slate-400 font-medium border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                                    Belum ada tugas operasional yang dijadwalkan.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-linear-to-br from-emerald-600 to-teal-800 text-white p-6 relative overflow-hidden">
                            <h3 className="font-bold text-xs uppercase tracking-widest opacity-80 mb-2">Laporan Harian</h3>
                            <p className="text-2xl font-black mb-1">Sudah Lengkap</p>
                            <p className="text-[10px] opacity-70">Status laporan hari ini sinkron dengan database.</p>
                            <button className="mt-4 px-4 py-2 bg-white text-emerald-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Kirim Sekarang</button>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
                        </div>
                        <div className="dashboard-card p-6 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)]">Ringkasan Tim</h3>
                                <FiUsers className="text-[var(--dashboard-primary)]" />
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-black">0</span>
                                {/* TODO: replace static/mock data after operational backend is implemented */}
                                <span className="text-xs mb-1 font-bold text-[var(--dashboard-text-soft)] uppercase">Tukang Aktif</span>
                            </div>
                            <div className="mt-4 flex gap-1">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
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
                        {/* TODO: replace static/mock data after operational backend is implemented */}
                        <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-2xl">
                            Tidak ada kendala aktif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMandor;
