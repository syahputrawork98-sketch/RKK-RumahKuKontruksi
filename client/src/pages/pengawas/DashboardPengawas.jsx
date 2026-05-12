import React, { useState, useEffect } from "react";
import { 
    FiLayers, 
    FiCheckSquare, 
    FiCamera, 
    FiFileText,
    FiShoppingCart,
    FiBriefcase,
    FiAlertTriangle
} from "react-icons/fi";
import fieldIssueService from "../../services/fieldIssues.service";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
} from "@client/components/ui/dashboard";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectService from "../../services/projectService";
import supervisorService from "../../services/supervisorService";

import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardPengawas = () => {
    const { selectedSupervisor, selectedSupervisorId } = useSupervisorPersona();
    const [projects, setProjects] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [activeIssues, setActiveIssues] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!selectedSupervisorId) {
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                
                const [projRes, statsRes, issuesRes] = await Promise.all([
                    projectService.getProjects({ supervisorId: selectedSupervisorId }),
                    supervisorService.getSupervisorStats(selectedSupervisorId),
                    fieldIssueService.getFieldIssues({ supervisorId: selectedSupervisorId, status: "open" })
                ]);

                if (projRes.success) {
                    setProjects(projRes.data);
                }
                if (statsRes.success) {
                    setStatsData(statsRes.data);
                }
                if (issuesRes.data) {
                    setActiveIssues(issuesRes.data.length);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Gagal mengambil data dari database lokal.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedSupervisorId]);

    const getCountByStatus = (arr, status) => {
        if (!arr || !Array.isArray(arr)) return 0;
        const item = arr.find(i => i.status === status);
        return item ? item._count._all : 0;
    };

    const stats = [
        { 
            label: "Proyek Diawasi", 
            value: statsData?.activeProjects || projects.length, 
            icon: FiLayers, 
            color: "#1A4D2E",
            href: "/pengawas/proyek"
        },
        { 
            label: "Review Jurnal", 
            value: getCountByStatus(statsData?.journals, 'submitted'), 
            icon: FiCheckSquare, 
            color: "#F59E0B",
            subLabel: "Menunggu Review",
            href: "/pengawas/jurnal-mandor"
        },
        { 
            label: "Progres Rata-rata", 
            value: statsData ? `${Math.round(statsData.avgProgress)}%` : "0%", 
            icon: FiActivity, 
            color: "#0EA5E9",
            href: "/pengawas/verifikasi-progres"
        },
        { 
            label: "Request Material", 
            value: getCountByStatus(statsData?.materialRequests, 'submitted'), 
            icon: FiShoppingCart, 
            color: "#E11428",
            subLabel: "Butuh Approval",
            href: "/pengawas/request-material"
        },
        { 
            label: "Kendala Lapangan", 
            value: activeIssues, 
            icon: FiAlertTriangle, 
            color: "#E11428",
            subLabel: "Perlu Solusi",
            href: "/pengawas/kendala"
        },
    ];

    if (!selectedSupervisorId && !isLoading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas Terlebih Dahulu"
                description="Pilih akun Pengawas untuk melihat data proyek dan aktivitas pengawasan yang sedang berjalan."
            />
        );
    }

    if (isLoading && projects.length === 0 && !error) {
        return <RoleDataState type="loading" message="Menganalisis pengawasan proyek..." />;
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

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader 
                title={`Halo, ${selectedSupervisor?.name || 'Pengawas'}`}
                subtitle={`Anda sedang mengawasi ${statsData?.activeProjects || projects.length} proyek aktif hari ini.`}
            />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Prioritas Hari Ini</h3>
                            <a href="/pengawas/proyek" className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</a>
                        </div>
                        <div className="space-y-4">
                            {projects.length > 0 ? projects.slice(0, 3).map((prj) => {
                                const statusMapping = {
                                    'active': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
                                    'Berjalan': { text: "Aktif", color: "bg-emerald-500/10 text-emerald-500" },
                                    'planning': { text: "Perencanaan", color: "bg-amber-500/10 text-amber-500" },
                                    'Selesai': { text: "Selesai", color: "bg-blue-500/10 text-blue-500" },
                                    'completed': { text: "Selesai", color: "bg-blue-500/10 text-blue-500" },
                                };
                                const statusLabel = statusMapping[prj.status] || { text: prj.status, color: "bg-slate-500/10 text-slate-500" };
                                const displayProgress = prj.verifiedProgress ?? 0;

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
                                                <span>Verified Progress</span>
                                                <span>{displayProgress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
                                                <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: `${displayProgress}%` }} />
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <a href={`/pengawas/proyek/${prj.id}`} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-primary)] hover:text-white transition-all">Detail</a>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <RoleDataState 
                                    type="empty" 
                                    title="Belum Ada Proyek" 
                                    message="Saat ini belum ada proyek aktif yang ditugaskan ke Anda." 
                                />
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-slate-800 text-white p-6 relative overflow-hidden">
                            <h3 className="font-bold text-xs uppercase tracking-widest opacity-80 mb-2">Laporan Mingguan</h3>
                            <p className="text-2xl font-black mb-1">Ringkasan Lokal</p>
                            <p className="text-[10px] opacity-70">Monitor aktivitas lapangan setiap minggu</p>
                            <a href="/pengawas/laporan-mingguan" className="mt-4 inline-block px-4 py-2 bg-[var(--dashboard-primary)] rounded-xl text-[10px] font-black uppercase tracking-widest">Buka Modul</a>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24" />
                        </div>
                        <div className="dashboard-card border-dashed border-2 p-6 flex flex-col justify-between bg-[var(--dashboard-primary)]/5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-primary)]">Ringkasan Pengalaman</h3>
                                <FiStar className="text-[var(--dashboard-primary)]" size={16} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center border-b border-[var(--dashboard-border)]/50 pb-2">
                                    <span className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Proyek Diawasi</span>
                                    <span className="text-xs font-black">{(statsData?.activeProjects || 0) + (statsData?.finishedProjects || 0)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[var(--dashboard-border)]/50 pb-2">
                                    <span className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Review Jurnal</span>
                                    <span className="text-xs font-black">
                                        {(statsData?.journals?.reduce((acc, j) => acc + (j._count?._all || 0), 0) || 0)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Laporan Mingguan</span>
                                    <span className="text-xs font-black">
                                        {statsData?.weeklyReports?.reduce((acc, r) => acc + (r._count?._all || 0), 0) || 0}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-[8px] font-bold text-[var(--dashboard-text-soft)] italic leading-tight uppercase">
                                Data berdasarkan riwayat operasional lokal Anda.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[xs] uppercase tracking-widest text-[var(--dashboard-primary)]">Monitoring Kendala</h3>
                            <a href="/pengawas/kendala" className="text-[10px] font-bold text-[var(--dashboard-primary)] hover:underline uppercase tracking-tighter">Buka Semua</a>
                        </div>
                        {activeIssues > 0 ? (
                            <div className="p-5 bg-red-50 dark:bg-red-900/10 rounded-[28px] border border-red-100 dark:border-red-900/20 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                                        <FiAlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-red-600 uppercase tracking-tight">{activeIssues} Kendala Aktif</h4>
                                        <p className="text-[10px] text-red-500 font-bold opacity-80 uppercase tracking-tighter">Perlu Solusi Teknis</p>
                                    </div>
                                </div>
                                <p className="text-[11px] font-medium text-red-800 dark:text-red-300 leading-relaxed italic mb-4">
                                    "Beberapa kendala lapangan dilaporkan oleh Mandor dan menunggu arahan solusi dari Anda."
                                </p>
                                <button 
                                    onClick={() => window.location.href = "/pengawas/kendala"}
                                    className="w-full py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-all"
                                >
                                    Berikan Arahan Solusi
                                </button>
                            </div>
                        ) : (
                            <div className="py-12 text-center bg-[var(--dashboard-surface-soft)] rounded-[32px] border border-dashed border-[var(--dashboard-border)]">
                                <FiCheckCircle className="mx-auto text-emerald-500 mb-3 opacity-30" size={32} />
                                <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Operasional Lancar</p>
                                <p className="text-[10px] text-slate-400 mt-2 px-8 italic">Tidak ada kendala lapangan yang dilaporkan saat ini.</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="dashboard-card group">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-primary)]">Dokumentasi Terbaru</h3>
                            <a href="/pengawas/proyek" className="text-[10px] font-bold text-[var(--dashboard-primary)] hover:underline uppercase tracking-tighter">Lihat Galeri</a>
                        </div>
                        <div className="py-12 text-center bg-[var(--dashboard-surface-soft)] rounded-[32px] border border-dashed border-[var(--dashboard-border)]">
                            <FiCamera className="mx-auto text-slate-300 mb-3" size={32} />
                            <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Sinkronisasi Visual</p>
                            <p className="text-[10px] text-slate-400 mt-2 px-8 italic font-medium leading-relaxed">
                                Foto harian dari Mandor akan muncul di sini setelah diunggah melalui Jurnal Mingguan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPengawas;
